/* Semester 2 Chapter 13 Capacitors: full notes by Cikgu Suhaili (from the Unit 13 Capacitor and Dielectrics slides).
   App chapter 13 = STPM 2026 syllabus chapter 14. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4 } = window.PhysiQLessons.H;

  // ---------- circuit drawing helpers (SVG) ----------
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/>`;
  const pl = (x1, y1, x2, y2, col, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const lab = (x, y, s, o = {}) => s ? T(x, y, s, Object.assign({ fs: 11 }, o)) : '';
  const hcap = (x1, x2, y, s, o = {}) => { const c = (x1 + x2) / 2; return ln(x1, y, c - 4, y) + ln(c + 4, y, x2, y) + pl(c - 4, y - 12, c - 4, y + 12, C.v, 3) + pl(c + 4, y - 12, c + 4, y + 12, C.v, 3) + lab(c, o.below ? y + 26 : y - 17, s, o); };
  const vcap = (x, y1, y2, s, o = {}) => { const c = (y1 + y2) / 2; return ln(x, y1, x, c - 4) + ln(x, c + 4, x, y2) + pl(x - 12, c - 4, x + 12, c - 4, C.v, 3) + pl(x - 12, c + 4, x + 12, c + 4, C.v, 3) + lab(o.left ? x - 17 : x + 17, c + 4, s, Object.assign({ a: o.left ? 'end' : 'start' }, o)); };
  // battery: long thin plate is +; pos = 'l' / 'r' (horizontal) or 't' / 'b' (vertical) says where + is
  const hbat = (x1, x2, y, s, pos = 'l') => { const c = (x1 + x2) / 2, a = pos === 'l' ? -3 : 3; return ln(x1, y, c - 3, y) + ln(c + 3, y, x2, y) + pl(c + a, y - 13, c + a, y + 13, C.ink, 1.8) + pl(c - a, y - 7, c - a, y + 7, C.ink, 4) + lab(c, y - 18, s); };
  const vbat = (x, y1, y2, s, pos = 't', o = {}) => { const c = (y1 + y2) / 2, a = pos === 't' ? -3 : 3; return ln(x, y1, x, c - 3) + ln(x, c + 3, x, y2) + pl(x - 13, c + a, x + 13, c + a, C.ink, 1.8) + pl(x - 7, c - a, x + 7, c - a, C.ink, 4) + lab(o.right ? x + 18 : x - 18, c + 4, s, { a: o.right ? 'start' : 'end' }); };
  const hres = (x1, x2, y, s) => { const c = (x1 + x2) / 2; return ln(x1, y, c - 16, y) + ln(c + 16, y, x2, y) + `<rect x="${c - 16}" y="${y - 6}" width="32" height="12" fill="#fff" stroke="${C.ink}" stroke-width="1.8"/>` + lab(c, y - 12, s); };
  const vres = (x, y1, y2, s, o = {}) => { const c = (y1 + y2) / 2; return ln(x, y1, x, c - 16) + ln(x, c + 16, x, y2) + `<rect x="${x - 6}" y="${c - 16}" width="12" height="32" fill="#fff" stroke="${C.ink}" stroke-width="1.8"/>` + lab(o.left ? x - 12 : x + 12, c + 4, s, { a: o.left ? 'end' : 'start' }); };
  const hsw = (x1, x2, y, s, closed) => { const c = (x1 + x2) / 2; return ln(x1, y, c - 12, y) + ln(c + 12, y, x2, y) + `<circle cx="${c - 12}" cy="${y}" r="2.6" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/><circle cx="${c + 12}" cy="${y}" r="2.6" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/>` + ln(c - 12, y, c + 10, closed ? y : y - 11) + lab(c, y + 18, s); };
  const nd = (x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${C.ink}"/>`;
  const term = (x, y, s, o = {}) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + lab(x + (o.dx || 0), y + (o.dy || -8), s, { fs: 12, it: 1, b: 1 });

  // ---------- figures ----------
  const F = {};
  F.plates = () => { let b = `<rect x="70" y="20" width="10" height="120" fill="#F9D9C8" stroke="${C.r}"/><rect x="170" y="20" width="10" height="120" fill="#D9E7F7" stroke="#2C6BB3"/>`; for (let y = 30; y <= 130; y += 14) b += T(62, y + 4, '+', { fs: 12, b: 1, c: C.r }) + T(188, y + 4, '−', { fs: 12, b: 1, c: '#2C6BB3' }) + L(82, y, 168, y, 'v', '', { w: 1 }) + `<path d="M${122},${y - 3} L${128},${y} L${122},${y + 3}Z" fill="${C.v}"/>`;
    b += L(80, 152, 170, 152, 's', 'b', { w: 1 }) + T(125, 168, 'd', { it: 1 }) + T(75, 14, '+Q', { fs: 12, b: 1, c: C.r }) + T(175, 14, '−Q', { fs: 12, b: 1, c: '#2C6BB3' }) + T(215, 60, 'area A', { fs: 12, it: 1, a: 'start' }) + T(215, 80, 'of each plate', { fs: 11, a: 'start', c: C.sub }) + T(125, 90, 'E', { fs: 13, it: 1, b: 1, c: C.v });
    return svg(300, 176, b, 300); };
  F.symbol = () => svg(300, 60, hcap(20, 100, 30, 'capacitor') + `<path d="M180,18 L180,42" stroke="${C.v}" stroke-width="3"/><path d="M194,18 Q186,30 194,42" stroke="${C.v}" stroke-width="3" fill="none"/>` + ln(160, 30, 180, 30) + ln(190, 30, 220, 30) + T(178, 14, '+', { fs: 12, b: 1, c: C.r }) + T(190, 56, 'electrolytic (polarised)', { fs: 11 }), 300);
  F.series = () => svg(320, 130, term(20, 40, '') + hcap(20, 100, 40, 'C₁') + hcap(100, 180, 40, 'C₂') + hcap(180, 260, 40, 'C₃') + term(260, 40, '') + ln(260, 40, 290, 40) + ln(290, 40, 290, 100) + ln(20, 40, 0, 40) + ln(0, 40, 0, 100) + hbat(0, 290, 100, 'V') +
    T(60, 66, '+Q −Q', { fs: 10, c: C.r }) + T(140, 66, '+Q −Q', { fs: 10, c: C.r }) + T(220, 66, '+Q −Q', { fs: 10, c: C.r }) + T(60, 80, 'V₁', { fs: 11, it: 1 }) + T(140, 80, 'V₂', { fs: 11, it: 1 }) + T(220, 80, 'V₃', { fs: 11, it: 1 }), 320);
  F.parallel = () => svg(320, 190, ln(40, 36, 40, 150) + ln(200, 36, 200, 150) + hcap(40, 200, 36, 'C₁   Q₁ = C₁V') + hcap(40, 200, 86, 'C₂   Q₂ = C₂V') + hcap(40, 200, 136, 'C₃   Q₃ = C₃V') + ln(40, 136, 40, 150) + ln(40, 150, 10, 150) + ln(200, 150, 230, 150) + ln(10, 150, 10, 175) + ln(230, 150, 230, 175) + hbat(10, 230, 175, '') + nd(40, 86) + nd(200, 86) + T(250, 179, 'V', { fs: 12, it: 1, a: 'start' }), 320);
  F.e3 = () => svg(300, 110, vbat(60, 20, 90, '50 V', 't') + ln(60, 20, 240, 20) + ln(60, 90, 240, 90) + vcap(150, 20, 90, 'C₁ = 1 μF') + vcap(240, 20, 90, 'C₂ = 2 μF') + nd(150, 20) + nd(150, 90), 300);
  F.e4 = () => svg(260, 120, ln(30, 32, 30, 100) + hcap(30, 130, 32, 'C₁ = 1 μF') + hcap(130, 230, 32, 'C₂ = 2 μF') + ln(230, 32, 230, 100) + hbat(30, 230, 100, '50 V'), 260);
  F.e5 = () => svg(300, 150, ln(20, 50, 20, 130) + hcap(20, 110, 50, 'C₁ = 6.0 μF') + ln(110, 50, 140, 50) + ln(140, 28, 140, 72) + hcap(140, 240, 28, 'C₂ = 4.0 μF') + hcap(140, 240, 72, 'C₃ = 8.0 μF', { below: 1 }) + ln(240, 28, 240, 72) + ln(240, 50, 270, 50) + ln(270, 50, 270, 130) + hbat(20, 270, 130, '12 V') + nd(140, 50) + nd(240, 50), 300);
  F.e6 = () => { let b = term(150, 14, 'a', { dx: 12, dy: 4 }) + ln(150, 14, 150, 34) + ln(60, 34, 240, 34) + ln(60, 170, 240, 170) + nd(150, 34) + nd(150, 170);
    b += vcap(60, 34, 102, 'C₁', { left: 1 }) + vcap(60, 102, 170, 'C₂', { left: 1 }) + vcap(240, 34, 102, 'C₁') + vcap(240, 102, 170, 'C₂') + vcap(150, 34, 170, 'C₃');
    b += ln(150, 170, 150, 190) + ln(100, 190, 200, 190) + nd(150, 190) + vcap(100, 190, 240, 'C₂', { left: 1 }) + vcap(200, 190, 240, 'C₂') + ln(100, 240, 200, 240) + nd(150, 240) + ln(150, 240, 150, 262) + term(150, 262, 'b', { dx: 12, dy: 4 });
    return svg(300, 274, b, 300); };
  F.e7 = () => svg(320, 170, hcap(40, 140, 30, '1 μF') + hcap(140, 240, 30, '1 μF') + ln(240, 30, 290, 30) + hcap(40, 140, 140, '1 μF', { below: 1 }) + hcap(140, 240, 140, '1 μF', { below: 1 }) + ln(240, 140, 290, 140) + vcap(40, 30, 140, '1 μF', { left: 1 }) + vcap(240, 30, 140, '1 μF') + nd(240, 30) + nd(240, 140) + term(290, 30, 'X', { dy: -8 }) + term(290, 140, 'Y', { dy: 20 }), 320);
  F.x1 = () => svg(300, 166, term(20, 60, 'a', { dy: -8 }) + ln(20, 60, 60, 60) + ln(60, 35, 60, 85) + ln(160, 35, 160, 85) + hcap(60, 160, 35, 'C₁') + hcap(60, 160, 85, 'C₂', { below: 1 }) + nd(60, 60) + nd(160, 60) + ln(160, 60, 220, 60) + ln(220, 60, 220, 140) + nd(220, 100) + T(232, 104, 'd', { fs: 12, it: 1, b: 1, a: 'start' }) + hcap(20, 220, 140, 'C₃', { below: 1 }) + term(20, 140, 'b', { dy: 20 }), 300);
  F.x2 = () => svg(320, 150, term(14, 75, 'a', { dy: -8 }) + ln(14, 75, 50, 75) + ln(50, 30, 50, 120) + nd(50, 75) + hcap(50, 120, 30, '15.0 μF') + hcap(120, 190, 30, '3.00 μF') + hcap(50, 190, 120, '6.00 μF', { below: 1 }) + ln(190, 30, 190, 120) + nd(190, 75) + hcap(190, 290, 75, '20.0 μF') + term(290, 75, 'b', { dy: -8 }), 320);
  F.x3 = () => svg(260, 150, ln(30, 30, 30, 130) + ln(220, 30, 220, 130) + hcap(30, 125, 30, '3.00 μF') + hcap(125, 220, 30, '4.00 μF') + hcap(30, 220, 80, '2.00 μF') + nd(30, 80) + nd(220, 80) + hbat(30, 220, 130, '26.0 V'), 260);
  F.charge = (dis) => { const b = vbat(40, 30, 130, dis ? '' : 'V₀', 't') + ln(40, 30, 40, 30) + hres(40, 200, 30, 'R') + ln(200, 30, 200, 60) + ln(200, 100, 200, 130) + pl(184, 74, 216, 74, C.r, 3) + pl(184, 86, 216, 86, '#2C6BB3', 3) + T(228, 74, 'A', { fs: 12, b: 1, a: 'start' }) + T(228, 92, 'B', { fs: 12, b: 1, a: 'start' }) + ln(200, 60, 200, 74) + ln(200, 86, 200, 100) + T(172, 80, 'C', { fs: 12, it: 1, a: 'end' }) +
      T(200, 70, '+ + + +', { fs: 9, c: C.r }) + T(200, 98, '− − − −', { fs: 9, c: '#2C6BB3' }) + hsw(40, 200, 130, 'switch S', true);
    return svg(270, 160, dis ? b.replace(vbat(40, 30, 130, '', 't'), ln(40, 30, 40, 130)) + L(150, 12, 110, 12, 'o', 'e', { w: 1.6 }) + T(130, 8, 'e⁻', { fs: 10, c: C.o }) : b + L(90, 12, 130, 12, 'o', 'e', { w: 1.6 }) + T(110, 8, 'e⁻', { fs: 10, c: C.o }) + L(100, 148, 70, 148, 'o', 'e', { w: 1.6 }) + T(85, 158, 'e⁻', { fs: 10, c: C.o }), 270); };
  F.e10 = () => svg(320, 150, vbat(40, 30, 120, 'V', 't') + ln(40, 30, 280, 30) + vcap(150, 30, 120, 'C₁') + vcap(280, 30, 120, 'C₂') + hsw(40, 150, 120, 'S₁') + hsw(150, 280, 120, 'S₂') + nd(150, 30) + nd(150, 120), 320);
  F.e11 = () => svg(320, 160, vbat(40, 30, 130, 'V₀', 't') + ln(40, 30, 96, 30) + `<circle cx="100" cy="30" r="2.8" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/>` + T(100, 18, 'a', { fs: 12, it: 1, b: 1 }) + `<circle cx="112" cy="62" r="2.8" fill="#fff" stroke="${C.ink}" stroke-width="1.5"/>` + T(124, 66, 'b', { fs: 12, it: 1, b: 1, a: 'start' }) + ln(112, 65, 112, 130) + `<circle cx="140" cy="30" r="2.8" fill="${C.ink}"/>` + ln(140, 30, 103, 30) + T(140, 18, 'S', { fs: 12, b: 1 }) + hres(140, 260, 30, 'R') + ln(260, 30, 260, 60) + vcap(260, 60, 100, 'C') + ln(260, 100, 260, 130) + ln(40, 130, 260, 130) + nd(112, 130), 320);
  F.graphs = (dis) => { const W = 150, H = 100, g = (f, lb, mk, y0) => { let d = ''; for (let i = 0; i <= 60; i++) { const t = i / 60 * 4; d += (i ? ' L' : 'M') + (30 + t / 4 * W).toFixed(1) + ',' + (y0 - f(t) * H).toFixed(1); } return d; };
    const tau = 30 + W / 4, cq = dis ? (t => Math.exp(-t)) : (t => 1 - Math.exp(-t));
    const left = svg(200, 150, axes(30, 125, W + 10, H + 10, 't', dis ? 'Q, V' : 'Q, V', { noO: 1 }) + P(g(cq, '', '', 125), 'v', { w: 2.4 }) + L(30, 125 - (dis ? 0.37 : 0.63) * H, tau, 125 - (dis ? 0.37 : 0.63) * H, 's', '', { w: 1, d: '3 3' }) + L(tau, 125, tau, 125 - (dis ? 0.37 : 0.63) * H, 's', '', { w: 1, d: '3 3' }) + T(tau, 140, 'τ', { fs: 12, it: 1 }) + T(26, 125 - (dis ? 0.37 : 0.63) * H + 4, dis ? '0.37Q₀' : '0.63Q₀', { fs: 10, a: 'end' }) + T(26, 125 - H + 4, 'Q₀', { fs: 10, a: 'end' }) + (dis ? '' : L(30, 125 - H, 30 + W, 125 - H, 's', '', { w: 1, d: '2 4' })), 200);
    const right = svg(200, 150, axes(30, 125, W + 10, H + 10, 't', 'I', { noO: 1 }) + P(g(t => Math.exp(-t), '', '', 125), 'o', { w: 2.4 }) + L(30, 125 - 0.37 * H, tau, 125 - 0.37 * H, 's', '', { w: 1, d: '3 3' }) + L(tau, 125, tau, 125 - 0.37 * H, 's', '', { w: 1, d: '3 3' }) + T(tau, 140, 'τ', { fs: 12, it: 1 }) + T(26, 125 - 0.37 * H + 4, '0.37I₀', { fs: 10, a: 'end' }) + T(26, 125 - H + 4, 'I₀', { fs: 10, a: 'end' }), 200);
    return two(left, right); };
  F.VQ = () => svg(220, 150, axes(30, 125, 170, 110, 'Q', 'V', { noO: 1 }) + `<path d="M30,125 L170,35 L170,125 Z" fill="${C.fill}"/>` + L(30, 125, 170, 35, 'v', '', { w: 2.4 }) + L(170, 35, 170, 125, 's', '', { w: 1, d: '3 3' }) + T(170, 140, 'Q', { fs: 11, it: 1 }) + T(24, 39, 'V', { fs: 11, it: 1, a: 'end' }) + T(130, 105, 'U = ½QV', { fs: 12, it: 1 }), 220);
  F.diel = () => { const pane = (x0, withD) => { let b = `<rect x="${x0}" y="20" width="8" height="110" fill="#F9D9C8" stroke="${C.r}"/><rect x="${x0 + 112}" y="20" width="8" height="110" fill="#D9E7F7" stroke="#2C6BB3"/>`; for (let y = 28; y <= 122; y += 12) b += T(x0 - 6, y + 4, '+', { fs: 10, b: 1, c: C.r }) + T(x0 + 128, y + 4, '−', { fs: 10, b: 1, c: '#2C6BB3' });
      if (withD) { b += `<rect x="${x0 + 22}" y="22" width="76" height="106" fill="#EEF3D8" stroke="${C.g}"/>`; for (let y = 34; y <= 118; y += 21) for (let x = x0 + 32; x <= x0 + 80; x += 24) b += `<ellipse cx="${x + 6}" cy="${y}" rx="9" ry="5" fill="#fff" stroke="${C.sub}"/>` + T(x + 1, y + 3.5, '−', { fs: 8, b: 1, c: '#2C6BB3' }) + T(x + 11, y + 3.5, '+', { fs: 8, b: 1, c: C.r }); for (let y = 30; y <= 122; y += 14) b += T(x0 + 27, y + 3, '−', { fs: 9, b: 1, c: '#2C6BB3' }) + T(x0 + 93, y + 3, '+', { fs: 9, b: 1, c: C.r }); }
      [36, 60, 84, 108].forEach((y, i) => { if (!withD || i % 2 === 0) b += L(x0 + 8, y, x0 + 112, y, 'v', 'e', { w: 1.4 }); else b += L(x0 + 8, y, x0 + 22, y, 'v', 'e', { w: 1.4 }) + L(x0 + 98, y, x0 + 112, y, 'v', 'e', { w: 1.4 }); });
      return b + T(x0 + 60, 146, withD ? '(b) with a dielectric' : '(a) air (vacuum)', { fs: 11 }); };
    return svg(330, 152, pane(20, false) + pane(190, true), 330); };

  const S = `
${sec('13-1', '13.1 Capacitance', `
${ul([`A <b>capacitor</b> is a device that stores electric charge (and electrical energy).`, `It is made of two conducting plates separated by a small gap of air or a thin insulator called a <b>dielectric</b> (mica, ceramic, paper, plastic, oil).`])}
${fig(F.symbol(), 'Figure 13.1: circuit symbols for a capacitor.')}
${def('Capacitance, <i>C</i>', `the ${red('ratio of the charge on either plate to the potential difference between the plates')}.`)}
${key(`<i>C</i> = ${fr('<i>Q</i>', '<i>V</i>')}`, '<i>Q</i> = charge on one plate (the other has −<i>Q</i>); <i>V</i> = p.d. across the plates. Unit: farad (F) = C V<sup>−1</sup>')}
${ul([`1 F is the capacitance when a charge of 1 C on each plate gives a p.d. of 1 V.`, `The farad is a very large unit: 1 μF = 10<sup>−6</sup> F, 1 nF = 10<sup>−9</sup> F, 1 pF = 10<sup>−12</sup> F.`, `For a given capacitor <i>C</i> is constant, so <i>Q</i> ∝ <i>V</i>.`, `The net charge on a capacitor is zero: it holds +<i>Q</i> on one plate and −<i>Q</i> on the other. "The charge on a capacitor" means <i>Q</i>.`])}
`)}

${sec('13-2', '13.2 Parallel plate capacitors', `
${h4('How a parallel plate capacitor is charged')}
${ul([`When the capacitor is connected to a battery, electrons flow from the negative terminal of the battery to one plate, which becomes negatively charged (−<i>Q</i>).`, `At the same time, electrons are pulled off the other plate towards the positive terminal, leaving it positively charged (+<i>Q</i>). No charge crosses the gap.`, `As charge builds up, the p.d. across the plates rises. The flow of electrons stops when the p.d. across the capacitor equals the e.m.f. of the battery.`])}
${fig(F.plates(), 'Figure 13.2: a charged parallel plate capacitor. The field between the plates is uniform.')}
${h4('Deriving C = ε₀A/d')}
${steps([`Gauss’s law gives the field between the plates: <i>E</i> = ${fr('σ', 'ε<sub>0</sub>')} = ${fr('<i>Q</i>', 'ε<sub>0</sub><i>A</i>')}`, `The field is uniform, so the p.d. is <i>V</i> = <i>Ed</i> = ${fr('<i>Qd</i>', 'ε<sub>0</sub><i>A</i>')}`, `<i>C</i> = ${fr('<i>Q</i>', '<i>V</i>')} = ${fr('<i>Q</i>', '<i>Qd</i>/ε<sub>0</sub><i>A</i>')} &nbsp; ⇒ &nbsp; <i>C</i><sub>0</sub> = ${fr('ε<sub>0</sub><i>A</i>', '<i>d</i>')}`])}
${key(`<i>C</i><sub>0</sub> = ${fr('ε<sub>0</sub><i>A</i>', '<i>d</i>')}`, '<i>A</i> = area of overlap of the plates; <i>d</i> = separation; ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> F m<sup>−1</sup>. The capacitance is proportional to <i>A</i> and inversely proportional to <i>d</i>.')}
${sim('capplate', 'Parallel plate capacitor', 'Change the area, the separation and the dielectric. Compare a capacitor that stays connected to the battery (V fixed) with one that is disconnected first (Q fixed).')}
${example('13.2.1', `(a) Find the capacitance of a capacitor whose plates are 20 cm × 3.0 cm, separated by a 1.0 mm air gap. (b) What is the charge on each plate when it is connected to a 12 V battery? (c) What is the electric field between the plates?`,
  steps([`(a) <i>C</i> = ${fr('ε<sub>0</sub><i>A</i>', '<i>d</i>')} = ${fr('(8.85 × 10<sup>−12</sup>)(0.20 × 0.030)', '1.0 × 10<sup>−3</sup>')} = <b>5.3 × 10<sup>−11</sup> F</b> (53 pF)`, `(b) <i>Q</i> = <i>CV</i> = (5.3 × 10<sup>−11</sup>)(12) = <b>6.4 × 10<sup>−10</sup> C</b>`, `(c) <i>E</i> = ${fr('<i>V</i>', '<i>d</i>')} = ${fr('12', '1.0 × 10<sup>−3</sup>')} = <b>1.2 × 10<sup>4</sup> V m<sup>−1</sup></b>`]))}
${example('13.2.2', `An electric field of 2.80 × 10<sup>5</sup> V m<sup>−1</sup> is needed between two parallel plates, each of area 21.0 cm<sup>2</sup> and 0.250 cm apart in air. Find the charge on each plate.`,
  steps([`<i>Q</i> = <i>CV</i> = ${fr('ε<sub>0</sub><i>A</i>', '<i>d</i>')}(<i>Ed</i>) = ε<sub>0</sub><i>AE</i>`, `<i>Q</i> = (8.85 × 10<sup>−12</sup>)(21.0 × 10<sup>−4</sup>)(2.80 × 10<sup>5</sup>) = <b>5.20 × 10<sup>−9</sup> C</b> (the separation is not needed)`]))}
${exercises('Exercise: parallel plate capacitors', [
  { q: `The plates of a parallel plate capacitor in vacuum are 8.0 mm apart and each has an area of 4.0 cm<sup>2</sup>. The p.d. across the plates is 2.0 kV. Find (a) the capacitance, (b) the charge on each plate, (c) the electric field between the plates.`, a: `(a) 4.4 × 10<sup>−13</sup> F (0.44 pF) &nbsp; (b) 8.9 × 10<sup>−10</sup> C &nbsp; (c) 2.5 × 10<sup>5</sup> V m<sup>−1</sup>` },
  { q: `The separation of the plates of an isolated charged capacitor is doubled. What happens to (a) <i>C</i>, (b) <i>Q</i>, (c) <i>V</i>?`, a: `(a) <i>C</i> halves &nbsp; (b) <i>Q</i> is unchanged (isolated) &nbsp; (c) <i>V</i> = <i>Q</i>/<i>C</i> doubles` }])}
`)}

${sec('13-3', '13.3 Dielectrics', `
${ul([`A <b>dielectric</b> is an insulator: it has no free electrons.`, `When a dielectric fills the space between the plates, the capacitance increases by a factor ε<sub>r</sub>, the <b>dielectric constant</b> (relative permittivity) of the material.`])}
${def('Dielectric constant, ε<sub>r</sub>', `the ${red('ratio of the capacitance of a capacitor with the dielectric between the plates to its capacitance with a vacuum between the plates')}.`)}
${key(`ε<sub>r</sub> = ${fr('<i>C</i>', '<i>C</i><sub>0</sub>')} &nbsp;&nbsp;&nbsp; <i>C</i> = ${fr('ε<i>A</i>', '<i>d</i>')} = ${fr('ε<sub>r</sub>ε<sub>0</sub><i>A</i>', '<i>d</i>')}`, 'ε = ε<sub>r</sub>ε<sub>0</sub> is the permittivity of the dielectric; ε<sub>r</sub> has no unit and is always greater than 1')}
${h4('Why a dielectric increases the capacitance')}
${fig(F.diel(), 'Figure 13.3: the molecules of the dielectric are polarised; induced surface charges appear on its faces.')}
${steps([`The electric field between the plates <b>polarises</b> the molecules of the dielectric. In a <b>polar</b> dielectric (e.g. water) the permanent dipoles line up with the field; in a <b>non-polar</b> dielectric the field pulls the centres of positive and negative charge slightly apart, making induced dipoles.`, `The negative ends face the positive plate and the positive ends face the negative plate, so <b>induced surface charges</b> appear: negative on the face next to the + plate, positive on the face next to the − plate.`, `These surface charges produce a field opposite to the field of the plates, so the resultant field in the dielectric is smaller: <i>E</i> = <i>E</i><sub>0</sub>/ε<sub>r</sub>.`, `For the same charge <i>Q</i>, the p.d. <i>V</i> = <i>Ed</i> is smaller, so <i>C</i> = <i>Q</i>/<i>V</i> is larger.`])}
${key(`ε<sub>r</sub> = ${fr('<i>C</i>', '<i>C</i><sub>0</sub>')} = ${fr('<i>V</i><sub>0</sub>', '<i>V</i>')} = ${fr('<i>E</i><sub>0</sub>', '<i>E</i>')} &nbsp; (same charge <i>Q</i>)`, '')}
${table(['Quantity', 'Isolated capacitor (Q fixed), dielectric inserted', 'Capacitor kept connected to the battery (V fixed)'], [
  ['Capacitance', '<i>C</i> = ε<sub>r</sub><i>C</i><sub>0</sub> (increases)', '<i>C</i> = ε<sub>r</sub><i>C</i><sub>0</sub> (increases)'],
  ['Charge', 'unchanged', '<i>Q</i> = ε<sub>r</sub><i>Q</i><sub>0</sub> (the battery supplies more)'],
  ['p.d.', '<i>V</i> = <i>V</i><sub>0</sub>/ε<sub>r</sub> (decreases)', 'unchanged'],
  ['Field', '<i>E</i> = <i>E</i><sub>0</sub>/ε<sub>r</sub> (decreases)', 'unchanged (<i>E</i> = <i>V</i>/<i>d</i>)'],
  ['Energy stored', '<i>U</i> = <i>Q</i><sup>2</sup>/2<i>C</i>: decreases', '<i>U</i> = ½<i>CV</i><sup>2</sup>: increases']])}
${table(['Material', 'Dielectric constant ε<sub>r</sub>', 'Dielectric strength / 10<sup>6</sup> V m<sup>−1</sup>'], [['Air', '1.0006', '3'], ['Teflon', '2.1', '60'], ['Silicone oil', '2.5', '15'], ['Mylar', '3.2', '7'], ['Paper', '3.7', '16'], ['Water', '80', '—']])}
${note(`The <b>dielectric strength</b> is the largest electric field a material can stand before it breaks down and conducts. A dielectric also lets the plates be very close together without touching.`)}
${example('13.3.1', `A parallel plate capacitor has plates of area 2.0 × 10<sup>−2</sup> m<sup>2</sup>, 1.0 cm apart in air. It is charged to 3000 V and the battery is disconnected. A dielectric sheet is then slid in to fill the gap, and the p.d. falls to 1000 V. Find (a) the capacitance in air, (b) the charge on each plate, (c) the capacitance with the dielectric, (d) the dielectric constant, (e) the permittivity of the dielectric, (f) the field before, (g) the field after the dielectric is inserted.`,
  steps([`(a) <i>C</i><sub>0</sub> = ${fr('(8.85 × 10<sup>−12</sup>)(2.0 × 10<sup>−2</sup>)', '0.010')} = <b>1.77 × 10<sup>−11</sup> F</b>`, `(b) <i>Q</i><sub>0</sub> = <i>C</i><sub>0</sub><i>V</i><sub>0</sub> = (1.77 × 10<sup>−11</sup>)(3000) = <b>5.31 × 10<sup>−8</sup> C</b>`, `(c) the charge stays the same: <i>C</i> = <i>Q</i><sub>0</sub>/<i>V</i> = 5.31 × 10<sup>−8</sup>/1000 = <b>5.31 × 10<sup>−11</sup> F</b>`, `(d) ε<sub>r</sub> = <i>C</i>/<i>C</i><sub>0</sub> = <b>3.0</b>`, `(e) ε = ε<sub>r</sub>ε<sub>0</sub> = <b>2.66 × 10<sup>−11</sup> F m<sup>−1</sup></b>`, `(f) <i>E</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>d</i> = 3000/0.010 = <b>3.0 × 10<sup>5</sup> V m<sup>−1</sup></b>`, `(g) <i>E</i> = <i>E</i><sub>0</sub>/ε<sub>r</sub> = <b>1.0 × 10<sup>5</sup> V m<sup>−1</sup></b>`]))}
${tip(`First ask: is the capacitor still connected to the battery? If yes, <i>V</i> stays the same. If it was disconnected first, <i>Q</i> stays the same. Everything else follows from <i>C</i> = <i>Q</i>/<i>V</i>.`)}
${h4('A natural capacitor: the thundercloud and the ground')}
<p>The base of a thundercloud and the ground below it behave like the two plates of a huge parallel plate capacitor, with the <b>air between them as the dielectric</b>.</p>
${steps([`Inside the cloud, collisions between ice crystals and soft hail separate charge. The base of the cloud usually becomes <b>negative</b>.`, `This negative charge repels electrons in the ground below, so the ground surface becomes <b>positive</b> (charging by induction): the two "plates" carry +<i>Q</i> and −<i>Q</i>.`, `As more charge builds up, the electric field in the air between them grows: <i>E</i> = <i>V</i>/<i>d</i> = <i>Q</i>/(ε<sub>0</sub><i>A</i>).`, `When <i>E</i> reaches the <b>dielectric strength of air</b> (about 3 × 10<sup>6</sup> V m<sup>−1</sup>), the air is ionised and becomes a conductor. The dielectric breaks down and the capacitor discharges through it: this is <b>lightning</b>.`, `The huge current heats the air channel to about 30 000 K. The air expands suddenly, and we hear this as <b>thunder</b>. We see the flash almost at once (light travels at 3 × 10<sup>8</sup> m s<sup>−1</sup>) but hear the thunder later (sound travels at about 340 m s<sup>−1</sup>): distance ≈ 340 × delay, roughly 1 km for every 3 s.`])}
${sim('lightning', 'Thundercloud and ground: a natural capacitor', 'Let the storm charge the cloud. Watch the charges on the cloud base and the ground, and the field in the air between them. When the field reaches the dielectric strength of air, the air breaks down and the capacitor discharges as lightning. Try a higher cloud: does it flash at a different charge? Turn on the thunder sound and count the seconds between the flash and the thunder. Use slow motion to see the stepped leader come down before the bright return stroke.')}
${example('13.3.2', `The base of a thundercloud is 1.0 km above flat ground and has an area of 1.0 km<sup>2</sup>. Treat the cloud and the ground as a parallel plate capacitor with air between them (dielectric strength 3.0 × 10<sup>6</sup> V m<sup>−1</sup>). Find (a) the capacitance, (b) the largest charge the cloud can hold before the air breaks down, (c) the p.d. between the cloud and the ground at that moment, (d) the energy released if the whole charge is discharged.`,
  steps([`(a) <i>C</i> = ${fr('ε<sub>0</sub><i>A</i>', '<i>d</i>')} = ${fr('(8.85 × 10<sup>−12</sup>)(1.0 × 10<sup>6</sup>)', '1.0 × 10<sup>3</sup>')} = <b>8.9 × 10<sup>−9</sup> F</b> (8.9 nF)`, `(b) <i>E</i> = ${fr('<i>Q</i>', 'ε<sub>0</sub><i>A</i>')} ⇒ <i>Q</i> = ε<sub>0</sub><i>AE</i> = (8.85 × 10<sup>−12</sup>)(1.0 × 10<sup>6</sup>)(3.0 × 10<sup>6</sup>) = <b>27 C</b>`, `(c) <i>V</i> = <i>Ed</i> = (3.0 × 10<sup>6</sup>)(1.0 × 10<sup>3</sup>) = <b>3.0 × 10<sup>9</sup> V</b>`, `(d) <i>U</i> = ½<i>QV</i> = ½(26.6)(3.0 × 10<sup>9</sup>) = <b>4.0 × 10<sup>10</sup> J</b>`]))}
${note(`This is an idealised model. In a real storm the flash starts at a lower average field, because the field is much stronger near sharp points, raindrops and ice, and the charge is spread through the cloud. Still, the answers are the right size: a real flash carries tens of coulombs.`)}
`)}

${sec('13-4', '13.4 Capacitors in series and in parallel', `
${h4('Series')}
${fig(F.series(), 'Figure 13.4: three capacitors in series.')}
${steps([`Electrons from the battery charge the end plate −<i>Q</i>. This repels electrons from the facing plate, which becomes +<i>Q</i>, and so on along the chain: <b>every capacitor carries the same charge <i>Q</i></b>.`, `The p.d.s add up: <i>V</i> = <i>V</i><sub>1</sub> + <i>V</i><sub>2</sub> + <i>V</i><sub>3</sub> = ${fr('<i>Q</i>', '<i>C</i><sub>1</sub>')} + ${fr('<i>Q</i>', '<i>C</i><sub>2</sub>')} + ${fr('<i>Q</i>', '<i>C</i><sub>3</sub>')}`, `Divide by <i>Q</i>, with <i>C</i><sub>eq</sub> = <i>Q</i>/<i>V</i>: ${fr('1', '<i>C</i><sub>eq</sub>')} = ${fr('1', '<i>C</i><sub>1</sub>')} + ${fr('1', '<i>C</i><sub>2</sub>')} + ${fr('1', '<i>C</i><sub>3</sub>')}`])}
${h4('Parallel')}
${fig(F.parallel(), 'Figure 13.5: three capacitors in parallel.')}
${steps([`Each capacitor is connected across the same two points: <b>every capacitor has the same p.d. <i>V</i></b>.`, `The charges add up: <i>Q</i> = <i>Q</i><sub>1</sub> + <i>Q</i><sub>2</sub> + <i>Q</i><sub>3</sub> = <i>C</i><sub>1</sub><i>V</i> + <i>C</i><sub>2</sub><i>V</i> + <i>C</i><sub>3</sub><i>V</i>`, `Divide by <i>V</i>: <i>C</i><sub>eq</sub> = <i>C</i><sub>1</sub> + <i>C</i><sub>2</sub> + <i>C</i><sub>3</sub>`])}
${two(key(`${fr('1', '<i>C</i><sub>eq</sub>')} = ${fr('1', '<i>C</i><sub>1</sub>')} + ${fr('1', '<i>C</i><sub>2</sub>')} + … `, 'series: same <i>Q</i>; <i>C</i><sub>eq</sub> is smaller than the smallest'), key(`<i>C</i><sub>eq</sub> = <i>C</i><sub>1</sub> + <i>C</i><sub>2</sub> + …`, 'parallel: same <i>V</i>; <i>C</i><sub>eq</sub> is larger than the largest'))}
${tip(`Two in series: <i>C</i><sub>eq</sub> = ${fr('<i>C</i><sub>1</sub><i>C</i><sub>2</sub>', '<i>C</i><sub>1</sub> + <i>C</i><sub>2</sub>')} ("product over sum"). Capacitors combine the opposite way to resistors.`)}
${sim('capcomb', 'Capacitors in series and parallel', 'Pick an arrangement and change the capacitances and the supply voltage. Check which quantity is shared (Q in series, V in parallel) and how the charge and p.d. split.')}
${example('13.4.1', `A 1 μF and a 2 μF capacitor are connected in parallel to a 50 V supply. Find (a) the charge on each capacitor, (b) the equivalent capacitance.`,
  steps([`(a) <i>Q</i><sub>1</sub> = <i>C</i><sub>1</sub><i>V</i> = (1 μF)(50) = <b>50 μC</b>; &nbsp; <i>Q</i><sub>2</sub> = (2 μF)(50) = <b>100 μC</b>`, `(b) <i>C</i><sub>eq</sub> = 1 + 2 = <b>3 μF</b>`]), fig(F.e3()))}
${example('13.4.2', `The same capacitors are connected in series to the 50 V supply. Find (a) the equivalent capacitance, (b) the charge on each capacitor, (c) the p.d. across each.`,
  steps([`(a) ${fr('1', '<i>C</i><sub>eq</sub>')} = ${fr('1', '1')} + ${fr('1', '2')} ⇒ <i>C</i><sub>eq</sub> = <b>0.667 μF</b>`, `(b) <i>Q</i> = <i>C</i><sub>eq</sub><i>V</i> = (0.667 μF)(50) = <b>33.3 μC</b> on each capacitor`, `(c) <i>V</i><sub>1</sub> = <i>Q</i>/<i>C</i><sub>1</sub> = 33.3/1 = <b>33.3 V</b>; &nbsp; <i>V</i><sub>2</sub> = 33.3/2 = <b>16.7 V</b> (check: 33.3 + 16.7 = 50 V)`]), fig(F.e4()))}
${example('13.4.3', `Find (a) the equivalent capacitance, (b) the charge on each capacitor, (c) the p.d. across each capacitor.`,
  steps([`(a) <i>C</i><sub>23</sub> = 4.0 + 8.0 = 12.0 μF; &nbsp; ${fr('1', '<i>C</i><sub>eq</sub>')} = ${fr('1', '6.0')} + ${fr('1', '12.0')} ⇒ <i>C</i><sub>eq</sub> = <b>4.0 μF</b>`, `(b) <i>Q</i><sub>1</sub> = <i>Q</i><sub>total</sub> = (4.0 μF)(12) = <b>48 μC</b>`, `(c) <i>V</i><sub>1</sub> = 48/6.0 = <b>8.0 V</b>; &nbsp; <i>V</i><sub>2</sub> = <i>V</i><sub>3</sub> = 12 − 8.0 = <b>4.0 V</b>`, `(b) <i>Q</i><sub>2</sub> = (4.0 μF)(4.0) = <b>16 μC</b>; &nbsp; <i>Q</i><sub>3</sub> = (8.0 μF)(4.0) = <b>32 μC</b> (check: 16 + 32 = 48 μC)`]), fig(F.e5()))}
${example('13.4.4', `Find the equivalent capacitance between a and b. <i>C</i><sub>1</sub> = 5.00 μF, <i>C</i><sub>2</sub> = 10.0 μF, <i>C</i><sub>3</sub> = 2.00 μF.`,
  steps([`Each side branch: <i>C</i><sub>1</sub> and <i>C</i><sub>2</sub> in series: <i>C</i><sub>12</sub> = ${fr('(5.00)(10.0)', '15.0')} = 3.33 μF`, `Upper group in parallel: <i>C</i><sub>a</sub> = 3.33 + 2.00 + 3.33 = 8.67 μF`, `Lower pair in parallel: <i>C</i><sub>22</sub> = 10.0 + 10.0 = 20.0 μF`, `In series: ${fr('1', '<i>C</i><sub>eq</sub>')} = ${fr('1', '8.67')} + ${fr('1', '20.0')} ⇒ <i>C</i><sub>eq</sub> = <b>6.05 μF</b>`]), fig(F.e6()))}
${example('13.4.5', `All the capacitors are identical, each 1 μF. Find the equivalent capacitance between X and Y.`,
  steps([`The three capacitors on the left (top-left, left side, bottom-left) are in series: <i>C</i><sub>a</sub> = 1/3 = 0.33 μF`, `<i>C</i><sub>a</sub> is in series with the top-right and bottom-right capacitors: ${fr('1', '<i>C</i><sub>b</sub>')} = 1 + 1 + 3 ⇒ <i>C</i><sub>b</sub> = 0.20 μF`, `<i>C</i><sub>b</sub> is in parallel with the capacitor across XY: <i>C</i><sub>eq</sub> = 0.20 + 1 = <b>1.20 μF</b>`]), fig(F.e7()))}
${exercises('Exercise: combinations', [
  { q: `<i>C</i><sub>1</sub> = 2.00 μF, <i>C</i><sub>2</sub> = 4.00 μF and <i>C</i><sub>3</sub> = 9.00 μF; <i>V</i><sub>ab</sub> = 61.5 V. Find (a) the charge on each capacitor, (b) the p.d. across each, (c) the p.d. between a and d.`, f: fig(F.x1()), a: `(a) <i>Q</i><sub>1</sub> = 73.8 μC, <i>Q</i><sub>2</sub> = 148 μC, <i>Q</i><sub>3</sub> = 221 μC &nbsp; (b) <i>V</i><sub>1</sub> = <i>V</i><sub>2</sub> = 36.9 V, <i>V</i><sub>3</sub> = 24.6 V &nbsp; (c) <i>V</i><sub>ad</sub> = 36.9 V` },
  { q: `Find (a) the equivalent capacitance between a and b, (b) the charge on each capacitor if <i>V</i><sub>ab</sub> = 15.0 V.`, f: fig(F.x2()), a: `(a) 5.96 μF &nbsp; (b) 89.5 μC on 20 μF, 63.2 μC on 6 μF, 26.3 μC on both 15 μF and 3 μF` },
  { q: `A 3.00 μF and a 4.00 μF capacitor in series are connected in parallel with a 2.00 μF capacitor, across 26.0 V. Find (a) the equivalent capacitance, (b) the p.d. across each capacitor.`, f: fig(F.x3()), a: `(a) 3.71 μF &nbsp; (b) 2.00 μF: 26.0 V; 3.00 μF: 14.9 V; 4.00 μF: 11.1 V` }])}
`)}

${sec('13-5', '13.5 Energy stored in a charged capacitor', `
${ul([`Work must be done to charge a capacitor: once some charge is on the plates, adding more charge of the same sign needs work against the repulsion. This work is stored as electric potential energy in the field between the plates.`, `On a <i>V</i>–<i>Q</i> graph (a straight line, since <i>V</i> = <i>Q</i>/<i>C</i>), the energy stored is the <b>area under the graph</b>.`])}
${fig(F.VQ(), 'Figure 13.6: the energy stored is the area of the triangle under the V–Q graph.')}
${key(`<i>U</i> = ${fr('1', '2')}<i>QV</i> = ${fr('1', '2')}${fr('<i>Q</i><sup>2</sup>', '<i>C</i>')} = ${fr('1', '2')}<i>CV</i><sup>2</sup>`, 'unit: joule. Derivations are not required by the syllabus.')}
${note(`For understanding: moving a small charge d<i>q</i> through the p.d. <i>V</i> = <i>q</i>/<i>C</i> needs d<i>W</i> = <i>V</i> d<i>q</i>, so <i>W</i> = ∫<sub>0</sub><sup><i>Q</i></sup> (<i>q</i>/<i>C</i>) d<i>q</i> = <i>Q</i><sup>2</sup>/2<i>C</i>.`)}
${tip(`A battery that charges a capacitor supplies energy <i>QV</i>, but the capacitor stores only ½<i>QV</i>. The other half is changed into heat in the resistance of the circuit (and some electromagnetic radiation), whatever the value of the resistance.`)}
${example('13.5.1', `A camera flash unit stores energy in a 150 μF capacitor at 200 V. How much energy is stored?`,
  steps([`<i>U</i> = ½<i>CV</i><sup>2</sup> = ½(150 × 10<sup>−6</sup>)(200)<sup>2</sup> = <b>3.0 J</b>`]))}
${example('13.5.2', `A 2 μF capacitor is charged to 200 V by a battery. Find (a) the charge delivered by the battery, (b) the energy supplied by the battery, (c) the energy stored in the capacitor.`,
  steps([`(a) <i>Q</i> = <i>CV</i> = (2 × 10<sup>−6</sup>)(200) = <b>4.0 × 10<sup>−4</sup> C</b>`, `(b) <i>E</i> = <i>QV</i> = (4.0 × 10<sup>−4</sup>)(200) = <b>0.080 J</b>`, `(c) <i>U</i> = ½<i>QV</i> = <b>0.040 J</b>: half of the energy supplied`]))}
${example('13.5.3', `<i>C</i><sub>1</sub> = 6.00 μF is charged by closing S<sub>1</sub> (<i>V</i> = 20.0 V). S<sub>1</sub> is then opened and S<sub>2</sub> closed, connecting <i>C</i><sub>1</sub> to the uncharged <i>C</i><sub>2</sub> = 3.00 μF. Find (a) the initial charge on <i>C</i><sub>1</sub>, (b) the final p.d., (c) the final charge on each capacitor, (d) the energy lost.`,
  steps([`(a) <i>Q</i><sub>1</sub> = <i>C</i><sub>1</sub><i>V</i> = (6.00 μF)(20.0) = <b>120 μC</b>`, `(b) After S<sub>2</sub> is closed the capacitors are in parallel and share the charge until their p.d.s are equal. Charge is conserved: <i>V</i>′ = ${fr('<i>Q</i><sub>total</sub>', '<i>C</i><sub>1</sub> + <i>C</i><sub>2</sub>')} = ${fr('120', '9.00')} = <b>13.3 V</b>`, `(c) <i>Q</i><sub>1</sub>′ = (6.00)(13.33) = <b>80.0 μC</b>; &nbsp; <i>Q</i><sub>2</sub>′ = (3.00)(13.33) = <b>40.0 μC</b>`, `(d) before: ½(120 × 10<sup>−6</sup>)(20.0) = 1.20 × 10<sup>−3</sup> J; after: ½(120 × 10<sup>−6</sup>)(13.33) = 0.80 × 10<sup>−3</sup> J; lost = <b>4.0 × 10<sup>−4</sup> J</b> (as heat in the connecting wires)`]), fig(F.e10()))}
${exercises('Exercise: energy', [
  { q: `<i>C</i><sub>1</sub> = 3.00 μF and <i>C</i><sub>2</sub> = 6.00 μF are connected in series to a 4.00 V battery. Find (a) the equivalent capacitance, (b) the charge on each capacitor, (c) the p.d. across each, (d) the energy stored in each, (e) the area of each plate of <i>C</i><sub>1</sub> if its plates are 0.010 mm apart in vacuum.`, a: `(a) 2.00 μF &nbsp; (b) 8.00 μC &nbsp; (c) <i>V</i><sub>1</sub> = 2.67 V, <i>V</i><sub>2</sub> = 1.33 V &nbsp; (d) <i>U</i><sub>1</sub> = 1.07 × 10<sup>−5</sup> J, <i>U</i><sub>2</sub> = 5.33 × 10<sup>−6</sup> J &nbsp; (e) 3.39 m<sup>2</sup>` }])}
`)}

${sec('13-6', '13.6 Charging and discharging through a resistor', `
${h4('Charging')}
${fig(F.charge(false), 'Figure 13.7: charging a capacitor through a resistor.')}
${ul([`When S is closed, electrons flow from the negative terminal of the battery, through R, onto plate B. Electrons leave plate A for the positive terminal, so A becomes positive.`, `At the start the capacitor is uncharged, so the whole e.m.f. is across R: the current is largest, <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i>.`, `As charge builds up, the p.d. across C rises, so the p.d. across R (and the current) falls.`, `Charging stops when the p.d. across C equals <i>V</i><sub>0</sub>: then <i>I</i> = 0 and the charge is maximum, <i>Q</i><sub>0</sub> = <i>CV</i><sub>0</sub>.`])}
${h4('Derivation (charging)')}
${steps([`Kirchhoff’s loop rule at any time: <i>V</i><sub>0</sub> = <i>IR</i> + ${fr('<i>Q</i>', '<i>C</i>')}, with <i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')}`, `Rearrange: ${fr('d<i>Q</i>', 'd<i>t</i>')} = ${fr('<i>CV</i><sub>0</sub> − <i>Q</i>', '<i>RC</i>')} = ${fr('<i>Q</i><sub>0</sub> − <i>Q</i>', '<i>RC</i>')} &nbsp; ⇒ &nbsp; ∫<sub>0</sub><sup><i>Q</i></sup> ${fr('d<i>Q</i>', '<i>Q</i><sub>0</sub> − <i>Q</i>')} = ∫<sub>0</sub><sup><i>t</i></sup> ${fr('d<i>t</i>', '<i>RC</i>')}`, `−ln ${fr('<i>Q</i><sub>0</sub> − <i>Q</i>', '<i>Q</i><sub>0</sub>')} = ${fr('<i>t</i>', '<i>RC</i>')} &nbsp; ⇒ &nbsp; <i>Q</i> = <i>Q</i><sub>0</sub>(1 − <i>e</i><sup>−<i>t</i>/<i>RC</i></sup>)`, `Divide by <i>C</i>: <i>V</i> = <i>V</i><sub>0</sub>(1 − <i>e</i><sup>−<i>t</i>/<i>RC</i></sup>). Differentiate: <i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')} = ${fr('<i>Q</i><sub>0</sub>', '<i>RC</i>')}<i>e</i><sup>−<i>t</i>/<i>RC</i></sup> = <i>I</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup>`])}
${key(`<i>Q</i> = <i>Q</i><sub>0</sub>(1 − <i>e</i><sup>−<i>t</i>/<i>RC</i></sup>) &nbsp;&nbsp; <i>V</i> = <i>V</i><sub>0</sub>(1 − <i>e</i><sup>−<i>t</i>/<i>RC</i></sup>) &nbsp;&nbsp; <i>I</i> = <i>I</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup>`, 'charging: <i>Q</i><sub>0</sub> = <i>CV</i><sub>0</sub>, <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i>')}
${fig(F.graphs(false), 'Figure 13.8: charging. Q and V rise to their maximum; the current falls exponentially.')}
${h4('Discharging')}
${fig(F.charge(true), 'Figure 13.9: discharging a charged capacitor through a resistor.')}
${ul([`When S is closed, electrons flow from plate B through R to plate A and neutralise its positive charge.`, `At the start the p.d. is <i>V</i><sub>0</sub>, so the current is largest, <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i>.`, `As the charge falls, the p.d. falls, so the current falls. Discharging ends when <i>Q</i> = 0, <i>V</i> = 0 and <i>I</i> = 0.`, `The current flows in the opposite direction to the charging current.`])}
${h4('Derivation (discharging)')}
${steps([`Loop rule with no battery: 0 = <i>IR</i> + ${fr('<i>Q</i>', '<i>C</i>')}, with <i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')} (the charge decreases)`, `${fr('d<i>Q</i>', '<i>Q</i>')} = −${fr('d<i>t</i>', '<i>RC</i>')} &nbsp; ⇒ &nbsp; ln ${fr('<i>Q</i>', '<i>Q</i><sub>0</sub>')} = −${fr('<i>t</i>', '<i>RC</i>')} &nbsp; ⇒ &nbsp; <i>Q</i> = <i>Q</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup>`, `<i>V</i> = <i>Q</i>/<i>C</i> = <i>V</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup>; &nbsp; <i>I</i> = ${fr('d<i>Q</i>', 'd<i>t</i>')} = −<i>I</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup> (minus: opposite direction; use the size in calculations)`])}
${key(`<i>Q</i> = <i>Q</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup> &nbsp;&nbsp; <i>V</i> = <i>V</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup> &nbsp;&nbsp; <i>I</i> = <i>I</i><sub>0</sub><i>e</i><sup>−<i>t</i>/<i>RC</i></sup>`, 'discharging')}
${fig(F.graphs(true), 'Figure 13.10: discharging. Q, V and I all fall exponentially.')}
${h4('Time constant')}
${def('Time constant, τ', `of an <i>RC</i> circuit: the ${red('time for the charge (or current) to fall to 1/e (37%) of its initial value')} during discharging. During charging, it is the time for the charge to rise to (1 − 1/e), 63% of its final value.`)}
${key(`τ = <i>RC</i>`, 'unit: second (Ω × F = s). A large τ means slow charging and discharging.')}
${ul([`At <i>t</i> = τ: <i>e</i><sup>−1</sup> = 0.37, so discharging gives <i>Q</i> = 0.37<i>Q</i><sub>0</sub>; charging gives <i>Q</i> = 0.63<i>Q</i><sub>0</sub> and <i>I</i> = 0.37<i>I</i><sub>0</sub>.`, `After about 5τ the capacitor is practically fully charged (99.3%) or fully discharged.`, `Half-life: the time for <i>Q</i> to halve is <i>t</i><sub>½</sub> = <i>RC</i> ln 2 = 0.693<i>RC</i>.`])}
${sim('rc', 'Charging and discharging through a resistor', 'Choose charging or discharging, then change R and C. Watch how the time constant τ = RC sets how fast the curves rise and fall. The dashed line marks t = τ.')}
${tip(`To find a time, take natural logs: e.g. discharging, ${fr('<i>Q</i>', '<i>Q</i><sub>0</sub>')} = <i>e</i><sup>−<i>t</i>/<i>RC</i></sup> ⇒ <i>t</i> = −<i>RC</i> ln ${fr('<i>Q</i>', '<i>Q</i><sub>0</sub>')} = <i>RC</i> ln ${fr('<i>Q</i><sub>0</sub>', '<i>Q</i>')}.`)}
${example('13.6.1', `A capacitor is fully charged by a 20.0 V battery, then at <i>t</i> = 0 the switch is moved from a to b. <i>C</i> = 1.02 μF and the current falls to half its initial value in 40 μs. Find (a) <i>R</i>, (b) the time constant, (c) the charge at <i>t</i> = 0, (d) the charge at <i>t</i> = 60 μs.`,
  steps([`(a) 0.50 = <i>e</i><sup>−40 × 10<sup>−6</sup>/<i>RC</i></sup> ⇒ <i>RC</i> = ${fr('40 × 10<sup>−6</sup>', 'ln 2')} = 5.77 × 10<sup>−5</sup> s ⇒ <i>R</i> = ${fr('5.77 × 10<sup>−5</sup>', '1.02 × 10<sup>−6</sup>')} = <b>57 Ω</b>`, `(b) τ = <i>RC</i> = <b>5.8 × 10<sup>−5</sup> s</b>`, `(c) <i>Q</i><sub>0</sub> = <i>CV</i><sub>0</sub> = (1.02 × 10<sup>−6</sup>)(20.0) = <b>2.04 × 10<sup>−5</sup> C</b>`, `(d) <i>Q</i> = (2.04 × 10<sup>−5</sup>)<i>e</i><sup>−60/57.7</sup> = <b>7.2 × 10<sup>−6</sup> C</b>`]), fig(F.e11()))}
${example('13.6.2', `A 470 μF capacitor is charged through a 100 kΩ resistor from a 9.0 V supply. Find (a) the time constant, (b) the initial current, (c) the p.d. across the capacitor after 30 s, (d) the time for the capacitor to reach 90% of its final charge.`,
  steps([`(a) τ = <i>RC</i> = (100 × 10<sup>3</sup>)(470 × 10<sup>−6</sup>) = <b>47 s</b>`, `(b) <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i> = 9.0/100 × 10<sup>3</sup> = <b>9.0 × 10<sup>−5</sup> A</b>`, `(c) <i>V</i> = 9.0(1 − <i>e</i><sup>−30/47</sup>) = 9.0(1 − 0.528) = <b>4.2 V</b>`, `(d) 0.90 = 1 − <i>e</i><sup>−<i>t</i>/47</sup> ⇒ <i>t</i> = 47 ln 10 = <b>108 s</b> (2.3τ)`]))}
${exercises('Exercise: RC circuits', [
  { q: `A 1000 μF capacitor charged to 12 V is discharged through a 10 kΩ resistor. Find (a) the time constant, (b) the initial current, (c) the p.d. after 5.0 s, (d) the time for the charge to halve.`, a: `(a) 10 s &nbsp; (b) 1.2 mA &nbsp; (c) 12<i>e</i><sup>−0.5</sup> = 7.3 V &nbsp; (d) 10 ln 2 = 6.9 s` },
  { q: `Sketch, on the same axes, the current–time graphs for charging the same capacitor through (a) a resistor <i>R</i>, (b) a resistor 2<i>R</i>, from the same supply.`, a: `(a) starts at <i>I</i><sub>0</sub> = <i>V</i><sub>0</sub>/<i>R</i> and falls with τ = <i>RC</i>. (b) starts at half the value, <i>I</i><sub>0</sub>/2, and falls more slowly (τ = 2<i>RC</i>). The areas under both graphs are equal (the same final charge <i>Q</i><sub>0</sub> = <i>CV</i><sub>0</sub>).` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-13', { html: () => S });

  // ===================== simulations =====================
  const EX = v => { if (!v) return '0'; const s = v.toExponential(2), m = s.match(/^(-?)([\d.]+)e([+-])(\d+)$/), sup = d => d.split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''); return (m[1] ? '−' : '') + (m[4] === '0' ? m[2] : m[2] + ' × 10' + (m[3] === '-' ? '⁻' : '') + sup(m[4])); };
  const E0 = 8.85e-12;
  // ---------- 1. parallel plate capacitor ----------
  window.PhysiQSims.add('capplate', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { A: 200, d: 4, er: 1, mode: 'bat', V0: 12, Q: null };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const modes = [['bat', 'stays connected to 12 V'], ['iso', 'charged, then disconnected']];
    const chips = modes.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.mode ? ' on' : ''), () => { S.mode = k; chips.forEach(x => x.classList.toggle('on', x === b)); S.Q = cap() * S.V0; draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const cap = () => S.er * E0 * S.A * 1e-4 / (S.d * 1e-3);
    slider(ctl, 'area of each plate <i>A</i>', 50, 400, 10, S.A, 'cm²', v => { if (S.mode === 'bat') S.A = v; else S.A = v; draw(); });
    slider(ctl, 'separation <i>d</i>', 1, 10, 0.5, S.d, 'mm', v => { S.d = v; draw(); });
    slider(ctl, 'dielectric constant ε<sub>r</sub>', 1, 8, 0.5, S.er, '', v => { S.er = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    S.Q = cap() * S.V0;
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 230, 330); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const C1 = cap(), Q = S.mode === 'bat' ? C1 * S.V0 : S.Q, V = Q / C1, E = V / (S.d * 1e-3), U = 0.5 * Q * V;
      const ph = Math.min(h - 90, 40 + Math.sqrt(S.A) * 10), cy = 30 + ph / 2, gap = 20 + S.d * 16, cx = w * 0.36, xl = cx - gap / 2, xr = cx + gap / 2;
      if (S.er > 1) { ctx.fillStyle = 'rgba(110,140,34,' + Math.min(0.45, 0.08 + S.er * 0.05) + ')'; ctx.fillRect(xl + 2, cy - ph / 2 + 2, gap - 4, ph - 4); text(ctx, 'dielectric', xr + 30, cy, { a: 'center', fs: 11, c: COL.gr, b: 1 }); }
      ctx.fillStyle = '#F9D9C8'; ctx.fillRect(xl - 8, cy - ph / 2, 8, ph); ctx.fillStyle = '#D9E7F7'; ctx.fillRect(xr, cy - ph / 2, 8, ph);
      const n = Math.max(2, Math.min(18, Math.round(Q / 0.5e-10)));
      for (let i = 0; i < n; i++) { const y = cy - ph / 2 + ph * (i + 0.5) / n; text(ctx, '+', xl - 16, y + 4, { a: 'center', b: 1, fs: 11, c: COL.r }); text(ctx, '−', xr + 16, y + 4, { a: 'center', b: 1, fs: 11, c: '#2C6BB3' }); }
      const nl = Math.max(1, Math.min(14, Math.round(E / 400))); ctx.strokeStyle = COL.v; ctx.lineWidth = 1.2;
      for (let i = 0; i < nl; i++) { const y = cy - ph / 2 + ph * (i + 0.5) / nl; ctx.beginPath(); ctx.moveTo(xl + 1, y); ctx.lineTo(xr - 1, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + 4, y); ctx.lineTo(cx - 2, y - 3); ctx.lineTo(cx - 2, y + 3); ctx.fillStyle = COL.v; ctx.fill(); }
      if (S.mode === 'bat') { ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(xl - 4, cy + ph / 2); ctx.lineTo(xl - 4, h - 14); ctx.lineTo(xr + 4, h - 14); ctx.lineTo(xr + 4, cy + ph / 2); ctx.stroke(); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(cx - 6, h - 26, 12, 24); ctx.fillStyle = COL.ink; ctx.fillRect(cx - 5, h - 26, 2, 24); ctx.fillRect(cx + 2, h - 21, 4, 14); text(ctx, '12 V', cx + 12, h - 22, { fs: 11, b: 1 }); }
      else text(ctx, 'isolated: the charge cannot change', cx, h - 10, { a: 'center', fs: 11, c: COL.sub });
      text(ctx, 'd = ' + fmt(S.d, 1) + ' mm', cx, cy - ph / 2 - 8, { a: 'center', fs: 11, c: COL.sub });
      const gx = w * 0.66; text(ctx, S.mode === 'bat' ? 'V fixed' : 'Q fixed', gx, 24, { b: 1, fs: 13, c: COL.o });
      ro([['capacitance C', EX(C1) + ' F', 'hl'], ['charge Q', EX(Q) + ' C', S.mode === 'bat' ? 'hl' : ''], ['p.d. V', fmt(V, 2) + ' V', S.mode === 'iso' ? 'hl' : ''], ['field E = V/d', EX(E) + ' V m⁻¹'], ['energy U = ½QV', EX(U) + ' J']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. capacitors in series and parallel ----------
  window.PhysiQSims.add('capcomb', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { k: 'ser', c: [2, 4, 6], V: 12 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ks = [['ser', 'series'], ['par', 'parallel'], ['mix', 'C₁ in series with (C₂ ∥ C₃)']];
    const chips = ks.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.k ? ' on' : ''), () => { S.k = k; chips.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    [0, 1, 2].forEach(i => slider(ctl, 'C<sub>' + (i + 1) + '</sub>', 1, 10, 1, S.c[i], 'μF', v => { S.c[i] = v; draw(); }));
    slider(ctl, 'supply <i>V</i>', 2, 24, 1, S.V, 'V', v => { S.V = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function solve() { const [a, b, c] = S.c, V = S.V; let Ceq, q = [], v = [];
      if (S.k === 'ser') { Ceq = 1 / (1 / a + 1 / b + 1 / c); const Q = Ceq * V; q = [Q, Q, Q]; v = [Q / a, Q / b, Q / c]; }
      else if (S.k === 'par') { Ceq = a + b + c; v = [V, V, V]; q = [a * V, b * V, c * V]; }
      else { const p = b + c; Ceq = a * p / (a + p); const Q = Ceq * V; const v1 = Q / a, v2 = V - v1; q = [Q, b * v2, c * v2]; v = [v1, v2, v2]; }
      return { Ceq, q, v }; }
    function capV(ctx, x, y1, y2, i, R) { const c = (y1 + y2) / 2; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, c - 4); ctx.moveTo(x, c + 4); ctx.lineTo(x, y2); ctx.stroke(); ctx.strokeStyle = COL.v; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 14, c - 4); ctx.lineTo(x + 14, c - 4); ctx.moveTo(x - 14, c + 4); ctx.lineTo(x + 14, c + 4); ctx.stroke();
      text(ctx, 'C' + '₁₂₃'[i] + ' = ' + S.c[i] + ' μF', x + 20, c - 8, { fs: 12, b: 1 }); text(ctx, 'Q = ' + fmt(R.q[i], 1) + ' μC', x + 20, c + 8, { fs: 11, c: COL.r }); text(ctx, 'V = ' + fmt(R.v[i], 2) + ' V', x + 20, c + 22, { fs: 11, c: COL.o }); }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const R = solve(), top = 26, bot = h - 30, xb = 30;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.8;
      // battery on the left (vertical)
      const by = (top + bot) / 2; ctx.beginPath(); ctx.moveTo(xb, top); ctx.lineTo(xb, by - 4); ctx.moveTo(xb, by + 4); ctx.lineTo(xb, bot); ctx.stroke(); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(xb - 13, by - 4); ctx.lineTo(xb + 13, by - 4); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xb - 7, by + 4); ctx.lineTo(xb + 7, by + 4); ctx.stroke(); text(ctx, S.V + ' V', xb + 16, by + 4, { fs: 12, b: 1 });
      ctx.lineWidth = 1.8;
      if (S.k === 'ser') { const xs = w * 0.55, seg = (bot - top) / 3; ctx.beginPath(); ctx.moveTo(xb, top); ctx.lineTo(xs, top); ctx.moveTo(xb, bot); ctx.lineTo(xs, bot); ctx.stroke(); for (let i = 0; i < 3; i++) capV(ctx, xs, top + i * seg, top + (i + 1) * seg, i, R); }
      else { const gap = (w - 100) / 3, xs = [86, 86 + gap, 86 + 2 * gap];
        if (S.k === 'par') { ctx.beginPath(); ctx.moveTo(xb, top); ctx.lineTo(xs[2], top); ctx.moveTo(xb, bot); ctx.lineTo(xs[2], bot); ctx.stroke(); xs.forEach((x, i) => capV(ctx, x, top, bot, i, R)); }
        else { const ym = (top + bot) / 2 - 6; ctx.beginPath(); ctx.moveTo(xb, top); ctx.lineTo(xs[0], top); ctx.moveTo(xs[0], ym); ctx.lineTo(xs[0], ym + 12); ctx.lineTo(xs[2], ym + 12); ctx.moveTo(xb, bot); ctx.lineTo(xs[2], bot); ctx.stroke(); capV(ctx, xs[0], top, ym, 0, R); capV(ctx, xs[1], ym + 12, bot, 1, R); capV(ctx, xs[2], ym + 12, bot, 2, R); } }
      const U = 0.5 * R.Ceq * S.V * S.V;
      ro([['equivalent capacitance', fmt(R.Ceq, 2) + ' μF', 'hl'], ['total charge from the supply', fmt(R.Ceq * S.V, 1) + ' μC'], ['energy stored', fmt(U, 1) + ' μJ'], ['shared quantity', S.k === 'ser' ? 'same Q on each' : S.k === 'par' ? 'same V on each' : 'C₂, C₃ share V; Q₁ = Q₂ + Q₃']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. RC charging and discharging ----------
  window.PhysiQSims.add('rc', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, loop, readouts } = window.PhysiQSims.U;
    const S = { mode: 'c', R: 100, Cu: 50, V0: 12, t: 0, run: true };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ms = [['c', 'charging'], ['d', 'discharging']];
    const chips = ms.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.mode ? ' on' : ''), () => { S.mode = k; chips.forEach(x => x.classList.toggle('on', x === b)); S.t = 0; }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'resistance <i>R</i>', 10, 500, 10, S.R, 'kΩ', v => { S.R = v; S.t = 0; });
    slider(ctl, 'capacitance <i>C</i>', 10, 200, 10, S.Cu, 'μF', v => { S.Cu = v; S.t = 0; });
    const cv = canvas(root); const ro = readouts(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, '❚❚ Pause', 'sm-main', () => { S.run = !S.run; pb.textContent = S.run ? '❚❚ Pause' : '▶ Play'; });
    button(bar, '↺ Restart', '', () => { S.t = 0; S.run = true; pb.textContent = '❚❚ Pause'; });
    const TMAX = 30; // seconds shown on the graphs
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 280, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const tau = S.R * 1e3 * S.Cu * 1e-6, I0 = S.V0 / (S.R * 1e3), Q0 = S.Cu * 1e-6 * S.V0, ch = S.mode === 'c';
      const fQ = t => ch ? 1 - Math.exp(-t / tau) : Math.exp(-t / tau), fI = t => Math.exp(-t / tau);
      const narrow = w < 520, gw = narrow ? w - 70 : (w - 110) / 2, gh = narrow ? (h - 90) / 2 : h - 70;
      const boxes = narrow ? [{ x: 50, y: 22, w: gw, h: gh }, { x: 50, y: 22 + gh + 46, w: gw, h: gh }] : [{ x: 50, y: 24, w: gw, h: gh }, { x: 90 + gw, y: 24, w: gw, h: gh }];
      const g = (b, f, col, lab, unit, top) => { ctx.fillStyle = '#fff'; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + b.h); ctx.lineTo(b.x + b.w, b.y + b.h); ctx.stroke();
        text(ctx, lab, b.x, b.y - 7, { b: 1, fs: 12, c: col }); text(ctx, 't / s', b.x + b.w, b.y + b.h + 26, { a: 'right', fs: 11, c: COL.sub, it: 1 }); text(ctx, top, b.x - 4, b.y + 4, { a: 'right', fs: 10, c: COL.sub });
        for (let s = 0; s <= TMAX; s += 10) text(ctx, String(s), b.x + b.w * s / TMAX, b.y + b.h + 13, { a: 'center', fs: 10, c: COL.sub });
        const xt = b.x + b.w * Math.min(tau, TMAX) / TMAX; ctx.setLineDash([4, 4]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(xt, b.y); ctx.lineTo(xt, b.y + b.h); ctx.stroke(); ctx.setLineDash([]); if (tau <= TMAX) text(ctx, 'τ', xt + 4, b.y + 12, { fs: 12, it: 1, b: 1 });
        ctx.strokeStyle = col; ctx.globalAlpha = 0.3; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const t = TMAX * i / 200, X = b.x + b.w * i / 200, Y = b.y + b.h * (1 - f(t)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.globalAlpha = 1;
        const tn = Math.min(S.t, TMAX); ctx.lineWidth = 2.6; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const t = tn * i / 200, X = b.x + b.w * t / TMAX, Y = b.y + b.h * (1 - f(t)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.beginPath(); ctx.arc(b.x + b.w * tn / TMAX, b.y + b.h * (1 - f(tn)), 4.5, 0, 7); ctx.fillStyle = col; ctx.fill(); };
      g(boxes[0], fQ, COL.v, 'charge Q (and p.d. V)', '', fmt(Q0 * 1e3, 1) + ' mC');
      g(boxes[1], fI, COL.o, 'current I' + (ch ? '' : ' (size)'), '', fmt(I0 * 1e3, 2) + ' mA');
      const tn = Math.min(S.t, TMAX);
      ro([['time constant τ = RC', fmt(tau, 1) + ' s', 'hl'], ['t', fmt(tn, 1) + ' s  (= ' + fmt(tn / tau, 2) + 'τ)'], ['charge Q', fmt(Q0 * fQ(tn) * 1e3, 2) + ' mC  (' + Math.round(fQ(tn) * 100) + '% of Q₀)', 'hl'], ['p.d. across C', fmt(S.V0 * fQ(tn), 2) + ' V'], ['current I', fmt(I0 * fI(tn) * 1e3, 3) + ' mA  (' + Math.round(fI(tn) * 100) + '% of I₀)'], ['supply', ch ? '12 V battery' : 'none (C starts at 12 V)']]);
    }
    loop(cv, dt => { if (S.run && S.t < TMAX) S.t += dt * 3; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
  // ---------- thundercloud and ground: a natural capacitor ----------
  window.PhysiQSims.add('lightning', function (root) {
    const { COL, fmt, el, slider, button, toggle, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const e0 = 8.85e-12, A = 1.0e6, Ebd = 3.0e6;
    // thunder, made by the browser (no sound file): a crack followed by a low rumble, heard d/340 s after the flash
    let ac = null, sound = false, heardAt = 0;
    function thunder(delay, dist) {
      if (!ac) return;
      const t0 = ac.currentTime + delay, dur = 4.5, sr = ac.sampleRate, n = Math.floor(sr * dur), buf = ac.createBuffer(1, n, sr), d = buf.getChannelData(0);
      let last = 0; for (let i = 0; i < n; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }   // brown noise
      const src = ac.createBufferSource(); src.buffer = buf;
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(dist < 1.2 ? 1800 : 900, t0); lp.frequency.exponentialRampToValueAtTime(110, t0 + 2.5);
      const g = ac.createGain(), peak = Math.min(1, 1.3 / dist);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + (dist < 1.2 ? 0.02 : 0.25));
      let t = t0 + 0.3; for (let k = 0; k < 6; k++) { g.gain.linearRampToValueAtTime(peak * (0.35 + Math.random() * 0.45) * (1 - k / 7), t); t += 0.35 + Math.random() * 0.3; }
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(lp); lp.connect(g); g.connect(ac.destination); src.start(t0); src.stop(t0 + dur);
    }
    const S = { d: 1.0, Q: 0, run: true, rate: 4, flash: 0, lead: 0, slow: false, bolt: null, count: 0, lastQ: 0 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'height of the cloud base <i>d</i>', 0.5, 2.0, 0.1, S.d, 'km', v => { S.d = v; });
    slider(ctl, 'how fast the storm charges the cloud', 1, 10, 1, S.rate, '', v => { S.rate = v; });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const pb = button(bar, 'Pause the storm', '', () => { S.run = !S.run; pb.textContent = S.run ? 'Pause the storm' : 'Let the storm charge the cloud'; });
    button(bar, 'Start again', '', () => { S.Q = 0; S.flash = 0; S.lead = 0; S.bolt = null; S.count = 0; });
    toggle(bar, '🐢 Slow motion', false, v => { S.slow = v; });
    toggle(bar, '🔊 Thunder sound', false, v => { sound = v; if (v && !ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = null; } } if (ac && ac.state === 'suspended') ac.resume(); });
    const cv = canvas(root); const ro = readouts(root);
    const Qmax = e0 * A * Ebd;   // charge at breakdown (does not depend on d)
    function makeBolt(x0, y0, y1) {
      const pts = [[x0, y0]]; let x = x0, y = y0; const n = 14, br = [];
      for (let i = 1; i <= n; i++) { y = y0 + (y1 - y0) * i / n; x += (Math.random() - 0.5) * 34; pts.push([x, y]);
        if (Math.random() < 0.3 && i < n - 2) { const b = [[x, y]]; let bx = x, by = y; for (let k = 0; k < 4; k++) { bx += (Math.random() - 0.3) * 26 * (Math.random() < 0.5 ? -1 : 1); by += (y1 - y0) / n * 0.9; b.push([bx, by]); } br.push(b); } }
      return { pts, br };
    }
    function frame(dt) {
      if (dt < 0) dt = 0;
      const sf = S.slow ? 0.1 : 1, dtf = dt * sf;   // slow motion: the lightning itself runs ten times slower
      const busy = S.flash > 0 || S.lead > 0;
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 300, 420); ctx.clearRect(0, 0, w, h);
      // charge build-up (tens of coulombs over a few seconds, scaled)
      if (S.run && !busy) S.Q = Math.min(Qmax, S.Q + Qmax * 0.035 * S.rate * dt);
      const E = S.Q / (e0 * A), dm = S.d * 1000, Cap = e0 * A / dm, V = E * dm, U = 0.5 * S.Q * V;
      if (!busy && S.Q >= Qmax * 0.999) { S.lead = 1e-4; S.lastQ = S.Q; }
      // sky
      const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2B3445'); g.addColorStop(1, '#5D6B7D'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      const groundY = h - 46, top = 22, cloudBase = top + 50 + (1 - (S.d - 0.5) / 1.5) * (groundY - top - 140);
      // ground
      ctx.fillStyle = '#4C6B2F'; ctx.fillRect(0, groundY, w, h - groundY); ctx.fillStyle = '#3B5424';
      for (let x = 20; x < w; x += 70) { ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x + 8, groundY - 26); ctx.lineTo(x + 16, groundY); ctx.fill(); }
      ctx.fillStyle = '#C9B79C'; ctx.fillRect(w * 0.72, groundY - 22, 34, 22); ctx.fillStyle = '#8E3B2E'; ctx.beginPath(); ctx.moveTo(w * 0.72 - 4, groundY - 22); ctx.lineTo(w * 0.72 + 17, groundY - 38); ctx.lineTo(w * 0.72 + 38, groundY - 22); ctx.fill();
      // cloud
      ctx.fillStyle = '#9AA3B2'; const cx0 = w * 0.12, cx1 = w * 0.88;
      ctx.beginPath(); ctx.moveTo(cx0, cloudBase);
      for (let x = cx0; x <= cx1 - 40; x += 40) { ctx.arc(x + 20, cloudBase - 24 - 10 * Math.sin(x * 0.07), 34, Math.PI, 0); }
      ctx.lineTo(cx1, cloudBase); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#7C8596'; ctx.fillRect(cx0, cloudBase - 12, cx1 - cx0, 12);
      // charges: number shown grows with Q
      const nq = Math.round(14 * S.Q / Qmax);
      for (let i = 0; i < nq; i++) { const x = cx0 + 14 + i * (cx1 - cx0 - 28) / 13; text(ctx, '−', x, cloudBase + 4, { a: 'center', b: 1, fs: 18, c: '#9CD0FF' }); text(ctx, '+', x, groundY + 18, { a: 'center', b: 1, fs: 16, c: '#FFC2A8' }); }
      // field lines (from + ground up to − cloud), brightness grows with E
      const fr = E / Ebd;
      if (fr > 0.02 && !S.flash) { ctx.strokeStyle = `rgba(255,236,120,${0.15 + 0.7 * fr})`; ctx.lineWidth = 1.4 + 1.2 * fr;
        for (let x = cx0 + 30; x < cx1 - 10; x += (cx1 - cx0 - 40) / 7) { ctx.beginPath(); ctx.moveTo(x, groundY - 4); ctx.lineTo(x, cloudBase + 12); ctx.stroke(); ctx.beginPath(); const my = (groundY + cloudBase) / 2; ctx.moveTo(x - 5, my + 4); ctx.lineTo(x, my - 6); ctx.lineTo(x + 5, my + 4); ctx.stroke(); } }
      { const my = (groundY + cloudBase) / 2 + 22; ctx.fillStyle = 'rgba(29,43,31,.75)'; ctx.fillRect(6, my - 13, 104, 18); ctx.fillRect(w - 76, my - 13, 70, 18);
        text(ctx, 'air (dielectric)', 10, my, { fs: 11, c: '#DDE3EA', b: 1 }); text(ctx, 'd = ' + fmt(S.d, 1) + ' km', w - 10, my, { a: 'right', fs: 11, c: '#DDE3EA' }); }
      // lightning
      // stepped leader: the ionised channel works its way down from the cloud
      const drawPath = pts => { ctx.beginPath(); pts.forEach(([x, y], k) => k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); };
      if (S.lead > 0) {
        if (!S.bolt) S.bolt = makeBolt(w * (0.35 + Math.random() * 0.3), cloudBase, groundY);
        S.lead = Math.min(1, S.lead + dtf / 0.35);
        const n = S.bolt.pts.length - 1, upto = Math.max(1, Math.floor(S.lead * n));
        ctx.strokeStyle = 'rgba(220,210,255,.9)'; ctx.lineWidth = 1.6; ctx.shadowColor = '#CFC6F7'; ctx.shadowBlur = 8; drawPath(S.bolt.pts.slice(0, upto + 1));
        S.bolt.br.forEach(b => { const k0 = S.bolt.pts.findIndex(q => q[0] === b[0][0] && q[1] === b[0][1]); if (k0 >= 0 && k0 < upto) drawPath(b.slice(0, Math.min(b.length, upto - k0 + 1))); }); ctx.shadowBlur = 0;
        text(ctx, 'stepped leader: the air starts to break down', w / 2, (groundY + cloudBase) / 2 - 34, { a: 'center', b: 1, fs: w < 480 ? 12 : 13, c: '#E4DDFF' });
        if (S.lead >= 1) { S.lead = 0; S.flash = 1.0; S.count++; const delay = S.d * 1000 / 340 / sf; heardAt = performance.now() + delay * 1000; if (sound) thunder(delay, S.d); }
      }
      // return stroke: the capacitor discharges through the ionised air
      if (S.flash > 0) {
        const a = Math.min(1, S.flash * 1.6);
        ctx.fillStyle = `rgba(255,255,255,${0.55 * a * (Math.random() < 0.7 ? 1 : 0.4)})`; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(255,250,200,${a})`; ctx.lineWidth = 4; ctx.shadowColor = '#FFF6B0'; ctx.shadowBlur = 18; drawPath(S.bolt.pts); ctx.lineWidth = 1.8; S.bolt.br.forEach(b => drawPath(b)); ctx.shadowBlur = 0;
        S.flash -= dtf * 1.2; S.Q = Math.max(0, S.Q - S.lastQ * dtf * 4);
        text(ctx, S.slow ? 'return stroke: charge flows to the ground' : 'air breaks down: lightning!', w / 2, (groundY + cloudBase) / 2 - 34, { a: 'center', b: 1, fs: w < 480 ? 13 : 15, c: '#FFF3A0' });
        if (S.flash <= 0) { S.flash = 0; S.bolt = null; S.Q = 0; }
      }
      // field meter
      const mx = 12, my0 = top - 6, mw = Math.min(180, w * 0.4);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(mx, my0, mw, 10); ctx.fillStyle = fr > 0.85 ? '#FF8A5C' : '#D5DC3B'; ctx.fillRect(mx, my0, mw * Math.min(1, fr), 10);
      text(ctx, 'E / dielectric strength of air', mx, my0 + 24, { fs: 10.5, c: '#DDE3EA' });
      ro([['charge on the cloud Q', fmt(S.Q, 1) + ' C', 'hl'], ['field E = Q/(ε₀A)', fmt(E / 1e6, 2) + ' × 10⁶ V m⁻¹', 'hl'], ['capacitance C = ε₀A/d', fmt(Cap * 1e9, 1) + ' nF'], ['p.d. V = Q/C', fmt(V / 1e9, 2) + ' × 10⁹ V'], ['energy stored ½QV', fmt(U / 1e9, 1) + ' × 10⁹ J'], ['flashes', String(S.count)], ['thunder heard after d/340', fmt(S.d * 1000 / 340, 1) + ' s' + (heardAt > performance.now() ? ' (wait for it…)' : '')]]);
    }
    loop(cv, frame);
  });
})();
