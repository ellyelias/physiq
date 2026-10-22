/* Semester 3 Chapter 20 Wave Motion: full notes by Cikgu Suhaili (from chap20_Waves_Motion_latest.pptx).
   App chapter 20 = STPM 2026 syllabus chapter 21. 20.1, 20.2 and 20.5 are written from the syllabus (the deck covers 20.3 and 20.4). */
(function () {
  'use strict';
  const { fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq, ms, ms2, rw } = window.PhysiQLessons.H;
  const kx = `${fr('2π<i>x</i>', 'λ')}`;

  // ---------- figures ----------
  const curve = (x0, y0, w, a, lam, ph = 0, n = 120, f = Math.sin) => { let d = ''; for (let i = 0; i <= n; i++) { const x = w * i / n; d += (i ? ' L' : 'M') + (x0 + x).toFixed(1) + ',' + (y0 - a * f(2 * Math.PI * x / lam + ph)).toFixed(1); } return d; };
  const F = {};
  F.kinds = () => {
    let tr = '', lo = '';
    for (let i = 0; i < 17; i++) { const x = 30 + i * 18; tr += dot(x, 60 - 26 * Math.sin(2 * Math.PI * i / 12), 4, C.ball); }
    for (let i = 0; i < 34; i++) { const x0 = 30 + i * 9, x = x0 + 8 * Math.sin(2 * Math.PI * i / 16); lo += L(x, 150, x, 190, 'v', '', { w: 1.6 }); }
    return svg(360, 230, T(10, 20, 'Transverse wave', { a: 'start', b: 1, fs: 13 }) + L(30, 60, 330, 60, 's', '', { d: '3 3', w: 1 }) + tr + L(342, 60, 352, 60, 'k', '') + L(250, 22, 300, 22, 'o', 'e') + T(305, 26, 'wave', { a: 'start', fs: 11, c: C.o }) + L(84, 40, 84, 80, 'r', 'b', { w: 1.6 }) + T(90, 100, 'particles vibrate ⊥ to the direction of travel', { a: 'start', fs: 11, c: C.r }) +
      T(10, 136, 'Longitudinal wave', { a: 'start', b: 1, fs: 13 }) + lo + T(70, 210, 'C', { fs: 11, b: 1 }) + T(140, 210, 'R', { fs: 11, b: 1 }) + T(10, 226, 'C = compression, R = rarefaction; particles vibrate ∥ to travel', { a: 'start', fs: 11, c: C.r }) + L(250, 132, 300, 132, 'o', 'e') + T(305, 136, 'wave', { a: 'start', fs: 11, c: C.o }), 380);
  };
  F.yx = () => svg(360, 170, axes(30, 85, 315, 70, 'x', 'y', { noO: 1, yb: 160 }) + P(curve(30, 85, 300, 55, 160), 'v', { w: 2.4 }) + L(70, 22, 230, 22, 'k', 'b', { w: 1.2 }) + T(150, 16, 'λ', { it: 1 }) + L(70, 30, 70, 85, 's', '', { d: '3 3', w: 1 }) + L(230, 30, 230, 85, 's', '', { d: '3 3', w: 1 }) +
    L(250, 85, 250, 30, 'r', 'b', { w: 1.4 }) + T(258, 60, 'A', { it: 1, c: C.r, a: 'start' }) + L(300, 50, 340, 50, 'o', 'e') + T(320, 44, 'v', { it: 1, c: C.o }) + T(180, 166, 'a snapshot at one instant (displacement–distance graph)', { fs: 11, c: C.sub }), 380);
  F.yt = () => svg(360, 170, axes(30, 85, 315, 70, 't', 'y', { noO: 1, yb: 160 }) + P(curve(30, 85, 300, 55, 160, 0, 120, x => -Math.sin(x)), 'g', { w: 2.4 }) + L(30, 148, 190, 148, 'k', 'b', { w: 1.2 }) + T(110, 142, 'T', { it: 1 }) + T(180, 166, 'one particle followed in time (displacement–time graph)', { fs: 11, c: C.sub }), 380);
  F.phase = () => svg(360, 160, axes(30, 80, 315, 70, 'x', 'y', { noO: 1, yb: 150 }) + P(curve(30, 80, 300, 50, 200), 'v', { w: 2.4 }) + dot(80, 80 - 50 * Math.sin(2 * Math.PI * 50 / 200), 6, C.o) + dot(170, 80 - 50 * Math.sin(2 * Math.PI * 140 / 200), 6, C.o) +
    T(80, 22, 'P', { b: 1 }) + T(170, 138, 'Q', { b: 1 }) + L(80, 146, 170, 146, 'k', 'b', { w: 1.2 }) + T(125, 140, 'Δx', { it: 1, fs: 12 }) + T(200, 140, 'φ = 2πΔx/λ', { fs: 13, a: 'start', c: C.r }), 380);
  F.point = () => svg(380, 200, [40, 80, 120].map((r, i) => `<circle cx="80" cy="100" r="${r}" fill="none" stroke="${C.v}" stroke-width="1.4" stroke-dasharray="${i ? '5 4' : ''}"/>`).join('') + dot(80, 100, 6, '#E7B54A') + T(80, 124, 'S', { b: 1 }) + L(80, 100, 196, 70, 'k', 'e', { w: 1.2 }) + T(150, 74, 'r', { it: 1 }) +
    T(220, 60, 'power P spreads over', { fs: 12, a: 'start' }) + T(220, 76, 'a sphere of area 4πr²', { fs: 12, a: 'start' }) + T(220, 112, 'I = P / 4πr²', { fs: 14, a: 'start', it: 1, b: 1, c: C.v }) + T(220, 136, 'I ∝ 1/r²,  A ∝ 1/r', { fs: 12, a: 'start', c: C.r }), 380);
  const pulse = (x0, y0, c, h, w = 40) => { let d = ''; for (let i = 0; i <= 40; i++) { const x = -w + 2 * w * i / 40; d += (i ? ' L' : 'M') + (x0 + x).toFixed(1) + ',' + (y0 - h * Math.exp(-x * x / (w * w / 6))).toFixed(1); } return P(d, c, { w: 2.4 }); };
  F.superpose = () => svg(360, 270, [0, 1].map(j => { const y0 = 70 + j * 130, s = j ? -1 : 1; return T(8, y0 - 46, j ? '(b) opposite displacements' : '(a) same direction', { a: 'start', b: 1, fs: 12 }) +
    L(20, y0, 170, y0, 's', '', { w: 1 }) + pulse(60, y0, C.v, 30) + pulse(130, y0, C.o, 22 * s) + L(70, y0 - 40, 90, y0 - 40, 'v', 'e', { w: 1.4 }) + L(130, y0 - 40, 110, y0 - 40, 'o', 'e', { w: 1.4 }) +
    T(185, y0 + 4, '→', { fs: 18 }) + L(205, y0, 350, y0, 's', '', { w: 1 }) + pulse(278, y0, C.g, 30 + 22 * s) + T(278, y0 + 22 - (j ? -8 : 0), j ? 'partly cancel: y = y₁ + y₂' : 'add: y = y₁ + y₂', { fs: 11, c: C.g }); }).join(''), 380);
  F.reflect = () => two(svg(220, 160, T(110, 16, 'fixed end', { b: 1, fs: 12 }) + L(200, 20, 200, 140, 'k', '', { w: 3 }) + L(20, 60, 200, 60, 's', '', { w: 1 }) + pulse(90, 60, C.v, 28, 30) + L(105, 22, 135, 22, 'v', 'e', { w: 1.4 }) + L(20, 110, 200, 110, 's', '', { w: 1 }) + pulse(110, 110, C.o, -24, 30) + L(125, 76, 95, 76, 'o', 'e', { w: 1.4 }) + T(110, 154, 'inverted (phase change of π)', { fs: 11, c: C.o }), 220),
    svg(220, 160, T(110, 16, 'free end', { b: 1, fs: 12 }) + L(200, 20, 200, 140, 's', '', { w: 1.4, d: '4 3' }) + L(20, 60, 200, 60, 's', '', { w: 1 }) + pulse(90, 60, C.v, 28, 30) + L(105, 22, 135, 22, 'v', 'e', { w: 1.4 }) + L(20, 110, 200, 110, 's', '', { w: 1 }) + pulse(110, 110, C.o, 24, 30) + L(125, 76, 95, 76, 'o', 'e', { w: 1.4 }) + T(110, 154, 'not inverted (no phase change)', { fs: 11, c: C.o }), 220));
  F.standing = () => { const env = (s) => curve(30, 90, 300, 55 * s, 200, Math.PI / 2, 120, Math.sin); return svg(360, 190, L(30, 90, 330, 90, 's', '', { w: 1 }) + P(env(1), 'v', { w: 2.2 }) + P(env(-1), 'v', { w: 2.2, d: '6 4' }) + P(env(0.45), 'v', { w: 1, d: '2 3' }) +
    [80, 180, 280].map(x => dot(x, 90, 4.5, C.r) + T(x, 112, 'N', { b: 1, fs: 12, c: C.r })).join('') + [30, 130, 230, 330].map(x => T(x, 22, 'A', { b: 1, fs: 12, c: C.g })).join('') +
    L(80, 150, 180, 150, 'k', 'b', { w: 1.2 }) + T(130, 166, 'λ/2 (node to node)', { fs: 11 }) + L(180, 130, 230, 130, 'k', 'b', { w: 1.2 }) + T(205, 124, 'λ/4', { fs: 11 }) + T(330, 184, 'N = node, A = antinode', { fs: 11, a: 'end', c: C.sub }), 380); };
  F.harm = () => [1, 2, 3].map(n => svg(370, 70, L(20, 12, 20, 58, 'k', '', { w: 3 }) + L(300, 12, 300, 58, 'k', '', { w: 3 }) + P(curve(20, 35, 280, 20, 560 / n), 'v', { w: 2.2 }) + P(curve(20, 35, 280, -20, 560 / n), 'v', { w: 2.2, d: '5 4' }) +
    T(310, 30, n === 1 ? 'n = 1' : 'n = ' + n, { a: 'start', fs: 11, b: 1 }) + T(310, 46, n === 1 ? 'L = λ/2' : n === 2 ? 'L = λ' : 'L = 3λ/2', { a: 'start', fs: 11 }), 380)).join('');
  F.em = () => { let e = '', b = ''; const ox = 40, oy = 110; for (let i = 0; i <= 120; i++) { const t = i / 120, x = ox + t * 280, s = Math.sin(2 * Math.PI * t * 1.5); e += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (oy - 60 * s).toFixed(1); b += (i ? ' L' : 'M') + (x - 34 * s).toFixed(1) + ',' + (oy + 22 * s).toFixed(1); }
    let fill = ''; for (let i = 1; i < 30; i++) { const t = i / 30, x = ox + t * 280, s = Math.sin(2 * Math.PI * t * 1.5); fill += L(x, oy, x, oy - 60 * s, 'r', '', { w: 0.7 }) + L(x, oy, x - 34 * s, oy + 22 * s, 'v', '', { w: 0.7 }); }
    return svg(380, 210, fill + L(ox, oy, 350, oy, 'k', 'e', { w: 1.6 }) + P(e, 'r', { w: 2.4 }) + P(b, 'v', { w: 2.4 }) + L(ox, oy, ox, 30, 'k', 'e', { w: 1.2 }) + L(ox, oy, ox - 30, oy + 22, 'k', 'e', { w: 1.2 }) +
      T(ox + 4, 26, 'E', { it: 1, b: 1, c: C.r, a: 'start' }) + T(ox - 34, oy + 38, 'B', { it: 1, b: 1, c: C.v }) + T(354, oy + 4, 'x', { it: 1, a: 'start' }) + T(200, 200, 'E ⊥ B ⊥ direction of travel; E and B in phase', { fs: 11, c: C.sub }), 400); };
  F.spec = () => { const bands = [['γ-rays', '#7A5AE0', '< 10⁻¹¹'], ['X-rays', '#5E7CE8', '10⁻¹⁰'], ['UV', '#4AA3E0', '10⁻⁸'], ['visible', null, '4–7 × 10⁻⁷'], ['IR', '#E0904A', '10⁻⁵'], ['micro-', '#D7604A', '10⁻²'], ['radio', '#B54242', '> 10⁻¹']];
    const w = 52; return svg(380, 110, bands.map(([n, c, l], i) => `<rect x="${10 + i * w}" y="20" width="${w - 2}" height="34" fill="${c || 'url(#vis2)'}"/>` + T(10 + i * w + w / 2 - 1, 42, n, { fs: 11, c: '#fff', b: 1 }) + T(10 + i * w + w / 2 - 1, 72, l, { fs: 10 })).join('') +
      `<defs><linearGradient id="vis2"><stop offset="0" stop-color="#7B2FF7"/><stop offset=".3" stop-color="#2F6FE0"/><stop offset=".55" stop-color="#2FBF3F"/><stop offset=".8" stop-color="#E2C21F"/><stop offset="1" stop-color="#E5332F"/></linearGradient></defs>` +
      T(190, 90, 'typical wavelength / m  →  increasing wavelength, decreasing frequency', { fs: 10, c: C.sub }) + L(20, 102, 360, 102, 's', 'e', { w: 1 }), 400); };
  F.wire = () => svg(320, 80, L(20, 12, 20, 68, 'k', '', { w: 3 }) + L(300, 12, 300, 68, 'k', '', { w: 3 }) + P(curve(20, 40, 280, 22, 560 / 3), 'v', { w: 2.2 }) + P(curve(20, 40, 280, -22, 560 / 3), 'v', { w: 2.2, d: '5 4' }) + T(160, 78, 'L = 3.00 m', { fs: 11 }), 340);

  const S = `
${sec('20-0', 'Waves: introduction', `
<p>A wave transfers <b>energy</b> from one place to another without transferring matter. The particles of the medium only vibrate about their equilibrium positions.</p>
${fig(F.kinds(), 'Figure 21.1: transverse and longitudinal waves.')}
${table(['Transverse wave', 'Longitudinal wave'], [['The particles vibrate <b>perpendicular</b> to the direction of propagation.', 'The particles vibrate <b>parallel</b> to the direction of propagation.'], ['crests and troughs', 'compressions and rarefactions'], ['e.g. waves on a string, water waves, electromagnetic waves', 'e.g. sound waves, waves along a slinky spring pushed back and forth']])}
`)}

${sec('20-1', '21.1 Progressive waves', `
${def('Progressive wave', `is ${red('a wave in which the wave profile moves through the medium, transferring energy from one point to another')}.`)}
${h4('Equation of a progressive wave')}
<p>If the particle at <i>x</i> = 0 moves in SHM, <i>y</i> = <i>A</i> sin ω<i>t</i>, the disturbance reaches a particle at distance <i>x</i> a time <i>x</i>/<i>v</i> later. So the particle at <i>x</i> does the same motion, but later:</p>
${steps([`<i>y</i> = <i>A</i> sin ω(<i>t</i> − ${fr('<i>x</i>', '<i>v</i>')}) = <i>A</i> sin (ω<i>t</i> − ${fr('ω', '<i>v</i>')}<i>x</i>)`, `With <i>k</i> = ${fr('ω', '<i>v</i>')} = ${fr('2π', 'λ')} (the wave number):`])}
${key(`<i>y</i> = <i>A</i> sin (ω<i>t</i> − <i>kx</i>) &nbsp; or &nbsp; <i>y</i> = <i>A</i> cos (ω<i>t</i> − <i>kx</i>)`, '(ω<i>t</i> − <i>kx</i>): wave travelling in the <b>+<i>x</i></b> direction. (ω<i>t</i> + <i>kx</i>): wave travelling in the <b>−<i>x</i></b> direction. <i>A</i> = amplitude, ω = 2π<i>f</i>, <i>k</i> = 2π/λ (rad m<sup>−1</sup>).')}
${table(['Quantity', 'Meaning'], [['Wavelength, λ (m)', 'the distance between two successive points that vibrate in phase (e.g. crest to crest)'], ['Period, <i>T</i> (s)', 'the time for one complete oscillation of a particle'], ['Frequency, <i>f</i> (Hz)', 'the number of oscillations per second; <i>f</i> = 1/<i>T</i>'], ['Wave number, <i>k</i> (rad m<sup>−1</sup>)', '<i>k</i> = 2π/λ'], ['Wave speed, <i>v</i> (m s<sup>−1</sup>)', 'the distance moved by the wave profile per second']])}
${h4('Displacement–distance and displacement–time graphs')}
${fig(F.yx(), 'Figure 21.2: the displacement–distance (y–x) graph is a snapshot of all the particles at one instant. The distance for one cycle is λ.')}
${fig(F.yt(), 'Figure 21.3: the displacement–time (y–t) graph follows one particle. The time for one cycle is T.')}
${tip(`Read the axis first. On a <i>y</i>–<i>x</i> graph, one cycle is the wavelength λ. On a <i>y</i>–<i>t</i> graph, one cycle is the period <i>T</i>. Many students mix these up.`)}
${h4('Phase difference')}
${fig(F.phase(), 'Figure 21.4: two points P and Q a distance Δx apart on the same wave.')}
${steps([`At P (<i>x</i><sub>1</sub>): phase = ω<i>t</i> − <i>kx</i><sub>1</sub>; &nbsp; at Q (<i>x</i><sub>2</sub>): phase = ω<i>t</i> − <i>kx</i><sub>2</sub>`, `phase difference φ = <i>k</i>(<i>x</i><sub>2</sub> − <i>x</i><sub>1</sub>) = <i>k</i>Δ<i>x</i>`])}
${key(`φ = <i>kx</i> = ${kx}`, 'the phase difference between two points a distance <i>x</i> apart. Points λ apart are in phase (φ = 2π); points λ/2 apart are in antiphase (φ = π).')}
${h4('Wave speed')}
${steps([`In one period <i>T</i>, the wave profile moves forward one wavelength λ.`, `<i>v</i> = ${fr('λ', '<i>T</i>')} = <i>f</i>λ &nbsp; (also <i>v</i> = ${fr('ω', '<i>k</i>')})`])}
${key(`<i>v</i> = <i>f</i>λ`)}
${note(`The <b>wave speed</b> <i>v</i> = <i>f</i>λ is constant in a given medium. The <b>particle velocity</b> ∂<i>y</i>/∂<i>t</i> = <i>A</i>ω cos (ω<i>t</i> − <i>kx</i>) changes all the time, with maximum <i>A</i>ω. Do not mix them up.`)}
${sim('wave', 'Progressive wave', 'Change the amplitude, wavelength, frequency and direction. Follow the marked particle: it only moves up and down (or back and forth for a longitudinal wave) while the wave profile moves along. The two orange points show the phase difference.')}
${example('21.1.1', `A progressive wave is represented by <i>y</i> = 0.05 sin (8π<i>t</i> − 0.4π<i>x</i>), where <i>x</i> and <i>y</i> are in metres and <i>t</i> in seconds. Find (a) the amplitude, (b) the frequency, (c) the wavelength, (d) the wave speed and its direction, (e) the maximum speed of a particle.`,
  steps([`Compare with <i>y</i> = <i>A</i> sin (ω<i>t</i> − <i>kx</i>).`, `(a) <i>A</i> = <b>0.05 m</b> &nbsp; (b) ω = 8π ⇒ <i>f</i> = <b>4 Hz</b>`, `(c) <i>k</i> = 0.4π = 2π/λ ⇒ λ = <b>5 m</b>`, `(d) <i>v</i> = <i>f</i>λ = <b>20 ${ms}</b>, in the <b>+<i>x</i></b> direction (minus sign)`, `(e) <i>v</i><sub>max</sub> = <i>A</i>ω = 0.05 × 8π = <b>1.26 ${ms}</b>`]))}
${example('21.1.2', `A wave of frequency 500 Hz travels at 350 ${ms}. (a) What is the distance between two points that are π/3 rad out of phase? (b) What is the phase difference between two displacements at one point 1.0 ms apart?`,
  steps([`λ = <i>v</i>/<i>f</i> = 350/500 = 0.70 m`, `(a) φ = 2π<i>x</i>/λ ⇒ <i>x</i> = (π/3)(0.70)/(2π) = <b>0.117 m</b>`, `(b) φ = ω<i>t</i> = 2π(500)(1.0 × 10<sup>−3</sup>) = <b>π rad</b>`]))}
`)}

${sec('20-2', '21.2 Wave intensity', `
${def('Intensity of a wave', `is ${red('the rate of energy transferred (power) per unit area perpendicular to the direction of propagation')}.`)}
${key(`<i>I</i> = ${fr('<i>P</i>', '<i>A</i>')}`, 'unit: W m<sup>−2</sup>')}
${h4('Intensity and amplitude')}
<p>The energy of a particle in SHM is ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup>, so for waves of the same frequency the energy carried is proportional to the square of the amplitude:</p>
${key(`<i>I</i> ∝ <i>A</i><sup>2</sup>`, 'doubling the amplitude makes the intensity four times larger')}
${h4('Intensity from a point source')}
${fig(F.point(), 'Figure 21.5: a point source radiates power P equally in all directions.')}
${ul([`The energy spreads out over the surface of a sphere of area 4π<i>r</i><sup>2</sup>, so <i>I</i> = ${fr('<i>P</i>', '4π<i>r</i><sup>2</sup>')}.`, `The intensity therefore decreases with distance: <i>I</i> ∝ ${fr('1', '<i>r</i><sup>2</sup>')} (the inverse square law).`, `Since <i>I</i> ∝ <i>A</i><sup>2</sup>, the amplitude decreases as <i>A</i> ∝ ${fr('1', '<i>r</i>')}.`])}
${example('21.2.1', `A point source emits sound of power 2.0 W uniformly in all directions. Find (a) the intensity 5.0 m from the source, (b) the ratio of the amplitudes at 5.0 m and at 10.0 m.`,
  steps([`(a) <i>I</i> = ${fr('<i>P</i>', '4π<i>r</i><sup>2</sup>')} = ${fr('2.0', '4π(5.0)<sup>2</sup>')} = <b>6.4 × 10<sup>−3</sup> W m<sup>−2</sup></b>`, `(b) <i>A</i> ∝ 1/<i>r</i> ⇒ <i>A</i><sub>5</sub> : <i>A</i><sub>10</sub> = 10 : 5 = <b>2 : 1</b>`]))}
${example('21.2.2', `The amplitude of a wave is reduced to 60% of its original value. What percentage of the original intensity remains?`,
  steps([`<i>I</i> ∝ <i>A</i><sup>2</sup> ⇒ <i>I</i>′/<i>I</i> = (0.60)<sup>2</sup> = 0.36, i.e. <b>36%</b>`]))}
`)}

${sec('20-3', '21.3 Principle of superposition', `
${def('Principle of superposition', `states that ${red('when two or more waves meet at a point, the resultant displacement at that point is the vector sum of the displacements due to each individual wave')}.`)}
${key(`<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub>`)}
${fig(F.superpose(), 'Figure 21.6: two pulses meeting. (a) Displacements in the same direction add. (b) Displacements in opposite directions partly cancel. After meeting, each pulse continues unchanged.')}
${ul([`The waves <b>interfere</b> with each other only while they overlap.`, `<b>Constructive interference</b>: the displacements are in the same direction, giving a larger resultant.`, `<b>Destructive interference</b>: the displacements are in opposite directions, giving a smaller resultant (zero if they are equal and opposite).`])}
${sim('pulses', 'Superposition of two pulses', 'Send two pulses towards each other, on the same side or on opposite sides. Pause while they overlap: the resultant (green) is the sum of the two displacements at every point. After they pass, each pulse is unchanged.')}
${example('21.3.1', `Two waves <i>y</i><sub>1</sub> = 3 sin (ω<i>t</i> − <i>kx</i>) cm and <i>y</i><sub>2</sub> = 4 sin (ω<i>t</i> − <i>kx</i> + π) cm travel along the same string. Find the amplitude of the resultant wave.`,
  steps([`sin (θ + π) = −sin θ, so <i>y</i><sub>2</sub> = −4 sin (ω<i>t</i> − <i>kx</i>)`, `<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub> = −1 sin (ω<i>t</i> − <i>kx</i>) ⇒ amplitude <b>1 cm</b> (destructive interference)`]))}
${h4('A real use: noise-cancelling headphones')}
${ul([`A small microphone on the outside of each ear cup picks up the noise around you (an aeroplane engine, a bus, an air-conditioner).`, `The electronics produce an "anti-noise" wave with the <b>same amplitude</b> but <b>opposite phase</b> (a phase difference of π), and the speaker plays it into your ear.`, `At your ear the two waves superpose: <i>y</i> = <i>y</i><sub>noise</sub> + <i>y</i><sub>anti</sub> ≈ 0. This is <b>destructive interference</b>.`, `It works best for steady, low-frequency sounds. For high frequencies even a tiny delay in the electronics is a large fraction of a period, so the anti-noise is no longer in antiphase.`])}
${sim('anc', 'Noise-cancelling headphones', 'Switch the noise cancelling on and off and compare the sound reaching the ear (green). Then add a delay in the electronics or change the noise frequency: the cancellation gets worse once the phase difference moves away from π. Switch on the sound to hear it (use earphones for the low hum).')}
`)}

${sec('20-4', '21.4 Standing waves', `
${def('Standing (stationary) wave', `is formed by ${red('the superposition of two progressive waves of the same amplitude and frequency, travelling at the same speed in opposite directions')}.`)}
${h4('Formation by reflection')}
<p>A wave travelling along a string is reflected at the end. The incident and reflected waves travel in opposite directions and superpose to form a standing wave.</p>
${fig(F.reflect(), 'Figure 21.7: a pulse is inverted when it is reflected at a fixed end, and is not inverted at a free end.')}
${ul([`At some points the two waves are always equal and opposite, so they always cancel: these points do not move. They are <b>nodes</b> (N).`, `Midway between the nodes, the two waves always add, giving the largest oscillation. These points are <b>antinodes</b> (A).`])}
${fig(F.standing(), 'Figure 21.8: a standing wave. The profile does not move along; each point oscillates with its own amplitude.')}
${h4('The standing wave equation')}
${steps([`<i>y</i><sub>1</sub> = <i>a</i> sin (ω<i>t</i> − ${kx}) &nbsp; (to the right), &nbsp; <i>y</i><sub>2</sub> = <i>a</i> sin (ω<i>t</i> + ${kx}) &nbsp; (to the left)`, `<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub>, using sin <i>P</i> + sin <i>Q</i> = 2 sin ${fr('<i>P</i> + <i>Q</i>', '2')} cos ${fr('<i>P</i> − <i>Q</i>', '2')}`, `<i>y</i> = 2<i>a</i> sin ω<i>t</i> cos (−${kx}) = 2<i>a</i> cos ${kx} sin ω<i>t</i>`])}
${key(`<i>y</i> = 2<i>a</i> cos ${kx} sin ω<i>t</i> = (2<i>a</i> cos <i>kx</i>) sin ω<i>t</i>`, 'every point oscillates in SHM (sin ω<i>t</i>) with an amplitude <i>A</i> = 2<i>a</i> cos <i>kx</i> that depends on its position <i>x</i>')}
${note(`Other books write <i>y</i> = 2<i>A</i> sin <i>kx</i> cos ω<i>t</i>. It is the same standing wave with the origin at a node instead of an antinode.`)}
${two(`<p><b>Nodes</b>: amplitude = 0</p>${steps([`cos ${kx} = 0 ⇒ ${kx} = ${fr('π', '2')}, ${fr('3π', '2')}, ${fr('5π', '2')}, …`, `<i>x</i> = ${fr('λ', '4')}, ${fr('3λ', '4')}, ${fr('5λ', '4')}, … = ${fr('<i>n</i>λ', '4')}, <i>n</i> = 1, 3, 5, …`, `distance between successive nodes = ${fr('3λ', '4')} − ${fr('λ', '4')} = <b>${fr('λ', '2')}</b>`])}`,
`<p><b>Antinodes</b>: amplitude = 2<i>a</i> (maximum)</p>${steps([`cos ${kx} = ±1 ⇒ ${kx} = 0, π, 2π, …`, `<i>x</i> = 0, ${fr('λ', '2')}, λ, … = ${fr('<i>n</i>λ', '4')}, <i>n</i> = 0, 2, 4, …`, `distance between successive antinodes = <b>${fr('λ', '2')}</b>; node to next antinode = <b>${fr('λ', '4')}</b>`])}`)}
${sim('standing', 'Forming a standing wave', 'Two identical waves travel in opposite directions (blue and orange). Their sum (green) is a standing wave: the nodes never move and the antinodes have the largest amplitude. Switch to the string to see the harmonics of a string fixed at both ends.')}
${h4('Standing waves on a stretched string')}
${fig(F.harm(), 'Figure 21.9: a string fixed at both ends has a node at each end. Only waves that fit a whole number of half-wavelengths can form.')}
${ul([`The lowest frequency (the <b>fundamental frequency</b> or <b>first harmonic</b>): <i>L</i> = λ/2, so λ = 2<i>L</i> and <i>f</i><sub>1</sub> = <i>v</i>/2<i>L</i>.`, `Next: <i>L</i> = λ, the second harmonic (first overtone), <i>f</i><sub>2</sub> = 2<i>f</i><sub>1</sub>.`, `In general <i>L</i> = <i>n</i>λ/2 and <i>f<sub>n</sub></i> = <i>nv</i>/2<i>L</i>. More about strings and pipes in Chapter 22 Sound waves.`])}
${h4('Standing waves and progressive waves')}
${table(['Standing wave', 'Progressive wave'], [['The wave profile does not move; energy is not transferred from one particle to the next.', 'The wave profile moves in the direction of propagation and energy is transferred.'], ['There are points (nodes) that are not displaced at all.', 'No nodes.'], ['Midway between two successive nodes is an antinode, where the amplitude is maximum.', 'No antinodes.'], ['Points between a node and an antinode have different amplitudes of oscillation.', 'All points have the same amplitude of oscillation.'], ['Points between two successive nodes oscillate in phase, with the same frequency.', 'Neighbouring points are not in phase, but have the same frequency.']])}
${example('21.4.1', `A standing wave is represented by <i>y</i> = 2 cos 4<i>x</i> sin 6<i>t</i> (SI units). Calculate (a) the frequency, (b) the wavelength, (c) the distance between successive nodes, (d) the amplitude at <i>x</i> = 0.50 m.`,
  steps([`Compare with <i>y</i> = 2<i>a</i> cos ${kx} sin ω<i>t</i>.`, `(a) ω = 6 = 2π<i>f</i> ⇒ <i>f</i> = <b>0.955 Hz</b>`, `(b) ${fr('2π', 'λ')} = 4 ⇒ λ = <b>1.57 m</b>`, `(c) ${fr('λ', '2')} = ${fr('1.57', '2')} = <b>0.785 m</b>`, `(d) <i>A</i> = 2 cos 4(0.50) = 2 cos 2.0 = −0.832; amplitude = <b>0.832 m</b> (calculator in radians; the amplitude is the magnitude)`]))}
${example('21.4.2', `A standing-wave pattern is observed in a thin wire of length 3.00 m. The equation of the wave is <i>y</i> = (0.002 m) sin (π<i>x</i>) cos (100π<i>t</i>), with <i>x</i> in metres and <i>t</i> in seconds. (a) How many loops does the pattern have? (b) What is the frequency? (c) What is the distance between adjacent nodes?`,
  steps([`Compare with <i>y</i> = 2<i>A</i> sin <i>kx</i> cos ω<i>t</i>.`, `<i>k</i> = 2π/λ = π ⇒ λ = 2.00 m; each loop is λ/2 = 1.00 m long`, `(a) number of loops = 3.00/1.00 = <b>3</b>`, `(b) ω = 2π<i>f</i> = 100π ⇒ <i>f</i> = <b>50.0 Hz</b>`, `(c) λ/2 = <b>1.00 m</b>`]), fig(F.wire()))}
${example('21.4.3', `The speed of waves in a guitar string is 425 ${ms}. Find the fundamental frequency (first harmonic) of the string if its length is 76.5 cm.`,
  steps([`λ = 2<i>L</i> = 2(0.765) = 1.53 m`, `<i>f</i> = <i>v</i>/λ = 425/1.53 = <b>278 Hz</b>`]))}
${example('21.4.4', `Find the length of guitar string needed to produce a fundamental frequency of 256 Hz, if the speed of waves in the string is 405 ${ms}.`,
  steps([`λ = <i>v</i>/<i>f</i> = 405/256 = 1.58 m`, `<i>L</i> = λ/2 = <b>0.791 m</b>`]))}
`)}

${sec('20-5', '21.5 Electromagnetic waves', `
<p>An electromagnetic (EM) wave is made up of an <b>electric field</b> and a <b>magnetic field</b> that vibrate perpendicular to each other and to the direction of propagation, in phase.</p>
${fig(F.em(), 'Figure 21.10: an electromagnetic wave travelling in the +x direction.')}
${key(`<i>E</i> = <i>E</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>) &nbsp;&nbsp; <i>B</i> = <i>B</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>)`, '<i>E</i><sub>0</sub>, <i>B</i><sub>0</sub> = amplitudes of the electric and magnetic fields; both have the same ω and <i>k</i>, so they are in phase')}
${sim('emwave', 'Electromagnetic wave', 'The electric field (red) and the magnetic field (violet) vibrate at right angles to each other and to the direction of travel, and reach their maxima together.')}
${h4('Characteristics of electromagnetic waves')}
${ul([`They are transverse waves.`, `They do not need a medium: they can travel through a vacuum.`, `They all travel at the same speed in a vacuum, <i>c</i> = 3.00 × 10<sup>8</sup> ${ms}.`, `They carry no charge, so they are not deflected by electric or magnetic fields.`, `They show reflection, refraction, interference, diffraction and polarisation.`, `They obey <i>c</i> = <i>f</i>λ.`])}
${h4('Electromagnetic waves and mechanical waves')}
${table(['Electromagnetic waves', 'Mechanical waves'], [['vibrations of electric and magnetic fields', 'vibrations of the particles of a medium'], ['do not need a medium; can travel in a vacuum', 'need a medium; cannot travel in a vacuum'], ['always transverse', 'transverse or longitudinal'], ['speed in a vacuum = 3.00 × 10<sup>8</sup> m s<sup>−1</sup>', 'much slower (e.g. sound in air ≈ 340 m s<sup>−1</sup>)'], ['e.g. light, radio waves, X-rays', 'e.g. sound, water waves, waves on a string']])}
${h4('The speed of light')}
${key(`<i>c</i> = ${fr('1', sq('μ<sub>0</sub>ε<sub>0</sub>'))}`, 'μ<sub>0</sub> = 4π × 10<sup>−7</sup> H m<sup>−1</sup> (permeability of free space); ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> F m<sup>−1</sup> (permittivity of free space)')}
<p><b>Significance</b>: the speed of EM waves can be calculated from two constants of electricity and magnetism: 1/√(4π × 10<sup>−7</sup> × 8.85 × 10<sup>−12</sup>) = 3.00 × 10<sup>8</sup> ${ms}, which is the measured speed of light. This showed that <b>light is an electromagnetic wave</b>.</p>
${h4('The electromagnetic spectrum')}
${fig(F.spec(), 'Figure 21.11: the electromagnetic spectrum.')}
${table(['Radiation', 'Typical wavelength / m', 'Typical frequency / Hz'], [['γ-rays', '< 10<sup>−11</sup>', '> 10<sup>19</sup>'], ['X-rays', '10<sup>−11</sup> – 10<sup>−8</sup>', '10<sup>16</sup> – 10<sup>19</sup>'], ['ultraviolet', '10<sup>−8</sup> – 4 × 10<sup>−7</sup>', '10<sup>15</sup> – 10<sup>16</sup>'], ['visible light', '4 × 10<sup>−7</sup> – 7 × 10<sup>−7</sup>', '≈ 10<sup>14</sup> – 10<sup>15</sup>'], ['infrared', '7 × 10<sup>−7</sup> – 10<sup>−3</sup>', '10<sup>11</sup> – 10<sup>14</sup>'], ['microwaves', '10<sup>−3</sup> – 10<sup>−1</sup>', '10<sup>9</sup> – 10<sup>11</sup>'], ['radio waves', '> 10<sup>−1</sup>', '< 10<sup>9</sup>']])}
${tip(`For the exam, remember the <b>order</b> of the spectrum and the order of magnitude of each region. The boundaries are not sharp, so books give slightly different values.`)}
${example('21.5.1', `The electric field of an EM wave in a vacuum is <i>E</i> = 150 sin (6.0 × 10<sup>15</sup><i>t</i> − <i>kx</i>) V m<sup>−1</sup>. Find (a) the frequency, (b) the wavelength, (c) the region of the spectrum.`,
  steps([`(a) <i>f</i> = ω/2π = 6.0 × 10<sup>15</sup>/2π = <b>9.5 × 10<sup>14</sup> Hz</b>`, `(b) λ = <i>c</i>/<i>f</i> = 3.00 × 10<sup>8</sup>/9.5 × 10<sup>14</sup> = <b>3.1 × 10<sup>−7</sup> m</b>`, `(c) <b>ultraviolet</b>`]))}
`)}

${sec('20-6', 'Summary and exercises', `
${table(['Subtopic', 'Key results'], [['21.1', '<i>y</i> = <i>A</i> sin (ω<i>t</i> ± <i>kx</i>); <i>k</i> = 2π/λ; φ = 2π<i>x</i>/λ; <i>v</i> = <i>f</i>λ'], ['21.2', '<i>I</i> = <i>P</i>/<i>A</i>; <i>I</i> ∝ <i>A</i><sup>2</sup>; point source <i>I</i> = <i>P</i>/4π<i>r</i><sup>2</sup>'], ['21.3', '<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub>'], ['21.4', '<i>y</i> = 2<i>a</i> cos <i>kx</i> sin ω<i>t</i>; node to node = λ/2; node to antinode = λ/4'], ['21.5', '<i>E</i> = <i>E</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>), <i>B</i> = <i>B</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>); <i>c</i> = 1/√(μ<sub>0</sub>ε<sub>0</sub>)']])}
${exercises('Exercises', [
  { q: `A wave on a string is described by <i>y</i> = 0.02 sin (30<i>t</i> + 4<i>x</i>) (SI units). Find the wavelength, the frequency, and the speed and direction of the wave.`, a: `λ = 1.57 m, <i>f</i> = 4.77 Hz, <i>v</i> = 7.5 ${ms} in the −<i>x</i> direction` },
  { q: `Two points on a progressive wave of wavelength 1.2 m are 0.30 m apart. What is the phase difference between them?`, a: `π/2 rad` },
  { q: `The intensity of a wave 2.0 m from a point source is 0.80 W m<sup>−2</sup>. What is the intensity 8.0 m from the source?`, a: `0.050 W m<sup>−2</sup>` },
  { q: `A standing wave on a string has nodes 0.25 m apart. The wave speed is 100 ${ms}. Find the frequency.`, a: `λ = 0.50 m, <i>f</i> = 200 Hz` },
  { q: `State two differences between an electromagnetic wave and a sound wave.`, a: `e.g. EM waves can travel through a vacuum but sound needs a medium; EM waves are transverse but sound is longitudinal; EM waves travel at 3.00 × 10<sup>8</sup> ${ms} in a vacuum, much faster than sound.` }])}
`)}

${sec('20-rw', 'Real-World Physics: Japan’s tsunami sea wall', rw({
  id: 'ls-20-rw-tsunami',
  meta: 'Tōhoku coast, Japan · built after 11 March 2011',
  title: 'Why does a tsunami grow taller as it reaches the shore?',
  lead: `<p>On 11 March 2011 a magnitude 9 earthquake off north-east Japan sent a tsunami onto the Tōhoku coast. The old sea walls were designed for waves of about 8 m, but the waves reached 12–15 m, poured over the walls and destroyed many of them. About 20 000 people died.</p><p>Japan then built nearly <b>400 km</b> of new concrete sea walls along the coast, up to <b>14.7 m</b> high, with deep foundations and wider bases so they do not collapse if a wave goes over the top.</p>`,
  video: { id: 'tJ6G2lTo6xA', title: 'Japan’s giant tsunami sea wall', channel: 'YouTube documentary' },
  watch: 'compare the height of the tsunami in the open ocean with its height when it reaches the coast.',
  physics: ul([`A tsunami is a <b>progressive wave</b> with a very long wavelength (hundreds of kilometres). Its speed depends on the depth of the water: <i>v</i> = √(<i>gd</i>) (given).`, `In the deep ocean it travels at about 700–900 km h<sup>−1</sup> but is often less than 1 m high. Near the coast the water becomes shallow, so the wave <b>slows down</b>.`, `The <b>frequency stays the same</b> (it is set by the source), so from <i>v</i> = <i>f</i>λ the <b>wavelength becomes shorter</b>. The same energy is squeezed into a shorter, slower wave, so the <b>amplitude grows</b>. Since <i>I</i> ∝ <i>A</i><sup>2</sup>, the wave arriving at the wall is extremely powerful.`]),
  qs: [
    { q: `The speed of a tsunami is given by <i>v</i> = √(<i>gd</i>), where <i>d</i> is the depth of the water. What is its speed in the open ocean where <i>d</i> = 4000 m?`, opts: ['63 m s<sup>−1</sup>', '198 m s<sup>−1</sup>', '3.9 × 10<sup>4</sup> m s<sup>−1</sup>', '713 m s<sup>−1</sup>'], ans: 1,
      why: steps([`<i>v</i> = √(<i>gd</i>) = √(9.81 × 4000)`, `= <b>198 m s<sup>−1</sup></b> (about 713 km h<sup>−1</sup>, as fast as a jet aircraft)`]) },
    { q: `The tsunami in Quick check 1 has a period of 20 minutes. What is its wavelength in the open ocean?`, opts: ['9.9 m', '2.4 × 10<sup>3</sup> m', '2.4 × 10<sup>5</sup> m', '1.4 × 10<sup>7</sup> m'], ans: 2,
      why: steps([`<i>T</i> = 20 × 60 = 1200 s`, `λ = <i>vT</i> = (198)(1200)`, `= <b>2.4 × 10<sup>5</sup> m</b> (about 240 km)`]) },
    { q: `As a tsunami moves from deep water into shallow water near the coast, which statement is correct?`, opts: ['Its frequency decreases and its wavelength stays the same.', 'Its speed increases and its wavelength increases.', 'Its frequency stays the same, its speed decreases and its wavelength decreases.', 'Its speed stays the same and its amplitude decreases.'], ans: 2,
      why: `<p>The frequency is fixed by the source. The speed falls in shallow water, so λ = <i>v</i>/<i>f</i> falls. The energy is concentrated into a shorter wave, so the amplitude increases.</p>` },
    { q: `Near the coast, the amplitude of a tsunami increases from 1.0 m to 4.0 m. Assuming intensity ∝ (amplitude)<sup>2</sup>, by what factor does the intensity increase?`, opts: ['2', '4', '8', '16'], ans: 3,
      why: steps([`${fr('<i>I</i><sub>2</sub>', '<i>I</i><sub>1</sub>')} = (${fr('<i>A</i><sub>2</sub>', '<i>A</i><sub>1</sub>')})<sup>2</sup> = (${fr('4.0', '1.0')})<sup>2</sup>`, `= <b>16</b>`]) }
  ],
  src: `Sources: The B1M; NOAA U.S. Tsunami Warning System. The depth and period in the calculations are typical values for practice. Preview the clip before class. <a href="https://www.youtube.com/watch?v=tJ6G2lTo6xA" target="_blank" rel="noopener">youtube.com/watch?v=tJ6G2lTo6xA</a>`
}))}
`;
  window.PhysiQLessons.register('LESSON-S3-21', { html: () => S });

  // ===================== simulations =====================
  const TAU = 2 * Math.PI;
  // ---------- 1. progressive wave ----------
  window.PhysiQSims.add('wave', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { A: 0.5, lam: 2, f: 0.5, dir: 1, lon: false, t: 0, play: true, dx: 0.5 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'amplitude <i>A</i>', 0.1, 0.8, 0.05, S.A, 'm', v => { S.A = v; });
    slider(ctl, 'wavelength λ', 1, 4, 0.1, S.lam, 'm', v => { S.lam = v; });
    slider(ctl, 'frequency <i>f</i>', 0.2, 1.5, 0.05, S.f, 'Hz', v => { S.f = v; });
    slider(ctl, 'P to Q distance', 0.1, 4, 0.05, S.dx, 'm', v => { S.dx = v; });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const d1 = button(pre, 'moving to +x', 'sm-chip on', () => { S.dir = 1; d1.classList.add('on'); d2.classList.remove('on'); });
    const d2 = button(pre, 'moving to −x', 'sm-chip', () => { S.dir = -1; d2.classList.add('on'); d1.classList.remove('on'); });
    const k1 = button(pre, 'transverse', 'sm-chip on', () => { S.lon = false; k1.classList.add('on'); k2.classList.remove('on'); });
    const k2 = button(pre, 'longitudinal', 'sm-chip', () => { S.lon = true; k2.classList.add('on'); k1.classList.remove('on'); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    const ro = readouts(root), xP = 1.5;
    function draw() {
      const nw = (root.clientWidth || 600) < 560, ctx = cv.ctx, { w, h } = cv.size(nw ? 0.95 : 0.5, 300, 440); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const XL = nw ? 6 : 10, k = TAU / S.lam, ls = Math.min(0.25, 0.7 / (k * S.A)), om = TAU * S.f, y = x => S.A * Math.sin(om * S.t - S.dir * k * x), x0 = 20, sx = (w - 40) / XL, my = h * 0.42, sy = Math.min(h * 0.3, 110) / 0.8;
      ctx.strokeStyle = COL.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, my); ctx.lineTo(x0 + XL * sx, my); ctx.stroke();
      if (!S.lon) {
        ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const x = XL * i / 300; i ? ctx.lineTo(x0 + x * sx, my - y(x) * sy) : ctx.moveTo(x0 + x * sx, my - y(x) * sy); } ctx.stroke();
        for (let i = 0; i <= 40; i++) { const x = XL * i / 40; ctx.beginPath(); ctx.arc(x0 + x * sx, my - y(x) * sy, 2.6, 0, 7); ctx.fillStyle = COL.ball; ctx.fill(); }
      } else {
        for (let i = 0; i <= 80; i++) { const x = XL * i / 80, X = x0 + (x + y(x) * ls) * sx; ctx.strokeStyle = COL.v; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(X, my - 50); ctx.lineTo(X, my + 50); ctx.stroke(); }
      }
      const mark = (x, c, lab) => { const X = S.lon ? x0 + (x + y(x) * ls) * sx : x0 + x * sx, Y = S.lon ? my : my - y(x) * sy; ctx.beginPath(); ctx.arc(X, Y, 7, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.stroke(); text(ctx, lab, X, Y - 12, { a: 'center', b: 1, fs: 12 }); };
      mark(xP, COL.o, 'P'); if (xP + S.dx <= XL) mark(xP + S.dx, COL.o, 'Q');
      // wave direction arrow
      text(ctx, S.dir > 0 ? 'wave →' : '← wave', S.dir > 0 ? w - 20 : 20, 20, { a: S.dir > 0 ? 'right' : 'left', b: 1, c: COL.o, fs: 13 });
      // λ marker (transverse)
      if (!S.lon) { const yb = Math.max(34, my - 0.8 * sy - 6); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 0.2 * sx, yb); ctx.lineTo(x0 + (0.2 + S.lam) * sx, yb); ctx.stroke(); text(ctx, 'λ', x0 + (0.2 + S.lam / 2) * sx, yb - 4, { a: 'center', it: 1, b: 1 }); }
      // y–t of P
      const box = { x: 40, y: h - 70, w: w - 60, h: 56 }; ctx.fillStyle = '#fff'; ctx.fillRect(box.x, box.y, box.w, box.h); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(box.x, box.y + box.h / 2); ctx.lineTo(box.x + box.w, box.y + box.h / 2); ctx.stroke();
      ctx.strokeStyle = COL.gr; ctx.lineWidth = 2; ctx.beginPath(); const span = 3 / S.f; for (let i = 0; i <= 200; i++) { const tt = S.t - span + span * i / 200, yy = S.A * Math.sin(om * tt - S.dir * k * xP); const X = box.x + box.w * i / 200, Y = box.y + box.h / 2 - yy / 0.8 * (box.h / 2 - 3); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      text(ctx, 'y of P against t (last 3 periods)', box.x + 4, box.y + 12, { fs: 11, c: COL.gr, b: 1 });
      let phi = (k * S.dx) % TAU; const ph = phi / Math.PI;
      ro([['v = fλ', fmt(S.f * S.lam, 2) + ' m/s', 'hl'], ['k = 2π/λ', fmt(k, 2) + ' rad/m'], ['ω = 2πf', fmt(om, 2) + ' rad/s'], ['T = 1/f', fmt(1 / S.f, 2) + ' s'], ['phase difference P–Q (2πΔx/λ)', fmt(k * S.dx, 2) + ' rad = ' + fmt(S.dx / S.lam, 2) + ' cycle', 'hl'], ['P and Q', Math.abs(ph - Math.round(ph)) < 0.03 ? (Math.round(ph) % 2 ? 'in antiphase' : 'in phase') : 'out of phase']]);
    }
    loop(cv, dt => { if (S.play) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. two pulses ----------
  window.PhysiQSims.add('pulses', function (root) {
    const { COL, el, button, canvas, text, loop } = window.PhysiQSims.U;
    const S = { s: 1, t: 0, play: true };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const c1 = button(pre, 'same side (constructive)', 'sm-chip on', () => { S.s = 1; c1.classList.add('on'); c2.classList.remove('on'); S.t = 0; });
    const c2 = button(pre, 'opposite sides (destructive)', 'sm-chip', () => { S.s = -1; c2.classList.add('on'); c1.classList.remove('on'); S.t = 0; });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    button(bar, '↺ Restart', '', () => { S.t = 0; });
    const g = (x, c, wd) => Math.exp(-((x - c) ** 2) / (wd * wd));
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.4, 240, 330); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const my = h * 0.6, sc = h * 0.22, D = 10, c1p = 2 + S.t * 1.2, c2p = 8 - S.t * 1.2, X = x => 16 + x / D * (w - 32);
      const y1 = x => g(x, c1p, 0.6), y2 = x => S.s * 0.7 * g(x, c2p, 0.6);
      ctx.strokeStyle = COL.grid; ctx.beginPath(); ctx.moveTo(16, my); ctx.lineTo(w - 16, my); ctx.stroke();
      const plot = (f, c, wd, dash) => { ctx.strokeStyle = c; ctx.lineWidth = wd; ctx.setLineDash(dash || []); ctx.beginPath(); for (let i = 0; i <= 300; i++) { const x = D * i / 300; i ? ctx.lineTo(X(x), my - f(x) * sc) : ctx.moveTo(X(x), my - f(x) * sc); } ctx.stroke(); ctx.setLineDash([]); };
      plot(y1, COL.v, 1.6, [5, 4]); plot(y2, COL.o, 1.6, [5, 4]); plot(x => y1(x) + y2(x), COL.gr, 3);
      text(ctx, 'y₁', X(c1p), my - sc - 8, { a: 'center', b: 1, c: COL.v }); text(ctx, 'y₂', X(c2p), my - S.s * 0.7 * sc - (S.s > 0 ? 8 : -18), { a: 'center', b: 1, c: COL.o });
      text(ctx, 'resultant y = y₁ + y₂', w - 16, 18, { a: 'right', b: 1, c: COL.gr, fs: 12 });
      if (Math.abs(c1p - c2p) < 1.2) text(ctx, S.s > 0 ? 'overlapping: displacements add' : 'overlapping: displacements partly cancel', 16, 18, { b: 1, fs: 12, c: COL.r });
    }
    loop(cv, dt => { if (S.play) { S.t += dt; if (S.t > 6.5) S.t = 0; } draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. standing waves ----------
  window.PhysiQSims.add('standing', function (root) {
    const { COL, fmt, el, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { mode: 'two', n: 1, t: 0, play: true, comp: true };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const m1 = button(pre, 'two travelling waves', 'sm-chip on', () => { S.mode = 'two'; m1.classList.add('on'); m2.classList.remove('on'); hb.style.display = 'none'; });
    const m2 = button(pre, 'string fixed at both ends', 'sm-chip', () => { S.mode = 'str'; m2.classList.add('on'); m1.classList.remove('on'); hb.style.display = ''; });
    const hb = el('div', 'sm-row sm-pre'); root.appendChild(hb); hb.style.display = 'none'; hb.appendChild(el('span', 'sm-sl-l', 'harmonic'));
    const hs = [1, 2, 3, 4, 5].map(n => { const b = button(hb, 'n = ' + n, 'sm-chip' + (n === 1 ? ' on' : ''), () => { S.n = n; hs.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    const cb = button(bar, 'Hide the two waves', '', () => { S.comp = !S.comp; cb.textContent = S.comp ? 'Hide the two waves' : 'Show the two waves'; });
    const ro = readouts(root), Lm = 1.2, v = 120;
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 24, x1 = w - 24, my = h / 2, sc = h * 0.17, str = S.mode === 'str';
      const lamPx = str ? 2 * (x1 - x0) / S.n : (x1 - x0) / 1.75, k = TAU / lamPx, om = 1.6;
      // origin at a node for the string: y = 2a sin kx cos wt ; for 'two', y1 = a sin(wt - kx), y2 = a sin(wt + kx)
      const y1 = X => 0.5 * Math.sin(om * S.t - k * (X - x0)), y2 = X => (str ? -1 : 1) * 0.5 * Math.sin(om * S.t + k * (X - x0));
      ctx.strokeStyle = COL.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, my); ctx.lineTo(x1, my); ctx.stroke();
      // envelope
      ctx.setLineDash([3, 4]); ctx.strokeStyle = '#B9BFAE'; [1, -1].forEach(s => { ctx.beginPath(); for (let X = x0; X <= x1; X += 2) { const e = s * Math.abs(str ? Math.sin(k * (X - x0)) : Math.cos(k * (X - x0))); X === x0 ? ctx.moveTo(X, my - e * sc) : ctx.lineTo(X, my - e * sc); } ctx.stroke(); }); ctx.setLineDash([]);
      const plot = (f, c, wd) => { ctx.strokeStyle = c; ctx.lineWidth = wd; ctx.beginPath(); for (let X = x0; X <= x1; X += 2) { X === x0 ? ctx.moveTo(X, my - f(X) * sc) : ctx.lineTo(X, my - f(X) * sc); } ctx.stroke(); };
      if (S.comp) { plot(y1, 'rgba(106,99,236,.55)', 1.6); plot(y2, 'rgba(242,102,27,.55)', 1.6); }
      plot(X => y1(X) + y2(X), COL.gr, 3);
      // nodes and antinodes
      for (let X = x0, i = 0; X <= x1 + 1; i++) { const node = str ? i % 2 === 0 : i % 2 === 1; const XX = x0 + i * lamPx / 4; if (XX > x1 + 1) break; if (node) { ctx.beginPath(); ctx.arc(XX, my, 4.5, 0, 7); ctx.fillStyle = COL.r; ctx.fill(); text(ctx, 'N', XX, my + sc + 22, { a: 'center', b: 1, c: COL.r, fs: 12 }); } else text(ctx, 'A', XX, my - sc - 12, { a: 'center', b: 1, c: COL.gr, fs: 12 }); X = XX; }
      if (str) { ctx.fillStyle = COL.ink; ctx.fillRect(x0 - 6, my - sc - 4, 5, 2 * sc + 8); ctx.fillRect(x1 + 1, my - sc - 4, 5, 2 * sc + 8); }
      if (S.comp) { text(ctx, str ? 'incident and reflected waves' : 'wave to the right', 12, 18, { fs: 11, b: 1, c: COL.v }); text(ctx, str ? '' : 'wave to the left', 12, 34, { fs: 11, b: 1, c: COL.o }); }
      text(ctx, 'sum: standing wave', w - 12, 18, { a: 'right', fs: 11, b: 1, c: COL.gr });
      if (str) ro([['harmonic', 'n = ' + S.n, 'hl'], ['length L', fmt(Lm, 2) + ' m'], ['λ = 2L/n', fmt(2 * Lm / S.n, 2) + ' m'], ['f = nv/2L (v = 120 m/s)', fmt(S.n * v / (2 * Lm), 0) + ' Hz', 'hl'], ['nodes', String(S.n + 1)], ['antinodes (loops)', String(S.n)]]);
      else ro([['node to node', 'λ/2'], ['node to antinode', 'λ/4'], ['amplitude at an antinode', '2a'], ['amplitude at a node', '0']]);
    }
    loop(cv, dt => { if (S.play) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 4. EM wave ----------
  window.PhysiQSims.add('emwave', function (root) {
    const { COL, el, button, canvas, text, loop } = window.PhysiQSims.U;
    const S = { t: 0, play: true };
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 240, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const ox = 50, oy = h * 0.55, L = w - 90, k = TAU / (L / 2.2), E0 = h * 0.3, bx = -0.55, by = 0.35, B0 = h * 0.45;
      const P3 = (x, ey, bz) => [ox + x + bz * bx, oy - ey + bz * by];
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + L + 20, oy); ctx.stroke(); text(ctx, 'x (direction of travel) →', 12, h - 28, { fs: 11, c: COL.sub });
      for (let i = 0; i <= 60; i++) { const x = L * i / 60, s = Math.sin(1.8 * S.t - k * x); const [ex, ey] = P3(x, E0 * s, 0), [bxp, byp] = P3(x, 0, B0 * s); ctx.lineWidth = 0.8; ctx.strokeStyle = 'rgba(192,57,43,.5)'; ctx.beginPath(); ctx.moveTo(ox + x, oy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.strokeStyle = 'rgba(106,99,236,.5)'; ctx.beginPath(); ctx.moveTo(ox + x, oy); ctx.lineTo(bxp, byp); ctx.stroke(); }
      [[COL.r, s => [0, E0 * s, 0]], [COL.v, s => [0, 0, B0 * s]]].forEach(([c, f]) => { ctx.strokeStyle = c; ctx.lineWidth = 2.6; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const x = L * i / 200, s = Math.sin(1.8 * S.t - k * x), [, ey, bz] = f(s), [X, Y] = P3(x, ey, bz); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); });
      text(ctx, 'E (electric field)', 12, 18, { b: 1, c: COL.r, fs: 12 }); text(ctx, 'B (magnetic field)', 12, 34, { b: 1, c: COL.v, fs: 12 });
      text(ctx, 'E ⊥ B, both ⊥ x, in phase; speed c = 3.00 × 10⁸ m/s', w - 12, h - 10, { a: 'right', fs: 11, c: COL.sub });
    }
    loop(cv, dt => { if (S.play) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
  // ---------- noise-cancelling headphones ----------
  window.PhysiQSims.add('anc', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { on: true, f: 150, d: 0, t: 0, snd: false };
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    toggle(bar, 'Noise cancelling ON', S.on, v => { S.on = v; upd(); });
    toggle(bar, '🔊 Sound', false, v => { S.snd = v; v ? start() : stop(); });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'frequency of the noise', 50, 1000, 10, S.f, 'Hz', x => { S.f = x; upd(); });
    slider(ctl, 'delay in the electronics', 0, 2, 0.05, S.d, 'ms', x => { S.d = x; upd(); });
    const cv = canvas(root); const ro = readouts(root);
    // sound: the noise and the anti-noise really are added together before they reach the speaker
    let ac = null, nodes = null;
    function start() {
      try { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { ac = null; return; }
      stop(); const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = S.f;
      const g = ac.createGain(); g.gain.value = 0.25; const inv = ac.createGain(); const dl = ac.createDelay(0.01); const out = ac.createGain(); out.gain.value = 0.6;
      o.connect(g); g.connect(out); g.connect(dl); dl.connect(inv); inv.connect(out); out.connect(ac.destination); o.start();
      nodes = { o, inv, dl, out }; upd();
    }
    function stop() { if (nodes) { try { nodes.o.stop(); nodes.out.disconnect(); } catch (e) {} nodes = null; } }
    function upd() { if (!nodes || !ac) return; const t = ac.currentTime; nodes.o.frequency.setTargetAtTime(S.f, t, 0.02); nodes.dl.delayTime.setTargetAtTime(S.d / 1000, t, 0.02); nodes.inv.gain.setTargetAtTime(S.on ? -1 : 0, t, 0.02); }
    const watch = setInterval(() => { if (!root.isConnected || document.hidden) { stop(); if (!root.isConnected) clearInterval(watch); } }, 500);
    function frame(dt) {
      if (dt < 0) dt = 0; S.t += dt;
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(1.25, 420, 500) : cv.size(0.5, 300, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const phi = 2 * Math.PI * S.f * S.d / 1000, res = S.on ? 2 * Math.abs(Math.sin(phi / 2)) : 1;
      // headphone cup beside an ear
      const hx = narrow ? w / 2 : w * 0.17, hy = narrow ? 88 : h / 2, sc = narrow ? 0.8 : 1;
      ctx.save(); ctx.translate(hx, hy); ctx.scale(sc, sc);
      ctx.fillStyle = '#F1C27D'; ctx.beginPath(); ctx.ellipse(18, 0, 26, 40, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#C9965A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(18, 0, 13, 22, 0, -1.2, 1.9); ctx.stroke();
      ctx.fillStyle = '#2B3140'; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-44, -48, 44, 96, 18) : ctx.rect(-44, -48, 44, 96); ctx.fill();
      ctx.fillStyle = '#5A6170'; ctx.fillRect(-6, -30, 8, 60);
      ctx.beginPath(); ctx.arc(-48, -32, 5, 0, 7); ctx.fillStyle = COL.r; ctx.fill();
      ctx.strokeStyle = '#2B3140'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(10, -40, 52, Math.PI * 1.05, Math.PI * 1.6); ctx.stroke();
      // incoming noise waves
      for (let i = 0; i < 3; i++) { const r = ((S.t * 40 + i * 20) % 60) + 10; ctx.strokeStyle = 'rgba(192,57,43,' + (0.6 - r / 120) + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(-110, -32, r, -0.5, 0.5); ctx.stroke(); }
      ctx.restore();
      text(ctx, 'microphone', hx - 58 * sc, hy - 44 * sc, { a: 'right', fs: 10.5, c: COL.r, b: 1 }); text(ctx, 'speaker', hx - 2, hy + 62 * sc, { a: 'center', fs: 10.5, c: COL.sub, b: 1 }); text(ctx, 'noise', hx - 92 * sc, hy - 4, { a: 'center', fs: 10.5, c: COL.r });
      // three traces
      const gx = narrow ? 44 : w * 0.36, gw = w - gx - 14, top = narrow ? 150 : 22, gh = (h - top - 12) / 3, A = gh * 0.21;
      
      const tr = [['noise at the ear', COL.r, x => Math.sin(x)], ['anti-noise from the speaker', COL.v, x => S.on ? -Math.sin(x - phi) : 0], ['what the ear hears (sum)', '#3E8E1E', x => Math.sin(x) + (S.on ? -Math.sin(x - phi) : 0)]];
      tr.forEach(([n, c, fn], i) => {
        const y0 = top + gh * i + gh * 0.57; ctx.strokeStyle = '#D8DBCF'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, y0); ctx.lineTo(gx + gw, y0); ctx.stroke();
        text(ctx, n, gx, top + gh * i + 12, { fs: 11, b: 1, c });
        ctx.strokeStyle = c; ctx.lineWidth = i === 2 ? 2.6 : 1.8; ctx.beginPath();
        for (let k = 0; k <= 240; k++) { const x = 2 * Math.PI * (k / 240 * 4 - S.t * 0.5); const yy = y0 - A * fn(x); k ? ctx.lineTo(gx + gw * k / 240, yy) : ctx.moveTo(gx + gw * k / 240, yy); }
        ctx.stroke();
      });
      ro([['phase difference between noise and anti-noise', S.on ? fmt((180 + phi * 180 / Math.PI) % 360, 0) + '°' : 'no anti-noise', 'hl'], ['amplitude reaching the ear', fmt(res * 100, 0) + '% of the noise', 'hl'], ['delay as a fraction of one period', fmt(S.d / 1000 * S.f, 2) + ' T']]);
    }
    loop(cv, frame);
  });

})();
