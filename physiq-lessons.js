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
  const T = (x, y, s, o = {}) => (s = String(s).replace(/([A-Za-z])_([A-Za-z0-9]+)/g, '$1<tspan font-size="0.72em" dy="0.25em">$2</tspan><tspan dy="-0.25em"></tspan>').replace(/([a-z])ᵧ(.*)$/, '$1<tspan font-size="10" dy="3">y</tspan><tspan dy="-3">$2</tspan>'), `<text x="${x}" y="${y}" font-size="${o.fs || 14}" fill="${o.c || C.ink}" text-anchor="${o.a || 'middle'}"${o.it ? ' font-style="italic"' : ''}${o.b ? ' font-weight="700"' : ''}>${s}</text>`);
  const P = (d, c = 'ink', o = {}) => `<path d="${d}" fill="${o.fill || 'none'}" stroke="${C[c] || c}" stroke-width="${o.w || 2.4}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.a ? ` marker-end="url(#§${o.a})"` : ''} stroke-linejoin="round" stroke-linecap="round"/>`;
  const dot = (x, y, r = 6, c = C.ball) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${C.ink}" stroke-width="1.2"/>`;
  // axes with arrow heads, origin (x0,y0), lengths w,h
  const axes = (x0, y0, w, h, xl, yl, o = {}) => L(x0, y0, x0 + w, y0, 'k', 'e', { w: 1.6 }) + L(x0, o.yb != null ? o.yb : y0, x0, y0 - h, 'k', 'e', { w: 1.6 }) +
    (String(xl).length > 3 ? T(x0 + w, y0 + 19, xl, { a: 'end', it: 1, fs: 12 }) : T(x0 + w + 4, y0 + 5, xl, { a: 'start', it: 1 })) + T(x0, y0 - h - 8, yl, { it: 1 }) + (o.noO ? '' : T(x0 - 9, y0 + 15, '0', { fs: 12, c: C.sub }));

  // a simple table: head = [..], rows = [[..],..]
  const table = (head, rows, cls) => `<div class="ls-tw"><table class="ls-t${cls ? ' ' + cls : ''}"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const sec = (id, title, body) => `<section class="ls-sec" id="ls-${id}"><h3 class="ls-h">${title}</h3>${body}</section>`;
  const h4 = t => `<h4 class="ls-h4">${t}</h4>`;
  const pq = (title, q, opts, ansIdx, why) => `<div class="ls-ex ls-pq"><div class="ls-ex-h">${title}</div><div class="ls-ex-q">${q}</div>${opts ? `<ol class="ls-opts" type="A">${opts.map(o => `<li>${o}</li>`).join('')}</ol>` : ''}<details class="ls-sol"><summary>Show answer</summary><div class="ls-sol-b">${ansIdx != null ? `<p><b>Answer: ${'ABCD'[ansIdx]}</b></p>` : ''}${why || ''}</div></details></div>`;
  // a worked card with any title (e.g. "STPM Practice 1.1 · Question 1")
  const card = (title, q, sol, f, id) => `<div class="ls-ex"${id ? ` id="${id}"` : ''}><div class="ls-ex-h">${title}</div><div class="ls-ex-q">${q}</div>${f || ''}<details class="ls-sol"><summary>Show solution</summary><div class="ls-sol-b">${sol}</div></details></div>`;
  const dim = s => `<span class="ls-dim">${s.replace(/\^(−?-?\d+(?:\/\d+)?|[½])/g, (m, e) => `<sup>${e.replace('-', '−')}</sup>`)}</span>`;
  // Real-World Physics card: a current event, a YouTube video (loaded only when tapped), the physics link
  // and quick self-check MCQs. Not counted as a worked example; nothing here touches the question bank.
  const vb = v => `<div class="ls-rw-vid"><button type="button" class="ls-rw-play" data-rw-play="${v.id}" aria-label="Play video: ${v.title.replace(/"/g, '&quot;')}"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy"><span class="ls-rw-pb"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>${v.len ? `<span class="ls-rw-len">${v.len}</span>` : ''}</button></div>
