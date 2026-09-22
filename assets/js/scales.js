/* Scales — the signature element.
   A spring-driven beam that starts tilted toward "your case" and levels out
   as sections drop weights into the other pan. One shared state, many views. */
(function () {
  'use strict';

  var PX = 300, PY = 60, HALF = 224, MAX_TILT = 11;
  var root = document.documentElement;
  var reduced = root.classList.contains('rm');
  var views = [];
  var listeners = [];
  var s = {
    a: -MAX_TILT, v: 0,
    weights: 0,
    total: document.querySelectorAll('[data-weight]').length || 6,
    pointer: 0,
    running: false, last: 0, balanced: false
  };

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function target() {
    var left = 1 - s.weights / s.total;
    var idle = reduced ? 0 : Math.sin(performance.now() / 1700) * 0.45 * (0.35 + left);
    return -MAX_TILT * left + s.pointer * 6 + idle;
  }

  function draw(view) {
    var rad = s.a * Math.PI / 180, c = Math.cos(rad), sn = Math.sin(rad);
    var sway = clamp(-s.v * 0.14, -8, 8).toFixed(2);
    view.beam.setAttribute('transform', 'rotate(' + s.a.toFixed(3) + ' ' + PX + ' ' + PY + ')');
    view.l.setAttribute('transform', 'translate(' + (PX - HALF * c).toFixed(2) + ' ' + (PY - HALF * sn).toFixed(2) + ') rotate(' + sway + ')');
    view.r.setAttribute('transform', 'translate(' + (PX + HALF * c).toFixed(2) + ' ' + (PY + HALF * sn).toFixed(2) + ') rotate(' + sway + ')');
  }

  function paintWeights(view) {
    for (var i = 0; i < view.w.length; i++) view.w[i].classList.toggle('is-on', i < s.weights);
  }

  function anyVisible() {
    for (var i = 0; i < views.length; i++) if (views[i].visible) return true;
    return false;
  }

  function frame(now) {
    var dt = clamp((now - s.last) / 1000, 0.001, 0.05);
    s.last = now;
    var acc = -52 * (s.a - target()) - 6.4 * s.v;
    s.v += acc * dt;
    s.a += s.v * dt;
    for (var i = 0; i < views.length; i++) if (views[i].visible) draw(views[i]);
    if (anyVisible() && !document.hidden) requestAnimationFrame(frame);
    else s.running = false;
  }

  function wake() {
    if (reduced) { s.a = target(); s.v = 0; views.forEach(draw); return; }
    if (s.running || !anyVisible()) return;
    s.running = true;
    s.last = performance.now();
    requestAnimationFrame(frame);
  }

  function mount(svg) {
    var view = {
      svg: svg,
      beam: svg.querySelector('.sc-beam'),
      l: svg.querySelector('.sc-pan--l'),
      r: svg.querySelector('.sc-pan--r'),
      w: svg.querySelectorAll('.sc-w'),
      visible: true
    };
    views.push(view);
    paintWeights(view);
    draw(view);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        view.visible = entries[0].isIntersecting;
        if (view.visible) wake();
      }).observe(svg);
    }
    wake();
    return view;
  }

  /* copy the hero drawing into another host, with unique gradient ids */
  function clone(host, suffix) {
    var src = document.querySelector('[data-scales="hero"] svg');
    if (!src || !host) return null;
    host.innerHTML = src.outerHTML.replace(/sgGold(V?)\b/g, 'sgGold$1-' + suffix);
    return mount(host.querySelector('svg'));
  }

  function setWeights(n, label) {
    n = clamp(n, 0, s.total);
    if (n === s.weights) return;
    var added = n > s.weights;
    s.weights = n;
    if (!reduced) s.v += added ? 34 : -28;
    views.forEach(paintWeights);
    var balanced = n === s.total;
    if (balanced && !s.balanced) {
      views.forEach(function (v) {
        v.svg.classList.remove('is-balanced');
        void v.svg.getBoundingClientRect();
        v.svg.classList.add('is-balanced');
      });
    }
    s.balanced = balanced;
    listeners.forEach(function (fn) { fn(n, s.total, added, label); });
    wake();
  }

  document.addEventListener('visibilitychange', function () { if (!document.hidden) wake(); });

  window.Scales = {
    mount: mount,
    clone: clone,
    setWeights: setWeights,
    setPointer: function (p) { s.pointer = clamp(p, -1, 1); wake(); },
    kick: function (vel) { if (reduced) return; s.v += clamp(vel, -60, 60) * 0.06; wake(); },
    onChange: function (fn) { listeners.push(fn); },
    get total() { return s.total; },
    get weights() { return s.weights; }
  };

  var hero = document.querySelector('[data-scales="hero"] svg');
  if (hero) mount(hero);
})();
