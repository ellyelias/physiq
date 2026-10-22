/* PhysiQ "Physics in Real Life": real events, real engineering and real experiments for every chapter of STPM
   Physics 960 (Semester 1: Ch 1–12, Semester 2: Ch 13–19, Semester 3: Ch 20–26).
   - page():       the Physics in Real Life catalogue (Home button), grouped by semester and chapter
   - forLesson(k): the same videos at the end of that chapter's full notes (except those already shown there as a card)
   - sportsBlock() / forTopic(t): Projectile Motion in Sports (2.2 Projectiles), also shown in Learn and the topic notes
   Every video plays inside PhysiQ (tap to play, never on its own), with "Open in YouTube" as the fallback.
   Add a new entry to ITEMS whenever a video is added to a chapter. */
(function () {
  'use strict';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const yt = id => 'https://www.youtube.com/watch?v=' + id;

  // a video that loads only when tapped
  function player(v, small) {
    return `<div class="rl-vid${small ? ' sm' : ''}"><button type="button" class="rl-play" data-rl-play="${esc(v.id)}" aria-label="Play video: ${esc(v.title)}"><img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy"><span class="rl-pb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button>
<div class="rl-vcap">${v.type ? `<span class="rl-type">${esc(v.type)}</span>` : ''}<span>${esc(v.title)}${v.channel ? ' · ' + esc(v.channel) : ''}</span><a href="${yt(esc(v.id))}" target="_blank" rel="noopener">Open in YouTube ↗</a></div></div>`;
  }

  // ---------- Projectile Motion in Sports (STPM 960, Semester 1, 2.2 Projectiles) ----------
  const SPORTS = [
    { sport: 'Long jump', role: 'main', id: 'nD1SaasK8Vs', title: 'Long jump Projectile Motion Problem | Physics of Long Jump!', type: 'Sports application',
      why: 'After take-off, treat the athlete’s centre of mass as a projectile: launch velocity, time in the air and horizontal range.' },
    { sport: 'Football kick', role: 'main', id: 's0ha2rgsvSU', title: '3.3 Projectile Motion, Part B', type: 'Sports worked example',
      why: 'A worked example with a kicked football: maximum height, time of flight and range. Watch it after learning the equations.' },
    { sport: 'Basketball shot', role: '', id: '5GoQ2Vkkgn8', title: 'Projectile Motion - Basketball in Projectile Motion', type: 'Sports footage',
      why: 'The ball follows a curved path once it leaves the player’s hands; compare its horizontal and vertical motion.' },
    { sport: 'Javelin throw', role: 'ext', id: '_74f4pMWyZ8', title: 'Physics of Javelin Throw is more than just Projectile Motion | Neeraj Chopra Olympic Gold & Physics', type: 'Sports extension',
      why: 'Release speed, angle and height all matter, but air resistance and aerodynamic lift act on a real javelin, so its path is not a perfect parabola.' }
  ];
  function sportsBlock(id) {
    const card = v => `<div class="sp-card${v.role === 'main' ? ' sp-main' : ''}${v.role === 'ext' ? ' sp-ext' : ''}">
  ${player({ id: v.id, title: v.title }, true)}
  <div class="sp-top"><b>${esc(v.sport)}</b>${v.role === 'main' ? '<em>Main lesson</em>' : v.role === 'ext' ? '<em class="x">Real-world extension</em>' : ''}</div>
  <div class="sp-why">${esc(v.why)}</div></div>`;
    return `<div class="sp"${id ? ` id="${id}"` : ''}>
<div class="sp-head"><span class="sp-tag">Physics in Real Life</span><span class="sp-ref">STPM 960 · Semester 1 · 2.2 Projectiles</span></div>
<h3 class="sp-h">Projectile Motion in Sports</h3>
<p class="sp-lead">Once the ball or the athlete leaves the ground or the hand, it becomes a projectile. If air resistance is neglected, the <b>horizontal component of velocity is constant</b> and the <b>vertical acceleration is <i>g</i> downwards</b>.</p>
<div class="sp-grid">${SPORTS.map(card).join('')}</div>
<div class="sp-ask"><b>While you watch, identify:</b><ol><li>the <b>launch point</b>: the instant the object becomes a projectile;</li><li>the <b>horizontal motion</b>: which velocity component stays constant;</li><li>the <b>vertical acceleration</b>: its size and direction;</li><li><b>one factor</b> that makes the real path differ from the ideal model.</li></ol></div>
<p class="sp-note">Real sports trajectories are not always perfect parabolas. A spinning football can curve sideways because of the Magnus effect, and a javelin is affected by lift and air resistance; these go beyond the basic projectile model.</p>
</div>`;
  }
  const TOPIC_BLOCKS = { '2.2 Projectiles': () => sportsBlock() };
  function forTopic(t) { const f = TOPIC_BLOCKS[t]; return f ? f() : ''; }

  // ---------- the catalogue ----------
  // lesson: the chapter's full-notes key. card: id of a Real-World Physics card already in that chapter's notes (with quick checks).
  const L = (sem, ch) => sem === '1' ? 'LESSON-' + ch : 'LESSON-S' + sem + '-' + ch;
  const ITEMS = [
    // ---- Semester 1 ----
    { sem: '1', ch: 1, title: 'A spacecraft lost to a unit mistake', physics: 'One team worked in pound-force seconds and the other in newton seconds; the mismatch sent the Mars Climate Orbiter too close to Mars. Units and dimensions must be checked in every calculation.',
      videos: [{ id: 'urcQAKKAAl0', title: 'When NASA Lost a Spacecraft Because It Didn’t Use Metric', channel: 'It Happened in Space', type: 'Real event' }] },
    { sem: '1', ch: 2, title: 'Projectile Motion in Sports', physics: 'Long jump, football, basketball and javelin: launch point, constant horizontal velocity, vertical acceleration g, and the effects of air resistance.',
      card: 'ls-2-rw-sports', videos: SPORTS.map(v => ({ id: v.id, title: v.sport + ': ' + v.title, type: v.type })) },
    { sem: '1', ch: 3, title: 'A rocket launch', physics: 'The rocket pushes exhaust gas downwards and the gas pushes the rocket upwards (Newton’s third law); thrust is the rate of change of momentum of the gas. A rocket under thrust is not a projectile.',
      videos: [{ id: 'Yi2vFUDesY8', title: 'NASA PACE Falcon 9 launch', channel: 'NASA', type: 'Real launch footage' }] },
    { sem: '1', ch: 4, title: 'When a glacier falls 1200 m', physics: 'Gravitational potential energy, work done against friction, and the enormous power of the Nepal debris flow (August 2026).',
      card: 'ls-4-rw-nepal', videos: [{ id: 'Ss9fMd9C8os', title: 'Why Nepal’s 2026 Flood Was Too Big for Any Single Defense', channel: 'DT Terra', type: 'Current affairs' },
        { id: 'hG7E3--2xwA', title: 'The Most Terrifying Flood Ever Filmed', channel: 'OzGeology', type: 'Current affairs' }] },
    { sem: '1', ch: 4, title: 'Inside a mega dam', physics: 'Energy changes in a hydroelectric station and the 92% efficiency of the Kölnbrein turbines.',
      card: 'ls-4-rw-dam', videos: [{ id: 'DbvgK3PrSWw', title: 'How the Turbines in the Kölnbrein Dam are 92% Efficient', channel: 'Richard Hammond’s BIG', type: 'Documentary' }] },
    { sem: '1', ch: 4, title: 'Energy on a roller coaster', physics: 'Gravitational potential energy changes into kinetic energy and back; the loss of mechanical energy equals the work done against friction and air resistance.',
      videos: [{ id: 'T3EG7z8L-yk', title: 'Calculating Mechanical Energy of a Roller Coaster', type: 'Real-world application' }] },
    { sem: '1', ch: 5, title: 'Astronaut centrifuge training', physics: 'The capsule moves in a circle; the seat provides the centripetal force, so the astronaut feels a = ω²r as several g. Faster rotation means a much larger force.',
      videos: [{ id: 'fAqa982j1a0', title: 'Chris Hadfield: Inside the Centrifuge', channel: 'Chris Hadfield', type: 'Real footage' }] },
    { sem: '1', ch: 6, title: 'Why astronauts float', physics: 'At the height of the ISS, g is still about 90% of its value at the surface. Astronauts float because they and the station are in free fall together, with gravity providing the centripetal force for the orbit.',
      videos: [{ id: 'YywPL887dWQ', title: 'If Gravity in Space Is 90% as Strong as on Earth, Why Do Astronauts Float?', type: 'Explainer' }] },
    { sem: '1', ch: 7, title: 'A figure skater’s spin', physics: 'Pulling the arms in reduces the moment of inertia; with no external torque, angular momentum Iω is conserved, so the angular velocity increases.',
      videos: [{ id: 'l2VuosSk9zU', title: 'Dorothy Hamill performs the scratch spin', type: 'Real sports footage' }] },
    { sem: '1', ch: 8, title: 'Why the Burj Khalifa doesn’t fall over', physics: 'Equilibrium, centre of gravity and stability, and the stress in the piles.',
      card: 'ls-8-rw-burj', videos: [{ id: 'N5i3UsiSoYY', title: 'The Physics Behind The Burj Khalifa And Why It Doesn’t Fall Over', channel: 'Quest TV', type: 'Documentary' }] },
    { sem: '1', ch: 8, title: 'How a tower crane stays upright', physics: 'The counterweight balances the moment of the load about the tower: for equilibrium the sum of clockwise moments equals the sum of anticlockwise moments, and the centre of gravity must stay over the base.',
      videos: [{ id: 'ROyVptssgOc', title: 'How Cranes Lift Heavy Loads Without Tipping Over', type: 'Engineering explainer' }] },
    { sem: '1', ch: 9, title: 'A real tensile test', physics: 'A steel specimen is stretched to breaking: identify the elastic region, the yield point and plastic (permanent) deformation on the stress–strain graph.',
      videos: [{ id: 'jIxwVfTuK6Q', title: 'Tensile test: stress-strain diagram', channel: 'UPV', type: 'Laboratory demonstration' }] },
    { sem: '1', ch: 10, title: 'How a hot air balloon rises', physics: 'Heating the air raises the mean kinetic energy of its molecules; at the same pressure the hot air is less dense (pV = nRT), so the balloon is pushed up by the cooler, denser air around it.',
      videos: [{ id: 'dhIcNhwqebw', title: 'How does a hot air balloon fly?', type: 'Explainer' }] },
    { sem: '1', ch: 11, title: 'A diesel engine: ignition by adiabatic compression', physics: 'Air is compressed so quickly that little heat escapes (nearly adiabatic): work done on the gas raises its internal energy and temperature enough to ignite the fuel without a spark.',
      videos: [{ id: 'qeGQgPQsJJI', title: 'How a diesel engine works', type: 'Animation' }] },
    { sem: '1', ch: 12, title: 'Can a warmer Earth bring a mountain down?', physics: 'The enhanced greenhouse effect, Wien’s law and melting permafrost behind the Nepal glacier collapse.',
      card: 'ls-12-rw-nepal', videos: [{ id: 'gowCz9olnhk', title: 'How a Mountain Collapse Became Nepal’s Catastrophic Flood', channel: 'Project Quantum', type: 'Current affairs' }] },
    { sem: '1', ch: 12, title: 'Inside a vacuum flask', physics: 'The vacuum stops conduction and convection, the silvered walls reduce radiation, and the stopper stops convection out of the top.',
      videos: [{ id: 'T8RZwA5Xp0E', title: 'How a Vacuum (Thermos) Flask Works', type: 'Explainer' }] },
    // ---- Semester 2 ----
    { sem: '2', ch: 13, title: 'Does the Burj Khalifa collect lightning?', physics: 'Charge collects at sharp points, a Faraday cage protects the people inside, and one strike holds only about 10⁹ J.',
      card: 'ls-12-rw-lightning', videos: [{ id: 'E0RdTXJaqJs', title: 'How The Burj Khalifa Is Dubai’s Lightning Rod', channel: 'Richard Hammond’s BIG', type: 'Documentary' },
        { id: 've6XGKZxYxA', title: 'Richard Hammond inside a car struck by lightning (Top Gear)', channel: 'BBC Studios', type: 'Real demonstration' }] },
    { sem: '2', ch: 13, title: 'How a lightning rod works', physics: 'A Van de Graaff generator shows charge gathering on a pointed conductor and the strong electric field that lets charge leak away safely.',
      videos: [{ id: 'wGc3q4dVOS0', title: 'Demonstration of How Lightning Rods Work', type: 'Live demonstration' }] },
    { sem: '2', ch: 14, title: 'A defibrillator is a capacitor', physics: 'The defibrillator charges a capacitor to a high voltage, then discharges its stored energy, U = ½CV², through the patient’s chest in a few milliseconds.',
      videos: [{ id: 'f7p-RaySkDI', title: 'Example: A Defibrillator is a Capacitor', type: 'Worked example' }] },
    { sem: '2', ch: 15, title: 'Choosing the right fuse', physics: 'Current heats a wire; a thin fuse wire with a large current density gets hot fastest and melts, breaking the circuit before the cables overheat.',
      videos: [{ id: '-lOjy7WEmGQ', title: 'How to choose the right fuse: explained with demonstrations', channel: 'fizzics.org', type: 'Demonstration' }] },
    { sem: '2', ch: 16, title: 'Strain gauges and the Wheatstone bridge', physics: 'Stretching a strain gauge changes its resistance very slightly; a Wheatstone bridge detects that change by measuring the small potential difference when the bridge goes out of balance.',
      videos: [{ id: 'L0uW1NHYdDQ', title: 'Why you need a Wheatstone Bridge to get accurate Strain Gauge Readings', type: 'Engineering application' }] },
    { sem: '2', ch: 17, title: 'The magnet inside an MRI scanner', physics: 'A current in a superconducting solenoid produces a very strong uniform magnetic field (B = μ₀nI); steel objects are pulled in with great force.',
      videos: [{ id: 'I6OHy3MipS4', title: 'Demonstrating the power of MRI magnets', type: 'Real demonstration' }] },
    { sem: '2', ch: 18, title: 'Japan’s maglev train', physics: 'Superconducting magnets on the moving train induce currents in coils beside the track; by Lenz’s law the induced currents oppose the motion of the magnets, lifting and guiding the train.',
      videos: [{ id: 'S4L_0CDsd1I', title: 'How Japan’s Maglev Train Works', type: 'Engineering explainer' }] },
    { sem: '2', ch: 19, title: 'Why power lines use high voltage', physics: 'For the same power P = VI, a higher voltage means a smaller current, so the power lost as heat in the cables, I²R, is much smaller. AC voltage is easy to step up and down with transformers.',
      videos: [{ id: 'xlJ1-h6en4A', title: 'Why do Power Lines use High Voltage?', type: 'Explainer' }] },
    // ---- Semester 3 ----
    { sem: '3', ch: 20, title: 'London’s wobbly Millennium Bridge', physics: 'Walkers pushed sideways in step with the bridge’s natural sway frequency; this forced oscillation at resonance made the amplitude grow until dampers were fitted.',
      videos: [{ id: 'Hz72lzDxMfc', title: '2000: “Wobbly” Millennium Bridge closed days after opening', type: 'News footage' }] },
    { sem: '3', ch: 21, title: 'Why does a tsunami grow taller at the shore?', physics: 'Wave speed falls in shallow water, the frequency stays the same, so the wavelength shortens and the amplitude grows (I ∝ A²).',
      card: 'ls-20-rw-tsunami', videos: [{ id: 'tJ6G2lTo6xA', title: 'Japan’s giant tsunami sea wall', type: 'Documentary' }] },
    { sem: '3', ch: 21, title: 'Waves in a ripple tank', physics: 'Real water waves show wavefronts, reflection, refraction and diffraction.',
      videos: [{ id: 'ybOYXLKAqlo', title: 'The mesmerizing ripple tank', type: 'Laboratory footage' }] },
    { sem: '3', ch: 22, title: 'Ultrasound scans', physics: 'Pulses of high-frequency sound reflect at boundaries between tissues; the time for each echo to return gives the depth of the boundary.',
      videos: [{ id: 'sTcqtljxLOk', title: 'Ultrasound Medical Imaging', channel: 'Khan Academy', type: 'Medical application' }] },
    { sem: '3', ch: 23, title: 'The undersea cables that carry the internet', physics: 'Light travels along optical fibres by total internal reflection; undersea fibre-optic cables link Malaysia with the rest of Asia.',
      videos: [{ id: 'tYIht5M3T2A', title: 'The Undersea Lifeline: The Hidden Network Powering Asia', type: 'Regional documentary' },
        { id: '95rQjA9n270', title: 'Fibre optics explained', type: 'Explainer' }] },
    { sem: '3', ch: 24, title: 'Diffraction and interference with a laser', physics: 'A laser through slits gives bright and dark fringes: constructive interference where the path difference is nλ, destructive where it is (n + ½)λ.',
      videos: [{ id: 'CxS8cfqg1a0', title: 'Wave Optics: Diffraction and Interference Experiment', type: 'Optics experiment' }] },
    { sem: '3', ch: 25, title: 'X-rays in medicine and industry', physics: 'Fast electrons hitting a metal target produce X-rays; higher-energy (hard) X-rays are more penetrating than soft X-rays, which is used in radiography and industrial inspection.',
      videos: [{ id: 'epw17hrE0lw', title: 'X-ray Production', channel: 'Radiology Series', type: 'Medical technology' },
        { id: 'QqJqKwm3Vd0', title: 'X-ray tube and medical physics', type: 'Topic lesson' },
        { id: 'IcWjZbXiFkM', title: 'Industrial X-ray inspection and CT', type: 'Industrial application' }] },
    { sem: '3', ch: 26, title: 'Inside a nuclear power station', physics: 'Energy released by fission heats water to steam that turns turbines; shielding and control rods keep the reaction and the radiation under control. Radiation is also used to breed new crop varieties.',
      videos: [{ id: 'jmZtbv0tPXo', title: 'Inside a Nuclear Power Station: Heysham 2', channel: 'EDF', type: 'Real facility footage' },
        { id: 'ZSd_g_VK-J8', title: 'Using Nuclear Science to Boost Plant Biodiversity', channel: 'IAEA', type: 'Field application' }] }
  ];
  ITEMS.forEach(x => { x.lesson = L(x.sem, x.ch); x.anchor = x.card || ('rl-' + x.videos[0].id); });

  const chName = x => { const LS = window.PhysiQLessons; const l = LS && LS.LESSONS[x.lesson]; return l ? l.title : ''; };

  function item(x, i) {
    return `<article class="rl-item${x.videos.length > 1 ? ' multi' : ''}">
  <div class="rl-vids">${x.videos.map(v => player(v, x.videos.length > 2)).join('')}</div>
  <div class="rl-body">
    <h4 class="rl-t">${esc(x.title)}</h4>
    <p class="rl-ph">${esc(x.physics)}</p>
    <button type="button" class="rl-go" data-rl-go="${i}">${x.card ? `Open in Chapter ${x.ch} notes, with quick checks` : `Open Chapter ${x.ch} notes`} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
  </div>
</article>`;
  }

  function page() {
    const nVid = ITEMS.reduce((n, x) => n + x.videos.length, 0), nCh = new Set(ITEMS.map(x => x.sem + ':' + x.ch)).size;
    const sems = [['1', 'Mechanics and Heat'], ['2', 'Electricity and Magnetism'], ['3', 'Oscillations, Waves and Modern Physics']];
    return `<div class="rl">
  <header class="rl-head"><div class="rl-k">${nVid} videos · all ${nCh} chapters</div><h2 class="rl-title">Physics in Real Life</h2>
    <p class="rl-sub">Real events, real engineering and real experiments for every chapter. Watch a video, then open its chapter notes.</p>
    <nav class="rl-jump">${sems.map(([s]) => `<button type="button" data-rl-sem="${s}">Semester ${s}</button>`).join('')}</nav></header>
  ${sems.map(([s, sub]) => {
    const chs = [...new Set(ITEMS.filter(x => x.sem === s).map(x => x.ch))];
    return `<section class="rl-sec" id="rl-sem-${s}"><h3 class="rl-sh">Semester ${s} <span>${sub}</span></h3>${chs.map(c => {
      const list = ITEMS.map((x, i) => [x, i]).filter(([x]) => x.sem === s && x.ch === c);
      return `<div class="rl-chap"><div class="rl-chh"><span class="rl-chn">${c}</span><b>${esc(chName(list[0][0]))}</b></div>${list.map(([x, i]) => item(x, i)).join('')}</div>`;
    }).join('')}</section>`;
  }).join('')}
  <p class="rl-note">Tap a picture to play the video here. If a video will not play, use “Open in YouTube”.</p>
</div>`;
  }

  // the chapter's videos at the end of its full notes (cards already in the notes are not repeated)
  function forLesson(k) {
    const list = ITEMS.filter(x => x.lesson === k && !x.card);
    if (!list.length) return '';
    return `<section class="ls-sec rl-lesson" id="ls-rl"><h3 class="ls-h">Physics in Real Life</h3>
<p class="rl-lsub">Real-world videos for this chapter. Tap a picture to play it here.</p>
${list.map(x => `<div class="rl-ls-item" id="${esc(x.anchor)}"><div class="rl-vids">${x.videos.map(v => player(v, x.videos.length > 2)).join('')}</div><div class="rl-body"><h4 class="rl-t">${esc(x.title)}</h4><p class="rl-ph">${esc(x.physics)}</p></div></div>`).join('')}
</section>`;
  }
  function hasLesson(k) { return ITEMS.some(x => x.lesson === k && !x.card); }

  // open a chapter's notes and scroll to the video once the lesson file has loaded
  function openItem(x) {
    if (!window.PhysiQNotesNav) return;
    window.PhysiQNotesNav.open(x.lesson, x.sem);
    const t0 = Date.now();
    const wait = () => {
      const el = document.getElementById(x.anchor);
      if (el) { const bar = document.querySelector('.masthead'), off = bar ? bar.offsetHeight + 12 : 12; window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' }); el.classList.add('ls-rw-flash'); setTimeout(() => el.classList.remove('ls-rw-flash'), 2000); return; }
      if (Date.now() - t0 < 8000) setTimeout(wait, 150);
    };
    setTimeout(wait, 250);   // let the Notes view finish switching before measuring where the video is
  }

  // one listener for every player on the page (catalogue, lesson notes, Learn, topic notes)
  document.addEventListener('click', e => {
    const pl = e.target.closest && e.target.closest('[data-rl-play]');
    if (pl) {
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(pl.dataset.rlPlay) + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      f.title = pl.getAttribute('aria-label') || 'Video'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      const v = pl.parentNode; pl.remove(); v.insertBefore(f, v.firstChild); v.classList.add('on'); return;
    }
    const g = e.target.closest && e.target.closest('[data-rl-go]'); if (g) { openItem(ITEMS[+g.dataset.rlGo]); return; }
    const j = e.target.closest && e.target.closest('[data-rl-sem]');
    if (j) { const t = document.getElementById('rl-sem-' + j.dataset.rlSem); if (t) { const bar = document.querySelector('.masthead'), off = bar ? bar.offsetHeight + 12 : 12; window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' }); } }
  });

  function mount(root) { root.innerHTML = page(); }

  window.PhysiQRealWorld = { mount, items: ITEMS, sportsBlock, forTopic, forLesson, hasLesson };
})();
