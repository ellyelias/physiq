/* Semester 3 Chapter 21 Sound Waves: full notes by Cikgu Suhaili (from stpm_2026_unit_22_sound_wave.pptx).
   App chapter 21 = STPM 2026 syllabus chapter 22. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq, ms } = window.PhysiQLessons.H;

  // ---------- figures ----------
  const curve = (x0, y0, w, a, lam, ph = 0, n = 120) => { let d = ''; for (let i = 0; i <= n; i++) { const x = w * i / n; d += (i ? ' L' : 'M') + (x0 + x).toFixed(1) + ',' + (y0 - a * Math.sin(2 * Math.PI * x / lam + ph)).toFixed(1); } return d; };
  const F = {};
  F.prop = () => {
    const lam = 120, x0 = 40, W = 300; let dots = '';
    for (let i = 0; i < 60; i++) { const xe = x0 + i * 5, d = 12 * Math.sin(2 * Math.PI * (xe - x0) / lam); [0, 1, 2].forEach(r => { dots += `<circle cx="${(xe + d).toFixed(1)}" cy="${26 + r * 10}" r="1.8" fill="${C.ink}"/>`; }); }
    const lines = [0, 1, 2].map(j => { const xc = x0 + lam / 2 + j * lam, xr = x0 + j * lam; return L(xc, 8, xc, 300, 's', '', { d: '3 4', w: 0.8 }) + T(xc, 62, 'C', { fs: 11, b: 1, c: C.r }) + (j ? T(xr, 62, 'R', { fs: 11, b: 1, c: C.v }) : ''); }).join('');
    return svg(380, 310, dots + lines + T(8, 40, '(a)', { a: 'start', fs: 12, b: 1 }) +
      T(8, 120, '(b)', { a: 'start', fs: 12, b: 1 }) + axes(x0, 120, W + 10, 44, 'x', 'y', { noO: 1, yb: 165 }) + P(curve(x0, 120, W, 36, lam), 'v', { w: 2.4 }) + T(x0 - 4, 88, 'A', { a: 'end', fs: 11, it: 1 }) +
      T(8, 240, '(c)', { a: 'start', fs: 12, b: 1 }) + axes(x0, 240, W + 10, 52, 'x', 'p', { noO: 1, yb: 296 }) + P(curve(x0, 240, W, 36, lam, Math.PI / 2), 'r', { w: 2.4 }) + T(x0 - 4, 208, 'p₀', { a: 'end', fs: 11, it: 1 }) +
      T(x0 + W + 14, 306, 'excess pressure', { fs: 10, a: 'end', c: C.sub }), 400);
  };
  const strMode = (n, kind, w = 280) => {
    // kind: 'str' (N..N), 'open' (A..A), 'closed' (N closed left .. A open right)
    const x0 = 30, y0 = 34, a = 18; let d1 = '', d2 = '';
    for (let i = 0; i <= 120; i++) { const u = i / 120, x = x0 + u * w; let f;
      if (kind === 'str') f = Math.sin(n * Math.PI * u); else if (kind === 'open') f = Math.cos(n * Math.PI * u); else f = Math.sin(n * Math.PI * u / 2);
      d1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 - a * f).toFixed(1); d2 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 + a * f).toFixed(1); }
    let body = P(d1, 'v', { w: 2 }) + P(d2, 'v', { w: 2, d: '4 3' });
    if (kind === 'str') body = L(x0, 10, x0, 58, 'k', '', { w: 3 }) + L(x0 + w, 10, x0 + w, 58, 'k', '', { w: 3 }) + body;
    else body = L(x0, 12, x0 + w, 12, 'k', '', { w: 1.6 }) + L(x0, 56, x0 + w, 56, 'k', '', { w: 1.6 }) + (kind === 'closed' ? L(x0, 12, x0, 56, 'k', '', { w: 3 }) : '') + body;
    return body;
  };
  F.modes = (kind, ns, labs) => svg(410, 72 * ns.length, ns.map((n, i) => `<g transform="translate(0,${i * 72})">${strMode(n, kind, 230)}${T(276, 30, labs[i][0], { a: 'start', fs: 11, b: 1 })}${T(276, 46, labs[i][1], { a: 'start', fs: 11 })}${T(276, 62, labs[i][2], { a: 'start', fs: 11, c: C.v })}</g>`).join(''), 420);
  F.endc = () => two(svg(220, 120, T(110, 14, 'closed pipe', { b: 1, fs: 12 }) + `<g transform="translate(-10,30)">${(() => { const x0 = 30, w = 150, y0 = 34, a = 18; let d1 = '', d2 = ''; for (let i = 0; i <= 80; i++) { const u = i / 80, x = x0 + u * (w + 22), f = Math.sin(Math.PI / 2 * u); d1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 - a * f).toFixed(1); d2 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 + a * f).toFixed(1); } return L(x0, 12, x0 + w, 12, 'k', '', { w: 1.6 }) + L(x0, 56, x0 + w, 56, 'k', '', { w: 1.6 }) + L(x0, 12, x0, 56, 'k', '', { w: 3 }) + P(d1, 'v', { w: 2 }) + P(d2, 'v', { w: 2, d: '4 3' }) + L(x0, 72, x0 + w, 72, 'k', 'b', { w: 1 }) + T(x0 + w / 2, 86, 'l', { it: 1, fs: 12 }) + L(x0 + w, 72, x0 + w + 22, 72, 'r', '', { w: 1.6 }) + T(x0 + w + 11, 86, 'c', { it: 1, fs: 12, c: C.r }); })()}</g>`, 220),
    svg(220, 120, T(110, 14, 'open pipe', { b: 1, fs: 12 }) + `<g transform="translate(0,30)">${(() => { const x0 = 32, w = 140, y0 = 34, a = 18; let d1 = '', d2 = ''; for (let i = 0; i <= 80; i++) { const u = i / 80, x = x0 - 18 + u * (w + 36), f = Math.cos(Math.PI * u); d1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 - a * f).toFixed(1); d2 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (y0 + a * f).toFixed(1); } return L(x0, 12, x0 + w, 12, 'k', '', { w: 1.6 }) + L(x0, 56, x0 + w, 56, 'k', '', { w: 1.6 }) + P(d1, 'v', { w: 2 }) + P(d2, 'v', { w: 2, d: '4 3' }) + L(x0, 72, x0 + w, 72, 'k', 'b', { w: 1 }) + T(x0 + w / 2, 86, 'l', { it: 1, fs: 12 }) + L(x0 - 18, 72, x0, 72, 'r', '', { w: 1.6 }) + L(x0 + w, 72, x0 + w + 18, 72, 'r', '', { w: 1.6 }) + T(x0 - 9, 86, 'c', { it: 1, fs: 12, c: C.r }) + T(x0 + w + 9, 86, 'c', { it: 1, fs: 12, c: C.r }); })()}</g>`, 220));
  F.Ir = () => two(svg(200, 150, axes(30, 125, 150, 105, 'r', 'I', { noO: 1 }) + P((() => { let d = ''; for (let i = 0; i <= 60; i++) { const r = 0.35 + i / 60 * 2.6; d += (i ? ' L' : 'M') + (30 + (r / 3) * 150).toFixed(1) + ',' + (125 - Math.min(105, 12 / (r * r))).toFixed(1); } return d; })(), 'v', { w: 2.4 }) + T(120, 60, 'I ∝ 1/r²', { fs: 12, it: 1 }), 200),
    svg(200, 150, axes(30, 125, 150, 105, 'A', 'I', { noO: 1 }) + P('M30,125 Q110,120 170,30', 'o', { w: 2.4 }) + T(80, 60, 'I ∝ A²', { fs: 12, it: 1 }), 200));
  F.beats = () => { let a = '', b = '', s = '', e1 = '', e2 = ''; const f1 = 50, f2 = 60, W = 320, tm = 0.2;
    for (let i = 0; i <= 600; i++) { const t = tm * i / 600, x = 30 + W * t / tm, y1 = Math.sin(2 * Math.PI * f1 * t), y2 = Math.sin(2 * Math.PI * f2 * t), en = Math.abs(2 * Math.cos(Math.PI * (f2 - f1) * t));
      a += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (40 - 14 * y1).toFixed(1); b += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (80 - 14 * y2).toFixed(1); s += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (150 - 14 * (y1 + y2)).toFixed(1); e1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (150 - 14 * en).toFixed(1); e2 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (150 + 14 * en).toFixed(1); }
    return svg(380, 210, P(a, 'v', { w: 1.2 }) + P(b, 'o', { w: 1.2 }) + P(e1, 'r', { w: 1.2, d: '4 3' }) + P(e2, 'r', { w: 1.2, d: '4 3' }) + P(s, 'g', { w: 1.4 }) + T(6, 44, 'f₁', { a: 'start', it: 1, c: C.v, fs: 12 }) + T(6, 84, 'f₂', { a: 'start', it: 1, c: C.o, fs: 12 }) + T(6, 154, 'sum', { a: 'start', fs: 11, c: C.g, b: 1 }) +
      T(30, 192, 'loud', { fs: 11, c: C.r }) + T(110, 192, 'soft', { fs: 11, c: C.sub }) + T(190, 192, 'loud', { fs: 11, c: C.r }) + L(30, 202, 190, 202, 'k', 'b', { w: 1 }) + T(270, 206, 'beat period = 1/(f₂ − f₁)', { fs: 11 }), 400); };
  F.doppler = () => { let c = ''; for (let i = 0; i < 6; i++) { const age = 6 - i, r = age * 18, cx = 120 + i * 9; c += `<circle cx="${cx}" cy="90" r="${r}" fill="none" stroke="${C.v}" stroke-width="1.3"/>`; }
    return svg(380, 190, c + dot(174, 90, 7, '#E7B54A') + L(182, 90, 214, 90, 'o', 'e', { w: 2 }) + T(196, 82, 'vₛ', { it: 1, c: C.o, fs: 12 }) + T(330, 60, 'ahead: waves', { fs: 11, a: 'middle' }) + T(330, 74, 'bunched, λ smaller,', { fs: 11 }) + T(330, 88, 'f′ higher', { fs: 11, b: 1, c: C.r }) +
      T(40, 160, 'behind: λ larger, f′ lower', { fs: 11, a: 'start', b: 1, c: C.v }) + T(300, 180, 'source moving to the right', { fs: 11, c: C.sub }), 400); };
  F.dopG = () => svg(320, 160, axes(40, 140, 260, 120, 't', 'f′', { noO: 1 }) + L(40, 80, 300, 80, 's', '', { d: '4 4', w: 1 }) + T(36, 84, 'fₛ', { a: 'end', it: 1, fs: 12 }) +
    P('M50,48 L160,48 Q170,48 170,80 Q170,112 180,112 L290,112', 'r', { w: 2.6 }) + T(100, 40, 'approaching: f′ > fₛ', { fs: 11 }) + T(236, 104, 'receding: f′ < fₛ', { fs: 11 }) + T(170, 152, 'passes the observer', { fs: 11, c: C.sub }), 340);
  F.wall = () => svg(380, 110, dot(40, 60, 7, C.ball) + T(40, 88, 'O', { b: 1 }) + T(40, 102, '(stationary)', { fs: 10, c: C.sub }) + dot(200, 60, 8, '#E7B54A') + T(200, 88, 'S', { b: 1 }) + T(200, 102, 'fₛ = 100 Hz', { fs: 10, c: C.sub }) + L(210, 60, 250, 60, 'o', 'e', { w: 2 }) + T(232, 50, '20 m s⁻¹', { fs: 11, c: C.o }) +
    L(340, 20, 340, 100, 'k', '', { w: 4 }) + T(356, 64, 'T', { b: 1 }) + T(356, 80, 'wall', { fs: 10, c: C.sub }), 400);

  const S = `
${sec('21-1', '22.1 Propagation of sound waves', `
${ul([`A sound wave is a ${red('longitudinal wave')} that needs a medium (solid, liquid or gas) to travel.`, `The source of a sound wave is a vibrating object.`, `The sound wave travels as a series of ${red('compressions and rarefactions')} of the medium.`, `Sound travels slowest in gases, faster in liquids and fastest in solids. In a gas the speed depends on temperature: in air, <i>v</i> ≈ (331 + 0.606θ) ${ms}, θ in °C.`])}
${table(['Material (20 °C)', 'Speed of sound / m s<sup>−1</sup>'], [['Air', '343'], ['Air (0 °C)', '331'], ['Helium', '1005'], ['Water', '1440'], ['Sea water', '1560'], ['Glass', '≈ 4500'], ['Iron and steel', '≈ 5000'], ['Aluminium', '≈ 5100']])}
${h4('How a tuning fork produces sound')}
${ul([`When the prongs move outwards, they push the air in front of them together. The pressure rises slightly: a <b>compression</b> (condensation).`, `When the prongs move inwards, the air spreads out. The pressure falls slightly below normal: a <b>rarefaction</b>.`, `As the fork keeps vibrating, compressions and rarefactions are produced one after another and spread away from it.`])}
${fig(F.prop(), 'Figure 22.1: (a) the air layers at one instant (C = compression, R = rarefaction); (b) displacement y of the air particles against distance x; (c) excess pressure p against distance x.')}
${h4('Displacement and pressure')}
${two(`<p><b>Displacement</b> of the air particles</p>${eq(`<i>y</i> = <i>y</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>)`)}`, `<p><b>Pressure variation</b> (excess pressure)</p>${eq(`<i>p</i> = <i>p</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i> + ${fr('π', '2')})`)}`)}
${ul([`At a compression or a rarefaction, the particles have <b>zero displacement</b> (they pass through their equilibrium position at maximum speed). Here the pressure is <b>maximum</b> (compression, above <i>p</i><sub>atm</sub>) or <b>minimum</b> (rarefaction, below <i>p</i><sub>atm</sub>).`, `Where the displacement is maximum (<i>y</i> = ±<i>y</i><sub>0</sub>), the particles are momentarily at rest, their spacing is normal, and the excess pressure is zero.`, `So the pressure wave and the displacement wave are ${red('π/2 rad (a quarter cycle) out of phase')}: the pressure wave leads the displacement wave by π/2.`])}
${key(`phase difference between <i>p</i> and <i>y</i>: Δφ = ${fr('π', '2')} rad`, '<i>p</i><sub>0</sub> = maximum excess pressure = <i>p</i><sub>max</sub> − <i>p</i><sub>atm</sub>')}
${sim('soundwave', 'Sound wave: displacement and pressure', 'Watch the air layers. Each layer only vibrates back and forth about its own position. The compressions (dark) and rarefactions (light) move along. Compare the displacement graph with the pressure graph: they are a quarter cycle apart.')}
${example('22.1.1', `A sound wave in air is represented by <i>y</i> = 4.0 × 10<sup>−8</sup> sin (1200π<i>t</i> − 3.5π<i>x</i>) m. Find (a) the amplitude, (b) the wavelength, (c) the frequency, (d) the speed of sound in air.`,
  steps([`Compare with <i>y</i> = <i>y</i><sub>0</sub> sin (ω<i>t</i> − <i>kx</i>).`, `(a) <i>y</i><sub>0</sub> = <b>4.0 × 10<sup>−8</sup> m</b>`, `(b) <i>k</i> = 3.5π ⇒ λ = 2π/<i>k</i> = <b>0.571 m</b>`, `(c) ω = 1200π ⇒ <i>f</i> = ω/2π = <b>600 Hz</b>`, `(d) <i>v</i> = <i>f</i>λ = 600 × 0.571 = <b>343 ${ms}</b>`]))}
${card('STPM 2022', `Describe the propagation of sound waves in air. [2]`, ul([`Sound is a series of compressions and rarefactions (pressure variations) that travel through the air.`, `Sound waves travel in air as longitudinal waves: the air particles vibrate parallel to the direction of propagation.`]))}
`)}

${sec('21-2', '22.2 Sources of sound', `
<p>The source of any sound is a vibrating object, e.g. musical instruments (guitar, violin, flute, trumpet). The vibrations are standing waves on strings or in air columns.</p>
${h4('Stationary waves on a stretched string')}
${ul([`When a stretched string is plucked, a transverse progressive wave travels to the fixed ends and is reflected.`, `The incident and reflected waves (same frequency and amplitude) superpose to form a <b>stationary transverse wave</b>.`, `Both fixed ends are <b>nodes</b>. The vibrating string makes the air vibrate at the same frequency, producing sound.`])}
${fig(F.modes('str', [1, 2, 3], [['n = 1: fundamental', 'l = λ/2', 'f₁ = v/2l'], ['n = 2: 1st overtone', 'l = λ', 'f₂ = 2f₁'], ['n = 3: 2nd overtone', 'l = 3λ/2', 'f₃ = 3f₁']]), 'Figure 22.2: the first three modes of vibration of a string fixed at both ends.')}
${key(`<i>f<sub>n</sub></i> = ${fr('<i>nv</i>', '2<i>l</i>')} = <i>nf</i><sub>1</sub>, &nbsp; <i>n</i> = 1, 2, 3, … &nbsp;&nbsp; <i>v</i> = ${sq(fr('<i>T</i>', 'μ'))}`, '<i>n</i> = harmonic number (number of loops); <i>l</i> = length of string; <i>T</i> = tension; μ = mass per unit length (kg m<sup>−1</sup>); all harmonics are present')}
${table(['Term', 'Meaning'], [['Fundamental frequency', 'the lowest natural frequency of a vibrating system'], ['Harmonics', 'frequencies that are whole-number multiples of the fundamental frequency'], ['Overtones', 'the frequencies above the fundamental that the system can produce: the first overtone is the next one after the fundamental']])}
${example('22.2.1', `A string vibrates in five segments at a frequency of 460 Hz. (a) What is its fundamental frequency? (b) What frequency makes it vibrate in three segments?`,
  steps([`(a) five segments: <i>n</i> = 5; <i>f</i><sub>5</sub> = 5<i>f</i><sub>1</sub> ⇒ <i>f</i><sub>1</sub> = 460/5 = <b>92 Hz</b>`, `(b) <i>f</i><sub>3</sub> = 3(92) = <b>276 Hz</b>`]))}
${example('22.2.2', `A steel piano wire 0.400 m long has a mass of 3.00 g and is under a tension of 800 N. Find (a) the frequency of its fundamental mode, (b) the highest harmonic that could be heard by a person who can hear frequencies up to 10 000 Hz.`,
  steps([`μ = <i>m</i>/<i>l</i> = 3.00 × 10<sup>−3</sup>/0.400 = 7.5 × 10<sup>−3</sup> kg m<sup>−1</sup>`, `(a) <i>f</i><sub>1</sub> = ${fr('1', '2<i>l</i>')}${sq(fr('<i>T</i>', 'μ'))} = ${fr('1', '2(0.400)')}${sq(fr('800', '7.5 × 10<sup>−3</sup>'))} = <b>408 Hz</b>`, `(b) <i>n</i> = 10 000/408 = 24.5, so the highest harmonic heard is the <b>24th</b>.`]))}
${pq('STPM 2021 · Section A', `A string is fixed at both ends and plucked in the middle. The length, mass and tension of the string are 2.0 m, 8.0 g and 1.2 kN respectively. What is the fundamental frequency of the string?`, ['4.3 Hz', '68 Hz', '140 Hz', '270 Hz'], 2,
  `<p>μ = 0.0080/2.0 = 4.0 × 10<sup>−3</sup> kg m<sup>−1</sup>; <i>v</i> = √(1200/4.0 × 10<sup>−3</sup>) = 548 ${ms}; <i>f</i><sub>1</sub> = <i>v</i>/2<i>L</i> = 548/4.0 = 137 Hz ≈ 140 Hz.</p>`)}
${card('STPM 2022', `A string of length <i>L</i> is stretched between two fixed points with tension <i>T</i>. Sketch the shape of the string for the second overtone, and find the distance between two consecutive nodes in terms of the fundamental wavelength. [4]`,
  steps([`Second overtone = third harmonic (<i>n</i> = 3): the string forms <b>3 loops</b>.`, `<i>L</i> = 3(λ<sub>3</sub>/2) ⇒ distance between nodes = λ<sub>3</sub>/2 = <i>L</i>/3`, `fundamental: λ<sub>1</sub> = 2<i>L</i> ⇒ <i>L</i> = λ<sub>1</sub>/2, so the distance = <b>λ<sub>1</sub>/6</b>`]))}
${h4('Stationary waves in air columns')}
${ul([`A sound wave sent into a pipe is reflected at the end. The incident and reflected waves superpose to form a <b>stationary longitudinal wave</b>.`, `<b>Resonance</b> occurs, and a loud sound is heard, when the frequency of the source equals a natural frequency of the air column.`, `A <b>closed end</b> is always a <b>displacement node</b> (the air cannot move). An <b>open end</b> is a <b>displacement antinode</b>.`])}
${two(fig(F.modes('closed', [1, 3, 5], [['n = 1: fundamental', 'l = λ/4', 'f₁ = v/4l'], ['n = 3: 1st overtone', 'l = 3λ/4', 'f₃ = 3f₁'], ['n = 5: 2nd overtone', 'l = 5λ/4', 'f₅ = 5f₁']]), 'Figure 22.3: closed pipe (one end closed). Only odd harmonics.'),
  fig(F.modes('open', [1, 2, 3], [['n = 1: fundamental', 'l = λ/2', 'f₁ = v/2l'], ['n = 2: 1st overtone', 'l = λ', 'f₂ = 2f₁'], ['n = 3: 2nd overtone', 'l = 3λ/2', 'f₃ = 3f₁']]), 'Figure 22.4: open pipe (both ends open). All harmonics.'))}
${table(['', 'Closed pipe', 'Open pipe and string'], [['Fundamental', '<i>f</i><sub>1</sub> = <i>v</i>/4<i>l</i>', '<i>f</i><sub>1</sub> = <i>v</i>/2<i>l</i>'], ['General', '<i>f<sub>n</sub></i> = <i>nv</i>/4<i>l</i>, <i>n</i> = 1, 3, 5, … (odd harmonics only)', '<i>f<sub>n</sub></i> = <i>nv</i>/2<i>l</i>, <i>n</i> = 1, 2, 3, …'], ['1st overtone', '3<i>f</i><sub>1</sub>', '2<i>f</i><sub>1</sub>'], ['2nd overtone', '5<i>f</i><sub>1</sub>', '3<i>f</i><sub>1</sub>']])}
${h4('End correction')}
${def('End correction, <i>c</i>', `is ${red('the small distance between the open end of a pipe and the antinode just outside it')}. The air at the open end is free to move, so its vibration extends slightly beyond the end of the pipe.`)}
${fig(F.endc(), 'Figure 22.5: the antinode forms a distance c beyond each open end.')}
${table(['Closed pipe', 'Open pipe'], [['<i>l</i> + <i>c</i> = λ/4 &nbsp; ⇒ &nbsp; <i>f</i><sub>1</sub> = ' + fr('<i>v</i>', '4(<i>l</i> + <i>c</i>)'), '<i>l</i> + 2<i>c</i> = λ/2 &nbsp; ⇒ &nbsp; <i>f</i><sub>1</sub> = ' + fr('<i>v</i>', '2(<i>l</i> + 2<i>c</i>)')], ['<i>f<sub>n</sub></i> = ' + fr('<i>nv</i>', '4(<i>l</i> + <i>c</i>)') + ', <i>n</i> = 1, 3, 5, …', '<i>f<sub>n</sub></i> = ' + fr('<i>nv</i>', '2(<i>l</i> + 2<i>c</i>)') + ', <i>n</i> = 1, 2, 3, …']])}
${tip(`To find the end correction experimentally, use a resonance tube: find the first two resonance lengths <i>l</i><sub>1</sub> and <i>l</i><sub>2</sub> for the same tuning fork. Then <i>l</i><sub>2</sub> − <i>l</i><sub>1</sub> = λ/2 (the end correction cancels), and <i>c</i> = λ/4 − <i>l</i><sub>1</sub>.`)}
${sim('pipes', 'Harmonics in strings and pipes', 'Choose a string, an open pipe or a closed pipe, then step through the harmonics. Change the length and switch on the end correction. A closed pipe only has odd harmonics.')}
${example('22.2.3', `A pipe is 45.0 cm long. Find the fundamental frequency and the first three overtones (a) if the pipe is open at both ends, (b) if it is closed at one end. (c) For each case, find the highest harmonic that can be heard by a person who hears 20 Hz to 20 000 Hz. (<i>v</i> = 344 ${ms})`,
  steps([`(a) open: <i>f</i><sub>1</sub> = <i>v</i>/2<i>l</i> = 344/0.90 = <b>382 Hz</b>; overtones <i>f</i><sub>2</sub>, <i>f</i><sub>3</sub>, <i>f</i><sub>4</sub> = <b>764, 1147, 1529 Hz</b>`, `(b) closed: <i>f</i><sub>1</sub> = <i>v</i>/4<i>l</i> = 344/1.80 = <b>191 Hz</b>; overtones <i>f</i><sub>3</sub>, <i>f</i><sub>5</sub>, <i>f</i><sub>7</sub> = <b>573, 956, 1338 Hz</b>`, `(c) open: <i>n</i> = 20 000(0.90)/344 = 52.3 ⇒ <b>52nd harmonic</b>. Closed: <i>n</i> = 20 000(1.80)/344 = 104.7, but only odd harmonics exist ⇒ <b>103rd harmonic</b>.`]))}
${example('22.2.4', `A pipe 90 cm long is open at both ends. How long must a pipe closed at one end be to have the same fundamental frequency?`,
  steps([`${fr('<i>v</i>', '4<i>l</i><sub>c</sub>')} = ${fr('<i>v</i>', '2<i>l</i><sub>o</sub>')} ⇒ <i>l</i><sub>c</sub> = ${fr('<i>l</i><sub>o</sub>', '2')} = <b>45 cm</b>`]))}
${example('22.2.5', `A tube of air 1.5 m long is closed at one end. It sustains a standing wave at its third harmonic. What is the distance between a node and the adjacent antinode? (<i>v</i> = 331 ${ms})`,
  steps([`Third harmonic: <i>l</i> = 3λ/4 ⇒ λ = 4(1.5)/3 = 2.0 m`, `node to adjacent antinode = λ/4 = <b>0.5 m</b>`]))}
${example('22.2.6', `A pipe closed at one end produces a fundamental note of 300 Hz. The end correction is 8.00 mm and the speed of sound is 330 ${ms}. Calculate the length of the pipe.`,
  steps([`<i>f</i><sub>1</sub> = ${fr('<i>v</i>', '4(<i>l</i> + <i>c</i>)')} ⇒ <i>l</i> + <i>c</i> = ${fr('330', '4(300)')} = 0.275 m`, `<i>l</i> = 0.275 − 0.008 = <b>0.267 m</b>`]))}
${h4('Real instruments: the guitar and the flute')}
${ul([`<b>Guitar</b>: each string is fixed at the bridge and at the nut, so it vibrates with nodes at both ends: <i>f</i><sub>1</sub> = ${fr('1', '2<i>l</i>')}${sq(fr('<i>T</i>', 'μ'))}. Thicker strings (larger μ) give lower notes; turning the tuning peg changes the tension <i>T</i>.`, `Pressing a string against a <b>fret</b> shortens the vibrating length. The frets are placed so that each one raises the note by a semitone; the 12th fret is halfway along the string, so the note is one octave higher (double the frequency).`, `<b>Flute</b>: a pipe open at both ends (the mouth hole and the far end), so there is an antinode at each end: <i>f</i><sub>1</sub> = ${fr('<i>v</i>', '2<i>l</i>')}. Opening a finger hole makes the air column end there, so it is shorter and the note is higher.`, `Blowing harder makes the flute sound its second harmonic (overblowing): the same fingering gives a note one octave higher.`])}
${sim('instruments', 'Guitar and flute', 'Choose the guitar or the flute. On the guitar, pick a string, change the tension and press a fret. On the flute, choose a note and overblow. Watch the vibrating length and the stationary wave, and switch on the sound to hear the note.')}
${example('22.2.7', `The thinnest string of a guitar has a vibrating length of 0.648 m and a mass per unit length of 4.0 × 10<sup>−4</sup> kg m<sup>−1</sup>. It is tuned to a fundamental frequency of 330 Hz. Find (a) the speed of the transverse wave on the string, (b) the tension in the string, (c) the frequency when the string is pressed at the 12th fret, halfway along.`,
  steps([`(a) Fundamental: <i>l</i> = λ/2 ⇒ λ = 1.296 m; <i>v</i> = <i>f</i>λ = (330)(1.296) = <b>428 ${ms}</b>`, `(b) <i>v</i> = ${sq(fr('<i>T</i>', 'μ'))} ⇒ <i>T</i> = <i>v</i><sup>2</sup>μ = (428)<sup>2</sup>(4.0 × 10<sup>−4</sup>) = <b>73 N</b>`, `(c) <i>f</i> ∝ ${fr('1', '<i>l</i>')}: half the length gives <b>660 Hz</b>, one octave higher`]))}
${exercises('Exercises: strings and pipes', [
  { q: `The distance between the first and the fourth antinodes of a stationary wave on a string is 15 cm. What is the speed of the wave if it vibrates at 50 Hz?`, a: `3 × λ/2 = 15 cm ⇒ λ = 0.10 m; <i>v</i> = 5 ${ms}` },
  { q: `A string 2.0 m long is fixed at both ends. At 85.0 Hz a standing wave with five loops forms. Find (a) the wavelength, (b) the wave speed, (c) the fundamental frequency.`, a: `(a) 0.8 m &nbsp; (b) 68 ${ms} &nbsp; (c) 17 Hz` }])}
`)}

${sec('21-3', '22.3 Intensity level of sound', `
${def('Intensity of sound', `is ${red('the rate of energy transported per unit area perpendicular to the direction of propagation')}: <i>I</i> = ${fr('<i>E</i>', '<i>tA</i>')} = ${fr('<i>P</i>', '<i>A</i>')}, unit W m<sup>−2</sup>.`)}
<p>For a point source radiating uniformly, <i>A</i> = 4π<i>r</i><sup>2</sup>, so ${fr('<i>I</i><sub>2</sub>', '<i>I</i><sub>1</sub>')} = ${fr('<i>r</i><sub>1</sub><sup>2</sup>', '<i>r</i><sub>2</sub><sup>2</sup>')}. The intensity (and so the loudness) depends on the amplitude, <i>I</i> ∝ <i>A</i><sup>2</sup>, and on the distance, <i>I</i> ∝ 1/<i>r</i><sup>2</sup>.</p>
${fig(F.Ir())}
${example('22.3.1', `A loudspeaker radiates sound uniformly in all directions. At 3 m the intensity is 0.4 W m<sup>−2</sup>. Find the power of the loudspeaker and the intensity at 5 m.`,
  steps([`<i>P</i> = <i>I</i>(4π<i>r</i><sup>2</sup>) = 0.4 × 4π(3)<sup>2</sup> = <b>45.2 W</b>`, `<i>I</i><sub>2</sub> = <i>I</i><sub>1</sub>(<i>r</i><sub>1</sub>/<i>r</i><sub>2</sub>)<sup>2</sup> = 0.4(3/5)<sup>2</sup> = <b>0.144 W m<sup>−2</sup></b>`]))}
${h4('Intensity level')}
${ul([`<b>Threshold of hearing</b>: the lowest intensity a normal ear can detect, <i>I</i><sub>0</sub> = 1.0 × 10<sup>−12</sup> W m<sup>−2</sup>.`, `<b>Threshold of pain</b>: about 1 W m<sup>−2</sup>.`, `Our sense of loudness follows the logarithm of the intensity, so a logarithmic scale is used.`])}
${def('Intensity level of sound, β', `is ${red('a logarithmic measure of the intensity of a sound compared with the threshold of hearing')}.`)}
${key(`β = 10 log<sub>10</sub> ${fr('<i>I</i>', '<i>I</i><sub>0</sub>')}`, 'unit: decibel (dB). <i>I</i><sub>0</sub> = 1.0 × 10<sup>−12</sup> W m<sup>−2</sup>. An increase of 10 dB means the intensity is 10 times greater; +3 dB means the intensity doubles.')}
${table(['Sound', 'Intensity level / dB'], [['threshold of hearing', '0'], ['whisper', '20'], ['conversation, classroom', '60'], ['siren, rock concert', '100'], ['jet aeroplane, threshold of pain', '120']])}
${example('22.3.2', `The intensity of a sound wave is 1 W m<sup>−2</sup>. Calculate its intensity level.`,
  steps([`β = 10 log<sub>10</sub> (1/10<sup>−12</sup>) = 10 × 12 = <b>120 dB</b>`]))}
${example('22.3.3', `The intensity level of one sound is 80 dB and of another is 20 dB. Find the ratio of their intensities.`,
  steps([`<i>I</i><sub>1</sub>/<i>I</i><sub>0</sub> = 10<sup>8</sup>, <i>I</i><sub>2</sub>/<i>I</i><sub>0</sub> = 10<sup>2</sup> ⇒ <i>I</i><sub>1</sub>/<i>I</i><sub>2</sub> = <b>10<sup>6</sup></b>`, `Shortcut: β<sub>1</sub> − β<sub>2</sub> = 10 log (<i>I</i><sub>1</sub>/<i>I</i><sub>2</sub>) ⇒ 60 = 10 log (<i>I</i><sub>1</sub>/<i>I</i><sub>2</sub>)`]))}
${pq('STPM 2022 · Section A', `The sound intensity level of 88.0 dB is detected 30.0 cm from a point source. What is the energy received at that point in one second? [<i>I</i><sub>0</sub> = 1.00 × 10<sup>−12</sup> W m<sup>−2</sup>]`, ['1.19 × 10<sup>−3</sup> J', '7.14 × 10<sup>−4</sup> J', '5.58 × 10<sup>−3</sup> J', '1.78 × 10<sup>−3</sup> J'], 1,
  `<p><i>I</i> = 10<sup>8.8</sup> × 10<sup>−12</sup> = 6.31 × 10<sup>−4</sup> W m<sup>−2</sup>; <i>P</i> = <i>I</i> × 4π<i>r</i><sup>2</sup> = 6.31 × 10<sup>−4</sup> × 4π(0.300)<sup>2</sup> = 7.14 × 10<sup>−4</sup> W, i.e. 7.14 × 10<sup>−4</sup> J each second.</p>`)}
${card('STPM 2021', `A bomb blasts 12 m from a soldier. The area of his eardrum is 25 mm<sup>2</sup> and the sound energy it receives every second is 1.0 × 10<sup>−6</sup> W. [<i>I</i><sub>0</sub> = 10<sup>−12</sup> W m<sup>−2</sup>] (a) Find the sound intensity level at the eardrum. [3] (b) Find the change in level if the soldier is 17 m from the blast. [3] (c) If the level increases by 3 dB, what happens to the intensity? [1]`,
  steps([`(a) <i>I</i> = <i>P</i>/<i>A</i> = 1.0 × 10<sup>−6</sup>/25 × 10<sup>−6</sup> = 0.040 W m<sup>−2</sup>; β = 10 log (0.040/10<sup>−12</sup>) = <b>106 dB</b>`, `(b) <i>I</i><sub>2</sub> = 0.040(12/17)<sup>2</sup> = 0.0199 W m<sup>−2</sup>; β<sub>2</sub> = 103.0 dB ⇒ a <b>decrease of 3.0 dB</b>`, `(c) 3 = 10 log (<i>I</i><sub>2</sub>/<i>I</i><sub>1</sub>) ⇒ <i>I</i><sub>2</sub>/<i>I</i><sub>1</sub> = 10<sup>0.3</sup> ≈ 2: the intensity <b>doubles</b>.`]))}
`)}

${sec('21-4', '22.4 Beats', `
${def('Beats', `are ${red('the periodic variation in amplitude (loudness) at a point, caused by the superposition of two sound waves of slightly different frequencies')}.`)}
${fig(F.beats(), 'Figure 22.6: two waves of 50 Hz and 60 Hz and their sum. The loudness rises and falls 10 times per second.')}
${ul([`Where the two waves are in phase, they interfere constructively: the amplitude is maximum and a loud sound is heard.`, `Where they are in antiphase, they interfere destructively: the amplitude is minimum and little or no sound is heard.`, `The number of times per second the loudness rises and falls is the <b>beat frequency</b>.`])}
${h4('Derivation of the beat frequency')}
${steps([`<i>y</i><sub>1</sub> = <i>A</i> sin 2π<i>f</i><sub>1</sub><i>t</i>, &nbsp; <i>y</i><sub>2</sub> = <i>A</i> sin 2π<i>f</i><sub>2</sub><i>t</i> &nbsp; (<i>f</i><sub>1</sub> > <i>f</i><sub>2</sub>)`, `<i>y</i> = <i>y</i><sub>1</sub> + <i>y</i><sub>2</sub>, with sin <i>P</i> + sin <i>Q</i> = 2 cos ${fr('<i>P</i> − <i>Q</i>', '2')} sin ${fr('<i>P</i> + <i>Q</i>', '2')}`, `<i>y</i> = [2<i>A</i> cos 2π(${fr('<i>f</i><sub>1</sub> − <i>f</i><sub>2</sub>', '2')})<i>t</i>] sin 2π(${fr('<i>f</i><sub>1</sub> + <i>f</i><sub>2</sub>', '2')})<i>t</i>`, `The sound heard has frequency (<i>f</i><sub>1</sub> + <i>f</i><sub>2</sub>)/2. Its amplitude 2<i>A</i> cos 2π(${fr('<i>f</i><sub>1</sub> − <i>f</i><sub>2</sub>', '2')})<i>t</i> varies slowly.`, `The loudness is maximum whenever the cosine is +1 <b>or</b> −1, i.e. twice in each cycle of the cosine. So the beat frequency is twice (<i>f</i><sub>1</sub> − <i>f</i><sub>2</sub>)/2.`])}
${key(`<i>f</i><sub>beat</sub> = <i>f</i><sub>1</sub> − <i>f</i><sub>2</sub> = ${fr('<i>v</i>', 'λ<sub>1</sub>')} − ${fr('<i>v</i>', 'λ<sub>2</sub>')}`, 'beat period <i>T</i><sub>beat</sub> = 1/<i>f</i><sub>beat</sub>. For 50 Hz and 60 Hz: 10 beats per second, <i>T</i><sub>beat</sub> = 0.10 s.')}
${tip(`Beats are used to tune instruments: the string is adjusted until the beats with a reference tuning fork slow down and disappear (<i>f</i><sub>beat</sub> = 0).`)}
${sim('beats', 'Beats', 'Set two frequencies that are close together. The green curve is their sum: its amplitude rises and falls at the beat frequency. Press Listen to hear the beats (use earphones or a speaker).')}
${example('22.4.1', `Two sound waves of wavelengths 3.00 m and 2.50 m superpose. Both travel at 330 ${ms}. How many beats are produced each second?`,
  steps([`<i>f</i><sub>beat</sub> = ${fr('330', '2.50')} − ${fr('330', '3.00')} = 132 − 110 = <b>22 Hz</b>, i.e. 22 beats per second`]))}
${pq('STPM 2022 · Section A', `A musician plucks the first two strings of a ukulele together and hears three beats per second. The first string is tuned to 350 Hz. The musician tightens the screw to stretch the second string, plucks the two strings again and hears two beats per second. What was the frequency of the second string before it was stretched?`, ['345 Hz', '347 Hz', '351 Hz', '353 Hz'], 1,
  `<p>At first |350 − <i>f</i><sub>2</sub>| = 3, so <i>f</i><sub>2</sub> = 347 Hz or 353 Hz. Tightening increases the tension, so <i>f</i><sub>2</sub> increases. The beat frequency falls from 3 to 2, so <i>f</i><sub>2</sub> moved closer to 350 Hz: it was <b>347 Hz</b> (now 348 Hz).</p>`)}
`)}

${sec('21-5', '22.5 Doppler effect', `
${def('Doppler effect', `is ${red('the change in the observed frequency of a wave because of the relative motion between the source and the observer')}.`)}
${fig(F.doppler(), 'Figure 22.7: a moving source. The wavefronts are closer together in front of the source and further apart behind it.')}
${ul([`Source at rest: every observer hears the source frequency <i>f</i><sub>s</sub>.`, `Source moving <b>towards</b> the observer: the wavelength reaching the observer is shorter, so the observed frequency is <b>higher</b> (<i>f</i>′ > <i>f</i><sub>s</sub>).`, `Source moving <b>away</b>: the wavelength is longer, so the observed frequency is <b>lower</b> (<i>f</i>′ < <i>f</i><sub>s</sub>).`])}
${h4('Derivation')}
${steps([`<b>Moving source</b> (speed <i>u</i><sub>s</sub>, towards the observer): in one period <i>T</i> = 1/<i>f</i>, the source moves <i>u</i><sub>s</sub><i>T</i> while the wave moves <i>vT</i>. The wavelength ahead is λ′ = (<i>v</i> − <i>u</i><sub>s</sub>)/<i>f</i>.`, `<i>f</i>′ = <i>v</i>/λ′ = ${fr('<i>v</i>', '<i>v</i> − <i>u</i><sub>s</sub>')}<i>f</i> &nbsp; (away: <i>v</i> + <i>u</i><sub>s</sub>)`, `<b>Moving observer</b> (speed <i>u</i><sub>o</sub>, towards the source): the waves pass the observer at relative speed <i>v</i> + <i>u</i><sub>o</sub>; the wavelength is unchanged, λ = <i>v</i>/<i>f</i>.`, `<i>f</i>′ = ${fr('<i>v</i> + <i>u</i><sub>o</sub>', 'λ')} = ${fr('<i>v</i> + <i>u</i><sub>o</sub>', '<i>v</i>')}<i>f</i> &nbsp; (away: <i>v</i> − <i>u</i><sub>o</sub>)`])}
${key(`<i>f</i>′ = ${fr('<i>v</i> ± <i>u</i><sub>o</sub>', '<i>v</i> ∓ <i>u</i><sub>s</sub>')} <i>f</i>`, '<i>v</i> = speed of sound; <i>u</i><sub>o</sub>, <i>u</i><sub>s</sub> = speeds of observer and source along the line joining them. Upper signs: moving <b>towards</b> each other (<i>f</i>′ increases). Lower signs: moving <b>away</b> (<i>f</i>′ decreases).')}
${tip(`Decide the sign from the physics, not from memory: “towards” must make <i>f</i>′ bigger (bigger numerator or smaller denominator); “away” must make <i>f</i>′ smaller.`)}
${fig(F.dopG(), 'Figure 22.8: the frequency heard by a stationary observer as a source approaches, passes and moves away at constant speed.')}
${ul([`While the source approaches, the observed frequency is constant and higher than <i>f</i><sub>s</sub>; it drops to <i>f</i><sub>s</sub> as the source passes; it is then constant and lower while the source moves away.`, `The <b>loudness</b> does change: as the source comes closer, <i>r</i> decreases and <i>I</i> ∝ 1/<i>r</i><sup>2</sup> increases. Do not confuse loudness (intensity) with pitch (frequency).`])}
${sim('doppler', 'Doppler effect', 'Move the source, or the observer, and watch the wavefronts. Compare the frequency heard by the observer in front of the source with the one behind it.')}
${example('22.5.1', `A factory whistle emits sound at 900 Hz. What frequency is heard by a person in a car travelling at 70 km h<sup>−1</sup> (a) away from the whistle, (b) towards it? (<i>v</i> = 340 ${ms})`,
  steps([`<i>u</i><sub>o</sub> = 70 km h<sup>−1</sup> = 19.4 ${ms}`, `(a) <i>f</i>′ = ${fr('340 − 19.4', '340')}(900) = <b>849 Hz</b>`, `(b) <i>f</i>′ = ${fr('340 + 19.4', '340')}(900) = <b>951 Hz</b>`]))}
${example('22.5.2', `An observer moves along the line joining two identical sources, each of frequency 500 Hz. The observer hears 4.0 beats per second. Find the speed of the observer. (<i>v</i> = 340 ${ms})`,
  steps([`Moving towards one source: <i>f</i><sub>1</sub>′ = ${fr('<i>v</i> + <i>u</i><sub>o</sub>', '<i>v</i>')}<i>f</i> (higher). Moving away from the other: <i>f</i><sub>2</sub>′ = ${fr('<i>v</i> − <i>u</i><sub>o</sub>', '<i>v</i>')}<i>f</i> (lower).`, `<i>f</i><sub>beat</sub> = <i>f</i><sub>1</sub>′ − <i>f</i><sub>2</sub>′ = ${fr('2<i>fu</i><sub>o</sub>', '<i>v</i>')} ⇒ 4.0 = ${fr('2(500)<i>u</i><sub>o</sub>', '340')}`, `<i>u</i><sub>o</sub> = <b>1.36 ${ms}</b>`]))}
${example('22.5.3', `Two identical sources S<sub>1</sub> and S<sub>2</sub>, each of frequency 500 Hz, move towards a stationary observer at 20 ${ms} and 23 ${ms}. Find the beat frequency heard. (<i>v</i> = 340 ${ms})`,
  steps([`<i>f</i><sub>1</sub>′ = 500 × ${fr('340', '340 − 20')} = 531.25 Hz; &nbsp; <i>f</i><sub>2</sub>′ = 500 × ${fr('340', '340 − 23')} = 536.28 Hz`, `<i>f</i><sub>beat</sub> = 536.28 − 531.25 = <b>5.03 Hz</b>`]))}
${card('STPM 2022', `An ambulance moves at 42 ${ms} and sounds its siren at 960 Hz. A bus in front of the ambulance stops at the roadside. [<i>v</i> = 330 ${ms}] (i) Find the frequency of the siren heard by the passengers in the bus. [2] (ii) The sound is reflected by the bus. Find the frequency and the wavelength of the reflected sound heard by the ambulance driver. [2] (iii) What change in frequency do the passengers hear after the ambulance overtakes the bus? [1]`,
  steps([`(i) <i>f</i>′ = 960 × ${fr('330', '330 − 42')} = <b>1100 Hz</b>`, `(ii) The bus reflects 1100 Hz as a stationary source; the driver moves towards it: <i>f</i>″ = 1100 × ${fr('330 + 42', '330')} = <b>1240 Hz</b>. The reflected wave in the air has λ = <i>v</i>/<i>f</i>′ = 330/1100 = <b>0.300 m</b> (a moving observer changes the frequency heard, not the wavelength in the air).`, `(iii) The frequency heard <b>decreases</b> (the siren now moves away).`]))}
${exercises('Exercise: Doppler effect and beats', [
  { q: `O is a stationary observer. Source S moves away from O towards a wall T at 20 ${ms}; its frequency is 100 Hz. (<i>v</i> = 340 ${ms}) Find (a) the wavelength in front of and behind the source (ignore the wall), (b) the frequency O hears directly from S, (c) the frequency O hears after reflection from T, (d) the beat frequency O hears.`, f: fig(F.wall()),
    a: `(a) in front: (340 − 20)/100 = 3.2 m; behind: (340 + 20)/100 = 3.6 m &nbsp; (b) 100 × 340/360 = 94 Hz &nbsp; (c) 100 × 340/320 = 106 Hz &nbsp; (d) 106 − 94 = 12 Hz` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S3-22', { html: () => S });

  // ===================== simulations =====================
  const TAU = 2 * Math.PI;
  // ---------- 1. sound wave: layers, displacement, pressure ----------
  window.PhysiQSims.add('soundwave', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { f: 0.5, t: 0, play: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'frequency (slowed down)', 0.2, 1.2, 0.05, S.f, 'Hz', v => { S.f = v; });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.7, 340, 480); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 30, W = w - 50, lam = W / 2.5, k = TAU / lam, om = TAU * S.f, A = Math.min(14, lam * 0.11), y = x => A * Math.sin(om * S.t - k * x);
      // layers
      const top = 20, hh = h * 0.22;
      for (let i = 0; i <= 90; i++) { const xe = W * i / 90, X = x0 + xe + y(xe); const hl = i === 45; ctx.strokeStyle = hl ? COL.r : COL.v; ctx.lineWidth = hl ? 3 : 1.4; ctx.beginPath(); ctx.moveTo(X, top); ctx.lineTo(X, top + hh); ctx.stroke(); }
      text(ctx, 'one air layer (red) only moves back and forth', x0, top + hh + 14, { fs: 11, c: COL.r });
      // graphs
      const g = (y0, f, c, lab, unit) => { const gh = h * 0.2; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + W, y0); ctx.moveTo(x0, y0 - gh / 2 - 6); ctx.lineTo(x0, y0 + gh / 2 + 6); ctx.stroke();
        ctx.strokeStyle = c; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const xe = W * i / 200, v = f(xe); i ? ctx.lineTo(x0 + xe, y0 - v * gh / 2) : ctx.moveTo(x0 + xe, y0 - v * gh / 2); } ctx.stroke(); text(ctx, lab, x0 + 4, y0 - gh / 2 - 8, { b: 1, fs: 12, c }); text(ctx, unit, x0 + W, y0 + gh / 2 + 4, { a: 'right', fs: 10, c: COL.sub }); };
      const gy1 = top + hh + 30 + h * 0.12, gy2 = gy1 + h * 0.3;
      g(gy1, xe => Math.sin(om * S.t - k * xe), COL.v, 'displacement y', 'x →');
      g(gy2, xe => Math.sin(om * S.t - k * xe + Math.PI / 2), COL.r, 'excess pressure p', 'x →');
      // mark compressions (p max) with dashed lines
      ctx.setLineDash([3, 4]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1;
      for (let m = -3; m < 6; m++) { const xe = (om * S.t + Math.PI / 2 - Math.PI / 2 - TAU * m) / k; if (xe < 0 || xe > W) continue; ctx.beginPath(); ctx.moveTo(x0 + xe, top); ctx.lineTo(x0 + xe, gy2 + h * 0.1); ctx.stroke(); text(ctx, 'C', x0 + xe + 3, top - 4, { fs: 11, b: 1, c: COL.r }); }
      ctx.setLineDash([]);
    }
    loop(cv, dt => { if (S.play) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. strings and pipes ----------
  window.PhysiQSims.add('pipes', function (root) {
    const { COL, fmt, el, slider, button, toggle, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { kind: 'closed', n: 1, l: 0.5, v: 340, ec: false, t: 0 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const kinds = [['str', 'string (both ends fixed)'], ['open', 'open pipe'], ['closed', 'closed pipe']].map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.kind ? ' on' : ''), () => { S.kind = k; kinds.forEach(x => x.classList.toggle('on', x === b)); S.n = 1; mk(); }); return b; });
    const hb = el('div', 'sm-row sm-pre'); root.appendChild(hb);
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'length <i>l</i>', 0.2, 1.5, 0.01, S.l, 'm', v => { S.l = v; });
    const etg = toggle(ctl, 'End correction (c = 0.6r, r = 2 cm)', S.ec, v => { S.ec = v; });
    const cv = canvas(root); const ro = readouts(root);
    function mk() { hb.innerHTML = ''; hb.appendChild(el('span', 'sm-sl-l', 'mode')); const ns = S.kind === 'closed' ? [1, 3, 5, 7] : [1, 2, 3, 4]; ns.forEach(n => { const b = button(hb, (n === 1 ? 'fundamental' : 'n = ' + n), 'sm-chip' + (n === S.n ? ' on' : ''), () => { S.n = n; mk(); }); }); }
    mk();
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.42, 220, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const c = S.ec && S.kind !== 'str' ? 0.012 : 0, x0 = 40, W = w - 80, my = h * 0.45, a = h * 0.22, sc = W / S.l * (S.l / 1.5) * 1.5 / 1.0;
      const len = W * (0.45 + 0.55 * S.l / 1.5), px = x => x0 + x / S.l * len;
      const leff = S.kind === 'str' ? S.l : S.kind === 'open' ? S.l + 2 * c : S.l + c, lam = S.kind === 'closed' ? 4 * leff / S.n : 2 * leff / S.n, f = S.v / lam;
      if (S.kind === 'str') { ctx.fillStyle = COL.ink; ctx.fillRect(px(0) - 6, my - a - 6, 6, 2 * a + 12); ctx.fillRect(px(S.l), my - a - 6, 6, 2 * a + 12); }
      else { ctx.strokeStyle = COL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px(0), my - a - 6); ctx.lineTo(px(S.l), my - a - 6); ctx.moveTo(px(0), my + a + 6); ctx.lineTo(px(S.l), my + a + 6); ctx.stroke(); if (S.kind === 'closed') { ctx.fillStyle = COL.ink; ctx.fillRect(px(0) - 6, my - a - 8, 6, 2 * a + 16); } }
      const shape = x => { // x along the tube from the closed/left end (in m), effective coordinates
        if (S.kind === 'str') return Math.sin(S.n * Math.PI * x / S.l);
        if (S.kind === 'open') return Math.cos(TAU * (x + c) / lam);
        return Math.sin(TAU * x / lam);
      };
      const xs = S.kind === 'open' ? -c : 0, xe = S.kind === 'str' ? S.l : S.l + c, cs = Math.cos(TAU * 0.9 * S.t);
      [[1, COL.v, []], [-1, COL.v, [5, 4]]].forEach(([s, col, d]) => { ctx.strokeStyle = 'rgba(106,99,236,.35)'; ctx.setLineDash(d); ctx.lineWidth = 1.4; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const x = xs + (xe - xs) * i / 160; i ? ctx.lineTo(px(x), my - s * a * shape(x)) : ctx.moveTo(px(x), my - s * a * shape(x)); } ctx.stroke(); }); ctx.setLineDash([]);
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.6; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const x = xs + (xe - xs) * i / 160; i ? ctx.lineTo(px(x), my - a * shape(x) * cs) : ctx.moveTo(px(x), my - a * shape(x) * cs); } ctx.stroke();
      // N and A labels
      for (let m = 0; m <= 16; m++) { const x = S.kind === 'str' ? m * lam / 2 : S.kind === 'open' ? m * lam / 2 - c : (m * lam / 2); if (x > xe + 1e-6) break; if (x < xs - 1e-6) continue; text(ctx, S.kind === 'open' ? 'A' : 'N', px(x), my + a + 24, { a: 'center', b: 1, fs: 12, c: S.kind === 'open' ? COL.gr : COL.r }); }
      for (let m = 0; m <= 16; m++) { const x = S.kind === 'str' ? lam / 4 + m * lam / 2 : S.kind === 'open' ? lam / 4 + m * lam / 2 - c : lam / 4 + m * lam / 2; if (x > xe + 1e-6) break; if (x < xs - 1e-6) continue; text(ctx, S.kind === 'open' ? 'N' : 'A', px(x), my + a + 24, { a: 'center', b: 1, fs: 12, c: S.kind === 'open' ? COL.r : COL.gr }); }
      if (c) text(ctx, 'antinode a distance c outside each open end', w - 10, 16, { a: 'right', fs: 11, c: COL.o, b: 1 });
      text(ctx, S.kind === 'str' ? 'transverse displacement' : 'displacement of the air (drawn sideways)', 10, h - 8, { fs: 10, c: COL.sub });
      const ov = S.kind === 'closed' ? (S.n - 1) / 2 : S.n - 1;
      ro([['harmonic', 'n = ' + S.n + (S.n === 1 ? ' (fundamental)' : ''), 'hl'], ['overtone', ov ? (ov === 1 ? '1st' : ov === 2 ? '2nd' : ov === 3 ? '3rd' : ov + 'th') + ' overtone' : '—'], ['λ', fmt(lam, 3) + ' m'], ['frequency (v = 340 m/s)', fmt(f, 0) + ' Hz', 'hl'], ['formula', S.kind === 'closed' ? 'f = nv/4(l + c)' : S.kind === 'open' ? 'f = nv/2(l + 2c)' : 'f = nv/2l']]);
    }
    loop(cv, dt => { S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. beats ----------
  window.PhysiQSims.add('beats', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { f1: 440, f2: 444 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'f₁', 400, 480, 1, S.f1, 'Hz', v => { S.f1 = v; draw(); });
    slider(ctl, 'f₂', 400, 480, 1, S.f2, 'Hz', v => { S.f2 = v; draw(); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    let ac = null, nodes = null;
    const lb = button(bar, '♪ Listen (3 s)', 'sm-main', () => {
      try {
        if (nodes) return; ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const g = ac.createGain(); g.gain.value = 0.0; g.connect(ac.destination);
        const o1 = ac.createOscillator(), o2 = ac.createOscillator(); o1.frequency.value = S.f1; o2.frequency.value = S.f2; o1.connect(g); o2.connect(g); const t0 = ac.currentTime;
        g.gain.linearRampToValueAtTime(0.12, t0 + 0.05); g.gain.setValueAtTime(0.12, t0 + 2.9); g.gain.linearRampToValueAtTime(0, t0 + 3);
        o1.start(); o2.start(); o1.stop(t0 + 3.05); o2.stop(t0 + 3.05); nodes = [o1, o2]; lb.textContent = '♪ Playing…'; o1.onended = () => { nodes = null; lb.textContent = '♪ Listen (3 s)'; };
      } catch (e) { lb.textContent = 'Sound not available'; }
    });
    const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const df = Math.abs(S.f1 - S.f2), tm = df > 0 ? Math.min(2 / df, 1) : 0.5, x0 = 40, W = w - 56, X = t => x0 + t / tm * W;
      // show slowed-down picture: draw with scaled frequencies so oscillations are visible
      const vis = 60 / ((S.f1 + S.f2) / 2) * (1 / tm) * 0.5, f1 = S.f1 * vis * tm, f2 = S.f2 * vis * tm;
      const row = (y0, f, c, lab, amp) => { ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.beginPath(); for (let i = 0; i <= 800; i++) { const u = i / 800, v = f(u); i ? ctx.lineTo(x0 + u * W, y0 - v * amp) : ctx.moveTo(x0 + u * W, y0 - v * amp); } ctx.stroke(); text(ctx, lab, 6, y0 + 4, { fs: 11, b: 1, c }); };
      const a = h * 0.07, y1 = u => Math.sin(TAU * S.f1 * u * tm), y2 = u => Math.sin(TAU * S.f2 * u * tm);
      row(h * 0.14, y1, COL.v, 'f₁', a); row(h * 0.32, y2, COL.o, 'f₂', a);
      const ys = h * 0.66; ctx.strokeStyle = 'rgba(192,57,43,.7)'; ctx.setLineDash([4, 3]); [1, -1].forEach(s => { ctx.beginPath(); for (let i = 0; i <= 300; i++) { const u = i / 300, e = Math.abs(2 * Math.cos(Math.PI * df * u * tm)); i ? ctx.lineTo(x0 + u * W, ys - s * e * a * 1.6) : ctx.moveTo(x0 + u * W, ys - s * e * a * 1.6); } ctx.stroke(); }); ctx.setLineDash([]);
      row(ys, u => y1(u) + y2(u), COL.gr, 'sum', a * 1.6);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, h - 26); ctx.lineTo(x0 + W, h - 26); ctx.stroke();
      text(ctx, '0', x0, h - 12, { a: 'center', fs: 10, c: COL.sub }); text(ctx, fmt(tm, 2) + ' s', x0 + W, h - 12, { a: 'right', fs: 10, c: COL.sub }); text(ctx, df ? 'time (waves drawn slowed down)' : 'equal frequencies: no beats', x0 + W / 2, h - 12, { a: 'center', fs: 10, c: COL.sub });
      ro([['beat frequency |f₁ − f₂|', df + ' Hz', 'hl'], ['beat period', df ? fmt(1 / df, 2) + ' s' : '—'], ['frequency heard (f₁ + f₂)/2', fmt((S.f1 + S.f2) / 2, 1) + ' Hz']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 4. Doppler effect ----------
  window.PhysiQSims.add('doppler', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const v = 340, S = { us: 120, uo: 0, f: 400, t: 0, fronts: [], acc: 0, sx: 0, ox: 0, play: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'source speed uₛ (to the right)', 0, 300, 5, S.us, 'm/s', x => { S.us = x; reset(); });
    slider(ctl, 'observer speed uₒ (to the left)', 0, 200, 5, S.uo, 'm/s', x => { S.uo = x; reset(); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.play = !S.play; pb.textContent = S.play ? '❚❚ Pause' : '▶ Play'; });
    button(bar, '↺ Restart', '', reset);
    const ro = readouts(root);
    function reset() { S.t = 0; S.fronts = []; S.acc = 0; S.sx = -0.35; S.ox = 0.45; }
    reset();
    // world units: 1 = canvas half width; time slowed: sound speed 0.35 width/s
    const VS = 0.35;
    function step(dt) { S.t += dt; S.sx += S.us / v * VS * dt; S.ox -= S.uo / v * VS * dt; S.acc += dt; const per = 0.28; while (S.acc > per) { S.acc -= per; S.fronts.push([S.sx, S.t]); } S.fronts = S.fronts.filter(([, t0]) => (S.t - t0) * VS < 2.2); if (S.sx > 0.9 || S.ox < -0.95) reset(); }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 260, 380); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const sc = w / 2, cx = w / 2, cy = h * 0.5, X = x => cx + x * sc;
      ctx.strokeStyle = COL.v; ctx.lineWidth = 1.3; S.fronts.forEach(([x, t0]) => { ctx.beginPath(); ctx.arc(X(x), cy, (S.t - t0) * VS * sc, 0, 7); ctx.stroke(); });
      ctx.beginPath(); ctx.arc(X(S.sx), cy, 9, 0, 7); ctx.fillStyle = '#E7B54A'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke(); text(ctx, 'S', X(S.sx), cy - 14, { a: 'center', b: 1 });
      // observers: one ahead (moving observer), one behind (stationary)
      const ob = (x, lab, c) => { ctx.beginPath(); ctx.arc(X(x), cy, 8, 0, 7); ctx.fillStyle = c; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke(); text(ctx, lab, X(x), cy + 26, { a: 'center', b: 1, fs: 12 }); };
      ob(S.ox, 'O₁', COL.ball); ob(-0.85, 'O₂', '#BFD9A8');
      const ahead = S.ox > S.sx, f1 = ahead ? S.f * (v + S.uo) / (v - S.us) : S.f * (v - S.uo) / (v + S.us), f2 = S.f * v / (v + S.us);
      text(ctx, 'O₁ ' + (ahead ? 'ahead of' : 'behind') + ' the source', 10, 18, { fs: 11, b: 1, c: COL.ink });
      if (S.us >= v * 0.98) text(ctx, 'source near the speed of sound: the wavefronts pile up (shock wave)', 10, h - 10, { fs: 11, b: 1, c: COL.r });
      ro([['source frequency fₛ', S.f + ' Hz'], ['O₁ hears', fmt(f1, 0) + ' Hz', 'hl'], ['O₂ (behind, at rest) hears', fmt(f2, 0) + ' Hz', 'hl'], ['formula', "f′ = f(v ± uₒ)/(v ∓ uₛ), v = 340 m/s"]]);
    }
    loop(cv, dt => { if (S.play) step(dt); draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
  // ---------- guitar and flute ----------
  window.PhysiQSims.add('instruments', function (root) {
    const { COL, fmt, el, slider, button, toggle, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const L0 = 0.648, V = 343;
    const STR = { E2: { n: 'low E (thick)', mu: 6.2e-3 }, A2: { n: 'A string', mu: 3.6e-3 }, E4: { n: 'high E (thin)', mu: 4.0e-4 } };
    const NOTES = [['C', 262], ['D', 294], ['E', 330], ['F', 349], ['G', 392], ['A', 440], ['B', 494], ['C′', 523]];
    const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
    const noteName = f => { const n = Math.round(12 * Math.log2(f / 440)) + 57; return NAMES[((n % 12) + 12) % 12] + Math.floor(n / 12); };
    const S = { ins: 'guitar', str: 'E4', T: 73, fret: 0, note: 0, over: false, snd: false, t: 0, pluck: 0 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    let gctl, fctl;
    const ib = [['guitar', '🎸 Guitar'], ['flute', '🪈 Flute']].map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.ins ? ' on' : ''), () => { S.ins = k; ib.forEach(x => x.classList.toggle('on', x === b)); show(); }); return b; });
    gctl = el('div', 'sm-ctl'); root.appendChild(gctl); fctl = el('div', 'sm-ctl'); root.appendChild(fctl);
    const srow = el('div', 'sm-row sm-pre'); gctl.appendChild(srow);
    const sb = Object.entries(STR).map(([k, o]) => { const b = button(srow, o.n, 'sm-chip' + (k === S.str ? ' on' : ''), () => { S.str = k; sb.forEach(x => x.classList.toggle('on', x === b)); play(); }); return b; });
    const grow = el('div', 'sm-row'); gctl.appendChild(grow);
    slider(grow, 'tension T', 40, 110, 1, S.T, 'N', x => { S.T = x; });
    slider(grow, 'fret pressed (0 = open string)', 0, 12, 1, S.fret, '', x => { S.fret = x; play(); });
    const nrow = el('div', 'sm-row sm-pre'); fctl.appendChild(nrow);
    const nb = NOTES.map(([n], i) => { const b = button(nrow, n, 'sm-chip' + (i === S.note ? ' on' : ''), () => { S.note = i; nb.forEach(x => x.classList.toggle('on', x === b)); play(); }); return b; });
    const frow = el('div', 'sm-row sm-bar'); fctl.appendChild(frow);
    toggle(frow, 'Overblow (blow harder)', false, v => { S.over = v; play(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '▶ Play the note', '', () => { S.snd = true; play(true); });
    function show() { gctl.hidden = S.ins !== 'guitar'; fctl.hidden = S.ins !== 'flute'; play(); }
    const cv = canvas(root); const ro = readouts(root);
    function cur() {
      if (S.ins === 'guitar') { const mu = STR[S.str].mu, l = L0 / Math.pow(2, S.fret / 12), v = Math.sqrt(S.T / mu); return { l, v, f: v / (2 * l), n: 1 }; }
      const f1 = NOTES[S.note][1], l = V / (2 * f1), n = S.over ? 2 : 1; return { l, v: V, f: n * f1, n };
    }
    let ac = null;
    function play(force) {
      S.pluck = 1; if (!S.snd && !force) return;
      try { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { return; }
      const c = cur(), t = ac.currentTime, out = ac.createGain(); out.connect(ac.destination);
      const parts = S.ins === 'guitar' ? [[1, 0.5], [2, 0.25], [3, 0.15], [4, 0.08], [5, 0.05]] : [[1, 0.5], [2, 0.18], [3, 0.06]];
      parts.forEach(([k, a]) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = c.f * k; g.gain.value = 0; o.connect(g); g.connect(out);
        if (S.ins === 'guitar') { g.gain.setValueAtTime(a * 0.4, t); g.gain.exponentialRampToValueAtTime(0.0005, t + 2.2 / Math.sqrt(k)); }
        else { g.gain.linearRampToValueAtTime(a * 0.3, t + 0.08); g.gain.setValueAtTime(a * 0.3, t + 1.0); g.gain.linearRampToValueAtTime(0, t + 1.3); }
        o.start(t); o.stop(t + 2.4); });
      if (S.ins === 'flute') { const len = 1.3, buf = ac.createBuffer(1, ac.sampleRate * len, ac.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.02; const ns = ac.createBufferSource(), bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = c.f * 2; ns.buffer = buf; ns.connect(bp); bp.connect(out); ns.start(t); }
    }
    function frame(dt) {
      if (dt < 0) dt = 0; S.t += dt; S.pluck = Math.max(0, S.pluck - dt * (S.ins === 'guitar' ? 0.5 : 0)); if (S.ins === 'flute') S.pluck = 1;
      const c = cur();
      const ctx = cv.ctx, narrow = root.clientWidth < 520, { w, h } = narrow ? cv.size(0.75, 260, 320) : cv.size(0.36, 230, 280); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 24, x1 = w - 24, sc = (x1 - x0) / L0, yc = h * 0.45, osc = Math.sin(2 * Math.PI * S.t * 3);   // slowed down to 3 vibrations per second
      if (S.ins === 'guitar') {
        // neck with frets; bridge at the right
        ctx.fillStyle = '#7A4E2D'; ctx.fillRect(x0 - 10, yc - 34, (x1 - x0) * 0.62 + 10, 68); ctx.fillStyle = '#C79A5B'; ctx.beginPath(); ctx.ellipse(x1 - (x1 - x0) * 0.17, yc, (x1 - x0) * 0.22, Math.min(80, h * 0.36), 0, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(x1 - (x1 - x0) * 0.3, yc, 22, 0, 7); ctx.fillStyle = '#3A2614'; ctx.fill();
        for (let n = 1; n <= 12; n++) { const x = x0 + (L0 - L0 / Math.pow(2, n / 12)) * sc; ctx.fillStyle = '#D6D6D6'; ctx.fillRect(x - 1, yc - 34, 2.5, 68); if ([3, 5, 7, 9].includes(n)) { ctx.beginPath(); ctx.arc(x - (L0 / Math.pow(2, n / 12) - L0 / Math.pow(2, (n - 1) / 12)) * sc / 2, yc, 4, 0, 7); ctx.fillStyle = '#EDE6D6'; ctx.fill(); } if (n === 12) text(ctx, '12th fret (halfway) ↓', x + 4, yc - 42, { a: 'right', fs: 10.5, c: COL.sub }); }
        ctx.fillStyle = '#E8DCC0'; ctx.fillRect(x0 - 3, yc - 34, 6, 68); ctx.fillStyle = '#2B1B0E'; ctx.fillRect(x1 - 4, yc - 30, 8, 60);
        const xs = x0 + (L0 - c.l) * sc, Ap = 16 * S.pluck;
        if (S.fret > 0) { ctx.strokeStyle = '#888'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, yc); ctx.lineTo(xs, yc); ctx.stroke(); ctx.beginPath(); ctx.arc(xs - 6, yc, 9, 0, 7); ctx.fillStyle = 'rgba(241,194,125,.9)'; ctx.fill(); }
        ctx.strokeStyle = '#F2C94C'; ctx.lineWidth = STR[S.str].mu > 3e-3 ? 3 : 1.6; ctx.beginPath();
        for (let k = 0; k <= 120; k++) { const x = xs + (x1 - xs) * k / 120, y = yc + Ap * osc * Math.sin(Math.PI * k / 120); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
        ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xs, h - 30); ctx.lineTo(x1, h - 30); ctx.stroke(); [xs, x1].forEach(x => { ctx.beginPath(); ctx.moveTo(x, h - 36); ctx.lineTo(x, h - 24); ctx.stroke(); });
        text(ctx, `vibrating length l = ${fmt(c.l * 100, 1)} cm = λ/2`, (xs + x1) / 2, h - 12, { a: 'center', fs: 12, b: 1 });
        text(ctx, 'node', xs, yc + 50, { a: 'center', fs: 10.5, c: COL.sub }); text(ctx, 'node', x1, yc + 50, { a: 'center', fs: 10.5, c: COL.sub });
      } else {
        const sc = (x1 - x0) / 0.72, tl = 0.712 * sc, ty = yc - 14, th = 28, tx0 = x0, holes = NOTES.slice(1).map(([, f]) => 0.05 + V / (2 * f));
        ctx.fillStyle = '#C9CDD3'; ctx.fillRect(tx0, ty, tl, th); ctx.strokeStyle = '#7D848F'; ctx.lineWidth = 1.5; ctx.strokeRect(tx0, ty, tl, th);
        ctx.beginPath(); ctx.ellipse(tx0 + 0.05 * sc, ty, 6, 4, 0, 0, 7); ctx.fillStyle = '#333'; ctx.fill(); text(ctx, 'mouth hole', tx0 + 0.05 * sc, ty - 10, { a: 'center', fs: 10.5, c: COL.sub });
        const lEnd = 0.05 + c.l;   // the air column ends at the first open hole
        holes.forEach(p => { const open = p >= lEnd - 0.004; ctx.beginPath(); ctx.ellipse(tx0 + p * sc, ty, 5, 3.5, 0, 0, 7); ctx.fillStyle = open ? '#fff' : '#2B3140'; ctx.fill(); ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke(); });
        // stationary wave (displacement) in the air column, antinodes at both ends
        const a = tx0 + 0.05 * sc, b = Math.min(tx0 + tl, tx0 + lEnd * sc);
        ['#3E8E1E', 'rgba(62,142,30,.45)'].forEach((col, j) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 120; k++) { const x = a + (b - a) * k / 120, y = yc + (j ? -1 : 1) * 11 * osc * Math.cos(c.n * Math.PI * k / 120); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); });
        ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a, h - 30); ctx.lineTo(b, h - 30); ctx.stroke(); [a, b].forEach(x => { ctx.beginPath(); ctx.moveTo(x, h - 36); ctx.lineTo(x, h - 24); ctx.stroke(); });
        text(ctx, `air column l = ${fmt(c.l * 100, 1)} cm` + (c.n === 1 ? ' = λ/2' : ' = λ (2nd harmonic)'), (a + b) / 2, h - 12, { a: 'center', fs: 12, b: 1 });
        text(ctx, 'antinode', a, yc + 34, { a: 'center', fs: 10.5, c: COL.sub }); text(ctx, 'antinode', b, yc + 34, { a: 'center', fs: 10.5, c: COL.sub });
        text(ctx, 'open hole ○  closed hole ●', w - 10, 18, { a: 'right', fs: 10.5, c: COL.sub });
      }
      text(ctx, 'vibration shown slowed down', 10, 18, { fs: 10.5, c: COL.sub });
      const rows = [['frequency f', fmt(c.f, 0) + ' Hz', 'hl'], ['note', noteName(c.f), 'hl'], ['wavelength λ', fmt(2 * c.l / c.n * 100, 1) + ' cm']];
      if (S.ins === 'guitar') rows.push(['wave speed on the string v = √(T/μ)', fmt(c.v, 0) + ' m s⁻¹']); else rows.push(['speed of sound in air', '343 m s⁻¹']);
      ro(rows);
    }
    show();
    loop(cv, frame);
  });

})();
