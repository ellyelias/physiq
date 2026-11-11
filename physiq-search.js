/* PhysiQ Search: one box that finds anything in the Notes of all three semesters (topic notes, Cikgu Suhaili's
   full notes, syllabus derivations, formula and definition lists, Section A / B & C guides, Real Life, Concept
   Clinic). Type a few letters and results appear; tapping one opens that page and scrolls to the matching line.
   The index (search-index.json) is built by tools/build_search_index.py and loaded the first time Search opens. */
(function () {
  const INDEX_URL = 'search-index.json?v=20261111a';
  let DATA = null, loading = null, sem = 'all', lastQ = '';

  // ---------- text normalising: lower case, no accents, super/subscripts as plain characters ----------
  const SS = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁺':'+','⁻':'-','ⁿ':'n','ⁱ':'i',
    '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','₊':'+','₋':'-','ₐ':'a','ₑ':'e','ₒ':'o','ₓ':'x','ₕ':'h','ₖ':'k','ₗ':'l','ₘ':'m','ₙ':'n','ₚ':'p','ₛ':'s','ₜ':'t','−':'-','’':"'",'‘':"'" };
  const norm = s => String(s).replace(/[⁰-⁹⁺⁻ⁿⁱ₀-ₜ−’‘¹²³]/g, c => SS[c] || c).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const squash = s => norm(s).replace(/[^a-z0-9α-ωλθπμεγ]+/g, '');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- what each page is ----------
  function kindOf(key) {
    if (/^DERIV-/.test(key)) return ['Derivation', 'dv'];
    if (/^FORMULA-/.test(key)) return ['Formula list', 'fm'];
    if (/^DEFS-/.test(key)) return ['Definition list', 'df'];
    if (/^GUIDE-/.test(key)) return ['Section A guide', 'gd'];
    if (/^LESSON-/.test(key)) return ['Full notes', 'ls'];
    if (/^CLINIC-/.test(key)) return ['Concept Clinic', 'cc'];
    if (key === 'REALWORLD') return ['Physics in Real Life', 'rw'];
    if (/^(S[23]-)?\d+\.\d/.test(key)) return ['Notes', 'nt'];
    return ['Sections B & C guide', 'bc'];
  }
  function pageTitle(p) {
    const [key, s, label, group] = p;
    if (/^LESSON-/.test(key)) return group.replace(/\s+—\s+/, ' · ') + ' (full notes)';
    if (/^(S[23]-)?\d+\.\d/.test(key)) return label.replace(/^S[23]-/, '');
    return label.replace(/\s*\(\d+\)$/, '');
  }

  // ---------- load the index once ----------
  function load() {
    if (DATA) return Promise.resolve(DATA);
    if (loading) return loading;
    loading = fetch(INDEX_URL).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
      const pages = d.pages.map(p => ({ p, title: pageTitle(p), nt: norm(pageTitle(p) + ' ' + p[3]), kind: kindOf(p[0]) }));
      const items = d.items.map(it => ({ pi: it[0], h: it[1], x: it[2], head: !!it[3], nx: norm(it[2]), nh: norm(it[1]) }));
      DATA = { pages, items };
      return DATA;
    }).catch(e => { loading = null; throw e; });
    return loading;
  }

  // ---------- search ----------
  const curSem = () => { const s = document.getElementById('semester-select'); return s ? String(s.value) : '1'; };
  function search(q) {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length || !DATA) return { out: [], total: 0 };
    const res = [], cs = curSem();
    DATA.items.forEach(it => {
      const pg = DATA.pages[it.pi];
      if (sem !== 'all' && pg.p[1] !== sem) return;
      let score = 0;
      for (const t of terms) {
        const inX = it.nx.indexOf(t), inH = it.nh.indexOf(t), inP = pg.nt.indexOf(t);
        if (inX < 0 && inH < 0 && inP < 0) return;
        if (inX >= 0) { score += 2; if (inX === 0 || /[^a-z0-9]/.test(it.nx[inX - 1])) score += 3; }
        if (inH >= 0) score += 3;
        if (inP >= 0) score += 2;
      }
      if (it.head) score += 4;
      if (it.x.length < 140) score += 1;
      if (pg.p[1] === cs) score += 2;
      const k = pg.kind[1];
      if (k === 'dv' || k === 'fm' || k === 'df') score += 1;
      res.push({ it, pg, score });
    });
    res.sort((a, b) => b.score - a.score || a.it.x.length - b.it.x.length);
    // at most 3 hits per page so one long page cannot fill the list
    const per = {}, out = [];
    for (const r of res) { per[r.it.pi] = (per[r.it.pi] || 0) + 1; if (per[r.it.pi] <= 3) out.push(r); if (out.length >= 40) break; }
    return { out, total: res.length };
  }

  // highlight the query terms in a snippet cut around the first match
  function snippet(text, terms, max) {
    const n = norm(text);
    let first = -1; terms.forEach(t => { const i = n.indexOf(t); if (i >= 0 && (first < 0 || i < first)) first = i; });
    let a = 0, b = text.length;
    if (text.length > max) { a = Math.max(0, first - Math.floor(max / 3)); b = Math.min(text.length, a + max); if (a > 0) { const sp = text.indexOf(' ', a); if (sp > 0 && sp < a + 15) a = sp + 1; } }
    const part = text.slice(a, b), np = norm(part);
    const marks = [];
    terms.forEach(t => { let i = 0; while (t && (i = np.indexOf(t, i)) >= 0) { marks.push([i, i + t.length]); i += t.length; } });
    marks.sort((x, y) => x[0] - y[0]);
    let html = '', pos = 0;
    marks.forEach(([s, e]) => { if (s < pos) return; html += esc(part.slice(pos, s)) + '<mark>' + esc(part.slice(s, e)) + '</mark>'; pos = e; });
    html += esc(part.slice(pos));
    return (a > 0 ? '…' : '') + html + (b < text.length ? '…' : '');
  }

  // ---------- UI ----------
  const css = `
.sq-btn{display:inline-flex;align-items:center;gap:7px;height:42px;padding:0 14px;border-radius:999px;border:0;background:#fff;color:var(--navy,#1E2A1E);font:700 14px/1 inherit;font-family:inherit;cursor:pointer;box-shadow:0 1px 0 rgba(0,0,0,.08);}
.sq-btn svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;}
.sq-btn kbd{font:600 11px/1 inherit;font-family:inherit;color:#64748b;border:1px solid #cbd5e1;border-radius:5px;padding:3px 5px;}
@media (max-width:700px){.sq-btn{width:40px;height:40px;padding:0;justify-content:center;flex:none;}.sq-btn span,.sq-btn kbd{display:none;}}
.sq-ov{position:fixed;inset:0;z-index:1000;background:rgba(15,23,15,.55);display:none;align-items:flex-start;justify-content:center;padding:6vh 14px 14px;}
.sq-ov.on{display:flex;}
.sq-box{width:100%;max-width:720px;max-height:86vh;display:flex;flex-direction:column;background:#FFFCF5;border-radius:18px;box-shadow:0 24px 60px rgba(0,0,0,.35);overflow:hidden;}
.sq-top{padding:14px 14px 10px;border-bottom:1px solid var(--line,#e2e8f0);}
.sq-field{display:flex;align-items:center;gap:10px;background:#fff;border:2px solid var(--navy,#1E2A1E);border-radius:12px;padding:0 6px 0 12px;}
.sq-field svg{width:20px;height:20px;flex:none;stroke:var(--navy,#1E2A1E);fill:none;stroke-width:2.2;stroke-linecap:round;}
.sq-in::-webkit-search-cancel-button{display:none;}
.sq-in{flex:1;min-width:0;border:0;outline:0;background:transparent;font:600 17px/1.2 inherit;font-family:inherit;padding:13px 0;color:#0f172a;}
.sq-x{border:0;background:transparent;font:700 14px/1 inherit;font-family:inherit;color:#475569;padding:10px 8px;cursor:pointer;}
.sq-sems{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;}
.sq-sems button{border:1.5px solid var(--line,#cbd5e1);background:#fff;border-radius:999px;padding:6px 12px;font:700 13px/1 inherit;font-family:inherit;color:#334155;cursor:pointer;}
.sq-sems button.on{background:var(--navy,#1E2A1E);border-color:var(--navy,#1E2A1E);color:#fff;}
.sq-list{overflow:auto;padding:6px 8px 12px;-webkit-overflow-scrolling:touch;}
.sq-msg{padding:22px 12px;color:#475569;font-size:15px;line-height:1.5;}
.sq-msg b{color:#0f172a;}
.sq-tips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
.sq-tips button{border:1px dashed #94a3b8;background:#fff;border-radius:999px;padding:6px 11px;font:600 13px/1 inherit;font-family:inherit;color:#334155;cursor:pointer;}
.sq-r{display:block;width:100%;text-align:left;border:0;background:transparent;border-radius:12px;padding:11px 10px;cursor:pointer;font-family:inherit;color:#0f172a;}
.sq-r:hover,.sq-r.sel{background:#F1F5E4;}
.sq-r + .sq-r{border-top:1px solid #eef0ea;}
.sq-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px;font-weight:700;color:#64748b;}
.sq-k{display:inline-block;border-radius:6px;padding:3px 7px;font-size:11px;letter-spacing:.02em;text-transform:uppercase;color:#fff;background:#475569;}
.sq-k.dv{background:#7C3AED;}.sq-k.fm{background:#EA580C;}.sq-k.df{background:#0F766E;}.sq-k.ls{background:#1B3A6B;}.sq-k.nt{background:#3F6212;}.sq-k.gd,.sq-k.bc{background:#B45309;}.sq-k.rw{background:#DC2626;}.sq-k.cc{background:#0369A1;}
.sq-t{font-size:15px;font-weight:800;margin:5px 0 2px;line-height:1.3;}
.sq-s{font-size:14px;line-height:1.45;color:#334155;}
.sq-r mark{background:#E4F27A;color:inherit;border-radius:3px;padding:0 1px;}
.sq-more{font-size:12.5px;color:#64748b;padding:8px 10px 0;}
.sq-flash{animation:sqFlash 2.6s ease-out 1;border-radius:6px;}
@keyframes sqFlash{0%,35%{background:#E4F27A;box-shadow:0 0 0 6px #E4F27A;}100%{background:transparent;box-shadow:0 0 0 6px transparent;}}
body.sq-lock{overflow:hidden;}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
  const ov = document.createElement('div'); ov.className = 'sq-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Search PhysiQ');
  ov.innerHTML = `<div class="sq-box"><div class="sq-top"><div class="sq-field">${ICON}<input class="sq-in" type="search" enterkeyhint="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Search notes, formulas, derivations…" aria-label="Search"><button type="button" class="sq-x">Close</button></div>
