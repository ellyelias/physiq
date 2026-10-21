/* Chapter 9 Deformation of Solids: full notes by Cikgu Suhaili (from STPM_2027_UNIT_9_Deformation_of_solids_TEACHERS_VERSION.pptx). */
(function () {
  'use strict';
  const { card, dim, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;

  const F = {};
  F.wire = () => svg(320, 130, `<defs><linearGradient id="wireg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7EEF7"/><stop offset=".5" stop-color="#9DB5D2"/><stop offset="1" stop-color="#5F7FA6"/></linearGradient></defs>` +
    `<rect x="80" y="50" width="160" height="34" rx="4" fill="url(#wireg)" stroke="${C.ink}"/><ellipse cx="240" cy="67" rx="7" ry="17" fill="#DDE6F0" stroke="${C.ink}"/>` + `<rect x="240" y="50" width="12" height="34" fill="none" stroke="${C.sub}" stroke-dasharray="3 3"/>` +
    L(80, 67, 30, 67, 'r', 'e', { w: 2.6 }) + L(252, 67, 300, 67, 'r', 'e', { w: 2.6 }) + T(26, 60, 'F', { it: 1, b: 1, a: 'end' }) + T(304, 60, 'F', { it: 1, b: 1, a: 'start' }) +
    L(80, 30, 240, 30, 'k', 'b', { w: 1.2 }) + T(160, 24, 'l₀', { it: 1 }) + L(80, 108, 252, 108, 'v', 'b', { w: 1.2 }) + T(166, 124, 'l', { it: 1, c: C.v }) + T(246, 100, 'e', { it: 1, b: 1 }) + T(256, 46, 'A', { it: 1, b: 1, a: 'start' }));
  F.ss = () => {
    const X = e => 60 + e * 330, Y = s => 230 - s * 190;
    const pts = [[0, 0], [0.12, 0.62], [0.14, 0.66], [0.16, 0.68], [0.3, 0.8], [0.5, 0.93], [0.62, 0.96], [0.78, 0.9], [0.86, 0.84]];
    let d = 'M' + pts.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' L');
    return svg(470, 260, axes(60, 230, 380, 210, 'strain, ε', 'stress, σ') + P('M' + X(0.12) + ',' + Y(0.62) + ' C' + X(0.13) + ',' + Y(0.66) + ' ' + X(0.15) + ',' + Y(0.67) + ' ' + X(0.17) + ',' + Y(0.69) + ' S' + X(0.45) + ',' + Y(0.96) + ' ' + X(0.6) + ',' + Y(0.96) + ' S' + X(0.8) + ',' + Y(0.88) + ' ' + X(0.86) + ',' + Y(0.82), 'v', { w: 2.6 }) + P(`M${X(0)},${Y(0)} L${X(0.12)},${Y(0.62)}`, 'v', { w: 2.6 }) +
      P(`M${X(0.17)},${Y(0.69)} L${X(0.04)},${Y(0)}`, 'r', { w: 1.4, d: '4 3' }) + T(X(0.04), Y(0) + 16, 'T', { fs: 12 }) +
      [['A', 0.12, 0.62], ['B', 0.14, 0.66], ['C', 0.17, 0.69], ['D', 0.6, 0.96], ['E', 0.86, 0.82]].map(([n, e, s]) => dot(X(e), Y(s), 3.5, C.ink) + T(X(e) + (n === 'A' ? -10 : n === 'B' ? -8 : 2), Y(s) - 8, n, { fs: 12, b: 1, a: n === 'A' || n === 'B' ? 'end' : 'start' })).join('') +
      T(X(0.33), Y(0.4), 'plastic region (C to E)', { fs: 11, c: C.sub }) + T(X(0.03), Y(0.88), 'elastic (O to B)', { fs: 11, c: C.sub, a: 'start' }), 470);
  };
  F.three = () => {
    const g = (path, title, sub) => svg(170, 160, axes(26, 130, 130, 110, 'e', 'F', { noO: 1 }) + P(path, 'r', { w: 2.6 }) + T(85, 152, title, { fs: 12, b: 1 }) + (sub || ''), 170);
    return `<div class="ls-grid3">${g('M26,130 L60,70 C80,40 120,38 150,52', 'Ductile', T(150, 46, '×', { fs: 14, c: C.r }))}${g('M26,130 L80,30', 'Brittle', T(80, 26, '×', { fs: 14, c: C.r }))}${g('M26,130 C70,110 90,100 110,85 C125,70 132,40 140,22', 'Polymer (rubber)')}</div>`;
  };
  F.fe = () => svg(330, 210, axes(50, 180, 260, 160, 'extension / mm', 'force / N') + P('M50,180 L90,60 L250,35', 'r', { w: 2.6 }) + `<path d="M50,180 L90,60 L90,180 Z" fill="${C.fill}"/>` +
    L(90, 60, 90, 180, 's', '', { d: '3 3', w: 1 }) + L(250, 35, 250, 180, 's', '', { d: '3 3', w: 1 }) + L(50, 60, 90, 60, 's', '', { d: '3 3', w: 1 }) + L(50, 35, 250, 35, 's', '', { d: '3 3', w: 1 }) +
    T(42, 64, '200', { fs: 11, a: 'end' }) + T(42, 39, '250', { fs: 11, a: 'end' }) + T(90, 196, '18', { fs: 11 }) + T(250, 196, '88', { fs: 11 }) + T(50, 196, 'P', { fs: 11, b: 1 }) + T(96, 56, 'Q', { b: 1, a: 'start' }) + T(256, 32, 'R', { b: 1, a: 'start' }));
  F.lattice = () => {
    const grid = (ox, oy, shiftTop, col) => { let s = ''; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += dot(ox + i * 26 + (j < 2 ? shiftTop : 0), oy + j * 24, 4.5, col); return s; };
    const a = svg(170, 140, grid(40, 16, 14, '#2F6FE0') + L(30, 52, 150, 52, 's', '', { d: '4 3', w: 1 }) + T(150, 48, 'slip plane', { fs: 10, a: 'end', c: C.sub }) + T(85, 132, 'Ductile: planes slip', { fs: 11, b: 1 }), 170);
    const b = svg(170, 140, grid(46, 16, 0, '#C0392B') + P('M30,52 L60,46 L90,58 L120,48 L150,56', 'r', { w: 2 }) + T(85, 132, 'Brittle: crack runs through', { fs: 11, b: 1 }), 170);
    const c = svg(170, 140, P('M20,36 L35,22 L50,44 L65,24 L80,46', 'g', { w: 2 }) + P('M20,80 L35,66 L50,88 L65,68 L80,90', 'g', { w: 2 }) + L(88, 60, 104, 60, 'k', 'e', { w: 1.6 }) + P('M112,36 L160,36', 'g', { w: 2 }) + P('M112,80 L160,80', 'g', { w: 2 }) + T(85, 132, 'Polymer: chains uncoil', { fs: 11, b: 1 }), 170);
    return `<div class="ls-grid3">${a}${b}${c}</div>`;
  };

  const S = `
${sec('9-0', 'Deformation', `
${def('Deformation', `is any ${red('change in the shape or size of an object')} caused by an external force.`)}
${two(def('Elastic deformation', `The object ${red('regains its original shape and size')} when the force is removed. It occurs when the material is deformed <b>within its elastic limit</b>.`), def('Plastic deformation', `The object ${red('does not regain its original shape')} when the force is removed. It occurs when the material is deformed <b>beyond its elastic limit</b>.`))}
`)}

${sec('9-1', '9.1 Stress and strain', `
${fig(F.wire(), 'A wire of original length l₀ and cross-sectional area A, stretched by a force F perpendicular to A, extends by e.')}
${two(`${def('Tensile stress, σ', `is the ${red('force per unit cross-sectional area')} acting on a body that tends to deform it.`)}${key(`σ = ${fr('<i>F</i>', '<i>A</i>')}`)}${ul([`Scalar quantity.`, `Dimension ${dim('M L^-1 T^-2')}; unit N m<sup>−2</sup> = Pa (kg m<sup>−1</sup> s<sup>−2</sup>).`])}`,
  `${def('Tensile strain, ε', `is the ${red('ratio of the extension to the original length')}.`)}${key(`ε = ${fr('<i>e</i>', '<i>l</i><sub>0</sub>')} = ${fr('<i>l</i> − <i>l</i><sub>0</sub>', '<i>l</i><sub>0</sub>')}`)}${ul([`Scalar quantity, no unit (dimensionless).`, `<i>l</i><sub>0</sub> = original length, <i>l</i> = final length, <i>e</i> = extension.`])}`)}
`)}

${sec('9-2', '9.2 Force–extension and stress–strain graphs', `
${h4('Stress–strain graph for a ductile metal')}
${fig(F.ss())}
${table(['Point or region', 'Meaning'], [
  ['<b>OA</b>, A = <b>limit of proportionality</b>', 'Stress increases linearly with strain up to A. The straight line OA obeys <b>Hooke’s law</b>: the restoring force is directly proportional to the extension.'],
  ['<b>B</b> = <b>elastic limit</b>', 'Beyond B the material is permanently stretched and never regains its original length. In the region OB the material undergoes <b>elastic deformation</b>.'],
  ['<b>C</b> = <b>yield point</b>', 'A small increase in stress produces a large increase in strain. When the stress is removed the material keeps a permanent strain (OT). Planes of atoms slide across each other and the wire thins.'],
  ['<b>CD</b> = <b>plastic deformation</b>', 'As the stress increases, the strain increases rapidly.'],
  ['<b>D</b> = maximum stress', 'The <b>breaking stress</b>, also called the <b>ultimate tensile strength</b> (UTS).'],
  ['<b>E</b> = fracture point', 'The material breaks.']])}
${note('Unloading from a point beyond the elastic limit follows a line parallel to OA, so the material is left with a permanent strain OT.')}
${h4('Force–extension graphs for ductile, brittle and polymeric materials')}
${F.three()}
${table(['Material', 'Examples', 'Shape of the F–e graph'], [['Ductile', 'copper, mild steel, aluminium', 'straight line, then a long plastic region before fracture'], ['Brittle', 'glass, cast iron, ceramics', 'straight line almost up to fracture; snaps suddenly with almost no plastic extension'], ['Polymeric', 'rubber', 'non-linear, S-shaped; very large extension, much of it recoverable']])}
<p class="ls-small">The gradient of the straight part is the stiffness. A steeper line (e.g. brittle glass) means a larger Young’s modulus, but the material still fractures suddenly with little or no plastic deformation.</p>
${F.lattice()}
${ul([`<b>Ductile metals</b>: atoms are held by a "sea" of shared electrons that bond equally in every direction. Under tension whole planes of atoms slide past one another (dislocation motion) without breaking the metallic bond, so the metal stretches a long way before fracture.`, `<b>Brittle materials</b>: strong ionic or covalent bonds hold atoms rigidly and do not allow planes to slide. The bonds stretch only slightly; when those along one plane reach their limit they all snap together and a crack runs straight through.`, `<b>Polymers</b>: long tangled chain molecules held together by weak van der Waals forces. A small force uncoils and straightens the chains (large extension for little force). Once the chains are aligned, the force acts on the strong covalent bonds along the backbone, so the graph becomes steep: the S-shaped curve.`])}
${sim('stress', 'Stretch a wire: stress–strain explorer', 'Choose a material and slowly increase the load. The point moves along the curve and the region is named. Release the load after passing the elastic limit to see the permanent extension.')}

${h4('Young’s modulus')}
${def('Young’s modulus, <i>Y</i> (or <i>E</i>)', `is the ${red('ratio of tensile stress to tensile strain')}, provided the limit of proportionality is not exceeded.`)}
${key(`<i>Y</i> = ${fr('σ', 'ε')} = ${fr('<i>F</i>/<i>A</i>', '<i>e</i>/<i>l</i><sub>0</sub>')} = ${fr('<i>Fl</i><sub>0</sub>', '<i>Ae</i>')}`, `dimension ${dim('M L^-1 T^-2')}; unit N m<sup>−2</sup> = Pa`)}
${ul([`Young’s modulus describes the elastic properties of a material.`, `The larger <i>Y</i>, the harder it is to stretch the material.`])}
${table(['Material', '<i>Y</i> / 10<sup>10</sup> Pa'], [['Aluminium', '6.9'], ['Copper', '11.7'], ['Steel', '20'], ['Nylon', '0.37'], ['Glass', '7.0']])}
${h4('Young’s modulus and Hooke’s law for a wire')}
${steps([`Young’s modulus: <i>Y</i> = ${fr('<i>Fl</i><sub>0</sub>', '<i>Ae</i>')} ⇒ <i>F</i> = (${fr('<i>YA</i>', '<i>l</i><sub>0</sub>')})<i>e</i> <span class="ls-tag">(i)</span>`, `Hooke’s law: <i>F</i> = <i>ke</i> <span class="ls-tag">(ii)</span>`, `Comparing (i) and (ii):`])}
${key(`<i>k</i> = ${fr('<i>YA</i>', '<i>l</i><sub>0</sub>')}`, 'force constant (spring constant) of the wire')}
`)}

${sec('9-3', '9.3 Strain energy', `
${def('Strain energy', `is the ${red('elastic potential energy stored in a stretched (or compressed) material')}: the work done on the wire in stretching it.`)}
${steps([`Up to the limit of proportionality, <i>F</i> increases linearly from 0 to <i>F</i> as the extension goes from 0 to <i>e</i>.`, `Work done = area under the <i>F</i>–<i>e</i> graph = ½<i>Fe</i>, or <i>W</i> = ∫<sub>0</sub><sup><i>e</i></sup> <i>kx</i> d<i>x</i> = ½<i>ke</i><sup>2</sup>`])}
${key(`<i>U</i> = ½<i>Fe</i> = ½<i>ke</i><sup>2</sup>`, 'strain energy = area under the force–extension graph')}
${steps([`Divide by the volume <i>Al</i><sub>0</sub>: ${fr('<i>U</i>', '<i>Al</i><sub>0</sub>')} = ½ ${fr('<i>F</i>', '<i>A</i>')} ${fr('<i>e</i>', '<i>l</i><sub>0</sub>')} = ½σε`])}
${key(`Strain energy per unit volume = ½σε = area under the stress–strain graph`)}
${example('9.1', `A wire of length 1.0 m stretches by 0.6 mm when a 20 kg mass hangs on it. The radius of the wire is 1 mm. Calculate (a) the stress, (b) the strain, (c) the Young’s modulus, (d) the force constant of the wire. (<i>g</i> = 9.81 m s<sup>−2</sup>)`,
  steps([`<i>l</i><sub>0</sub> = 1.0 m, <i>e</i> = 0.6 × 10<sup>−3</sup> m, <i>m</i> = 20 kg, <i>r</i> = 1 × 10<sup>−3</sup> m`, `(a) σ = ${fr('<i>mg</i>', 'π<i>r</i><sup>2</sup>')} = ${fr('(20)(9.81)', 'π(1 × 10<sup>−3</sup>)<sup>2</sup>')} = <b>6.24 × 10<sup>7</sup> Pa</b>`, `(b) ε = ${fr('<i>e</i>', '<i>l</i><sub>0</sub>')} = <b>6.0 × 10<sup>−4</sup></b>`, `(c) <i>Y</i> = ${fr('σ', 'ε')} = <b>1.04 × 10<sup>11</sup> Pa</b>`, `(d) <i>k</i> = ${fr('<i>Y</i>(π<i>r</i><sup>2</sup>)', '<i>l</i><sub>0</sub>')} = <b>3.27 × 10<sup>5</sup> N m<sup>−1</sup></b>`]))}
${example('9.2', `A bridge support cable has cross-sectional area 0.0085 m<sup>2</sup> and length 35 m. It is made of high-tensile steel with Young’s modulus 2.8 × 10<sup>11</sup> Pa. The tension in the cable is 720 kN. Calculate (a) the extension, (b) the strain energy stored.`,
  steps([`(a) <i>Y</i> = ${fr('<i>Tl</i><sub>0</sub>', '<i>Ae</i>')} ⇒ <i>e</i> = ${fr('<i>Tl</i><sub>0</sub>', '<i>YA</i>')} = ${fr('(720 × 10<sup>3</sup>)(35)', '(2.8 × 10<sup>11</sup>)(0.0085)')} = <b>0.0106 m</b>`, `(b) <i>U</i> = ½<i>Te</i> = ½(720 × 10<sup>3</sup>)(0.0106) = <b>3.82 kJ</b>`]))}
${exercises('Exercises: deformation of solids', [
  { q: `A wire of unstretched length 2.00 m is stretched by a tensile force. Its force–extension graph has two straight sections: PQ from 0 to 200 N at 18 mm, and QR from 200 N to 250 N at 88 mm. Calculate (a) the strain in the wire at Q and at R, (b) the strain energy stored in the wire at Q, (c) the work done in stretching the wire from P to R.`, f: fig(F.fe()),
    a: `(a) 0.009 at Q; 0.044 at R &nbsp; (b) ½(200)(0.018) = 1.8 J &nbsp; (c) 1.8 + ½(200 + 250)(0.070) = 17.55 J<br><span class="ls-small">The slide asks for "strain energy" in (a); the answers 0.009 and 0.044 are the strains.</span>` },
  { q: `A metal wire 75.0 cm long and 0.13 cm in diameter stretches 0.0350 cm when an 8.00 kg load hangs on it. Find the stress, the strain and the Young’s modulus.`, a: `5.91 × 10<sup>7</sup> N m<sup>−2</sup>; 4.67 × 10<sup>−4</sup>; 1.27 × 10<sup>11</sup> N m<sup>−2</sup>` }])}
`)}`;

  // ---------- simulation: stress-strain explorer ----------
  window.PhysiQSims.add('stress', function (root) {
    const { COL, fmt, clamp, el, slider, button, canvas, text, panel, readouts } = window.PhysiQSims.U;
    // curves in normalised units: strain 0..1, stress 0..1
    const MAT = {
      ductile: { name: 'Ductile metal (copper)', A: 0.10, B: 0.115, C: 0.13, Dx: 0.6, Dy: 1, E: 0.85, Ey: 0.9, sA: 0.62 },
      brittle: { name: 'Brittle (glass)', A: 0.2, B: 0.2, C: 0.2, Dx: 0.21, Dy: 1, E: 0.215, Ey: 1, sA: 0.95 },
      polymer: { name: 'Polymer (rubber)' }
    };
    const S = { m: 'ductile', load: 0, maxStrain: 0, broken: false, released: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const mb = Object.keys(MAT).map(k => { const b = button(pre, MAT[k].name, 'sm-chip', () => { S.m = k; mb.forEach(x => x.classList.toggle('on', x === b)); reset(); }); return b; });
    mb[0].classList.add('on');
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const sl = slider(ctl, 'applied load (stress, as a fraction of the maximum)', 0, 1, 0.005, 0, '', v => { if (S.broken) return; S.load = v; S.released = false; update(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, 'Release the load', 'sm-main', () => { if (S.broken) return; S.released = true; S.load = 0; sl.set(0); draw(); });
    button(bar, '↺ New wire', '', () => reset());
    const cv = canvas(root); const ro = readouts(root);
    function curve(m, e) { // stress for strain e
      if (m === 'polymer') { const x = e; return clamp(0.5 * Math.tanh(4 * x) * (1 - x) + 1.2 * Math.pow(x, 4) + 0.08 * x, 0, 1); }
      const M = MAT[m];
      if (e <= M.A) return M.sA * e / M.A;
      if (m === 'brittle') return M.sA + (1 - M.sA) * (e - M.A) / (M.Dx - M.A);
      if (e <= M.C) return M.sA + 0.04 * (e - M.A) / (M.C - M.A);
      if (e <= M.Dx) { const t = (e - M.C) / (M.Dx - M.C); return M.sA + 0.04 + (1 - M.sA - 0.04) * Math.sin(t * Math.PI / 2); }
      const t = (e - M.Dx) / (M.E - M.Dx); return 1 - 0.1 * t;
    }
    const eMax = () => S.m === 'polymer' ? 1 : MAT[S.m].E;
    function strainFor(s) { // smallest strain reaching stress s on the rising part
      let lo = 0, hi = S.m === 'polymer' ? 1 : MAT[S.m].Dx;
      for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (curve(S.m, mid) < s) lo = mid; else hi = mid; }
      return hi;
    }
    function update() {
      if (S.load >= 0.999) { S.maxStrain = eMax(); S.broken = true; draw(); return; }
      const e = strainFor(S.load); S.maxStrain = Math.max(S.maxStrain, e); draw();
    }
    function reset() { S.load = 0; S.maxStrain = 0; S.broken = false; S.released = false; sl.set(0); draw(); }
    function region(e) {
      if (S.m === 'polymer') return e < 0.6 ? 'chains uncoiling: large extension for little force' : 'chains aligned: graph gets steep';
      const M = MAT[S.m];
      if (S.broken) return 'fracture';
      if (e <= M.A + 1e-6) return 'O to A: obeys Hooke’s law (stress ∝ strain)';
      if (e <= M.B) return 'A to B: beyond the limit of proportionality, still elastic';
      if (e <= M.C) return 'B to C: beyond the elastic limit';
      return 'C to D: plastic deformation (yield)';
    }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 280, 420);
      ctx.clearRect(0, 0, w, h);
      const p = panel(ctx, { x: 56, y: 24, w: w - 80, h: h - 70 }, 0, 1, 0, 1.1, 'strain ε (relative)', 'σ', '(relative)');
      ctx.strokeStyle = 'rgba(28,34,48,.25)'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const e = eMax() * i / 200; i ? ctx.lineTo(p.X(e), p.Y(curve(S.m, e))) : ctx.moveTo(p.X(e), p.Y(curve(S.m, e))); } ctx.stroke();
      ctx.strokeStyle = COL.v; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const e = S.maxStrain * i / 200; i ? ctx.lineTo(p.X(e), p.Y(curve(S.m, e))) : ctx.moveTo(p.X(e), p.Y(curve(S.m, e))); } ctx.stroke();
      let curE = S.maxStrain, curS = curve(S.m, S.maxStrain);
      const M = MAT[S.m] || {};
      if (S.m !== 'polymer') [['A', M.A], ['B', M.B], ['C', M.C], ['D', M.Dx], ['E', M.E]].forEach(([n, e]) => { if (S.m === 'brittle' && n !== 'A' && n !== 'E') return; ctx.fillStyle = COL.ink; ctx.beginPath(); ctx.arc(p.X(e), p.Y(curve(S.m, e)), 3, 0, 7); ctx.fill(); text(ctx, n, p.X(e) + 4, p.Y(curve(S.m, e)) - 6, { b: 1, fs: 12 }); });
      let perm = 0;
      if (S.released && S.m !== 'polymer') {
        const slope = M.sA / M.A; perm = Math.max(0, S.maxStrain - curS / slope);
        if (S.maxStrain <= M.B) perm = 0;
        ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.r; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.X(S.maxStrain), p.Y(curS)); ctx.lineTo(p.X(perm), p.Y(0)); ctx.stroke(); ctx.setLineDash([]);
        curE = perm; curS = 0;
        if (perm > 0) text(ctx, 'permanent strain', p.X(perm) + 6, p.Y(0) - 8, { fs: 11, c: COL.r, b: 1 });
      } else if (S.released) { curE = 0; curS = 0; }
      ctx.beginPath(); ctx.arc(p.X(curE), p.Y(curS), 6, 0, 7); ctx.fillStyle = COL.r; ctx.fill();
      text(ctx, S.broken ? 'The wire has broken' : (S.released ? (perm > 0 ? 'Load removed: the wire stays longer (plastic deformation)' : 'Load removed: the wire returns to its original length (elastic)') : region(S.maxStrain)), 62, 16, { b: 1, fs: 12, c: S.broken ? COL.r : COL.gr });
      ro([['material', MAT[S.m].name], ['stress now', fmt(curS, 2)], ['strain now', fmt(curE, 3)], ['permanent strain', fmt(perm, 3), perm > 0 ? 'ao' : '']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    reset();
  });

  window.PhysiQLessons.register('LESSON-9', { html: () => S });
})();
