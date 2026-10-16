/* PhysiQ V2 UI adapter.
   - Re-lays out the top bar (moves the existing semester picker into it) and adds a bottom
     navigation bar on phones. Every button opens a tab by clicking the app's own tab button.
   - Fills the Home dashboard from progress this device has already saved (Learn by chapter,
     Section A practice history, structured questions). It only READS that data: it never writes
     to storage, never contacts Google Sheets and never touches the pretest/posttest. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  // Structured (Sections B & C) question ids per chapter, as in the app's STRUCTURED list (Semester 1 only).
  var STRUCT = {"1":["sb1","sc1"],"2":["sb2","sc2"],"3":["sb3","sc3"],"4":["sb4","sc4"],"5":["sb5","sc5"],"6":["sb6","sc6"],"7":["sb7","sc7"],"8":["sb8","sc8"],"9":["sb9","sc9"],"10":["sb10","sc10"],"11":["sb11","sc11"],"12":["sb12","sc12"]};
  var STEP_TEXT = {
    an: ['Read the Section A notes', 'Key definitions, formulas and common traps.'],
    ap: ['Try Section A practice', 'Answer objective questions with worked solutions.'],
    bn: ['Read the Section B & C notes', 'Derivations and worked examples.'],
    bp: ['Try the structured questions', 'Sections B and C with marking steps.']
  };
  var ICON = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
    doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h1M4 12h1M4 18h1"/>',
    note: '<path d="M5 4h14v16H5z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    map: '<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="6" r="1.6"/><circle cx="19" cy="6" r="1.6"/><circle cx="5" cy="18" r="1.6"/><circle cx="19" cy="18" r="1.6"/><path d="M6.3 7l3.8 3.4M17.7 7l-3.8 3.4M6.3 17l3.8-3.4M17.7 17l-3.8-3.4"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>',
    arrow: '<path d="M7 17L17 7M9 7h8v8"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    star: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[k] + '</svg>'; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var readJSON = function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };

  function go(name) {
    var tab = $('.tab[data-tab="' + name + '"]');
    if (!tab) return;
    tab.click();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function openChapter(ch) {
    go('learn');
    var sel = $('#learn-ch');
    if (sel && sel.value !== ch && sel.querySelector('option[value="' + ch + '"]')) { sel.value = ch; sel.dispatchEvent(new Event('change', { bubbles: true })); }
  }

  // ---------- progress, read from this device ----------
  function chapters() {
    return Array.prototype.map.call(document.querySelectorAll('#learn-ch option'), function (o) {
      var m = o.textContent.match(/(\d+)\s*[—–-]\s*(.+)$/);
      return { id: o.value, num: m ? m[1] : o.value.replace(/^S\d-/, ''), name: m ? m[2].trim() : o.textContent.trim() };
    }).filter(function (c) { return c.id; });
  }
  var chOf = function (t) { return String(t).trim().split(' ')[0].split('.')[0]; };
  function progress() {
    var chs = chapters(), ids = chs.map(function (c) { return c.id; });
    var learn = readJSON('physiq-learn', {}), sp = readJSON('physiq_structured-progress__local', {});
    var hist = readJSON('physiq_quiz-history__local', []).filter(function (h) {
      var t = String(h.topics || '').split(',').filter(function (x) { return x.trim(); });
      return t.length && t.every(function (x) { return ids.indexOf(chOf(x)) >= 0; });
    });
    var per = chs.map(function (c) {
      var d = learn[c.id] || {};
      var mine = hist.filter(function (h) { return String(h.topics).split(',').every(function (x) { return chOf(x) === c.id; }); });
      var touched = hist.some(function (h) { return String(h.topics).split(',').some(function (x) { return chOf(x) === c.id; }); });
      var s = { an: !!d.an, ap: !!d.bestA || mine.length > 0, bn: !!d.bn, bp: !!(STRUCT[c.id] && STRUCT[c.id].every(function (q) { return sp[q]; })) };
      var n = (s.an ? 1 : 0) + (s.ap ? 1 : 0) + (s.bn ? 1 : 0) + (s.bp ? 1 : 0);
      return { c: c, s: s, n: n, explored: n > 0 || touched };
    });
    var right = 0, total = 0;
    hist.forEach(function (h) { right += +h.correct || 0; total += +h.total || 0; });
    var steps = per.reduce(function (a, p) { return a + p.n; }, 0);
    return { per: per, sessions: hist.length, acc: total ? Math.round(100 * right / total) : null, explored: per.filter(function (p) { return p.explored; }).length, pct: chs.length ? Math.round(100 * steps / (chs.length * 4)) : 0 };
  }

  // ---------- Home ----------
  function renderHome() {
    var box = $('#v2-home-live');
    if (!box) return;
    var P = progress(), sem = ($('#semester-select') || {}).value || '1';
    if (!P.per.length) return;
    var stat = function (k, v, s, ic, tone) { return '<div class="v2-stat"><div class="k">' + k + '</div><div class="v">' + v + '</div><div class="s">' + s + '</div><span class="v2-ico ' + tone + '">' + svg(ic) + '</span></div>'; };
    var order = P.per.slice().sort(function (a, b) {
      var r = function (p) { return p.n > 0 && p.n < 4 ? 0 : p.n === 0 ? 1 : 2; };
      return r(a) - r(b);
    });
    var target = order[0];
    var nextKey = target ? ['an', 'ap', 'bn', 'bp'].filter(function (k) { return !target.s[k]; })[0] : null;
    var ring = 2 * Math.PI * 70, off = ring * (1 - P.pct / 100);
    var actions = [
      ['learn', 'book', 't-teal', 'Learn by chapter', 'Notes, practice and structured questions, step by step.'],
      ['student', 'pencil', 't-violet', 'Section A practice', 'Objective questions with worked solutions.'],
      ['structured', 'list', 't-blue', 'Sections B & C', 'Structured questions with marking steps.'],
      ['past', 'doc', 't-amber', 'Past year papers', 'STPM papers by year, with answers.'],
      ['notes', 'note', 't-teal', 'Notes', 'Key formulas, traps and tricks for every topic.'],
      ['mindmaps', 'map', 't-violet', 'Mind maps', 'A one-page summary of each chapter.'],
      ['tests', 'clock', 't-blue', 'Chapter tests', 'Timed 20-question tests.'],
      ['research', 'flask', 't-amber', 'Pretest / Posttest', 'For students in the research study.']
    ];
    var tt = $('#teacher-tab');
    if (tt && tt.style.display !== 'none') actions.push(['teacher', 'shield', 't-blue', 'Question bank', 'Teacher tools.']);
    box.innerHTML =
      '<div class="v2-stats" aria-label="Your progress on this device">' +
        stat('Chapters explored', P.explored + '<small> / ' + P.per.length + '</small>', 'Semester ' + esc(sem), 'book', 't-teal') +
        stat('Practice sessions', String(P.sessions), P.sessions ? 'Section A, saved on this device' : 'None yet on this device', 'pencil', 't-violet') +
        stat('Practice accuracy', P.acc === null ? '–' : P.acc + '%', P.acc === null ? 'Shown after your first session' : 'Across your Section A sessions', 'chart', 't-amber') +
        stat('Learning progress', P.pct + '%', 'Learn-by-chapter steps done', 'check', 't-blue') +
      '</div>' +
      '<div><div class="v2-sec-h"><div><h3>What would you like to do?</h3><p>Pick up where you left off, or try something new.</p></div></div>' +
      '<div class="v2-actions">' + actions.map(function (a) {
        return '<button type="button" class="v2-action" data-go="' + a[0] + '"><span class="v2-ico ' + a[2] + '">' + svg(a[1]) + '</span><b>' + a[3] + '</b><span>' + a[4] + '</span><span class="go">' + svg('arrow') + '</span></button>';
      }).join('') + '</div></div>' +
      '<div class="v2-two">' +
        '<div><div class="v2-sec-h"><div><h3>Continue your chapters</h3><p>Four steps per chapter in Learn by chapter.</p></div><button type="button" class="v2-link" data-go="learn">View all</button></div>' +
        '<div class="v2-panel v2-chs">' + order.slice(0, 4).map(function (p) {
          var st = p.n === 4 ? 'Completed' : p.n === 0 ? 'Not started' : p.n + ' of 4 steps done';
          return '<button type="button" class="v2-ch" data-ch="' + esc(p.c.id) + '"><span class="n">' + esc(p.c.num) + '</span><span class="m"><b>' + esc(p.c.name) + '</b><i>' + st + '</i><div class="v2-bar"><div style="width:' + (p.n * 25) + '%"></div></div></span><span class="chev">' + svg('chev') + '</span></button>';
        }).join('') + '</div></div>' +
        '<div><div class="v2-sec-h"><div><h3>Learning snapshot</h3><p>Semester ' + esc(sem) + ', this device</p></div></div>' +
        '<div class="v2-panel"><div class="v2-snap"><svg class="v2-ring" viewBox="0 0 170 170" role="img" aria-label="' + P.pct + '% of learn-by-chapter steps done"><circle class="bg" cx="85" cy="85" r="70"/><circle class="fg" cx="85" cy="85" r="70" stroke-dasharray="' + ring.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"' + (P.pct ? '' : ' style="display:none"') + '/><text x="85" y="88" text-anchor="middle" font-size="34" font-weight="800">' + P.pct + '%</text><text x="85" y="110" text-anchor="middle" font-size="12" fill="#5B665F">of steps done</text></svg></div>' +
        '<div class="v2-next"><h4>Recommended next steps</h4>' +
          (target && nextKey ? '<button type="button" data-ch="' + esc(target.c.id) + '"><span class="v2-ico t-teal">' + svg('check') + '</span><span><b>' + STEP_TEXT[nextKey][0] + ': ' + esc(target.c.name) + '</b><span>' + STEP_TEXT[nextKey][1] + '</span></span></button>' : '') +
          '<button type="button" data-go="student"><span class="v2-ico t-violet">' + svg('arrow') + '</span><span><b>Practise Section A</b><span>Build accuracy with focused questions.</span></span></button>' +
          '<button type="button" data-go="past"><span class="v2-ico t-amber">' + svg('doc') + '</span><span><b>Explore past-year papers</b><span>Get familiar with the STPM format.</span></span></button>' +
        '</div></div></div>' +
      '</div>';
  }

  // ---------- layout: top bar and bottom navigation ----------
  function layout() {
    var mh = $('.masthead'), h1 = mh && mh.querySelector('h1');
    if (mh && h1 && !$('.v2-topbar')) {
      var bar = document.createElement('div'); bar.className = 'v2-topbar';
      var right = document.createElement('div'); right.className = 'v2-right';
      mh.insertBefore(bar, mh.firstChild); bar.appendChild(h1); bar.appendChild(right);
      var sb = $('#semester-bar'); if (sb) right.appendChild(sb);
    }
    var nav = $('#v2-bottomnav');
    var sync = function () {
      var a = $('.tab.active'), t = a ? a.getAttribute('data-tab') : 'guide';
      if (nav) Array.prototype.forEach.call(nav.querySelectorAll('button'), function (b) { b.classList.toggle('on', b.getAttribute('data-go') === t); });
      if (t === 'guide') renderHome();
    };
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) { t.addEventListener('click', function () { setTimeout(sync, 0); }); });
    sync();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-go],[data-ch]');
    if (!b || !b.closest('.v2-home, #v2-bottomnav')) return;
    e.preventDefault();
    if (b.hasAttribute('data-ch')) openChapter(b.getAttribute('data-ch')); else go(b.getAttribute('data-go'));
  });

  function start() {
    layout();
    var lc = $('#learn-ch');
    if (lc && window.MutationObserver) new MutationObserver(function () { renderHome(); }).observe(lc, { childList: true });
    var ss = $('#semester-select'); if (ss) ss.addEventListener('change', function () { setTimeout(renderHome, 60); });
    renderHome(); setTimeout(renderHome, 400); setTimeout(renderHome, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