<div class="ls-rw-cap"><span>${v.title} · ${v.channel}</span><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open in YouTube ↗</a></div>`;
  const rw = o => {
    const v = o.video;
    const qs = (o.qs || []).map((x, i) => `<div class="ls-rw-q" data-rw-ans="${x.ans}"><div class="ls-rw-qh">Quick check ${i + 1}</div><div class="ls-rw-qq">${x.q}</div><div class="ls-rw-opts">${x.opts.map((t, j) => `<button type="button" class="ls-rw-opt" data-rw-opt="${j}"><b>${'ABCD'[j]}</b><span>${t}</span></button>`).join('')}</div><div class="ls-rw-why" hidden><p class="ls-rw-res"></p>${x.why}</div></div>`).join('');
    return `<div class="ls-rw"${o.id ? ` id="${o.id}"` : ''}>
<div class="ls-rw-top"><span class="ls-rw-tag">Real-World Physics</span><span class="ls-rw-meta">${o.meta}</span></div>
<h4 class="ls-rw-t">${o.title}</h4>
<div class="ls-rw-lead">${o.lead}</div>
${vb(v)}
${o.watch ? `<p class="ls-rw-watch"><b>While you watch:</b> ${o.watch}</p>` : ''}
${o.video2 ? `<div class="ls-rw-also">Also watch</div>${vb(o.video2)}${o.watch2 ? `<p class="ls-rw-watch"><b>While you watch:</b> ${o.watch2}</p>` : ''}` : ''}
<div class="ls-rw-link"><div class="ls-rw-lh">The physics</div>${o.physics}</div>
${qs}
<p class="ls-rw-src">${o.src}</p>
</div>`;
  };
  const H = { card, dim, fr, sq, vec, avg, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, ms, ms2, svg, L, T, P, dot, axes, C, table, sec, h4, pq, rw };

  // chapters with full notes. toc ids must exist in the chapter file.
  const LESSONS = {
    'LESSON-1': { sem: '1', chapter: 1, title: 'Physical Quantities and Measurements', topics: ['1.1 Physical Quantities & Units', '1.2 Scalars and Vectors', '1.3 Uncertainties in Measurements'], examples: 28, sims: 1,
      toc: [['ls-1-1', '1.1 Dimensions and SI units'], ['ls-1-1-u', 'Unit conversion'], ['ls-1-1-d', 'Dimensions'], ['ls-1-1-a', 'Applications of dimensions'], ['ls-1-2', '1.2 Scalars and vectors'], ['ls-1-2-p', 'Dot and cross product'], ['ls-1-2-c', 'Component method'], ['ls-1-3', '1.3 Uncertainties'], ['ls-1-tips', 'Exam tips']] },
    'LESSON-3': { sem: '1', chapter: 3, title: 'Dynamics', topics: ["3.1 Newton's Laws of Motion", '3.2 Linear Momentum', '3.3 Elastic and Inelastic Collisions', '3.4 Friction'], sims: 3,
      toc: [['ls-3-1', "3.1 Newton's laws"], ['ls-3-2', '3.2 Momentum and impulse'], ['ls-3-3', '3.3 Reaction and friction']] },
    'LESSON-4': { sem: '1', chapter: 4, title: 'Work, Energy and Power', topics: ['4.1 Work Done by a Force', '4.2 Conservation of Energy', '4.3 Power and Efficiency'], sims: 2,
      toc: [['ls-4-1', '4.1 Work'], ['ls-4-2', '4.2 Conservation of energy'], ['ls-4-3', '4.3 Power and efficiency'], ['ls-4-rw', 'Real-world physics']] },
    'LESSON-5': { sem: '1', chapter: 5, title: 'Circular Motion', topics: ['5.1 Angular Velocity and Centripetal Acceleration', '5.2 Centripetal Force'], sims: 2,
      toc: [['ls-5-1', '5.1 Angular velocity'], ['ls-5-2', '5.2 Centripetal acceleration'], ['ls-5-3', '5.3 Centripetal force']] },
    'LESSON-6': { sem: '1', chapter: 6, title: 'Gravitation', topics: ["6.1 Newton's Law of Gravitation", '6.2 Gravitational Field and Potential', '6.3 Satellite Motion'], sims: 2,
      toc: [['ls-6-1', '6.1 Law of gravitation'], ['ls-6-2', '6.2 Gravitational field'], ['ls-6-3', '6.3 Gravitational potential'], ['ls-6-4', '6.4 Satellites'], ['ls-6-5', '6.5 Escape velocity'], ['ls-6-pyq', 'Past-year questions']] },
    'LESSON-7': { sem: '1', chapter: 7, title: 'Rotation of Rigid Bodies', topics: ['7.1 Torque and Angular Acceleration', '7.2 Moment of Inertia', '7.3 Angular Momentum and Rotational Kinetic Energy'], sims: 1,
      toc: [['ls-7-1', '7.1 Centre of mass'], ['ls-7-2', '7.2 Moment of inertia'], ['ls-7-3', '7.3 Torque'], ['ls-7-4', '7.4 Angular momentum'], ['ls-7-5', '7.5 Rotational KE']] },
    'LESSON-8': { sem: '1', chapter: 8, title: 'Statics', topics: ['8.1 Equilibrium of Forces', '8.2 Moments and Centre of Gravity'], sims: 1,
      toc: [['ls-8-1', 'Equilibrium of a particle'], ['ls-8-2', 'Equilibrium of a rigid body'], ['ls-8-rw', 'Real-world: Burj Khalifa']] },
    'LESSON-9': { sem: '1', chapter: 9, title: 'Deformation of Solids', topics: ["9.1 Stress, Strain and Young's Modulus", '9.2 Elastic Energy'], sims: 1,
      toc: [['ls-9-0', 'Deformation'], ['ls-9-1', '9.1 Stress and strain'], ['ls-9-2', '9.2 Graphs and Young\u2019s modulus'], ['ls-9-3', '9.3 Strain energy']] },
    'LESSON-10': { sem: '1', chapter: 10, title: 'Kinetic Theory of Gases', topics: ['10.1 Ideal Gas Equation', '10.2 Kinetic Theory and Molecular Speeds'], sims: 1,
      toc: [['ls-10-1', '10.1 Ideal gas equation'], ['ls-10-2', '10.2 Pressure of a gas'], ['ls-10-3', '10.3 Molecular KE'], ['ls-10-4', '10.4 Degrees of freedom'], ['ls-10-5', '10.5 Internal energy']] },
    'LESSON-11': { sem: '1', chapter: 11, title: 'Thermodynamics of Gases', topics: ['11.1 First Law of Thermodynamics', '11.2 Thermodynamic Processes'], sims: 1,
      toc: [['ls-11-1', '11.1 Molar heat capacity'], ['ls-11-2', '11.2 Work done by a gas'], ['ls-11-3', '11.3 First law'], ['ls-11-4', '11.4 Isothermal and adiabatic']] },
    'LESSON-12': { sem: '1', chapter: 12, title: 'Heat Transfer', topics: ['12.1 Conduction, Convection and Radiation'], sims: 2,
      toc: [['ls-12-1', '12.1 Conduction'], ['ls-12-2', '12.2 Convection'], ['ls-12-3', '12.3 Radiation'], ['ls-12-4', '12.4 Global warming'], ['ls-12-rw', 'Real-world: Nepal 2026']] },
    'LESSON-S3-19': { sem: '3', chapter: 19, title: 'Oscillations', topics: ['S3-19.1 Characteristics of Simple Harmonic Motion', 'S3-19.2 Kinematics of Simple Harmonic Motion', 'S3-19.3 Energy in Simple Harmonic Motion', 'S3-19.4 Systems in Simple Harmonic Motion', 'S3-19.5 Damped Oscillation', 'S3-19.6 Forced Oscillation and Resonance'], sims: 4,
      toc: [['ls-19-1', '19.1 Characteristics'], ['ls-19-2', '19.2 Kinematics'], ['ls-19-3', '19.3 Energy'], ['ls-19-4', '19.4 Systems'], ['ls-19-5', '19.5 Damping'], ['ls-19-6', '19.6 Resonance'], ['ls-19-7', 'Summary']] },
    'LESSON-S3-20': { sem: '3', chapter: 20, title: 'Wave Motion', topics: ['S3-20.1 Progressive Waves', 'S3-20.2 Wave Intensity', 'S3-20.3 Principle of Superposition', 'S3-20.4 Standing Waves', 'S3-20.5 Electromagnetic Waves'], sims: 5,
      toc: [['ls-20-1', '20.1 Progressive waves'], ['ls-20-2', '20.2 Intensity'], ['ls-20-3', '20.3 Superposition'], ['ls-20-4', '20.4 Standing waves'], ['ls-20-5', '20.5 EM waves'], ['ls-20-6', 'Summary']] },
    'LESSON-S3-21': { sem: '3', chapter: 21, title: 'Sound Waves', topics: ['S3-21.1 Propagation of Sound Waves', 'S3-21.2 Sources of Sound', 'S3-21.3 Intensity Level of Sound', 'S3-21.4 Beat', 'S3-21.5 Doppler Effect'], sims: 5,
      toc: [['ls-21-1', '21.1 Propagation'], ['ls-21-2', '21.2 Sources of sound'], ['ls-21-3', '21.3 Intensity level'], ['ls-21-4', '21.4 Beats'], ['ls-21-5', '21.5 Doppler effect']] },
    'LESSON-S3-22': { sem: '3', chapter: 22, title: 'Geometrical Optics', topics: ['S3-22.1 Spherical Mirrors', 'S3-22.2 Refraction at Spherical Surfaces', 'S3-22.3 Thin Lenses'], sims: 4,
      toc: [['ls-22-1', '22.1 Spherical mirrors'], ['ls-22-2', '22.2 Refraction at spherical surfaces'], ['ls-22-3', '22.3 Thin lenses'], ['ls-22-4', 'Past-year questions']] },
    'LESSON-S3-23': { sem: '3', chapter: 23, title: 'Wave Optics', topics: ['S3-23.1 Huygens\'s Principle', 'S3-23.2 Interference', 'S3-23.3 Two-slit Interference Pattern', 'S3-23.4 Interference in A Thin Film', 'S3-23.5 Diffraction by A Single Slit', 'S3-23.6 Diffraction Gratings', 'S3-23.7 Polarisation', 'S3-23.8 Optical Waveguides'], sims: 6,
      toc: [['ls-23-1', '23.1 Huygens'], ['ls-23-2', '23.2 Interference'], ['ls-23-3', '23.3 Two slits'], ['ls-23-4', '23.4 Thin film'], ['ls-23-5', '23.5 Single slit'], ['ls-23-6', '23.6 Grating'], ['ls-23-7', '23.7 Polarisation'], ['ls-23-8', '23.8 Waveguides']] },
    'LESSON-S3-24': { sem: '3', chapter: 24, title: 'Quantum Physics', topics: ['S3-24.1 Photon', 'S3-24.2 Wave-Particle Duality', 'S3-24.3 Atomic Structure', 'S3-24.4 X-rays', 'S3-24.5 Nanoscience'], sims: 6,
      toc: [['ls-24-1', '24.1 Photons'], ['ls-24-2', '24.2 Wave–particle duality'], ['ls-24-3', '24.3 Atomic structure'], ['ls-24-4', '24.4 X-rays'], ['ls-24-5', '24.5 Nanoscience']] },
    'LESSON-S3-25': { sem: '3', chapter: 25, title: 'Nuclear Physics', topics: ['S3-25.1 Nucleus', 'S3-25.2 Radioactivity', 'S3-25.3 Nuclear Reaction'], sims: 4,
      toc: [['ls-25-1', '25.1 Nucleus'], ['ls-25-2', '25.2 Radioactivity'], ['ls-25-3', '25.3 Nuclear reactions'], ['ls-25-4', 'Summary']] },
    'LESSON-S2-12': { sem: '2', chapter: 12, title: 'Electrostatics', topics: ["S2-12.1 Coulomb's Law", 'S2-12.2 Electric Field', "S2-12.3 Gauss's Law", 'S2-12.4 Electric Potential'], sims: 3,
      toc: [['ls-12-1', "12.1 Coulomb's law"], ['ls-12-2', '12.2 Electric field'], ['ls-12-3', "12.3 Gauss's law"], ['ls-12-4', '12.4 Electric potential'], ['ls-12-5', 'Summary'], ['ls-12-rw', 'Real-world: lightning']] },
    'LESSON-S2-13': { sem: '2', chapter: 13, title: 'Capacitors', topics: ['S2-13.1 Capacitance', 'S2-13.2 Parallel Plate Capacitors', 'S2-13.3 Dielectrics', 'S2-13.4 Capacitors in Series and in Parallel', 'S2-13.5 Energy Stored in a Charged Capacitor', 'S2-13.6 Charging and Discharging of a Capacitor'], sims: 5,
      toc: [['ls-13-1', '13.1 Capacitance'], ['ls-13-2', '13.2 Parallel plates'], ['ls-13-3', '13.3 Dielectrics'], ['ls-13-4', '13.4 Series and parallel'], ['ls-13-5', '13.5 Energy stored'], ['ls-13-6', '13.6 Charging and discharging']] },
    'LESSON-S2-14': { sem: '2', chapter: 14, title: 'Electric Current', topics: ['S2-14.1 Conduction of Electricity', 'S2-14.2 Drift Velocity', 'S2-14.3 Current Density', 'S2-14.4 Electric Conductivity and Resistivity'], sims: 2,
      toc: [['ls-14-1', '14.1 Conduction'], ['ls-14-2', '14.2 Drift velocity'], ['ls-14-3', '14.3 Current density'], ['ls-14-4', '14.4 Conductivity and resistivity']] },
    'LESSON-S2-15': { sem: '2', chapter: 15, title: 'Direct Current Circuits', topics: ['S2-15.1 Internal Resistance', "S2-15.2 Kirchhoff's Laws", 'S2-15.3 Potential Divider', 'S2-15.4 Potentiometer and Wheatstone Bridge'], sims: 3,
      toc: [['ls-15-1', '15.1 E.m.f. and internal resistance'], ['ls-15-2', "15.2 Kirchhoff's laws"], ['ls-15-3', '15.3 Potential divider'], ['ls-15-4', '15.4 Potentiometer and bridge']] },
    'LESSON-S2-16': { sem: '2', chapter: 16, title: 'Magnetic Fields', topics: ['S2-16.1 Concept of a Magnetic Field', 'S2-16.2 Force on a Moving Charge', 'S2-16.3 Force on a Current-Carrying Conductor', 'S2-16.4 Magnetic Fields Due to Currents', 'S2-16.5 Force Between Two Current-Carrying Conductors', 'S2-16.6 Determination of the Ratio e/m', 'S2-16.7 Hall Effect'], sims: 5,
      toc: [['ls-16-1', '16.1 Magnetic field'], ['ls-16-2', '16.2 Force on a moving charge'], ['ls-16-3', '16.3 Force on a conductor'], ['ls-16-4', '16.4 Fields due to currents'], ['ls-16-5', '16.5 Parallel conductors'], ['ls-16-6', '16.6 e/m'], ['ls-16-7', '16.7 Hall effect']] },
    'LESSON-S2-17': { sem: '2', chapter: 17, title: 'Electromagnetic Induction', topics: ['S2-17.1 Magnetic Flux', "S2-17.2 Faraday's Law and Lenz's Law", 'S2-17.3 Self Induction', 'S2-17.4 Energy Stored in an Inductor', 'S2-17.5 Mutual Induction'], sims: 6,
      toc: [['ls-17-1', '17.1 Magnetic flux'], ['ls-17-2', "17.2 Faraday's and Lenz's laws"], ['ls-17-3', '17.3 Self induction'], ['ls-17-4', '17.4 Energy in an inductor'], ['ls-17-5', '17.5 Mutual induction']] },
    'LESSON-S2-18': { sem: '2', chapter: 18, title: 'Alternating Current Circuits', topics: ['S2-18.1 AC Through a Pure Resistor', 'S2-18.2 AC Through a Pure Inductor', 'S2-18.3 AC Through a Pure Capacitor', 'S2-18.4 R-C and R-L Series Circuits'], sims: 3,
      toc: [['ls-18-1', '18.1 A.c. through a resistor'], ['ls-18-2', '18.2 Through an inductor'], ['ls-18-3', '18.3 Through a capacitor'], ['ls-18-4', '18.4 R-C, R-L and R-L-C']] },
    'LESSON-2': { sem: '1', chapter: 2, title: 'Kinematics', topics: ['2.1 Linear Motion', '2.2 Projectiles'], examples: 21, sims: 3,
      toc: [['ls-2-0', '2.0 Introduction'], ['ls-2-1', '2.1 Linear motion'], ['ls-2-1-eq', 'Equations of motion'], ['ls-2-1-ff', 'Free fall'], ['ls-2-2', '2.2 Projectile motion'], ['ls-2-2-air', 'Air resistance']] }
  };
  Object.values(LESSONS).forEach(L0 => { L0.label = 'Full notes · Cikgu Suhaili'; });
  const BODY = {}, loading = {};
  const VER = '20261022j';
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
      const s = e.target.closest('[data-ls-size]'); if (s) { applySize(root, s.dataset.lsSize); return; }
      const pl = e.target.closest('[data-rw-play]');
      if (pl) {
        const id = pl.dataset.rwPlay, box = pl.parentNode, f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
        f.title = pl.getAttribute('aria-label') || 'Video'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        box.innerHTML = ''; box.appendChild(f); box.classList.add('on'); return;
      }
      const op = e.target.closest('[data-rw-opt]');
      if (op) {
        const q = op.closest('.ls-rw-q'); if (!q || q.classList.contains('done')) return;
        const ans = +q.dataset.rwAns, pick = +op.dataset.rwOpt, ok = pick === ans;
        q.classList.add('done');
        q.querySelectorAll('[data-rw-opt]').forEach(b => { const j = +b.dataset.rwOpt; b.disabled = true; if (j === ans) b.classList.add('ok'); else if (j === pick) b.classList.add('no'); });
        const w = q.querySelector('.ls-rw-why'); if (w) { w.hidden = false; const r = w.querySelector('.ls-rw-res'); if (r) { r.textContent = ok ? 'Correct!' : 'Not quite. The answer is ' + 'ABCD'[ans] + '.'; r.className = 'ls-rw-res ' + (ok ? 'ok' : 'no'); } }
      }
    });
    const count = () => { const n = root.querySelectorAll('.ls-body .ls-ex').length, c = root.querySelector('.ls-nex'); if (c && n) c.textContent = n + ' worked examples'; };
    const fill = () => { const b = root.querySelector('.ls-body'); if (!b || !root.isConnected) return; b.innerHTML = BODY[k].html(); count(); if (window.PhysiQSims) window.PhysiQSims.mountAll(root); };
    if (BODY[k]) { count(); if (window.PhysiQSims) window.PhysiQSims.mountAll(root); } else load(k, fill);
  }

  window.PhysiQLessons = { LESSONS, H, register, render, init, has: k => !!LESSONS[k] };
})();
