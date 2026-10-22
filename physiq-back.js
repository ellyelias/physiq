/* PhysiQ back navigation. Every move inside the app (another tab, a notes menu, a chapter, a Learn step,
   a structured question, a picture opened full size) is remembered, so the Back button in the top bar and the
   phone's own back button return to the previous page instead of closing the app. UI only: nothing here
   touches questions, answers, scoring, tests or the Google Sheet. */
(function () {
  'use strict';
  const stack = [];
  let restoring = 0, btn = null;

  const Back = window.PhysiQBack = {
    get restoring() { return restoring > 0; },
    // undo() puts the previous page back; it returns false when there was nothing to undo (already there)
    push(undo) {
      if (restoring) return;
      const now = Date.now(), last = stack[stack.length - 1];
      // one tap often changes two things (e.g. Home → a chapter opens Notes and picks the chapter): one Back undoes both
      if (last && now - last.t < 200) {
        const first = last.undo;
        last.undo = () => { const a = undo(); const b = first(); return a !== false || b !== false; };
        last.t = now; return;
      }
      stack.push({ undo, y: window.pageYOffset, t: now });
      try { history.pushState({ physiqBack: stack.length }, ''); } catch (e) {}
      sync();
    },
    back() { if (stack.length) history.back(); },
    get depth() { return stack.length; }
  };

  window.addEventListener('popstate', () => {
    const e = stack.pop(); sync();
    if (!e) return;
    restoring++;
    let changed = true;
    try { changed = e.undo() !== false; } catch (err) { console.error(err); }
    setTimeout(() => { restoring--; }, 300);
    if (!changed && stack.length) { history.back(); return; }   // that page was already closed another way: go one further
    setTimeout(() => { try { window.scrollTo(0, e.y); } catch (err) {} }, 80);
  });

  // ---------- the Back button in the top bar ----------
  function sync() { if (btn) btn.hidden = !stack.length; }
  function mountButton() {
    const bar = document.querySelector('.masthead .v2-topbar') || document.querySelector('.masthead');
    if (!bar || btn) return;
    btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pqb-btn'; btn.hidden = true; btn.setAttribute('aria-label', 'Back to the previous page');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><span>Back</span>';
    btn.addEventListener('click', () => Back.back());
    bar.insertBefore(btn, bar.firstChild);
    sync();
  }

  // ---------- pages (tabs) ----------
  const panels = [...document.querySelectorAll('.panel')];
  const activePanel = () => panels.find(p => p.classList.contains('active')) || null;
  let curPanel = activePanel();
  function showPanel(p) {
    if (!p || p.classList.contains('active')) return false;
    const tab = document.querySelector(`.tab[data-tab="${p.id.replace(/^panel-/, '')}"]`);
    if (tab) tab.click(); else { panels.forEach(x => x.classList.remove('active')); p.classList.add('active'); }
    return true;
  }
  const watchPanels = new MutationObserver(() => {
    const now = activePanel();
    if (!now || now === curPanel) return;
    const prev = curPanel; curPanel = now;
    if (prev) Back.push(() => showPanel(prev));
  });
  panels.forEach(p => watchPanels.observe(p, { attributes: true, attributeFilter: ['class'] }));

  // ---------- Sections B & C: a question opened from the list ----------
  const sq = document.getElementById('struct-q-card');
  if (sq) {
    let open = !sq.hidden;
    new MutationObserver(() => {
      const o = !sq.hidden; if (o === open) return; open = o;
      if (o) Back.push(() => { if (sq.hidden) return false; const b = document.getElementById('struct-back'); if (b) b.click(); return true; });
    }).observe(sq, { attributes: true, attributeFilter: ['hidden'] });
  }

  // ---------- pictures (mind maps, past-year paper pages) open inside the app, not in a new window ----------
  let viewer = null, zoom = 1;
  function closeViewer() { if (!viewer || viewer.hidden) return false; viewer.hidden = true; document.documentElement.classList.remove('pqb-lock'); return true; }
  function setZoom(z) { zoom = Math.max(1, Math.min(4, z)); const img = viewer.querySelector('img'); img.style.width = (zoom * 100) + '%'; viewer.querySelector('.pqb-z').textContent = Math.round(zoom * 100) + '%'; }
  function openViewer(src, alt) {
    if (!viewer) {
      viewer = document.createElement('div'); viewer.className = 'pqb-view'; viewer.hidden = true;
      viewer.setAttribute('role', 'dialog'); viewer.setAttribute('aria-modal', 'true');
      viewer.innerHTML = '<div class="pqb-vbar"><button type="button" class="pqb-btn pqb-vback"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><span>Back</span></button>' +
        '<div class="pqb-zoom"><button type="button" data-z="-1" aria-label="Zoom out">−</button><span class="pqb-z">100%</span><button type="button" data-z="1" aria-label="Zoom in">+</button></div></div>' +
        '<div class="pqb-scroll"><img alt=""></div>';
      document.body.appendChild(viewer);
      viewer.querySelector('.pqb-vback').addEventListener('click', () => Back.back());
      viewer.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', () => setZoom(zoom + (+b.dataset.z) * 0.5)));
      viewer.querySelector('img').addEventListener('dblclick', () => setZoom(zoom > 1 ? 1 : 2));
    }
    const img = viewer.querySelector('img'); img.src = src; img.alt = alt || '';
    setZoom(1); viewer.querySelector('.pqb-scroll').scrollTo(0, 0);
    viewer.hidden = false; document.documentElement.classList.add('pqb-lock');
    Back.push(closeViewer);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!/\.(webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(href)) return;
    e.preventDefault();
    const im = a.querySelector('img');
    openViewer(a.href, im ? im.alt : '');
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountButton); else mountButton();
  setTimeout(mountButton, 300);
})();
