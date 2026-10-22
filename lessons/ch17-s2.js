/* Semester 2 Chapter 17 Electromagnetic Induction: full notes by Cikgu Suhaili (from the Unit 7 Electromagnetic Induction slides,
   with the magnetic-flux examples from the Unit 6 slides). App chapter 17 = STPM 2026 syllabus chapter 18.
   Back e.m.f. in a d.c. motor (slides 7.6) is not in the 2026 syllabus and is left out. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const ms = 'm&#8239;s<sup>−1</sup>', mu0 = 'μ<sub>0</sub>', eps = 'ε';

  const X = (x, y, r = 4.5, c = '#C3BEF7') => `<path d="M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}" stroke="${c}" stroke-width="1.5"/>`;
  const O = (x, y, r = 4.5, c = '#C3BEF7') => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${c}" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="1.6" fill="${c}"/>`;
  const grid = (x0, y0, nx, ny, dx, dy, f = X) => { let s = ''; for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) s += f(x0 + i * dx, y0 + j * dy); return s; };
  const arr = (x1, y1, x2, y2, c = 'r', w = 2.2) => L(x1, y1, x2, y2, c, 'e', { w });
  const magnet = (x, y, w = 80, h = 26, nRight = true) => `<rect x="${x}" y="${y}" width="${w / 2}" height="${h}" fill="${nRight ? '#9FC3E8' : '#F2A08A'}" stroke="${C.ink}" stroke-width="1.4"/><rect x="${x + w / 2}" y="${y}" width="${w / 2}" height="${h}" fill="${nRight ? '#F2A08A' : '#9FC3E8'}" stroke="${C.ink}" stroke-width="1.4"/>` +
    T(x + w / 4, y + h / 2 + 5, nRight ? 'S' : 'N', { fs: 13, b: 1 }) + T(x + 3 * w / 4, y + h / 2 + 5, nRight ? 'N' : 'S', { fs: 13, b: 1 });
  const coil = (x, y, n, w, h, c = '#B5651D') => { let s = ''; for (let i = 0; i < n; i++) s += `<ellipse cx="${x + i * w / (n - 1)}" cy="${y}" rx="6" ry="${h / 2}" fill="none" stroke="${c}" stroke-width="2"/>`; return s; };
  const galv = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + T(x, y + 5, 'G', { fs: 13, b: 1 });

  // ---------- figures ----------
  const F = {};
  F.flux = () => {
    let s = `<path d="M90,40 L190,20 L190,120 L90,140 Z" fill="#EEEAFD" stroke="${C.v}" stroke-width="1.6"/>` + T(118, 134, 'area A', { fs: 11, c: C.v });
    s += arr(140, 80, 230, 62, 'g', 2.4) + T(238, 60, 'A (normal)', { fs: 12, b: 1, c: C.g, a: 'start' });
    for (let i = 0; i < 4; i++) s += arr(20, 30 + i * 30, 300, 30 + i * 30, 'o', 1.3);
    s += T(300, 22, 'B', { fs: 13, it: 1, b: 1, c: C.o, a: 'end' }) + P('M190,80 A50,50 0 0 0 186,70', 'k', { w: 1.2 }) + T(206, 84, 'θ', { fs: 13, it: 1, a: 'start' });
    return svg(320, 150, s, 320);
  };
  F.cases = () => {
    const box = (title, inner) => svg(150, 120, inner + T(75, 114, title, { fs: 11, c: C.sub }), 150);
    return `<div class="ls-two" style="grid-template-columns:repeat(2,minmax(0,1fr))">` +
      box('θ = 0°: Φ = BA (maximum)', `<line x1="40" y1="20" x2="40" y2="90" stroke="${C.v}" stroke-width="4"/>` + arr(10, 40, 130, 40, 'o', 1.4) + arr(10, 70, 130, 70, 'o', 1.4) + arr(40, 55, 80, 55, 'g', 2.2)) +
      box('θ = 90°: Φ = 0', `<line x1="20" y1="55" x2="110" y2="55" stroke="${C.v}" stroke-width="4"/>` + arr(10, 30, 130, 30, 'o', 1.4) + arr(10, 80, 130, 80, 'o', 1.4) + arr(65, 55, 65, 16, 'g', 2.2)) + '</div>';
  };
  F.faraday = () => {
    let s = magnet(20, 50, 90, 28, true) + arr(120, 64, 150, 64, 'r', 2.4) + T(135, 54, 'v', { fs: 12, it: 1, b: 1, c: C.r });
    s += coil(180, 64, 8, 100, 60) + L(180, 34, 180, 14, 'k', '', { w: 1.6 }) + L(180, 14, 300, 14, 'k', '', { w: 1.6 }) + L(280, 94, 280, 120, 'k', '', { w: 1.6 }) + L(280, 120, 300, 120, 'k', '', { w: 1.6 }) + L(300, 14, 300, 52, 'k', '', { w: 1.6 }) + L(300, 78, 300, 120, 'k', '', { w: 1.6 }) + galv(300, 65);
    s += T(168, 112, 'N', { fs: 14, b: 1, c: C.r }) + T(168, 128, 'induced pole', { fs: 10, c: C.r }) + T(230, 142, 'the coil repels the approaching N pole', { fs: 11, c: C.sub });
    return svg(330, 150, s, 330);
  };
  F.lenz = () => {
    const panel = (title, approach) => {
      let s = magnet(8, 52, 70, 24, true) + arr(84, 64, 104, 64, 'r', 2) + T(94, 56, approach ? 'in' : '', { fs: 10, c: C.r });
      if (!approach) s = magnet(8, 52, 70, 24, true) + arr(66, 42, 30, 42, 'r', 2) + T(76, 46, 'out', { fs: 10, c: C.r, a: 'start' });
      s += `<ellipse cx="140" cy="64" rx="10" ry="34" fill="none" stroke="#B5651D" stroke-width="2.4"/>`;
      s += arr(110, 30, 170, 30, 'o', 1.6) + T(180, 34, 'B ext', { fs: 10, c: C.o, a: 'start' });
      s += approach ? arr(170, 100, 110, 100, 'v', 2) + T(180, 104, 'B ind', { fs: 10, c: C.v, a: 'start' }) : arr(110, 100, 170, 100, 'v', 2) + T(180, 104, 'B ind', { fs: 10, c: C.v, a: 'start' });
      s += T(110, 128, title, { fs: 11, b: 1 });
      return svg(220, 136, s, 220);
    };
    return two(panel('flux increasing: B ind opposes B ext', true), panel('flux decreasing: B ind is along B ext', false));
  };
  F.rod = () => {
    let s = grid(30, 30, 8, 4, 36, 30, O);
    s += L(30, 20, 290, 20, 'k', '', { w: 2.6 }) + L(30, 130, 290, 130, 'k', '', { w: 2.6 }) + L(30, 20, 30, 130, 'k', '', { w: 2.6 }) + `<rect x="${30 - 8}" y="62" width="16" height="26" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + T(14, 80, 'R', { fs: 12, it: 1, b: 1 });
    s += `<rect x="196" y="12" width="10" height="126" rx="4" fill="#E9C46A" stroke="${C.ink}" stroke-width="1.4"/>` + T(190, 10, 'P', { fs: 12, b: 1, a: 'end' }) + T(190, 150, 'Q', { fs: 12, b: 1, a: 'end' });
    s += arr(206, 75, 252, 75, 'r', 2.6) + T(258, 79, 'v', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + arr(196, 100, 160, 100, 'o', 2.2) + T(150, 96, 'F = BIl', { fs: 11, it: 1, b: 1, c: C.o, a: 'end' });
    s += arr(201, 40, 201, 60, 'g', 2) + arr(120, 130, 80, 130, 'g', 2) + T(100, 146, 'I (clockwise)', { fs: 11, b: 1, c: C.g }) + L(222, 20, 222, 130, 's', 'b', { w: 1 }) + T(226, 120, 'l', { fs: 13, it: 1, a: 'start' });
    s += T(306, 10, 'B out of the page', { fs: 10.5, c: C.sub, a: 'end' });
    return svg(310, 156, s, 310);
  };
  F.frhr = () => {
    const ox = 120, oy = 110; let s = '';
    s += arr(ox, oy, ox, oy - 80, 'r', 3) + T(ox, oy - 88, 'motion (thumb)', { fs: 12, b: 1, c: C.r });
    s += arr(ox, oy, ox + 110, oy, 'v', 3) + T(ox + 116, oy + 5, 'B (first finger)', { fs: 12, b: 1, c: C.v, a: 'start' });
    s += arr(ox, oy, ox - 62, oy + 42, 'g', 3) + T(ox - 66, oy + 58, 'induced current (second finger)', { fs: 12, b: 1, c: C.g, a: 'start' });
    return svg(340, 175, s, 340);
  };
  F.gen = () => {
    const cx = 80, cy = 80; let s = '';
    for (let i = 0; i < 4; i++) s += arr(10, 30 + i * 33, 150, 30 + i * 33, 'o', 1.3);
    s += T(150, 22, 'B', { fs: 13, it: 1, b: 1, c: C.o, a: 'end' });
    const a = 40 * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a);
    s += `<line x1="${cx - 50 * dy}" y1="${cy - 50 * dx}" x2="${cx + 50 * dy}" y2="${cy + 50 * dx}" stroke="#B5651D" stroke-width="5"/>`;
    s += arr(cx, cy, cx + 58 * dx, cy - 58 * dy, 'g', 2.4) + T(cx + 62 * dx + 4, cy - 62 * dy, 'normal', { fs: 11, b: 1, c: C.g, a: 'start' }) + P(`M${cx + 30},${cy} A30,30 0 0 0 ${cx + 30 * dx},${cy - 30 * dy}`, 'k', { w: 1.2 }) + T(cx + 38, cy - 8, 'θ = ωt', { fs: 11.5, it: 1, a: 'start' }) + `<circle cx="${cx}" cy="${cy}" r="3" fill="${C.ink}"/>`;
    s += T(cx, 160, 'coil seen edge-on, axis ⊥ page', { fs: 10.5, c: C.sub });
    // graph
    const gx = 190, gy = 80, gw = 140, ga = 46; let e = '', f = '';
    for (let i = 0; i <= 80; i++) { const t = i / 80 * 2 * Math.PI, x = gx + gw * i / 80; e += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (gy - ga * Math.sin(t)).toFixed(1); f += (i ? 'L' : 'M') + x.toFixed(1) + ',' + (gy - ga * 0.7 * Math.cos(t)).toFixed(1); }
    s += L(gx, gy, gx + gw + 10, gy, 'k', 'e', { w: 1.2 }) + L(gx, gy + 56, gx, gy - 58, 'k', 'e', { w: 1.2 }) + P(f, 'sub', { w: 1.6, d: '5 4' }) + P(e, 'v', { w: 2.4 }) + T(gx + gw + 8, gy + 16, 't', { fs: 12, it: 1 }) + T(gx + 10, gy - 52, 'ε', { fs: 13, it: 1, b: 1, c: C.v, a: 'start' }) + T(gx + gw - 10, gy - 40, 'Φ', { fs: 13, it: 1, c: C.sub }) + T(gx - 4, gy - ga + 4, 'ε₀', { fs: 11, a: 'end', c: C.v });
    return svg(340, 170, s, 340);
  };
  F.ex29 = () => { let e = ''; const gx = 40, gy = 80, gw = 260, A = 50, Tt = 0.42, tmax = 0.84;
    for (let i = 0; i <= 160; i++) { const t = tmax * i / 160; e += (i ? 'L' : 'M') + (gx + gw * t / tmax).toFixed(1) + ',' + (gy - A * Math.sin(2 * Math.PI * t / Tt)).toFixed(1); }
    let s = L(gx, gy, gx + gw + 14, gy, 'k', 'e', { w: 1.2 }) + L(gx, gy + 60, gx, gy - 62, 'k', 'e', { w: 1.2 }) + P(e, 'v', { w: 2.2 }) + T(gx + gw + 12, gy - 8, 't / s', { fs: 11, it: 1 }) + T(gx + 4, gy - 64, 'ε / V', { fs: 11, it: 1, a: 'start' });
    s += L(gx - 4, gy - A, gx + 4, gy - A, 'k') + T(gx - 6, gy - A + 4, '28', { fs: 11, a: 'end' }) + L(gx - 4, gy + A, gx + 4, gy + A, 'k') + T(gx - 6, gy + A + 4, '−28', { fs: 11, a: 'end' });
    [0.21, 0.42, 0.63, 0.84].forEach(t => { const x = gx + gw * t / tmax; s += L(x, gy - 3, x, gy + 3, 'k') + T(x, gy + (t === 0.42 || t === 0.84 ? 16 : -8), String(t), { fs: 10.5, c: C.sub }); });
    return svg(330, 150, s, 330); };
  F.ex24 = () => { let s = grid(36, 26, 7, 4, 36, 30); s += `<circle cx="140" cy="70" r="46" fill="none" stroke="#B5651D" stroke-width="2.4"/>` + P('M116,30 A46,46 0 0 0 96,58', 'g', { w: 2, a: 'g' }) + T(92, 40, 'I', { fs: 13, it: 1, b: 1, c: C.g, a: 'end' }) + T(214, 40, 'B into the page,', { fs: 11, c: C.sub, a: 'start' }) + T(214, 56, 'increasing', { fs: 11, c: C.sub, a: 'start' }) + L(94, 70, 186, 70, 's', 'b', { w: 1 }) + T(140, 64, '10 cm', { fs: 11, c: C.sub });
    return svg(300, 140, s, 300); };
  F.selfL = () => {
    let s = coil(70, 60, 9, 150, 50) + L(70, 85, 40, 85, 'k', '', { w: 1.6 }) + L(40, 85, 40, 130, 'k', '', { w: 1.6 }) + L(220, 85, 250, 85, 'k', '', { w: 1.6 }) + L(250, 85, 250, 130, 'k', '', { w: 1.6 });
    s += L(40, 130, 120, 130, 'k', '', { w: 1.6 }) + L(160, 130, 250, 130, 'k', '', { w: 1.6 }) + L(120, 118, 120, 142, 'k', '', { w: 1.8 }) + L(130, 124, 130, 136, 'k', '', { w: 4 }) + L(130, 130, 160, 130, 'k', '', { w: 1.6 }) + T(140, 154, 'changing current', { fs: 11, c: C.sub });
    s += arr(80, 30, 210, 30, 'v', 2) + T(145, 22, 'B of the coil itself', { fs: 11, c: C.v });
    s += `<g transform="translate(262,40)"><path d="M0,20 q8,-16 16,0 q8,-16 16,0 q8,-16 16,0 q8,-16 16,0" fill="none" stroke="${C.ink}" stroke-width="2"/></g>` + T(294, 76, 'inductor', { fs: 10.5, c: C.sub });
    return svg(340, 162, s, 340);
  };
  F.growth = () => { let a = '', b = ''; const gx = 34, gy = 120, gw = 240, gh = 90;
    for (let i = 0; i <= 80; i++) { const t = i / 80 * 5; a += (i ? 'L' : 'M') + (gx + gw * t / 5).toFixed(1) + ',' + (gy - gh * (1 - Math.exp(-t))).toFixed(1); }
    b = `M${gx},${gy} L${gx},${gy - gh} L${gx + gw},${gy - gh}`;
    return svg(300, 150, axes(gx, gy, gw + 14, gh + 18, 't', 'I') + P(b, 'sub', { w: 1.6, d: '5 4' }) + P(a, 'v', { w: 2.4 }) + T(gx + gw, gy - gh - 6, 'resistor only', { fs: 10.5, c: C.sub, a: 'end' }) + T(gx + 110, gy - 30, 'with an inductor', { fs: 10.5, b: 1, c: C.v, a: 'start' }), 300); };
  F.coax = () => {
    let s = `<rect x="40" y="50" width="240" height="44" fill="#F4F1E6" stroke="none"/>` + coil(40, 72, 16, 240, 44, '#B5651D') + coil(120, 72, 6, 70, 74, '#2C6BB3');
    s += T(30, 18, 'primary: N_p turns, length l_p, area A', { fs: 11, b: 1, c: '#B5651D', a: 'start' }) + T(155, 128, 'secondary: N_s turns wound round the middle', { fs: 11, b: 1, c: '#2C6BB3' });
    for (let y of [62, 82]) s += arr(60, y, 270, y, 'o', 1.2);
    return svg(320, 136, s, 320);
  };

  const S = `
${sec('17-1', '17.1 Magnetic flux', `
${def('Magnetic flux, Φ', `through a surface: the ${red('scalar product of the magnetic flux density B and the area vector A')} of the surface. It measures the number of field lines passing through the area.`)}
${key(`Φ = <b>B</b> · <b>A</b> = <i>BA</i> cos θ`, 'θ = angle between B and the normal to the surface (the direction of the area vector A). Unit: weber (Wb) = T m<sup>2</sup>. Scalar.')}
${fig(F.flux(), 'Figure 17.1: the area vector A is normal to the surface.')}
${fig(F.cases(), 'Figure 17.2: B along the normal gives the largest flux; B in the plane of the surface gives none.')}
${ul([`Flux linkage of a coil of <i>N</i> turns: <i>N</i>Φ.`, `Rearranged, <i>B</i> = Φ/<i>A</i><sub>⊥</sub>: magnetic flux density is the flux per unit area perpendicular to the field (1 T = 1 Wb m<sup>−2</sup>).`])}
${tip(`Read the question carefully: "the <b>plane</b> of the loop makes θ with B" means the normal makes (90° − θ) with B, so Φ = <i>BA</i> sin θ.`)}
${example('17.1.1', `A rectangular loop of area 200 cm<sup>2</sup> has its plane at 41° to a 0.28 T field. Find the flux through it.`,
  steps([`Angle between B and the normal = 90° − 41° = 49°`, `Φ = <i>BA</i> cos 49° = (0.28)(200 × 10<sup>−4</sup>)(0.656) = <b>3.7 × 10<sup>−3</sup> Wb</b>`]))}
${example('17.1.2', `A 25 cm × 15 cm loop is in a 0.60 T field and the flux through it is 0.015 Wb. Find the angle between the plane of the loop and the field.`,
  steps([`cos θ = ${fr('Φ', '<i>BA</i>')} = ${fr('0.015', '(0.60)(0.25 × 0.15)')} = 0.667, θ = 48.2° (between B and the normal)`, `Angle between the plane and B = 90° − 48.2° = <b>41.8°</b>`]))}
${example('17.1.3', `A flux of 50 μWb passes perpendicularly through a loop of area 0.78 m<sup>2</sup>. Find the flux density.`, steps([`<i>B</i> = ${fr('Φ', '<i>A</i>')} = ${fr('50 × 10<sup>−6</sup>', '0.78')} = <b>6.4 × 10<sup>−5</sup> T</b>`]))}
`)}

${sec('17-2', "17.2 Faraday's law and Lenz's law", `
${h4("Faraday's experiments")}
${ul([`A steady current in one coil produces <b>no</b> current in a second coil. A current is induced only at the moment the first current is switched on or off.`, `Moving a magnet towards a coil induces a current; moving it away induces a current in the opposite direction; no current flows when the magnet and coil are at rest relative to each other.`, `The induced current is larger when the magnet moves faster, when the coil has more turns and when the magnet is stronger.`])}
${fig(F.faraday(), 'Figure 17.3: a magnet pushed into a coil connected to a galvanometer.')}
${def("Faraday's law", `the ${red('magnitude of the induced e.m.f. is proportional to the rate of change of magnetic flux linkage')}.`)}
${def("Lenz's law", `the ${red('induced current flows in a direction that opposes the change producing it')}.`)}
${key(`${eps} = −<i>N</i>${fr('dΦ', 'd<i>t</i>')}`, 'the minus sign is Lenz\'s law. Average e.m.f.: |ε| = N|ΔΦ|/Δt')}
${ul([`Φ = <i>BA</i> cos θ can change in three ways: change <i>B</i> (${eps} = −<i>NA</i> d<i>B</i>/d<i>t</i>), change the area <i>A</i> (${eps} = −<i>NB</i> d<i>A</i>/d<i>t</i>), or change the angle θ (rotate the coil).`, `If the coil is part of a closed circuit of resistance <i>R</i>, the induced current is <i>I</i> = |${eps}|/<i>R</i>.`, `Lenz's law follows from the <b>conservation of energy</b>: if the induced current helped the change, energy would be created from nothing. Work must be done against the opposing force, and this work becomes electrical energy.`])}
${h4("Using Lenz's law")}
${fig(F.lenz(), 'Figure 17.4: the induced field opposes an increase of flux and supports a decrease.')}
${steps([`Decide whether the flux through the loop is increasing or decreasing.`, `The induced current makes its own field <b>opposite</b> to the external field if the flux is increasing, and <b>along</b> it if the flux is decreasing.`, `Use the right-hand grip rule to turn the induced field into a current direction.`])}
${note(`A north pole pushed towards a coil makes the near end of the coil a north pole (repelling it). Pulled away, the near end becomes a south pole (attracting it). Either way you must do work.`)}
${sim('faraday', 'Magnet and coil', 'Move the magnet in and out of the coil with the slider (or press "Move it for me"). The galvanometer only deflects while the flux is changing; faster motion and more turns give a bigger e.m.f. The colour of the coil end shows the induced pole.')}
${example('17.2.1', `A coil of 50 turns and diameter 8.0 cm is in a 1.8 T field perpendicular to its plane. The field falls to 0.60 T in 2.0 ms. Find the average induced e.m.f.`,
  steps([`<i>A</i> = π(0.040)<sup>2</sup> = 5.03 × 10<sup>−3</sup> m<sup>2</sup>`, `|${eps}| = <i>NA</i>${fr('|Δ<i>B</i>|', 'Δ<i>t</i>')} = (50)(5.03 × 10<sup>−3</sup>)${fr('1.2', '2.0 × 10<sup>−3</sup>')} = <b>151 V</b>`]))}
${example('17.2.2', `An elastic circular loop in the plane of the paper is in a 0.75 T field into the paper. Its diameter shrinks from 20.0 cm to 6.0 cm in 0.50 s. Find (a) the direction of the induced current, (b) the average induced e.m.f., (c) the average current if the loop's resistance is 2.5 Ω.`,
  steps([`(a) The flux into the paper decreases, so the induced current makes a field into the paper inside the loop: <b>clockwise</b>.`, `(b) |Δ<i>A</i>| = π(0.100<sup>2</sup> − 0.030<sup>2</sup>) = 2.86 × 10<sup>−2</sup> m<sup>2</sup>; |${eps}| = <i>B</i>${fr('|Δ<i>A</i>|', 'Δ<i>t</i>')} = (0.75)${fr('2.86 × 10<sup>−2</sup>', '0.50')} = <b>43 mV</b>`, `(c) <i>I</i> = ${fr('0.043', '2.5')} = <b>17 mA</b>`]))}
${example('17.2.3', `A circular coil of radius 3.05 cm, 40 turns and resistance 3.55 Ω is perpendicular to a field of 1.25 × 10<sup>−2</sup> T. The field increases to 0.450 T in 0.250 s. Find the induced current.`,
  steps([`|${eps}| = <i>NA</i>${fr('Δ<i>B</i>', 'Δ<i>t</i>')} = (40)π(0.0305)<sup>2</sup>${fr('0.450 − 0.0125', '0.250')} = 0.205 V`, `<i>I</i> = ${fr('0.205', '3.55')} = <b>0.058 A</b>`]))}
${example('17.2.4', `A single circular loop of diameter 10 cm is connected in series with a 37 Ω resistor. The field through the loop is into the page and increasing at 0.050 T s<sup>−1</sup>. Find the current and its direction.`,
  steps([`|${eps}| = <i>A</i>${fr('d<i>B</i>', 'd<i>t</i>')} = π(0.050)<sup>2</sup>(0.050) = 3.93 × 10<sup>−4</sup> V`, `<i>I</i> = ${fr('3.93 × 10<sup>−4</sup>', '37')} = <b>1.1 × 10<sup>−5</sup> A</b>`, `The flux into the page increases, so the induced field inside the loop points out of the page: the current is <b>anticlockwise</b>.`]), fig(F.ex24()))}

${h4('E.m.f. induced in a straight conductor moving in a field')}
${fig(F.rod(), 'Figure 17.5: a rod of length l sliding at speed v along two rails in a uniform field.')}
${steps([`In a time d<i>t</i> the rod moves d<i>x</i> = <i>v</i> d<i>t</i>, so the area of the circuit increases by d<i>A</i> = <i>l</i> d<i>x</i> = <i>lv</i> d<i>t</i>.`, `The flux increases by dΦ = <i>B</i> d<i>A</i> = <i>Blv</i> d<i>t</i>.`, `Faraday's law: |${eps}| = ${fr('dΦ', 'd<i>t</i>')} = <i>Blv</i>. If <b>v</b> makes an angle θ with <b>B</b>, only the component <i>v</i> sin θ cuts the field lines:`])}
${key(`${eps} = <i>Blv</i> sin θ`, 'θ = angle between v and B (rod perpendicular to both)')}
${ul([`The same result comes from the magnetic force on the free electrons in the rod: they are pushed along the rod, one end becomes negative and the other positive.`, `Direction of the induced current: <b>Fleming's right-hand rule</b> (thumb = motion, first finger = field, second finger = induced current). It always agrees with Lenz's law.`, `The current in the rod feels a force <i>BIl</i> that <b>opposes the motion</b>; to keep the rod moving at constant speed an equal applied force is needed. The mechanical power <i>Fv</i> equals the electrical power <i>I</i><sup>2</sup><i>R</i>.`])}
${fig(F.frhr(), "Figure 17.6: Fleming's right-hand rule (for generators: induced current).")}
${sim('rod', 'A rod sliding on rails', 'Push the rod with a steady speed. The area of the circuit and the flux grow, an e.m.f. Blv is induced and a current flows. The current makes a force on the rod that opposes the motion; the work done against it becomes heat in R.')}
${example('17.2.5', `In Figure 17.5, <i>l</i> = 0.10 m, <i>v</i> = 2.5 ${ms}, <i>B</i> = 0.60 T and the total resistance of the circuit is 0.030 Ω. Find (a) the induced e.m.f., (b) the current, (c) the force on the rod, (d) the power dissipated.`,
  steps([`(a) ${eps} = <i>Blv</i> = (0.60)(0.10)(2.5) = <b>0.15 V</b>`, `(b) <i>I</i> = ${fr('0.15', '0.030')} = <b>5.0 A</b>`, `(c) <i>F</i> = <i>BIl</i> = (0.60)(5.0)(0.10) = <b>0.30 N</b>, opposing the motion`, `(d) <i>P</i> = <i>I</i><sup>2</sup><i>R</i> = (5.0)<sup>2</sup>(0.030) = <b>0.75 W</b> (= <i>Fv</i> = (0.30)(2.5))`]))}
${example('17.2.6', `A wire of length 0.20 m moves at 4.0 ${ms} at 40° to a field of 0.50 T. Find the induced e.m.f.`, steps([`${eps} = <i>Blv</i> sin θ = (0.50)(0.20)(4.0) sin 40° = <b>0.26 V</b>`]))}
${example('17.2.7', `A rod of length 0.400 m moves on rails in a field of 1.20 T and the induced e.m.f. is 3.60 V. Find (a) its speed, (b) the current if the total resistance is 0.900 Ω, (c) the force the field exerts on the rod.`,
  steps([`(a) <i>v</i> = ${fr(eps, '<i>Bl</i>')} = ${fr('3.60', '(1.20)(0.400)')} = <b>7.50 ${ms}</b>`, `(b) <i>I</i> = ${fr('3.60', '0.900')} = <b>4.00 A</b>`, `(c) <i>F</i> = <i>BIl</i> = (1.20)(4.00)(0.400) = <b>1.92 N</b>, opposite to the velocity`]))}

${h4('E.m.f. induced in a rotating coil (a.c. generator)')}
${fig(F.gen(), 'Figure 17.7: a coil rotating at angular speed ω in a uniform field, and the e.m.f. it produces.')}
${steps([`A coil of <i>N</i> turns, area <i>A</i>, rotates at constant angular speed ω about an axis perpendicular to a uniform field <i>B</i>. At time <i>t</i> the normal makes θ = ω<i>t</i> with B.`, `Flux through each turn: Φ = <i>BA</i> cos ω<i>t</i>.`, `${eps} = −<i>N</i>${fr('dΦ', 'd<i>t</i>')} = −<i>NBA</i>${fr('d', 'd<i>t</i>')}(cos ω<i>t</i>) = <i>NBA</i>ω sin ω<i>t</i>`])}
${key(`${eps} = <i>NBA</i>ω sin ω<i>t</i> = ${eps}<sub>0</sub> sin ω<i>t</i>`, `peak e.m.f. ${eps}<sub>0</sub> = <i>NBA</i>ω; ω = 2π<i>f</i>`)}
${ul([`The e.m.f. is <b>largest when the flux is zero</b> (plane of the coil parallel to B: the sides cut the field lines fastest) and <b>zero when the flux is largest</b> (plane perpendicular to B).`, `Doubling the speed of rotation doubles both the peak e.m.f. and the frequency.`])}
${sim('generator', 'A.C. generator', 'Change the speed of rotation, the flux density and the number of turns. Compare the flux graph with the e.m.f. graph: the e.m.f. is largest where the flux changes fastest, which is where the flux is zero.')}
${example('17.2.8', `A generator coil has 100 turns of area 0.20 m<sup>2</sup> and turns at 60 rev s<sup>−1</sup> in a field of 1.0 × 10<sup>−3</sup> T. Find the peak e.m.f.`, steps([`${eps}<sub>0</sub> = <i>NBA</i>ω = (100)(1.0 × 10<sup>−3</sup>)(0.20)(2π × 60) = <b>7.5 V</b>`]))}
${example('17.2.9', `The graph shows the output of a generator whose coil has 150 turns of area 0.020 m<sup>2</sup>. Find (a) the frequency, (b) the angular speed, (c) the flux density.`,
  steps([`(a) Period <i>T</i> = 0.42 s, so <i>f</i> = ${fr('1', '0.42')} = <b>2.4 Hz</b>`, `(b) ω = 2π<i>f</i> = <b>15 rad s<sup>−1</sup></b>`, `(c) <i>B</i> = ${fr(`${eps}<sub>0</sub>`, '<i>NA</i>ω')} = ${fr('28', '(150)(0.020)(14.96)')} = <b>0.62 T</b>`]), fig(F.ex29()))}
${example('17.2.10', `A generator coil has 500 turns, each of area 60 cm<sup>2</sup>, and turns at 3600 rev min<sup>−1</sup> in a 2.0 mT field. Find (a) the frequency of the e.m.f., (b) the peak e.m.f., (c) the e.m.f. when the plane of the coil makes 60° with the field.`,
  steps([`(a) <i>f</i> = ${fr('3600', '60')} = <b>60 Hz</b> (ω = 2π × 60 = 377 rad s<sup>−1</sup>)`, `(b) ${eps}<sub>0</sub> = <i>NBA</i>ω = (500)(2.0 × 10<sup>−3</sup>)(60 × 10<sup>−4</sup>)(377) = <b>2.26 V</b>`, `(c) The plane is at 60° to B, so the normal is at θ = 30° to B: ${eps} = ${eps}<sub>0</sub> sin 30° = <b>1.13 V</b>`]))}
${exercises("Exercise: Faraday's and Lenz's laws", [
  { q: `A 200-turn coil of area 4.0 cm<sup>2</sup> is turned from a position where its plane is perpendicular to a 0.30 T field to one where its plane is parallel to it, in 0.050 s. Find the average e.m.f.`, a: `ΔΦ = <i>BA</i> − 0; |${eps}| = <i>NBA</i>/Δ<i>t</i> = (200)(0.30)(4.0 × 10<sup>−4</sup>)/0.050 = <b>0.48 V</b>` },
  { q: `Explain, using energy, why the induced current must oppose the change that produces it.`, a: `If it helped the change, the motion would speed up by itself and electrical energy would appear without any work being done, breaking the conservation of energy. Because it opposes the change, work must be done, and that work becomes the electrical energy.` },
  { q: `An aircraft with a wingspan of 40 m flies horizontally at 250 ${ms} where the vertical component of the Earth's field is 4.0 × 10<sup>−5</sup> T. Find the e.m.f. between its wing tips.`, a: `${eps} = <i>Blv</i> = (4.0 × 10<sup>−5</sup>)(40)(250) = <b>0.40 V</b>` }])}
`)}

${sec('17-3', '17.3 Self induction', `
${def('Self induction', `the ${red('production of an induced e.m.f. in a coil because of a change of the current in the same coil')}.`)}
${fig(F.selfL(), 'Figure 17.8: the coil\'s own changing field changes the flux linking it.')}
${ul([`The current in the coil produces a field and a flux through the coil itself. When the current changes, the flux changes and an e.m.f. is induced (a <b>back e.m.f.</b>).`, `By Lenz's law it opposes the change: while the current is <b>rising</b> the induced e.m.f. opposes the current; while it is <b>falling</b> the induced e.m.f. acts in the direction of the current, trying to keep it flowing.`, `A coil used for its self-inductance is called an <b>inductor</b>.`])}
${def('Self-inductance, <i>L</i>', `the ${red('ratio of the self-induced e.m.f. to the rate of change of current in the coil')}: <i>L</i> = −${eps}/(d<i>I</i>/d<i>t</i>). Equivalently, the flux linkage per unit current, <i>L</i> = <i>N</i>Φ/<i>I</i>.`)}
${key(`${eps} = −<i>L</i>${fr('d<i>I</i>', 'd<i>t</i>')} &nbsp;&nbsp;&nbsp; <i>LI</i> = <i>N</i>Φ`, 'unit: henry (H) = Wb A<sup>−1</sup> = V s A<sup>−1</sup>. A coil has L = 1 H if a current changing at 1 A s<sup>−1</sup> induces 1 V.')}
${ul([`<i>LI</i> = <i>N</i>Φ comes from Faraday's law: −<i>L</i> d<i>I</i>/d<i>t</i> = −<i>N</i> dΦ/d<i>t</i>, integrated from zero current (and zero flux).`, `<i>L</i> depends on the size and shape of the coil, the number of turns and the core material; <b>not on the current</b>.`])}
${h4('Self-inductance of a solenoid')}
${steps([`Field inside a long solenoid of <i>N</i> turns and length <i>l</i>: <i>B</i> = ${fr(`${mu0}<i>NI</i>`, '<i>l</i>')}.`, `Flux through each turn: Φ = <i>BA</i> = ${fr(`${mu0}<i>NIA</i>`, '<i>l</i>')}.`, `<i>L</i> = ${fr('<i>N</i>Φ', '<i>I</i>')} = ${fr('<i>N</i>', '<i>I</i>')} × ${fr(`${mu0}<i>NIA</i>`, '<i>l</i>')}:`])}
${key(`<i>L</i> = ${fr(`${mu0}<i>N</i><sup>2</sup><i>A</i>`, '<i>l</i>')}`, `with a core of relative permeability μ<sub>r</sub>: <i>L</i> = μ<sub>r</sub>${mu0}<i>N</i><sup>2</sup><i>A</i>/<i>l</i>`)}
${example('17.3.1', `The current in a 230 mH coil rises steadily from 20.0 mA to 28.0 mA in 140 ms. Find the induced e.m.f.`, steps([`${eps} = −<i>L</i>${fr('Δ<i>I</i>', 'Δ<i>t</i>')} = −(0.230)${fr('8.0 × 10<sup>−3</sup>', '0.140')} = <b>−1.3 × 10<sup>−2</sup> V</b> (it opposes the rising current)`]))}
${example('17.3.2', `A solenoid of length 0.052 m and cross-sectional area 1.2 × 10<sup>−3</sup> m<sup>2</sup> must have an inductance of 1.4 mH. How many turns does it need?`, steps([`<i>N</i> = ${sq(`${fr('<i>Ll</i>', `${mu0}<i>A</i>`)}`)} = ${sq(`${fr('(1.4 × 10<sup>−3</sup>)(0.052)', '(4π × 10<sup>−7</sup>)(1.2 × 10<sup>−3</sup>)')}`)} = <b>220 turns</b>`]))}
${example('17.3.3', `The current in a coil rises steadily from zero to 50.0 A in 10.0 s, inducing an e.m.f. of 45.0 V. Find (a) the self-inductance, (b) the flux linkage when the current is 50.0 A.`, steps([`(a) <i>L</i> = ${fr('|' + eps + '|', 'd<i>I</i>/d<i>t</i>')} = ${fr('45.0', '5.00')} = <b>9.00 H</b>`, `(b) <i>N</i>Φ = <i>LI</i> = (9.00)(50.0) = <b>450 Wb</b>`]))}
${example('17.3.4', `An air-cored solenoid of 450 turns, diameter 15.0 mm and length 12.0 cm carries 40.0 mA. Find (a) the field inside, (b) the flux through each turn, (c) the inductance.`,
  steps([`(a) <i>B</i> = ${fr(`${mu0}<i>NI</i>`, '<i>l</i>')} = ${fr('(4π × 10<sup>−7</sup>)(450)(0.0400)', '0.120')} = <b>1.88 × 10<sup>−4</sup> T</b>`, `(b) Φ = <i>BA</i> = (1.88 × 10<sup>−4</sup>)π(7.50 × 10<sup>−3</sup>)<sup>2</sup> = <b>3.33 × 10<sup>−8</sup> Wb</b>`, `(c) <i>L</i> = ${fr('<i>N</i>Φ', '<i>I</i>')} = ${fr('(450)(3.33 × 10<sup>−8</sup>)', '0.0400')} = <b>3.75 × 10<sup>−4</sup> H</b>`]))}
`)}

${sec('17-4', '17.4 Energy stored in an inductor', `
${fig(F.growth(), 'Figure 17.9: when the switch is closed, the back e.m.f. of an inductor makes the current rise gradually.')}
${ul([`While the current in an inductor is rising, a back e.m.f. opposes it. The source must do work to drive charge against this e.m.f.`, `This work is not lost: it is <b>stored in the magnetic field</b> of the inductor. When the current is switched off, the energy is given back (this is why a spark can jump across a switch that breaks an inductive circuit).`])}
${h4('Deriving U = ½LI²')}
${steps([`Power supplied against the back e.m.f.: <i>P</i> = <i>I</i>|${eps}| = <i>IL</i>${fr('d<i>I</i>', 'd<i>t</i>')}`, `Energy in a time d<i>t</i>: d<i>U</i> = <i>P</i> d<i>t</i> = <i>LI</i> d<i>I</i>`, `Total energy as the current rises from 0 to <i>I</i>: <i>U</i> = ∫<sub>0</sub><sup><i>I</i></sup> <i>LI</i> d<i>I</i> = ½<i>LI</i><sup>2</sup>`])}
${key(`<i>U</i> = ½<i>LI</i><sup>2</sup>`, `for a solenoid: <i>U</i> = ½${fr(`${mu0}<i>N</i><sup>2</sup><i>A</i>`, '<i>l</i>')}<i>I</i><sup>2</sup>`)}
${sim('inductor', 'Switching on an inductor', 'Close the switch and watch the current rise gradually while the back e.m.f. falls. Open it again and the stored energy ½LI² is given back. Change L and R: a larger L/R makes the rise slower.')}
${example('17.4.1', `How much energy is stored in a 0.085 H inductor carrying 2.5 A?`, steps([`<i>U</i> = ½<i>LI</i><sup>2</sup> = ½(0.085)(2.5)<sup>2</sup> = <b>0.27 J</b>`]))}
${example('17.4.2', `A steady current of 2.5 A in a coil of 500 turns produces a flux of 1.4 × 10<sup>−4</sup> Wb through each turn. Find (a) the average back e.m.f. if the current is stopped in 0.080 s, (b) the inductance, (c) the energy stored at 2.5 A.`,
  steps([`(a) |${eps}| = <i>N</i>${fr('ΔΦ', 'Δ<i>t</i>')} = (500)${fr('1.4 × 10<sup>−4</sup>', '0.080')} = <b>0.88 V</b>`, `(b) <i>L</i> = ${fr('<i>N</i>Φ', '<i>I</i>')} = ${fr('(500)(1.4 × 10<sup>−4</sup>)', '2.5')} = <b>2.8 × 10<sup>−2</sup> H</b>`, `(c) <i>U</i> = ½<i>LI</i><sup>2</sup> = ½(0.028)(2.5)<sup>2</sup> = <b>8.8 × 10<sup>−2</sup> J</b>`]))}
`)}

${sec('17-5', '17.5 Mutual induction', `
${def('Mutual induction', `the ${red('production of an induced e.m.f. in one coil because of a change of current in a neighbouring coil')}.`)}
${ul([`The changing current in the <b>primary</b> coil changes the flux linking the <b>secondary</b> coil, so an e.m.f. is induced in the secondary. (This is what Faraday saw when he switched the current on and off.)`, `The transformer and the induction coil work by mutual induction.`])}
${def('Mutual inductance, <i>M</i>', `the ${red('ratio of the e.m.f. induced in one coil to the rate of change of current in the other coil')}: <i>M</i> = −${eps}<sub>s</sub>/(d<i>I</i><sub>p</sub>/d<i>t</i>). Equivalently, the flux linkage of the secondary per unit current in the primary.`)}
${key(`${eps}<sub>s</sub> = −<i>M</i>${fr('d<i>I</i><sub>p</sub>', 'd<i>t</i>')} &nbsp;&nbsp;&nbsp; <i>MI</i><sub>p</sub> = <i>N</i><sub>s</sub>Φ<sub>s</sub>`, 'unit: henry (H). M is the same whichever coil is called the primary.')}
${h4('Two coaxial solenoids')}
${fig(F.coax(), 'Figure 17.10: a short secondary coil wound round the middle of a long primary solenoid.')}
${steps([`Field inside the primary: <i>B</i><sub>p</sub> = ${fr(`${mu0}<i>N</i><sub>p</sub><i>I</i><sub>p</sub>`, '<i>l</i><sub>p</sub>')}.`, `All of this flux passes through each turn of the secondary: Φ<sub>s</sub> = <i>B</i><sub>p</sub><i>A</i> = ${fr(`${mu0}<i>N</i><sub>p</sub><i>I</i><sub>p</sub><i>A</i>`, '<i>l</i><sub>p</sub>')}.`, `<i>M</i> = ${fr('<i>N</i><sub>s</sub>Φ<sub>s</sub>', '<i>I</i><sub>p</sub>')}:`])}
${key(`<i>M</i> = ${fr(`${mu0}<i>N</i><sub>p</sub><i>N</i><sub>s</sub><i>A</i>`, '<i>l</i><sub>p</sub>')}`, '<i>A</i> = cross-sectional area of the primary; <i>l</i><sub>p</sub> = length of the primary')}
${example('17.5.1', `A primary solenoid of radius 2.0 cm and length 24 cm has 500 turns. A secondary coil of 80 turns is wound round its centre. Find (a) the mutual inductance, (b) the e.m.f. induced in the secondary when the primary current changes at 4.8 A s<sup>−1</sup>.`,
  steps([`(a) <i>M</i> = ${fr(`${mu0}<i>N</i><sub>p</sub><i>N</i><sub>s</sub><i>A</i>`, '<i>l</i><sub>p</sub>')} = ${fr('(4π × 10<sup>−7</sup>)(500)(80)π(0.020)<sup>2</sup>', '0.24')} = <b>2.6 × 10<sup>−4</sup> H</b>`, `(b) |${eps}<sub>s</sub>| = <i>M</i>${fr('d<i>I</i><sub>p</sub>', 'd<i>t</i>')} = (2.63 × 10<sup>−4</sup>)(4.8) = <b>1.3 × 10<sup>−3</sup> V</b>`]))}
${exercises('Exercise: inductance', [
  { q: `A solenoid 25 cm long has 1000 turns and a cross-sectional area of 4.0 cm<sup>2</sup>. Find (a) its self-inductance, (b) the energy stored when it carries 3.0 A.`, a: `(a) <i>L</i> = ${mu0}<i>N</i><sup>2</sup><i>A</i>/<i>l</i> = <b>2.0 × 10<sup>−3</sup> H</b> &nbsp; (b) <i>U</i> = ½<i>LI</i><sup>2</sup> = <b>9.0 × 10<sup>−3</sup> J</b>` },
  { q: `The current in the primary of a pair of coils (M = 0.15 H) falls steadily from 4.0 A to zero in 0.020 s. Find the e.m.f. induced in the secondary.`, a: `|${eps}| = <i>M</i>Δ<i>I</i>/Δ<i>t</i> = (0.15)(4.0/0.020) = <b>30 V</b>` },
  { q: `State two differences between self induction and mutual induction.`, a: `Self induction: the e.m.f. is induced in the same coil whose current changes, and it opposes the change of that current. Mutual induction: the e.m.f. is induced in a second coil, by a change of current in the first; it needs two coils linked by flux.` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-17', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. magnet and coil ----------
  window.PhysiQSims.add('faraday', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { x: 0, auto: false, t: 0, N: 10, prevPhi: null, emf: 0, hist: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const pos = slider(ctl, 'magnet position (drag to move it)', 0, 1, 0.005, S.x, '', v => { S.x = v; });
    slider(ctl, 'number of turns <i>N</i>', 5, 30, 5, S.N, '', v => { S.N = v; });
    const tg = el('div', 'sm-row'); root.appendChild(tg);
    toggle(tg, 'Move it for me', false, v => { S.auto = v; });
    const cv = canvas(root); const ro = readouts(root);
    const phiOf = x => { const d = (1 - x) * 1.6 + 0.12; return 1 / Math.pow(d, 2.2); };   // flux per turn (arbitrary), rises as the magnet approaches
    function frame(dt) {
      if (dt <= 0) dt = 1 / 60;
      if (S.auto) { S.t += dt; S.x = 0.5 - 0.5 * Math.cos(S.t * 1.6); pos.set(S.x); }
      const phi = phiOf(S.x); if (S.prevPhi == null) S.prevPhi = phi;
      const raw = -S.N * (phi - S.prevPhi) / dt; S.prevPhi = phi; S.emf += (raw - S.emf) * Math.min(1, dt * 12);
      S.hist.push(S.emf); if (S.hist.length > 220) S.hist.shift();
      const ctx = cv.ctx, { w, h } = cv.size(0.6, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const narrow = w < 520, cy = h * 0.32, coilX = narrow ? w * 0.46 : w * 0.6, cw = narrow ? w * 0.28 : Math.min(150, w * 0.26);
      // coil
      const n = Math.min(14, 4 + S.N / 3);
      for (let i = 0; i < n; i++) { const x = coilX + i * cw / (n - 1); ctx.strokeStyle = '#B5651D'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.ellipse(x, cy, 6, 34, 0, 0, 7); ctx.stroke(); }
      // induced pole on the near end
      const big = Math.abs(S.emf) > 0.05, pole = S.emf < 0 ? 'N' : 'S';
      if (big) { ctx.fillStyle = pole === 'N' ? 'rgba(242,160,138,.9)' : 'rgba(159,195,232,.9)'; ctx.beginPath(); ctx.arc(coilX - 18, cy - 46, 13, 0, 7); ctx.fill(); text(ctx, pole, coilX - 18, cy - 41, { a: 'center', b: 1, fs: 13 }); text(ctx, 'induced pole', coilX - 18, cy - 64, { a: 'center', fs: 10.5, c: COL.sub }); }
      // magnet (N facing the coil)
      const mw = Math.min(110, w * 0.22), mx = 14 + S.x * (coilX - mw - 40 - 14);
      ctx.fillStyle = '#9FC3E8'; ctx.fillRect(mx, cy - 14, mw / 2, 28); ctx.fillStyle = '#F2A08A'; ctx.fillRect(mx + mw / 2, cy - 14, mw / 2, 28); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.3; ctx.strokeRect(mx, cy - 14, mw, 28);
      text(ctx, 'S', mx + mw / 4, cy + 5, { a: 'center', b: 1, fs: 14 }); text(ctx, 'N', mx + 3 * mw / 4, cy + 5, { a: 'center', b: 1, fs: 14 });
      // galvanometer
      const gx = Math.min(w - 26, coilX + cw + (narrow ? 32 : 60)), gy = cy, gr = narrow ? 20 : 26;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(coilX + cw, cy + 34); ctx.lineTo(gx, cy + 34); ctx.lineTo(gx, gy + gr); ctx.moveTo(coilX, cy - 34); ctx.lineTo(coilX, cy - 50); ctx.lineTo(gx, cy - 50); ctx.lineTo(gx, gy - gr); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(gx, gy, gr, 0, 7); ctx.fill(); ctx.stroke();
      const ang = Math.max(-1.2, Math.min(1.2, S.emf * 0.25)); ctx.strokeStyle = COL.r; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(gx, gy + 8); ctx.lineTo(gx + 20 * Math.sin(ang), gy + 8 - 20 * Math.cos(ang)); ctx.stroke(); text(ctx, 'G', gx, gy + 20, { a: 'center', b: 1, fs: 11 });
      // emf trace
      const bx = 40, by = h * 0.62, bw = w - 60, bh = h * 0.32;
      ctx.fillStyle = '#fff'; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = COL.grid; ctx.strokeRect(bx, by, bw, bh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by + bh / 2); ctx.lineTo(bx + bw, by + bh / 2); ctx.stroke();
      text(ctx, 'induced e.m.f.', bx, by - 6, { fs: 11, b: 1, c: COL.v });
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2; ctx.beginPath(); S.hist.forEach((v, i) => { const X = bx + bw * i / 220, Y = by + bh / 2 - Math.max(-1, Math.min(1, v / 6)) * bh * 0.45; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      const moving = Math.abs(S.emf) > 0.05;
      ro([['magnet', !moving ? 'at rest: no e.m.f.' : (S.emf < 0 ? 'approaching: flux increasing' : 'moving away: flux decreasing'), 'hl'], ['near end of the coil', moving ? (pole === 'N' ? 'N pole: repels the magnet' : 'S pole: attracts the magnet back') : '—', 'hl'], ['e.m.f. (relative)', fmt(Math.abs(S.emf), 2)], ['N turns', String(S.N)]]);
    }
    loop(cv, frame);
  });

  // ---------- 2. rod on rails ----------
  window.PhysiQSims.add('rod', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, arrow, loop } = window.PhysiQSims.U;
    const S = { B: 0.60, v: 2.5, l: 0.10, R: 0.030, x: 0.15, run: true };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'flux density <i>B</i>', 0.1, 1.0, 0.05, S.B, 'T', v => { S.B = v; });
    slider(ctl, 'speed <i>v</i>', 0, 5, 0.1, S.v, 'm s⁻¹', v => { S.v = v; });
    slider(ctl, 'resistance <i>R</i>', 0.01, 0.10, 0.005, S.R, 'Ω', v => { S.R = v; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, 'Start again', '', () => { S.x = 0.15; });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0;
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 230, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 50, x1 = w - 30, top = 34, bot = h - 60, xmax = 0.6;
      S.x += S.v * dt * 0.06; if (S.x > xmax) S.x = 0.15;
      const X = xm => x0 + (x1 - x0) * xm / xmax, xr = X(S.x);
      // shaded area of the circuit
      ctx.fillStyle = 'rgba(213,220,59,.25)'; ctx.fillRect(x0, top, xr - x0, bot - top);
      for (let x = x0 + 18; x < x1; x += 34) for (let y = top + 16; y < bot; y += 30) { ctx.strokeStyle = 'rgba(106,99,236,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, 4.5, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 1.5, 0, 7); ctx.fillStyle = 'rgba(106,99,236,.6)'; ctx.fill(); }
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, top); ctx.lineTo(x0, top); ctx.lineTo(x0, bot); ctx.lineTo(x1, bot); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.fillRect(x0 - 9, (top + bot) / 2 - 16, 18, 32); ctx.lineWidth = 1.6; ctx.strokeRect(x0 - 9, (top + bot) / 2 - 16, 18, 32); text(ctx, 'R', x0 - 16, (top + bot) / 2 + 5, { a: 'right', b: 1, it: 1 });
      ctx.fillStyle = '#E9C46A'; ctx.fillRect(xr - 5, top - 10, 10, bot - top + 20); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.3; ctx.strokeRect(xr - 5, top - 10, 10, bot - top + 20);
      const emf = S.B * S.l * S.v, I = emf / S.R, Fm = S.B * I * S.l;
      if (S.v > 0) { arrow(ctx, xr + 8, (top + bot) / 2, xr + 50, (top + bot) / 2, COL.r, 2.6); text(ctx, 'v', xr + 54, (top + bot) / 2 + 4, { b: 1, it: 1, c: COL.r });
        const fl = Math.min(80, Math.max(20, Math.min(xr - x0 - 20, 12 + Fm * 120))); arrow(ctx, xr - 8, (top + bot) / 2 + 30, xr - 8 - fl, (top + bot) / 2 + 30, COL.o, 2.6); text(ctx, 'F = BIl', xr - 8 - fl / 2, (top + bot) / 2 + 22, { a: 'center', b: 1, fs: 11, c: COL.o });
        // current: clockwise (down the rod, along the bottom rail to the left, up through R, along the top rail to the right)
        arrow(ctx, xr + 12, top + 10, xr + 12, top + 40, COL.gr, 2.2); arrow(ctx, (x0 + xr) / 2 + 20, bot + 14, (x0 + xr) / 2 - 20, bot + 14, COL.gr, 2.2); text(ctx, 'I (clockwise)', (x0 + xr) / 2, bot + 32, { a: 'center', b: 1, fs: 11, c: COL.gr }); }
      text(ctx, 'B out of the page', w - 10, 16, { a: 'right', fs: 11, c: COL.v, b: 1 }); text(ctx, 'l = 0.10 m', xr + 8, top - 14, { fs: 11, c: COL.sub });
      ro([['ε = Blv', fmt(emf, 3) + ' V', 'hl'], ['I = ε/R', fmt(I, 2) + ' A', 'hl'], ['force on the rod BIl (opposes v)', fmt(Fm, 3) + ' N'], ['power I²R = Fv', fmt(I * I * S.R, 3) + ' W']]);
    }
    loop(cv, frame);
  });

  // ---------- 3. a.c. generator ----------
  window.PhysiQSims.add('generator', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { f: 1.0, B: 0.50, N: 50, A: 0.010, th: 0, hist: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'rotation frequency <i>f</i> (slowed down)', 0.2, 2, 0.1, S.f, 'Hz', v => { S.f = v; });
    slider(ctl, 'flux density <i>B</i>', 0.1, 1, 0.05, S.B, 'T', v => { S.B = v; });
    slider(ctl, 'turns <i>N</i>', 10, 100, 10, S.N, '', v => { S.N = v; });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0;
      const om = 2 * Math.PI * S.f; S.th = (S.th + om * dt) % (2 * Math.PI);
      const e0 = S.N * S.B * S.A * om, e = e0 * Math.sin(S.th), phi = S.B * S.A * Math.cos(S.th);
      S.hist.push([e, phi]); if (S.hist.length > 160) S.hist.shift();
      const narrow0 = root.clientWidth < 520, ctx = cv.ctx, { w, h } = narrow0 ? cv.size(1.15, 400, 500) : cv.size(0.5, 260, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const narrow = w < 520, cx = narrow ? w / 2 : 110, cy = narrow ? 80 : h / 2, R = narrow ? 50 : 70;
      for (let y = cy - R; y <= cy + R + 1; y += R / 2) { ctx.strokeStyle = 'rgba(242,102,27,.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - R - 20, y); ctx.lineTo(cx + R + 20, y); ctx.stroke(); }
      text(ctx, 'B →', cx + R + 20, cy - R - 6, { a: 'right', fs: 11, c: COL.o, b: 1 });
      const dx = Math.cos(S.th), dy = Math.sin(S.th);
      ctx.strokeStyle = '#B5651D'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx - R * 0.8 * dy, cy - R * 0.8 * dx); ctx.lineTo(cx + R * 0.8 * dy, cy + R * 0.8 * dx); ctx.stroke();
      ctx.strokeStyle = COL.gr; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * dx, cy - R * dy); ctx.stroke(); text(ctx, 'normal', cx + R * dx * 1.1, cy - R * dy * 1.1, { a: 'center', fs: 10, c: COL.gr });
      // graphs
      const gx = narrow ? 36 : 250, gy0 = narrow ? 170 : 26, gw = w - gx - 16, gh = narrow ? (h - gy0 - 30) / 2 : (h - 60) / 2;
      const draw = (k, y0, col, label, max) => { ctx.fillStyle = '#fff'; ctx.fillRect(gx, y0, gw, gh); ctx.strokeStyle = COL.grid; ctx.strokeRect(gx, y0, gw, gh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, y0 + gh / 2); ctx.lineTo(gx + gw, y0 + gh / 2); ctx.stroke(); text(ctx, label, gx + 4, y0 + 12, { fs: 11, b: 1, c: col });
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); S.hist.forEach((p, i) => { const X = gx + gw * i / 160, Y = y0 + gh / 2 - p[k] / max * gh * 0.42; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); };
      draw(1, gy0, COL.sub, 'flux Φ = BA cos ωt', 1.0 * 0.010);
      draw(0, gy0 + gh + 14, COL.v, 'e.m.f. ε = NBAω sin ωt', S.N * S.B * S.A * 2 * Math.PI * 2);
      ro([['peak e.m.f. ε₀ = NBAω', fmt(e0, 2) + ' V', 'hl'], ['e.m.f. now', fmt(e, 2) + ' V', 'hl'], ['angle θ = ωt', fmt(S.th * 180 / Math.PI, 0) + '°'], ['coil area A', '0.010 m²']]);
    }
    loop(cv, frame);
  });

  // ---------- 4. switching on an inductor ----------
  window.PhysiQSims.add('inductor', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { L: 2.0, R: 4.0, E: 6.0, on: false, I: 0, t: 0, hist: [] };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'inductance <i>L</i>', 0.5, 5, 0.5, S.L, 'H', v => { S.L = v; });
    slider(ctl, 'resistance <i>R</i>', 1, 10, 0.5, S.R, 'Ω', v => { S.R = v; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const sw = button(bar, 'Close the switch', '', () => { S.on = !S.on; sw.textContent = S.on ? 'Open the switch' : 'Close the switch'; S.hist = []; S.t = 0; });
    const cv = canvas(root); const ro = readouts(root);
    function frame(dt) {
      if (dt < 0) dt = 0;
      const sdt = dt * 0.6; S.t += sdt;
      const Imax = S.E / S.R;
      if (S.on) S.I += (Imax - S.I) * (1 - Math.exp(-S.R * sdt / S.L)); else S.I *= Math.exp(-(S.R + 20) * sdt / S.L);   // opening: energy dumped quickly (spark / extra resistance)
      const back = S.on ? S.E - S.I * S.R : 0;
      if (S.t < 8) S.hist.push([S.t, S.I]);
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const bx = 50, by = 20, bw = w - 70, bh = h - 60;
      ctx.fillStyle = '#fff'; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
      const Y = I => by + bh - I / 6 * bh, Xt = t => bx + bw * t / 8;
      ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.sub; ctx.beginPath(); ctx.moveTo(bx, Y(Imax)); ctx.lineTo(bx + bw, Y(Imax)); ctx.stroke(); ctx.setLineDash([]); text(ctx, 'ε/R = ' + fmt(Imax, 2) + ' A', bx + bw - 4, Y(Imax) - 6, { a: 'right', fs: 11, c: COL.sub });
      ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); S.hist.forEach(([t, I], i) => { i ? ctx.lineTo(Xt(t), Y(I)) : ctx.moveTo(Xt(t), Y(I)); }); ctx.stroke();
      text(ctx, 'I / A', bx - 8, by + 6, { a: 'right', fs: 11, b: 1 }); text(ctx, 't (time constant L/R = ' + fmt(S.L / S.R, 2) + ' s)', bx + bw, by + bh + 20, { a: 'right', fs: 11, c: COL.sub });
      const U = 0.5 * S.L * S.I * S.I;
      ro([['current I', fmt(S.I, 2) + ' A', 'hl'], ['back e.m.f. L dI/dt', fmt(back, 2) + ' V', 'hl'], ['energy stored ½LI²', fmt(U, 2) + ' J'], ['supply e.m.f.', '6.0 V']]);
    }
    loop(cv, frame);
  });
})();
