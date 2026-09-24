/* i18n — Ukrainian text lives in index.html (visible without JS, indexed by search engines)
   and is captured at start-up. English lives here. `uk` below holds only strings that
   exist purely in JavaScript (errors, e-mail text). */
(function () {
  'use strict';

  var DICT = {
    uk: {
      'a11y.menuClose': 'Закрити меню',
      'contact.mapTitle': 'Офіс на карті Google',
      'form.errName': 'Вкажіть ім’я.',
      'form.errPhone': 'Вкажіть номер телефону: щонайменше 9 цифр.',
      'form.errFix': 'Перевірте виділені поля.',
      'form.errSend': 'Не вдалося надіслати. Зателефонуйте: +380 68 726 38 33.',
      'form.mailIntro': 'Заявка з сайту',
      'form.nameShort': 'Ім’я',
      'form.methodShort': 'Зв’язок',
      'form.msgShort': 'Справа',
      'form.mailSubject': 'Заявка на консультацію'
    },
    en: {
      'preloader': 'Potiatynnyk · attorney',
      'a11y.skip': 'Skip to content',
      'a11y.home': 'Attorney Potiatynnyk — back to top',
      'a11y.nav': 'Main navigation',
      'a11y.fnav': 'Footer navigation',
      'a11y.lang': 'Site language',
      'a11y.menu': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'brand.name': 'Potiatynnyk',
      'brand.role': 'attorney · Kolomyia',
      'nav.about': 'About',
      'nav.practice': 'Practice',
      'nav.cases': 'Situations',
      'nav.process': 'How I work',
      'nav.faq': 'Questions',
      'nav.contact': 'Contact',
      'nav.extra': 'Calls, Telegram, Viber, WhatsApp',
      'cta.short': 'Consultation',
      'cta.consult': 'Book a consultation',
      'cta.talk': 'Let’s start with a conversation',

      'hero.eyebrow': 'Kolomyia · Ukraine and Ukrainians abroad',
      'hero.role': 'Attorney',
      'hero.name': 'Yurii Potiatynnyk',
      'manifesto.html': '<span class="ml"><span>Seventeen years on the bench.</span></span> <span class="ml"><em>Now on your side.</em></span>',
      'hero.lead': 'Civil, criminal and family cases. Property and land documents, civil registry certificates, apostille and translation.',
      'hero.f1': 'Retired judge',
      'hero.f2': 'Licence No. 001751',
      'hero.f3': 'Ukrainian · English',
      'hero.scroll': 'Scroll',
      'hero.alt': 'Attorney Yurii Potiatynnyk in his office',

      'w.1': '+ 17 years on the bench',
      'w.2': '+ procedural know-how',
      'w.3': '+ a plan of action',
      'w.4': '+ 30 years in law',
      'w.5': '+ clarity at every step',
      'w.6': '+ attorney–client privilege',

      'about.eyebrow': '§ 01 — About',
      'about.quote': '“I know how a judge reads a case. For seventeen years, I read them myself.”',
      'about.p1': 'My name is Yurii Potiatynnyk. I have spent more than 30 years in law: first the prosecutor’s office, then 17 years as a judge, including as deputy chief judge of the Kolomyia City and District Court. I retired from the bench at my own request in 2019 and have practised as an attorney since 2020.',
      'about.p2': 'What that means for you: I see your case the way the court will see it. Where the evidence is thin. Which deadline is about to pass. Which argument carries weight, and which one only fills a page.',
      'about.caption': 'Yurii Potiatynnyk · attorney',
      'about.alt': 'Portrait of Yurii Potiatynnyk',
      'about.v1t': 'Straight about your chances',
      'about.v1': 'I will tell you what is realistic and what is not. No promises that can’t honestly be made.',
      'about.v2t': 'In person',
      'about.v2': 'A sole practice: I handle your case myself, from the first call to the ruling.',
      'about.v3t': 'Confidential',
      'about.v3': 'Everything you tell me is protected by attorney–client privilege.',

      'practice.eyebrow': '§ 02 — Practice',
      'practice.title': 'What people bring to me',
      'practice.w1': 'Civil',
      'practice.w2': 'Criminal',
      'practice.w3': 'Family',
      'practice.w4': 'Property',
      'practice.w5': 'Documents',
      'practice.w6': 'Counsel',
      'practice.come': 'What to bring',
      'practice.n1': 'Art. 01',
      'practice.t1': 'Civil cases',
      'practice.d1': 'Debts and IOUs, contracts, inheritance, division of property, compensation for damage.',
      'practice.c1': 'The contract or IOU, correspondence, receipts. Anything with a date and a signature.',
      'practice.n2': 'Art. 02',
      'practice.t2': 'Criminal cases',
      'practice.d2': 'Defence at questioning and after a notice of suspicion, at trial and on appeal. I also represent victims.',
      'practice.c2': 'The summons and copies of any records you have. If you have been called in, phone me before the interview.',
      'practice.n3': 'Art. 03',
      'practice.t3': 'Family cases',
      'practice.d3': 'Divorce, child support, where the children will live, division of shared property.',
      'practice.c3': 'Marriage and birth certificates, property documents, proof of income.',
      'practice.n4': 'Art. 04',
      'practice.t4': 'Property and technical documents',
      'practice.d4': 'Technical documentation, registering ownership of a house, flat or land, establishing ownership through the courts.',
      'practice.c4': 'Any papers on the house or land, however old: village council decisions, contracts, certificates.',
      'practice.n5': 'Art. 05',
      'practice.t5': 'Civil registry, apostille, translation',
      'practice.d5': 'Duplicate birth, marriage and death certificates, registry extracts, apostille and translation for use in another country.',
      'practice.c5': 'Your passport and the details of the person the document is for. This can be done remotely.',
      'practice.n6': 'Art. 06',
      'practice.t6': 'Support and representation',
      'practice.d6': 'I represent you in court, before public authorities, at the notary and with enforcement officers.',
      'practice.c6': 'Whatever you have. We will work out together what is missing.',

      'abroad.eyebrow': '§ 03 — Ukrainians abroad',
      'abroad.title': 'You live in Poland, Italy or Canada, while your case is in Ukraine.',
      'abroad.lead': 'You don’t have to travel. I handle most matters remotely and keep you updated by messenger.',
      'abroad.c1': 'Warsaw',
      'abroad.c2': 'Prague',
      'abroad.c3': 'Milan',
      'abroad.c4': 'Lisbon',
      'abroad.c5': 'Toronto',
      'abroad.c6': 'Kolomyia',
      'abroad.s1t': 'Online consultation',
      'abroad.s1': 'By phone, Viber, Telegram or WhatsApp. In Ukrainian or English.',
      'abroad.s2t': 'Power of attorney',
      'abroad.s2': 'I’ll explain how to sign one at a consulate, or with a local notary plus an apostille.',
      'abroad.s3t': 'Documents',
      'abroad.s3': 'I obtain civil registry certificates, arrange the apostille and translation, and send them to you.',
      'abroad.s4t': 'Court and notary',
      'abroad.s4': 'I represent you in court, at the notary and before the authorities while you stay where you are.',

      'cases.eyebrow': '§ 04 — Typical situations',
      'cases.title': 'What to do if…',
      'cases.note': 'These are composite situations people bring to me most often. Not real cases: those are protected by privilege.',
      'cases.hint': 'Scroll',
      'cases.sit': 'Situation',
      'cases.act': 'What I do',
      'cases.now': 'What to do now',
      'cases.no1': 'Case No. 01',
      'cases.tag1': 'Inheritance',
      'cases.t1': 'An inheritance in Ukraine while you live abroad',
      'cases.s1': 'A relative has died, the estate is here and you are in another country. The law gives six months to accept an inheritance.',
      'cases.a1': 'I explain how to issue a power of attorney, gather the documents and handle the matter with the notary. If the deadline has passed, in court.',
      'cases.n1': 'Work out how long it has been since the date of death, and call before six months are up.',
      'cases.no2': 'Case No. 02',
      'cases.tag2': 'Criminal',
      'cases.t2': 'You have been summoned for questioning',
      'cases.s2': 'A summons has arrived, or you have been notified of suspicion. It is frightening, and you want to explain everything at once.',
      'cases.a2': 'I attend the questioning with you, review the case file and build the defence from day one.',
      'cases.n2': 'Give no statements without a lawyer. You have a constitutional right not to testify against yourself.',
      'cases.no3': 'Case No. 03',
      'cases.tag3': 'Family',
      'cases.t3': 'Divorce, child support, children',
      'cases.s3': 'The marriage is over but the questions remain: where the children will live, who pays and how much, how to divide the property.',
      'cases.a3': 'I prepare the claim or an agreement and represent you in court, including while you are abroad.',
      'cases.n3': 'Gather your marriage certificate, the children’s birth certificates and the documents on shared property.',
      'cases.no4': 'Case No. 04',
      'cases.tag4': 'Property',
      'cases.t4': 'The house is there, the papers are not',
      'cases.s4': 'The house has stood for decades, but ownership was never registered. You cannot sell it, gift it or inherit it.',
      'cases.a4': 'I order the technical documentation, register ownership and, if needed, establish it in court.',
      'cases.n4': 'Find every paper on the house and land, however old: village council decisions, certificates, contracts.',
      'cases.no5': 'Case No. 05',
      'cases.tag5': 'Documents',
      'cases.t5': 'You need a certificate from Ukraine',
      'cases.s5': 'For work or a residence permit abroad you need a birth or marriage certificate with an apostille and a translation.',
      'cases.a5': 'I obtain a duplicate certificate or extract, arrange the apostille and translation, and send it to you.',
      'cases.n5': 'Tell me which document you need and for which country. I’ll take care of the rest.',
      'cases.no6': 'Case No. 06',
      'cases.tag6': 'Civil',
      'cases.t6': 'Someone owes you money',
      'cases.s6': 'You lent money against an IOU and it is not coming back. Or the opposite: someone is claiming a debt you dispute.',
      'cases.a6': 'I assess the documents, draft a demand or a claim, argue it in court and see the judgment enforced.',
      'cases.n6': 'Keep every IOU and message. For most claims the limitation period is three years.',

      'figures.eyebrow': '§ 05 — In numbers',
      'figures.title': 'Prosecution, bench, defence. I have worked in every role.',
      'figures.l1': 'years in law',
      'figures.l2': 'years as a judge, including as deputy chief judge',
      'figures.l3': 'years at the prosecutor’s office',
      'figures.l4': 'consultation languages: Ukrainian and English',

      'path.eyebrow': '§ 06 — Career',
      'path.title': 'From prosecutor to defence attorney',
      'path.verify': 'You can check my licence in the Unified Register of Attorneys of Ukraine.',
      'path.verifyLink': 'Open the register',
      'path.t1': 'Law degree',
      'path.d1': 'Ivan Franko University of Lviv.',
      'path.y2': '4 years',
      'path.t2': 'Prosecutor’s office',
      'path.d2': 'Work at the prosecutor’s office: the prosecution side, seen from the inside.',
      'path.y3': '17 years',
      'path.t3': 'Judge',
      'path.d3': 'Judge of the Kolomyia City and District Court, Ivano-Frankivsk Region, later deputy chief judge.',
      'path.t4': 'Elected to the bench without term limit',
      'path.d4': 'Resolution of the Verkhovna Rada of Ukraine No. 300-VI.',
      'path.t5': 'Supreme Court competitions',
      'path.d5': 'Candidate in the competitions for the position of Supreme Court judge.',
      'path.t6': 'Retirement',
      'path.d6': 'Retired from the bench at my own request.',
      'path.t7': 'Attorney',
      'path.d7': 'Licence No. 001751 of 28 August 2020, Bar Council of Ivano-Frankivsk Region. Sole practice.',

      'process.eyebrow': '§ 07 — How I work',
      'process.title': 'Four steps from the first call to a decision',
      'process.t1': 'Call',
      'process.d1': 'Tell me briefly what happened. I’ll tell you whether I can help and what to bring to the meeting.',
      'process.t2': 'Consultation',
      'process.d2': 'We go through the documents and the options. You get an honest assessment: chances, risks, deadlines. In the office or online.',
      'process.t3': 'Agreement',
      'process.d3': 'We put in writing exactly what I will do, by when, and what it costs.',
      'process.t4': 'The work',
      'process.d4': 'I run the case and tell you about every important step myself. You won’t have to call and ask.',

      'reviews.eyebrow': '§ 08 — Reviews',
      'reviews.title': 'What clients say',
      'reviews.r1': 'Thank you, Yurii Romanovych, for your work! From now on I will recommend you to everyone I know as a competent lawyer you can turn to for qualified help.',
      'reviews.src1': 'Google Maps · 2022 · translated',
      'reviews.r2': 'Great specialist! Helped me in a difficult situation. Works for results. Thank you!',
      'reviews.n2': 'Yana M.',
      'reviews.src2': 'List.in.ua · 2022 · translated',
      'reviews.r3': 'Thank you for the excellent work. You are a true professional!',
      'reviews.n3': 'Liubov M.',
      'reviews.src3': 'Google Maps · 2022 · translated',
      'reviews.all': 'All reviews on Google',

      'faq.eyebrow': '§ 09 — Questions',
      'faq.title': 'What people ask before the first meeting',
      'faq.more': 'Didn’t find your answer? Call:',
      'faq.n1': 'Question 1',
      'faq.q1': 'How much does a consultation cost?',
      'faq.a1': 'It depends on the case. I name the fee in our first conversation, before any work starts, and it goes into the agreement.',
      'faq.n2': 'Question 2',
      'faq.q2': 'I live abroad. Can you help?',
      'faq.a2': 'Yes. We talk by phone or messenger, and you sign a power of attorney at a consulate or with a local notary plus an apostille. From there, I represent you in Ukraine.',
      'faq.n3': 'Question 3',
      'faq.q3': 'What should I bring to the first meeting?',
      'faq.a3': 'Your passport and every document related to the case: contracts, correspondence, summonses, decisions. If you are not sure what matters, bring everything.',
      'faq.n4': 'Question 4',
      'faq.q4': 'Will our conversation stay confidential?',
      'faq.a4': 'Yes. Everything you tell an attorney is privileged under Article 22 of the Law of Ukraine “On the Bar and Practice of Law”.',
      'faq.n5': 'Question 5',
      'faq.q5': 'Do you guarantee the outcome?',
      'faq.a5': 'No. The court makes the decision, and the rules of professional conduct forbid promising a result. What I promise instead: an honest assessment, thorough preparation and attention to every deadline.',
      'faq.n6': 'Question 6',
      'faq.q6': 'Do you take criminal cases at the investigation stage?',
      'faq.a6': 'Yes. From the first questioning or notice of suspicion through to the verdict and any appeal.',
      'faq.n7': 'Question 7',
      'faq.q7': 'Which languages can we use?',
      'faq.a7': 'Ukrainian or English.',

      'finale.word': 'Balance.',
      'finale.manifesto': 'Seventeen years on the bench. Now on your side.',

      'contact.eyebrow': '§ 10 — Contact',
      'contact.title': 'Tell me what happened',
      'contact.lead': 'The first conversation commits you to nothing. Leave your number and I will call you back during working hours.',
      'contact.phone1': 'Phone · calls and messengers',
      'contact.phone2': 'Second number',
      'contact.email': 'Email',
      'contact.addr': 'Office',
      'contact.addrV': '3E Hetmanska St., Kolomyia',
      'contact.hours': 'Hours',
      'contact.hoursV': 'Mon–Fri from 9:00, by appointment',
      'contact.mapCity': 'Kolomyia',
      'contact.mapBtn': 'Show on the map',
      'contact.mapExt': 'Open in Google Maps',
      'contact.mapTitle': 'Office location on Google Maps',

      'form.title': 'Book a consultation',
      'form.name': 'Your name',
      'form.phone': 'Phone',
      'form.msg': 'What the case is about <span class="muted">(optional)</span>',
      'form.method': 'How should I contact you',
      'form.m1': 'Call',
      'form.submit': 'Send request',
      'form.consent': 'By sending this request you agree that I will use these details only to contact you.',
      'form.okTitle': 'Thank you, request received',
      'form.okText': 'I will call you during working hours. If it is urgent, call +380 68 726 38 33.',
      'form.hoTitle': 'Your request is ready',
      'form.hoText': 'Send it with one tap, via WhatsApp or by email. I will reply during working hours.',
      'form.sendWa': 'Send via WhatsApp',
      'form.sendMail': 'Send by email',
      'form.again': 'Fill in again',
      'form.errName': 'Enter your name.',
      'form.errPhone': 'Enter a phone number with at least 9 digits.',
      'form.errFix': 'Check the highlighted fields.',
      'form.errSend': 'Couldn’t send the request. Call +380 68 726 38 33.',
      'form.mailIntro': 'Request from the website',
      'form.nameShort': 'Name',
      'form.methodShort': 'Contact via',
      'form.msgShort': 'Case',
      'form.mailSubject': 'Consultation request',

      'footer.manifesto': 'Seventeen years on the bench. <em>Now on your side.</em>',
      'footer.name': 'Yurii Potiatynnyk, Attorney at Law',
      'footer.cert': 'Licence to practise law No. 001751 of 28 August 2020.',
      'footer.note': 'Information on this site is not legal advice.',
      'mbar.call': 'Call',
      'mbar.write': 'Message',
      'sheet.title': 'Message me',
      'sheet.close': 'Close'
    }
  };

  var META = {
    uk: {
      title: document.title,
      desc: 'Адвокат у Коломиї: цивільні, кримінальні та сімейні справи, документи на нерухомість, РАЦС, апостиль. 17 років суддею, понад 30 років у праві. Працюю й з українцями за кордоном.',
      ogTitle: 'Адвокат Юрій Потятинник — сімнадцять років за суддівським столом',
      ogDesc: 'Цивільні, кримінальні та сімейні справи, документи, апостиль. Коломия, Україна та українці за кордоном.',
      locale: 'uk_UA', html: 'uk', url: ''
    },
    en: {
      title: 'Yurii Potiatynnyk, Attorney in Kolomyia · Retired Judge',
      desc: 'Attorney in Kolomyia, Ukraine: civil, criminal and family cases, property documents, civil registry, apostille. 17 years as a judge, 30+ years in law. Working with Ukrainians abroad.',
      ogTitle: 'Attorney Yurii Potiatynnyk — seventeen years on the bench',
      ogDesc: 'Civil, criminal and family cases, documents, apostille. Kolomyia, Ukraine and Ukrainians abroad.',
      locale: 'en_US', html: 'en', url: '?lang=en'
    }
  };

  var root = document.documentElement;
  var nodes = document.querySelectorAll('[data-i18n]');
  var attrNodes = document.querySelectorAll('[data-i18n-attr]');
  var base = {};
  var current = 'uk';

  function pairs(el) {
    return el.getAttribute('data-i18n-attr').split(';').map(function (p) {
      var i = p.indexOf(':');
      return { attr: p.slice(0, i).trim(), key: p.slice(i + 1).trim() };
    });
  }

  /* capture the Ukrainian original once */
  nodes.forEach(function (n) { var k = n.getAttribute('data-i18n'); if (!(k in base)) base[k] = n.innerHTML; });
  attrNodes.forEach(function (n) { pairs(n).forEach(function (p) { if (!(p.key in base)) base[p.key] = n.getAttribute(p.attr); }); });

  function t(key, lang) {
    lang = lang || current;
    if (lang === 'en') return DICT.en[key];
    return DICT.uk[key] != null ? DICT.uk[key] : base[key];
  }

  function setMeta(sel, attr, val) { var m = document.querySelector(sel); if (m) m.setAttribute(attr, val); }

  function apply(lang) {
    if (lang !== 'en') lang = 'uk';
    current = lang;
    nodes.forEach(function (n) {
      var v = t(n.getAttribute('data-i18n'), lang);
      if (v != null && n.innerHTML !== v) n.innerHTML = v;
    });
    attrNodes.forEach(function (n) {
      pairs(n).forEach(function (p) { var v = t(p.key, lang); if (v != null) n.setAttribute(p.attr, v); });
    });
    var m = META[lang];
    root.lang = m.html;
    document.title = m.title;
    setMeta('meta[name="description"]', 'content', m.desc);
    setMeta('meta[property="og:title"]', 'content', m.ogTitle);
    setMeta('meta[property="og:description"]', 'content', m.ogDesc);
    setMeta('meta[property="og:locale"]', 'content', m.locale);
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.href = canon.href.split('?')[0] + m.url;
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var burger = document.querySelector('.burger');
    if (burger) burger.setAttribute('aria-label', t(document.body.classList.contains('menu-open') ? 'a11y.menuClose' : 'a11y.menu', lang));
    try { localStorage.setItem('pt-lang', lang); } catch (e) {}
    try { history.replaceState(null, '', location.pathname + m.url + location.hash); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (b) apply(b.getAttribute('data-lang'));
  });

  var q = (location.search.match(/[?&]lang=(en|uk)/) || [])[1];
  var saved = null;
  try { saved = localStorage.getItem('pt-lang'); } catch (e) {}
  var start = q || saved || 'uk';
  if (start === 'en') apply('en');
  root.classList.remove('lang-pending');

  window.I18n = { t: function (k) { return t(k); }, set: apply, get lang() { return current; } };
})();
