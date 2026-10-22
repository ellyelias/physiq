/* Semester 2 Chapter 15 Direct Current Circuits: full notes by Cikgu Suhaili (from the Unit 5 Electric Current and DC Circuits slides).
   App chapter 15 = STPM 2026 syllabus chapter 16. Shunts and multipliers (16.3 b–d) are not in the slides and were written from the syllabus. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;

  // ---------- circuit drawing helpers (SVG), any orientation ----------
  const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/>`;
  const W = (...p) => { let s = ''; for (let i = 0; i + 3 < p.length; i += 2) s += ln(p[i], p[i + 1], p[i + 2], p[i + 3]); return s; };
  const lab = (x, y, s, o = {}) => s ? T(x, y, s, Object.assign({ fs: 11 }, o)) : '';
  const geo = (x1, y1, x2, y2) => { const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy); return { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, ux: dx / d, uy: dy / d, deg: Math.atan2(dy, dx) * 180 / Math.PI }; };
  // resistor between two points; o.dx, o.dy place the label relative to the centre
  const rs = (x1, y1, x2, y2, s, o = {}) => { const g = geo(x1, y1, x2, y2); return ln(x1, y1, g.cx - 16 * g.ux, g.cy - 16 * g.uy) + ln(g.cx + 16 * g.ux, g.cy + 16 * g.uy, x2, y2) +
    `<rect x="-16" y="-6" width="32" height="12" fill="#fff" stroke="${C.ink}" stroke-width="1.8" transform="translate(${g.cx},${g.cy}) rotate(${g.deg})"/>` + lab(g.cx + (o.dx || 0), g.cy + (o.dy != null ? o.dy : -12), s, { a: o.a || 'middle' }); };
  // cell between two points: plus = 's' (positive terminal towards the first point) or 'e' (towards the second)
  const bt = (x1, y1, x2, y2, s, plus = 's', o = {}) => { const g = geo(x1, y1, x2, y2), k = plus === 's' ? -1 : 1, px = -g.uy, py = g.ux;
    const lp = [g.cx + k * 3 * g.ux, g.cy + k * 3 * g.uy], sp = [g.cx - k * 3 * g.ux, g.cy - k * 3 * g.uy];
    return ln(x1, y1, g.cx - 3 * g.ux, g.cy - 3 * g.uy) + ln(g.cx + 3 * g.ux, g.cy + 3 * g.uy, x2, y2) +
      `<line x1="${lp[0] + 13 * px}" y1="${lp[1] + 13 * py}" x2="${lp[0] - 13 * px}" y2="${lp[1] - 13 * py}" stroke="${C.ink}" stroke-width="1.8"/><line x1="${sp[0] + 7 * px}" y1="${sp[1] + 7 * py}" x2="${sp[0] - 7 * px}" y2="${sp[1] - 7 * py}" stroke="${C.ink}" stroke-width="4.5"/>` +
      T(lp[0] + k * 7 * g.ux + 10 * px, lp[1] + k * 7 * g.uy + 10 * py + 4, '+', { fs: 10, b: 1, c: C.r }) + lab(g.cx + (o.dx || 0), g.cy + (o.dy != null ? o.dy : -18), s, { a: o.a || 'middle' }); };
  const nd = (x, y) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${C.ink}"/>`;
  const term = (x, y, s, o = {}) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>` + lab(x + (o.dx || 0), y + (o.dy || -8), s, { fs: 12, it: 1, b: 1 });
  const meter = (x, y, s) => `<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="${C.ink}" stroke-width="1.8"/>` + T(x, y + 4.5, s, { fs: 12, b: 1 });
  const arr = (x1, y1, x2, y2, s, o = {}) => L(x1, y1, x2, y2, o.c || 'r', 'e', { w: 1.8 }) + lab((x1 + x2) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy || -6), s, { fs: 12, it: 1, b: 1, c: o.c === 'v' ? C.v : C.r });

  // ---------- figures ----------
  const F = {};
  F.cell = () => svg(320, 170, `<rect x="60" y="22" width="120" height="66" rx="8" fill="none" stroke="${C.sub}" stroke-dasharray="5 4"/>` + T(120, 16, 'battery', { fs: 11, c: C.sub }) + W(30, 55, 60, 55) + bt(60, 55, 110, 55, 'ε', 's', { dy: -20 }) + rs(110, 55, 180, 55, 'r', { dy: 24 }) + W(180, 55, 210, 55) + term(30, 55, 'a', { dy: -10 }) + term(210, 55, 'b', { dy: -10 }) +
    W(30, 55, 30, 140, 160, 140) + W(210, 55, 210, 140, 200, 140) + rs(110, 140, 200, 140, 'R', { dy: -12 }) + W(30, 140, 110, 140) + arr(150, 120, 110, 120, 'I', { dy: -4 }) + T(232, 60, 'V_ab = terminal p.d.', { fs: 11, a: 'start' }), 320);
  F.VI = () => svg(220, 160, axes(30, 130, 170, 110, 'I', 'V', { noO: 1 }) + L(30, 34, 180, 118, 'v', '', { w: 2.4 }) + T(26, 38, 'ε', { fs: 13, it: 1, a: 'end', b: 1 }) + T(130, 64, 'gradient = −r', { fs: 11, it: 1 }) + L(30, 34, 180, 34, 's', '', { w: 1, d: '3 3' }), 220);
  F.ser = () => svg(320, 120, rs(30, 40, 110, 40, 'R₁') + rs(110, 40, 190, 40, 'R₂') + rs(190, 40, 270, 40, 'R₃') + T(70, 64, 'V₁', { fs: 11, it: 1 }) + T(150, 64, 'V₂', { fs: 11, it: 1 }) + T(230, 64, 'V₃', { fs: 11, it: 1 }) + W(30, 40, 30, 100, 130, 100) + W(270, 40, 270, 100, 170, 100) + bt(130, 100, 170, 100, 'V', 's', { dy: 22 }) + arr(60, 26, 90, 26, 'I'), 320);
  F.par = () => svg(320, 170, W(60, 20, 60, 120) + W(220, 20, 220, 120) + rs(60, 20, 220, 20, 'R₁   I₁') + rs(60, 65, 220, 65, 'R₂   I₂') + rs(60, 110, 220, 110, 'R₃   I₃', { dy: 22 }) + nd(60, 65) + nd(220, 65) + W(60, 120, 60, 150, 120, 150) + W(220, 120, 220, 150, 160, 150) + bt(120, 150, 160, 150, 'V', 's', { dy: 22 }) + arr(30, 140, 30, 100, 'I', { dx: -8 }) + W(30, 150, 30, 150), 320);
  F.e10 = () => svg(300, 140, rs(30, 50, 110, 50, '2.0 Ω') + W(110, 50, 130, 50) + W(130, 25, 130, 75) + W(230, 25, 230, 75) + rs(130, 25, 230, 25, '12 Ω') + rs(130, 75, 230, 75, '4.0 Ω', { dy: 22 }) + W(230, 50, 270, 50, 270, 120, 170, 120) + W(30, 50, 30, 120, 130, 120) + bt(130, 120, 170, 120, '6.0 V', 's', { dy: -16 }) + nd(130, 50) + nd(230, 50), 300);
  F.e11a = () => svg(240, 160, term(20, 30, 'x', { dy: -8 }) + term(20, 130, 'y', { dy: 22 }) + W(20, 30, 60, 30) + W(20, 130, 60, 130) + rs(60, 30, 180, 30, '2.0 Ω') + rs(60, 130, 180, 130, '3.0 Ω', { dy: 22 }) + rs(60, 30, 60, 130, '1.0 Ω', { dx: -10, dy: 4, a: 'end' }) + rs(180, 30, 180, 130, '2.0 Ω', { dx: 10, dy: 4, a: 'start' }) + rs(60, 30, 180, 130, '1.0 Ω', { dx: 18, dy: -6, a: 'start' }) + nd(60, 30) + nd(60, 130) + nd(180, 130), 240);
  F.e11b = () => svg(330, 170, term(14, 85, 'x', { dy: -8 }) + term(316, 85, 'y', { dy: -8 }) + W(14, 85, 40, 85, 40, 35) + W(40, 85, 40, 135) + W(40, 35, 60, 35) + W(40, 135, 60, 135) +
    W(60, 15, 60, 55) + W(150, 15, 150, 55) + rs(60, 15, 150, 15, '8.0 Ω', { dy: -9 }) + rs(60, 35, 150, 35, '16.0 Ω', { dy: -8 }) + rs(60, 55, 150, 55, '16.0 Ω', { dy: 20 }) + rs(150, 35, 260, 35, '20.0 Ω') +
    W(60, 120, 60, 150) + W(150, 120, 150, 150) + rs(60, 120, 150, 120, '9.0 Ω', { dy: -9 }) + rs(60, 150, 150, 150, '18.0 Ω', { dy: 20 }) + rs(150, 135, 260, 135, '6.0 Ω') + W(260, 35, 290, 35, 290, 135, 260, 135) + W(290, 85, 316, 85) + nd(40, 85) + nd(290, 85), 330);
  F.sign = () => two(svg(220, 90, bt(60, 45, 160, 45, '', 'e') + L(70, 22, 150, 22, 'v', 'e', { w: 1.6 }) + T(110, 16, 'from − to +: +ε', { fs: 11, c: C.v }) + L(150, 72, 70, 72, 'r', 'e', { w: 1.6 }) + T(110, 86, 'from + to −: −ε', { fs: 11, c: C.r }), 220),
    svg(220, 90, rs(60, 45, 160, 45, '') + arr(166, 45, 196, 45, 'I', { dy: -6, c: 'o' }) + L(70, 22, 150, 22, 'v', 'e', { w: 1.6 }) + T(110, 16, 'with the current: −IR', { fs: 11, c: C.v }) + L(150, 72, 70, 72, 'r', 'e', { w: 1.6 }) + T(110, 86, 'against the current: +IR', { fs: 11, c: C.r }), 220));
  F.e12 = () => svg(260, 160, bt(80, 30, 170, 30, 'ε₁ = 20 V', 's') + W(40, 30, 80, 30) + W(170, 30, 220, 30) + rs(40, 30, 40, 130, 'R₂ = 20 Ω', { dx: -10, dy: 4, a: 'end' }) + rs(220, 30, 220, 130, 'R₁ = 10 Ω', { dx: 10, dy: 4, a: 'start' }) + W(40, 130, 100, 130) + bt(100, 130, 160, 130, 'ε₂ = 10 V', 's', { dy: 24 }) + W(160, 130, 220, 130), 300);
  F.e13 = () => svg(300, 160, W(40, 30, 70, 30) + bt(70, 30, 110, 30, 'ε₁ = 6.0 V', 'e') + rs(110, 30, 220, 30, 'R₁ = 3.0 Ω') + W(220, 30, 260, 30) + rs(260, 30, 260, 130, 'R₂ = 4.0 Ω', { dx: 10, dy: 4, a: 'start' }) + rs(40, 30, 40, 130, 'R₄ = 2.0 Ω', { dx: -10, dy: 4, a: 'end' }) + rs(40, 130, 160, 130, 'R₃ = 5.0 Ω', { dy: 22 }) + W(160, 130, 200, 130) + bt(200, 130, 240, 130, 'ε₂ = 3.0 V', 'e', { dy: 24 }) + W(240, 130, 260, 130), 300);
  F.e14 = () => svg(330, 170, W(40, 30, 150, 30) + rs(150, 30, 270, 30, 'R₂ = 4.0 Ω') + W(270, 30, 270, 70) + bt(270, 70, 270, 100, 'ε₃ = 5.0 V', 'e', { dx: 16, dy: 4, a: 'start' }) + W(270, 100, 270, 140) + rs(40, 30, 40, 140, 'R₁ = 4.0 Ω', { dx: -10, dy: 4, a: 'end' }) +
    W(40, 140, 75, 140) + bt(75, 140, 115, 140, 'ε₁ = 10 V', 'e', { dy: 24 }) + W(115, 140, 150, 140) + rs(150, 140, 270, 140, 'R₃ = 4.0 Ω', { dy: 22 }) + W(150, 30, 150, 70) + bt(150, 100, 150, 70, 'ε₂ = 5.0 V', 'e', { dx: 16, dy: 4, a: 'start' }) + W(150, 100, 150, 140) + nd(150, 30) + nd(150, 140), 330);
  F.e15 = () => svg(300, 120, W(40, 30, 70, 30) + bt(70, 30, 110, 30, '4.0 V', 's') + rs(110, 30, 170, 30, '1.0 Ω') + W(170, 30, 260, 30, 260, 90, 200, 90) + bt(200, 90, 160, 90, '2.5 V', 'e', { dy: 24 }) + rs(160, 90, 100, 90, '0.5 Ω', { dy: 22 }) + W(100, 90, 40, 90, 40, 30) + arr(250, 18, 220, 18, 'I'), 300);
  F.e16 = () => svg(300, 190, W(40, 30, 40, 160) + W(260, 30, 260, 160) + W(40, 30, 90, 30) + bt(90, 30, 130, 30, 'ε₁ = 15 V', 'e', { dy: 26 }) + rs(130, 30, 230, 30, 'R₁ = 1 Ω') + W(230, 30, 260, 30) +
    W(40, 95, 90, 95) + bt(90, 95, 130, 95, 'ε₂ = 10 V', 's', { dy: 26 }) + rs(130, 95, 230, 95, 'R₂ = 0.5 Ω') + W(230, 95, 260, 95) + rs(40, 160, 150, 160, 'R₃ = 0.1 Ω') + W(150, 160, 180, 160) + bt(180, 160, 220, 160, 'ε₃ = 3.0 V', 's', { dy: 26 }) + W(220, 160, 260, 160) +
    nd(40, 95) + nd(260, 95) + arr(56, 18, 80, 18, 'I₁') + arr(80, 108, 56, 108, 'I₂', { dy: 16 }) + arr(80, 148, 56, 148, 'I₃', { dy: -6 }), 300);
  F.e17 = () => svg(300, 180, W(40, 30, 140, 30) + bt(140, 30, 180, 30, 'ε₁', 's', { dy: -16 }) + W(180, 30, 260, 30, 260, 150) + rs(40, 30, 40, 90, 'R₁', { dx: -10, dy: 4, a: 'end' }) + W(40, 90, 40, 150) + W(40, 90, 130, 90) + bt(130, 90, 170, 90, 'ε₂', 's', { dy: -16 }) + rs(170, 90, 240, 90, 'R₂') + W(240, 90, 260, 90) + rs(40, 150, 260, 150, 'R₃', { dy: 22 }) + nd(40, 90) + nd(260, 90) +
    arr(100, 18, 70, 18, 'I₁') + arr(110, 78, 80, 78, 'I₂') + arr(70, 164, 100, 164, 'I', { dy: 14 }), 300);
  F.divider = () => svg(300, 150, W(60, 20, 60, 130) + bt(60, 130, 60, 20, 'V', 'e', { dx: -16, dy: 4, a: 'end' }) + W(60, 20, 160, 20) + rs(160, 20, 160, 75, 'R₁', { dx: 10, dy: 4, a: 'start' }) + rs(160, 75, 160, 130, 'R₂', { dx: 10, dy: 4, a: 'start' }) + W(160, 130, 60, 130) + nd(160, 75) + nd(160, 130) + W(160, 75, 240, 75) + W(160, 130, 240, 130) + term(240, 75, '') + term(240, 130, '') + T(256, 106, 'V_out', { fs: 12, it: 1, a: 'start' }) + L(250, 82, 250, 123, 'v', 'b', { w: 1.2 }), 300);
  F.rheo = () => svg(320, 150, W(40, 30, 40, 110) + bt(40, 110, 40, 30, 'V', 'e', { dx: -16, dy: 4, a: 'end' }) + W(40, 30, 70, 30) + `<rect x="70" y="22" width="160" height="16" fill="#F4F1E6" stroke="${C.ink}" stroke-width="1.6"/>` + W(230, 30, 260, 30, 260, 110, 40, 110) + T(70, 56, 'A', { fs: 12, b: 1 }) + T(230, 56, 'B', { fs: 12, b: 1 }) +
    `<path d="M150,4 L150,18 M144,12 L150,20 L156,12" stroke="${C.o}" stroke-width="2" fill="none"/>` + T(160, 10, 'sliding contact S', { fs: 10.5, c: C.o, a: 'start' }) + W(150, 4, 290, 4, 290, 80) + term(290, 80, '') + W(260, 110, 290, 110) + term(290, 110, '') + T(300, 100, 'V_out', { fs: 11, it: 1, a: 'start' }), 340);
  F.shunt = () => two(svg(240, 120, W(20, 50, 60, 50) + meter(90, 50, 'G') + W(60, 50, 79, 50) + W(101, 50, 120, 50) + rs(120, 50, 170, 50, 'R_g', { dy: -12 }) + W(170, 50, 210, 50) + W(60, 50, 60, 95) + W(210, 50, 210, 95) + rs(60, 95, 210, 95, 'R_s (shunt)', { dy: 22 }) + nd(60, 50) + nd(210, 50) + arr(20, 36, 44, 36, 'I') + T(130, 30, 'I_g', { fs: 11, it: 1, c: C.r }) + T(100, 83, 'I − I_g', { fs: 11, it: 1, c: C.r }), 240),
    svg(240, 120, W(20, 50, 40, 50) + meter(60, 50, 'G') + W(40, 50, 49, 50) + W(71, 50, 90, 50) + rs(90, 50, 140, 50, 'R_g') + rs(140, 50, 210, 50, 'R_m (multiplier)', { dy: 22 }) + W(210, 50, 230, 50) + L(20, 90, 230, 90, 's', 'b', { w: 1 }) + T(125, 106, 'V (full-scale reading)', { fs: 11, it: 1 }), 240));
  F.pot = () => svg(330, 180, W(40, 30, 130, 30) + bt(130, 30, 190, 30, 'driver cell', 's', { dy: -16 }) + W(190, 30, 290, 30, 290, 80) + W(40, 30, 40, 80) + `<rect x="40" y="76" width="250" height="8" fill="#F4F1E6" stroke="${C.ink}" stroke-width="1.4"/>` + T(34, 86, 'A', { fs: 12, b: 1, a: 'end' }) + T(296, 86, 'B', { fs: 12, b: 1, a: 'start' }) +
    W(40, 84, 40, 150, 90, 150) + bt(90, 150, 130, 150, 'ε (cell being tested)', 's', { dy: 24 }) + W(130, 150, 170, 150) + meter(181, 150, 'G') + W(192, 150, 210, 150, 210, 100) + `<path d="M210,100 L210,90 M204,94 L210,86 L216,94" stroke="${C.o}" stroke-width="2" fill="none"/>` + T(218, 104, 'jockey J', { fs: 10.5, c: C.o, a: 'start' }) + L(40, 66, 210, 66, 's', 'b', { w: 1 }) + T(125, 62, 'balance length l', { fs: 11, it: 1 }), 330);
  F.wheat = () => svg(300, 210, W(40, 100, 60, 100) + rs(60, 100, 150, 20, 'R₁', { dx: -12, dy: -2, a: 'end' }) + rs(150, 20, 240, 100, 'R₂', { dx: 12, dy: -2, a: 'start' }) + rs(60, 100, 150, 180, 'R₃', { dx: -12, dy: 14, a: 'end' }) + rs(150, 180, 240, 100, 'R_x', { dx: 12, dy: 14, a: 'start' }) + W(150, 20, 150, 89) + meter(150, 100, 'G') + W(150, 111, 150, 180) +
    W(240, 100, 260, 100) + W(40, 100, 20, 100, 20, 200, 120, 200) + bt(120, 200, 180, 200, '', 's') + W(180, 200, 280, 200, 280, 100, 260, 100) + T(150, 12, 'C', { fs: 12, b: 1 }) + T(150, 196, 'D', { fs: 12, b: 1 }) + T(52, 92, 'A', { fs: 12, b: 1, a: 'end' }) + T(248, 92, 'B', { fs: 12, b: 1, a: 'start' }) + nd(60, 100) + nd(240, 100) + nd(150, 20) + nd(150, 180), 300);
  F.metre = () => svg(330, 170, W(30, 40, 60, 40) + rs(60, 40, 130, 40, 'R_x (unknown)') + W(130, 40, 200, 40) + rs(200, 40, 270, 40, 'R (known)') + W(270, 40, 300, 40) + W(30, 40, 30, 100) + W(300, 40, 300, 100) + `<rect x="30" y="96" width="270" height="8" fill="#F4F1E6" stroke="${C.ink}" stroke-width="1.4"/>` + W(165, 40, 165, 56) + meter(165, 67, 'G') + W(165, 78, 165, 90) + `<path d="M165,90 L165,94 M159,88 L165,96 L171,88" stroke="${C.o}" stroke-width="2" fill="none"/>` +
    L(30, 118, 165, 118, 's', 'b', { w: 1 }) + T(98, 132, 'l₁', { fs: 12, it: 1 }) + L(165, 118, 300, 118, 's', 'b', { w: 1 }) + T(232, 132, 'l₂ = 100 − l₁ (cm)', { fs: 11, it: 1 }) + W(30, 104, 30, 156, 140, 156) + bt(140, 156, 190, 156, '', 's') + W(190, 156, 300, 156, 300, 104) + T(165, 30, 'thick copper strip', { fs: 10, c: C.sub }) + nd(165, 40), 330);

  const S = `
${sec('15-1', '15.1 Electromotive force, potential difference and internal resistance', `
${def('Electromotive force (e.m.f.), ε', `of a source: the ${red('energy converted from other forms (e.g. chemical) into electrical energy per unit charge')} that passes through the source. It equals the p.d. across the terminals when no current flows (open circuit).`)}
${def('Potential difference, <i>V</i>', `between two points: the ${red('electrical energy converted into other forms per unit charge')} passing from one point to the other.`)}
${key(`ε = ${fr('<i>W</i>', '<i>Q</i>')} &nbsp;&nbsp;&nbsp; <i>V</i> = ${fr('<i>W</i>', '<i>Q</i>')}`, 'both measured in volts (J C<sup>−1</sup>); the difference is the direction of the energy change')}
${table(['', 'e.m.f.', 'potential difference'], [['Energy change', 'other forms → electrical energy (in the source)', 'electrical energy → other forms (in a component)'], ['Where', 'across a source (cell, generator)', 'between any two points in a circuit'], ['Depends on the current?', 'no: a property of the source', 'yes (e.g. <i>V</i> = <i>IR</i>)']])}
${h4('Internal resistance')}
<p>Every real source has some resistance of its own, its <b>internal resistance</b> <i>r</i> (in a chemical cell: the electrolyte and the electrodes oppose the flow of charge). Part of the e.m.f. is used to drive the current through <i>r</i>, so the p.d. at the terminals is less than ε.</p>
${fig(F.cell(), 'Figure 15.1: a cell of e.m.f. ε and internal resistance r connected to an external resistor R.')}
${key(`ε = <i>I</i>(<i>R</i> + <i>r</i>) &nbsp;&nbsp;&nbsp; <i>V</i> = ε − <i>Ir</i>`, '<i>V</i> = <i>IR</i> = terminal p.d.; <i>Ir</i> = the "lost volts" across the internal resistance')}
${ul([`The larger the current drawn, the larger <i>Ir</i> and the lower the terminal p.d. (headlights dim when a car engine is started).`, `<i>V</i> = ε only when <i>I</i> = 0 (open circuit) or when <i>r</i> = 0 (an ideal source).`, `When a cell is being <b>charged</b> (current forced into its + terminal), <i>V</i> = ε + <i>Ir</i>, which is larger than ε.`])}
${fig(F.VI(), 'Figure 15.2: terminal p.d. against current: the intercept is ε and the gradient is −r.')}
${sim('emf', 'E.m.f. and internal resistance', 'Change the load resistance R and the internal resistance r. Watch the terminal p.d. fall as the current rises, and where the point lies on the V–I line.')}
${example('15.1.1', `A battery delivering 0.50 A has a terminal p.d. of 11.95 V and an internal resistance of 0.10 Ω. What is its e.m.f.?`,
  steps([`ε = <i>V</i> + <i>Ir</i> = 11.95 + (0.50)(0.10) = <b>12.0 V</b>`]))}
${example('15.1.2', `A battery of e.m.f. 9.0 V is connected to a resistor. The current is 0.10 A and a voltmeter across the terminals reads 8.9 V. Find the internal resistance.`,
  steps([`<i>r</i> = ${fr('ε − <i>V</i>', '<i>I</i>')} = ${fr('9.0 − 8.9', '0.10')} = <b>1.0 Ω</b>`]))}
${example('15.1.3', `When a cell gives a current of 0.20 A its terminal p.d. is 1.40 V; when it gives 0.60 A the terminal p.d. is 1.20 V. Find the e.m.f. and the internal resistance.`,
  steps([`1.40 = ε − 0.20<i>r</i> and 1.20 = ε − 0.60<i>r</i>`, `Subtract: 0.20 = 0.40<i>r</i> ⇒ <i>r</i> = <b>0.50 Ω</b>; &nbsp; ε = 1.40 + 0.10 = <b>1.50 V</b>`]))}
${h4('Electrical energy and power')}
${key(`<i>W</i> = <i>QV</i> = <i>VIt</i> &nbsp;&nbsp;&nbsp; <i>P</i> = <i>IV</i> = <i>I</i><sup>2</sup><i>R</i> = ${fr('<i>V</i><sup>2</sup>', '<i>R</i>')}`, '<i>P</i> = <i>IV</i> for any device; <i>I</i><sup>2</sup><i>R</i> and <i>V</i><sup>2</sup>/<i>R</i> only for a resistor (all the energy becomes heat). Power supplied by the source = <i>I</i>ε.')}
${example('15.1.4', `(a) Find the resistance of a 40 W, 12 V car headlamp. (b) A heater element of resistance 12 Ω carries 13 A. Find its power. (c) An iron with a 15 Ω element works at 120 V. How much heat does it produce in 1.0 h?`,
  steps([`(a) <i>R</i> = <i>V</i><sup>2</sup>/<i>P</i> = 12<sup>2</sup>/40 = <b>3.6 Ω</b>`, `(b) <i>P</i> = <i>I</i><sup>2</sup><i>R</i> = (13)<sup>2</sup>(12) = <b>2.0 × 10<sup>3</sup> W</b>`, `(c) <i>W</i> = ${fr('<i>V</i><sup>2</sup>', '<i>R</i>')}<i>t</i> = ${fr('120<sup>2</sup>', '15')}(3600) = <b>3.5 × 10<sup>6</sup> J</b>`]))}
${h4('Resistors in series and in parallel')}
${two(fig(F.ser(), 'Series: same current'), fig(F.par(), 'Parallel: same p.d.'))}
${two(key(`<i>R</i><sub>eq</sub> = <i>R</i><sub>1</sub> + <i>R</i><sub>2</sub> + <i>R</i><sub>3</sub>`, 'series: <i>V</i> = <i>V</i><sub>1</sub> + <i>V</i><sub>2</sub> + <i>V</i><sub>3</sub> and <i>V</i> = <i>IR</i><sub>eq</sub>, so <i>IR</i><sub>eq</sub> = <i>IR</i><sub>1</sub> + <i>IR</i><sub>2</sub> + <i>IR</i><sub>3</sub>'), key(`${fr('1', '<i>R</i><sub>eq</sub>')} = ${fr('1', '<i>R</i><sub>1</sub>')} + ${fr('1', '<i>R</i><sub>2</sub>')} + ${fr('1', '<i>R</i><sub>3</sub>')}`, 'parallel: <i>I</i> = <i>I</i><sub>1</sub> + <i>I</i><sub>2</sub> + <i>I</i><sub>3</sub> and each <i>I</i> = <i>V</i>/<i>R</i>, then divide by <i>V</i>'))}
${example('15.1.5', `Find (a) the total resistance, (b) the current from the 6.0 V supply, (c) the p.d. across the 4.0 Ω resistor.`,
  steps([`(a) 12 Ω ∥ 4.0 Ω: ${fr('(12)(4.0)', '16')} = 3.0 Ω; &nbsp; <i>R</i><sub>total</sub> = 2.0 + 3.0 = <b>5.0 Ω</b>`, `(b) <i>I</i> = 6.0/5.0 = <b>1.2 A</b>`, `(c) <i>V</i><sub>2Ω</sub> = (1.2)(2.0) = 2.4 V, so <i>V</i><sub>4Ω</sub> = 6.0 − 2.4 = <b>3.6 V</b>`]), fig(F.e10()))}
${example('15.1.6', `Find the equivalent resistance between x and y in each network.`,
  steps([`(a) 2.0 Ω + 2.0 Ω = 4.0 Ω (top and right side, in series) in parallel with the 1.0 Ω diagonal: 0.80 Ω; add the 3.0 Ω: 3.80 Ω; in parallel with the 1.0 Ω between x and y: ${fr('(3.80)(1.0)', '4.80')} = <b>0.79 Ω</b>`, `(b) upper branch: 8.0 ∥ 16.0 ∥ 16.0 = 4.0 Ω, plus 20.0 Ω = 24.0 Ω. Lower branch: 9.0 ∥ 18.0 = 6.0 Ω, plus 6.0 Ω = 12.0 Ω. Together: ${fr('(24)(12)', '36')} = <b>8.0 Ω</b>`]), two(fig(F.e11a(), '(a)'), fig(F.e11b(), '(b)')))}
`)}

${sec('15-2', '15.2 Kirchhoff’s laws', `
${def('Kirchhoff’s first law (junction rule)', `The ${red('sum of the currents entering a junction equals the sum of the currents leaving it')} (ΣI = 0). It follows from the conservation of charge.`)}
${def('Kirchhoff’s second law (loop rule)', `In any closed loop, the ${red('sum of the e.m.f.s equals the sum of the products IR')} (Σε = ΣIR). It follows from the conservation of energy.`)}
${fig(F.sign(), 'Figure 15.3: sign convention when going round a loop.')}
${steps([`Mark a current (any direction you like) in each branch. Use the first law so the junctions balance.`, `Choose a loop and a direction to go round it.`, `Apply Σε = Σ<i>IR</i>: an e.m.f. counts + if you pass through it from − to +; an <i>IR</i> counts + if you go the same way as the current you marked.`, `Solve the equations. A negative answer means that current really flows the other way; its size is still correct.`])}
${example('15.2.1', `Find the current in the circuit.`,
  steps([`One loop, one current. The two cells oppose each other; ε<sub>1</sub> is larger, so take <i>I</i> anticlockwise (driven by ε<sub>1</sub>).`, `Σε = Σ<i>IR</i>: 20 − 10 = <i>I</i>(20 + 10)`, `<i>I</i> = 10/30 = <b>0.33 A</b> in each resistor`]), fig(F.e12()))}
${example('15.2.2', `Find the current in each resistor.`,
  steps([`One loop. Take <i>I</i> clockwise. ε<sub>1</sub> is passed from − to + (+6.0 V); ε<sub>2</sub> is passed from + to − (−3.0 V).`, `6.0 − 3.0 = <i>I</i>(3.0 + 4.0 + 5.0 + 2.0) = 14<i>I</i>`, `<i>I</i> = <b>0.21 A</b>, clockwise, the same in every resistor`]), fig(F.e13()))}
${example('15.2.3', `Find the current in each branch.`,
  steps([`Let <i>I</i><sub>1</sub> flow through R<sub>1</sub> and ε<sub>1</sub>, <i>I</i><sub>3</sub> through R<sub>2</sub>, ε<sub>3</sub> and R<sub>3</sub>, and <i>I</i><sub>2</sub> up through ε<sub>2</sub>. Junction: <i>I</i><sub>2</sub> = <i>I</i><sub>1</sub> + <i>I</i><sub>3</sub>.`, `Left loop (ε<sub>1</sub>, ε<sub>2</sub>, R<sub>1</sub>): 10 + 5.0 = 4.0<i>I</i><sub>1</sub> ⇒ <i>I</i><sub>1</sub> = <b>3.75 A</b>`, `Right loop (ε<sub>2</sub>, ε<sub>3</sub>, R<sub>2</sub>, R<sub>3</sub>): 5.0 + 5.0 = (4.0 + 4.0)<i>I</i><sub>3</sub> ⇒ <i>I</i><sub>3</sub> = <b>1.25 A</b>`, `<i>I</i><sub>2</sub> = 3.75 + 1.25 = <b>5.0 A</b>`]), fig(F.e14()))}
${example('15.2.4', `A cell of e.m.f. 4.0 V and internal resistance 1.0 Ω is connected in series with a cell of e.m.f. 2.5 V and internal resistance 0.5 Ω in a closed loop, so that the current is as small as possible. Draw the circuit and find the current.`,
  steps([`The current is smallest when the cells <b>oppose</b> each other: connect + to + (and − to −).`, `<i>I</i> = ${fr('4.0 − 2.5', '1.0 + 0.5')} = <b>1.0 A</b>`, fig(F.e15())]))}
${example('15.2.5', `Find <i>I</i><sub>1</sub>, <i>I</i><sub>2</sub> and <i>I</i><sub>3</sub>. Ignore the internal resistances.`,
  steps([`Junction (right-hand node): <i>I</i><sub>1</sub> = <i>I</i><sub>2</sub> + <i>I</i><sub>3</sub> … (1)`, `Top loop (branches 1 and 2): 15 + 10 = (1)<i>I</i><sub>1</sub> + (0.5)<i>I</i><sub>2</sub> ⇒ 25 = <i>I</i><sub>1</sub> + 0.5<i>I</i><sub>2</sub> … (2)`, `Bottom loop (branches 2 and 3): 3.0 − 10 = 0.1<i>I</i><sub>3</sub> − 0.5<i>I</i><sub>2</sub> ⇒ −7 = 0.1<i>I</i><sub>3</sub> − 0.5<i>I</i><sub>2</sub> … (3)`, `From (3): <i>I</i><sub>3</sub> = 5<i>I</i><sub>2</sub> − 70. Put into (1) and (2): 25 = 1.5<i>I</i><sub>2</sub> + 5<i>I</i><sub>2</sub> − 70 ⇒ <i>I</i><sub>2</sub> = <b>14.6 A</b>`, `<i>I</i><sub>3</sub> = 5(14.62) − 70 = <b>3.1 A</b>; &nbsp; <i>I</i><sub>1</sub> = 14.62 + 3.08 = <b>17.7 A</b>`]), fig(F.e16()))}
${example('15.2.6', `ε<sub>1</sub> = 8 V, <i>R</i><sub>1</sub> = 1 Ω, <i>R</i><sub>2</sub> = 2 Ω, <i>R</i><sub>3</sub> = 3 Ω and <i>I</i> = 3 A. Ignore the internal resistances. Find (a) <i>I</i><sub>1</sub> and <i>I</i><sub>2</sub>, (b) ε<sub>2</sub>.`,
  steps([`Loop through ε<sub>1</sub>, R<sub>1</sub> and R<sub>3</sub>: with the directions marked, 0 = 1(<i>I</i><sub>1</sub>) − 8 + 3(3) ⇒ <i>I</i><sub>1</sub> = −1 A.`, `(a) <b><i>I</i><sub>1</sub> = 1 A</b>, flowing in the <b>opposite</b> direction to the arrow. Junction: <i>I</i> = <i>I</i><sub>1</sub> + <i>I</i><sub>2</sub> ⇒ 3 = −1 + <i>I</i><sub>2</sub> ⇒ <b><i>I</i><sub>2</sub> = 4 A</b>`, `(b) Loop through ε<sub>2</sub>, R<sub>2</sub> and R<sub>3</sub>: ε<sub>2</sub> = <i>I</i><sub>2</sub><i>R</i><sub>2</sub> + <i>IR</i><sub>3</sub> = (4)(2) + (3)(3) = <b>17 V</b>`]), fig(F.e17()))}
`)}

${sec('15-3', '15.3 Potential divider', `
<p>Two resistors in series across a supply share the supply voltage in the ratio of their resistances. Taking the output across one of them gives a smaller, chosen voltage.</p>
${fig(F.divider(), 'Figure 15.4: a potential divider.')}
${key(`<i>V</i><sub>out</sub> = ${fr('<i>R</i><sub>2</sub>', '<i>R</i><sub>1</sub> + <i>R</i><sub>2</sub>')} <i>V</i>`, 'the same current <i>I</i> = <i>V</i>/(<i>R</i><sub>1</sub> + <i>R</i><sub>2</sub>) flows through both resistors (no load connected)')}
${h4('A source of variable voltage')}
<p>If the two resistors are replaced by one uniform resistance wire (or a rheostat) with a sliding contact, the output can be varied smoothly from 0 to the full supply voltage. For a uniform wire, <i>R</i> ∝ <i>l</i>, so <i>V</i><sub>out</sub> = ${fr('<i>l</i>', '<i>L</i>')}<i>V</i>.</p>
${fig(F.rheo(), 'Figure 15.5: a rheostat used as a potential divider (potentiometer connection).')}
${note(`If a load is connected across the output, it is in parallel with <i>R</i><sub>2</sub>. The combined resistance is smaller, so <i>V</i><sub>out</sub> falls. The output only stays near the calculated value if the load resistance is much larger than <i>R</i><sub>2</sub>.`)}
${sim('potdiv', 'Potential divider', 'Move the sliding contact to change the output voltage. Then connect a load and make it smaller: watch the output fall below the value without a load.')}
${example('15.3.1', `Resistors of 3.0 Ω and 6.0 Ω are connected in series to a 12.0 V battery of negligible internal resistance. Find the p.d. across each resistor.`,
  steps([`<i>V</i><sub>3</sub> = ${fr('3.0', '9.0')}(12.0) = <b>4.0 V</b>; &nbsp; <i>V</i><sub>6</sub> = ${fr('6.0', '9.0')}(12.0) = <b>8.0 V</b>`]))}
${example('15.3.2', `A 12 V supply is connected across two 10 kΩ resistors in series. Find the output across the lower resistor (a) with no load, (b) with a 10 kΩ load connected across it.`,
  steps([`(a) <i>V</i><sub>out</sub> = ½(12) = <b>6.0 V</b>`, `(b) 10 kΩ ∥ 10 kΩ = 5.0 kΩ: <i>V</i><sub>out</sub> = ${fr('5.0', '10 + 5.0')}(12) = <b>4.0 V</b>`]))}
${h4('Shunts and multipliers')}
<p>A galvanometer has a resistance <i>R</i><sub>g</sub> and gives full-scale deflection for a small current <i>I</i><sub>g</sub>. It can be converted into an ammeter or a voltmeter.</p>
${fig(F.shunt(), 'Figure 15.6: a shunt in parallel makes an ammeter; a multiplier in series makes a voltmeter.')}
${two(`<p><b>Ammeter: shunt</b></p>${ul([`A small resistance <i>R</i><sub>s</sub> is connected in <b>parallel</b> with the galvanometer so that most of the current bypasses it.`, `Same p.d.: <i>I</i><sub>g</sub><i>R</i><sub>g</sub> = (<i>I</i> − <i>I</i><sub>g</sub>)<i>R</i><sub>s</sub>`])}${key(`<i>R</i><sub>s</sub> = ${fr('<i>I</i><sub>g</sub><i>R</i><sub>g</sub>', '<i>I</i> − <i>I</i><sub>g</sub>')}`, 'an ammeter should have a very small resistance')}`,
  `<p><b>Voltmeter: multiplier</b></p>${ul([`A large resistance <i>R</i><sub>m</sub> is connected in <b>series</b> with the galvanometer.`, `At full scale: <i>V</i> = <i>I</i><sub>g</sub>(<i>R</i><sub>g</sub> + <i>R</i><sub>m</sub>)`])}${key(`<i>R</i><sub>m</sub> = ${fr('<i>V</i>', '<i>I</i><sub>g</sub>')} − <i>R</i><sub>g</sub>`, 'a voltmeter should have a very large resistance')}`)}
${example('15.3.3', `A galvanometer of resistance 50 Ω gives full-scale deflection for 1.0 mA. How can it be converted into (a) an ammeter reading up to 1.0 A, (b) a voltmeter reading up to 10 V?`,
  steps([`(a) <i>R</i><sub>s</sub> = ${fr('(1.0 × 10<sup>−3</sup>)(50)', '1.0 − 0.0010')} = <b>0.050 Ω</b>, connected in parallel`, `(b) <i>R</i><sub>m</sub> = ${fr('10', '1.0 × 10<sup>−3</sup>')} − 50 = <b>9950 Ω</b>, connected in series`]))}
`)}

${sec('15-4', '15.4 Potentiometer and Wheatstone bridge', `
${h4('Potentiometer')}
${fig(F.pot(), 'Figure 15.7: a potentiometer measuring the e.m.f. of a cell.')}
${ul([`A <b>driver cell</b> sends a steady current through a uniform resistance wire AB (often 100 cm long). The p.d. along the wire is proportional to length: <i>V</i><sub>AJ</sub> ∝ <i>l</i>.`, `The cell being tested is connected with its + terminal to A (the same side as the + of the driver cell), through a galvanometer to a sliding <b>jockey</b> J.`, `The jockey is moved until the galvanometer shows <b>no deflection</b> (balance). Then no current flows through the test cell, so the p.d. across length <i>l</i> equals its <b>e.m.f.</b> exactly.`])}
${key(`ε = ${fr('<i>l</i>', '<i>L</i>')} <i>V</i><sub>AB</sub> &nbsp;&nbsp;&nbsp; ${fr('ε<sub>1</sub>', 'ε<sub>2</sub>')} = ${fr('<i>l</i><sub>1</sub>', '<i>l</i><sub>2</sub>')} &nbsp;&nbsp;&nbsp; <i>r</i> = <i>R</i>${fr('<i>l</i><sub>0</sub> − <i>l</i>', '<i>l</i>')}`, 'measuring an e.m.f.; comparing two e.m.f.s; internal resistance (<i>l</i><sub>0</sub> = balance length on open circuit, <i>l</i> = balance length with a resistor <i>R</i> across the cell)')}
${ul([`<b>Uses:</b> measuring an e.m.f. (no current is drawn, unlike a voltmeter), comparing e.m.f.s, measuring internal resistance, comparing resistances.`, `<b>No balance point</b> (deflection one way all along the wire)? The e.m.f. being measured is larger than the p.d. across the whole wire, or the cells are connected + to −, or a connection is loose.`])}
${h4('Wheatstone bridge')}
${fig(F.wheat(), 'Figure 15.8: a Wheatstone bridge.')}
${steps([`Four resistors form a bridge with a galvanometer between C and D. One of them, <i>R</i><sub>x</sub>, is unknown.`, `A known resistor is adjusted until the galvanometer reads zero: the bridge is <b>balanced</b>, so C and D are at the same potential.`, `No current in CD means R<sub>1</sub> and R<sub>2</sub> carry the same current <i>I</i><sub>1</sub>, and R<sub>3</sub> and R<sub>x</sub> carry <i>I</i><sub>2</sub>.`, `<i>V</i><sub>AC</sub> = <i>V</i><sub>AD</sub>: <i>I</i><sub>1</sub><i>R</i><sub>1</sub> = <i>I</i><sub>2</sub><i>R</i><sub>3</sub>; &nbsp; <i>V</i><sub>CB</sub> = <i>V</i><sub>DB</sub>: <i>I</i><sub>1</sub><i>R</i><sub>2</sub> = <i>I</i><sub>2</sub><i>R</i><sub>x</sub>. Divide the two equations.`])}
${key(`${fr('<i>R</i><sub>1</sub>', '<i>R</i><sub>2</sub>')} = ${fr('<i>R</i><sub>3</sub>', '<i>R</i><sub>x</sub>')} &nbsp; ⇒ &nbsp; <i>R</i><sub>x</sub> = ${fr('<i>R</i><sub>2</sub><i>R</i><sub>3</sub>', '<i>R</i><sub>1</sub>')}`, 'balance does not depend on the e.m.f. of the cell or on the galvanometer resistance')}
${h4('Metre bridge')}
<p>A practical Wheatstone bridge: two arms are the two parts of a uniform wire 100 cm long. At balance, the ratio of resistances equals the ratio of lengths.</p>
${fig(F.metre(), 'Figure 15.9: a metre bridge.')}
${key(`${fr('<i>R</i><sub>x</sub>', '<i>R</i>')} = ${fr('<i>l</i><sub>1</sub>', '<i>l</i><sub>2</sub>')}`, 'best accuracy when the balance point is near the middle of the wire')}
${sim('bridge', 'Potentiometer and metre bridge', 'Slide the jockey along the wire until the galvanometer reads zero. Read the balance length and use it to find the unknown e.m.f. or the unknown resistance.')}
${example('15.4.1', `A potentiometer wire 100.0 cm long has a p.d. of 2.00 V across it. A cell balances at 75.0 cm. Find its e.m.f.`,
  steps([`ε = ${fr('75.0', '100.0')}(2.00) = <b>1.50 V</b>`]))}
${example('15.4.2', `A standard cell of e.m.f. 1.018 V balances at 60.0 cm on a potentiometer. Another cell balances at 72.0 cm. Find its e.m.f.`,
  steps([`ε<sub>2</sub> = ε<sub>1</sub>${fr('<i>l</i><sub>2</sub>', '<i>l</i><sub>1</sub>')} = 1.018 × ${fr('72.0', '60.0')} = <b>1.22 V</b>`]))}
${example('15.4.3', `A cell balances at 80.0 cm on open circuit. When a 10 Ω resistor is connected across it, the balance length becomes 64.0 cm. Find the internal resistance of the cell.`,
  steps([`<i>r</i> = <i>R</i>${fr('<i>l</i><sub>0</sub> − <i>l</i>', '<i>l</i>')} = 10 × ${fr('80.0 − 64.0', '64.0')} = <b>2.5 Ω</b>`, `(Open circuit: ε ∝ <i>l</i><sub>0</sub>. With R: <i>V</i> = <i>IR</i> ∝ <i>l</i>. Since ε/<i>V</i> = (<i>R</i> + <i>r</i>)/<i>R</i> = <i>l</i><sub>0</sub>/<i>l</i>.)`]))}
${example('15.4.4', `A platinum wire of diameter 0.920 mm is the unknown resistance in a Wheatstone bridge. <i>R</i><sub>1</sub> = 38.0 Ω and <i>R</i><sub>2</sub> = 46.0 Ω, and balance is reached when <i>R</i><sub>3</sub> = 3.48 Ω. Find the length of the wire. (ρ = 10.6 × 10<sup>−8</sup> Ω m)`,
  steps([`<i>R</i><sub>x</sub> = ${fr('<i>R</i><sub>2</sub><i>R</i><sub>3</sub>', '<i>R</i><sub>1</sub>')} = ${fr('(46.0)(3.48)', '38.0')} = 4.21 Ω`, `<i>l</i> = ${fr('<i>R</i><sub>x</sub><i>A</i>', 'ρ')} = ${fr('(4.21)π(0.920 × 10<sup>−3</sup>)<sup>2</sup>/4', '10.6 × 10<sup>−8</sup>')} = <b>26.4 m</b>`]))}
${example('15.4.5', `In a metre bridge the unknown resistor is in the left gap and a 10.0 Ω resistor in the right gap. Balance is at 40.0 cm from the left end. Find the unknown resistance.`,
  steps([`<i>R</i><sub>x</sub> = <i>R</i>${fr('<i>l</i><sub>1</sub>', '<i>l</i><sub>2</sub>')} = 10.0 × ${fr('40.0', '60.0')} = <b>6.67 Ω</b>`]))}
${exercises('Exercise: d.c. circuits', [
  { q: `A battery of e.m.f. 12 V and internal resistance 0.50 Ω is connected to a 5.5 Ω resistor. Find (a) the current, (b) the terminal p.d., (c) the power lost in the battery.`, a: `(a) 2.0 A &nbsp; (b) 11 V &nbsp; (c) <i>I</i><sup>2</sup><i>r</i> = 2.0 W` },
  { q: `Why does a potentiometer measure the e.m.f. of a cell more accurately than a voltmeter?`, a: `At balance no current flows through the cell, so there is no p.d. across its internal resistance. A voltmeter draws a small current, so it reads ε − <i>Ir</i>, slightly less than ε.` },
  { q: `A galvanometer of resistance 20 Ω gives full-scale deflection with 5.0 mA. Find the resistance needed to make (a) a 0–5.0 A ammeter, (b) a 0–15 V voltmeter, and say how each is connected.`, a: `(a) 0.020 Ω in parallel &nbsp; (b) 2980 Ω in series` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-15', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. e.m.f. and internal resistance ----------
  window.PhysiQSims.add('emf', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { e: 12, r: 1.0, R: 5 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'load resistance <i>R</i>', 0.5, 30, 0.5, S.R, 'Ω', v => { S.R = v; draw(); });
    slider(ctl, 'internal resistance <i>r</i>', 0, 4, 0.1, S.r, 'Ω', v => { S.r = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const narrow = root.clientWidth < 520;
      const ctx = cv.ctx, { w, h } = narrow ? cv.size(1.1, 340, 460) : cv.size(0.5, 240, 330); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const I = S.e / (S.R + S.r), V = I * S.R, lost = I * S.r;
      let gx, gw, gy, gh;
      if (narrow) {
        // e.m.f. shared: one horizontal bar across the top, the V–I graph below it
        const bx = 20, bw = w - 40, by = 30, bh = 26, wv = bw * V / S.e;
        text(ctx, 'ε = 12 V shared between', bx, 20, { b: 1, fs: 12 });
        ctx.fillStyle = 'rgba(106,99,236,.85)'; ctx.fillRect(bx, by, wv, bh); ctx.fillStyle = 'rgba(192,57,43,.8)'; ctx.fillRect(bx + wv, by, bw - wv, bh);
        ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.strokeRect(bx, by, bw, bh);
        text(ctx, 'V = IR = ' + fmt(V, 2) + ' V', bx, by + bh + 18, { fs: 12, b: 1, c: COL.v });
        text(ctx, 'Ir = ' + fmt(lost, 2) + ' V', bx + bw, by + bh + 18, { fs: 12, b: 1, c: COL.r, a: 'right' });
        gx = 44; gw = w - gx - 24; gy = by + bh + 50; gh = h - gy - 40;
      } else {
        const bx = 30, bw = Math.min(260, w * 0.42), by = 40, bh = h - 90;
        text(ctx, 'ε = 12 V shared between', bx, 22, { b: 1, fs: 12 });
        const hv = bh * V / S.e; ctx.fillStyle = 'rgba(106,99,236,.85)'; ctx.fillRect(bx, by + bh - hv, bw * 0.45, hv); ctx.fillStyle = 'rgba(192,57,43,.8)'; ctx.fillRect(bx, by, bw * 0.45, bh - hv);
        ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.strokeRect(bx, by, bw * 0.45, bh);
        text(ctx, 'V = IR = ' + fmt(V, 2) + ' V', bx + bw * 0.5, by + bh - hv / 2 + 4, { fs: 12, b: 1, c: COL.v }); text(ctx, 'lost volts Ir = ' + fmt(lost, 2) + ' V', bx + bw * 0.5, by + (bh - hv) / 2 + 4, { fs: 12, b: 1, c: COL.r });
        gx = bx + bw + 40; gw = w - gx - 20; gy = by; gh = bh;
      }
      const Imax = 12 / Math.max(S.r, 0.4) > 24 ? 24 : 12 / Math.max(S.r, 0.4);
      {
        ctx.fillStyle = '#fff'; ctx.fillRect(gx, gy, gw, gh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
        text(ctx, 'V / V', gx, gy - 6, { fs: 11, b: 1 }); text(ctx, 'I / A', gx + gw, gy + gh + 26, { fs: 11, a: 'right', c: COL.sub });
        const X = i => gx + gw * i / Imax, Y = v => gy + gh * (1 - v / 13);
        ctx.strokeStyle = COL.v; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(X(0), Y(12)); ctx.lineTo(X(Math.min(Imax, 12 / Math.max(S.r, 1e-6))), Y(Math.max(0, 12 - S.r * Imax))); ctx.stroke();
        text(ctx, 'ε', gx - 6, Y(12) + 4, { a: 'right', b: 1 }); text(ctx, '0', gx - 6, gy + gh + 4, { a: 'right', fs: 10, c: COL.sub }); text(ctx, fmt(Imax, 0), gx + gw, gy + gh + 13, { a: 'right', fs: 10, c: COL.sub });
        text(ctx, 'gradient = −r', gx + gw - 4, gy + 16, { a: 'right', fs: 11, c: COL.v });
        ctx.beginPath(); ctx.arc(X(I), Y(V), 6, 0, 7); ctx.fillStyle = COL.o; ctx.fill();
      }
      ro([['current I = ε/(R + r)', fmt(I, 2) + ' A', 'hl'], ['terminal p.d. V', fmt(V, 2) + ' V', 'hl'], ['lost volts Ir', fmt(lost, 2) + ' V'], ['power to R', fmt(I * I * S.R, 1) + ' W'], ['power wasted in r', fmt(I * I * S.r, 1) + ' W']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. potential divider with a load ----------
  window.PhysiQSims.add('potdiv', function (root) {
    const { COL, fmt, el, slider, toggle, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { V: 12, x: 0.5, load: false, RL: 2, Rt: 1 }; // Rt = total rheostat resistance in kΩ
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'position of the sliding contact', 0, 1, 0.01, S.x, '', v => { S.x = v; draw(); });
    slider(ctl, 'load resistance', 0.2, 20, 0.2, S.RL, 'kΩ', v => { S.RL = v; draw(); });
    const tg = el('div', 'sm-row'); root.appendChild(tg);
    toggle(tg, 'Connect the load', S.load, v => { S.load = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 220, 300); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const R2 = S.Rt * S.x, R1 = S.Rt - R2, Rp = S.load && R2 > 0 ? (R2 * S.RL) / (R2 + S.RL) : R2, Vout = R1 + Rp > 0 ? S.V * Rp / (R1 + Rp) : 0, Vno = S.V * S.x;
      const x0 = 70, x1 = Math.min(w - 120, 380), yt = 40, yb = h - 40, yw = (yt + yb) / 2;
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(30, yt); ctx.lineTo(30, yb); ctx.moveTo(30, yt); ctx.lineTo(x0, yt); ctx.lineTo(x0, yw - 8); ctx.moveTo(30, yb); ctx.lineTo(x1, yb); ctx.lineTo(x1, yw + 8); ctx.stroke();
      ctx.fillStyle = '#F7F8F0'; ctx.fillRect(18, (yt + yb) / 2 - 4, 24, 8); ctx.fillStyle = COL.ink; ctx.fillRect(17, (yt + yb) / 2 - 4, 26, 2); ctx.fillRect(23, (yt + yb) / 2 + 2, 14, 4); text(ctx, S.V + ' V', 8, (yt + yb) / 2 - 10, { fs: 11, b: 1 });
      ctx.fillStyle = '#F4F1E6'; ctx.fillRect(x0, yw - 8, x1 - x0, 16); ctx.strokeRect(x0, yw - 8, x1 - x0, 16); text(ctx, 'A', x0 - 4, yw + 26, { b: 1, fs: 12 }); text(ctx, 'B (0 V)', x1 - 10, yw + 26, { b: 1, fs: 12 });
      const xs = x0 + (x1 - x0) * (1 - S.x); ctx.strokeStyle = COL.o; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(xs, yw - 30); ctx.lineTo(xs, yw - 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xs - 6, yw - 16); ctx.lineTo(xs, yw - 9); ctx.lineTo(xs + 6, yw - 16); ctx.stroke();
      const xo = x1 + 50; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(xs, yw - 30); ctx.lineTo(xo, yw - 30); ctx.moveTo(x1, yb); ctx.lineTo(xo, yb); ctx.stroke();
      if (S.load) { const ym = (yw - 30 + yb) / 2; ctx.beginPath(); ctx.moveTo(xo, yw - 30); ctx.lineTo(xo, ym - 18); ctx.moveTo(xo, ym + 18); ctx.lineTo(xo, yb); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(xo - 7, ym - 18, 14, 36); ctx.strokeRect(xo - 7, ym - 18, 14, 36); text(ctx, 'load', xo + 12, ym + 4, { fs: 11 }); }
      else { ctx.beginPath(); ctx.arc(xo, yw - 30, 3, 0, 7); ctx.arc(xo, yb, 3, 0, 7); ctx.fillStyle = COL.ink; ctx.fill(); }
      text(ctx, 'V_out = ' + fmt(Vout, 2) + ' V', xo - 30, yw - 40, { b: 1, fs: 13, c: COL.v });
      ro([['output (no load)', fmt(Vno, 2) + ' V'], ['output now', fmt(Vout, 2) + ' V', 'hl'], ['lower part of the rheostat', fmt(R2, 2) + ' kΩ (total 1 kΩ)'], ['load', S.load ? fmt(S.RL, 1) + ' kΩ, in parallel with the lower part' : 'not connected']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. potentiometer and metre bridge ----------
  window.PhysiQSims.add('bridge', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { m: 'pot', l: 30, e: 1.35, Vw: 2.0, R: 10, Rx: 6.2 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ms = [['pot', 'potentiometer: find ε'], ['mb', 'metre bridge: find Rx']];
    const chips = ms.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.m ? ' on' : ''), () => { S.m = k; chips.forEach(x => x.classList.toggle('on', x === b)); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'jockey position <i>l</i>', 1, 99, 0.5, S.l, 'cm', v => { S.l = v; draw(); });
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, 'New unknown', '', () => { S.e = +(0.6 + Math.random() * 1.2).toFixed(2); S.Rx = +(2 + Math.random() * 14).toFixed(1); draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.45, 220, 300); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 40, x1 = w - 40, yw = h * 0.42, X = l => x0 + (x1 - x0) * l / 100;
      // galvanometer current (relative): potentiometer: (V_AJ − ε); metre bridge: imbalance
      let g, bal;
      if (S.m === 'pot') { g = (S.Vw * S.l / 100 - S.e) * 8; bal = S.e / S.Vw * 100; }
      else { g = (S.l / (100 - S.l) - S.Rx / S.R) * 4; bal = 100 * S.Rx / (S.Rx + S.R); }
      g = Math.max(-1, Math.min(1, g));
      for (let i = 0; i <= 10; i++) { const x = X(i * 10); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, yw + 10); ctx.lineTo(x, yw + 16); ctx.stroke(); text(ctx, String(i * 10), x, yw + 28, { a: 'center', fs: 10, c: COL.sub }); }
      ctx.fillStyle = '#E9E2C9'; ctx.fillRect(x0, yw - 4, x1 - x0, 8); ctx.strokeStyle = COL.ink; ctx.strokeRect(x0, yw - 4, x1 - x0, 8); text(ctx, 'A', x0 - 14, yw + 4, { b: 1 }); text(ctx, 'B', x1 + 6, yw + 4, { b: 1 });
      const xj = X(S.l); ctx.strokeStyle = COL.o; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(xj, yw - 40); ctx.lineTo(xj, yw - 6); ctx.stroke(); text(ctx, 'J', xj + 6, yw - 30, { b: 1, c: COL.o });
      // galvanometer dial
      const gx = w / 2, gy = h * 0.74, gr = Math.min(44, h * 0.15); ctx.beginPath(); ctx.arc(gx, gy, gr, Math.PI, 0); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.4; ctx.stroke(); ctx.beginPath(); ctx.moveTo(gx - gr, gy); ctx.lineTo(gx + gr, gy); ctx.stroke();
      const a = -Math.PI / 2 + g * 1.1; ctx.strokeStyle = Math.abs(g) < 0.02 ? COL.gr : COL.r; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gr * 0.9 * Math.cos(a), gy + gr * 0.9 * Math.sin(a)); ctx.stroke(); text(ctx, 'G', gx, gy + 16, { a: 'center', b: 1 });
      text(ctx, Math.abs(g) < 0.02 ? 'balanced: no current in G' : 'not balanced', gx, gy + 34, { a: 'center', fs: 12, b: 1, c: Math.abs(g) < 0.02 ? COL.gr : COL.r });
      if (S.m === 'pot') { text(ctx, 'p.d. across AB = 2.00 V; unknown cell ε (hidden)', x0, 20, { fs: 11, c: COL.sub }); }
      else { text(ctx, 'R_x (hidden) in the left gap, R = 10.0 Ω in the right gap', x0, 20, { fs: 11, c: COL.sub }); }
      const done = Math.abs(g) < 0.02;
      ro(S.m === 'pot' ? [['balance length l', done ? fmt(S.l, 1) + ' cm' : '—', 'hl'], ['ε = (l/100) × 2.00 V', done ? fmt(S.l / 100 * 2, 2) + ' V' : 'find the balance first', 'hl'], ['hint', S.l < bal ? 'move J towards B' : 'move J towards A']]
        : [['balance length l₁', done ? fmt(S.l, 1) + ' cm' : '—', 'hl'], ['R_x = R l₁/(100 − l₁)', done ? fmt(S.R * S.l / (100 - S.l), 2) + ' Ω' : 'find the balance first', 'hl'], ['hint', S.l < bal ? 'move J towards B' : 'move J towards A']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
