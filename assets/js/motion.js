/* Motion — smooth scroll, reveals, pinned/sticky scenes, cursor.
   Content is visible without this file; everything here only enhances. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = root.classList.contains('rm');
  var Site = window.Site = window.Site || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  Site.scrollTo = function (el) {
    var off = -(parseInt(getComputedStyle(root).getPropertyValue('--header-h'), 10) || 72);
    if (Site.lenis) Site.lenis.scrollTo(el, { offset: el.id === 'top' ? 0 : off, duration: 1.5 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  if (!window.gsap || !window.ScrollTrigger) return;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  /* ---------- weights on the scales: counted from real scroll position ---------- */
  var weightEls = $$('[data-weight]');
  var active = weightEls.map(function () { return false; });
  var mini = $('.mini-scales');
  var capTimer;

  function syncWeights(el, added) {
    var n = active.filter(Boolean).length;
    if (window.Scales) Scales.setWeights(n, added && el ? el.getAttribute('data-weight') : null);
  }
  weightEls.forEach(function (el, i) {
    ST.create({
      trigger: el, start: 'top 55%',
      onEnter: function () { active[i] = true; syncWeights(el, true); },
      onLeaveBack: function () { active[i] = false; syncWeights(el, false); }
    });
  });

  if (window.Scales) {
    if (mini) Scales.clone($('.mini-scales__svg'), 'mini');
    Scales.clone($('.finale__scales'), 'final');
    Scales.onChange(function (n, total, added, label) {
      if (!mini) return;
      $('.mini-scales__n', mini).textContent = n;
      if (added && label) {
        $('.mini-scales__cap', mini).textContent = label;
        mini.classList.add('has-cap');
        clearTimeout(capTimer);
        capTimer = setTimeout(function () { mini.classList.remove('has-cap'); }, 2200);
      }
    });
    var hero = $('.hero');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      Scales.setPointer(((e.clientX - r.left) / r.width - 0.5) * 2);
    });
    hero.addEventListener('pointerleave', function () { Scales.setPointer(0); });
  }
  if (mini) {
    ST.create({
      trigger: '.hero', start: 'bottom 40%', endTrigger: '.finale', end: 'top 75%',
      onToggle: function (self) { mini.classList.toggle('is-visible', self.isActive); }
    });
  }

  /* practices: the big word follows the item in view (works in reduced mode too) */
  var words = $$('.practice__word'), items = $$('.practice__item'), cur = $('.practice__cur');
  items.forEach(function (item, i) {
    ST.create({
      trigger: item, start: 'top 58%', end: 'bottom 58%',
      onToggle: function (self) {
        if (!self.isActive) return;
        words.forEach(function (w, j) { w.classList.toggle('is-active', j === i); });
        items.forEach(function (it, j) { it.classList.toggle('is-active', j === i); });
        if (cur) cur.textContent = (i < 9 ? '0' : '') + (i + 1);
      }
    });
  });

  /* timeline dots */
  $$('.tl').forEach(function (tl) {
    ST.create({ trigger: tl, start: 'top 62%', onEnter: function () { tl.classList.add('is-lit'); }, onLeaveBack: function () { tl.classList.remove('is-lit'); } });
  });

  if (reduced) {
    root.style.setProperty('--tl', 1);
    $$('.steps__line span').forEach(function (s) { s.style.setProperty('--sp', 1); });
    $$('.route__fill').forEach(function (f) { f.style.transform = 'none'; });
    $$('.tl').forEach(function (t) { t.classList.add('is-lit'); });
    return;
  }

  /* ---------- smooth scroll ---------- */
  if (window.Lenis) {
    var lenis = Site.lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', function (e) {
      ST.update();
      if (window.Scales) Scales.kick(e.velocity);
    });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- reveals ---------- */
  var ease = 'expo.out';

  function revealSplit(el) {
    gsap.set(el, { autoAlpha: 1 });
    if (!window.SplitType) return gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.2, ease: ease });
    var split = new SplitType(el, { types: 'lines,words', lineClass: 'sl', wordClass: 'sw' });
    gsap.from(split.words, {
      yPercent: 118, duration: 1.25, ease: ease, stagger: 0.022,
      onComplete: function () { split.revert(); }
    });
  }

  $$('[data-split]').forEach(function (el) {
    gsap.set(el, { autoAlpha: 0 });
    ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { revealSplit(el); } });
  });

  var plain = $$('[data-reveal]').filter(function (el) { return el.getAttribute('data-reveal') !== 'img'; });
  gsap.set(plain, { autoAlpha: 0, y: 30 });
  ST.batch(plain, {
    start: 'top 90%', once: true,
    onEnter: function (batch) { gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.2, ease: ease, stagger: 0.09, overwrite: true }); }
  });

  $$('[data-reveal="img"]').forEach(function (fig) {
    var img = $('.about__photo-fg', fig) || $('img', fig);
    gsap.set(fig, { autoAlpha: 0, y: 24 });
    gsap.set(img, { scale: 1.06 });
    ST.create({
      trigger: fig, start: 'top 88%', once: true,
      onEnter: function () { gsap.to(fig, { autoAlpha: 1, y: 0, duration: 1.1, ease: ease }); gsap.to(img, { scale: 1, duration: 1.6, ease: ease }); }
    });
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- hero ---------- */
  function heroIntro() {
    var tl = gsap.timeline({ defaults: { ease: ease } });
    tl.fromTo('.hero__portrait img', { scale: 1.08 }, { scale: 1, duration: 2.4 }, 0)
      .fromTo('.hero__scales', { autoAlpha: 0, y: -70 }, { autoAlpha: 1, y: 0, duration: 2 }, 0.1)
      .fromTo('.hero__manifesto .ml > *', { yPercent: 112 }, { yPercent: 0, duration: 1.5, stagger: 0.14 }, 0.3)
      .fromTo('.hero [data-hero]', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.08 }, 0.2);
  }
  gsap.set('.hero__scales', { autoAlpha: 0 });   /* the portrait stays painted: it is the LCP element */
  gsap.set('.hero [data-hero]', { autoAlpha: 0 });
  gsap.set('.hero__manifesto .ml > *', { yPercent: 112 });
  if (root.classList.contains('pl-done')) heroIntro();
  else document.addEventListener('preloader:done', heroIntro, { once: true });

  gsap.to('.hero__portrait', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__content', { y: -50, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- lines that draw with scroll ---------- */
  var tlEl = $('.timeline');
  if (tlEl) gsap.fromTo(tlEl, { '--tl': 0 }, { '--tl': 1, ease: 'none', scrollTrigger: { trigger: tlEl, start: 'top 65%', end: 'bottom 65%', scrub: true } });
  var sp = $('.steps__line span');
  if (sp) gsap.fromTo(sp, { '--sp': 0 }, { '--sp': 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: true } });

  var route = $('.route');
  if (route) {
    var rs = { trigger: route, start: 'top 85%', end: 'top 35%', scrub: 0.6 };
    gsap.fromTo('.route__fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: rs });
    gsap.fromTo('.route__dot', { x: 0 }, { x: function () { return route.offsetWidth - 11; }, ease: 'none', scrollTrigger: { trigger: route, start: 'top 85%', end: 'top 35%', scrub: 0.6, invalidateOnRefresh: true } });
  }

  /* ---------- counters ---------- */
  $$('[data-count]').forEach(function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    ST.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: function () {
        var o = { v: 0 };
        gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
      }
    });
  });

  /* ---------- cases: pinned horizontal scroll on desktop ---------- */
  var track = $('.cases__track'), vp = $('.cases__viewport'), bar = $('.cases__progress');
  var mm = gsap.matchMedia();
  /* A viewport resize can make gsap.matchMedia() run this callback again before the previous
     context is fully torn down, leaving two ScrollTriggers pinned to the same section. Two
     pins fighting over one element is exactly what produces "stuck, can't scroll past this
     part" — so always kill any earlier one first; at most one may exist. */
  mm.add('(min-width: 1100px)', function () {
    /* t.vars.trigger is the original selector only until GSAP resolves it to the live element
       (which can happen before this runs again), so compare against t.trigger, not t.vars.trigger. */
    ScrollTrigger.getAll().forEach(function (t) { if (t.trigger && t.trigger.classList && t.trigger.classList.contains('cases')) t.kill(); });
    var dist = function () { return Math.max(0, track.scrollWidth - vp.clientWidth); };
    gsap.to(track, {
      x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: {
        trigger: '.cases', start: 'top top', end: function () { return '+=' + dist(); },
        pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: function (self) { bar.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')'; }
      }
    });
  });
  mm.add('(max-width: 1099px)', function () {
    var onScroll = function () {
      var max = vp.scrollWidth - vp.clientWidth;
      bar.style.transform = 'scaleX(' + (max > 0 ? vp.scrollLeft / max : 0).toFixed(4) + ')';
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return function () { vp.removeEventListener('scroll', onScroll); };
  });

  /* ---------- finale ---------- */
  gsap.fromTo('.finale__scales', { y: -80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: '.finale', start: 'top 90%', end: 'top 30%', scrub: true } });

  /* ---------- cursor + magnetic buttons (fine pointers only) ---------- */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    root.classList.add('has-cursor');
    var c = $('.cursor'), beam = $('.cursor__beam', c);
    var x = -100, y = -100, tx = -100, ty = -100, lx = -100, rot = 0;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (x < -50) { x = tx; y = ty; lx = tx; }
      c.classList.remove('is-hidden');
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', function () { c.classList.add('is-hidden'); });
    document.addEventListener('pointerover', function (e) {
      var t = e.target;
      c.classList.toggle('is-hover', !!t.closest('a, button, summary, label, [data-cursor]'));
      if (t.closest('input, textarea, select, iframe')) c.classList.add('is-hidden');
    });
    document.addEventListener('pointerout', function (e) {
      if (e.target.closest && e.target.closest('input, textarea, select')) c.classList.remove('is-hidden');
    });
    gsap.ticker.add(function () {
      x += (tx - x) * 0.24; y += (ty - y) * 0.24;
      var vx = x - lx; lx = x;
      rot += (Math.max(-28, Math.min(28, vx * 1.6)) - rot) * 0.16;
      c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      beam.style.transform = 'rotate(' + rot.toFixed(2) + 'deg)';
    });

    $$('[data-magnetic]').forEach(function (el) {
      var qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      var qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        qx((e.clientX - r.left - r.width / 2) * 0.22);
        qy((e.clientY - r.top - r.height / 2) * 0.32);
      });
      el.addEventListener('pointerleave', function () { qx(0); qy(0); });
    });
  }

  /* ---------- keep measurements right (fonts, images, language) ---------- */
  var refresh = function () { ST.refresh(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', function () {
    refresh();
    /* safety net: anything already scrolled past must be visible */
    setTimeout(function () {
      $$('[data-reveal], [data-split]').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight && getComputedStyle(el).visibility === 'hidden') gsap.set(el, { autoAlpha: 1, y: 0 });
      });
    }, 2500);
  });
  document.addEventListener('langchange', function () { requestAnimationFrame(refresh); });
  document.addEventListener('layoutchange', function () { requestAnimationFrame(refresh); });
})();
