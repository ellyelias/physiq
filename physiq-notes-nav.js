/* PhysiQ Notes navigation: semester first, then a menu (Chapters, Section A guide, Section B & C guide,
   Formula list, Definition list, Syllabus derivations). It drives the original #notes-topic-select, which stays
   in the page (visually hidden) so every existing link into the notes keeps working. UI only. */
(function () {
  const sel = document.getElementById('notes-topic-select');
  const semSel = document.getElementById('semester-select');
  const content = document.getElementById('notes-content');
  const card = sel && sel.closest('.card');
  if (!sel || !semSel || !content || !card) return;

  const SEMS = [
    { v: '1', name: 'Semester 1', sub: 'Mechanics & Heat', ch: 'Chapters 1–12' },
    { v: '2', name: 'Semester 2', sub: 'Electricity & Magnetism', ch: 'Chapters 12–18' },
    { v: '3', name: 'Semester 3', sub: 'Oscillations, Waves & Modern Physics', ch: 'Chapters 19–25' }
  ];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ICON = {
    ch: '<path d="M4 5h7v14H4zM13 5h7v14h-7z"/>',
    a: '<path d="M5 19l5-14h4l5 14M8 13h8"/>',
    bc: '<path d="M6 4h9l3 3v13H6z"/><path d="M9 11h6M9 15h6"/>',
    f: '<path d="M5 6h14M5 12h9M5 18h6"/><path d="M17 15l3 3-3 3"/>',
    d: '<path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    dv: '<path d="M4 18c4 0 4-12 8-12s4 12 8 12"/><path d="M4 6h3"/>',
    back: '<path d="M15 6l-6 6 6 6"/>', go: '<path d="M9 6l6 6-6 6"/>'
  };
  const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  // layout: nav box after the intro; the original label/select become visually hidden; practise + downloads show with content
  const label = card.querySelector('label');
  [label, sel].forEach(el => el && el.classList.add('nn-hide'));
  const nav = document.createElement('div'); nav.id = 'nn'; nav.className = 'nn';
  card.insertBefore(nav, label || sel);
  const extras = [card.querySelector('#notes-practise-btn') && card.querySelector('#notes-practise-btn').closest('.btn-row'), card.querySelector('#notes-downloads')].filter(Boolean);
  const contentCard = document.getElementById('notes-content-card');

  let view = 'sem', ignoreUntil = 0;
  // the same semester → menu → chapters flow on the Home page (replaces the hero panel); picking opens Notes
  const homeWrap = document.querySelector('.v2-home');
  let home = null, homeView = 'sem';
  if (homeWrap) {
    home = document.createElement('section'); home.id = 'nn-home'; home.className = 'nn nn-home';
    homeWrap.insertBefore(home, homeWrap.firstChild);
    const hero = homeWrap.querySelector('.v2-hero'); if (hero) hero.classList.add('nn-off');
  }

  function groups() {
    return [...sel.querySelectorAll('optgroup')].map(g => ({ label: g.label, opts: [...g.querySelectorAll('option')].map(o => ({ v: o.value, t: o.textContent })) }));
  }
  const semNow = () => SEMS.find(s => s.v === String(semSel.value)) || SEMS[0];
  const chapterGroups = () => groups().filter(g => /^Chapter\b/i.test(g.label));
  const bcGroup = () => groups().find(g => /Sections B/i.test(g.label));
  function kindOf(v) {
    if (/^GUIDE-/.test(v)) return 'Section A guide';
    if (/^FORMULA-/.test(v)) return 'Formula list';
    if (/^DEFS-/.test(v)) return 'Definition list';
    if (/^DERIV-/.test(v)) return 'Syllabus derivations';
    const bc = bcGroup(); if (bc && bc.opts.some(o => o.v === v)) return 'Section B & C guide';
    return 'Chapters';
  }

  function pick(v) { if (![...sel.options].some(o => o.value === v)) return; sel.value = v; sel.dispatchEvent(new Event('change')); }
  function openInNotes(v) {
    const tab = document.querySelector('.tab[data-tab="notes"]'); if (tab) tab.click();   // untrusted click: Notes keeps its own view
    pick(v); try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
  }
  function show(v) { view = v; render(); try { nav.scrollIntoView({ block: 'nearest' }); } catch (e) {} }

  function render() {
    const inContent = view === 'content';
    extras.forEach(el => el.classList.toggle('nn-off', !inContent));
    if (contentCard) contentCard.classList.toggle('nn-off', !inContent);
    nav.dataset.view = view;
    nav.innerHTML = markup(view, false);
    if (home) { home.dataset.view = homeView; home.innerHTML = markup(homeView, true); }
  }
  function markup(view, isHome) {
    const s = semNow();
    const intro = isHome ? `<p class="nn-hello">Your STPM Physics companion</p>` : '';
    if (view === 'sem') {
      return intro + `${isHome ? '<h2 class="nn-big">Choose your semester</h2>' : '<p class="nn-step">Choose your semester</p>'}<div class="nn-sems">${SEMS.map(x =>
        `<button type="button" class="nn-sem${x.v === s.v ? ' cur' : ''}" data-sem="${x.v}"><span class="nn-sem-n">${x.name}</span><span class="nn-sem-s">${esc(x.sub)}</span><span class="nn-sem-c">${x.ch}</span>${svg('go')}</button>`).join('')}</div>`;
    }
    const crumbs = [`<button type="button" class="nn-crumb" data-view="sem">${svg('back')}All semesters</button>`];
    if (view !== 'menu') crumbs.push(`<button type="button" class="nn-crumb" data-view="menu">${s.name}</button>`);
    if (view === 'content' && kindOf(sel.value) === 'Chapters') crumbs.push(`<button type="button" class="nn-crumb" data-view="chapters">Chapters</button>`);
    if (view === 'content' && kindOf(sel.value) === 'Section B & C guide' && bcGroup().opts.length > 1) crumbs.push(`<button type="button" class="nn-crumb" data-view="bc">Section B &amp; C guide</button>`);
    const head = intro + `<div class="nn-crumbs">${crumbs.join('<span class="nn-sep">›</span>')}</div>`;
    if (view === 'menu') {
      const bc = bcGroup(), sem = s.v;
      const items = [
        { k: 'ch', t: 'Chapters', s: `${chapterGroups().length} chapters, topic by topic`, act: 'chapters', c: 'c1' },
        { k: 'a', t: 'Section A guide', s: 'Traps, tricks and a routine for the objective paper', v: 'GUIDE-' + sem, c: 'c2' },
        bc ? { k: 'bc', t: 'Section B & C guide', s: 'Exam technique and the definitions keyword bank', act: bc.opts.length > 1 ? 'bc' : null, v: bc.opts.length === 1 ? bc.opts[0].v : null, c: 'c3' } : null,
        { k: 'f', t: 'Formula list', s: 'Every formula with symbols and units', v: 'FORMULA-' + sem, c: 'c4' },
        { k: 'd', t: 'Definition list', s: 'Definitions and laws, key words in bold', v: 'DEFS-' + sem, c: 'c5' },
        { k: 'dv', t: 'Syllabus derivations', s: 'The derivations STPM 2026 asks for', v: 'DERIV-' + sem, c: 'c6' }
      ].filter(Boolean);
      return head + `<h3 class="nn-title">${s.name} <span>${esc(s.sub)}</span></h3><div class="nn-menu">${items.map(i =>
        `<button type="button" class="nn-item ${i.c}" ${i.act ? `data-view="${i.act}"` : `data-pick="${esc(i.v)}"`}><span class="nn-ico">${svg(i.k)}</span><span class="nn-txt"><b>${i.t}</b><span>${i.s}</span></span>${svg('go')}</button>`).join('')}</div>`;
    }
    if (view === 'chapters') {
      const cur = isHome ? '' : sel.value;
      return head + `<h3 class="nn-title">Chapters <span>${s.name}</span></h3><div class="nn-chs">${chapterGroups().map((g, i) => {
        const m = g.label.match(/^Chapter\s+(\d+)\s*[—–-]\s*(.*)$/i);
        const open = g.opts.some(o => o.v === cur);
        return `<details class="nn-ch"${open ? ' open' : ''}><summary><span class="nn-chn">${m ? m[1] : i + 1}</span><span class="nn-cht">${esc(m ? m[2] : g.label)}</span>${svg('go')}</summary><div class="nn-tps">${g.opts.map(o =>
          `<button type="button" class="nn-tp${o.v === cur ? ' cur' : ''}" data-pick="${esc(o.v)}">${esc(o.t)}</button>`).join('')}</div></details>`;
      }).join('')}</div>`;
    }
    if (view === 'bc') {
      const bc = bcGroup();
      return head + `<h3 class="nn-title">Section B &amp; C guide <span>${s.name}</span></h3><div class="nn-chs">${(bc ? bc.opts : []).map(o =>
        `<button type="button" class="nn-tp nn-tp-big" data-pick="${esc(o.v)}">${esc(o.t)}${svg('go')}</button>`).join('')}</div>`;
    }
    return head;   // content
  }

  function onClick(e, isHome) {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.sem) {
      if (String(semSel.value) !== b.dataset.sem) { ignoreUntil = Date.now() + 800; semSel.value = b.dataset.sem; semSel.dispatchEvent(new Event('change')); }
      if (isHome) { homeView = 'menu'; render(); } else show('menu');
      return;
    }
    if (b.dataset.view) {
      if (isHome) { homeView = b.dataset.view === 'content' ? 'menu' : b.dataset.view; render(); try { home.scrollIntoView({ block: 'nearest' }); } catch (err) {} }
      else show(b.dataset.view);
      return;
    }
    if (b.dataset.pick) { if (isHome) openInNotes(b.dataset.pick); else pick(b.dataset.pick); }
  }
  nav.addEventListener('click', e => onClick(e, false));
  if (home) home.addEventListener('click', e => onClick(e, true));

  // anything that renders a note (menu, Learn, Home, mind map "View derivations") opens the content view
  new MutationObserver(() => {
    if (Date.now() < ignoreUntil) return;
    if (view !== 'content') { view = 'content'; render(); } else render();
  }).observe(content, { childList: true });
  // a semester change from the top bar re-renders the notes: go back to that semester's menu
  semSel.addEventListener('change', () => { ignoreUntil = Date.now() + 800; if (view !== 'sem') { view = 'menu'; } if (homeView !== 'sem') homeView = 'menu'; setTimeout(render, 0); });
  // opening the Notes tab directly starts from the semester choice
  document.addEventListener('click', e => {
    const t = e.target.closest('.tab[data-tab="notes"], #v2-bottomnav [data-go="notes"], .v2-home [data-go="notes"]');
    if (t && e.isTrusted) { view = 'sem'; render(); }
  }, true);

  render();
})();
