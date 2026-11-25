/* Kirubel Negash — portfolio scroll choreography (no dependencies). */
(() => {
  'use strict';

  // ---------- Content (from résumé) ----------
  const PROJECTS = [
    {
      name: 'Ping Identity Migration', meta: 'Brighthouse Financial · 2023–26', stat: 'SSO + Federation',
      line: 'Legacy identity, moved to Ping —', em: 'without a dropped login.',
      tags: 'Requirements / Solution design / Cutover', word: 'PING',
      bg: 'linear-gradient(160deg,#e9e5dc,#d9d2c4)', ink: '#2a2620',
      details: [
        'Led requirements and solution design for the migration from a legacy identity platform to Ping Identity (SSO and federation).',
        'Carried the program through testing and cutover, and presented plans and tradeoffs to executive stakeholders.',
        'Own the roadmap for enterprise identity and access systems covering 65K+ monthly users, from onboarding through access reviews and offboarding.',
      ],
    },
    {
      name: 'Partner Access Standard', meta: 'OAuth · OIDC · SAML', stat: 'Partner adoption +30%',
      line: 'One secure door for every partner,', em: 'opened by the partner.',
      tags: 'API integrations / Governance / SOX', word: 'OAUTH',
      bg: 'linear-gradient(160deg,oklch(0.5 0.17 265),oklch(0.4 0.17 265))', ink: '#fff',
      details: [
        'Standardized secure access for third-party apps and API integrations using OAuth, OIDC, and SAML, growing partner adoption 30%.',
        'Partnered with Finance on SAP integration to reconcile license and entitlement data.',
        'Aligned system changes with ServiceNow CMDB, change management, and SOX compliance practices.',
      ],
    },
    {
      name: 'AI & Automation in Identity Ops', meta: 'Claude · Agentic AI · ML workflows', stat: 'Login abandonment −12%',
      line: 'Automation that removes friction', em: 'users never notice.',
      tags: 'Agentic AI / Journey mapping / Friction −20%', word: 'AGENT',
      bg: 'linear-gradient(160deg,#dfe8e1,#c4d5c9)', ink: '#1f2a23',
      details: [
        'Evaluated and embedded ML-driven workflow automation into operations, cutting login abandonment by 12%.',
        'Mapped user journeys and drop-off points to reduce user friction by 20%.',
        'Piloted generative AI, agentic tools (Claude) and low-code, prompt-based interfaces in Ping Identity and Saviynt, with human review of AI output before release.',
      ],
    },
    {
      name: 'Access Request Rebuild', meta: 'Brighthouse Financial · 2021–23', stat: 'Failures −25%',
      line: 'Faster access requests,', em: 'fewer 2am incidents.',
      tags: 'Workflows / KPIs / Predictive provisioning', word: 'ACCESS',
      bg: 'linear-gradient(160deg,#f0dfd3,#e2c6b4)', ink: '#3a2a20',
      details: [
        'Cut system failures 25% and sped up access request processing 20% through targeted enhancements to core components and workflows.',
        'Analyzed KPIs across domain-critical systems, improving data accuracy for executive decision-making.',
        'Helped integrate predictive analytics into provisioning workflows across ERP and CRM platforms.',
      ],
    },
  ];

  const STEPS = [
    { yr: '2017', t: 'Systems', co: 'Analyst — Caret', d: 'Designed automated workflows for cloud platforms, cutting issue resolution time 40%.', k: 'Workflows / NetSuite', bg: '#ece8df' },
    { yr: '2018', t: 'Business', co: 'Systems Analyst — Arrowhead', d: 'Halved decision time with web-based API tooling; shortened time‑to‑market 35%.', k: 'SDLC / Agile / APIs', bg: '#dfe8e1' },
    { yr: '2021', t: 'Lead', co: 'BSA — Brighthouse', d: 'Cut system failures 25% and made access requests 20% faster.', k: 'KPIs / ERP / CRM', bg: '#dde3f0' },
    { yr: '2023', t: 'Sr. Lead', co: 'BSA — Brighthouse', d: 'Leading 6 analysts across 4 business areas and the identity roadmap for 65K+ users.', k: 'IAM / Leadership / Salesforce', bg: '#f0dfd3' },
  ];

  // ---------- Render ----------
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const deck = $('[data-deck]');
  deck.innerHTML = PROJECTS.map((c, i) => `
    <article class="card" style="background:${c.bg};color:${c.ink}">
      <div class="card__top">
        <div><div class="card__name">${esc(c.name)}</div><div class="card__meta">${esc(c.meta)}</div></div>
        <span class="card__stat">${esc(c.stat)}</span>
      </div>
      <div class="card__line">${esc(c.line)} <i>${esc(c.em)}</i></div>
      <div class="card__bottom">
        <span class="card__tags">${esc(c.tags)}</span>
        <button class="card__btn" data-open="${i}">View project <span>→</span></button>
      </div>
      <div class="card__word" aria-hidden="true">${esc(c.word)}</div>
    </article>`).join('');
  $('[data-dots]').innerHTML = PROJECTS.map(() => '<span></span>').join('');

  $('[data-steps]').innerHTML = STEPS.map(s => `
    <div class="step">
      <span class="step__yr" style="background:${s.bg}">${s.yr}</span>
      <div class="step__body" style="background:${s.bg}">
        <div class="step__t">${esc(s.t)}</div>
        <i class="step__co">${esc(s.co)}</i>
        <p class="step__d">${esc(s.d)}</p>
        <span class="step__k">${esc(s.k)}</span>
      </div>
    </div>`).join('');

  // ---------- Project modal ----------
  const modal = $('[data-modal]');
  const openProject = idx => {
    const p = PROJECTS[idx];
    $('[data-m-meta]').textContent = p.meta.toUpperCase();
    $('[data-m-title]').textContent = p.name;
    $('[data-m-stat]').textContent = p.stat;
    $('[data-m-list]').innerHTML = p.details.map(d => `<li>${esc(d)}</li>`).join('');
    $('[data-m-tags]').textContent = p.tags;
    if (!modal.open) modal.showModal();
  };
  deck.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const idx = el.cards.indexOf(card);
    // "View project" always opens that project, on any card.
    if (e.target.closest('[data-open]')) return openProject(idx);
    // Clicking the body of a card: the front one opens, a side one comes to the front.
    if (isStatic || card.dataset.front === '1') openProject(idx);
    else scrollTo({ top: el.work.offsetTop + idx * innerHeight, behavior: 'smooth' });
  });
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  // ---------- Scroll choreography ----------
  const cl = v => Math.max(0, Math.min(1, v));
  const r = (v, a, b) => cl((v - a) / (b - a));
  const ez = v => (v < .5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2);

  const el = {
    hero: $('.hero'), work: $('.work'), career: $('[data-career]'),
    heroText: $$('[data-hero-text]'), badge: $('[data-badge]'),
    frame: $('[data-frame]'), frameLabels: $$('[data-frame-label]'),
    scan: $('[data-scan]'), status: $('[data-status]'), pct: $('[data-pct]'),
    details: $('[data-details]'), cards: $$('.card'), dots: $$('[data-dots] span'),
    steps: $$('.step'), endbadge: $('[data-endbadge]'),
  };

  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  let isStatic = false;
  const setMode = () => {
    isStatic = innerWidth < 900 || mqReduce.matches;
    document.documentElement.classList.toggle('is-static', isStatic);
  };
  setMode();
  addEventListener('resize', setMode);
  mqReduce.addEventListener?.('change', setMode);

  function frame(ms) {
    requestAnimationFrame(frame);
    if (isStatic) return;
    const t = ms / 1000;
    const h = innerHeight;
    const sy = scrollY;

    // Hero: badge swings, slides left, gets scanned, details appear, then badge lifts away.
    const y = sy - el.hero.offsetTop;
    const p = cl(y / (2 * h));
    const move = ez(r(p, 0, .35)), exit = ez(r(p, .82, 1));
    const swing = Math.sin(t * 1.3) * 4 * (1 - move) + Math.sin(t * .7) * .6;
    const sp = r(p, .42, .62);
    const textO = 1 - r(p, 0, .2);
    el.heroText.forEach(n => {
      n.style.opacity = textO;
      if (n.classList.contains('hero__text')) n.style.transform = `translateY(calc(-50% + ${-r(p, 0, .2) * 40}px))`;
    });
    el.badge.style.left = `${72 - 42 * move}%`;
    el.badge.style.transform = `translate(-50%, ${-exit * h * 1.1}px) rotate(${swing - exit * 10}deg)`;
    const frameO = r(p, .33, .42) * (1 - exit);
    el.frame.style.opacity = frameO;
    el.frameLabels.forEach(n => (n.style.opacity = frameO));
    el.scan.style.top = `${sp * 100}%`;
    el.scan.style.opacity = p > .42 && p < .64 ? 1 : 0;
    el.status.textContent = sp < 1 ? 'READING…' : 'VERIFIED ✓';
    el.pct.textContent = Math.round(sp * 100);
    const detIn = r(p, .55, .68);
    el.details.style.opacity = detIn * (1 - exit);
    el.details.style.transform = `translateY(calc(-50% + ${(1 - detIn) * 24}px))`;

    // Work: 3D carousel driven by scroll.
    const f = cl((sy - el.work.offsetTop) / (3 * h)) * 3;
    el.cards.forEach((c, i) => {
      const d = i - f, ad = Math.abs(d);
      c.style.transform = `translateX(${d * 68}%) translateZ(${-ad * 220}px) rotateY(${-d * 22}deg)`;
      c.style.opacity = Math.max(0, 1 - ad * .4);
      c.style.zIndex = 10 - Math.round(ad * 2);
      const front = Math.round(f) === i;
      c.dataset.front = front ? '1' : '0';
      c.style.pointerEvents = c.style.opacity > .05 ? 'auto' : 'none';
      c.style.cursor = 'pointer';
    });
    el.dots.forEach((d, i) => (d.style.opacity = Math.round(f) === i ? 1 : .25));

    // Career: cards rise in, staggered.
    const ct = el.career.offsetTop;
    const q = r(sy, ct - h * .9, ct - h * .1);
    el.steps.forEach((s, i) => {
      const qi = ez(cl(q * 1.6 - i * .2));
      s.style.transform = `translateY(${(1 - qi) * 90}px)`;
      s.style.opacity = qi;
    });

    // Contact: closing badge turns to face you.
    const sh = document.documentElement.scrollHeight;
    const p4 = ez(r(sy, sh - 2 * h, sh - h));
    el.endbadge.style.transform = `rotateY(${(1 - p4) * 80}deg) rotate(${Math.sin(t * 1.1) * 2 * p4}deg)`;
  }
  requestAnimationFrame(frame);
})();