<div class="sq-sems" role="group" aria-label="Semester"><button type="button" data-s="all" class="on">All</button><button type="button" data-s="1">Sem 1</button><button type="button" data-s="2">Sem 2</button><button type="button" data-s="3">Sem 3</button></div></div><div class="sq-list" aria-live="polite"></div></div>`;
  document.body.appendChild(ov);
  const input = ov.querySelector('.sq-in'), list = ov.querySelector('.sq-list');
  let shown = [], selIdx = -1;

  const TIPS = ['bohr', 'doppler', 'moment of inertia', 'capacitor', 'half-life', 'kirchhoff', 'young modulus', 'derive'];
  function intro() {
    list.innerHTML = `<div class="sq-msg">Type a few letters, e.g. <b>bohr</b>, <b>dopp</b> or <b>lens</b>. Searches all the notes, your full chapter notes, derivations, formula and definition lists.<div class="sq-tips">${TIPS.map(t => `<button type="button" data-tip="${t}">${t}</button>`).join('')}</div></div>`;
  }
  function draw() {
    const q = input.value.trim(); lastQ = q;
    if (q.length < 2) { shown = []; intro(); return; }
    if (!DATA) { list.innerHTML = '<div class="sq-msg">Loading…</div>'; load().then(draw, () => { list.innerHTML = '<div class="sq-msg">Search could not load. Check the internet connection and try again.</div>'; }); return; }
    const { out, total } = search(q);
    shown = out; selIdx = out.length ? 0 : -1;
    if (!out.length) { list.innerHTML = `<div class="sq-msg">No match for <b>${esc(q)}</b>${sem !== 'all' ? ' in Semester ' + sem + '. Try <b>All semesters</b>' : ''}. Try fewer letters or another word.</div>`; return; }
    const terms = norm(q).split(/\s+/).filter(Boolean);
    list.innerHTML = out.map((r, i) => {
      const p = r.pg.p, chm = (p[3].match(/Chapter (\d+)/) || p[0].match(/^(?:S[23]-|LESSON-(?:S[23]-)?)?(\d+)/) || [])[1];
      const where = 'Sem ' + p[1] + (chm && r.pg.kind[1] !== 'dv' && r.pg.kind[1] !== 'fm' && r.pg.kind[1] !== 'df' ? ' · Ch ' + chm : '');
      const title = r.it.head ? r.it.h : (r.it.h && r.it.h !== r.pg.title ? r.pg.title + ' › ' + r.it.h : r.pg.title);
      const body = r.it.head && r.it.x === r.it.h ? (r.pg.kind[1] === 'dv' ? '' : esc(r.pg.title)) : snippet(r.it.x, terms, 170);
      return `<button type="button" class="sq-r${i === 0 ? ' sel' : ''}" data-i="${i}"><div class="sq-meta"><span class="sq-k ${r.pg.kind[1]}">${r.pg.kind[0]}</span><span>${where}</span></div><div class="sq-t">${snippet(title, terms, 120)}</div>${body ? `<div class="sq-s">${body}</div>` : ''}</button>`;
    }).join('') + (total > out.length ? `<div class="sq-more">Showing the best ${out.length} of ${total} matches. Add another word to narrow it down.</div>` : '');
  }

  function open() {
    ov.classList.add('on'); document.body.classList.add('sq-lock');
    if (!input.value) intro(); else draw();
    setTimeout(() => { input.focus(); input.select(); }, 30);
    load().then(() => { if (input.value.trim().length >= 2) draw(); }, () => {});
  }
  function close() { ov.classList.remove('on'); document.body.classList.remove('sq-lock'); input.blur(); }

  // open the page, wait for it to render, then scroll to the matching line and flash it
  function go(r) {
    close();
    const key = r.pg.p[0], s = r.pg.p[1];
    if (window.PhysiQNotesNav) window.PhysiQNotesNav.open(key, s);
    else { const sel = document.getElementById('notes-topic-select'); if (sel) { sel.value = key; sel.dispatchEvent(new Event('change')); } }
    const want = squash(r.it.head ? r.it.h : r.it.x.replace(/…$/, '')).slice(0, 60), alt = squash(r.it.h).slice(0, 40);
    let tries = 0;
    const find = () => {
      const box = document.getElementById('notes-content');
      if (!box || box.querySelector('.ls-loading') || !box.textContent.trim()) return tries++ < 40 ? setTimeout(find, 150) : null;
      const els = [...box.querySelectorAll('h2,h3,h4,h5,summary,p,li,tr,dt,dd,figcaption,blockquote,.dv-result,.key,.ls-def')];
      const sq = el => squash(el.textContent);
      let el = want && els.find(e => sq(e).includes(want) && !e.querySelector('p,li,tr,summary'));
      if (!el && want) el = els.find(e => sq(e).includes(want.slice(0, 25)));
      if (!el && alt) el = els.find(e => /^(H\d|SUMMARY)$/.test(e.tagName) && sq(e).includes(alt));
      if (!el) { if (tries++ < 12) return setTimeout(find, 200); return; }
      let d = el.closest('details'); while (d) { d.open = true; d = d.parentElement && d.parentElement.closest('details'); }
      const target = el.tagName === 'SUMMARY' ? el.parentElement : el;
      const bar = document.querySelector('.masthead'), off = (bar ? bar.offsetHeight : 0) + 24;
      setTimeout(() => {
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
        el.classList.remove('sq-flash'); void el.offsetWidth; el.classList.add('sq-flash');
        setTimeout(() => el.classList.remove('sq-flash'), 2800);
      }, 120);
    };
    setTimeout(find, 250);
  }

  input.addEventListener('input', () => { clearTimeout(input._t); input._t = setTimeout(draw, 90); });
  input.addEventListener('keydown', e => {
    const btns = [...list.querySelectorAll('.sq-r')];
    if (e.key === 'Escape') { close(); return; }
    if (!btns.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); selIdx = (selIdx + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length;
      btns.forEach((b, i) => b.classList.toggle('sel', i === selIdx)); btns[selIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && selIdx >= 0) { e.preventDefault(); go(shown[selIdx]); }
  });
  list.addEventListener('click', e => {
    const t = e.target.closest('[data-tip]'); if (t) { input.value = t.dataset.tip; draw(); input.focus(); return; }
    const b = e.target.closest('.sq-r'); if (b) go(shown[Number(b.dataset.i)]);
  });
  ov.querySelector('.sq-x').addEventListener('click', close);
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  ov.querySelector('.sq-sems').addEventListener('click', e => {
    const b = e.target.closest('[data-s]'); if (!b) return;
    sem = b.dataset.s; ov.querySelectorAll('.sq-sems button').forEach(x => x.classList.toggle('on', x === b)); draw(); input.focus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !ov.classList.contains('on') && !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '') && !(document.activeElement || {}).isContentEditable) { e.preventDefault(); open(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
  });

  // the Search button: in the top bar, before the semester picker
  function placeButton(last) {
    if (document.querySelector('.sq-btn')) return true;
    const right = document.querySelector('.v2-topbar .v2-right') || (last && document.getElementById('semester-bar') && document.getElementById('semester-bar').parentElement);
    if (!right) return false;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sq-btn'; b.setAttribute('aria-label', 'Search');
    b.innerHTML = ICON + '<span>Search</span><kbd>/</kbd>';
    b.addEventListener('click', open);
    const sb = document.getElementById('semester-bar');
    if (sb && sb.parentElement === right) right.insertBefore(b, sb); else right.appendChild(b);
    return true;
  }
  if (!placeButton()) { let n = 0; const t = setInterval(() => { if (placeButton(++n > 60) || n > 60) clearInterval(t); }, 100); }

  window.PhysiQSearch = { open, close, search: q => load().then(() => search(q)) };
})();
