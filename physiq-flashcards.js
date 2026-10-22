/* PhysiQ flashcards: active recall of the definitions and formulas in Cikgu Suhaili's own Definition and Formula lists.
   The cards are built in index.html from the same notes as those lists (one source of truth), so a correction there
   reaches the cards too. This file only draws and runs the deck. Nothing here touches tests, scores or the Google Sheet;
   "I knew it" marks are kept on this device only. */
(function () {
  'use strict';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  let keyHandler = null;   // one keyboard listener at a time, whichever deck was mounted last

  function mount(root, cards, opt) {
    opt = opt || {};
    const sem = String(opt.sem || '1');
    const KNOWN = 'physiq-flash-known-' + sem, PREF = 'physiq-flash-pref';
    const known = new Set(store.get(KNOWN) || []);
    const pref = Object.assign({ kind: 'all', ch: 'all', todo: false, shuffle: false }, store.get(PREF) || {});
    const chapters = [];
    cards.forEach(c => { if (!chapters.some(x => x.n === c.ch)) chapters.push({ n: c.ch, name: c.chName }); });
    if (pref.ch !== 'all' && !chapters.some(x => x.n === pref.ch)) pref.ch = 'all';
    const S = { deck: [], i: 0, flipped: false, pass: { knew: 0, again: 0 }, done: false };

    root.innerHTML = `<div class="fc">
  <header class="fc-head">
    <div class="fc-k">Flashcards · Definitions and formulas</div>
    <h2 class="fc-title">Test yourself</h2>
    <p class="fc-sub">Say the definition or write the formula from memory, then flip the card and check your key words.</p>
    <div class="fc-sems" role="group" aria-label="Semester">${['1', '2', '3'].map(x => `<button type="button" class="fc-sem${x === sem ? ' on' : ''}" data-sem="${x}" aria-pressed="${x === sem}">Sem ${x}</button>`).join('')}</div>
    <div class="fc-ctl">
      <div class="fc-seg" role="group" aria-label="Card type">
        <button type="button" data-kind="all">Both</button><button type="button" data-kind="def">Definitions</button><button type="button" data-kind="formula">Formulas</button>
      </div>
      <label class="fc-sel"><span>Chapter</span><select class="fc-ch"><option value="all">All chapters</option>${chapters.map(c => `<option value="${esc(c.n)}">Chapter ${esc(c.n)} · ${esc(c.name)}</option>`).join('')}</select></label>
      <label class="fc-tog"><input type="checkbox" class="fc-todo"><span>Only cards I still need to learn</span></label>
      <button type="button" class="fc-shuf" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3c4 0 6 10 10 10h3M4 17h3c1.6 0 2.8-1.6 3.9-3.5M14.1 9.5C15.2 7.6 16.4 7 17 7h3M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>Shuffle</button>
    </div>
  </header>
  <div class="fc-prog"><div class="fc-bar"><i></i></div><span class="fc-count"></span></div>
  <div class="fc-stage"></div>
  <div class="fc-acts">
    <button type="button" class="fc-nav fc-prev" aria-label="Previous card"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button type="button" class="fc-btn fc-again">Review again</button>
    <button type="button" class="fc-btn fc-knew">I knew it</button>
    <button type="button" class="fc-nav fc-next" aria-label="Next card"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
  <p class="fc-keys">Tap the card to flip it. Keyboard: Space flips · ← → move · K “I knew it” · R “Review again”</p>
</div>`;
    const box = root.querySelector('.fc');   // listeners live on this element, so re-opening the deck never doubles them
    const $ = s => box.querySelector(s);
    const stage = $('.fc-stage');

    function build() {
      let d = cards.filter(c => (pref.kind === 'all' || c.kind === pref.kind) && (pref.ch === 'all' || c.ch === pref.ch));
      if (pref.todo) d = d.filter(c => !known.has(c.id));
      S.deck = pref.shuffle ? shuffle(d.slice()) : d;
      S.i = 0; S.flipped = false; S.done = false; S.pass = { knew: 0, again: 0 };
      syncControls(); draw();
    }
    function syncControls() {
      box.querySelectorAll('[data-kind]').forEach(b => { const on = b.dataset.kind === pref.kind; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      $('.fc-ch').value = pref.ch; $('.fc-todo').checked = !!pref.todo;
      $('.fc-shuf').classList.toggle('on', !!pref.shuffle); $('.fc-shuf').setAttribute('aria-pressed', !!pref.shuffle);
    }
    function setPref(k, v) { pref[k] = v; store.set(PREF, pref); build(); }

    function faceFront(c) {
      return `<div class="fc-face fc-front">
  <div class="fc-meta"><span class="fc-type ${c.kind}">${c.kind === 'def' ? esc(c.verb) : 'Formula'}</span><span class="fc-topic">${esc(c.topic)}</span></div>
  <div class="fc-q">${esc(c.front)}</div>
  <div class="fc-hint">${c.kind === 'def' ? 'Say it in full, with the key words' : 'Write the formula, then name every symbol'}<b>Tap to flip</b></div>
</div>`;
    }
    function faceBack(c) {
      return `<div class="fc-face fc-back">
  <div class="fc-meta"><span class="fc-type ${c.kind}">${c.kind === 'def' ? 'Answer' : esc(c.front)}</span><span class="fc-topic">${esc(c.topic)}</span></div>
  ${c.kind === 'def' ? `<div class="fc-a fc-def">${c.back}</div>` : `<div class="fc-a fc-eq">${c.back}</div>${c.extra ? `<div class="fc-sym"><b>Symbols and units</b>${c.extra}</div>` : ''}`}
  ${known.has(c.id) ? '<div class="fc-known">✓ You marked this as known</div>' : ''}
</div>`;
    }
    function draw() {
      const n = S.deck.length, nKnown = cards.filter(c => known.has(c.id) && (pref.kind === 'all' || c.kind === pref.kind) && (pref.ch === 'all' || c.ch === pref.ch)).length;
      const nAll = cards.filter(c => (pref.kind === 'all' || c.kind === pref.kind) && (pref.ch === 'all' || c.ch === pref.ch)).length;
      $('.fc-bar i').style.width = (nAll ? Math.round(nKnown / nAll * 100) : 0) + '%';
      const acts = $('.fc-acts');
      if (!n) {
        $('.fc-count').textContent = `${nKnown} of ${nAll} known`;
        acts.classList.add('fc-off');
        stage.innerHTML = `<div class="fc-empty"><b>${pref.todo && nAll ? 'Well done!' : 'No cards here yet'}</b><p>${pref.todo && nAll ? 'You have marked every card in this set as known.' : 'This chapter has no cards of this type.'}</p>${pref.todo && nAll ? '<button type="button" class="fc-btn fc-knew fc-all">Show all the cards again</button>' : ''}</div>`;
        return;
      }
      if (S.done) {
        acts.classList.add('fc-off');
        $('.fc-count').textContent = `${nKnown} of ${nAll} known`;
        const again = S.deck.filter(c => !known.has(c.id)).length;
        stage.innerHTML = `<div class="fc-empty fc-sum"><div class="fc-big">${S.pass.knew}<span>/${n}</span></div><b>You knew ${S.pass.knew} of the ${n} cards in this round.</b>
<p>${again ? `${again} card${again > 1 ? 's are' : ' is'} still marked to review.` : 'Every card in this round is marked as known.'}</p>
<div class="fc-sum-b">${again ? `<button type="button" class="fc-btn fc-knew fc-redo">Review the ${again} again</button>` : ''}<button type="button" class="fc-btn fc-again fc-restart">Start this set again</button></div></div>`;
        return;
      }
      acts.classList.remove('fc-off');
      const c = S.deck[S.i];
      $('.fc-count').textContent = `Card ${S.i + 1} of ${n} · ${nKnown} of ${nAll} known`;
      const had = !!(document.activeElement && document.activeElement.closest && document.activeElement.closest('.fc-card'));
      stage.innerHTML = `<div class="fc-card${S.flipped ? ' flipped' : ''}" role="button" tabindex="0" aria-label="${S.flipped ? 'Answer shown. Tap to see the question again' : 'Tap to show the answer'}">${S.flipped ? faceBack(c) : faceFront(c)}</div>`;
      if (had) stage.querySelector('.fc-card').focus({ preventScroll: true });
      $('.fc-prev').disabled = S.i === 0;
    }
    function flip() { if (!S.deck.length || S.done) return; S.flipped = !S.flipped; draw(); }
    function go(d) {
      if (!S.deck.length || S.done) return;
      const j = S.i + d; if (j < 0) return;
      if (j >= S.deck.length) { S.done = true; draw(); return; }
      S.i = j; S.flipped = false; draw();
    }
    function mark(ok) {
      if (!S.deck.length || S.done) return;
      const c = S.deck[S.i];
      if (ok) { known.add(c.id); S.pass.knew++; } else { known.delete(c.id); S.pass.again++; }
      store.set(KNOWN, [...known]);
      go(1);
    }

    box.addEventListener('click', e => {
      const t = e.target;
      // drop focus from the action buttons so Space flips the next card instead of pressing the button again
      const fb = t.closest('.fc-btn, .fc-nav'); if (fb) setTimeout(() => { if (document.activeElement && box.contains(document.activeElement)) document.activeElement.blur(); }, 0);
      const sb = t.closest('[data-sem]'); if (sb) { if (sb.dataset.sem !== sem && typeof opt.onSem === 'function') opt.onSem(sb.dataset.sem); return; }
      const k = t.closest('[data-kind]'); if (k) { setPref('kind', k.dataset.kind); return; }
      if (t.closest('.fc-shuf')) { setPref('shuffle', !pref.shuffle); return; }
      if (t.closest('.fc-card')) { flip(); return; }
      if (t.closest('.fc-prev')) { go(-1); return; }
      if (t.closest('.fc-next')) { go(1); return; }
      if (t.closest('.fc-all')) { setPref('todo', false); return; }
      if (t.closest('.fc-redo')) { if (!pref.todo) { pref.todo = true; store.set(PREF, pref); } build(); return; }
      if (t.closest('.fc-restart')) { build(); return; }
      if (t.closest('.fc-knew')) { mark(true); return; }
      if (t.closest('.fc-again')) { mark(false); return; }
    });
    $('.fc-ch').addEventListener('change', e => setPref('ch', e.target.value));
    $('.fc-todo').addEventListener('change', e => setPref('todo', e.target.checked));

    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = e => {
      if (!box.isConnected) { document.removeEventListener('keydown', keyHandler); keyHandler = null; return; }
      if (!box.offsetParent) return;   // deck not on screen (another tab is open)
      if (e.target.closest && e.target.closest('input,select,textarea')) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === ' ' || e.key === 'Enter') { if (e.target.closest && e.target.closest('button,a')) return; e.preventDefault(); flip(); }
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'k' || e.key === 'K') mark(true);
      else if (e.key === 'r' || e.key === 'R') mark(false);
    };
    document.addEventListener('keydown', keyHandler);
    build();
  }

  window.PhysiQFlashcards = { mount };
})();
