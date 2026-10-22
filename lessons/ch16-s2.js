/* Semester 2 Chapter 16 Magnetic Fields: full notes by Cikgu Suhaili (from the Unit 6 Magnetic Field slides).
   App chapter 16 = STPM 2026 syllabus chapter 17. Ampère's law, the derivation of F = IlB sin θ, motion parallel to B,
   Thomson's experiment and the Hall-effect applications were written from the syllabus. Magnetic flux (in the slides)
   is in Chapter 17, where the syllabus puts it; torque on a coil is not in the 2026 syllabus and is left out. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, pq } = window.PhysiQLessons.H;
  const ms = 'm&#8239;s<sup>−1</sup>', mu0 = 'μ<sub>0</sub>';

  // ---------- small drawing helpers ----------
  const X = (x, y, r = 5, c = C.v) => `<path d="M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}" stroke="${c}" stroke-width="1.6"/>`;   // into the page
  const O = (x, y, r = 6, c = C.v) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${c}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`;   // out of the page
  const grid = (x0, y0, nx, ny, dx, dy, f = X, c) => { let s = ''; for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) s += f(x0 + i * dx, y0 + j * dy, 4.5, c || '#C3BEF7'); return s; };
  const chg = (x, y, s, c) => `<circle cx="${x}" cy="${y}" r="9" fill="${c || (s === '+' ? '#FBE3D6' : '#DCEBFA')}" stroke="${C.ink}" stroke-width="1.4"/>` + T(x, y + 4.5, s, { fs: 13, b: 1 });
  const arr = (x1, y1, x2, y2, c = 'r', w = 2.2) => L(x1, y1, x2, y2, c, 'e', { w });

  // ---------- figures ----------
  const F = {};
  F.lines = () => {
    let u = ''; for (let i = 0; i < 6; i++) u += L(20, 20 + i * 18, 200, 20 + i * 18, 'v', 'e', { w: 1.6 });
    let n = ''; for (let i = -3; i <= 3; i++) n += P(`M20,${70 + i * 7} Q110,${70 + i * 9} 200,${70 + i * 20}`, 'v', { w: 1.6, a: 'v' });
    return two(svg(220, 140, u + T(110, 132, 'uniform: parallel, equally spaced', { fs: 11, c: C.sub }), 220),
      svg(220, 140, n + T(110, 132, 'non-uniform: lines spread out', { fs: 11, c: C.sub }) + T(36, 50, 'stronger', { fs: 10.5, c: C.o, a: 'start' }) + T(150, 14, 'weaker', { fs: 10.5, c: C.o }), 220));
  };
  // bar magnet: lines traced from the N pole to the S pole through the field of two point poles (N on the right)
  F.bar = () => {
    const cx = 160, cy = 100, a = 40; let s = '';
    const field = (x, y) => { const f = (px, sg) => { const dx = x - px, dy = y - cy, r3 = Math.pow(dx * dx + dy * dy, 1.5) + 1e-9; return [sg * dx / r3, sg * dy / r3]; }; const n = f(cx + a, 1), q = f(cx - a, -1); return [n[0] + q[0], n[1] + q[1]]; };
    [24, 42, 62, 84, 108, 132].forEach(deg => [1, -1].forEach(sg => {
      const th = deg * Math.PI / 180; let x = cx + a + 6 * Math.cos(th), y = cy - sg * 6 * Math.sin(th), d = 'M' + x.toFixed(1) + ',' + y.toFixed(1), pts = [];
      for (let k = 0; k < 900; k++) { const [fx, fy] = field(x, y), m = Math.hypot(fx, fy); x += 2 * fx / m; y += 2 * fy / m; pts.push([x, y]); if (Math.hypot(x - cx + a, y - cy) < 6 || x < 0 || x > 320 || y < 0 || y > 200) break; }
      pts.forEach(p => { d += 'L' + p[0].toFixed(1) + ',' + p[1].toFixed(1); });
      s += P(d, 'v', { w: 1.3 });
      const m = pts[Math.floor(pts.length / 2)], m2 = pts[Math.floor(pts.length / 2) + 1];
      if (m && m2) { const ang = Math.atan2(m2[1] - m[1], m2[0] - m[0]) * 180 / Math.PI; s += `<path d="M-5,-4 L4,0 L-5,4 Z" fill="${C.v}" transform="translate(${m[0].toFixed(1)},${m[1].toFixed(1)}) rotate(${ang.toFixed(0)})"/>`; }
    }));
    s += L(cx + a + 12, cy, 312, cy, 'v', 'e', { w: 1.3 }) + L(8, cy, cx - a - 14, cy, 'v', 'e', { w: 1.3 });
    s += `<rect x="${cx - 52}" y="${cy - 12}" width="52" height="24" fill="#9FC3E8" stroke="${C.ink}" stroke-width="1.4"/><rect x="${cx}" y="${cy - 12}" width="52" height="24" fill="#F2A08A" stroke="${C.ink}" stroke-width="1.4"/>` + T(cx - 26, cy + 5, 'S', { fs: 14, b: 1 }) + T(cx + 26, cy + 5, 'N', { fs: 14, b: 1 });
    return svg(320, 200, s, 320);
  };
  F.like = () => {
    let s = ''; const cy = 70;
    s += `<rect x="20" y="${cy - 12}" width="40" height="24" fill="#9FC3E8" stroke="${C.ink}"/><rect x="60" y="${cy - 12}" width="40" height="24" fill="#F2A08A" stroke="${C.ink}"/>` + T(40, cy + 5, 'S', { fs: 12, b: 1 }) + T(80, cy + 5, 'N', { fs: 12, b: 1 });
    s += `<rect x="200" y="${cy - 12}" width="40" height="24" fill="#F2A08A" stroke="${C.ink}"/><rect x="240" y="${cy - 12}" width="40" height="24" fill="#9FC3E8" stroke="${C.ink}"/>` + T(220, cy + 5, 'N', { fs: 12, b: 1 }) + T(260, cy + 5, 'S', { fs: 12, b: 1 });
    [12, 26, 42].forEach(o => { s += P(`M100,${cy - 6} Q130,${cy - 8 - o} 140,${cy - 30 - o * 1.4}`, 'v', { w: 1.3, a: 'v' }) + P(`M200,${cy - 6} Q170,${cy - 8 - o} 160,${cy - 30 - o * 1.4}`, 'v', { w: 1.3, a: 'v' });
      s += P(`M100,${cy + 6} Q130,${cy + 8 + o} 140,${cy + 30 + o * 1.4}`, 'v', { w: 1.3, a: 'v' }) + P(`M200,${cy + 6} Q170,${cy + 8 + o} 160,${cy + 30 + o * 1.4}`, 'v', { w: 1.3, a: 'v' }); });
    s += L(100, cy, 136, cy, 'v', 'e', { w: 1.3 }) + L(200, cy, 164, cy, 'v', 'e', { w: 1.3 }) + `<circle cx="150" cy="${cy}" r="4" fill="${C.o}"/>` + `<rect x="112" y="${cy + 50}" width="76" height="30" fill="#F7F8F0"/>` + T(150, cy + 62, 'neutral point', { fs: 11, b: 1, c: C.o }) + T(150, cy + 76, 'B = 0', { fs: 11, it: 1, c: C.o });
    return svg(300, 160, s, 300);
  };
  F.symbols = () => two(svg(150, 110, grid(30, 22, 4, 3, 30, 28) + T(75, 104, 'B into the page (×)', { fs: 11, c: C.sub }), 150),
    svg(150, 110, grid(30, 22, 4, 3, 30, 28, O) + T(75, 104, 'B out of the page (•)', { fs: 11, c: C.sub }), 150));
  F.wire = () => {
    const cx = 90, cy = 80; let s = '';
    [22, 40, 58].forEach(r => { s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.v}" stroke-width="1.4"/><path d="M${cx + 5},${cy - r - 4} L${cx - 4},${cy - r} L${cx + 5},${cy - r + 4}" fill="${C.v}"/>`; });
    s += O(cx, cy, 8, C.r) + T(cx, cy + 76, 'top view, I out of the page', { fs: 10.5, c: C.sub }) + T(cx + 44, cy + 6, 'B', { fs: 12, it: 1, b: 1, c: C.v, a: 'start' });
    // side view: right-hand grip
    s += L(270, 140, 270, 20, 'r', 'e', { w: 3 }) + T(282, 30, 'I', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' });
    [60, 95].forEach(y => { s += `<ellipse cx="270" cy="${y}" rx="40" ry="10" fill="none" stroke="${C.v}" stroke-width="1.4"/>` + `<path d="M266,${y + 6} L274,${y + 10} L266,${y + 14}" fill="${C.v}"/>`; });
    s += T(270, 156, 'right-hand grip rule', { fs: 10.5, c: C.sub });
    return svg(360, 165, s, 360);
  };
  F.sol = () => {
    let s = '<rect x="70" y="40" width="180" height="60" fill="#F4F1E6" stroke="none"/>';
    for (let i = 0; i < 9; i++) s += `<ellipse cx="${80 + i * 20}" cy="70" rx="7" ry="32" fill="none" stroke="#B5651D" stroke-width="2"/>`;
    [56, 70, 84].forEach(y => { s += L(60, y, 268, y, 'v', 'e', { w: 1.4 }); });
    s += P('M268,56 C320,20 300,6 160,8 C30,10 0,30 60,56', 'v', { w: 1.3 }) + P('M268,84 C320,120 300,134 160,132 C30,130 0,110 60,84', 'v', { w: 1.3 }) + `<path d="M164,4 L156,8 L164,12" fill="${C.v}"/><path d="M164,128 L156,132 L164,136" fill="${C.v}"/>`;
    s += T(262, 112, 'N', { fs: 14, b: 1, c: C.r }) + T(58, 112, 'S', { fs: 14, b: 1, c: '#2C6BB3' }) + T(160, 152, 'inside: uniform, parallel to the axis', { fs: 11, c: C.sub });
    return svg(320, 160, s, 320);
  };
  F.flh = () => {
    const ox = 120, oy = 110; let s = '';
    s += arr(ox, oy, ox, oy - 80, 'o', 3) + T(ox, oy - 88, 'F (thumb)', { fs: 12, b: 1, c: C.o });
    s += arr(ox, oy, ox + 110, oy, 'v', 3) + T(ox + 116, oy + 5, 'B (first finger)', { fs: 12, b: 1, c: C.v, a: 'start' });
    s += arr(ox, oy, ox - 62, oy + 42, 'r', 3) + T(ox - 66, oy + 58, 'I or v of +q (second finger)', { fs: 12, b: 1, c: C.r, a: 'start' });
    s += `<path d="M${ox},${oy - 14} L${ox + 14},${oy - 14} L${ox + 14},${oy}" fill="none" stroke="${C.sub}"/>`;
    return svg(340, 175, s, 340);
  };
  F.ex21 = () => {
    const box = (title, inner) => svg(150, 130, `<rect x="6" y="6" width="138" height="104" rx="8" fill="#FAFAF5" stroke="${C.grid}"/>` + inner + T(75, 126, title, { fs: 12, b: 1 }), 150);
    return `<div class="ls-two" style="grid-template-columns:repeat(4,minmax(0,1fr))">` +
      box('(a)', grid(25, 25, 5, 4, 25, 25, X, '#B9B4F5') + chg(50, 62, '+') + arr(60, 62, 104, 62, 'r') + T(110, 58, 'v', { fs: 12, it: 1, b: 1, c: C.r, a: 'start' })) +
      box('(b)', grid(25, 25, 5, 4, 25, 25, X, '#B9B4F5') + chg(50, 62, '−') + arr(60, 62, 104, 62, 'r') + T(110, 58, 'v', { fs: 12, it: 1, b: 1, c: C.r, a: 'start' })) +
      box('(c)', grid(25, 25, 5, 4, 25, 25, O, '#B9B4F5') + chg(87, 90, '+') + arr(87, 80, 87, 34, 'r') + T(98, 40, 'v', { fs: 12, it: 1, b: 1, c: C.r, a: 'start' })) +
      box('(d) electron', arr(20, 96, 130, 96, 'v', 1.6) + arr(20, 20, 130, 20, 'v', 1.6) + T(132, 36, 'B', { fs: 12, it: 1, b: 1, c: C.v, a: 'end' }) + chg(75, 40, '−') + arr(75, 50, 75, 86, 'r') + T(84, 76, 'v', { fs: 12, it: 1, b: 1, c: C.r, a: 'start' })) + '</div>';
  };
  F.circle = () => {
    let s = grid(30, 24, 9, 6, 32, 30);
    const cx = 160, cy = 100, r = 62;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.o}" stroke-width="2" stroke-dasharray="6 4"/>`;
    s += chg(cx, cy + r, '+') + arr(cx + 10, cy + r, cx + 62, cy + r, 'r') + T(cx + 66, cy + r + 4, 'v', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + arr(cx, cy + r - 10, cx, cy + 14, 'o') + T(cx + 8, cy + 30, 'F = qvB', { fs: 12, it: 1, b: 1, c: C.o, a: 'start' });
    s += chg(cx + r, cy, '+') + arr(cx + r, cy - 10, cx + r, cy - 56, 'r') + arr(cx + r - 10, cy, cx + 20, cy, 'o') + L(cx, cy, cx - r * 0.7, cy - r * 0.7, 's', '', { w: 1.2, d: '4 3' }) + T(cx - 34, cy - 30, 'r', { fs: 13, it: 1, b: 1 });
    s += `<rect x="10" y="184" width="300" height="18" fill="#fff"/>` + T(160, 197, 'B into the page; a positive charge goes round anticlockwise', { fs: 11, c: C.sub });
    return svg(320, 204, s, 320);
  };
  F.cond = () => {
    let s = grid(26, 26, 9, 4, 32, 30);
    s += `<rect x="40" y="62" width="240" height="22" rx="11" fill="#F4F1E6" stroke="${C.ink}" stroke-width="1.4"/>`;
    [70, 110, 150, 190, 230].forEach(x => { s += chg(x, 73, '+'); });
    s += arr(250, 50, 300, 50, 'r') + T(304, 54, 'I', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + L(40, 100, 280, 100, 's', 'b', { w: 1 }) + `<rect x="20" y="118" width="290" height="18" fill="#fff"/>` + T(160, 131, 'length l, area A, n carriers per m³, drift velocity v', { fs: 11, c: C.sub }) + arr(110, 62, 110, 30, 'o') + T(118, 30, 'F', { fs: 13, it: 1, b: 1, c: C.o, a: 'start' });
    return svg(330, 140, s, 330);
  };
  F.ex31 = () => two(svg(150, 140, grid(25, 20, 5, 4, 25, 30) + `<rect x="70" y="8" width="10" height="120" rx="5" fill="#CDEBEA" stroke="${C.ink}"/>` + arr(75, 100, 75, 40, 'r') + T(88, 74, 'I', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + T(75, 138, '(a)', { fs: 12, b: 1 }), 150),
    svg(150, 140, grid(25, 20, 5, 4, 25, 30) + `<rect x="70" y="8" width="10" height="120" rx="5" fill="#CDEBEA" stroke="${C.ink}"/>` + arr(75, 40, 75, 100, 'r') + T(88, 74, 'I', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + T(75, 138, '(b)', { fs: 12, b: 1 }), 150));
  F.amp = () => {
    const cx = 120, cy = 80; let s = `<circle cx="${cx}" cy="${cy}" r="56" fill="none" stroke="${C.o}" stroke-width="2" stroke-dasharray="6 4"/>`;
    s += O(cx, cy, 8, C.r) + L(cx, cy, cx + 56, cy, 's', '', { w: 1.2 }) + T(cx + 28, cy - 6, 'r', { fs: 13, it: 1, b: 1 });
    s += arr(cx - 18, cy - 56, cx - 46, cy - 56 + 4, 'v') + T(cx - 52, cy - 64, 'B', { fs: 13, it: 1, b: 1, c: C.v }) + arr(cx + 46, cy + 34, cx + 26, cy + 50, 'g', 1.6) + T(cx + 62, cy + 44, 'dl', { fs: 12, it: 1, c: C.g });
    s += T(cx + 90, cy - 20, 'Amperian loop:', { fs: 11, b: 1, c: C.o, a: 'start' }) + T(cx + 90, cy - 4, 'a circle of radius r', { fs: 11, c: C.o, a: 'start' }) + T(cx + 90, cy + 12, 'centred on the wire', { fs: 11, c: C.o, a: 'start' });
    return svg(320, 160, s, 320);
  };
  F.ex41 = () => svg(300, 130, L(20, 70, 280, 70, 'k', '', { w: 3 }) + arr(200, 70, 250, 70, 'r') + T(250, 60, 'I = 5.0 A', { fs: 12, b: 1, c: C.r, a: 'end' }) + dot(120, 46, 4, C.v) + T(128, 42, 'X', { fs: 13, b: 1, a: 'start' }) + L(108, 46, 108, 70, 's', 'b', { w: 1 }) + T(102, 62, '2.0 cm', { fs: 11, c: C.sub, a: 'end' }) +
    dot(120, 124, 4, C.v) + T(128, 128, 'Y', { fs: 13, b: 1, a: 'start' }) + L(108, 70, 108, 124, 's', 'b', { w: 1 }) + T(102, 102, '6.0 cm', { fs: 11, c: C.sub, a: 'end' }), 300);
  F.par = () => {
    let s = `<rect x="70" y="10" width="10" height="150" rx="5" fill="#CDEBEA" stroke="${C.ink}"/><rect x="200" y="10" width="10" height="150" rx="5" fill="#CDEBEA" stroke="${C.ink}"/>`;
    s += arr(75, 120, 75, 40, 'r') + T(60, 40, 'I₁', { fs: 13, it: 1, b: 1, c: C.r }) + arr(205, 120, 205, 40, 'r') + T(222, 40, 'I₂', { fs: 13, it: 1, b: 1, c: C.r });
    s += X(205, 90, 6) + T(222, 96, 'B₁ (into)', { fs: 11, c: C.v, a: 'start' }) + O(75, 90, 6) + T(58, 96, 'B₂ (out)', { fs: 11, c: C.v, a: 'end' });
    s += arr(198, 74, 150, 74, 'o') + T(160, 66, 'F', { fs: 13, it: 1, b: 1, c: C.o }) + arr(82, 74, 130, 74, 'o') + T(120, 66, 'F', { fs: 13, it: 1, b: 1, c: C.o });
    s += L(75, 150, 205, 150, 's', 'b', { w: 1 }) + T(140, 146, 'd', { fs: 13, it: 1 }) + T(140, 176, 'currents in the same direction attract', { fs: 11, c: C.sub });
    return svg(300, 185, s, 300);
  };
  F.sel = () => {
    let s = `<rect x="80" y="28" width="170" height="8" fill="#F2A08A" stroke="${C.ink}"/><rect x="80" y="124" width="170" height="8" fill="#9FC3E8" stroke="${C.ink}"/>` + T(165, 22, '+ + + + + + +', { fs: 12, b: 1, c: C.r }) + T(165, 148, '− − − − − − −', { fs: 12, b: 1, c: '#2C6BB3' });
    s += grid(96, 50, 6, 2, 28, 60);
    s += L(20, 80, 300, 80, 'g', '', { w: 2 }) + chg(46, 80, '+') + arr(56, 80, 80, 80, 'r') + T(66, 72, 'v', { fs: 12, it: 1, b: 1, c: C.r });
    s += arr(170, 80, 170, 114, 'o') + `<rect x="104" y="98" width="60" height="16" fill="#fff"/>` + T(162, 110, 'F_E = qE', { fs: 11.5, it: 1, b: 1, c: C.o, a: 'end' }) + arr(170, 80, 170, 46, 'v') + `<rect x="98" y="46" width="66" height="16" fill="#fff"/>` + T(162, 58, 'F_B = qvB', { fs: 11.5, it: 1, b: 1, c: C.v, a: 'end' });
    s += P('M80,80 Q160,80 250,40', 'r', { w: 1.4, d: '4 3' }) + T(256, 40, 'too fast', { fs: 10.5, c: C.r, a: 'start' }) + P('M80,80 Q160,80 250,118', 'r', { w: 1.4, d: '4 3' }) + T(256, 122, 'too slow', { fs: 10.5, c: C.r, a: 'start' }) + T(304, 84, 'v = E/B', { fs: 11, b: 1, c: C.g, a: 'end' });
    return svg(320, 160, s, 320);
  };
  F.thom = () => {
    let s = `<path d="M20,70 Q20,40 60,40 L200,40 L300,20 L300,140 L200,120 L60,120 Q20,120 20,90 Z" fill="#F4F6FB" stroke="${C.ink}" stroke-width="1.4"/>`;
    s += `<rect x="30" y="68" width="12" height="24" fill="#555"/>` + T(36, 108, 'C', { fs: 12, b: 1 }) + `<rect x="70" y="50" width="6" height="25" fill="${C.ink}"/><rect x="70" y="85" width="6" height="25" fill="${C.ink}"/>` + T(73, 126, 'A', { fs: 12, b: 1 });
    s += `<rect x="120" y="54" width="70" height="5" fill="#F2A08A" stroke="${C.ink}"/><rect x="120" y="101" width="70" height="5" fill="#9FC3E8" stroke="${C.ink}"/>` + grid(128, 68, 4, 2, 18, 24, (x, y) => X(x, y, 3.5));
    s += L(42, 80, 300, 80, 'g', '', { w: 2 }) + P('M190,80 Q250,80 300,40', 'r', { w: 1.3, d: '4 3' }) + T(296, 36, 'E only', { fs: 10, c: C.r, a: 'end' });
    s += `<rect x="296" y="20" width="6" height="120" fill="#D5DC3B" stroke="${C.ink}"/>` + T(299, 154, 'screen', { fs: 11, c: C.sub }) + T(155, 152, 'plates P and Q, coils give B into the page', { fs: 10.5, c: C.sub });
    s += T(30, 30, 'cathode C (heated), anode A', { fs: 10.5, c: C.sub, a: 'start' });
    return svg(320, 162, s, 320);
  };
  F.hall = () => {
    let s = `<rect x="40" y="40" width="240" height="90" fill="#EEF3DA" stroke="${C.ink}" stroke-width="1.6"/>` + grid(60, 56, 8, 3, 29, 28, (x, y) => X(x, y, 3.5, '#9A93F0'));
    for (let i = 0; i < 9; i++) s += T(56 + i * 27, 36, '−', { fs: 14, b: 1, c: '#2C6BB3' }) + T(56 + i * 27, 146, '+', { fs: 14, b: 1, c: C.r });
    s += arr(6, 85, 38, 85, 'r') + T(8, 78, 'I', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + arr(282, 85, 314, 85, 'r');
    s += chg(180, 90, '−') + arr(170, 90, 132, 90, 'r', 1.8) + T(140, 104, 'v', { fs: 12, it: 1, b: 1, c: C.r }) + arr(180, 80, 180, 52, 'o', 1.8) + `<rect x="186" y="50" width="54" height="16" fill="#EEF3DA"/>` + T(188, 62, 'F = evB', { fs: 11.5, it: 1, b: 1, c: C.o, a: 'start' });
    s += L(296, 40, 296, 130, 's', 'b', { w: 1 }) + T(302, 64, 'd', { fs: 13, it: 1, a: 'start' }) + T(160, 168, 'top view: B into the page; t = thickness along B', { fs: 11, c: C.sub }) + `<circle cx="30" cy="150" r="0"/>`;
    s += T(312, 40, 'V_H', { fs: 12, it: 1, b: 1, c: C.g, a: 'end' });
    return svg(320, 176, s, 320);
  };

  const S = `
${sec('16-1', '16.1 Magnetic field', `
${def('Magnetic field', `a ${red('region of space where a magnetic force is experienced')} by a magnetic material, a current-carrying conductor or a moving charge. It is a field of force produced by ${red('permanent magnets or by current-carrying conductors')}.`)}
${ul([`A magnet has two poles, north (N) and south (S). <b>Like poles repel, unlike poles attract.</b>`, `The direction of the field at a point is the direction in which the <b>north pole of a compass needle</b> points when placed there.`, `Field patterns are shown with iron filings or a plotting compass.`])}
${h4('Magnetic field lines')}
${ul([`Field lines go <b>from N to S outside</b> a magnet (and S to N inside it), so they form closed loops.`, `The tangent to a line at a point gives the direction of the field there.`, `Field lines <b>never cross</b> (the field has only one direction at each point).`, `The closer the lines, the stronger the field: the number of lines per unit area is proportional to the field strength.`])}
${fig(F.lines(), 'Figure 16.1: a uniform field and a non-uniform field.')}
${fig(F.symbols(), 'Figure 16.2: a field perpendicular to the page.')}
${h4('Field patterns')}
${two(fig(F.bar(), 'Figure 16.3: a bar magnet.'), fig(F.like(), 'Figure 16.4: two like poles facing each other. At the neutral point the two fields cancel.'))}
${two(fig(F.wire(), 'Figure 16.5: a long straight wire: concentric circles. Right-hand grip rule.'), fig(F.sol(), 'Figure 16.6: a solenoid: like a bar magnet outside, uniform inside.'))}
${ul([`<b>Long straight wire</b>: concentric circles centred on the wire, further apart away from the wire (weaker field). Direction: <b>right-hand grip rule</b>, thumb along the current, fingers curl in the direction of B.`, `<b>Flat circular coil</b>: near the centre the lines are almost straight and perpendicular to the coil; the coil behaves like a short magnet.`, `<b>Solenoid</b>: outside, like a bar magnet; inside, the field is <b>uniform</b> and parallel to the axis. The end where the current flows anticlockwise (seen from outside) is a north pole.`, `The <b>Earth</b> has a field like a large bar magnet whose south pole is near the geographic north pole, so a compass needle points north.`])}
${tip(`Magnetic flux Φ = <b>B</b>·<b>A</b> is in Chapter 17 (electromagnetic induction), where the STPM syllabus puts it.`)}
`)}

${sec('16-2', '16.2 Force on a moving charge', `
<p>A charge <i>q</i> moving with velocity <b>v</b> in a magnetic field <b>B</b> feels a force that is <b>perpendicular to both v and B</b>.</p>
${key(`<b>F</b> = <i>q</i><b>v</b> × <b>B</b> &nbsp;&nbsp;&nbsp; <i>F</i> = <i>qvB</i> sin θ`, 'θ = angle between v and B')}
${def('Magnetic flux density, <i>B</i>', `defined by <i>F</i> = <i>qvB</i> sin θ: <i>B</i> = ${fr('<i>F</i>', '<i>qv</i> sin θ')}. One tesla is the flux density in which ${red('a charge of 1 C moving at 1 m s<sup>−1</sup> perpendicular to the field feels a force of 1 N')}.`)}
${ul([`Unit: tesla (T) = N A<sup>−1</sup> m<sup>−1</sup> = Wb m<sup>−2</sup>. B is a vector, along the field lines.`, `<i>F</i> = 0 when the charge is at rest (<i>v</i> = 0) or moves parallel to B (θ = 0° or 180°).`, `<i>F</i> is greatest, <i>qvB</i>, when the charge moves perpendicular to B.`])}
${h4('Direction: Fleming\'s left-hand rule')}
${fig(F.flh(), 'Figure 16.7: Fleming\'s left-hand rule. For a positive charge the second finger points along v; for a negative charge (electron) it points opposite to v.')}
${tip(`Some notes use the <b>right</b> hand for a negative charge. It gives the same answer, but it is easy to mix up with Fleming's right-hand rule for induction in Chapter 17. Safer: always use the left hand, with the second finger along the <b>conventional current</b> (opposite to the velocity of an electron).`)}
${example('16.2.1', `Find the direction of the magnetic force on the charge in each case.`, steps([`(a) +<i>q</i> moving right, B into the page: <b>upwards</b> (towards the top of the page).`, `(b) −<i>q</i> moving right, B into the page: the force is opposite to (a), <b>downwards</b>.`, `(c) +<i>q</i> moving up, B out of the page: <b>to the right</b>.`, `(d) electron moving down, B to the right: for a positive charge it would be out of the page, so for the electron <b>into the page</b>.`]), fig(F.ex21()))}
${example('16.2.2', `A proton travels at 3.1 × 10<sup>7</sup> ${ms} in a uniform field of 1.6 T. Find the force on it if its velocity (a) is perpendicular to the field, (b) makes 60° with the field. (<i>e</i> = 1.60 × 10<sup>−19</sup> C)`,
  steps([`(a) <i>F</i> = <i>qvB</i> = (1.60 × 10<sup>−19</sup>)(3.1 × 10<sup>7</sup>)(1.6) = <b>7.9 × 10<sup>−12</sup> N</b>`, `(b) <i>F</i> = <i>qvB</i> sin 60° = (7.94 × 10<sup>−12</sup>)(0.866) = <b>6.9 × 10<sup>−12</sup> N</b>`]))}
${example('16.2.3', `A charge <i>q</i><sub>1</sub> = 25.0 μC moves at 4.5 × 10<sup>3</sup> ${ms} perpendicular to a uniform field and feels a force of 7.31 × 10<sup>−3</sup> N. A second charge <i>q</i><sub>2</sub> = 5.00 μC moves at 40.0° to the same field and feels 1.90 × 10<sup>−3</sup> N. Find (a) <i>B</i>, (b) the speed of <i>q</i><sub>2</sub>.`,
  steps([`(a) <i>B</i> = ${fr('<i>F</i><sub>1</sub>', '<i>q</i><sub>1</sub><i>v</i><sub>1</sub>')} = ${fr('7.31 × 10<sup>−3</sup>', '(25.0 × 10<sup>−6</sup>)(4.5 × 10<sup>3</sup>)')} = <b>6.50 × 10<sup>−2</sup> T</b>`, `(b) <i>v</i><sub>2</sub> = ${fr('<i>F</i><sub>2</sub>', '<i>q</i><sub>2</sub><i>B</i> sin 40.0°')} = ${fr('1.90 × 10<sup>−3</sup>', '(5.00 × 10<sup>−6</sup>)(6.50 × 10<sup>−2</sup>)(0.643)')} = <b>9.10 × 10<sup>3</sup> ${ms}</b>`]))}
${example('16.2.4', `An electron moves from left to right at 2.0 × 10<sup>6</sup> ${ms} into a field of 3.0 T directed vertically downwards (in the plane of the page). Find the magnitude and direction of the force on it.`,
  steps([`<i>F</i> = <i>evB</i> = (1.60 × 10<sup>−19</sup>)(2.0 × 10<sup>6</sup>)(3.0) = <b>9.6 × 10<sup>−13</sup> N</b>`, `For a positive charge the force would be into the page, so on the electron it is <b>out of the page</b>.`]))}

${h4('Motion parallel to the field')}
<p>If <b>v</b> is parallel (or antiparallel) to <b>B</b>, sin θ = 0, so ${red('there is no magnetic force')}. The charge carries on in a <b>straight line at constant speed</b>.</p>
${h4('Motion perpendicular to the field')}
${steps([`The force is always perpendicular to the velocity, so it does <b>no work</b>: the speed and kinetic energy stay constant, only the direction changes.`, `A force of constant size always perpendicular to the velocity gives <b>uniform circular motion</b>. The magnetic force provides the centripetal force:`])}
${fig(F.circle(), 'Figure 16.8: circular motion of a charge in a uniform magnetic field.')}
${eq(`<i>qvB</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')} &nbsp;⇒&nbsp; <i>r</i> = ${fr('<i>mv</i>', '<i>qB</i>')} &nbsp;&nbsp;&nbsp; <i>T</i> = ${fr('2π<i>r</i>', '<i>v</i>')} = ${fr('2π<i>m</i>', '<i>qB</i>')} &nbsp;&nbsp;&nbsp; <i>f</i> = ${fr('<i>qB</i>', '2π<i>m</i>')}`)}
${ul([`A faster particle moves in a <b>larger</b> circle, but the <b>period does not depend on the speed</b>.`, `A positive and a negative charge with the same speed curve in opposite directions.`])}
${tip(`If v makes any other angle with B, the component of v along B is unchanged and the perpendicular component goes round in a circle, so the path is a helix (a spiral along B).`)}
${sim('qinb', 'A charge in a uniform magnetic field', 'Choose the sign of the charge, its speed and the flux density. Perpendicular to B it moves in a circle: watch the radius change with v and B while the time for one turn depends only on B. Then switch to "parallel to B".')}
${example('16.2.5', `A proton moves at 3.0 × 10<sup>5</sup> ${ms} perpendicular to a field of 0.020 T. Find (a) its kinetic energy, (b) the magnetic force on it, (c) the radius of its path, (d) the period. (<i>m</i><sub>p</sub> = 1.67 × 10<sup>−27</sup> kg)`,
  steps([`(a) <i>K</i> = ½<i>mv</i><sup>2</sup> = ½(1.67 × 10<sup>−27</sup>)(3.0 × 10<sup>5</sup>)<sup>2</sup> = <b>7.5 × 10<sup>−17</sup> J</b>`, `(b) <i>F</i> = <i>qvB</i> = (1.60 × 10<sup>−19</sup>)(3.0 × 10<sup>5</sup>)(0.020) = <b>9.6 × 10<sup>−16</sup> N</b>`, `(c) <i>r</i> = ${fr('<i>mv</i>', '<i>qB</i>')} = ${fr('(1.67 × 10<sup>−27</sup>)(3.0 × 10<sup>5</sup>)', '(1.60 × 10<sup>−19</sup>)(0.020)')} = <b>0.16 m</b>`, `(d) <i>T</i> = ${fr('2π<i>m</i>', '<i>qB</i>')} = ${fr('2π(1.67 × 10<sup>−27</sup>)', '(1.60 × 10<sup>−19</sup>)(0.020)')} = <b>3.3 × 10<sup>−6</sup> s</b>`]))}
${exercises('Exercise: force on a moving charge', [
  { q: `An electron enters a uniform field of 0.50 mT at 4.0 × 10<sup>6</sup> ${ms}, perpendicular to the field. Find the radius of its path. (<i>m</i><sub>e</sub> = 9.11 × 10<sup>−31</sup> kg)`, a: `<i>r</i> = <i>mv</i>/(<i>eB</i>) = <b>4.6 cm</b>` },
  { q: `Explain why a magnetic field cannot change the kinetic energy of a moving charge.`, a: `The force is always perpendicular to the velocity, so it does no work. It changes the direction of motion but not the speed.` },
  { q: `A proton and an alpha particle (charge 2<i>e</i>, mass 4<i>m</i>) enter the same field perpendicular to it with the same speed. Find the ratio of the radii <i>r</i><sub>α</sub> : <i>r</i><sub>p</sub>.`, a: `<i>r</i> ∝ <i>m</i>/<i>q</i>: (4/2) : 1 = <b>2 : 1</b>` }])}
`)}

${sec('16-3', '16.3 Force on a current-carrying conductor', `
<p>A current is a stream of moving charges. Each charge feels a force <i>qvB</i> sin θ, and the forces on all the charges in the wire add up to a force on the wire.</p>
${fig(F.cond(), 'Figure 16.9: a length l of wire in a uniform field.')}
${h4('Deriving F = IlB sin θ')}
${steps([`Number of carriers in the length <i>l</i>: <i>N</i> = <i>nAl</i>.`, `Force on each carrier: <i>qvB</i> sin θ, so the total force is <i>F</i> = (<i>nAl</i>)<i>qvB</i> sin θ.`, `The current is <i>I</i> = <i>nAvq</i> (Chapter 14), so <i>F</i> = (<i>nAvq</i>)<i>lB</i> sin θ:`])}
${key(`<i>F</i> = <i>IlB</i> sin θ &nbsp;&nbsp;&nbsp; <b>F</b> = <i>I</i><b>l</b> × <b>B</b>`, 'θ = angle between the wire (current) and B. F = 0 when the wire is parallel to B; F = IlB when perpendicular.')}
${ul([`Direction: <b>Fleming's left-hand rule</b> with the second finger along the current.`, `This is the principle of the electric motor and the moving-coil meter.`])}
${example('16.3.1', `A vertical wire is in a uniform field directed into the page. Find the direction of the force on it when the current flows (a) upwards, (b) downwards.`, steps([`(a) <b>to the left</b> &nbsp;&nbsp; (b) <b>to the right</b> (reversing the current reverses the force)`]), fig(F.ex31()))}
${example('16.3.2', `A wire 0.655 m long carries 21.0 A in a 0.470 T field and feels a force of 5.46 N. Find the angle (less than 90°) between the wire and the field.`,
  steps([`sin θ = ${fr('<i>F</i>', '<i>IlB</i>')} = ${fr('5.46', '(21.0)(0.655)(0.470)')} = 0.845`, `θ = <b>57.6°</b>`]))}
${example('16.3.3', `A square loop of side 0.32 m carries 12 A. It lies in the plane of a uniform 0.25 T field, with two sides perpendicular to the field and two sides parallel to it. Find the force on each side.`,
  steps([`Sides perpendicular to B: <i>F</i> = <i>IlB</i> = (12)(0.32)(0.25) = <b>0.96 N</b> each (in opposite directions)`, `Sides parallel to B: sin 0° = 0, so <b>no force</b>.`]))}
`)}

${sec('16-4', '16.4 Magnetic fields due to currents', `
${def("Ampère's law", `the ${red('line integral of B around any closed loop is equal to μ<sub>0</sub> times the current enclosed by the loop')}.`)}
${key(`∮ <b>B</b> · d<b>l</b> = ${mu0}<i>I</i>`, `${mu0} = permeability of free space = 4π × 10<sup>−7</sup> H m<sup>−1</sup> (T m A<sup>−1</sup>)`)}
${h4("Applying Ampère's law to a long straight wire")}
${fig(F.amp(), 'Figure 16.10: a circular Amperian loop around a long straight wire.')}
${steps([`Choose a circle of radius <i>r</i> centred on the wire, in a plane perpendicular to it.`, `By symmetry <i>B</i> has the same size at every point on the circle and is tangential, so it is parallel to d<b>l</b> everywhere: <b>B</b>·d<b>l</b> = <i>B</i> d<i>l</i>.`, `∮ <i>B</i> d<i>l</i> = <i>B</i>(2π<i>r</i>) = ${mu0}<i>I</i>`])}
${key(`<i>B</i> = ${fr(`${mu0}<i>I</i>`, '2π<i>r</i>')}`, 'long straight wire; B ∝ 1/r')}
${h4('Circular coil and solenoid')}
${table(['Conductor', 'Flux density', 'Notes'], [['Long straight wire', `<i>B</i> = ${fr(`${mu0}<i>I</i>`, '2π<i>r</i>')}`, '<i>r</i> = perpendicular distance from the wire'], ['Flat circular coil, at its centre', `<i>B</i> = ${fr(`${mu0}<i>NI</i>`, '2<i>r</i>')}`, '<i>N</i> turns of radius <i>r</i>'], ['Long solenoid, inside', `<i>B</i> = ${mu0}<i>nI</i>`, `<i>n</i> = ${fr('<i>N</i>', '<i>L</i>')} = turns per unit length`]])}
${note(`With a core of relative permeability μ<sub>r</sub>, replace μ<sub>0</sub> by μ = μ<sub>r</sub>μ<sub>0</sub>. A soft iron core makes the field of a solenoid much stronger.`)}
${example('16.4.1', `A long straight wire carries 5.0 A to the right. Point X is 2.0 cm above the wire and point Y is 6.0 cm below it. Find the flux density at X and at Y.`,
  steps([`<i>B</i><sub>X</sub> = ${fr('(4π × 10<sup>−7</sup>)(5.0)', '2π(0.020)')} = <b>5.0 × 10<sup>−5</sup> T, out of the page</b>`, `<i>B</i><sub>Y</sub> = ${fr('(4π × 10<sup>−7</sup>)(5.0)', '2π(0.060)')} = <b>1.7 × 10<sup>−5</sup> T, into the page</b> (right-hand grip rule)`]), fig(F.ex41()))}
${example('16.4.2', `A flat circular coil of 40 turns and radius 6.0 cm is in air. What current gives a flux density of 2.0 mT at its centre?`,
  steps([`<i>I</i> = ${fr('2<i>rB</i>', `${mu0}<i>N</i>`)} = ${fr('2(0.060)(2.0 × 10<sup>−3</sup>)', '(4π × 10<sup>−7</sup>)(40)')} = <b>4.8 A</b>`]))}
${example('16.4.3', `An air-cored solenoid has 2000 turns, length 60 cm and diameter 2.0 cm. Find the flux density inside it when the current is 5.0 A.`,
  steps([`<i>B</i> = ${mu0}${fr('<i>N</i>', '<i>L</i>')}<i>I</i> = (4π × 10<sup>−7</sup>)${fr('2000', '0.60')}(5.0) = <b>0.021 T</b> &nbsp;(the diameter is not needed)`]))}
${example('16.4.4', `A solenoid of 400 turns is wound on an iron core 20 cm long with relative permeability 13 000. What current gives 0.50 T at its centre?`,
  steps([`μ = μ<sub>r</sub>μ<sub>0</sub> = (13 000)(4π × 10<sup>−7</sup>) = 1.63 × 10<sup>−2</sup> H m<sup>−1</sup>`, `<i>I</i> = ${fr('<i>BL</i>', 'μ<i>N</i>')} = ${fr('(0.50)(0.20)', '(1.63 × 10<sup>−2</sup>)(400)')} = <b>0.015 A</b>`]))}
${exercises('Exercise: fields due to currents', [
  { q: `Two long straight parallel wires are 30 cm apart and each carries 20 A. Find the flux density at a point between them, in their plane, 10 cm from one wire and 20 cm from the other, when the currents are (a) in the same direction, (b) in opposite directions.`, a: `The fields of the wires are 4.0 × 10<sup>−5</sup> T and 2.0 × 10<sup>−5</sup> T. (a) They are opposite: <b>2.0 × 10<sup>−5</sup> T</b>, in the direction of the nearer wire's field. (b) They add: <b>6.0 × 10<sup>−5</sup> T</b>. Both perpendicular to the plane of the wires.` },
  { q: `How far from a long straight wire carrying 12 A is the flux density 3.0 × 10<sup>−5</sup> T?`, a: `<i>r</i> = ${mu0}<i>I</i>/(2π<i>B</i>) = <b>8.0 cm</b>` }])}
`)}

${sec('16-5', '16.5 Force between two current-carrying conductors', `
${fig(F.par(), 'Figure 16.11: two long parallel wires a distance d apart.')}
${h4('Derivation')}
${steps([`Wire 1 produces a field at wire 2: <i>B</i><sub>1</sub> = ${fr(`${mu0}<i>I</i><sub>1</sub>`, '2π<i>d</i>')}, perpendicular to wire 2.`, `A length <i>l</i> of wire 2 feels <i>F</i> = <i>B</i><sub>1</sub><i>I</i><sub>2</sub><i>l</i> sin 90°.`, `So <i>F</i> = ${fr(`${mu0}<i>I</i><sub>1</sub><i>I</i><sub>2</sub><i>l</i>`, '2π<i>d</i>')}. Working the other way (field of wire 2 at wire 1) gives a force of the same size on wire 1, in the opposite direction (Newton's third law).`])}
${key(`<i>F</i> = ${fr(`${mu0}<i>I</i><sub>1</sub><i>I</i><sub>2</sub><i>l</i>`, '2π<i>d</i>')} &nbsp;&nbsp;&nbsp; ${fr('<i>F</i>', '<i>l</i>')} = ${fr(`${mu0}<i>I</i><sub>1</sub><i>I</i><sub>2</sub>`, '2π<i>d</i>')}`, `currents in the <b>same direction attract</b>; in <b>opposite directions repel</b>`)}
${ul([`With <i>I</i><sub>1</sub> = <i>I</i><sub>2</sub> = 1 A and <i>d</i> = 1 m: <i>F</i>/<i>l</i> = 2 × 10<sup>−7</sup> N m<sup>−1</sup>. This was used to define the ampere: the constant current which, in each of two infinitely long, straight, parallel conductors of negligible cross-section 1 m apart in a vacuum, gives a force of 2 × 10<sup>−7</sup> N per metre of length.`])}
${tip(`Since 2019 the SI defines the ampere by fixing the value of the elementary charge, but this result is still true and is a favourite exam question.`)}
${sim('wires', 'Two parallel currents', 'Change the size and direction of each current and the separation. See the field of each wire at the other one and the forces: same direction attract, opposite directions repel. The forces are always equal and opposite.')}
${example('16.5.1', `Two long parallel wires 2.0 cm apart in air carry 8.0 A and 10 A. Find the force on each metre of wire.`,
  steps([`${fr('<i>F</i>', '<i>l</i>')} = ${fr('(4π × 10<sup>−7</sup>)(8.0)(10)', '2π(0.020)')} = <b>8.0 × 10<sup>−4</sup> N m<sup>−1</sup></b>`]))}
${example('16.5.2', `Two long parallel wires 5.0 cm apart attract each other with a force of 6.0 × 10<sup>−7</sup> N per metre. One carries 400 mA. Find (a) the current in the other, (b) its direction relative to the first.`,
  steps([`(a) <i>I</i><sub>2</sub> = ${fr('(<i>F</i>/<i>l</i>)(2π<i>d</i>)', `${mu0}<i>I</i><sub>1</sub>`)} = ${fr('(6.0 × 10<sup>−7</sup>)(2π)(0.050)', '(4π × 10<sup>−7</sup>)(0.400)')} = <b>0.375 A</b>`, `(b) They attract, so the currents are in the <b>same direction</b>.`]))}
`)}

${sec('16-6', '16.6 Determination of the ratio e/m', `
${h4('Crossed electric and magnetic fields')}
<p>When <b>E</b>, <b>B</b> and <b>v</b> are perpendicular to each other, the electric and magnetic forces on a charge are in opposite directions. If they are equal, the resultant force is zero and the charge goes <b>straight through, undeflected</b>.</p>
${eq(`<i>qE</i> = <i>qvB</i> &nbsp;⇒&nbsp; <i>v</i> = ${fr('<i>E</i>', '<i>B</i>')}`)}
${fig(F.sel(), 'Figure 16.12: a velocity selector. Only particles with v = E/B pass straight through; the result does not depend on q or m.')}
${ul([`Faster particles: <i>qvB</i> > <i>qE</i>, they bend towards the magnetic force. Slower particles bend towards the electric force.`, `This arrangement is a <b>velocity selector</b> (used, for example, before the magnetic field of a mass spectrometer).`])}
${h4("Thomson's experiment")}
${fig(F.thom(), "Figure 16.13: Thomson's apparatus (simplified).")}
${steps([`Electrons from a heated cathode C are accelerated to the anode A and pass through it as a narrow beam.`, `Between plates P and Q there is an electric field <i>E</i>; coils outside the tube give a magnetic field <i>B</i> at right angles to it and to the beam.`, `<i>E</i> (or <i>B</i>) is adjusted until the beam is <b>undeflected</b>: then <i>eE</i> = <i>evB</i>, so the speed is <i>v</i> = ${fr('<i>E</i>', '<i>B</i>')}.`, `The electric field is switched off. In the magnetic field alone the beam moves in a circular arc of radius <i>r</i>, found from the deflection on the screen.`, `The magnetic force provides the centripetal force: <i>evB</i> = ${fr('<i>mv</i><sup>2</sup>', '<i>r</i>')}, so ${fr('<i>e</i>', '<i>m</i>')} = ${fr('<i>v</i>', '<i>Br</i>')}. Substituting <i>v</i> = <i>E</i>/<i>B</i>:`])}
${key(`${fr('<i>e</i>', '<i>m</i>')} = ${fr('<i>E</i>', '<i>B</i><sup>2</sup><i>r</i>')}`, 'Thomson found the same e/m for any cathode material: electrons are part of every atom. Accepted value 1.76 × 10<sup>11</sup> C kg<sup>−1</sup>.')}
${sim('selector', "Crossed fields and Thomson's e/m", 'Fire electrons through the plates. Adjust E and B until the beam goes straight through (v = E/B). Then switch off E: the beam bends into a circle, and its radius gives e/m.')}
${example('16.6.1', `Protons pass undeflected through crossed fields with <i>E</i> = 3.0 × 10<sup>5</sup> V m<sup>−1</sup> and <i>B</i> = 0.25 T. Find their speed.`, steps([`<i>v</i> = ${fr('<i>E</i>', '<i>B</i>')} = ${fr('3.0 × 10<sup>5</sup>', '0.25')} = <b>1.2 × 10<sup>6</sup> ${ms}</b>`]))}
${example('16.6.2', `A velocity selector must let positive ions moving to the right at 6.0 km s<sup>−1</sup> through undeflected. The electric field is 300 V m<sup>−1</sup> into the page. Find the size and direction of the magnetic field.`,
  steps([`<i>B</i> = ${fr('<i>E</i>', '<i>v</i>')} = ${fr('300', '6.0 × 10<sup>3</sup>')} = <b>0.050 T</b>`, `The electric force on the ions is into the page, so the magnetic force must be out of the page. By Fleming's left-hand rule (second finger to the right, thumb out of the page) B points <b>up the page</b>.`]))}
${example('16.6.3', `In a Thomson experiment the beam is undeflected with <i>E</i> = 2.0 × 10<sup>4</sup> V m<sup>−1</sup> and <i>B</i> = 1.0 mT. With the electric field switched off, the beam moves in an arc of radius 11.4 cm. Find (a) the speed of the electrons, (b) e/m.`,
  steps([`(a) <i>v</i> = ${fr('<i>E</i>', '<i>B</i>')} = ${fr('2.0 × 10<sup>4</sup>', '1.0 × 10<sup>−3</sup>')} = <b>2.0 × 10<sup>7</sup> ${ms}</b>`, `(b) ${fr('<i>e</i>', '<i>m</i>')} = ${fr('<i>E</i>', '<i>B</i><sup>2</sup><i>r</i>')} = ${fr('2.0 × 10<sup>4</sup>', '(1.0 × 10<sup>−3</sup>)<sup>2</sup>(0.114)')} = <b>1.75 × 10<sup>11</sup> C kg<sup>−1</sup></b>`]))}
${h4('A real use: the mass spectrometer')}
${steps([`Atoms of the sample are <b>ionised</b> (given the same charge, usually +<i>e</i>) and accelerated into a beam.`, `A <b>velocity selector</b> (crossed <i>E</i> and <i>B</i><sub>1</sub>) lets through only ions with <i>v</i> = <i>E</i>/<i>B</i><sub>1</sub>, so all ions leave it with the same speed.`, `In a second field <i>B</i><sub>2</sub> alone, each ion moves in a semicircle of radius <i>r</i> = <i>mv</i>/(<i>qB</i><sub>2</sub>) ∝ <i>m</i>: heavier ions make bigger circles and land further along the detector.`, `So the detector separates <b>isotopes</b> (same charge, different mass). It is used to date rocks and fossils (carbon-14), test for drugs in sport and check the purity of chemicals.`])}
${sim('massspec', 'Mass spectrometer', 'Choose an element and watch its isotopes leave the velocity selector at the same speed and then separate in the magnetic field B₂. Change B₂: a stronger field makes smaller circles and brings the isotopes closer together on the detector.')}
${example('16.6.4', `Singly charged neon ions leave a velocity selector at 1.0 × 10<sup>5</sup> ${ms} and enter a field <i>B</i><sub>2</sub> = 0.50 T. Find the distance between the places where neon-20 and neon-22 ions hit the detector. (1 u = 1.66 × 10<sup>−27</sup> kg)`,
  steps([`<i>r</i><sub>20</sub> = ${fr('<i>mv</i>', '<i>eB</i>')} = ${fr('(20 × 1.66 × 10<sup>−27</sup>)(1.0 × 10<sup>5</sup>)', '(1.60 × 10<sup>−19</sup>)(0.50)')} = 4.15 × 10<sup>−2</sup> m; similarly <i>r</i><sub>22</sub> = 4.57 × 10<sup>−2</sup> m`, `Each ion lands a diameter (2<i>r</i>) from the entrance slit, so the separation is 2(<i>r</i><sub>22</sub> − <i>r</i><sub>20</sub>) = 2(0.42 × 10<sup>−2</sup>) = <b>8.3 × 10<sup>−3</sup> m</b> (8.3 mm)`]))}
`)}

${sec('16-7', '16.7 Hall effect', `
${def('Hall effect', `when a current flows through a conductor or semiconductor in a magnetic field perpendicular to the current, ${red('a p.d. (the Hall voltage) appears across the sides of the specimen')}, perpendicular to both the current and the field.`)}
${fig(F.hall(), 'Figure 16.14: the Hall effect in a slab with electrons as charge carriers.')}
${h4('How the Hall voltage builds up')}
${steps([`The charge carriers drift along the slab with velocity <i>v</i>. The magnetic force <i>evB</i> pushes them towards one side.`, `Charges collect on that side and an equal opposite charge is left on the other side. This sets up an electric field <i>E</i><sub>H</sub> across the slab.`, `The electric force <i>eE</i><sub>H</sub> opposes the magnetic force. Charges keep collecting until the two forces balance; after that the carriers flow straight along the slab and the Hall voltage is steady.`])}
${h4('Deriving the Hall voltage')}
${steps([`At equilibrium: <i>eE</i><sub>H</sub> = <i>evB</i>, and <i>E</i><sub>H</sub> = ${fr('<i>V</i><sub>H</sub>', '<i>d</i>')} (<i>d</i> = width across which <i>V</i><sub>H</sub> appears), so <i>V</i><sub>H</sub> = <i>Bvd</i>.`, `The current is <i>I</i> = <i>nevA</i> with <i>A</i> = <i>td</i> (<i>t</i> = thickness, measured along B), so <i>v</i> = ${fr('<i>I</i>', '<i>netd</i>')}.`, `<i>V</i><sub>H</sub> = <i>B</i>${fr('<i>I</i>', '<i>netd</i>')}<i>d</i>:`])}
${key(`<i>V</i><sub>H</sub> = ${fr('<i>BI</i>', '<i>net</i>')}`, '<i>n</i> = number of charge carriers per unit volume, <i>t</i> = thickness of the specimen in the direction of B')}
${ul([`<i>V</i><sub>H</sub> ∝ 1/<i>n</i>. Metals have a very large <i>n</i>, so their Hall voltage is tiny. Semiconductors have a much smaller <i>n</i>, so <i>V</i><sub>H</sub> is large enough to measure: Hall probes use semiconductors.`, `A thin specimen (small <i>t</i>) gives a larger <i>V</i><sub>H</sub>.`])}
${h4('Applications of the Hall effect')}
${ul([`<b>Measuring magnetic flux density</b> with a Hall probe: with <i>I</i> constant, <i>V</i><sub>H</sub> ∝ <i>B</i>. The probe is small, so it can measure B at a point, and it responds quickly to changing fields.`, `<b>Finding the sign of the charge carriers</b>: the side that becomes positive shows whether the carriers are electrons (n-type) or holes (p-type).`, `<b>Finding the number density</b> <i>n</i> of the carriers: <i>n</i> = <i>BI</i>/(<i>eV</i><sub>H</sub><i>t</i>).`, `Hall sensors in everyday devices: measuring current without breaking the circuit, detecting the speed of a rotating wheel, and as contactless switches.`])}
${sim('hall', 'Hall effect', 'Choose electrons or holes as the charge carriers and change B and the current. Watch the carriers pile up on one face until the Hall voltage stops further build-up. The sign of the top face tells you the sign of the carriers.')}
${example('16.7.1', `A thin semiconductor slab is 10.0 mm long, 3.0 mm wide and 1.0 mm thick, with 4.0 × 10<sup>21</sup> charge carriers per m<sup>3</sup>. A current of 0.0025 mA flows along its length. A uniform field B is applied perpendicular to its largest face (along the 1.0 mm thickness), and a Hall voltage of 60 μV appears across its width. Find (a) the drift velocity of the carriers, (b) <i>B</i>. (c) The top face (as in Figure 16.14) becomes negative. What are the charge carriers?`,
  steps([`(a) <i>v</i> = ${fr('<i>I</i>', '<i>neA</i>')} = ${fr('2.5 × 10<sup>−6</sup>', '(4.0 × 10<sup>21</sup>)(1.60 × 10<sup>−19</sup>)(3.0 × 10<sup>−3</sup> × 1.0 × 10<sup>−3</sup>)')} = <b>1.3 × 10<sup>−3</sup> ${ms}</b>`, `(b) <i>B</i> = ${fr('<i>V</i><sub>H</sub><i>net</i>', '<i>I</i>')} = ${fr('(60 × 10<sup>−6</sup>)(4.0 × 10<sup>21</sup>)(1.60 × 10<sup>−19</sup>)(1.0 × 10<sup>−3</sup>)', '2.5 × 10<sup>−6</sup>')} = <b>15 T</b>`, `(c) With the current to the right and B into the page, positive carriers moving right and negative carriers moving left are both pushed to the top face. The top face is negative, so the carriers are <b>electrons</b> (n-type).`]))}
${exercises('Exercise: crossed fields and the Hall effect', [
  { q: `Why does a Hall probe use a semiconductor and not a metal?`, a: `<i>V</i><sub>H</sub> = <i>BI</i>/(<i>net</i>) is inversely proportional to <i>n</i>. A metal has so many free electrons that <i>V</i><sub>H</sub> is too small to measure; a semiconductor has far fewer carriers, so <i>V</i><sub>H</sub> is much larger.` },
  { q: `Electrons accelerated to 3.0 × 10<sup>7</sup> ${ms} enter crossed fields with <i>B</i> = 2.0 mT. What electric field lets them pass undeflected?`, a: `<i>E</i> = <i>vB</i> = <b>6.0 × 10<sup>4</sup> V m<sup>−1</sup></b>` },
  { q: `Derive <i>e</i>/<i>m</i> = <i>E</i>/(<i>B</i><sup>2</sup><i>r</i>) for Thomson's experiment.`, a: `Undeflected: <i>eE</i> = <i>evB</i> so <i>v</i> = <i>E</i>/<i>B</i>. Magnetic field only: <i>evB</i> = <i>mv</i><sup>2</sup>/<i>r</i>, so <i>e</i>/<i>m</i> = <i>v</i>/(<i>Br</i>) = <i>E</i>/(<i>B</i><sup>2</sup><i>r</i>).` }])}
`)}
`;
  window.PhysiQLessons.register('LESSON-S2-16', { html: () => S });

  // ===================== simulations =====================
  // ---------- 1. a charge in a uniform field ----------
  window.PhysiQSims.add('qinb', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, arrow, loop } = window.PhysiQSims.U;
    const S = { sgn: 1, v: 8, B: 0.06, mode: 'perp', th: Math.PI / 2, path: [] };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const chipSet = (opts, cur, set) => { const bs = opts.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === cur ? ' on' : ''), () => { set(k); bs.forEach(x => x.classList.toggle('on', x === b)); S.path = []; }); return b; }); };
    chipSet([[1, 'charge +q'], [-1, 'charge −q']], 1, k => { S.sgn = k; });
    chipSet([['perp', 'v perpendicular to B'], ['par', 'v parallel to B']], 'perp', k => { S.mode = k; S.x = null; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'speed <i>v</i> (× 10<sup>5</sup> m s<sup>−1</sup>)', 2, 10, 0.5, S.v, '', x => { S.v = x; S.path = []; });
    slider(ctl, 'flux density <i>B</i>', 0.05, 0.25, 0.01, S.B, 'T', x => { S.B = x; S.path = []; });
    const cv = canvas(root); const ro = readouts(root);
    const m = 1.67e-27, q = 1.6e-19;
    function frame(dt) {
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 260, 400); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const v = S.v * 1e5, r = m * v / (q * S.B), T = 2 * Math.PI * m / (q * S.B);
      const scale = Math.min(w, h) * 0.46 / 0.21;   // pixels per metre (largest radius 0.21 m)
      const cx = w / 2, cy = h / 2 + 6;
      if (S.mode === 'perp') {
        for (let x = 22; x < w; x += 34) for (let y = 22; y < h; y += 34) { ctx.strokeStyle = 'rgba(106,99,236,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke(); }
        text(ctx, 'B into the page', 10, 16, { fs: 11, c: COL.v, b: 1 });
        const om = 2 * Math.PI / 2.2 * (S.B / 0.15);            // drawn: angular speed depends only on B (as T = 2πm/qB)
        S.th += S.sgn * om * dt;                                    // +q anticlockwise on screen when B is into the page
        const R = r * scale, px = cx + R * Math.cos(S.th), py = cy - R * Math.sin(S.th);
        ctx.strokeStyle = 'rgba(242,102,27,.35)'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        const tx = -Math.sin(S.th) * S.sgn, ty = -Math.cos(S.th) * S.sgn;   // velocity direction on screen
        arrow(ctx, px, py, px + tx * 44, py + ty * 44, COL.r, 2.4); text(ctx, 'v', px + tx * 50, py + ty * 50 + 4, { b: 1, it: 1, c: COL.r });
        arrow(ctx, px, py, px + (cx - px) / R * 38, py + (cy - py) / R * 38, COL.o, 2.4); text(ctx, 'F', px + (cx - px) / R * 46, py + (cy - py) / R * 46 + 4, { b: 1, it: 1, c: COL.o });
        ctx.beginPath(); ctx.arc(px, py, 9, 0, 7); ctx.fillStyle = S.sgn > 0 ? '#FBE3D6' : '#DCEBFA'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.3; ctx.stroke(); text(ctx, S.sgn > 0 ? '+' : '−', px, py + 4.5, { a: 'center', b: 1, fs: 13 });
        ctx.beginPath(); ctx.arc(cx, cy, 2.5, 0, 7); ctx.fillStyle = COL.ink; ctx.fill();
        text(ctx, S.sgn > 0 ? 'anticlockwise' : 'clockwise', w - 10, 16, { a: 'right', fs: 11, c: COL.sub });
        ro([['radius r = mv/(qB)', fmt(r * 100, 1) + ' cm', 'hl'], ['period T = 2πm/(qB)', fmt(T * 1e6, 3) + ' μs', 'hl'], ['magnetic force qvB', fmt(q * v * S.B * 1e15, 2) + ' × 10⁻¹⁵ N'], ['speed', 'constant (F ⊥ v)']]);
      } else {
        for (let y = 30; y < h; y += 40) arrow(ctx, 10, y, w - 10, y, 'rgba(106,99,236,.45)', 1.4, 7);
        text(ctx, 'B to the right', 10, 16, { fs: 11, c: COL.v, b: 1 });
        if (S.x == null) S.x = 20; S.x += v / 1e5 * 18 * dt; if (S.x > w - 20) S.x = 20;
        const py = cy; arrow(ctx, S.x, py, S.x + 44, py, COL.r, 2.4); text(ctx, 'v', S.x + 50, py + 4, { b: 1, it: 1, c: COL.r });
        ctx.beginPath(); ctx.arc(S.x, py, 9, 0, 7); ctx.fillStyle = S.sgn > 0 ? '#FBE3D6' : '#DCEBFA'; ctx.fill(); ctx.strokeStyle = COL.ink; ctx.stroke(); text(ctx, S.sgn > 0 ? '+' : '−', S.x, py + 4.5, { a: 'center', b: 1, fs: 13 });
        text(ctx, 'no force: straight line at constant speed', w / 2, h - 14, { a: 'center', fs: 12, b: 1, c: COL.gr });
        ro([['angle between v and B', '0°', 'hl'], ['magnetic force qvB sin 0°', '0 N', 'hl'], ['path', 'straight line']]);
      }
    }
    loop(cv, frame);
  });

  // ---------- 2. two parallel currents ----------
  window.PhysiQSims.add('wires', function (root) {
    const { COL, fmt, el, slider, canvas, text, readouts, arrow } = window.PhysiQSims.U;
    const S = { I1: 8, I2: 8, d: 4 };
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'current <i>I</i><sub>1</sub> (+ = up)', -10, 10, 1, S.I1, 'A', v => { S.I1 = v; draw(); });
    slider(ctl, 'current <i>I</i><sub>2</sub> (+ = up)', -10, 10, 1, S.I2, 'A', v => { S.I2 = v; draw(); });
    slider(ctl, 'separation <i>d</i>', 1, 10, 0.5, S.d, 'cm', v => { S.d = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    const sym = (ctx, x, y, into, c) => { ctx.strokeStyle = c; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.stroke(); if (into) { ctx.beginPath(); ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5); ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5); ctx.stroke(); } else { ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fillStyle = c; ctx.fill(); } };
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 250, 340); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const gap = Math.min(w * 0.6, 40 + S.d * (w * 0.55 - 40) / 10), x1 = w / 2 - gap / 2, x2 = w / 2 + gap / 2, top = 30, bot = h - 40;
      [[x1, S.I1], [x2, S.I2]].forEach(([x, I], i) => {
        ctx.fillStyle = '#CDEBEA'; ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.fillRect(x - 5, top, 10, bot - top); ctx.strokeRect(x - 5, top, 10, bot - top);
        if (I) { const y0 = I > 0 ? bot - 30 : top + 30; arrow(ctx, x, y0, x, y0 - Math.sign(I) * (30 + Math.abs(I) * 4), COL.r, 2.6); }
        text(ctx, 'I' + (i + 1) + ' = ' + Math.abs(I) + ' A' + (I > 0 ? ' up' : I < 0 ? ' down' : ''), x, bot + 22, { a: 'center', fs: 12, b: 1, c: COL.r });
      });
      const mu = 4e-7 * Math.PI, d = S.d / 100, B1 = mu * Math.abs(S.I1) / (2 * Math.PI * d), B2 = mu * Math.abs(S.I2) / (2 * Math.PI * d), FL = mu * Math.abs(S.I1 * S.I2) / (2 * Math.PI * d);
      // field of wire 1 at wire 2 (right of an upward current: into the page)
      const ym = (top + bot) / 2;
      if (S.I1) { sym(ctx, x2 + 22, ym + 40, S.I1 > 0, COL.v); text(ctx, 'B₁', x2 + 36, ym + 44, { fs: 12, b: 1, c: COL.v }); }
      if (S.I2) { sym(ctx, x1 - 22, ym + 40, S.I2 < 0, COL.v); text(ctx, 'B₂', x1 - 50, ym + 44, { fs: 12, b: 1, c: COL.v }); }
      const attract = S.I1 * S.I2 > 0, L = Math.min(gap * 0.42, 14 + FL * 1e4 * 6);
      if (S.I1 && S.I2) {
        if (attract) { arrow(ctx, x1 + 6, ym, x1 + 6 + L, ym, COL.o, 3); arrow(ctx, x2 - 6, ym, x2 - 6 - L, ym, COL.o, 3); }
        else { arrow(ctx, x1 - 6, ym, x1 - 6 - L, ym, COL.o, 3); arrow(ctx, x2 + 6, ym, x2 + 6 + L, ym, COL.o, 3); }
        text(ctx, attract ? 'attract' : 'repel', w / 2, top - 10, { a: 'center', b: 1, fs: 14, c: COL.o });
      } else text(ctx, 'no force (one current is zero)', w / 2, top - 10, { a: 'center', b: 1, fs: 13, c: COL.sub });
      ro([['B₁ at wire 2 = μ₀I₁/(2πd)', fmt(B1 * 1e5, 2) + ' × 10⁻⁵ T', 'hl'], ['force per metre F/l = μ₀I₁I₂/(2πd)', fmt(FL * 1e4, 2) + ' × 10⁻⁴ N m⁻¹', 'hl'], ['B₂ at wire 1', fmt(B2 * 1e5, 2) + ' × 10⁻⁵ T'], ['forces on the wires', 'equal and opposite']]);
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. crossed fields and Thomson's e/m ----------
  window.PhysiQSims.add('selector', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const S = { v: 2.0, E: 1.4, B: 1.0, mode: 'EB', dots: [] };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const ms3 = [['EB', 'E and B'], ['B', 'B only'], ['E', 'E only']];
    const chips = ms3.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.mode ? ' on' : ''), () => { S.mode = k; chips.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'electron speed <i>v</i> (× 10<sup>7</sup> m s<sup>−1</sup>)', 1, 3, 0.1, S.v, '', x => { S.v = x; });
    slider(ctl, 'electric field <i>E</i> (× 10<sup>4</sup> V m<sup>−1</sup>)', 0, 4, 0.1, S.E, '', x => { S.E = x; });
    slider(ctl, 'magnetic field <i>B</i>', 0, 2, 0.05, S.B, 'mT', x => { S.B = x; });
    const cv = canvas(root); const ro = readouts(root);
    const qm = 1.76e11, Lp = 0.06, gapM = 0.03, Ls = 0.12;   // plate length, plate gap, distance to screen (m)
    function path() {   // numerical path of an electron, x right, y up (metres); returns points and whether it hit a plate
      const v0 = S.v * 1e7, E = (S.mode === 'B' ? 0 : S.E * 1e4), B = (S.mode === 'E' ? 0 : S.B * 1e-3);
      // electron: top plate +, so E points down; electric force on the electron is up (+y). B into the page: magnetic force on the electron moving right is down (−y).
      let x = 0, y = 0, vx = v0, vy = 0; const pts = [[x, y]]; const dt = Lp / v0 / 400; let hit = false;
      for (let i = 0; i < 4000 && x < Lp; i++) {
        // F = −e(E + v × B) with E = −E ŷ and B = −B ẑ: v × B for B = −Bẑ: (vx, vy, 0) × (0, 0, −B) = (−vy B, vx B, 0); −e × that → (vy B e, −vx B e)
        const axx = qm * vy * B, ayy = qm * E - qm * vx * B;
        vx += axx * dt; vy += ayy * dt; x += vx * dt; y += vy * dt; pts.push([x, y]);
        if (Math.abs(y) > gapM / 2) { hit = true; break; }
        if (x < -0.01) break;
      }
      if (!hit && x >= Lp) { const t = (Ls - x) / vx; pts.push([Ls, y + vy * t]); }
      return { pts, hit };
    }
    function frame(dt) {
      const ctx = cv.ctx, { w, h } = cv.size(0.55, 260, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const x0 = 30, sx = (w - 60) / Ls, cy = h * 0.5, sy = (h * 0.34) / (gapM / 2);
      const PX = x => x0 + x * sx, PY = y => cy - y * sy;
      // plates and field region
      ctx.fillStyle = '#F2A08A'; ctx.fillRect(PX(0), PY(gapM / 2) - 7, Lp * sx, 7); ctx.fillStyle = '#9FC3E8'; ctx.fillRect(PX(0), PY(-gapM / 2), Lp * sx, 7);
      text(ctx, S.mode === 'B' ? 'plates off' : '+ + + + +', PX(Lp / 2), PY(gapM / 2) - 12, { a: 'center', fs: 12, b: 1, c: COL.r });
      if (S.mode !== 'E') for (let x = 0.006; x < Lp; x += 0.012) for (let y = -0.009; y <= 0.0091; y += 0.009) { const X = PX(x), Y = PY(y); ctx.strokeStyle = 'rgba(106,99,236,.4)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X - 3.5, Y - 3.5); ctx.lineTo(X + 3.5, Y + 3.5); ctx.moveTo(X + 3.5, Y - 3.5); ctx.lineTo(X - 3.5, Y + 3.5); ctx.stroke(); }
      ctx.fillStyle = '#D5DC3B'; ctx.fillRect(PX(Ls) - 3, 12, 6, h - 24); text(ctx, 'screen', PX(Ls) - 8, 22, { a: 'right', fs: 11, c: COL.sub });
      ctx.strokeStyle = COL.grid; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(10, cy); ctx.lineTo(w - 10, cy); ctx.stroke(); ctx.setLineDash([]);
      const { pts, hit } = path();
      ctx.strokeStyle = COL.gr; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(10, cy); pts.forEach(([x, y]) => ctx.lineTo(PX(x), PY(y))); ctx.stroke();
      // moving electrons along the path
      S.t = ((S.t || 0) + Math.max(0, dt) * 0.6) % 1;
      for (let k = 0; k < 4; k++) { const f = (S.t + k / 4) % 1, i = Math.max(0, Math.min(pts.length - 1, Math.floor(f * (pts.length - 1)))); const [x, y] = pts[i]; ctx.beginPath(); ctx.arc(PX(x), PY(y), 4.5, 0, 7); ctx.fillStyle = '#2C6BB3'; ctx.fill(); }
      const vb = S.B > 0 ? S.E * 1e4 / (S.B * 1e-3) : Infinity, bal = Math.abs(S.v * 1e7 - vb) / (S.v * 1e7) < 0.02;
      const yEnd = pts[pts.length - 1][1];
      let rows;
      if (S.mode === 'EB') rows = [['v needed = E/B', isFinite(vb) ? fmt(vb / 1e7, 2) + ' × 10⁷ m s⁻¹' : '—', 'hl'], ['beam', bal ? 'undeflected: eE = evB' : hit ? 'hits a plate' : (yEnd > 0 ? 'bends up: eE > evB (too slow)' : 'bends down: evB > eE (too fast)'), 'hl'], ['electric force eE', fmt(1.6e-19 * S.E * 1e4 * 1e15, 2) + ' × 10⁻¹⁵ N'], ['magnetic force evB', fmt(1.6e-19 * S.v * 1e7 * S.B * 1e-3 * 1e15, 2) + ' × 10⁻¹⁵ N']];
      else if (S.mode === 'B') { const r = S.B > 0 ? S.v * 1e7 / (qm * S.B * 1e-3) : Infinity; rows = [['radius r = mv/(eB)', isFinite(r) ? fmt(r * 100, 1) + ' cm' : '—', 'hl'], ['e/m = v/(Br)', isFinite(r) ? fmt(S.v * 1e7 / (S.B * 1e-3 * r) / 1e11, 2) + ' × 10¹¹ C kg⁻¹' : '—', 'hl'], ['Thomson: v = E/B from the balance', 'so e/m = E/(B²r)']]; }
      else rows = [['force', 'eE upwards (towards +)', 'hl'], ['path between the plates', 'parabola', 'hl']];
      ro(rows);
      if (S.mode === 'EB' && bal) text(ctx, 'balanced: v = E/B', w / 2, h - 8, { a: 'center', b: 1, fs: 13, c: COL.gr });
    }
    loop(cv, frame);
  });

  // ---------- 4. Hall effect ----------
  window.PhysiQSims.add('hall', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, arrow, loop } = window.PhysiQSims.U;
    const S = { c: -1, B: 0.5, I: 10, q: 0, parts: [] };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const opts = [[-1, 'electrons (n-type)'], [1, 'holes (p-type)']];
    const chips = opts.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.c ? ' on' : ''), () => { S.c = k; S.q = 0; chips.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'flux density <i>B</i> (into the page)', 0, 1, 0.05, S.B, 'T', x => { S.B = x; });
    slider(ctl, 'current <i>I</i>', 0, 20, 1, S.I, 'mA', x => { S.I = x; });
    const cv = canvas(root); const ro = readouts(root);
    for (let i = 0; i < 26; i++) S.parts.push({ x: Math.random(), y: Math.random() });
    const n = 1e22, e = 1.6e-19, t = 1e-3;
    function frame(dt) {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 240, 320); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const bx = 50, by = 50, bw = w - 100, bh = h - 110;
      ctx.fillStyle = '#EEF3DA'; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, bh);
      if (S.B > 0) for (let x = bx + 18; x < bx + bw; x += 36) for (let y = by + 16; y < by + bh; y += 30) { ctx.strokeStyle = 'rgba(106,99,236,.3)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(x - 3.5, y - 3.5); ctx.lineTo(x + 3.5, y + 3.5); ctx.moveTo(x + 3.5, y - 3.5); ctx.lineTo(x - 3.5, y + 3.5); ctx.stroke(); }
      if (S.I > 0) { arrow(ctx, 8, by + bh / 2, bx - 4, by + bh / 2, COL.r, 2.6); arrow(ctx, bx + bw + 4, by + bh / 2, w - 8, by + bh / 2, COL.r, 2.6); text(ctx, 'I', 12, by + bh / 2 - 8, { b: 1, it: 1, c: COL.r }); }
      // charge build-up towards the steady value
      const target = S.B * S.I; S.q += (target - S.q) * Math.min(1, dt * 1.5);
      const k = Math.round(Math.min(10, S.q / 0.5));   // symbols shown on each face
      const topSign = S.c < 0 ? '−' : '+', botSign = S.c < 0 ? '+' : '−';
      for (let i = 0; i < k; i++) { const x = bx + 16 + i * (bw - 32) / 9; text(ctx, topSign, x, by - 6, { a: 'center', b: 1, fs: 15, c: topSign === '+' ? COL.r : '#2C6BB3' }); text(ctx, botSign, x, by + bh + 18, { a: 'center', b: 1, fs: 15, c: botSign === '+' ? COL.r : '#2C6BB3' }); }
      // carriers: drift along (electrons left, holes right); sideways push fades as the Hall field builds
      const drift = S.I / 20 * 0.25 * dt, push = S.B * S.I > 0 ? Math.max(0, 1 - S.q / (target + 1e-9)) * 0.9 + 0.02 : 0;
      S.parts.forEach(p => { p.x += (S.c > 0 ? 1 : -1) * drift; if (p.x > 1) p.x -= 1; if (p.x < 0) p.x += 1; p.y = Math.max(0.05, p.y - push * dt * 0.8);
        if (Math.random() < 0.004) p.y = 0.3 + Math.random() * 0.7;
        const X = bx + p.x * bw, Y = by + p.y * bh; ctx.beginPath(); ctx.arc(X, Y, 4.5, 0, 7); ctx.fillStyle = S.c < 0 ? '#2C6BB3' : '#E06A4E'; ctx.fill(); });
      const VH = S.B * S.I * 1e-3 / (n * e * t);
      text(ctx, 'V_H = ' + fmt(VH * 1e3, 2) + ' mV', w - 10, h - 10, { a: 'right', b: 1, fs: 13, c: COL.gr });
      text(ctx, 'top face: ' + (k ? (topSign === '+' ? 'positive' : 'negative') : 'no charge'), 10, h - 10, { b: 1, fs: 12, c: COL.ink });
      ro([['Hall voltage V_H = BI/(net)', fmt(VH * 1e3, 2) + ' mV', 'hl'], ['carriers pushed to', S.B * S.I ? 'the top face' : '—', 'hl'], ['n (this slab)', '1.0 × 10²² m⁻³'], ['thickness t', '1.0 mm']]);
    }
    loop(cv, frame);
  });
  // ---------- mass spectrometer ----------
  window.PhysiQSims.add('massspec', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts, loop } = window.PhysiQSims.U;
    const u = 1.66e-27, e = 1.6e-19, v = 1.0e5;
    const SETS = { Ne: [[20, 0.905, '#6A63EC'], [21, 0.003, '#2BB3A3'], [22, 0.092, '#F2661B']], Cl: [[35, 0.76, '#3E8E1E'], [37, 0.24, '#C0392B']], C: [[12, 0.989, '#5A6170'], [13, 0.011, '#F2661B'], [14, 0.0, '#6A63EC']] };
    const S = { el: 'Ne', B: 0.5, ions: [], hits: {} };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const chips = [['Ne', 'Neon (20, 21, 22)'], ['Cl', 'Chlorine (35, 37)'], ['C', 'Carbon (12, 13, 14)']].map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.el ? ' on' : ''), () => { S.el = k; S.ions = []; S.hits = {}; chips.forEach(x => x.classList.toggle('on', x === b)); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'magnetic field <i>B</i><sub>2</sub>', 0.2, 1.0, 0.05, S.B, 'T', x => { S.B = x; S.ions = []; S.hits = {}; });
    const cv = canvas(root); const ro = readouts(root);
    let acc = 0;
    function frame(dt) {
      if (dt < 0) dt = 0;
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 300, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const set = SETS[S.el];
      const wallX = Math.min(w * 0.4, 170), beamY = h - 40, mMax = set[set.length - 1][0], maxD = 2 * mMax * u * v / (e * 0.2);   // largest diameter for this element
      const sc = (h - 80) / maxD;
      // source and velocity selector
      ctx.fillStyle = '#E9E2C9'; ctx.fillRect(4, beamY - 16, 40, 32); ctx.strokeStyle = COL.ink; ctx.strokeRect(4, beamY - 16, 40, 32); text(ctx, 'ion', 24, beamY - 2, { a: 'center', fs: 10 }); text(ctx, 'source', 24, beamY + 10, { a: 'center', fs: 10 });
      ctx.fillStyle = '#F2A08A'; ctx.fillRect(48, beamY - 22, wallX - 60, 5); ctx.fillStyle = '#9FC3E8'; ctx.fillRect(48, beamY + 17, wallX - 60, 5);
      text(ctx, 'velocity selector', (48 + wallX - 12) / 2, beamY + 36, { a: 'center', fs: 10.5, c: COL.sub });
      // B2 region and detector
      ctx.fillStyle = 'rgba(106,99,236,.06)'; ctx.fillRect(wallX, 10, w - wallX - 10, h - 20);
      for (let x = wallX + 18; x < w - 10; x += 30) for (let y = 22; y < h - 14; y += 30) { ctx.strokeStyle = 'rgba(106,99,236,.28)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(x - 3.5, y - 3.5); ctx.lineTo(x + 3.5, y + 3.5); ctx.moveTo(x + 3.5, y - 3.5); ctx.lineTo(x - 3.5, y + 3.5); ctx.stroke(); }
      text(ctx, 'B₂ into the page', w - 14, 24, { a: 'right', fs: 11, b: 1, c: COL.v });
      ctx.fillStyle = '#2E3440'; ctx.fillRect(wallX - 4, 10, 8, beamY - 18); ctx.fillRect(wallX - 4, beamY + 8, 8, h - beamY - 18);
      // paths
      set.forEach(([m, ab, col]) => { const r = m * u * v / (e * S.B) * sc; ctx.strokeStyle = col; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(wallX, beamY - r, r, Math.PI / 2, -Math.PI / 2, true); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        const hy = beamY - 2 * r; ctx.fillStyle = col; ctx.fillRect(wallX - 4, hy - 2, 8, 4); });
      // close-up of the detector (positions magnified 5 times about the middle isotope)
      { const zx = 10, zw = wallX - 30, zy = 40, zh = Math.max(80, beamY - 120), mid = set[Math.floor((set.length - 1) / 2)][0], c0 = zy + zh / 2;
        ctx.fillStyle = '#fff'; ctx.fillRect(zx, zy, zw, zh); ctx.strokeStyle = COL.grid; ctx.strokeRect(zx, zy, zw, zh); text(ctx, 'detector (close-up ×5)', zx + 2, zy - 8, { fs: 10.5, b: 1 });
        ctx.fillStyle = '#2E3440'; ctx.fillRect(zx + zw - 8, zy + 4, 4, zh - 8);
        set.forEach(([m, , col]) => { const y = c0 - (m - mid) * 2 * u * v / (e * S.B) * sc * 5; if (y < zy + 6 || y > zy + zh - 6) return; const n = S.hits[m] || 0;
          ctx.fillStyle = col; ctx.fillRect(zx + zw - 8 - Math.min(zw - 50, 4 + n * 0.5), y - 3, Math.min(zw - 50, 4 + n * 0.5), 6); text(ctx, m + ' u', zx + 6, y + 4, { fs: 11, b: 1, c: col }); }); }
      // ions: straight through the selector, then a semicircle in B2
      acc += dt; while (acc > 0.07) { acc -= 0.07; let x = Math.random(), k = 0, sum = 0; for (; k < set.length; k++) { sum += Math.max(set[k][1], 0.06); if (x * set.reduce((a, q) => a + Math.max(q[1], 0.06), 0) < sum) break; } S.ions.push({ k: Math.min(k, set.length - 1), s: 0 }); }
      const speed = 260;   // pixels per second on screen
      S.ions = S.ions.filter(io => { const [m, , col] = set[io.k], r = m * u * v / (e * S.B) * sc, L1 = wallX - 38; io.s += speed * dt;
        let X, Y; if (io.s < L1) { X = 38 + io.s; Y = beamY; } else { const th = (io.s - L1) / r; if (th >= Math.PI) { S.hits[m] = (S.hits[m] || 0) + 1; return false; } X = wallX + r * Math.sin(th); Y = beamY - r + r * Math.cos(th); }
        ctx.beginPath(); ctx.arc(X, Y, 3.6, 0, 7); ctx.fillStyle = col; ctx.fill(); return true; });
      const rows = [['speed from the selector v = E/B₁', '1.0 × 10⁵ m s⁻¹', 'hl']];
      set.forEach(([m]) => rows.push([`r for mass ${m} u`, fmt(m * u * v / (e * S.B) * 100, 2) + ' cm']));
      rows.push(['gap between the outer two on the detector', fmt(2 * (set[set.length - 1][0] - set[0][0]) * u * v / (e * S.B) * 1000, 1) + ' mm', 'hl']);
      ro(rows);
    }
    loop(cv, frame);
  });
})();
