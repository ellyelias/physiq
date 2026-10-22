/* PhysiQ "Physics in Real Life": every Real-World Physics video in the notes, in one list, each linked to the
   chapter card where it is used. Add a new entry here whenever a Real-World Physics card is added to a chapter. */
(function () {
  'use strict';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // lesson: the chapter's full-notes key; card: the id of the Real-World Physics card in that chapter
  const ITEMS = [
    { title: 'When a glacier falls 1200 m', event: 'Nepal glacier collapse, August 2026', physics: 'Gravitational potential energy, work against friction, power',
      sem: '1', ch: 4, chName: 'Work, Energy and Power', lesson: 'LESSON-4', card: 'ls-4-rw-nepal',
      videos: [{ id: 'Ss9fMd9C8os', title: 'Why Nepal’s 2026 Flood Was Too Big for Any Single Defense', channel: 'DT Terra' }] },
    { title: 'Inside a mega dam', event: 'Kölnbrein Dam, Austria · Richard Hammond’s BIG', physics: 'Energy changes in a hydroelectric station, efficiency of 92%',
      sem: '1', ch: 4, chName: 'Work, Energy and Power', lesson: 'LESSON-4', card: 'ls-4-rw-dam',
      videos: [{ id: 'DbvgK3PrSWw', title: 'How the Turbines in the Kölnbrein Dam are 92% Efficient', channel: 'Richard Hammond’s BIG' }] },
    { title: 'Why the Burj Khalifa doesn’t fall over', event: 'Burj Khalifa, Dubai · Richard Hammond’s BIG', physics: 'Equilibrium, centre of gravity and stability, stress in the piles',
      sem: '1', ch: 8, chName: 'Statics', lesson: 'LESSON-8', card: 'ls-8-rw-burj',
      videos: [{ id: 'N5i3UsiSoYY', title: 'The Physics Behind The Burj Khalifa And Why It Doesn’t Fall Over', channel: 'Quest TV' }] },
    { title: 'Can a warmer Earth bring a mountain down?', event: 'Nepal glacier collapse, August 2026', physics: 'Enhanced greenhouse effect, Wien’s law, melting permafrost',
      sem: '1', ch: 12, chName: 'Heat Transfer', lesson: 'LESSON-12', card: 'ls-12-rw-nepal',
      videos: [{ id: 'gowCz9olnhk', title: 'How a Mountain Collapse Became Nepal’s Catastrophic Flood', channel: 'Project Quantum' }] },
    { title: 'Does the Burj Khalifa collect lightning?', event: 'Lightning conductors and a car hit by lightning · Richard Hammond', physics: 'Charge at sharp points, Faraday cage, energy and charge in a strike',
      sem: '2', ch: 13, chName: 'Electrostatics', lesson: 'LESSON-S2-13', card: 'ls-12-rw-lightning',
      videos: [{ id: 'E0RdTXJaqJs', title: 'How The Burj Khalifa Is Dubai’s Lightning Rod', channel: 'Richard Hammond’s BIG' },
               { id: 've6XGKZxYxA', title: 'Richard Hammond inside a car struck by lightning (Top Gear)', channel: 'BBC Studios' }] },
    { title: 'Why does a tsunami grow taller at the shore?', event: 'Japan’s tsunami sea wall, built after 2011', physics: 'Wave speed, v = fλ, wavelength and amplitude in shallow water, I ∝ A²',
      sem: '3', ch: 21, chName: 'Wave Motion', lesson: 'LESSON-S3-21', card: 'ls-20-rw-tsunami',
      videos: [{ id: 'tJ6G2lTo6xA', title: 'Japan’s giant tsunami sea wall', channel: 'YouTube documentary' }] }
  ];

  function page(sem) {
    const order = ['1', '2', '3'];
    const nVid = ITEMS.reduce((n, x) => n + x.videos.length, 0);
    const card = (x, i) => `<article class="rl-item">
  <div class="rl-vids">${x.videos.map(v => `<div class="rl-vid"><button type="button" class="rl-play" data-rl-play="${esc(v.id)}" aria-label="Play video: ${esc(v.title)}"><img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy"><span class="rl-pb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button><div class="rl-vcap">${esc(v.title)} · ${esc(v.channel)}</div></div>`).join('')}</div>
  <div class="rl-body">
    <div class="rl-tags"><span class="rl-sem">Semester ${esc(x.sem)}</span><span class="rl-ch">Chapter ${x.ch} · ${esc(x.chName)}</span></div>
    <h3 class="rl-t">${esc(x.title)}</h3>
    <p class="rl-ev">${esc(x.event)}</p>
    <p class="rl-ph"><b>Physics:</b> ${esc(x.physics)}</p>
    <button type="button" class="rl-go" data-rl-go="${i}">Open in Chapter ${x.ch} notes, with quick checks <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
</article>`;
    return `<div class="rl">
  <header class="rl-head"><div class="rl-k">${nVid} videos · ${ITEMS.length} topics</div><h2 class="rl-title">Physics in Real Life</h2>
    <p class="rl-sub">Real events and real engineering, explained with the physics you are learning. Watch a video, then open its chapter to answer the quick checks.</p></header>
  ${order.map(s => { const list = ITEMS.map((x, i) => [x, i]).filter(([x]) => x.sem === s); return list.length ? `<section class="rl-sec"><h3 class="rl-sh">Semester ${s}</h3>${list.map(([x, i]) => card(x, i)).join('')}</section>` : ''; }).join('')}
  <p class="rl-note">Videos are from YouTube and play here without leaving PhysiQ. If a video does not play, use “Open in YouTube” on the chapter card.</p>
</div>`;
  }

  // open a chapter's notes and scroll to its card once the lesson file has loaded
  function openCard(x) {
    if (!window.PhysiQNotesNav) return;
    window.PhysiQNotesNav.open(x.lesson, x.sem);
    const t0 = Date.now();
    (function wait() {
      const el = document.getElementById(x.card);
      if (el) { const bar = document.querySelector('.masthead'), off = bar ? bar.offsetHeight + 12 : 12; window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' }); el.classList.add('ls-rw-flash'); setTimeout(() => el.classList.remove('ls-rw-flash'), 2000); return; }
      if (Date.now() - t0 < 8000) setTimeout(wait, 150);
    })();
  }

  function mount(root) {
    root.innerHTML = page();
    const box = root.querySelector('.rl');
    box.addEventListener('click', e => {
      const pl = e.target.closest('[data-rl-play]');
      if (pl) {
        const f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + pl.dataset.rlPlay + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        f.title = pl.getAttribute('aria-label') || 'Video'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        const v = pl.parentNode; pl.remove(); v.insertBefore(f, v.firstChild); v.classList.add('on'); return;
      }
      const g = e.target.closest('[data-rl-go]'); if (g) openCard(ITEMS[+g.dataset.rlGo]);
    });
  }

  window.PhysiQRealWorld = { mount, items: ITEMS };
})();
