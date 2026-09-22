/* Page behaviour: preloader, header, menu, anchors, messenger sheet, FAQ, map, form. */
(function () {
  'use strict';

  /* Where form requests go. Empty = the visitor sends the ready request via WhatsApp or e-mail.
     Paste a Web3Forms / Formspree endpoint here to receive requests directly. [ЗАПОВНИТИ] */
  var FORM_ENDPOINT = '';
  var WA = '380687263833';
  var EMAIL = 'urapotya@ukr.net';

  var root = document.documentElement;
  var body = document.body;
  var reduced = root.classList.contains('rm');
  var Site = window.Site = window.Site || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var t = function (k) { return (window.I18n && I18n.t(k)) || ''; };
  var layoutChanged = function () { document.dispatchEvent(new Event('layoutchange')); };

  /* ---------- preloader ---------- */
  function endPreloader() {
    if (root.classList.contains('pl-done')) return;
    root.classList.add('pl-done');
    try { sessionStorage.setItem('pt-seen', '1'); } catch (e) {}
    document.dispatchEvent(new Event('preloader:done'));
  }
  if (root.classList.contains('pl-skip') || reduced) {
    endPreloader();
  } else {
    var finish = function () { setTimeout(endPreloader, Math.max(0, 1300 - performance.now())); };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    setTimeout(endPreloader, 2300);
  }

  /* ---------- header state + mobile bar ---------- */
  var header = $('.site-header');
  var mbar = $('.mbar');
  var hero = $('.hero');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (mbar) mbar.classList.toggle('is-visible', y > hero.offsetHeight * 0.55);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* current section in nav */
  var navLinks = $$('.nav > a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) io.observe(s); });
  }

  /* ---------- menu ---------- */
  var burger = $('.burger');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menu'));
    if (Site.lenis) { if (open) Site.lenis.stop(); else Site.lenis.start(); }
    body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
    if (sheet && !sheet.hidden) closeSheet();
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });

  /* ---------- in-page anchors ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    var target = id.length > 1 && document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    if (body.classList.contains('menu-open')) setMenu(false);
    if (Site.scrollTo) Site.scrollTo(target); else target.scrollIntoView();
    if (target.id !== 'top') {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });

  /* ---------- messenger sheet (mobile) ---------- */
  var sheet = $('#msg-sheet');
  var sheetBtn = $('[data-sheet-open]');
  function openSheet() {
    sheet.hidden = false;
    sheetBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () { requestAnimationFrame(function () { sheet.classList.add('is-open'); }); });
    $('.sheet__link', sheet).focus();
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    sheetBtn.setAttribute('aria-expanded', 'false');
    setTimeout(function () { sheet.hidden = true; }, reduced ? 0 : 450);
    sheetBtn.focus();
  }
  if (sheet && sheetBtn) {
    sheetBtn.addEventListener('click', openSheet);
    $$('[data-sheet-close]', sheet).forEach(function (b) { b.addEventListener('click', closeSheet); });
  }

  /* ---------- FAQ: animated details ---------- */
  $$('.qa').forEach(function (d) {
    var sum = $('summary', d), ans = $('.qa__a', d);
    sum.addEventListener('click', function (e) {
      if (reduced || !ans.animate) { setTimeout(layoutChanged, 0); return; }
      e.preventDefault();
      if (d.open) {
        var h = ans.offsetHeight;
        var a = ans.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 420, easing: 'cubic-bezier(.65,0,.35,1)' });
        a.onfinish = function () { d.open = false; layoutChanged(); };
      } else {
        d.open = true;
        var h2 = ans.offsetHeight;
        ans.animate([{ height: '0px', opacity: 0 }, { height: h2 + 'px', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = layoutChanged;
      }
    });
  });

  /* ---------- map: loads only on request ---------- */
  var mapBtn = $('[data-map-load]');
  if (mapBtn) mapBtn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=' + encodeURIComponent('Коломия, вулиця Гетьманська, 3Е') + '&z=16&output=embed';
    f.title = t('contact.mapTitle');
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    $('.map').appendChild(f);
    $('.map__ph').remove();
  });

  /* ---------- form ---------- */
  var form = $('#lead-form');
  var done = $('.form-done');
  if (form) {
    var fName = form.elements.name, fPhone = form.elements.phone, fMsg = form.elements.message;
    var status = $('.form__status', form);
    var submitBtn = $('.form__submit', form);

    var setErr = function (input, key) {
      var field = input.closest('.field');
      field.classList.toggle('is-invalid', !!key);
      input.setAttribute('aria-invalid', key ? 'true' : 'false');
      $('.field__err', field).textContent = key ? t(key) : '';
    };
    var digits = function (v) { return v.replace(/\D/g, ''); };
    var validate = function () {
      var ok = true;
      if (fName.value.trim().length < 2) { setErr(fName, 'form.errName'); ok = false; } else setErr(fName, null);
      var d = digits(fPhone.value);
      if (!/^[+\d\s()-]*$/.test(fPhone.value) || d.length < 9 || d.length > 15) { setErr(fPhone, 'form.errPhone'); ok = false; } else setErr(fPhone, null);
      return ok;
    };
    [fName, fPhone].forEach(function (i) {
      i.addEventListener('input', function () { if (i.closest('.field').classList.contains('is-invalid')) validate(); status.textContent = ''; });
    });

    var buildText = function () {
      var method = (form.querySelector('input[name="method"]:checked') || {}).value || 'call';
      var methods = { call: t('form.m1'), viber: 'Viber', telegram: 'Telegram', whatsapp: 'WhatsApp' };
      return [
        t('form.mailIntro'),
        t('form.nameShort') + ': ' + fName.value.trim(),
        t('form.phone') + ': ' + fPhone.value.trim(),
        t('form.methodShort') + ': ' + methods[method],
        fMsg.value.trim() ? t('form.msgShort') + ': ' + fMsg.value.trim() : ''
      ].filter(Boolean).join('\n');
    };

    var showDone = function (mode, text) {
      done.setAttribute('data-mode', mode);
      if (mode === 'handoff') {
        $('[data-send="wa"]', done).href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text);
        $('[data-send="mail"]', done).href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(t('form.mailSubject')) + '&body=' + encodeURIComponent(text);
      }
      form.hidden = true;
      done.hidden = false;
      done.focus();
      layoutChanged();
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.company.value) { showDone('direct'); return; }
      if (!validate()) {
        status.textContent = t('form.errFix');
        (form.querySelector('[aria-invalid="true"]') || fName).focus();
        return;
      }
      status.textContent = '';
      var text = buildText();
      if (!FORM_ENDPOINT) { showDone('handoff', text); return; }
      submitBtn.setAttribute('aria-busy', 'true');
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: fName.value.trim(), phone: fPhone.value.trim(), message: text, lang: root.lang })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        showDone('direct');
      }).catch(function () {
        status.textContent = t('form.errSend');
      }).then(function () { submitBtn.removeAttribute('aria-busy'); });
    });

    $('[data-form-again]', done).addEventListener('click', function () {
      form.reset();
      done.hidden = true;
      form.hidden = false;
      fName.focus();
      layoutChanged();
    });
  }

  /* ---------- misc ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
