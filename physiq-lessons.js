/* PhysiQ full lesson notes (the teacher's own notes, converted from her slides).
   This file holds the shared helpers and the list of chapters; each chapter's content lives in
   lessons/chNN.js and is loaded only when a student opens it. Simulations: physiq-sims.js.
   Nothing here touches tests, questions, scoring or the Google Sheet. */
(function () {
  'use strict';
  // ---------- small typesetting helpers ----------
  const fr = (n, d) => `<span class="frac"><span class="n">${n}</span><span class="d">${d}</span></span>`;
  const sq = x => `<span class="sqrt sq2"><span class="rs">√</span><span class="rad">${x}</span></span>`;
  const vec = x => `<span class="ls-vec">${x}</span>`;
  const avg = x => `⟨${x}⟩`;
  const half = fr('1', '2');
  const eq = (x, cls) => `<div class="ls-eq${cls ? ' ' + cls : ''}">${x}</div>`;
  const key = (x, note) => `<div class="ls-key"><div class="ls-key-eq">${x}</div>${note ? `<div class="ls-key-n">${note}</div>` : ''}</div>`;
  const def = (term, body) => `<div class="ls-def"><b class="ls-def-t">${term}</b><div>${body}</div></div>`;
  const red = x => `<span class="ls-hl">${x}</span>`;
  const note = x => `<div class="ls-note">${x}</div>`;
  const tip = x => `<div class="ls-tip"><b>Teacher's note</b> ${x}</div>`;
  const ul = a => '<ul class="ls-ul">' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
  const steps = a => '<div class="ls-steps">' + a.map(x => `<div>${x}</div>`).join('') + '</div>';
  const fig = (svgStr, cap) => `<figure class="ls-figw">${svgStr}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  const two = (a, b) => `<div class="ls-two"><div>${a}</div><div>${b}</div></div>`;
  const example = (id, q, sol, f) => `<div class="ls-ex" id="ls-${id.replace(/\./g, '-')}"><div class="ls-ex-h">Example ${id}</div><div class="ls-ex-q">${q}</div>${f || ''}<details class="ls-sol"><summary>Show solution</summary><div class="ls-sol-b">${sol}</div></details></div>`;
  const exercises = (title, items) => `<div class="ls-exer"><div class="ls-exer-h">${title}</div><ol>${items.map(it => `<li><div>${it.q}</div>${it.f || ''}<details class="ls-ans"><summary>Show answer</summary><div>${it.a}</div></details></li>`).join('')}</ol></div>`;
  const sim = (kind, title, intro) => `<div class="ls-simw"><div class="ls-sim-h"><span class="ls-sim-tag">Try it</span>${title}</div><p class="ls-sim-i">${intro}</p><div class="ls-sim" data-sim="${kind}"></div></div>`;
  const ms = 'm&#8239;s<sup>−1</sup>', ms2 = 'm&#8239;s<sup>−2</sup>';

  // ---------- SVG figure helpers ----------
  let uid = 0;
  const C = { ink: '#1C2230', v: '#6A63EC', o: '#F2661B', g: '#4F7A12', r: '#C0392B', sub: '#5A6170', grid: '#E3E6D8', lilac: '#B7A2F0', fill: '#EEEAFD', ball: '#2BB3A3' };
  function svg(w, h, body, maxw) {
    const id = 'lsm' + (++uid);
    const mk = Object.entries({ k: C.ink, v: C.v, o: C.o, g: C.g, r: C.r, s: C.sub })
      .map(([n, c]) => `<marker id="${id}${n}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1L10,5L0,9z" fill="${c}"/></marker>`).join('');
    return `<svg class="ls-svg" viewBox="0 0 ${w} ${h}" style="max-width:${maxw || w}px" role="img" font-family="Inter, Segoe UI, sans-serif"><defs>${mk}</defs>${body.replace(/§/g, id)}</svg>`;
  }
  // line: c = colour key (k v o g r s), a = 'e' arrow at end, 'b' both, '' none
  const L = (x1, y1, x2, y2, c = 'k', a = '', o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C[c === 'k' ? 'ink' : c === 's' ? 'sub' : c]}" stroke-width="${o.w || 2}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${a === 'e' || a === 'b' ? ` marker-end="url(#§${c})"` : ''}${a === 'b' ? ` marker-start="url(#§${c})"` : ''} stroke-linecap="round"/>`;
  const T = (x, y, s, o = {}) => (s = String(s).replace(/([a-z])ᵧ(.*)$/, '$1<tspan font-size="10" dy="3">y</tspan><tspan dy="-3">$2</tspan>'), `<text x="${x}" y="${y}" font-size="${o.fs || 14}" fill="${o.c || C.ink}" text-anchor="${o.a || 'middle'}"${o.it ? ' font-style="italic"' : ''}${o.b ? ' font-weight="700"' : ''}>${s}</text>`);
  const P = (d, c = 'ink', o = {}) => `<path d="${d}" fill="${o.fill || 'none'}" stroke="${C[c] || c}" stroke-width="${o.w || 2.4}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.a ? ` marker-end="url(#§${o.a})"` : ''} stroke-linejoin="round" stroke-linecap="round"/>`;
  const dot = (x, y, r = 6, c = C.ball) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${C.ink}" stroke-width="1.2"/>`;
  // axes with arrow heads, origin (x0,y0), lengths w,h
  const axes = (x0, y0, w, h, xl, yl, o = {}) => L(x0, y0, x0 + w, y0, 'k', 'e', { w: 1.6 }) + L(x0, o.yb != null ? o.yb : y0, x0, y0 - h, 'k', 'e', { w: 1.6 }) +
    T(x0 + w + 4, y0 + 5, xl, { a: 'start', it: 1 }) + T(x0, y0 - h - 8, yl, { it: 1 }) + (o.noO ? '' : T(x0 - 9, y0 + 15, '0', { fs: 12, c: C.sub }));

  // a simple table: head = [..], rows = [[..],..]
  const table = (head, rows, cls) => `<div class="ls-tw"><table class="ls-t${cls ? ' ' + cls : ''}"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const sec = (id, title, body) => `<section class="ls-sec" id="ls-${id}"><h3 class="ls-h">${title}</h3>${body}</section>`;
  const h4 = t => `<h4 class="ls-h4">${t}</h4>`;
  const pq = (title, q, opts, ansIdx, why) => `<div class="ls-ex ls-pq"><div class="ls-ex-h">${title}</div><div class="ls-ex-q">${q}</div>${opts ? `<ol class="ls-opts" type="A">${opts.map(o => `<li>${o}</li>`).join('')}</ol>` : ''}<details class="ls-sol"><summary>Show answer</summary><div class="ls-sol-b">${ansIdx != null ? `<p><b>Answer: ${'ABCD'[ansIdx]}</b></p>` : ''}${why || ''}</div></details></div>`;
  // a worked card with any title (e.g. "STPM Practice 1.1 · Question 1")
  const card = (title, q, sol, f, id) => `<div class="ls-ex"${id ? ` id="${id}"` : ''}><div class="ls-ex-h">${title}</div><div class="ls-ex-q">${q}</div>${f || ''}<details class="ls-sol"><summary>Show solution</summary><div class="ls-sol-b">${sol}</div></details></div>`;
  const dim = s => `<span class="ls-dim">${s.replace(/\^(−?-?\d+(?:\/\d+)?|[½])/g, (m, e) => `<sup>${e.replace('-', '−')}</sup>`)}</span>`;
  const H = { card, dim, fr, sq, vec, avg, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, ms, ms2, svg, L, T, P, dot, axes, C, table, sec, h4, pq };

  // chapters with full notes. toc ids must exist in the chapter file.
  const LESSONS = {
    'LESSON-1': { sem: '1', chapter: 1, title: 'Physical Quantities and Measurements', topics: ['1.1 Physical Quantities & Units', '1.2 Scalars and Vectors', '1.3 Uncertainties in Measurements'], examples: 28, sims: 1,
      toc: [['ls-1-1', '1.1 Dimensions and SI units'], ['ls-1-1-u', 'Unit conversion'], ['ls-1-1-d', 'Dimensions'], ['ls-1-1-a', 'Applications of dimensions'], ['ls-1-2', '1.2 Scalars and vectors'], ['ls-1-2-p', 'Dot and cross product'], ['ls-1-2-c', 'Component method'], ['ls-1-3', '1.3 Uncertainties'], ['ls-1-tips', 'Exam tips']] },
    'LESSON-3': { sem: '1', chapter: 3, title: 'Dynamics', topics: ["3.1 Newton's Laws of Motion", '3.2 Linear Momentum', '3.3 Elastic and Inelastic Collisions', '3.4 Friction'], sims: 2,
      toc: [['ls-3-1', "3.1 Newton's laws"], ['ls-3-2', '3.2 Momentum and impulse'], ['ls-3-3', '3.3 Reaction and friction']] },
    'LESSON-4': { sem: '1', chapter: 4, title: 'Work, Energy and Power', topics: ['4.1 Work Done by a Force', '4.2 Conservation of Energy', '4.3 Power and Efficiency'], sims: 1,
      toc: [['ls-4-1', '4.1 Work'], ['ls-4-2', '4.2 Conservation of energy'], ['ls-4-3', '4.3 Power and efficiency']] },
    'LESSON-5': { sem: '1', chapter: 5, title: 'Circular Motion', topics: ['5.1 Angular Velocity and Centripetal Acceleration', '5.2 Centripetal Force'], sims: 2,
      toc: [['ls-5-1', '5.1 Angular velocity'], ['ls-5-2', '5.2 Centripetal acceleration'], ['ls-5-3', '5.3 Centripetal force']] },
    'LESSON-6': { sem: '1', chapter: 6, title: 'Gravitation', topics: ["6.1 Newton's Law of Gravitation", '6.2 Gravitational Field and Potential', '6.3 Satellite Motion'], sims: 1,
      toc: [['ls-6-1', '6.1 Law of gravitation'], ['ls-6-2', '6.2 Gravitational field'], ['ls-6-3', '6.3 Gravitational potential'], ['ls-6-4', '6.4 Satellites'], ['ls-6-5', '6.5 Escape velocity'], ['ls-6-pyq', 'Past-year questions']] },
    'LESSON-2': { sem: '1', chapter: 2, title: 'Kinematics', topics: ['2.1 Linear Motion', '2.2 Projectiles'], examples: 21, sims: 3,
      toc: [['ls-2-0', '2.0 Introduction'], ['ls-2-1', '2.1 Linear motion'], ['ls-2-1-eq', 'Equations of motion'], ['ls-2-1-ff', 'Free fall'], ['ls-2-2', '2.2 Projectile motion'], ['ls-2-2-air', 'Air resistance']] }
  };
  Object.values(LESSONS).forEach(L0 => { L0.label = 'Full notes · Cikgu Suhaili'; });
  const BODY = {}, loading = {};
  const VER = '20261022';
  function register(k, o) { BODY[k] = o; }
  function load(k, done) {
    if (BODY[k]) return done();
    if (loading[k]) { loading[k].push(done); return; }
    loading[k] = [done];
    const s = document.createElement('script'); s.src = 'lessons/ch' + String(LESSONS[k].chapter).padStart(2, '0') + (LESSONS[k].sem === '1' ? '' : '-s' + LESSONS[k].sem) + '.js?v=' + VER;
    s.onload = () => { const f = loading[k]; delete loading[k]; f.forEach(x => x()); };
    s.onerror = () => { const f = loading[k]; delete loading[k]; BODY[k] = { html: () => '<p class="sm-err">These notes could not be loaded. Check the internet connection and open the chapter again.</p>' }; f.forEach(x => x()); };
    document.head.appendChild(s);
  }

  function head(k) {
    const L0 = LESSONS[k];
    return `<header class="ls-head"><div class="ls-head-k">Chapter ${L0.chapter} · Semester ${L0.sem}</div><h2 class="ls-title${L0.title.length > 18 ? ' long' : ''}">${L0.title}</h2>
<div class="ls-head-by">Notes by Cikgu Suhaili</div>
<div class="ls-head-m"><span class="ls-nex">${L0.examples ? L0.examples + ' worked examples' : ''}</span>${L0.sims ? `<span>${L0.sims} simulation${L0.sims > 1 ? 's' : ''}</span>` : ''}<span>Exercises with answers</span></div>
<nav class="ls-toc">${L0.toc.map(([id, t]) => `<button type="button" data-ls-go="${id}">${t}</button>`).join('')}</nav>
<div class="ls-size" role="group" aria-label="Text size"><span>Text size</span><button type="button" data-ls-size="0">A</button><button type="button" data-ls-size="1">A</button><button type="button" data-ls-size="2">A</button></div>
</header>`;
  }
  function render(k) {
    if (!LESSONS[k]) return '';
    return `<div class="ls" data-lesson="${k}">${head(k)}<div class="ls-body">${BODY[k] ? BODY[k].html() : '<p class="ls-loading">Loading the notes…</p>'}</div></div>`;
  }

  // text size: remembered on this device only
  function applySize(root, n) {
    root.dataset.size = n; root.querySelectorAll('[data-ls-size]').forEach(b => b.classList.toggle('on', b.dataset.lsSize === String(n)));
    try { localStorage.setItem('physiq-lesson-size', n); } catch (e) {}
  }
  function init(container) {
    const root = container.querySelector('.ls'); if (!root) return;
    const k = root.dataset.lesson;
    let n = '1'; try { n = localStorage.getItem('physiq-lesson-size') || '1'; } catch (e) {}
    applySize(root, n);
    root.addEventListener('click', e => {
      const g = e.target.closest('[data-ls-go]');
      if (g) { const t = document.getElementById(g.dataset.lsGo); if (t) { const bar = document.querySelector('.masthead'); const off = bar ? bar.offsetHeight + 10 : 10; window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' }); } return; }
      const s = e.target.closest('[data-ls-size]'); if (s) applySize(root, s.dataset.lsSize);
    });
    const count = () => { const n = root.querySelectorAll('.ls-body .ls-ex').length, c = root.querySelector('.ls-nex'); if (c && n) c.textContent = n + ' worked examples'; };
    const fill = () => { const b = root.querySelector('.ls-body'); if (!b || !root.isConnected) return; b.innerHTML = BODY[k].html(); count(); if (window.PhysiQSims) window.PhysiQSims.mountAll(root); };
    if (BODY[k]) { count(); if (window.PhysiQSims) window.PhysiQSims.mountAll(root); } else load(k, fill);
  }

  window.PhysiQLessons = { LESSONS, H, register, render, init, has: k => !!LESSONS[k] };
})();
