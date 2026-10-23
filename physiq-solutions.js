/* PhysiQ: full worked solutions to the exercises in Cikgu Suhaili's chapter notes.
   Teacher Dashboard only. The solution files (solutions/s1.js, s2.js, s3.js) are loaded only after the
   dashboard is unlocked; students see the questions and final answers in the notes, never these files.

   Each solution file calls PhysiQSolutions.add(lessonKey, sets), where sets[i][j] is the solution of item j
   in the i-th "Exercises" box of that chapter, written as lines of text:
     - a line starting with (a), (b)(i) ... gets its part label in bold
     - ^(...) is a superscript and _(...) a subscript, e.g. m s^(-2), v_(0)
     - **...** is bold (used for the final answer of each part) */
(function () {
  'use strict';
  const SOL = {}, loaded = {}, waiting = {};
  const VER = '20261023a';

  function add(k, sets) { SOL[k] = sets; }

  function loadSem(sem, done) {
    if (loaded[sem]) return done();
    if (waiting[sem]) { waiting[sem].push(done); return; }
    waiting[sem] = [done];
    const s = document.createElement('script');
    s.src = 'solutions/s' + sem + '.js?v=' + VER;
    const fin = () => { loaded[sem] = true; const w = waiting[sem]; delete waiting[sem]; w.forEach(f => f()); };
    s.onload = fin; s.onerror = fin;
    document.head.appendChild(s);
  }

  // text → HTML for one solution line
  function fmt(line) {
    return line
      .replace(/\^\(([^)]*)\)/g, (m, x) => '<sup>' + x.replace(/-/g, '−') + '</sup>')
      .replace(/_\(([^)]*)\)/g, '<sub>$1</sub>')
      .replace(/\*\*([^*]+)\*\*/g, '<b class="xs-ans">$1</b>')
      .replace(/^((?:\([a-z]+\))+(?:\([ivx]+\))*|(?:\([ivx]+\))+)\s*/, '<b class="xs-part">$1</b> ');
  }
  const solHTML = lines => `<div class="xs-sol"><div class="xs-sol-h">Full solution</div>${lines.map(l => l === '' ? '<div class="xs-gap"></div>' : `<div class="xs-line">${fmt(l)}</div>`).join('')}</div>`;

  // the chapter's notes, rendered off-screen, give the questions (with their figures) and the final answers
  function chapterExercises(k, done) {
    const d = document.createElement('div');
    d.style.cssText = 'position:absolute;left:-99999px;top:0;width:800px;';
    document.body.appendChild(d);
    d.innerHTML = window.PhysiQLessons.render(k);
    window.PhysiQLessons.init(d);
    let tries = 0;
    (function wait() {
      if (d.querySelector('.ls-loading') && tries++ < 100) return setTimeout(wait, 100);
      const sets = Array.from(d.querySelectorAll('.ls-exer')).map(x => x.cloneNode(true));
      d.remove();
      done(sets);
    })();
  }

  const LESSONS = () => window.PhysiQLessons.LESSONS;
  const keysForSem = sem => Object.keys(LESSONS()).filter(k => LESSONS()[k].sem === String(sem)).sort((a, b) => LESSONS()[a].chapter - LESSONS()[b].chapter);

  function render() {
    const box = document.getElementById('xsol-body'), sem = document.getElementById('xsol-sem').value, k = document.getElementById('xsol-ch').value;
    if (!box || !k) return;
    box.innerHTML = '<p class="status-msg">Loading…</p>';
    loadSem(sem, () => chapterExercises(k, sets => {
      const sols = SOL[k] || [];
      let missing = 0, mismatch = false;
      if (sols.length && sols.length !== sets.length) mismatch = true;
      sets.forEach((x, i) => {
        const items = x.querySelectorAll(':scope > ol > li');
        if (sols[i] && sols[i].length !== items.length) mismatch = true;
        items.forEach((li, j) => {
          const ans = li.querySelector('.ls-ans');
          if (ans) { const a = ans.querySelector('div'); const fa = document.createElement('div'); fa.className = 'xs-final'; fa.innerHTML = '<span>Final answer (in the notes):</span> ' + (a ? a.innerHTML : ''); ans.replaceWith(fa); }
          const s = sols[i] && sols[i][j];
          if (s) li.insertAdjacentHTML('beforeend', solHTML(s));
          else { missing++; li.insertAdjacentHTML('beforeend', '<div class="xs-sol xs-todo">Full solution not written yet.</div>'); }
        });
      });
      const L0 = LESSONS()[k];
      const warn = mismatch ? '<p class="xs-warn">The exercises in this chapter\'s notes have changed since these solutions were written, so some solutions may sit under the wrong question. Ask Claude to update this chapter\'s solutions.</p>' : '';
      box.innerHTML = `<div class="xs-doc"><div class="xs-title">Chapter ${L0.chapter} · ${L0.title}<span>Exercise solutions · Semester ${L0.sem}</span></div>${warn}${sets.length ? '' : '<p class="empty">This chapter\'s notes have no exercises.</p>'}</div>`;
      const doc = box.querySelector('.xs-doc');
      sets.forEach(x => doc.appendChild(x));
      const n = sets.reduce((s, x) => s + x.querySelectorAll(':scope > ol > li').length, 0);
      document.getElementById('xsol-count').textContent = n ? `${n} exercise${n === 1 ? '' : 's'}${missing ? ` · ${missing} without a full solution yet` : ''}` : '';
    }));
  }

  function fillChapters() {
    const sem = document.getElementById('xsol-sem').value, sel = document.getElementById('xsol-ch'), prev = sel.value;
    const ks = keysForSem(sem);
    sel.innerHTML = ks.map(k => `<option value="${k}">Chapter ${LESSONS()[k].chapter} · ${LESSONS()[k].title}</option>`).join('');
    if (ks.includes(prev)) sel.value = prev;
    render();
  }

  // print just this chapter's exercises and solutions (Save as PDF from the print dialog)
  function print() {
    const doc = document.querySelector('#xsol-body .xs-doc'); if (!doc) return;
    const css = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => `<link rel="stylesheet" href="${l.href}">`).join('');
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${doc.querySelector('.xs-title').childNodes[0].textContent} - solutions</title>${css}
      <style>body{background:#fff;padding:18px;} .xs-print .xs-doc{max-width:800px;margin:0 auto;} @media print{body{padding:0;} .ls-exer{break-inside:auto;} .ls-exer li{break-inside:avoid;}}</style></head>
      <body class="xs-print">${doc.outerHTML}<script>window.onload=function(){setTimeout(function(){window.print();},400);};<\/script></body></html>`);
    w.document.close();
  }

  let started = false;
  function init() {
    if (started || !document.getElementById('xsol-sem') || !window.PhysiQLessons) return;
    started = true;
    document.getElementById('xsol-sem').addEventListener('change', fillChapters);
    document.getElementById('xsol-ch').addEventListener('change', render);
    document.getElementById('xsol-print').addEventListener('click', print);
    fillChapters();
  }

  // put the full solution under every exercise inside a rendered chapter (used for the teacher's PDF edition)
  function inject(root, k) {
    const sols = SOL[k] || [];
    let n = 0, missing = 0;
    root.querySelectorAll('.ls-exer').forEach((x, i) => {
      x.querySelectorAll(':scope > ol > li').forEach((li, j) => {
        const s = sols[i] && sols[i][j];
        if (s) { li.insertAdjacentHTML('beforeend', solHTML(s)); n++; } else missing++;
      });
    });
    return { n, missing, sets: root.querySelectorAll('.ls-exer').length, solSets: sols.length };
  }

  window.PhysiQSolutions = { add, init, loadSem, inject, SOL };
})();
