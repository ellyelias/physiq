/* Semester 3 Chapter 19 Oscillations: full notes by Cikgu Suhaili (from STPM_2026_CHAPTER_20_OSCILLATION.pdf).
   App chapter 19 = STPM 2026 syllabus chapter 20. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq, half, ms, ms2 } = window.PhysiQLessons.H;
  const w2 = 'ω<sup>2</sup>', A2x2 = sq('<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>');

  // ---------- figures ----------
  const coil = (x1, x2, y, n = 9, amp = 9) => { let d = `M${x1},${y} L${x1 + 8},${y}`; const s = (x2 - x1 - 16) / n; for (let i = 0; i < n; i++) d += ` L${(x1 + 8 + s * (i + 0.5)).toFixed(1)},${y + (i % 2 ? amp : -amp)}`; return P(d + ` L${x2 - 8},${y} L${x2},${y}`, 'sub', { w: 1.8 }); };
  const F = {};
  F.spring = () => {
    const row = (y, xm, lab, fl) => `<rect x="20" y="${y - 22}" width="10" height="44" fill="#CFC6A8"/>` + coil(30, xm - 18, y) + `<rect x="${xm - 18}" y="${y - 16}" width="36" height="32" rx="4" fill="#BFE6E0" stroke="${C.ink}" stroke-width="1.4"/>` + T(xm, y + 5, 'm', { it: 1, fs: 13 }) +
      L(20, y + 18, 340, y + 18, 's', '', { w: 1 }) + T(8, y + 5, lab, { b: 1, fs: 13 }) + (fl || '');
    return svg(360, 250, L(190, 10, 190, 236, 's', '', { d: '4 4', w: 1.2 }) + T(190, 248, 'equilibrium position O', { fs: 11, c: C.sub }) +
      row(40, 260, '(a)', L(240, 40, 200, 40, 'r', 'e', { w: 2.6 }) + T(224, 30, 'F', { it: 1, c: C.r, b: 1 }) + L(190, 72, 260, 72, 'v', 'e', { w: 1.6 }) + T(225, 86, 'x', { it: 1, c: C.v, fs: 13 })) +
      row(120, 190, '(b)', T(250, 124, 'x = 0, F = 0', { fs: 12, a: 'start' })) +
      row(195, 120, '(c)', L(140, 195, 180, 195, 'r', 'e', { w: 2.6 }) + T(162, 185, 'F', { it: 1, c: C.r, b: 1 }) + L(190, 227, 120, 227, 'v', 'e', { w: 1.6 }) + T(155, 241, 'x', { it: 1, c: C.v, fs: 13 })), 380);
  };
  F.ref = () => {
    const cx = 120, cy = 110, R = 80, th = 0.75, px = cx + R * Math.cos(th), py = cy - R * Math.sin(th);
    return svg(360, 220, `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.g}" stroke-width="1.6" stroke-dasharray="5 4"/>` + L(cx - R - 14, cy, cx + R + 18, cy, 'k', 'e', { w: 1.3 }) + L(cx, cy + R + 12, cx, cy - R - 16, 'k', 'e', { w: 1.3 }) +
      L(cx, cy, px, py, 'k', '', { w: 1.6 }) + L(px, py, cx, py, 's', '', { d: '4 3', w: 1.3 }) + P(`M${cx + 26},${cy} A26,26 0 0,0 ${cx + 26 * Math.cos(th)},${cy - 26 * Math.sin(th)}`, 'o', { w: 1.6 }) +
      T(cx + 34, cy - 10, 'θ', { it: 1, fs: 13, c: C.o, a: 'start' }) + dot(px, py, 6, '#E7B54A') + T(px + 10, py - 6, 'P', { b: 1, a: 'start' }) + dot(cx, py, 6, C.ball) + T(cx - 10, py + 2, 'Q', { b: 1, a: 'end' }) +
      T(cx + (px - cx) / 2 + 8, cy - (cy - py) / 2 + 14, 'A', { it: 1, fs: 13 }) + T(cx - 10, cy + 16, 'O', { fs: 12 }) + T(cx + R + 4, cy + 16, 'R', { fs: 12 }) + T(cx + 8, cy - R - 16, 'y', { it: 1, a: 'start' }) +
      T(222, 70, 'P moves round the circle', { fs: 12, a: 'start' }) + T(222, 86, 'at constant ω.', { fs: 12, a: 'start' }) + T(222, 112, 'Its projection Q on the', { fs: 12, a: 'start' }) + T(222, 128, 'diameter performs SHM:', { fs: 12, a: 'start' }) + T(222, 154, 'y = A sin ωt', { fs: 14, a: 'start', it: 1, b: 1, c: C.v }), 380);
  };
  const wave = (x0, y0, w, a, f, ph = 0, n = 80) => { let d = ''; for (let i = 0; i <= n; i++) { const t = i / n; d += (i ? ' L' : 'M') + (x0 + t * w).toFixed(1) + ',' + (y0 - a * f(2 * Math.PI * t + ph)).toFixed(1); } return d; };
  F.xvat = () => {
    const g1 = (y0, lab, c, f, amp) => axes(40, y0, 290, 50, 't', lab, { noO: 1 }) + P(wave(40, y0, 260, 36, f), c, { w: 2.4 }) + L(36, y0 - 36, 300, y0 - 36, 's', '', { d: '2 4', w: 0.8 }) + L(36, y0 + 36, 300, y0 + 36, 's', '', { d: '2 4', w: 0.8 }) + T(34, y0 - 32, amp, { fs: 11, a: 'end', c: C.sub }) + T(34, y0 + 40, '−' + amp, { fs: 11, a: 'end', c: C.sub }) +
      [['T/4', 65], ['T/2', 130], ['3T/4', 195], ['T', 260]].map(([s, x]) => L(40 + x, y0 - 3, 40 + x, y0 + 3, 'k', '', { w: 1 }) + T(40 + x, y0 + 15, s, { fs: 10, c: C.sub })).join('');
    return svg(360, 370, g1(70, 'x', 'v', Math.sin, 'A') + g1(190, 'v', 'o', Math.cos, 'ωA') + g1(310, 'a', 'r', t => -Math.sin(t), 'ω²A'), 380);
  };
  F.vx = () => two(svg(220, 190, axes(110, 95, 90, 80, 'x', 'v', { noO: 1, yb: 180 }) + L(20, 95, 110, 95, 'k', '', { w: 1.6 }) + `<ellipse cx="110" cy="95" rx="70" ry="55" fill="none" stroke="${C.o}" stroke-width="2.4"/>` + T(180, 112, 'A', { it: 1, fs: 12 }) + T(40, 112, '−A', { it: 1, fs: 12 }) + T(116, 36, 'ωA', { fs: 11, a: 'start', it: 1 }) + T(116, 162, '−ωA', { fs: 11, a: 'start', it: 1 }) + T(110, 188, 'v = ±ω√(A² − x²): an ellipse', { fs: 11, c: C.sub }), 220),
    svg(220, 190, axes(110, 95, 90, 80, 'x', 'a', { noO: 1, yb: 180 }) + L(20, 95, 110, 95, 'k', '', { w: 1.6 }) + P('M40,45 L180,145', 'r', { w: 2.6 }) + L(40, 45, 40, 95, 's', '', { d: '3 3', w: 1 }) + L(180, 145, 180, 95, 's', '', { d: '3 3', w: 1 }) + T(180, 88, 'A', { it: 1, fs: 12 }) + T(40, 110, '−A', { it: 1, fs: 12 }) + T(116, 49, 'ω²A', { fs: 11, a: 'start', it: 1 }) + T(104, 152, '−ω²A', { fs: 11, a: 'end', it: 1 }) + T(110, 188, 'a = −ω²x: straight line, gradient −ω²', { fs: 11, c: C.sub }), 220));
  F.energy = () => {
    const sq2 = (f) => t => f(t) * f(t);
    const gt = axes(40, 150, 280, 125, 't', 'E', { noO: 1 }) + P(wave(40, 150, 260, 100, sq2(Math.cos)), 'o', { w: 2.4 }) + P(wave(40, 150, 260, 100, sq2(Math.sin)), 'v', { w: 2.4 }) + L(40, 50, 300, 50, 'g', '', { w: 2.4 }) +
      [['T/4', 65], ['T/2', 130], ['3T/4', 195], ['T', 260]].map(([s, x]) => T(40 + x, 166, s, { fs: 10, c: C.sub })).join('') + T(302, 44, 'E', { it: 1, c: C.g, b: 1, a: 'start' }) + T(52, 66, 'K', { it: 1, c: C.o, b: 1 }) + T(98, 66, 'U', { it: 1, c: C.v, b: 1 });
    let pk = '', pu = ''; for (let i = 0; i <= 60; i++) { const x = -1 + 2 * i / 60, X = 140 + x * 100; pk += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (150 - 100 * (1 - x * x)).toFixed(1); pu += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (150 - 100 * x * x).toFixed(1); }
    const gx = axes(140, 150, 130, 125, 'x', 'E', { noO: 1 }) + L(30, 150, 140, 150, 'k', '', { w: 1.6 }) + P(pk, 'o', { w: 2.4 }) + P(pu, 'v', { w: 2.4 }) + L(40, 50, 240, 50, 'g', '', { w: 2.4 }) + T(40, 166, '−A', { it: 1, fs: 12 }) + T(240, 166, 'A', { it: 1, fs: 12 }) + T(140, 166, '0', { fs: 12, c: C.sub }) +
      T(246, 46, 'E', { it: 1, c: C.g, b: 1, a: 'start' }) + T(150, 72, 'K', { it: 1, c: C.o, b: 1, a: 'start' }) + T(60, 72, 'U', { it: 1, c: C.v, b: 1 });
    return two(svg(320, 180, gt, 320), svg(280, 180, gx, 280));
  };
  F.pend = () => svg(320, 250, L(60, 20, 260, 20, 'k', '', { w: 3 }) + `<path d="M60,20 l-8,-8 M80,20 l-8,-8 M100,20 l-8,-8 M120,20 l-8,-8 M140,20 l-8,-8 M160,20 l-8,-8 M180,20 l-8,-8 M200,20 l-8,-8 M220,20 l-8,-8 M240,20 l-8,-8 M260,20 l-8,-8" stroke="${C.sub}" stroke-width="1"/>` +
    L(160, 20, 160, 200, 's', '', { d: '4 4', w: 1.2 }) + L(160, 20, 222, 182, 'k', '', { w: 1.8 }) + P('M160,62 A42,42 0 0,0 174,59', 'o', { w: 1.6 }) + T(172, 80, 'θ', { it: 1, c: C.o, fs: 13 }) + T(186, 98, 'l', { it: 1, fs: 14 }) +
    P('M160,200 A180,180 0 0,0 222,182', 'v', { w: 1.6, d: '4 3' }) + T(190, 212, 'x', { it: 1, c: C.v }) + dot(222, 182, 11, '#E7B54A') + L(222, 182, 222, 242, 'g', 'e', { w: 2.4 }) + T(230, 238, 'mg', { it: 1, c: C.g, a: 'start' }) + L(222, 182, 201, 125, 'r', 'e', { w: 2.4 }) + T(196, 140, 'T', { it: 1, c: C.r, a: 'end' }) +
    L(222, 182, 166, 202, 'o', 'e', { w: 2.4 }) + T(124, 230, 'mg sin θ (restoring force)', { fs: 12, c: C.o }), 340);
  F.damp = () => {
    let u = '', c = '', o = ''; for (let i = 0; i <= 160; i++) { const t = i / 160 * 6, X = 40 + i / 160 * 280; u += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (100 - 70 * Math.exp(-0.35 * t) * Math.cos(2 * Math.PI * t * 0.9)).toFixed(1); const w0 = 2 * Math.PI * 0.9; c += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (100 - 70 * (1 + w0 * t) * Math.exp(-w0 * t)).toFixed(1); const r1 = -1.1, r2 = -w0 * w0 / 1.1 * -1; o += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (100 - 70 * Math.exp(-0.55 * t)).toFixed(1); }
    return svg(360, 190, axes(40, 100, 300, 85, 't', 'x', { noO: 1, yb: 180 }) + P(u, 'v', { w: 2.2 }) + P(c, 'g', { w: 2.6 }) + P(o, 'o', { w: 2.4 }) +
      T(330, 152, 'under damped', { fs: 11, a: 'end', c: C.v, b: 1 }) + T(190, 132, 'critically damped', { fs: 11, a: 'start', c: C.g, b: 1 }) + T(150, 46, 'over damped', { fs: 11, a: 'start', c: C.o, b: 1 }), 380);
  };
  F.envelope = () => { let u = '', e1 = '', e2 = ''; for (let i = 0; i <= 200; i++) { const t = i / 200 * 8, X = 40 + i / 200 * 290, en = 60 * Math.exp(-0.28 * t); u += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (90 - en * Math.cos(2 * Math.PI * t * 0.8)).toFixed(1); e1 += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (90 - en).toFixed(1); e2 += (i ? ' L' : 'M') + X.toFixed(1) + ',' + (90 + en).toFixed(1); }
    return svg(360, 170, axes(40, 90, 300, 75, 't', 'x', { noO: 1, yb: 165 }) + P(e1, 'r', { w: 1.4, d: '5 4' }) + P(e2, 'r', { w: 1.4, d: '5 4' }) + P(u, 'v', { w: 2.2 }) + T(200, 30, 'amplitude decreases with time', { fs: 11, c: C.r, a: 'start' }), 380); };
  F.barton = () => { const bob = (x, l, lab, c) => L(x, 40, x + l * 0.14, 40 + l, 's', '', { w: 1.4 }) + dot(x + l * 0.14, 40 + l, lab === 'D' ? 11 : 7, c) + T(x + l * 0.14, 62 + l, lab, { b: 1, fs: 13 });
    return svg(340, 220, P('M20,30 Q170,48 320,30', 'ink', { w: 1.6 }) + L(20, 18, 20, 32, 'k', '', { w: 3 }) + L(320, 18, 320, 32, 'k', '', { w: 3 }) + bob(70, 120, 'D', '#E7B54A') + bob(140, 70, 'X', C.ball) + bob(200, 120, 'Y', '#F2661B') + bob(260, 160, 'Z', C.ball) +
      T(70, 210, 'driver', { fs: 11, c: C.sub }), 360); };
  F.res = () => { const curve = (b, c) => { let d = ''; for (let i = 0; i <= 140; i++) { const r = 0.3 + 1.4 * i / 140, A = 1 / Math.sqrt((1 - r * r) ** 2 + (b * r) ** 2); d += (i ? ' L' : 'M') + (40 + (r - 0.3) / 1.4 * 280).toFixed(1) + ',' + (170 - Math.min(A, 6.5) * 22).toFixed(1); } return P(d, c, { w: 2.4 }); };
    return svg(360, 200, axes(40, 170, 300, 160, 'f', 'A', { noO: 1 }) + curve(0.15, C.v) + curve(0.35, C.o) + curve(0.9, C.g) + L(180, 170, 180, 22, 's', '', { d: '4 4', w: 1.2 }) + T(180, 186, 'f₀', { it: 1 }) +
      T(196, 36, 'light damping', { fs: 11, c: C.v, a: 'start', b: 1 }) + T(212, 100, 'heavier damping', { fs: 11, c: C.o, a: 'start', b: 1 }) + T(48, 128, 'heavy damping', { fs: 11, c: C.g, a: 'start', b: 1 }) + T(330, 196, 'driving frequency', { fs: 11, c: C.sub, a: 'end' }), 380); };
  // graphs used in examples
  F.ex1 = () => svg(320, 150, axes(40, 75, 260, 60, 't / s', 'x / m', { noO: 1, yb: 140 }) + P(wave(40, 75, 220, 50, Math.sin), 'v', { w: 2.4 }) + T(34, 30, '0.3', { fs: 11, a: 'end' }) + T(34, 129, '−0.3', { fs: 11, a: 'end' }) + L(260, 72, 260, 78, 'k', '', { w: 1 }) + T(260, 92, '0.4', { fs: 11 }) + T(32, 80, '0', { fs: 11, a: 'end', c: C.sub }), 340);
  F.ex2 = () => svg(320, 150, axes(40, 75, 260, 60, 't / s', 'x / m', { noO: 1, yb: 140 }) + P(wave(40, 75, 220, 50, Math.sin, 0, 120).replace(/^M/, 'M'), 'v', { w: 2.4 }) + T(34, 30, '0.2', { fs: 11, a: 'end' }) + T(34, 129, '−0.2', { fs: 11, a: 'end' }) + [['2', 95], ['4', 260]].map(([s, x]) => L(x, 72, x, 78, 'k', '', { w: 1 }) + T(x, 92, s, { fs: 11 })).join('') + T(32, 80, '0', { fs: 11, a: 'end', c: C.sub }), 340);
  F.ex3 = () => svg(260, 190, axes(130, 95, 100, 80, 'x', 'F', { noO: 1, yb: 180 }) + L(30, 95, 130, 95, 'k', '', { w: 1.6 }) + P('M70,35 L190,155', 'r', { w: 2.6 }) + L(190, 95, 190, 155, 's', '', { d: '3 3', w: 1 }) + L(70, 95, 70, 35, 's', '', { d: '3 3', w: 1 }) + L(130, 35, 70, 35, 's', '', { d: '3 3', w: 1 }) + L(130, 155, 190, 155, 's', '', { d: '3 3', w: 1 }) +
    T(190, 88, '0.1 m', { fs: 11 }) + T(70, 110, '−0.1 m', { fs: 11 }) + T(136, 39, '20 N', { fs: 11, a: 'start' }) + T(124, 159, '−20 N', { fs: 11, a: 'end' }), 280);
  F.pabc = () => svg(260, 150, L(130, 20, 130, 120, 's', '', { d: '4 4', w: 1 }) + L(130, 20, 70, 110, 'k', '', { w: 1.4 }) + L(130, 20, 190, 110, 'k', '', { w: 1.4 }) + P('M70,110 Q130,140 190,110', 'v', { w: 1.4, d: '4 3' }) + dot(70, 110, 8, C.ball) + dot(130, 128, 8, '#E7B54A') + dot(190, 110, 8, C.ball) + T(56, 114, 'A', { b: 1, a: 'end' }) + T(130, 148, 'B', { b: 1 }) + T(204, 114, 'C', { b: 1, a: 'start' }), 280);

  const S = `
${sec('19-0', 'Oscillations: introduction', `
${def('Oscillation (periodic motion)', `is ${red('the back-and-forth motion of an object about a fixed point')}.`)}
${ul([`a mass on the end of a spring (horizontal or vertical)`, `atoms vibrating in a crystal`, `a simple pendulum`, `a child on a swing`])}
<p>The simplest oscillation is a mass on a spring sliding on a smooth horizontal surface (Figure 19.1). We assume the spring is light (its mass is ignored) and there is no friction.</p>
${fig(F.spring(), 'Figure 19.1: (a) spring stretched, the force acts to the left; (b) at the equilibrium position, F = 0; (c) spring compressed, the force acts to the right.')}
${ul([`The spring has a natural length at which it exerts no force on the mass. The position of the mass at this point is the ${red('equilibrium position')}.`, `If the mass is pulled to the right (spring stretched) or pushed to the left (spring compressed), the spring exerts a force that acts to return it to equilibrium. This is the ${red('restoring force')}.`, `At <i>x</i> = 0 the restoring force is zero, but the mass keeps moving past O because of its <b>inertia</b>.`, `The restoring force is always directed towards the equilibrium position.`])}
`)}

${sec('19-1', '19.1 Characteristics of simple harmonic motion', `
${h4('Equation of SHM')}
<p>By Hooke’s law, the restoring force varies with the displacement <i>x</i> as</p>
${key(`<i>F</i> = −<i>kx</i>`, '<i>k</i> = spring constant (N m<sup>−1</sup>), a measure of the stiffness of the spring. The minus sign shows that <i>F</i> is always opposite to the displacement <i>x</i>.')}
<p>With no friction this is the net force, so by Newton’s second law, <i>F</i> = <i>ma</i>:</p>
${steps([`<i>ma</i> = −<i>kx</i>`, `<i>a</i> = ${fr('d<sup>2</sup><i>x</i>', 'd<i>t</i><sup>2</sup>')} = −${fr('<i>k</i>', '<i>m</i>')}<i>x</i>`, `Since <i>k</i>/<i>m</i> is a positive constant, write it as ${w2}:`])}
${key(`<i>a</i> = −${w2}<i>x</i>`, 'ω = angular frequency (rad s<sup>−1</sup>). Acceleration ∝ displacement, and is opposite in direction to the displacement.')}
${def('Simple harmonic motion (SHM)', `is the periodic motion of an object in which ${red('the acceleration (and the restoring force) is directly proportional to the displacement from a fixed point (the equilibrium position), and is always directed towards that point')}.`)}
${tip(`Whenever a question gives an equation of motion such as d<sup>2</sup><i>x</i>/d<i>t</i><sup>2</sup> + 100<i>x</i> = 0, rewrite it as <i>a</i> = −${w2}<i>x</i> first. Here <i>a</i> = −100<i>x</i>, so ${w2} = 100 and ω = 10 rad s<sup>−1</sup>. Every other SHM quantity follows from ω.`)}
`)}

${sec('19-2', '19.2 Kinematics of simple harmonic motion', `
${h4('The reference circle')}
${def('Reference circle', `is the circle in which a particle moves at constant angular velocity so that ${red('its projection onto a diameter of the circle performs SHM')}.`)}
${fig(F.ref(), 'Figure 19.2: P moves anticlockwise round a circle of radius A at constant ω. Its projection Q moves up and down the diameter in SHM.')}
<p>If OQ = <i>y</i> and θ = ω<i>t</i>, then <i>y</i> = <i>A</i> sin θ, so</p>
${eq(`<i>y</i> = <i>A</i> sin ω<i>t</i> &nbsp; or &nbsp; <i>x</i> = <i>A</i> sin ω<i>t</i>`)}
<p>This is why ω is called the <b>angular frequency</b>, even though the oscillating mass moves only in a straight line.</p>
${h4('Terms used in SHM')}
${table(['Quantity', 'Meaning'], [[`Displacement, <i>x</i> (m)`, `the distance of the particle from the equilibrium position (with direction)`], [`Amplitude, <i>A</i> (m)`, `the maximum magnitude of the displacement`], [`Period, <i>T</i> (s)`, `the time for one complete oscillation`], [`Frequency, <i>f</i> (Hz)`, `the number of complete oscillations per second; <i>f</i> = ${fr('1', '<i>T</i>')}`], [`Angular frequency, ω (rad s<sup>−1</sup>)`, `ω = 2π<i>f</i> = ${fr('2π', '<i>T</i>')}`]])}
${h4('Solutions of a = −ω²x')}
<p>Both of these satisfy <i>a</i> = −${w2}<i>x</i>. The only difference is where the clock starts (<i>t</i> = 0).</p>
${table(['<i>x</i> = <i>A</i> sin ω<i>t</i>', '<i>x</i> = <i>A</i> cos ω<i>t</i>'], [['starts at the equilibrium position (<i>x</i> = 0), moving at maximum speed', 'starts at the maximum displacement (<i>x</i> = <i>A</i>), momentarily at rest'], [`check: <i>v</i> = d<i>x</i>/d<i>t</i> = <i>A</i>ω cos ω<i>t</i>; <i>a</i> = d<i>v</i>/d<i>t</i> = −<i>A</i>${w2} sin ω<i>t</i> = −${w2}<i>x</i> ✓`, `check: <i>v</i> = −<i>A</i>ω sin ω<i>t</i>; <i>a</i> = −<i>A</i>${w2} cos ω<i>t</i> = −${w2}<i>x</i> ✓`]])}
${note(`A mass pulled to <i>x</i> = +<i>A</i> and released from rest follows <i>x</i> = <i>A</i> cos ω<i>t</i>. A mass given a push through the equilibrium position at <i>t</i> = 0 follows <i>x</i> = <i>A</i> sin ω<i>t</i>.`)}
${h4('Velocity and acceleration')}
${two(`<p><b>Velocity</b> (for <i>x</i> = <i>A</i> sin ω<i>t</i>)</p>${eq(`<i>v</i> = ${fr('d<i>x</i>', 'd<i>t</i>')} = <i>A</i>ω cos ω<i>t</i>`)}<p>Maximum when cos ω<i>t</i> = ±1:</p>${eq(`<i>v</i><sub>max</sub> = <i>A</i>ω`)}`,
`<p><b>Acceleration</b></p>${eq(`<i>a</i> = ${fr('d<i>v</i>', 'd<i>t</i>')} = −<i>A</i>${w2} sin ω<i>t</i> = −${w2}<i>x</i>`)}<p>Maximum magnitude when sin ω<i>t</i> = ±1:</p>${eq(`<i>a</i><sub>max</sub> = <i>A</i>${w2}`)}`)}
${h4('Velocity in terms of displacement')}
${steps([`<i>x</i> = <i>A</i> sin ω<i>t</i> ⇒ sin ω<i>t</i> = ${fr('<i>x</i>', '<i>A</i>')}`, `sin<sup>2</sup>ω<i>t</i> + cos<sup>2</sup>ω<i>t</i> = 1 ⇒ cos ω<i>t</i> = ±${sq('1 − ' + fr('<i>x</i><sup>2</sup>', '<i>A</i><sup>2</sup>'))}`, `<i>v</i> = <i>A</i>ω cos ω<i>t</i> = ±<i>A</i>ω${sq('1 − ' + fr('<i>x</i><sup>2</sup>', '<i>A</i><sup>2</sup>'))} = ±ω${sq('<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>')}`])}
${key(`<i>v</i> = ±ω${A2x2}`, '± : the particle can pass through the same point <i>x</i> in either direction. At <i>x</i> = 0, <i>v</i> = ±ω<i>A</i> (maximum speed); at <i>x</i> = ±<i>A</i>, <i>v</i> = 0.')}
${sim('shm', 'SHM and the reference circle', 'P goes round the circle at constant ω; its shadow Q (and the mass on the spring) moves in SHM. Watch the x–t, v–t and a–t graphs being drawn together. Change the amplitude and the period, and choose whether the clock starts at the equilibrium position or at the maximum displacement.')}
${example('19.2.1', `A particle vibrates according to the equation <i>y</i> = 4 sin 3<i>t</i>, where <i>y</i> is in metres and <i>t</i> in seconds. Calculate (a) the amplitude, (b) the angular frequency, (c) the frequency, (d) the period, (e) the maximum speed, (f) the maximum magnitude of the acceleration.`,
  steps([`Compare with <i>y</i> = <i>A</i> sin ω<i>t</i>.`, `(a) <i>A</i> = <b>4 m</b> &nbsp; (b) ω = <b>3 rad s<sup>−1</sup></b>`, `(c) <i>f</i> = ${fr('ω', '2π')} = ${fr('3', '2π')} = <b>0.48 Hz</b> &nbsp; (d) <i>T</i> = ${fr('1', '<i>f</i>')} = <b>2.09 s</b>`, `(e) <i>v</i><sub>max</sub> = <i>A</i>ω = (4)(3) = <b>12 ${ms}</b>`, `(f) <i>a</i><sub>max</sub> = <i>A</i>${w2} = (4)(3)<sup>2</sup> = <b>36 ${ms2}</b>`]))}
${example('19.2.2', `A 300 g mass at the end of a spring oscillates with an amplitude of 7.0 cm and a frequency of 1.80 Hz. When it is 3.0 cm from its equilibrium position, calculate (a) its speed, (b) the magnitude of its acceleration.`,
  steps([`ω = 2π<i>f</i> = 2π(1.80) = 11.3 rad s<sup>−1</sup>`, `(a) <i>v</i> = ω${A2x2} = 11.3${sq('0.070<sup>2</sup> − 0.030<sup>2</sup>')} = <b>0.71 ${ms}</b>`, `(b) <i>a</i> = ${w2}<i>x</i> = (11.3)<sup>2</sup>(0.030) = <b>3.8 ${ms2}</b>`]))}
${example('19.2.3', `The equation of motion of a mass at the end of a spring is <i>y</i> = 0.30 cos 0.50<i>t</i> (in metres). Find the displacement, velocity and acceleration of the mass at (a) <i>t</i> = 0, (b) <i>t</i> = 3.0 s.`,
  steps([`<i>v</i> = ${fr('d<i>y</i>', 'd<i>t</i>')} = −(0.30)(0.50) sin 0.50<i>t</i> = −0.15 sin 0.50<i>t</i>; &nbsp; <i>a</i> = ${fr('d<i>v</i>', 'd<i>t</i>')} = −(0.30)(0.50)<sup>2</sup> cos 0.50<i>t</i> = −0.075 cos 0.50<i>t</i>`, `(a) <i>t</i> = 0: <i>y</i> = <b>0.30 m</b>, <i>v</i> = <b>0</b>, <i>a</i> = <b>−0.075 ${ms2}</b>`, `(b) <i>t</i> = 3.0 s (calculator in radians): <i>y</i> = 0.30 cos 1.5 = <b>0.021 m</b>; <i>v</i> = −0.15 sin 1.5 = <b>−0.15 ${ms}</b>; <i>a</i> = −0.075 cos 1.5 = <b>−5.3 × 10<sup>−3</sup> ${ms2}</b>`]))}
${pq('STPM 2023 · Section A · Q2', `A particle undergoes simple harmonic motion with a period of 2.0 s and amplitude 2.4 cm. What is the velocity of the particle when the displacement is 1.2 cm?`, [`6.5 × 10<sup>−2</sup> ${ms}`, `3.8 × 10<sup>−2</sup> ${ms}`, `2.1 × 10<sup>−2</sup> ${ms}`, `1.3 × 10<sup>−2</sup> ${ms}`], 0,
  `<p>ω = 2π/<i>T</i> = π rad s<sup>−1</sup>; <i>v</i> = ω${A2x2} = π${sq('0.024<sup>2</sup> − 0.012<sup>2</sup>')} = 6.5 × 10<sup>−2</sup> ${ms}.</p><p><b>Common mistake:</b> using <i>T</i> as ω, or forgetting to change cm to m.</p>`)}

${h4('Graphs of SHM against time')}
${fig(F.xvat(), 'Figure 19.3: for x = A sin ωt, the velocity leads the displacement by a quarter period (T/4), and the acceleration is always opposite to the displacement.')}
${table(['<i>t</i>', '<i>x</i>', '<i>v</i>', '<i>a</i>'], [['0', '0', '+ω<i>A</i>', '0'], ['<i>T</i>/4', '+<i>A</i>', '0', '−ω<sup>2</sup><i>A</i>'], ['<i>T</i>/2', '0', '−ω<i>A</i>', '0'], ['3<i>T</i>/4', '−<i>A</i>', '0', '+ω<sup>2</sup><i>A</i>'], ['<i>T</i>', '0', '+ω<i>A</i>', '0']])}
${ul([`When <i>x</i> is at a maximum or a minimum, <i>v</i> = 0 and |<i>a</i>| is maximum.`, `When <i>x</i> = 0 (passing through equilibrium), |<i>v</i>| is maximum and <i>a</i> = 0.`])}
${h4('Graphs of velocity and acceleration against displacement')}
${fig(F.vx(), 'Figure 19.4: v against x is an ellipse; a against x is a straight line through the origin with gradient −ω².')}
<p>Since <i>F</i> = <i>ma</i> = −<i>m</i>${w2}<i>x</i>, the graph of restoring force against displacement is also a straight line through the origin. Its gradient has magnitude <i>k</i> = <i>m</i>${w2}.</p>
${example('19.2.4', `The equation of motion of a particle in SHM is <i>x</i> = 5 sin 3<i>t</i>, where <i>x</i> is in cm. (a) What is its amplitude? (b) Find its period. (c) Find its displacement at <i>t</i> = 0.2 s. (d) Sketch the graph of displacement against time.`,
  steps([`(a) <i>A</i> = <b>5 cm</b>`, `(b) ω = 3 = 2π/<i>T</i> ⇒ <i>T</i> = <b>2.09 s</b>`, `(c) <i>x</i> = 5 sin 3(0.2) = 5 sin 0.6 = <b>2.82 cm</b>`, `(d) a sine curve starting at 0, peak 5 cm at <i>t</i> = 0.52 s, back to 0 at 1.05 s, −5 cm at 1.57 s, 0 at 2.09 s.`]))}
${example('19.2.5', `The displacement–time graph of an oscillating object is shown. Determine (a) the amplitude, the period and the frequency, (b) the angular frequency, (c) the equation of displacement as a function of time, (d) the equations of velocity and acceleration as functions of time.`,
  steps([`(a) <i>A</i> = <b>0.3 m</b>, <i>T</i> = <b>0.4 s</b>, <i>f</i> = 1/<i>T</i> = <b>2.5 Hz</b>`, `(b) ω = 2π<i>f</i> = <b>5π rad s<sup>−1</sup></b> (15.7 rad s<sup>−1</sup>)`, `(c) at <i>t</i> = 0, <i>x</i> = 0 and increasing, so <b><i>x</i> = 0.3 sin 5π<i>t</i></b>`, `(d) <i>v</i> = d<i>x</i>/d<i>t</i> = <b>1.5π cos 5π<i>t</i></b> ${ms}; &nbsp; <i>a</i> = d<i>v</i>/d<i>t</i> = <b>−7.5π<sup>2</sup> sin 5π<i>t</i></b> ${ms2}`]), fig(F.ex1()))}
${example('19.2.6', `The graph shows the force <i>F</i> acting on a particle of mass 2 kg against its displacement <i>x</i>. What type of motion is the particle following? Give a reason. What is its amplitude? Find (i) its angular frequency, (ii) its period, (iii) its maximum speed.`,
  steps([`<b>SHM</b>, because the force is directly proportional to the displacement and opposite in direction to it (a straight line through the origin with negative gradient).`, `Amplitude = <b>0.1 m</b>`, `(i) |gradient| = <i>m</i>${w2}: ${fr('20', '0.1')} = 2${w2} ⇒ ω = <b>10 rad s<sup>−1</sup></b>`, `(ii) <i>T</i> = 2π/ω = <b>0.63 s</b> &nbsp; (iii) <i>v</i><sub>max</sub> = <i>A</i>ω = (0.1)(10) = <b>1.0 ${ms}</b>`]), fig(F.ex3()))}
`)}

${sec('19-3', '19.3 Energy in simple harmonic motion', `
${h4('Kinetic energy')}
${steps([`<i>K</i> = ${half}<i>mv</i><sup>2</sup> &nbsp; and &nbsp; <i>v</i><sup>2</sup> = ${w2}(<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>)`])}
${key(`<i>K</i> = ${half}<i>m</i>${w2}(<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>)`, 'maximum at <i>x</i> = 0: <i>K</i><sub>max</sub> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup>; zero at <i>x</i> = ±<i>A</i>. In terms of time (<i>x</i> = <i>A</i> sin ω<i>t</i>): <i>K</i> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup> cos<sup>2</sup> ω<i>t</i>')}
${h4('Potential energy')}
${steps([`Work done against the restoring force: <i>U</i> = ∫<sub>0</sub><sup><i>x</i></sup> <i>kx</i> d<i>x</i> = ${half}<i>kx</i><sup>2</sup>`, `<i>k</i> = <i>m</i>${w2}`])}
${key(`<i>U</i> = ${half}<i>m</i>${w2}<i>x</i><sup>2</sup>`, 'zero at <i>x</i> = 0; maximum at <i>x</i> = ±<i>A</i>: <i>U</i><sub>max</sub> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup>. In terms of time: <i>U</i> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup> sin<sup>2</sup> ω<i>t</i>')}
${h4('Total energy is conserved')}
${steps([`<i>E</i> = <i>K</i> + <i>U</i> = ${half}<i>m</i>${w2}(<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>) + ${half}<i>m</i>${w2}<i>x</i><sup>2</sup>`])}
${key(`<i>E</i> = ${half}<i>m</i>${w2}<i>A</i><sup>2</sup> = ${half}<i>kA</i><sup>2</sup> = constant`, 'the total mechanical energy of SHM is conserved if no external force acts on it. <i>E</i> ∝ <i>A</i><sup>2</sup>: doubling the amplitude makes the energy four times larger.')}
${fig(F.energy(), 'Figure 19.5: left, K and U against time (they vary at twice the frequency of x); right, K and U against displacement (two parabolas). E is constant in both.')}
${table(['<i>t</i>', '<i>x</i>', '<i>K</i>', '<i>U</i>'], [['0', '<i>A</i>', '0', '½<i>kA</i><sup>2</sup>'], ['<i>T</i>/4', '0', '½<i>kA</i><sup>2</sup>', '0'], ['<i>T</i>/2', '−<i>A</i>', '0', '½<i>kA</i><sup>2</sup>'], ['3<i>T</i>/4', '0', '½<i>kA</i><sup>2</sup>', '0'], ['<i>T</i>', '<i>A</i>', '0', '½<i>kA</i><sup>2</sup>']])}
<p style="font-size:.9em;color:var(--sub)">(This table starts from <i>x</i> = <i>A</i>, i.e. <i>x</i> = <i>A</i> cos ω<i>t</i>.)</p>
${table(['Misconception', 'Correct idea'], [['Total energy changes as the object oscillates.', '<i>E</i> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup> is constant. Only <i>K</i> and <i>U</i> change.'], ['Kinetic energy is greatest at the extremes.', '<i>K</i> is greatest at <i>x</i> = 0 and zero at <i>x</i> = ±<i>A</i>.'], ['<i>K</i>–<i>t</i> and <i>U</i>–<i>t</i> graphs look like the <i>x</i>–<i>t</i> graph.', 'They vary at twice the frequency of <i>x</i> and are never negative.']])}
${example('19.3.1', `A 1.0 kg mass vibrates according to <i>y</i> = 0.42 cos 7.4<i>t</i> (<i>y</i> in m, <i>t</i> in s). Determine (a) the amplitude, (b) the frequency, (c) the total energy, (d) the kinetic energy and the potential energy when <i>y</i> = 0.16 m.`,
  steps([`(a) <i>A</i> = <b>0.42 m</b> &nbsp; (b) <i>f</i> = ω/2π = 7.4/2π = <b>1.2 Hz</b>`, `(c) <i>E</i> = ½<i>m</i>${w2}<i>A</i><sup>2</sup> = ½(1.0)(7.4)<sup>2</sup>(0.42)<sup>2</sup> = <b>4.8 J</b>`, `(d) <i>v</i> = ω${sq('<i>A</i><sup>2</sup> − <i>y</i><sup>2</sup>')} = 7.4${sq('0.42<sup>2</sup> − 0.16<sup>2</sup>')} = 2.87 ${ms}; <i>K</i> = ½(1.0)(2.87)<sup>2</sup> = <b>4.1 J</b>`, `<i>U</i> = <i>E</i> − <i>K</i> = 4.8 − 4.1 = <b>0.7 J</b>`]))}
${example('19.3.2', `The displacement–time graph of an oscillating object of mass 0.3 kg is shown. Calculate the total energy (kinetic + potential) of the object.`,
  steps([`<i>A</i> = 0.2 m, <i>T</i> = 4 s ⇒ ω = 2π/<i>T</i> = π/2 rad s<sup>−1</sup>`, `<i>E</i> = ½<i>m</i>${w2}<i>A</i><sup>2</sup> = ½(0.3)(π/2)<sup>2</sup>(0.2)<sup>2</sup> = <b>0.015 J</b>`]), fig(F.ex2()))}
${pq('STPM 2022 · Section A · Q1', `An object of mass 0.10 kg undergoes SHM along the <i>x</i>-axis according to the equation d<sup>2</sup><i>x</i>/d<i>t</i><sup>2</sup> + 100<i>x</i> = 0. If the total energy of the system is 0.0020 J, what is the amplitude of the motion?`, ['0.040 cm', '0.20 cm', '0.40 cm', '2.0 cm'], 3,
  `<p>d<sup>2</sup><i>x</i>/d<i>t</i><sup>2</sup> = −100<i>x</i> ⇒ ${w2} = 100.</p><p><i>A</i><sup>2</sup> = 2<i>E</i>/(<i>m</i>${w2}) = 2(0.0020)/(0.10 × 100) = 4.0 × 10<sup>−4</sup> m<sup>2</sup> ⇒ <i>A</i> = 0.02 m = 2.0 cm.</p>`)}
${pq('STPM 2023 · Section A · Q1', `Which statement is true about simple harmonic motion?`, ['The acceleration is uniform.', 'The amplitude decreases with time.', 'The restoring force dissipates naturally.', 'The kinetic and potential energies interchange continuously.'], 3,
  `<p>A: the acceleration varies (<i>a</i> = −ω<sup>2</sup><i>x</i>). B and C describe <b>damped</b> oscillation, not ideal SHM. D: the total energy is constant while <i>K</i> and <i>U</i> trade places.</p><p><b>Tip:</b> “true about SHM” questions often hide a damped-oscillation distractor.</p>`)}
${exercises('Exercises: kinematics and energy of SHM', [
  { q: `A particle moves in SHM according to <i>y</i> = 10 sin ω<i>t</i> m. If the period is 30 s, find (a) the amplitude, (b) the maximum velocity, (c) the maximum acceleration, (d) the displacement, velocity and acceleration when <i>t</i> = 15 s.`, a: `(a) 10 m &nbsp; (b) 2.1 ${ms} &nbsp; (c) 0.44 ${ms2} &nbsp; (d) at <i>t</i> = <i>T</i>/2: <i>y</i> = 0, <i>v</i> = −2.1 ${ms}, <i>a</i> = 0` },
  { q: `An object moving with SHM has an amplitude of 2 cm and a frequency of 20 Hz. Calculate (a) the period, (b) the acceleration at the middle and at the end of an oscillation, (c) the velocities at the same two points.`, a: `(a) 0.05 s &nbsp; (b) middle: 0; end: 316 ${ms2} &nbsp; (c) middle: 2.5 ${ms}; end: 0` },
  { q: `A block of mass 0.25 kg on a frictionless surface is attached to a light spring of spring constant 180 N m<sup>−1</sup>. It is displaced 15 cm from equilibrium and released. Find (a) the total energy of the system, (b) the speed of the block when it is 10 cm from equilibrium.`, a: `(a) 2.0 J &nbsp; (b) 3.0 ${ms}` },
  { q: `A 50 g mass vibrates in SHM at the end of a spring. The amplitude is 12 cm and the period is 1.70 s. Calculate (a) the frequency, (b) the spring constant, (c) the maximum speed, (d) the maximum acceleration, (e) the speed when the displacement is 6.0 cm, (f) the acceleration when <i>x</i> = 6.0 cm.`, a: `(a) 0.588 Hz &nbsp; (b) 0.68 N m<sup>−1</sup> &nbsp; (c) 0.44 ${ms} &nbsp; (d) 1.6 ${ms2} &nbsp; (e) 0.38 ${ms} &nbsp; (f) −0.82 ${ms2}` },
  { q: `The diagram shows a pendulum oscillating between A and C; B is the lowest point. State all the positions where (a) the acceleration is maximum, (b) the acceleration is zero, (c) the speed is maximum, (d) the velocity is zero, (e) the kinetic energy is maximum, (f) the potential energy is maximum.`, f: fig(F.pabc()), a: `(a) A and C &nbsp; (b) B &nbsp; (c) B &nbsp; (d) A and C &nbsp; (e) B &nbsp; (f) A and C` }])}
`)}

${sec('19-4', '19.4 Systems in simple harmonic motion', `
${h4('Spring–mass system')}
${steps([`Hooke’s law and Newton’s second law: <i>ma</i> = −<i>kx</i> ⇒ <i>a</i> = −${fr('<i>k</i>', '<i>m</i>')}<i>x</i>`, `Compare with <i>a</i> = −${w2}<i>x</i>: ${w2} = ${fr('<i>k</i>', '<i>m</i>')} ⇒ ω = ${sq(fr('<i>k</i>', '<i>m</i>'))}`, `<i>T</i> = ${fr('2π', 'ω')}`])}
${key(`<i>T</i> = 2π${sq(fr('<i>m</i>', '<i>k</i>'))}`, 'a larger mass gives a longer period; a stiffer spring (larger <i>k</i>) gives a shorter period. <i>T</i> does not depend on the amplitude.')}
${note(`For a <b>vertical</b> spring, gravity only shifts the equilibrium position down by <i>mg</i>/<i>k</i>. The mass oscillates about this new equilibrium with the same period, <i>T</i> = 2π√(<i>m</i>/<i>k</i>). <i>g</i> does not appear in the formula.`)}
${example('19.4.1', `A mass of 200 g is attached to a horizontal spring on a frictionless surface. The mass is pulled 2.00 cm to the right of its equilibrium position and released. If the spring constant is 100 N m<sup>−1</sup>, find the frequency of oscillation.`,
  steps([`${w2} = <i>k</i>/<i>m</i>`, `<i>f</i> = ${fr('1', '2π')}${sq(fr('<i>k</i>', '<i>m</i>'))} = ${fr('1', '2π')}${sq(fr('100', '0.200'))} = <b>3.56 Hz</b> &nbsp; (the 2.00 cm amplitude is not needed)`]))}
${example('19.4.2', `A 0.50 kg mass is attached to a spring of spring constant 20 N m<sup>−1</sup> and set oscillating. Find the period. What happens to the period if the spring is replaced by one four times as stiff?`,
  steps([`<i>T</i> = 2π${sq('0.50/20')} = 2π(0.158) = <b>0.99 s</b>`, `<i>T</i> ∝ 1/√<i>k</i>, so with <i>k</i> = 80 N m<sup>−1</sup> the period <b>halves</b> (0.50 s).`]))}
${h4('Simple pendulum')}
${fig(F.pend(), 'Figure 19.6: the component mg sin θ along the arc pulls the bob back towards the equilibrium position.')}
${steps([`Restoring force along the arc: <i>F</i> = −<i>mg</i> sin θ`, `For small angles (θ < 10°), sin θ ≈ θ = ${fr('<i>x</i>', '<i>l</i>')} (θ in radians)`, `<i>ma</i> = −<i>mg</i>${fr('<i>x</i>', '<i>l</i>')} ⇒ <i>a</i> = −${fr('<i>g</i>', '<i>l</i>')}<i>x</i>`, `Compare with <i>a</i> = −${w2}<i>x</i>: ω = ${sq(fr('<i>g</i>', '<i>l</i>'))}`])}
${key(`<i>T</i> = 2π${sq(fr('<i>l</i>', '<i>g</i>'))}`, 'depends only on the length <i>l</i> and on <i>g</i>, not on the mass of the bob or (for small angles) on the amplitude')}
${table(['', 'Spring–mass system', 'Simple pendulum'], [['Period', '<i>T</i> = 2π√(<i>m</i>/<i>k</i>)', '<i>T</i> = 2π√(<i>l</i>/<i>g</i>)'], ['Depends on', 'mass <i>m</i>, spring constant <i>k</i>', 'length <i>l</i>, gravitational acceleration <i>g</i>'], ['Does not depend on', 'amplitude <i>A</i> (and <i>g</i>)', 'mass of the bob, amplitude (small angles)']])}
${tip(`A heavier phone on a spring bounces more slowly, but a heavier pendulum bob swings at exactly the same rate. Always check which system the question describes before you choose the formula. On the Moon (smaller <i>g</i>) a pendulum clock runs slow; a spring–mass system keeps the same period.`)}
${sim('shmsys', 'Spring–mass system and simple pendulum', 'Change the mass, spring constant, length and g, and compare the two periods. Change the amplitude too: the period does not change. Try the Moon button.')}
${example('19.4.3', `A simple pendulum has a length of 1.00 m. Taking <i>g</i> = 9.81 ${ms2}, find its period. What length gives a period of 1.0 s?`,
  steps([`<i>T</i> = 2π${sq('1.00/9.81')} = <b>2.01 s</b>`, `<i>l</i> = <i>g</i>(<i>T</i>/2π)<sup>2</sup> = 9.81(1.0/2π)<sup>2</sup> = <b>0.25 m</b>`]))}
${example('19.4.4', `A student uses a simple pendulum of length 80.0 cm to determine <i>g</i>. There are 20 oscillations in 35.9 s. Find (a) the value of <i>g</i>, (b) the period if the experiment is done on the Moon, where the gravitational field strength is 1/6 of that on Earth.`,
  steps([`<i>T</i> = 35.9/20 = 1.795 s`, `(a) <i>T</i><sup>2</sup> = 4π<sup>2</sup>${fr('<i>l</i>', '<i>g</i>')} ⇒ <i>g</i> = ${fr('4π<sup>2</sup>(0.800)', '(1.795)<sup>2</sup>')} = <b>9.80 ${ms2}</b>`, `(b) <i>T</i><sup>2</sup><i>g</i> = constant: <i>T</i><sup>2</sup>(<i>g</i>/6) = (1.795)<sup>2</sup><i>g</i> ⇒ <i>T</i> = 1.795√6 = <b>4.40 s</b>`]))}
`)}

${sec('19-5', '19.5 Damped oscillation', `
${def('Damping', `is ${red('the decrease in amplitude of an oscillation caused by dissipative forces')} such as friction and air resistance.`)}
${ul([`Part of the energy of the system is used to overcome these resistive forces, and is lost as heat.`, `So the amplitude does not stay constant: it decreases gradually (exponentially) until the oscillation stops. Since <i>E</i> ∝ <i>A</i><sup>2</sup>, the energy decreases too.`, `A damped oscillation is therefore not perfect SHM.`])}
${fig(F.envelope(), 'Figure 19.7: under damping: the oscillation continues but the amplitude decreases with time.')}
${h4('Three types of damping')}
${fig(F.damp(), 'Figure 19.8: displacement against time for the three types of damping, each released from the same displacement.')}
${table(['Type', 'What happens', 'Example'], [['<b>Under damping</b> (light damping)', 'The system oscillates, with the amplitude decreasing with time until it becomes zero. It takes a long time to die away.', 'a mass oscillating in air; a plucked guitar string'], ['<b>Critical damping</b>', 'The system does not oscillate. It returns to the equilibrium position in the <b>shortest possible time</b>.', 'the shock absorbers of a car'], ['<b>Over damping</b> (heavy damping)', 'The system does not oscillate, but it takes a <b>long time</b> to return to equilibrium.', 'a car fuel gauge; bathroom scales; a heavy door closer']])}
${sim('damped', 'Damped oscillation', 'Increase the damping from none to under, critical and over damping. Watch the mass, the displacement–time graph and the energy. Critical damping brings the mass back to O fastest without overshooting.')}
`)}

${sec('19-6', '19.6 Forced oscillation and resonance', `
${table(['Free oscillation', 'Forced oscillation'], [['The system is displaced and released, then left alone: no driving force.', 'A periodic external force (the driving force) acts on the system continuously.'], ['It oscillates at its own <b>natural frequency</b> <i>f</i><sub>0</sub>.', 'After a short time, it oscillates at the <b>driving (forcing) frequency</b> <i>f</i>, not at <i>f</i><sub>0</sub>.'], ['Its amplitude depends only on the energy given at the start (it is damped gradually if there is resistance).', 'Its amplitude depends on how close <i>f</i> is to <i>f</i><sub>0</sub>.']])}
${def('Natural frequency', `is ${red('the frequency at which a system oscillates when there is no driving force and no damping')}. For a simple pendulum, <i>f</i><sub>0</sub> = ${fr('1', '2π')}${sq(fr('<i>g</i>', '<i>l</i>'))}.`)}
${h4('Barton’s pendulums')}
${fig(F.barton(), 'Figure 19.9: the driver pendulum D and pendulums X, Y, Z hang from the same string. Only Y has the same length as D.')}
${ul([`X, Y and Z are at rest at first. D is set swinging.`, `Energy is passed along the string, so X, Y and Z start to oscillate (forced oscillation), all at the frequency of D.`, `Y, with the same length (and so the same natural frequency) as D, oscillates with the <b>largest amplitude</b>. Y is in <b>resonance</b>.`])}
${def('Resonance', `occurs when ${red('the frequency of the driving force is equal to the natural frequency of the system')}. The system then absorbs energy from the driving force most efficiently, and the amplitude of oscillation is maximum.`)}
${key(`resonance: <i>f</i> = <i>f</i><sub>0</sub>`, 'the condition for resonance. This frequency is the resonance frequency.')}
${h4('Resonance and damping')}
${fig(F.res(), 'Figure 19.10: amplitude of the forced oscillation against driving frequency for different amounts of damping.')}
${ul([`Damping absorbs energy and reduces the effect of resonance.`, `As the damping increases, the amplitude at resonance decreases and the resonance peak becomes broader (flatter).`, `With heavier damping, the peak also moves slightly below <i>f</i><sub>0</sub>.`])}
${sim('resonance', 'Forced oscillation and resonance', 'Slowly change the driving frequency and watch the amplitude of the driven mass. The amplitude is largest when the driving frequency equals the natural frequency. Then increase the damping and see the peak fall and become broader.')}
${h4('Examples of resonance')}
${two(`<p><b>Destructive</b></p>${ul([`1940, Washington State, USA: the Tacoma Narrows suspension bridge collapsed about four months after opening. A strong wind drove the bridge into large oscillations.`, `1850, Angers, France: more than 200 soldiers died when a bridge they were marching over collapsed. This is why soldiers break step when they march across a bridge.`, `A singer can shatter a wine glass with a note at its natural frequency.`])}`,
`<p><b>Useful</b></p>${ul([`The tuning circuit of a radio or TV resonates at the frequency of the chosen station.`, `Wind instruments produce sound by making the air column inside resonate.`, `Microwave ovens heat food because water molecules absorb energy from the microwaves.`])}`)}
${tip(`Questions often ask for the condition for resonance. Write it as a full sentence: “the driving frequency is equal to the natural frequency of the system”.`)}
`)}

${sec('19-7', 'Summary', `
${table(['Subtopic', 'Key results'], [['19.1', '<i>F</i> = −<i>kx</i>; &nbsp; <i>a</i> = −ω<sup>2</sup><i>x</i>'], ['19.2', '<i>x</i> = <i>A</i> sin ω<i>t</i> or <i>A</i> cos ω<i>t</i>; &nbsp; <i>v</i> = ±ω√(<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>); &nbsp; <i>v</i><sub>max</sub> = ω<i>A</i>; &nbsp; <i>a</i><sub>max</sub> = ω<sup>2</sup><i>A</i>'], ['19.3', '<i>K</i> = ½<i>m</i>ω<sup>2</sup>(<i>A</i><sup>2</sup> − <i>x</i><sup>2</sup>); &nbsp; <i>U</i> = ½<i>m</i>ω<sup>2</sup><i>x</i><sup>2</sup>; &nbsp; <i>E</i> = ½<i>m</i>ω<sup>2</sup><i>A</i><sup>2</sup> (constant)'], ['19.4', '<i>T</i> = 2π√(<i>m</i>/<i>k</i>) (spring–mass); &nbsp; <i>T</i> = 2π√(<i>l</i>/<i>g</i>) (simple pendulum)'], ['19.5', 'amplitude and energy decrease; under, critical and over damping'], ['19.6', 'resonance when the driving frequency = natural frequency']])}
${ul([`Always match the given equation to <i>a</i> = −ω<sup>2</sup><i>x</i> first to find ω.`, `Keep every quantity in SI units (m, s) before substituting.`, `Use radians on your calculator for sin ω<i>t</i> and cos ω<i>t</i>.`, `<i>T</i> is independent of amplitude in SHM; it is damping that makes the amplitude decrease.`])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-19', { html: () => S });

  // ===================== simulations =====================
  const TAU = 2 * Math.PI;
  function springPath(ctx, x1, x2, y, n, amp) { ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 + 6, y); const s = (x2 - x1 - 12) / n; for (let i = 0; i < n; i++) ctx.lineTo(x1 + 6 + s * (i + 0.5), y + (i % 2 ? amp : -amp)); ctx.lineTo(x2 - 6, y); ctx.lineTo(x2, y); ctx.stroke(); }
  function trace(ctx, box, data, tmax, ymax, col, lab, U) {
    const { text } = U; ctx.fillStyle = '#fff'; ctx.fillRect(box.x, box.y, box.w, box.h); ctx.strokeStyle = '#E6E9DC'; ctx.lineWidth = 1; ctx.strokeRect(box.x, box.y, box.w, box.h);
    const my = box.y + box.h / 2; ctx.strokeStyle = '#1C2230'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(box.x, my); ctx.lineTo(box.x + box.w, my); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath(); data.forEach(([t, v], i) => { const X = box.x + t / tmax * box.w, Y = my - v / ymax * (box.h / 2 - 4); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    text(ctx, lab, box.x + 4, box.y + 13, { it: 1, b: 1, c: col, fs: 12 });
  }

  // ---------- 1. SHM with the reference circle ----------
  window.PhysiQSims.add('shm', function (root) {
    const U = window.PhysiQSims.U, { COL, fmt, el, slider, toggle, button, canvas, arrow, text, loop, readouts } = U;
    const S = { A: 0.10, T: 2.0, cos: false, t: 0, play: true, hist: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'amplitude <i>A</i>', 0.02, 0.15, 0.01, S.A, 'm', v => { S.A = v; reset(); });
    slider(ctl, 'period <i>T</i>', 1, 4, 0.1, S.T, 's', v => { S.T = v; reset(); });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre); pre.appendChild(el('span', 'sm-sl-l', 'at t = 0 the mass is'));
    const c1 = button(pre, 'at O, moving (x = A sin ωt)', 'sm-chip on', () => { S.cos = false; c1.classList.add('on'); c2.classList.remove('on'); reset(); });
    const c2 = button(pre, 'at x = A, at rest (x = A cos ωt)', 'sm-chip', () => { S.cos = true; c2.classList.add('on'); c1.classList.remove('on'); reset(); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    button(bar, '↺ Restart', '', reset);
    const ro = readouts(root), m = 0.5;
    function reset() { S.t = 0; S.hist = []; draw(); }
    const st = t => { const w = TAU / S.T, ph = w * t + (S.cos ? Math.PI / 2 : 0); return { w, ph, x: S.A * Math.sin(ph), v: S.A * w * Math.cos(ph), a: -S.A * w * w * Math.sin(ph) }; };
    function draw() {
      const nw = (root.clientWidth || 600) < 560, ctx = cv.ctx, { w, h } = cv.size(nw ? 1.7 : 0.62, 380, nw ? 700 : 520); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const q = st(S.t), narrow = w < 560, R = narrow ? Math.min(62, w * 0.17) : Math.min(80, h * 0.2), cx = R + 22, cy = R + 24, sc = R / 0.15 * (0.15 / Math.max(S.A, 0.15));
      const rA = S.A / 0.15 * R;
      // reference circle (horizontal diameter: projection onto x)
      ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(cx, cy, rA, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - R - 8, cy); ctx.lineTo(cx + R + 8, cy); ctx.stroke();
      const th = q.ph - Math.PI / 2, px = cx + rA * Math.sin(q.ph), py = cy - rA * Math.cos(q.ph);
      ctx.strokeStyle = COL.sub; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke(); ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke(); text(ctx, 'P', px + 9, py - 6, { b: 1 });
      ctx.beginPath(); ctx.arc(px, cy, 5, 0, 7); ctx.fillStyle = COL.ball; ctx.fill(); ctx.stroke(); text(ctx, 'Q', px + 6, cy + 16, { b: 1, fs: 11 });
      text(ctx, 'reference circle', 8, 14, { fs: 11, c: COL.sub });
      // spring and mass below/next to it, same x scale
      const sy = narrow ? cy + R + 52 : cy + R + 56, wall = cx - R - 14 < 6 ? 6 : cx - R - 14;
      const bx = cx + q.x / 0.15 * R;
      ctx.fillStyle = '#CFC6A8'; ctx.fillRect(wall - 6, sy - 22, 6, 44); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1.6; springPath(ctx, wall, bx - 16, sy, 10, 8);
      ctx.fillStyle = '#BFE6E0'; ctx.fillRect(bx - 16, sy - 16, 32, 32); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.strokeRect(bx - 16, sy - 16, 32, 32); text(ctx, 'm', bx, sy + 5, { a: 'center', it: 1 });
      ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wall, sy + 17); ctx.lineTo(cx + R + 30, sy + 17); ctx.stroke();
      ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(cx, sy - 26); ctx.lineTo(cx, sy + 22); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'O', cx, sy + 32, { a: 'center', fs: 11 });
      if (Math.abs(q.v) > 1e-3) arrow(ctx, bx, sy - 24, bx + q.v / (S.A * q.w) * 30, sy - 24, COL.o, 2.4);
      if (Math.abs(q.a) > 1e-3) arrow(ctx, bx, sy + 26, bx + q.a / (S.A * q.w * q.w) * 30, sy + 26, COL.r, 2.4);
      text(ctx, 'v', bx + 2, sy - 30, { it: 1, b: 1, c: COL.o, fs: 11 }); text(ctx, 'a', bx + 2, sy + 44, { it: 1, b: 1, c: COL.r, fs: 11 });
      // graphs
      const gx = narrow ? 12 : cx + R + 48, gy = narrow ? sy + 56 : 14, gw = w - gx - 12, gh = narrow ? (h - gy - 10) / 3 - 6 : (h - 28) / 3 - 8;
      if (gh > 30) {
        const tmax = 2 * S.T, hs = S.hist;
        trace(ctx, { x: gx, y: gy, w: gw, h: gh }, hs.map(p => [p[0], p[1]]), tmax, S.A * 1.1, COL.v, 'x', U);
        trace(ctx, { x: gx, y: gy + gh + 8, w: gw, h: gh }, hs.map(p => [p[0], p[2]]), tmax, S.A * q.w * 1.1, COL.o, 'v', U);
        trace(ctx, { x: gx, y: gy + 2 * (gh + 8), w: gw, h: gh }, hs.map(p => [p[0], p[3]]), tmax, S.A * q.w * q.w * 1.1, COL.r, 'a', U);
        text(ctx, 't → (two periods)', gx + gw, gy + 3 * (gh + 8) - 10, { a: 'right', fs: 10, c: COL.sub });
      }
      const K = 0.5 * m * q.v * q.v, Uu = 0.5 * m * q.w * q.w * q.x * q.x;
      ro([['t', fmt(S.t % (2 * S.T), 2) + ' s'], ['ω = 2π/T', fmt(q.w, 2) + ' rad/s'], ['x', fmt(q.x * 100, 1) + ' cm'], ['v', fmt(q.v, 3) + ' m/s', 'o'], ['a = −ω²x', fmt(q.a, 3) + ' m/s²'], ['K (m = 0.5 kg)', fmt(K * 1000, 1) + ' mJ'], ['U', fmt(Uu * 1000, 1) + ' mJ'], ['E = K + U', fmt((K + Uu) * 1000, 1) + ' mJ', 'hl']]);
    }
    loop(cv, dt => { if (S.play) { S.t += dt; const tm = S.t % (2 * S.T); if (S.hist.length && tm < S.hist[S.hist.length - 1][0]) S.hist = []; const q = st(S.t); S.hist.push([tm, q.x, q.v, q.a]); } draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. spring-mass and pendulum periods ----------
  window.PhysiQSims.add('shmsys', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { m: 0.5, k: 20, l: 1.0, g: 9.81, amp: 0.6, t: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'mass <i>m</i>', 0.1, 2, 0.1, S.m, 'kg', v => { S.m = v; });
    slider(ctl, 'spring constant <i>k</i>', 5, 80, 1, S.k, 'N/m', v => { S.k = v; });
    slider(ctl, 'pendulum length <i>l</i>', 0.2, 2, 0.05, S.l, 'm', v => { S.l = v; });
    const sg = slider(ctl, 'g', 1.6, 9.8, 0.1, S.g, 'm/s²', v => { S.g = v; });
    slider(ctl, 'amplitude', 0.2, 1, 0.1, S.amp, '× max', v => { S.amp = v; });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    button(pre, 'Earth (g = 9.81)', 'sm-chip', () => { S.g = 9.81; sg.set(9.8); });
    button(pre, 'Moon (g = 1.62)', 'sm-chip', () => { S.g = 1.62; sg.set(1.6); });
    button(pre, '↺ Start together', 'sm-chip', () => { S.t = 0; });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 300, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const Ts = 2 * Math.PI * Math.sqrt(S.m / S.k), Tp = 2 * Math.PI * Math.sqrt(S.l / S.g), half = w / 2;
      // vertical spring
      const top = 30, eqY = top + (h - 110) * 0.55, Amp = Math.min(60, (h - 110) * 0.35) * S.amp, y = eqY + Amp * Math.cos(2 * Math.PI * S.t / Ts), sx = half / 2;
      ctx.fillStyle = '#CFC6A8'; ctx.fillRect(sx - 40, top - 8, 80, 8); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1.6;
      ctx.save(); ctx.translate(sx, 0); ctx.rotate(Math.PI / 2); springPath(ctx, top, y - 18, 0, 12, 9); ctx.restore();
      const bs = 22 + S.m * 8; ctx.fillStyle = '#BFE6E0'; ctx.fillRect(sx - bs / 2, y - 18, bs, 36); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.strokeRect(sx - bs / 2, y - 18, bs, 36); text(ctx, fmt(S.m, 1) + ' kg', sx + bs / 2 + 6, y + 4, { fs: 11, b: 1 });
      ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.gr; ctx.beginPath(); ctx.moveTo(sx - 60, eqY); ctx.lineTo(sx + 60, eqY); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'equilibrium', sx + 62, eqY + 4, { fs: 10, c: COL.gr });
      text(ctx, 'T = 2π√(m/k) = ' + fmt(Ts, 2) + ' s', sx, h - 18, { a: 'center', b: 1, c: COL.v, fs: 13 });
      // pendulum
      const px = half + half / 2, Lpx = Math.min(h - 110, 60 + S.l * 110), th = 0.25 * S.amp * Math.cos(2 * Math.PI * S.t / Tp), bxp = px + Lpx * Math.sin(th), byp = top + Lpx * Math.cos(th);
      ctx.fillStyle = COL.ink; ctx.fillRect(px - 40, top - 8, 80, 6); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(px, top - 2); ctx.lineTo(bxp, byp); ctx.stroke();
      ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.gr; ctx.beginPath(); ctx.moveTo(px, top); ctx.lineTo(px, top + Lpx + 14); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(bxp, byp, 12, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke();
      text(ctx, 'T = 2π√(l/g) = ' + fmt(Tp, 2) + ' s', px, h - 18, { a: 'center', b: 1, c: COL.o, fs: 13 });
      ctx.strokeStyle = '#E6E9DC'; ctx.beginPath(); ctx.moveTo(half, 10); ctx.lineTo(half, h - 40); ctx.stroke();
      ro([['spring–mass period', fmt(Ts, 2) + ' s', 'hl'], ['spring–mass frequency', fmt(1 / Ts, 2) + ' Hz'], ['pendulum period', fmt(Tp, 2) + ' s', 'hl'], ['pendulum frequency', fmt(1 / Tp, 2) + ' Hz'], ['the pendulum does not depend on', 'mass, amplitude']]);
    }
    loop(cv, dt => { S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. damped oscillation ----------
  window.PhysiQSims.add('damped', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const w0 = TAU / 1.6, S = { z: 0.1, t: 0, x: 1, v: 0, hist: [], E0: 1 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sz = slider(ctl, 'damping (ζ, 1 = critical)', 0, 3, 0.02, S.z, '', v => { S.z = v; restart(); });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    [['No damping', 0], ['Under damping', 0.12], ['Critical damping', 1], ['Over damping', 2.5]].forEach(([n, z]) => button(pre, n, 'sm-chip', () => { S.z = z; sz.set(z); restart(); }));
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar); button(bar, '↺ Release again', 'sm-main', restart);
    const cv = canvas(root); const ro = readouts(root), TM = 8;
    function restart() { S.t = 0; S.x = 1; S.v = 0; S.hist = [[0, 1]]; }
    restart();
    function step(dt) { const n = 8, h = dt / n; for (let i = 0; i < n; i++) { const a = -w0 * w0 * S.x - 2 * S.z * w0 * S.v; S.v += a * h; S.x += S.v * h; } S.t += dt; if (S.t <= TM) S.hist.push([S.t, S.x]); }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 300, 400); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const my = 44, cx = w / 2, R = Math.min(w * 0.35, 150), bx = cx + S.x * R;
      ctx.fillStyle = '#CFC6A8'; ctx.fillRect(cx - R - 50, my - 22, 6, 44); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1.6; springPath(ctx, cx - R - 44, bx - 16, my, 12, 8);
      ctx.fillStyle = '#BFE6E0'; ctx.fillRect(bx - 16, my - 16, 32, 32); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.strokeRect(bx - 16, my - 16, 32, 32);
      ctx.setLineDash([3, 3]); ctx.strokeStyle = COL.sub; ctx.beginPath(); ctx.moveTo(cx, my - 24); ctx.lineTo(cx, my + 24); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'O', cx, my + 36, { a: 'center', fs: 11 });
      const box = { x: 40, y: 92, w: w - 56, h: h - 120 }, X = t => box.x + t / TM * box.w, Y = x => box.y + box.h / 2 - x * (box.h / 2 - 6);
      ctx.fillStyle = '#fff'; ctx.fillRect(box.x, box.y, box.w, box.h); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(box.x, Y(0)); ctx.lineTo(box.x + box.w, Y(0)); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.stroke();
      if (S.z > 0 && S.z < 1) { ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.r; ctx.lineWidth = 1.2; [1, -1].forEach(sg => { ctx.beginPath(); for (let i = 0; i <= 100; i++) { const t = TM * i / 100, e = sg * Math.exp(-S.z * w0 * t) / Math.sqrt(1 - S.z * S.z); i ? ctx.lineTo(X(t), Y(Math.max(-1.05, Math.min(1.05, e)))) : ctx.moveTo(X(t), Y(Math.min(1.05, Math.max(-1.05, e)))); } ctx.stroke(); }); ctx.setLineDash([]); }
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); S.hist.forEach(([t, x], i) => i ? ctx.lineTo(X(t), Y(x)) : ctx.moveTo(X(t), Y(x))); ctx.stroke();
      text(ctx, 'x', box.x - 14, box.y + 12, { it: 1, b: 1 }); text(ctx, 't', box.x + box.w, box.y + box.h + 16, { it: 1, a: 'right', c: COL.sub });
      const kind = S.z === 0 ? 'no damping: SHM, constant amplitude' : S.z < 0.98 ? 'under damping: oscillates, amplitude decreases' : S.z <= 1.02 ? 'critical damping: back to O in the shortest time, no oscillation' : 'over damping: no oscillation, slow return to O';
      text(ctx, kind, w - 12, box.y - 8, { a: 'right', b: 1, fs: 12, c: S.z === 0 ? COL.gr : S.z < 0.98 ? COL.v : S.z <= 1.02 ? COL.gr : COL.o });
      const E = 0.5 * (S.v * S.v / (w0 * w0) + S.x * S.x) / 0.5;
      ro([['time', fmt(Math.min(S.t, 99), 1) + ' s'], ['displacement', fmt(S.x, 2) + ' × A₀'], ['energy left', fmt(E * 100, 0) + ' %', 'hl']]);
    }
    loop(cv, dt => { step(dt); draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 4. forced oscillation and resonance ----------
  window.PhysiQSims.add('resonance', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const f0 = 1.0, S = { r: 0.5, z: 0.08, t: 0, x: 0, v: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'driving frequency <i>f</i>', 0.2, 2, 0.02, S.r, 'Hz', v => { S.r = v; });
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre); pre.appendChild(el('span', 'sm-sl-l', 'damping'));
    const chips = [['light', 0.08], ['medium', 0.2], ['heavy', 0.5]].map(([n, z]) => { const b = button(pre, n, 'sm-chip' + (z === S.z ? ' on' : ''), () => { S.z = z; chips.forEach(c => c.classList.toggle('on', c === b)); }); return b; });
    const cv = canvas(root); const ro = readouts(root);
    const amp = (r, z) => 1 / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2);
    function step(dt) { const w0 = TAU * f0, wd = TAU * S.r, n = 10, h = dt / n; for (let i = 0; i < n; i++) { const a = -w0 * w0 * S.x - 2 * S.z * w0 * S.v + w0 * w0 * 0.08 * Math.cos(wd * S.t); S.v += a * h; S.x += S.v * h; S.t += h; } }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 320, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const narrow = w < 520, lw = narrow ? w : w * 0.38;
      // driver (top bar moving) and spring with mass hanging
      const cx = lw / 2, drv = 0.08 * Math.cos(TAU * S.r * S.t), sc = narrow ? 90 : 110, topY = 34 + drv * sc;
      ctx.fillStyle = COL.o; ctx.fillRect(cx - 40, topY - 8, 80, 8); text(ctx, 'driver', cx + 46, topY, { fs: 11, c: COL.o });
      const eqY = topY + 0 + (narrow ? 90 : 120), my = 34 + (narrow ? 90 : 120) + Math.max(-1.2, Math.min(1.2, S.x)) * sc * 0.55;
      ctx.strokeStyle = COL.sub; ctx.lineWidth = 1.6; ctx.save(); ctx.translate(cx, 0); ctx.rotate(Math.PI / 2); springPath(ctx, topY, my - 16, 0, 12, 8); ctx.restore();
      ctx.fillStyle = '#BFE6E0'; ctx.fillRect(cx - 18, my - 16, 36, 32); ctx.strokeStyle = COL.ink; ctx.strokeRect(cx - 18, my - 16, 36, 32);
      // resonance curve
      const box = narrow ? { x: 44, y: (narrow ? 34 + 90 + 90 : 0), w: w - 60, h: h - (34 + 180) - 30 } : { x: lw + 30, y: 24, w: w - lw - 46, h: h - 60 };
      if (box.h > 60) {
        const fmax = 2, Amax = 7, X = f => box.x + f / fmax * box.w, Y = a => box.y + box.h - Math.min(a, Amax) / Amax * box.h;
        ctx.fillStyle = '#fff'; ctx.fillRect(box.x, box.y, box.w, box.h); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.stroke();
        [[0.08, '#C9C5F5'], [0.2, '#F7C9AE'], [0.5, '#BFD9A8']].forEach(([z, c]) => { ctx.strokeStyle = z === S.z ? (z === 0.08 ? COL.v : z === 0.2 ? COL.o : COL.gr) : c; ctx.lineWidth = z === S.z ? 2.8 : 1.4; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const f = 0.05 + (fmax - 0.05) * i / 200; i ? ctx.lineTo(X(f), Y(amp(f / f0, z))) : ctx.moveTo(X(f), Y(amp(f / f0, z))); } ctx.stroke(); });
        ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(f0), box.y); ctx.lineTo(X(f0), box.y + box.h); ctx.stroke(); ctx.setLineDash([]);
        text(ctx, 'f₀', X(f0), box.y + box.h + 14, { a: 'center', it: 1, fs: 12 }); text(ctx, 'driving frequency', box.x + box.w, box.y + box.h + 28, { a: 'right', fs: 11, c: COL.sub }); text(ctx, 'amplitude', box.x, box.y - 6, { fs: 11, b: 1 });
        const a = amp(S.r / f0, S.z); ctx.beginPath(); ctx.arc(X(S.r), Y(a), 6, 0, 7); ctx.fillStyle = COL.r; ctx.fill();
        if (Math.abs(S.r - f0) < 0.03) text(ctx, 'RESONANCE: f = f₀', X(f0) + 8, box.y + 14, { b: 1, c: COL.r, fs: 12 });
      }
      const a = amp(S.r / f0, S.z);
      ro([['natural frequency f₀', fmt(f0, 2) + ' Hz'], ['driving frequency f', fmt(S.r, 2) + ' Hz', 'hl'], ['steady amplitude', fmt(a, 1) + ' × driver', 'hl'], ['the mass oscillates at', fmt(S.r, 2) + ' Hz (= f)']]);
    }
    loop(cv, dt => { step(dt); draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
