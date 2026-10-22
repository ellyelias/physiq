/* Semester 2 Chapter 18 Alternating Current Circuits: full notes by Cikgu Suhaili (from the Unit 8 Alternating Current slides).
   App chapter 18 = STPM 2026 syllabus chapter 19. Following the syllabus, the current is derived from a sinusoidal
   voltage V = V0 sin ωt for each element (the slides start from the current), and the derivations of the r.m.s. value
   and of the resonance frequency are written out in full. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const arr = (x1, y1, x2, y2, c = 'r', w = 2.4) => L(x1, y1, x2, y2, c, 'e', { w });
  const sub0 = s => `${s}<sub>0</sub>`, rms = s => `${s}<sub>rms</sub>`;
  const PI = Math.PI;

  // ---------- figures ----------
  const F = {};
  const wave = (x0, y0, w, a, ph = 0, cyc = 2) => { let d = ''; for (let i = 0; i <= 120; i++) { const t = i / 120 * cyc * 2 * PI; d += (i ? 'L' : 'M') + (x0 + w * i / 120).toFixed(1) + ',' + (y0 - a * Math.sin(t + ph)).toFixed(1); } return d; };
  F.ac = () => svg(320, 150, L(30, 75, 300, 75, 'k', 'e', { w: 1.2 }) + L(30, 140, 30, 10, 'k', 'e', { w: 1.2 }) + P(wave(30, 75, 240, 50, 0, 2), 'v', { w: 2.4 }) +
    L(26, 25, 34, 25, 'k') + T(24, 29, 'I₀', { fs: 12, a: 'end' }) + L(26, 125, 34, 125, 'k') + T(24, 129, '−I₀', { fs: 12, a: 'end' }) + T(300, 92, 't', { fs: 13, it: 1 }) + T(40, 16, 'I', { fs: 13, it: 1, b: 1, a: 'start' }) +
    L(30, 140, 150, 140, 's', 'b', { w: 1 }) + T(90, 136, 'T = 1/f', { fs: 11, c: C.sub }), 320);
  F.phasor = () => {
    const cx = 80, cy = 80, r = 55, a = 40 * PI / 180, px = cx + r * Math.cos(a), py = cy - r * Math.sin(a);
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="1.4"/>` + arr(cx, cy, px, py, 'v', 2.6) + L(px, py, px, cy, 's', '', { w: 1, d: '4 3' }) + L(px, py, 210 + 40 / 360 * 100, py, 's', '', { w: 1, d: '4 3' });
    s += P(`M${cx + 22},${cy} A22,22 0 0 0 ${cx + 22 * Math.cos(a)},${cy - 22 * Math.sin(a)}`, 'k', { w: 1.2 }) + T(cx + 30, cy - 6, 'ωt', { fs: 11, it: 1, a: 'start' }) + T(px + 6, py - 6, 'A₀', { fs: 12, b: 1, c: C.v, a: 'start' });
    s += P(`M${cx + r * 0.75},${cy - r * 0.95} A${r},${r} 0 0 0 ${cx + r * 0.3},${cy - r * 1.12}`, 'o', { w: 1.4, a: 'o' }) + T(cx + r * 0.85, cy - r * 1.05, 'ω', { fs: 12, it: 1, c: C.o, a: 'start' });
    s += L(210, cy, 330, cy, 'k', 'e', { w: 1.2 }) + L(210, cy + 60, 210, cy - 64, 'k', 'e', { w: 1.2 }) + P(wave(210, cy, 100, r, 0, 1), 'v', { w: 2.2 }) + T(330, cy + 16, 't', { fs: 12, it: 1 }) + T(270, 158, 'projection = A₀ sin ωt', { fs: 11, c: C.sub });
    return svg(340, 165, s, 340);
  };
  // element panel: circuit symbol, phasor diagram and V, I graphs
  const element = (kind) => {
    const ph = kind === 'R' ? 0 : kind === 'C' ? PI / 2 : -PI / 2;   // phase of I relative to V
    let sym = '';
    if (kind === 'R') sym = `<rect x="36" y="22" width="44" height="16" fill="#fff" stroke="${C.ink}" stroke-width="1.8"/>`;
    if (kind === 'C') sym = L(54, 14, 54, 46, 'k', '', { w: 2.4 }) + L(64, 14, 64, 46, 'k', '', { w: 2.4 });
    if (kind === 'L') sym = `<path d="M36,30 q6,-14 12,0 q6,-14 12,0 q6,-14 12,0 q6,-14 12,0" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    let s = L(10, 30, 36, 30, 'k', '', { w: 1.8 }) + L(kind === 'C' ? 64 : 80, 30, 110, 30, 'k', '', { w: 1.8 }) + (kind === 'C' ? L(36, 30, 54, 30, 'k', '', { w: 1.8 }) : '') + sym;
    s += `<circle cx="60" cy="74" r="11" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/><path d="M53,74 q3.5,-7 7,0 q3.5,7 7,0" fill="none" stroke="${C.ink}" stroke-width="1.4"/>` + L(10, 30, 10, 74, 'k', '', { w: 1.8 }) + L(10, 74, 49, 74, 'k', '', { w: 1.8 }) + L(71, 74, 110, 74, 'k', '', { w: 1.8 }) + L(110, 74, 110, 30, 'k', '', { w: 1.8 });
    // phasors: V along the horizontal reference here, I at angle ph
    const cx = 60, cy = 150, r = 40;
    s += arr(cx, cy, cx + r, cy, 'v', 2.6) + T(cx + r + 4, cy + 4, 'V', { fs: 12, b: 1, c: C.v, a: 'start' });
    const ix = cx + 0.8 * r * Math.cos(ph), iy = cy - 0.8 * r * Math.sin(ph);
    s += arr(cx, cy + (kind === 'R' ? 6 : 0), ix, iy + (kind === 'R' ? 6 : 0), 'r', 2.6) + T(ix + (kind === 'R' ? 4 : 8), iy + (kind === 'R' ? 20 : 4), 'I', { fs: 12, b: 1, c: C.r, a: 'start' });
    if (kind !== 'R') s += P(`M${cx + 16},${cy} A16,16 0 0 ${kind === 'C' ? 0 : 1} ${cx},${cy - (kind === 'C' ? 16 : -16)}`, 'k', { w: 1.1 }) + T(cx + 20, cy + (kind === 'C' ? -14 : 24), 'π/2', { fs: 11, a: 'start' });
    // graphs
    const gx = 130, gy = 110, gw = 190;
    s += L(gx, gy, gx + gw + 8, gy, 'k', 'e', { w: 1.1 }) + L(gx, gy + 56, gx, gy - 60, 'k', 'e', { w: 1.1 }) + P(wave(gx, gy, gw, 46, 0, 1.5), 'v', { w: 2.2 }) + P(wave(gx, gy, gw, 30, ph, 1.5), 'r', { w: 2.2, d: kind === 'R' ? '' : '' }) + T(gx + gw + 8, gy + 16, 't', { fs: 12, it: 1 });
    s += T(gx + 6, gy - 50, 'V', { fs: 12, b: 1, c: C.v, a: 'start' }) + T(gx + 22, gy - 50, 'I', { fs: 12, b: 1, c: C.r, a: 'start' });
    const title = kind === 'R' ? 'resistor: V and I in phase' : kind === 'C' ? 'capacitor: I leads V by π/2' : 'inductor: I lags V by π/2';
    s += T(170, 190, title, { fs: 12, b: 1 });
    return svg(340, 198, s, 340);
  };
  F.powR = () => { let d = ''; const x0 = 30, y0 = 110, w = 260; for (let i = 0; i <= 120; i++) { const t = i / 120 * 4 * PI; d += (i ? 'L' : 'M') + (x0 + w * i / 120).toFixed(1) + ',' + (y0 - 80 * Math.sin(t / 2) ** 2).toFixed(1); }
    return svg(320, 130, L(x0, y0, x0 + w + 10, y0, 'k', 'e', { w: 1.2 }) + L(x0, y0 + 8, x0, 16, 'k', 'e', { w: 1.2 }) + P(d, 'o', { w: 2.4 }) + L(x0, y0 - 40, x0 + w, y0 - 40, 'g', '', { w: 1.6, d: '6 4' }) + T(x0 + w, y0 - 46, 'mean = ½P₀', { fs: 11, b: 1, c: C.g, a: 'end' }) + T(x0 - 4, 34, 'P₀', { fs: 11, a: 'end' }) + T(x0 + w + 10, y0 + 16, 't', { fs: 12, it: 1 }) + T(x0 + 6, 16, 'P', { fs: 12, it: 1, b: 1, a: 'start' }), 320); };
  F.powLC = () => { let d = ''; const x0 = 30, y0 = 70, w = 260; for (let i = 0; i <= 120; i++) { const t = i / 120 * 4 * PI; d += (i ? 'L' : 'M') + (x0 + w * i / 120).toFixed(1) + ',' + (y0 - 46 * Math.sin(t)).toFixed(1); }
    return svg(320, 140, L(x0, y0, x0 + w + 10, y0, 'k', 'e', { w: 1.2 }) + L(x0, 126, x0, 12, 'k', 'e', { w: 1.2 }) + P(d, 'o', { w: 2.4 }) + T(x0 + w, y0 - 8, 'mean = 0', { fs: 11, b: 1, c: C.g, a: 'end' }) + T(x0 + 50, 18, 'energy stored', { fs: 10.5, c: C.sub }) + T(x0 + 120, 132, 'energy returned', { fs: 10.5, c: C.sub }) + T(x0 + w + 10, y0 + 16, 't', { fs: 12, it: 1 }), 320); };
  const triangle = (kind) => {
    // phasor diagram (current along the reference) and impedance triangle
    const ox = 40, oy = kind === 'RC' ? 40 : 120, R = 110, X = 70;
    const up = kind === 'RC' ? -1 : 1;   // RC: V below I; RL: V above I
    let s = arr(ox, oy, ox + R, oy, 'g', 2.4) + T(ox + R / 2, oy + (kind === 'RC' ? -8 : 18), 'V_R', { fs: 12, b: 1, c: C.g }) + arr(ox + R + 30, oy, ox + R + 70, oy, 'r', 2.2) + T(ox + R + 76, oy + 4, 'I', { fs: 12, b: 1, c: C.r, a: 'start' });
    s += arr(ox + R, oy, ox + R, oy - up * X, kind === 'RC' ? 'o' : 'v', 2.4) + T(ox + R + 6, oy - up * X / 2 + 4, kind === 'RC' ? 'V_C' : 'V_L', { fs: 12, b: 1, c: kind === 'RC' ? C.o : C.v, a: 'start' });
    s += arr(ox, oy, ox + R, oy - up * X, 'k', 2.6) + T(ox + R / 2 - 12, oy - up * X / 2 - (kind === 'RC' ? -14 : 10), 'V', { fs: 13, b: 1, it: 1 });
    s += P(`M${ox + 28},${oy} A28,28 0 0 ${kind === 'RC' ? 1 : 0} ${ox + 28 * Math.cos(Math.atan(X / R))},${oy - up * 28 * Math.sin(Math.atan(X / R))}`, 'k', { w: 1.1 }) + T(ox + 36, oy - up * 8 + 4, 'φ', { fs: 13, it: 1, a: 'start' });
    s += T(110, 156, kind === 'RC' ? 'R-C: V lags I by φ' : 'R-L: V leads I by φ', { fs: 12, b: 1 });
    return svg(240, 164, s, 240);
  };
  F.rc = () => two(triangle('RC'), svg(240, 164, L(40, 40, 150, 40, 'k', '', { w: 2.4 }) + L(150, 40, 150, 110, 'o', '', { w: 2.4 }) + L(40, 40, 150, 110, 'v', '', { w: 2.6 }) + T(95, 32, 'R', { fs: 13, it: 1, b: 1 }) + T(158, 80, 'X_C', { fs: 13, it: 1, b: 1, c: C.o, a: 'start' }) + T(84, 90, 'Z', { fs: 13, it: 1, b: 1, c: C.v }) + T(66, 56, 'φ', { fs: 13, it: 1 }) + T(120, 156, 'impedance triangle', { fs: 12, b: 1 }), 240));
  F.rl = () => two(triangle('RL'), svg(240, 164, L(40, 120, 150, 120, 'k', '', { w: 2.4 }) + L(150, 120, 150, 50, 'v', '', { w: 2.4 }) + L(40, 120, 150, 50, 'o', '', { w: 2.6 }) + T(95, 138, 'R', { fs: 13, it: 1, b: 1 }) + T(158, 90, 'X_L', { fs: 13, it: 1, b: 1, c: C.v, a: 'start' }) + T(84, 76, 'Z', { fs: 13, it: 1, b: 1, c: C.o }) + T(66, 112, 'φ', { fs: 13, it: 1 }) + T(120, 156, 'impedance triangle', { fs: 12, b: 1 }), 240));
  F.rlc = () => {
    const ox = 50, oy = 110, R = 120, XL = 90, XC = 40;
    let s = arr(ox, oy, ox + R, oy, 'g', 2.4) + T(ox + R / 2, oy + 18, 'V_R', { fs: 12, b: 1, c: C.g }) + arr(ox + R + 36, oy, ox + R + 76, oy, 'r', 2.2) + T(ox + R + 82, oy + 4, 'I', { fs: 12, b: 1, c: C.r, a: 'start' });
    s += arr(ox, oy, ox, oy - XL, 'v', 2.4) + T(ox - 6, oy - XL + 6, 'V_L', { fs: 12, b: 1, c: C.v, a: 'end' }) + arr(ox, oy, ox, oy + XC, 'o', 2.4) + T(ox - 6, oy + XC, 'V_C', { fs: 12, b: 1, c: C.o, a: 'end' });
    s += L(ox + R, oy, ox + R, oy - (XL - XC), 's', 'e', { w: 1.8, d: '5 3' }) + T(ox + R + 6, oy - (XL - XC) / 2, 'V_L − V_C', { fs: 11.5, c: C.sub, a: 'start' }) + arr(ox, oy, ox + R, oy - (XL - XC), 'k', 2.6) + T(ox + R / 2 - 10, oy - (XL - XC) / 2 - 12, 'V', { fs: 13, b: 1, it: 1 }) + T(ox + 34, oy - 6, 'φ', { fs: 13, it: 1, a: 'start' });
    return svg(300, 170, s + T(150, 166, 'X_L > X_C: V leads I by φ', { fs: 12, b: 1 }), 300);
  };
  F.zf = () => {
    const g = (title, f) => { let d = ''; for (let i = 1; i <= 80; i++) { const x = i / 80; d += (i > 1 ? 'L' : 'M') + (30 + 120 * x).toFixed(1) + ',' + (110 - Math.min(95, f(x))).toFixed(1); } return svg(170, 140, axes(30, 110, 130, 88, 'f', 'Z', { noO: 0 }) + L(30, 90, 150, 90, 's', '', { w: 1, d: '4 3' }) + T(156, 94, 'R', { fs: 11, it: 1, a: 'start' }) + P(d, 'v', { w: 2.4 }) + T(85, 134, title, { fs: 11, b: 1 }), 170); };
    return two(g('R-C: Z falls towards R', x => 20 + 6 / x), g('R-L: Z rises with f', x => 20 + 90 * x * x / (1 + x)));
  };
  F.res = () => {
    let xl = '', xc = '', z = ''; const x0 = 40, y0 = 150, w = 260;
    for (let i = 1; i <= 100; i++) { const f = i / 100 * 2; const XL = 60 * f, XC = 60 / f, Z = Math.sqrt(20 * 20 + (XL - XC) ** 2); const X = x0 + w * f / 2;
      xl += (i > 1 ? 'L' : 'M') + X.toFixed(1) + ',' + (y0 - Math.min(140, XL)).toFixed(1); xc += (i > 1 ? 'L' : 'M') + X.toFixed(1) + ',' + (y0 - Math.min(140, XC)).toFixed(1); z += (i > 1 ? 'L' : 'M') + X.toFixed(1) + ',' + (y0 - Math.min(140, Z)).toFixed(1); }
    let s = L(x0, y0, x0 + w + 12, y0, 'k', 'e', { w: 1.2 }) + L(x0, y0 + 4, x0, 6, 'k', 'e', { w: 1.2 }) + P(xl, 'v', { w: 2 }) + P(xc, 'o', { w: 2 }) + P(z, 'ink', { w: 2.6 }) + L(x0, y0 - 20, x0 + w, y0 - 20, 'g', '', { w: 1.6, d: '6 4' });
    s += T(x0 + w, 30, 'X_L ∝ f', { fs: 11, b: 1, c: C.v, a: 'end' }) + T(x0 + 34, 20, 'X_C ∝ 1/f', { fs: 11, b: 1, c: C.o, a: 'start' }) + T(x0 + w, y0 - 26, 'R', { fs: 11, b: 1, c: C.g, a: 'end' }) + T(x0 + w - 60, 64, 'Z', { fs: 13, b: 1, it: 1 });
    s += L(x0 + w / 2, y0 - 2, x0 + w / 2, y0 + 4, 'k') + T(x0 + w / 2, y0 + 16, 'f₀', { fs: 12, it: 1 }) + T(x0 + w + 12, y0 + 16, 'f', { fs: 12, it: 1 }) + T(x0 + w / 2 + 6, y0 - 26, 'Z = R', { fs: 11, c: C.sub, a: 'start' });
    return svg(320, 172, s, 320);
  };

  const S = `
${sec('18-1', '19.1 Alternating current through a resistor', `
<p>An <b>alternating current</b> (a.c.) changes its magnitude and direction periodically. The output of an a.c. generator is sinusoidal:</p>
${eq(`<i>V</i> = <i>V</i><sub>0</sub> sin ω<i>t</i> &nbsp;&nbsp;&nbsp; <i>I</i> = <i>I</i><sub>0</sub> sin ω<i>t</i> &nbsp;&nbsp;&nbsp; ω = 2π<i>f</i> = ${fr('2π', '<i>T</i>')}`)}
${fig(F.ac(), 'Figure 19.1: a sinusoidal alternating current with peak value I₀ and period T.')}
${ul([`<i>V</i>, <i>I</i>: instantaneous values; <i>V</i><sub>0</sub>, <i>I</i><sub>0</sub>: peak values; ω: angular frequency (rad s<sup>−1</sup>); <i>f</i>: frequency (Hz).`])}
${h4('Phasors')}
${fig(F.phasor(), 'Figure 19.2: a phasor of length A₀ rotating anticlockwise at ω. Its vertical projection is A₀ sin ωt.')}
<p>A <b>phasor</b> is a vector that rotates anticlockwise at the angular frequency ω. Its length is the peak value and its projection on the vertical axis gives the instantaneous value. A <b>phasor diagram</b> shows the phase difference between voltage and current.</p>

${h4('Root mean square (r.m.s.) value')}
${def('r.m.s. current, <i>I</i><sub>rms</sub>', `the ${red('value of the steady direct current that produces the same average power')} in a resistor as the alternating current. (The r.m.s. voltage is defined in the same way.)`)}
${steps([`Power in a resistor at any instant: <i>P</i> = <i>I</i><sup>2</sup><i>R</i>. The average power is ⟨<i>I</i><sup>2</sup>⟩<i>R</i>.`, `A steady current <i>I</i><sub>rms</sub> gives the same power if <i>I</i><sub>rms</sub><sup>2</sup><i>R</i> = ⟨<i>I</i><sup>2</sup>⟩<i>R</i>, so <i>I</i><sub>rms</sub> = ${sq('⟨<i>I</i><sup>2</sup>⟩')}: the <b>square root of the mean of the square</b> of the current.`, `For <i>I</i> = <i>I</i><sub>0</sub> sin ω<i>t</i>: <i>I</i><sup>2</sup> = <i>I</i><sub>0</sub><sup>2</sup> sin<sup>2</sup> ω<i>t</i> = ½<i>I</i><sub>0</sub><sup>2</sup>(1 − cos 2ω<i>t</i>). Over a whole cycle the mean of cos 2ω<i>t</i> is zero, so ⟨<i>I</i><sup>2</sup>⟩ = ½<i>I</i><sub>0</sub><sup>2</sup>.`])}
${key(`${rms('<i>I</i>')} = ${fr('<i>I</i><sub>0</sub>', sq('2'))} &nbsp;&nbsp;&nbsp; ${rms('<i>V</i>')} = ${fr('<i>V</i><sub>0</sub>', sq('2'))}`, 'sinusoidal a.c. only. Mains 240 V means V<sub>rms</sub> = 240 V, so V<sub>0</sub> = 339 V.')}
${tip(`Ammeters and voltmeters for a.c. read r.m.s. values. Unless a question says "peak", assume a quoted a.c. voltage or current is r.m.s.`)}
${sim('rms', 'Where the r.m.s. value comes from', 'Watch the current, its square and the mean of the square. The steady current that gives the same heating is the square root of that mean: I₀/√2 for a sine wave.')}

${h4('Current in a pure resistor')}
${steps([`Supply voltage across the resistor: <i>V</i> = <i>V</i><sub>0</sub> sin ω<i>t</i>.`, `At every instant <i>I</i> = ${fr('<i>V</i>', '<i>R</i>')} = ${fr('<i>V</i><sub>0</sub>', '<i>R</i>')} sin ω<i>t</i> = <i>I</i><sub>0</sub> sin ω<i>t</i>, with <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i>.`, `The current and voltage reach their maximum and zero values at the same time: they are <b>in phase</b> (phase difference 0).`])}
${fig(element('R'), 'Figure 19.3: a pure resistor: circuit, phasor diagram and graphs.')}
${h4('Power in a pure resistor')}
${steps([`<i>P</i> = <i>IV</i> = <i>I</i><sub>0</sub><i>V</i><sub>0</sub> sin<sup>2</sup> ω<i>t</i> = <i>P</i><sub>0</sub> sin<sup>2</sup> ω<i>t</i>, always positive: the resistor always takes energy and turns it into heat.`, `Mean of sin<sup>2</sup> ω<i>t</i> = ½, so:`])}
${key(`⟨<i>P</i>⟩ = ½<i>I</i><sub>0</sub><i>V</i><sub>0</sub> = ${rms('<i>I</i>')}${rms('<i>V</i>')} = ${rms('<i>I</i>')}<sup>2</sup><i>R</i> = ${fr(`${rms('<i>V</i>')}<sup>2</sup>`, '<i>R</i>')}`, 'average power = half the peak power P₀ = I₀V₀')}
${fig(F.powR(), 'Figure 19.4: power in a resistor varies between 0 and P₀ at twice the supply frequency.')}
${example('19.1.1', `A 240 V (r.m.s.), 50 Hz supply is connected to a 60 Ω heater. Find (a) the peak voltage, (b) the r.m.s. and peak currents, (c) the mean power, (d) the peak power.`,
  steps([`(a) <i>V</i><sub>0</sub> = ${sq('2')}(240) = <b>339 V</b>`, `(b) <i>I</i><sub>rms</sub> = ${fr('240', '60')} = <b>4.0 A</b>; <i>I</i><sub>0</sub> = ${sq('2')}(4.0) = <b>5.7 A</b>`, `(c) ⟨<i>P</i>⟩ = <i>I</i><sub>rms</sub><i>V</i><sub>rms</sub> = (4.0)(240) = <b>960 W</b>`, `(d) <i>P</i><sub>0</sub> = <i>I</i><sub>0</sub><i>V</i><sub>0</sub> = 2⟨<i>P</i>⟩ = <b>1920 W</b>`]))}
${example('19.1.2', `The current in a resistor is <i>I</i> = 3.0 sin 100π<i>t</i> A. Find (a) the frequency, (b) the r.m.s. current, (c) the current at <i>t</i> = 2.5 ms.`,
  steps([`(a) ω = 100π, <i>f</i> = ${fr('ω', '2π')} = <b>50 Hz</b>`, `(b) <i>I</i><sub>rms</sub> = ${fr('3.0', sq('2'))} = <b>2.1 A</b>`, `(c) <i>I</i> = 3.0 sin(100π × 0.0025) = 3.0 sin(π/4) = <b>2.1 A</b>`]))}
`)}

${sec('18-2', '19.2 Alternating current through an inductor', `
<p>A <b>pure (ideal) inductor</b> has inductance but no resistance.</p>
${h4('Deriving the current')}
${steps([`The supply voltage is <i>V</i> = <i>V</i><sub>0</sub> sin ω<i>t</i>. With no resistance, the applied voltage just balances the back e.m.f.: <i>V</i> = <i>L</i>${fr('d<i>I</i>', 'd<i>t</i>')}.`, `${fr('d<i>I</i>', 'd<i>t</i>')} = ${fr('<i>V</i><sub>0</sub>', '<i>L</i>')} sin ω<i>t</i> &nbsp;⇒&nbsp; <i>I</i> = −${fr('<i>V</i><sub>0</sub>', 'ω<i>L</i>')} cos ω<i>t</i>`, `<i>I</i> = <i>I</i><sub>0</sub> sin(ω<i>t</i> − ${fr('π', '2')}), with <i>I</i><sub>0</sub> = ${fr('<i>V</i><sub>0</sub>', 'ω<i>L</i>')}.`])}
${note(`In an inductor the <b>current lags the voltage by π/2</b> (a quarter of a cycle): the voltage reaches its peak a quarter-cycle before the current. (Equivalently, V leads I by π/2.)`)}
${fig(element('L'), 'Figure 19.5: a pure inductor: circuit, phasor diagram and graphs.')}
${def('Inductive reactance, <i>X</i><sub>L</sub>', `the ${red('opposition of an inductor to alternating current')}: the ratio of the r.m.s. (or peak) voltage across it to the r.m.s. (or peak) current through it.`)}
${key(`<i>X</i><sub>L</sub> = ${fr('<i>V</i><sub>0</sub>', '<i>I</i><sub>0</sub>')} = ω<i>L</i> = 2π<i>fL</i>`, 'unit: ohm. X<sub>L</sub> ∝ f: an inductor passes d.c. (f = 0) freely but opposes high frequencies.')}
${h4('Power in a pure inductor')}
${steps([`<i>P</i> = <i>IV</i> = <i>I</i><sub>0</sub>(−cos ω<i>t</i>) × <i>V</i><sub>0</sub> sin ω<i>t</i> = −½<i>I</i><sub>0</sub><i>V</i><sub>0</sub> sin 2ω<i>t</i>`, `This is positive for half the time (energy stored in the magnetic field) and negative for the other half (energy returned to the supply). Its mean over a cycle is zero.`])}
${key(`⟨<i>P</i>⟩ = 0`, 'a pure inductor (or capacitor) uses no energy on average')}
${fig(F.powLC(), 'Figure 19.6: power in a pure inductor or capacitor: energy is stored and returned every half-cycle.')}
${example('19.2.1', `A coil of inductance 0.50 H and negligible resistance is connected to a 120 V, 60 Hz supply. Find the r.m.s. current.`, steps([`<i>X</i><sub>L</sub> = 2π<i>fL</i> = 2π(60)(0.50) = 188 Ω`, `<i>I</i><sub>rms</sub> = ${fr('120', '188')} = <b>0.64 A</b>`]))}
${example('19.2.2', `A 240 V, 50 Hz supply drives a current of 3.0 A through a pure inductor. Find its inductance.`, steps([`<i>X</i><sub>L</sub> = ${fr('240', '3.0')} = 80 Ω`, `<i>L</i> = ${fr('<i>X</i><sub>L</sub>', '2π<i>f</i>')} = ${fr('80', '2π(50)')} = <b>0.25 H</b>`]))}
`)}

${sec('18-3', '19.3 Alternating current through a capacitor', `
<p>A <b>pure (ideal) capacitor</b> has capacitance but no resistance or inductance.</p>
${h4('Deriving the current')}
${steps([`With <i>V</i> = <i>V</i><sub>0</sub> sin ω<i>t</i> across it, the charge on the capacitor is <i>Q</i> = <i>CV</i> = <i>CV</i><sub>0</sub> sin ω<i>t</i>.`, `<i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')} = ω<i>CV</i><sub>0</sub> cos ω<i>t</i>`, `<i>I</i> = <i>I</i><sub>0</sub> sin(ω<i>t</i> + ${fr('π', '2')}), with <i>I</i><sub>0</sub> = ω<i>CV</i><sub>0</sub>.`])}
${note(`In a capacitor the <b>current leads the voltage by π/2</b>: the current is largest when the capacitor is uncharged (V = 0) and zero when it is fully charged.`)}
${fig(element('C'), 'Figure 19.7: a pure capacitor: circuit, phasor diagram and graphs.')}
${tip(`A memory aid: <b>CIVIL</b>. In a <b>C</b>apacitor, <b>I</b> leads <b>V</b>; <b>V</b> leads <b>I</b> in an inductor (<b>L</b>).`)}
${def('Capacitive reactance, <i>X</i><sub>C</sub>', `the ${red('opposition of a capacitor to alternating current')}: the ratio of the r.m.s. (or peak) voltage across it to the r.m.s. (or peak) current.`)}
${key(`<i>X</i><sub>C</sub> = ${fr('<i>V</i><sub>0</sub>', '<i>I</i><sub>0</sub>')} = ${fr('1', 'ω<i>C</i>')} = ${fr('1', '2π<i>fC</i>')}`, 'unit: ohm. X<sub>C</sub> ∝ 1/f: a capacitor blocks d.c. but passes high frequencies easily.')}
${h4('Power in a pure capacitor')}
${steps([`<i>P</i> = <i>IV</i> = <i>I</i><sub>0</sub> cos ω<i>t</i> × <i>V</i><sub>0</sub> sin ω<i>t</i> = ½<i>I</i><sub>0</sub><i>V</i><sub>0</sub> sin 2ω<i>t</i>.`, `Energy is stored in the electric field while the capacitor charges and returned while it discharges: <b>⟨<i>P</i>⟩ = 0</b> (Figure 19.6).`])}
${example('19.3.1', `An 8.00 μF capacitor is connected to a 150 V (r.m.s.), 60.0 Hz supply. Find the capacitive reactance, the r.m.s. current and the peak current.`,
  steps([`<i>X</i><sub>C</sub> = ${fr('1', '2π<i>fC</i>')} = ${fr('1', '2π(60.0)(8.00 × 10<sup>−6</sup>)')} = <b>332 Ω</b>`, `<i>I</i><sub>rms</sub> = ${fr('150', '332')} = <b>0.452 A</b>; <i>I</i><sub>0</sub> = ${sq('2')}(0.452) = <b>0.639 A</b>`]))}
${sim('acphase', 'R, L or C on an a.c. supply', 'Choose a resistor, an inductor or a capacitor. The rotating phasors and the graphs show the phase of the current against the voltage; the power curve shows why only the resistor uses energy on average. Change the frequency and watch the reactance.')}
${exercises('Exercise: single elements', [
  { q: `At what frequency does a 2.0 μF capacitor have a reactance of 400 Ω?`, a: `<i>f</i> = 1/(2π<i>X</i><sub>C</sub><i>C</i>) = <b>199 Hz</b>` },
  { q: `The frequency of the supply to a pure inductor is doubled while the r.m.s. voltage stays the same. What happens to the r.m.s. current?`, a: `<i>X</i><sub>L</sub> = 2π<i>fL</i> doubles, so the current is <b>halved</b>.` },
  { q: `Explain why the average power taken by a pure capacitor is zero.`, a: `In one quarter-cycle the capacitor charges and stores energy taken from the supply; in the next quarter-cycle it discharges and returns the same energy. Over a whole cycle the net energy taken is zero.` }])}
`)}

${sec('18-4', '19.4 R-C, R-L and R-L-C circuits in series', `
<p>In a series circuit the <b>same current</b> flows through every component, so the current is used as the reference phasor. The voltages across the components have different phases, so they add as <b>phasors</b> (vectors), not as numbers.</p>
${def('Impedance, <i>Z</i>', `the ${red('total opposition of a circuit to alternating current')}: <i>Z</i> = <i>V</i><sub>rms</sub>/<i>I</i><sub>rms</sub> = <i>V</i><sub>0</sub>/<i>I</i><sub>0</sub>. It combines resistance and reactance; unit: ohm.`)}
${h4('R-C series circuit')}
${fig(F.rc(), 'Figure 19.8: R-C series: V_R is in phase with I, V_C lags I by π/2.')}
${steps([`<i>V</i><sup>2</sup> = <i>V</i><sub>R</sub><sup>2</sup> + <i>V</i><sub>C</sub><sup>2</sup> = (<i>IR</i>)<sup>2</sup> + (<i>IX</i><sub>C</sub>)<sup>2</sup>`, `<i>Z</i> = ${fr('<i>V</i>', '<i>I</i>')} = ${sq('<i>R</i><sup>2</sup> + <i>X</i><sub>C</sub><sup>2</sup>')}, &nbsp; tan φ = ${fr('<i>X</i><sub>C</sub>', '<i>R</i>')} = ${fr('1', 'ω<i>CR</i>')}, the current <b>leads</b> the voltage by φ.`])}
${h4('R-L series circuit')}
${fig(F.rl(), 'Figure 19.9: R-L series: V_L leads I by π/2.')}
${steps([`<i>V</i><sup>2</sup> = <i>V</i><sub>R</sub><sup>2</sup> + <i>V</i><sub>L</sub><sup>2</sup>`, `<i>Z</i> = ${sq('<i>R</i><sup>2</sup> + <i>X</i><sub>L</sub><sup>2</sup>')}, &nbsp; tan φ = ${fr('<i>X</i><sub>L</sub>', '<i>R</i>')} = ${fr('ω<i>L</i>', '<i>R</i>')}, the voltage <b>leads</b> the current by φ.`])}
${fig(F.zf(), 'Figure 19.10: how the impedance of R-C and R-L circuits changes with frequency.')}
${h4('R-L-C series circuit')}
${fig(F.rlc(), 'Figure 19.11: R-L-C series: V_L and V_C point in opposite directions, so they partly cancel.')}
${steps([`<i>V</i><sub>L</sub> leads <i>I</i> by π/2 and <i>V</i><sub>C</sub> lags <i>I</i> by π/2, so they are in <b>opposite</b> directions on the phasor diagram. Their resultant is (<i>V</i><sub>L</sub> − <i>V</i><sub>C</sub>).`, `<i>V</i><sup>2</sup> = <i>V</i><sub>R</sub><sup>2</sup> + (<i>V</i><sub>L</sub> − <i>V</i><sub>C</sub>)<sup>2</sup> = <i>I</i><sup>2</sup>[<i>R</i><sup>2</sup> + (<i>X</i><sub>L</sub> − <i>X</i><sub>C</sub>)<sup>2</sup>]`])}
${key(`<i>Z</i> = ${sq('<i>R</i><sup>2</sup> + (<i>X</i><sub>L</sub> − <i>X</i><sub>C</sub>)<sup>2</sup>')} &nbsp;&nbsp;&nbsp; tan φ = ${fr('<i>X</i><sub>L</sub> − <i>X</i><sub>C</sub>', '<i>R</i>')}`, 'X<sub>L</sub> > X<sub>C</sub>: V leads I (inductive). X<sub>L</sub> < X<sub>C</sub>: V lags I (capacitive).')}
${tip(`The r.m.s. voltages across the components do <b>not</b> add up to the supply voltage. Only the phasor sum does. A voltmeter across the inductor alone can read more than the supply!`)}
${example('19.4.1', `A 10 kΩ resistor and a 0.10 μF capacitor are in series with an a.c. supply of angular frequency 1.0 × 10<sup>4</sup> rad s<sup>−1</sup>. The r.m.s. voltage across the resistor is 20 V. Find the r.m.s. voltage across the capacitor.`,
  steps([`<i>X</i><sub>C</sub> = ${fr('1', 'ω<i>C</i>')} = ${fr('1', '(1.0 × 10<sup>4</sup>)(0.10 × 10<sup>−6</sup>)')} = 1.0 kΩ`, `<i>I</i> = ${fr('20', '10 × 10<sup>3</sup>')} = 2.0 mA, so <i>V</i><sub>C</sub> = <i>IX</i><sub>C</sub> = <b>2.0 V</b>`]))}
${example('19.4.2', `A series R-L-C circuit has <i>R</i> = 25.0 Ω, <i>C</i> = 50.0 μF and <i>L</i> = 0.300 H, and is driven by a 120 V, 60 Hz supply. Find (a) the impedance, (b) the r.m.s. current, (c) the phase angle between the voltage and the current.`,
  steps([`<i>X</i><sub>L</sub> = 2π(60)(0.300) = 113.1 Ω; <i>X</i><sub>C</sub> = ${fr('1', '2π(60)(50.0 × 10<sup>−6</sup>)')} = 53.1 Ω`, `(a) <i>Z</i> = ${sq('25.0<sup>2</sup> + (113.1 − 53.1)<sup>2</sup>')} = <b>65.0 Ω</b>`, `(b) <i>I</i><sub>rms</sub> = ${fr('120', '65.0')} = <b>1.85 A</b>`, `(c) tan φ = ${fr('60.0', '25.0')}, φ = <b>67.4°</b>; <i>X</i><sub>L</sub> > <i>X</i><sub>C</sub>, so the voltage leads the current.`]))}

${h4('Resonance in an R-L-C circuit')}
${fig(F.res(), 'Figure 19.12: X_L, X_C, R and Z against frequency. Z is smallest, and equal to R, at f₀.')}
${ul([`At low frequency <i>X</i><sub>C</sub> is large; at high frequency <i>X</i><sub>L</sub> is large. In between there is a frequency where they are equal.`, `When <i>X</i><sub>L</sub> = <i>X</i><sub>C</sub>, <i>V</i><sub>L</sub> and <i>V</i><sub>C</sub> cancel exactly: <i>Z</i> = <i>R</i> (its <b>minimum</b>), the current is a <b>maximum</b> (<i>I</i> = <i>V</i>/<i>R</i>) and it is <b>in phase</b> with the supply voltage (φ = 0).`])}
${def('Resonance', `in a series R-L-C circuit occurs when the ${red('frequency of the supply makes the inductive reactance equal to the capacitive reactance')}, so the impedance is a minimum (equal to R) and the current is a maximum.`)}
${h4('Deriving the resonance frequency')}
${steps([`Condition: <i>X</i><sub>L</sub> = <i>X</i><sub>C</sub> &nbsp;⇒&nbsp; 2π<i>f</i><sub>0</sub><i>L</i> = ${fr('1', '2π<i>f</i><sub>0</sub><i>C</i>')}`, `<i>f</i><sub>0</sub><sup>2</sup> = ${fr('1', '4π<sup>2</sup><i>LC</i>')}:`])}
${key(`<i>f</i><sub>0</sub> = ${fr('1', `2π${sq('<i>LC</i>')}`)} &nbsp;&nbsp;&nbsp; ω<sub>0</sub> = ${fr('1', sq('<i>LC</i>'))}`, 'independent of R. A smaller R gives a taller, sharper current peak.')}
${ul([`Tuning a radio: the capacitance is changed until <i>f</i><sub>0</sub> equals the frequency of the wanted station, so that station gives a large current.`])}
${sim('rlc', 'Series R-L-C circuit and resonance', 'Choose R-C, R-L or R-L-C and change the frequency. The phasor diagram shows V_R, V_L, V_C and the supply V; the graph shows the current against frequency. Find the resonance: V_L and V_C cancel and the current peaks.')}
${example('19.4.3', `A 50 Ω resistor, a 200 mH inductor and a 0.050 μF capacitor are in series with a 150 V (r.m.s.) supply of variable frequency. Find (a) the resonance frequency, (b) the r.m.s. voltage across each component at resonance, (c) the voltage across the inductor and capacitor together, (d) the equation of the supply voltage at resonance.`,
  steps([`(a) <i>f</i><sub>0</sub> = ${fr('1', `2π${sq('(0.200)(0.050 × 10<sup>−6</sup>)')}`)} = <b>1.59 kHz</b> (ω<sub>0</sub> = 1.0 × 10<sup>4</sup> rad s<sup>−1</sup>)`, `(b) <i>I</i> = ${fr('150', '50')} = 3.0 A. <i>X</i><sub>L</sub> = ω<sub>0</sub><i>L</i> = 2000 Ω = <i>X</i><sub>C</sub>. <i>V</i><sub>R</sub> = <b>150 V</b>, <i>V</i><sub>L</sub> = <i>V</i><sub>C</sub> = (3.0)(2000) = <b>6.0 kV</b>`, `(c) <i>V</i><sub>L</sub> and <i>V</i><sub>C</sub> are equal and opposite: <b>0 V</b>`, `(d) <i>V</i><sub>0</sub> = ${sq('2')}(150) = 212 V: <b><i>V</i> = 212 sin(1.0 × 10<sup>4</sup> <i>t</i>)</b> V`]))}
${example('19.4.4', `A 200 Ω resistor, a 0.75 H inductor and a capacitor <i>C</i> are in series with a 250 V supply. Resonance occurs at 600 Hz. Find (a) <i>X</i><sub>L</sub> and <i>X</i><sub>C</sub> at resonance, (b) <i>C</i>, (c) the impedance at resonance, (d) the current at resonance.`,
  steps([`(a) <i>X</i><sub>L</sub> = 2π(600)(0.75) = <b>2.83 kΩ</b> = <i>X</i><sub>C</sub>`, `(b) <i>C</i> = ${fr('1', '2π<i>fX</i><sub>C</sub>')} = ${fr('1', '2π(600)(2827)')} = <b>93.8 nF</b>`, `(c) <i>Z</i> = <i>R</i> = <b>200 Ω</b>`, `(d) <i>I</i> = ${fr('250', '200')} = <b>1.25 A</b>. Phasor diagram: <i>V</i><sub>R</sub> along <i>I</i>, <i>V</i><sub>L</sub> and <i>V</i><sub>C</sub> equal and opposite.`]))}
${exercises('Exercise: series circuits', [
  { q: `A 40 Ω resistor and a 0.10 H inductor are in series with a 100 V, 50 Hz supply. Find the current and the phase angle.`, a: `<i>X</i><sub>L</sub> = 31.4 Ω, <i>Z</i> = 50.9 Ω, <i>I</i> = <b>1.97 A</b>, φ = tan<sup>−1</sup>(31.4/40) = <b>38.1°</b> (V leads I)` },
  { q: `What capacitance must be put in series with a 25 mH inductor so that the circuit resonates at 1.0 kHz?`, a: `<i>C</i> = 1/(4π<sup>2</sup><i>f</i><sub>0</sub><sup>2</sup><i>L</i>) = <b>1.0 μF</b>` },
  { q: `Sketch the phasor diagram for a series R-L-C circuit driven below its resonance frequency and state whether the current leads or lags the voltage.`, a: `Below f₀, X<sub>C</sub> > X<sub>L</sub>, so V<sub>C</sub> is longer than V<sub>L</sub>; the resultant V lies below the current phasor. The current <b>leads</b> the voltage (the circuit is capacitive).` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-19', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. r.m.s. ----------
  window.PhysiQSims.add('rms', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { I0: 4, t: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'peak current <i>I</i>₀', 1, 6, 0.5, S.I0, 'A', v => { S.I0 = v; });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0; S.t = (S.t + dt * 0.25) % 1;
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 330); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const gx = 44, gw = w - 64, top = 16, H1 = (h - 60) * 0.5, y2 = h - 16, gh2 = h - 60 - H1;
      const X = u => gx + gw * u;
      ctx.fillStyle = '#fff'; ctx.fillRect(gx, top, gw, H1);
      // current
      const Y1 = I => top + H1 / 2 - I / 6 * (H1 / 2 - 4);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, Y1(0)); ctx.lineTo(gx + gw, Y1(0)); ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const u = i / 200, I = S.I0 * Math.sin(2 * Math.PI * 2 * u); i ? ctx.lineTo(X(u), Y1(I)) : ctx.moveTo(X(u), Y1(I)); } ctx.stroke();
      text(ctx, 'I', gx - 8, top + H1 / 2 + 4, { a: 'right', b: 1, it: 1, c: COL.v });
      // I squared
      const base = y2, Y2 = q => base - q / 36 * (gh2 - 4);
      ctx.fillStyle = '#fff'; ctx.fillRect(gx, base - gh2, gw, gh2);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, base); ctx.lineTo(gx + gw, base); ctx.stroke();
      ctx.fillStyle = 'rgba(242,102,27,.15)'; ctx.beginPath(); ctx.moveTo(X(0), base); for (let i = 0; i <= 200; i++) { const u = i / 200; ctx.lineTo(X(u), Y2((S.I0 * Math.sin(4 * Math.PI * u)) ** 2)); } ctx.lineTo(X(1), base); ctx.fill();
      ctx.strokeStyle = COL.o; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const u = i / 200, q = (S.I0 * Math.sin(4 * Math.PI * u)) ** 2; i ? ctx.lineTo(X(u), Y2(q)) : ctx.moveTo(X(u), Y2(q)); } ctx.stroke();
      const mean = S.I0 * S.I0 / 2; ctx.strokeStyle = COL.gr; ctx.setLineDash([6, 4]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, Y2(mean)); ctx.lineTo(gx + gw, Y2(mean)); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, 'I²', gx - 8, base - gh2 + 4, { a: 'right', b: 1, it: 1, c: COL.o }); text(ctx, 'mean of I² = I₀²/2', gx + gw - 4, Y2(mean) - 6, { a: 'right', b: 1, fs: 11, c: COL.gr });
      // I_rms line on the current graph
      const irms = S.I0 / Math.SQRT2; ctx.strokeStyle = COL.gr; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(gx, Y1(irms)); ctx.lineTo(gx + gw, Y1(irms)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'I_rms = I₀/√2', gx + gw - 4, Y1(irms) - 6, { a: 'right', b: 1, fs: 11, c: COL.gr });
      // moving marker
      const u = S.t, I = S.I0 * Math.sin(4 * Math.PI * u); ctx.beginPath(); ctx.arc(X(u), Y1(I), 5, 0, 7); ctx.fillStyle = COL.v; ctx.fill(); ctx.beginPath(); ctx.arc(X(u), Y2(I * I), 5, 0, 7); ctx.fillStyle = COL.o; ctx.fill();
      ro([['I₀', fmt(S.I0, 1) + ' A'], ['mean of I²', fmt(mean, 2) + ' A²', 'hl'], ['I_rms = √(mean of I²)', fmt(irms, 2) + ' A', 'hl'], ['mean of I itself', '0 (no use for heating)']]);
    }
    loop(cv, frame);
  });

  // ---------- 2. R, L or C on an a.c. supply ----------
  window.PhysiQSims.add('acphase', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, arrow, loop } = window.PhysiQSims.U;
    const S = { k: 'L', f: 50, th: 0, R: 100, L: 0.32, C: 32e-6, V0: 10 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ks = [['R', 'resistor 100 Ω'], ['L', 'inductor 0.32 H'], ['C', 'capacitor 32 μF']];
    const chips = ks.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.k ? ' on' : ''), () => { S.k = k; chips.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'supply frequency <i>f</i>', 10, 200, 5, S.f, 'Hz', v => { S.f = v; });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0; S.th = (S.th + dt * 2.2) % (2 * Math.PI);   // drawn slowly
      const X = S.k === 'R' ? S.R : S.k === 'L' ? 2 * Math.PI * S.f * S.L : 1 / (2 * Math.PI * S.f * S.C), I0 = S.V0 / X, ph = S.k === 'R' ? 0 : S.k === 'C' ? Math.PI / 2 : -Math.PI / 2;
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(1.2, 420, 520) : cv.size(0.5, 260, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const cx = narrow ? w / 2 : 100, cy = narrow ? 90 : h / 2 - 10, R = narrow ? 66 : 76;
      ctx.strokeStyle = COL.grid; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      const iScale = Math.min(1, I0 / 0.2);   // current phasor length (relative)
      arrow(ctx, cx, cy, cx + R * Math.cos(S.th), cy - R * Math.sin(S.th), COL.v, 3); text(ctx, 'V', cx + (R + 12) * Math.cos(S.th), cy - (R + 12) * Math.sin(S.th) + 4, { a: 'center', b: 1, c: COL.v });
      const ia = S.th + ph, ir = R * (0.35 + 0.5 * iScale);
      arrow(ctx, cx, cy, cx + ir * Math.cos(ia), cy - ir * Math.sin(ia), COL.r, 3); text(ctx, 'I', cx + (ir + 12) * Math.cos(ia), cy - (ir + 12) * Math.sin(ia) + 4, { a: 'center', b: 1, c: COL.r });
      // graphs
      const gx = narrow ? 30 : 210, gw = w - gx - 16, g1 = narrow ? 190 : 20, gh = narrow ? (h - 190 - 30) / 2 : (h - 50) / 2;
      const graph = (y0, f, col, label, mean) => { ctx.fillStyle = '#fff'; ctx.fillRect(gx, y0, gw, gh); ctx.strokeStyle = COL.grid; ctx.strokeRect(gx, y0, gw, gh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, y0 + gh / 2); ctx.lineTo(gx + gw, y0 + gh / 2); ctx.stroke(); text(ctx, label, gx + 4, y0 + 12, { fs: 11, b: 1, c: col[0] });
        f.forEach((fn, j) => { ctx.strokeStyle = col[j]; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const a = S.th - 4 * Math.PI * (1 - i / 160); const Y = y0 + gh / 2 - fn(a) * gh * 0.42; i ? ctx.lineTo(gx + gw * i / 160, Y) : ctx.moveTo(gx + gw * i / 160, Y); } ctx.stroke(); });
        if (mean != null) { ctx.strokeStyle = COL.gr; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(gx, y0 + gh / 2 - mean * gh * 0.42); ctx.lineTo(gx + gw, y0 + gh / 2 - mean * gh * 0.42); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'mean power', gx + gw - 4, y0 + gh / 2 - mean * gh * 0.42 - 5, { a: 'right', fs: 10.5, c: COL.gr, b: 1 }); } };
      graph(g1, [a => Math.sin(a), a => (0.35 + 0.5 * iScale) * Math.sin(a + ph)], [COL.v, COL.r], 'V (purple) and I (red)');
      graph(g1 + gh + 10, [a => Math.sin(a) * Math.sin(a + ph)], [COL.o], 'power P = IV', S.k === 'R' ? 0.5 : 0);
      ro([['phase of I relative to V', S.k === 'R' ? 'in phase' : S.k === 'C' ? 'I leads V by π/2' : 'I lags V by π/2', 'hl'], [S.k === 'R' ? 'resistance R' : S.k === 'L' ? 'reactance X_L = 2πfL' : 'reactance X_C = 1/(2πfC)', fmt(X, 1) + ' Ω', 'hl'], ['peak current (V₀ = 10 V)', fmt(I0 * 1000, 1) + ' mA'], ['average power', S.k === 'R' ? fmt(0.5 * S.V0 * I0, 2) + ' W' : '0 W']]);
    }
    loop(cv, frame);
  });

  // ---------- 3. series R-L-C and resonance ----------
  window.PhysiQSims.add('rlc', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, arrow } = window.PhysiQSims.U;
    const S = { m: 'RLC', R: 200, L: 0.2, C: 0.05e-6, f: 1200, V: 150 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const modes = [['RC', 'R-C'], ['RL', 'R-L'], ['RLC', 'R-L-C']];
    const chips = modes.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.m ? ' on' : ''), () => { S.m = k; chips.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'frequency <i>f</i>', 200, 4000, 5, S.f, 'Hz', v => { S.f = v; draw(); });
    slider(ctl, 'resistance <i>R</i>', 50, 1000, 10, S.R, 'Ω', v => { S.R = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    const calc = f => { const XL = S.m === 'RC' ? 0 : 2 * Math.PI * f * S.L, XC = S.m === 'RL' ? 0 : 1 / (2 * Math.PI * f * S.C), Z = Math.hypot(S.R, XL - XC); return { XL, XC, Z, I: S.V / Z, phi: Math.atan2(XL - XC, S.R) }; };
    function draw() {
      const narrow = root.clientWidth < 520, ctx = cv.ctx, { w, h } = narrow ? cv.size(1.25, 440, 540) : cv.size(0.5, 270, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const r = calc(S.f), VR = r.I * S.R, VL = r.I * r.XL, VC = r.I * r.XC;
      // phasor diagram (current along +x)
      const ox = narrow ? 50 : 40, oy = narrow ? 120 : h / 2, pw = narrow ? w - 100 : Math.min(260, w * 0.38);
      const sc = pw * 0.85 / Math.max(S.V, VR, Math.max(VL, VC) * 0.6, 1);
      const cap = v => Math.min(v * sc, narrow ? 100 : h / 2 - 20);
      arrow(ctx, ox, oy, ox + VR * sc, oy, COL.gr, 3); text(ctx, 'V_R', ox + VR * sc / 2, oy + 16, { a: 'center', b: 1, fs: 11, c: COL.gr });
      if (S.m !== 'RC') { arrow(ctx, ox, oy, ox, oy - cap(VL), COL.v, 3); text(ctx, 'V_L', ox - 6, oy - cap(VL) + 10, { a: 'right', b: 1, fs: 11, c: COL.v }); }
      if (S.m !== 'RL') { arrow(ctx, ox, oy, ox, oy + cap(VC), COL.o, 3); text(ctx, 'V_C', ox - 6, oy + cap(VC), { a: 'right', b: 1, fs: 11, c: COL.o }); }
      const vy = Math.max(-(narrow ? 100 : h / 2 - 20), Math.min(narrow ? 100 : h / 2 - 20, (VL - VC) * sc));
      arrow(ctx, ox, oy, ox + VR * sc, oy - vy, COL.ink, 3.2); text(ctx, 'V', ox + VR * sc + 6, oy - vy + 4, { b: 1, it: 1 });
      arrow(ctx, ox + VR * sc + 20, oy, ox + VR * sc + 52, oy, COL.r, 2.4); text(ctx, 'I', ox + VR * sc + 56, oy + 4, { b: 1, c: COL.r });
      // resonance curve
      const gx = narrow ? 40 : ox + pw + 50, gy = narrow ? 260 : 24, gw = w - gx - 16, gh = narrow ? h - 260 - 36 : h - 60;
      ctx.fillStyle = '#fff'; ctx.fillRect(gx, gy, gw, gh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
      const Imax = S.V / S.R, Xf = f => gx + gw * (f - 200) / 3800, Yi = I => gy + gh - I / Imax * gh * 0.95;
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const f = 200 + 3800 * i / 200, I = calc(f).I; i ? ctx.lineTo(Xf(f), Yi(I)) : ctx.moveTo(Xf(f), Yi(I)); } ctx.stroke();
      ctx.beginPath(); ctx.arc(Xf(S.f), Yi(r.I), 6, 0, 7); ctx.fillStyle = COL.o; ctx.fill();
      text(ctx, 'I_rms (peak = V/R = ' + fmt(S.V / S.R, 2) + ' A)', gx + 4, gy + 12, { fs: 11, b: 1 }); text(ctx, 'f', gx + gw, gy + gh + 16, { a: 'right', it: 1, fs: 12 }); text(ctx, '200 Hz', gx, gy + gh + 14, { fs: 10, c: COL.sub }); text(ctx, '4 kHz', gx + gw, gy + gh + 28, { a: 'right', fs: 10, c: COL.sub });
      const f0 = 1 / (2 * Math.PI * Math.sqrt(S.L * S.C));
      if (S.m === 'RLC') { ctx.strokeStyle = COL.sub; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(Xf(f0), gy); ctx.lineTo(Xf(f0), gy + gh); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'f₀', Xf(f0) + 4, gy + gh - 6, { it: 1, fs: 11, c: COL.sub }); }
      const res = S.m === 'RLC' && Math.abs(S.f - f0) / f0 < 0.012;
      if (res) text(ctx, 'resonance: Z = R, I largest, V in phase with I', w / 2, h - 6, { a: 'center', b: 1, fs: 12, c: COL.gr });
      ro([['impedance Z', fmt(r.Z, 0) + ' Ω', 'hl'], ['current I_rms', fmt(r.I, 3) + ' A', 'hl'], ['phase angle φ', fmt(Math.abs(r.phi) * 180 / Math.PI, 1) + '° ' + (Math.abs(r.phi) < 0.01 ? '(in phase)' : r.phi > 0 ? '(V leads I)' : '(V lags I)')], ['X_L, X_C', (S.m === 'RC' ? '—' : fmt(r.XL, 0) + ' Ω') + ', ' + (S.m === 'RL' ? '—' : fmt(r.XC, 0) + ' Ω')], ['V_R, V_L, V_C', fmt(VR, 0) + ', ' + fmt(VL, 0) + ', ' + fmt(VC, 0) + ' V'], ['f₀ = 1/(2π√LC)', S.m === 'RLC' ? fmt(f0, 0) + ' Hz' : '—']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
