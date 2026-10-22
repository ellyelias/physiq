/* Chapter 2 Kinematics: full notes by Cikgu Suhaili (from STPM_2027_KINEMATICS_CHAPTER_2_UPDATED_teacher_version.pptx). */
(function () {
  'use strict';
  const H = window.PhysiQLessons.H;
  const { fr, sq, vec, avg, half, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, ms, ms2, svg, L, T, P, dot, axes, C } = H;
  // ---------- figures (redrawn from the slides) ----------
  const F = {};
  F.disp = () => svg(420, 140,
    L(40, 20, 40, 130, 'k', '', { w: 1.6 }) + L(40, 40, 360, 40, 'k', '', { w: 1.6 }) + dot(110, 40, 9) + L(130, 26, 190, 26, 'k', 'e') +
    T(70, 30, 'Start', { fs: 13, b: 1 }) + T(372, 30, 'Finish', { fs: 13, b: 1, a: 'end' }) +
    T(110, 62, 'P<tspan font-size="10" dy="3">i</tspan>', { fs: 13, b: 1 }) + T(320, 62, 'P<tspan font-size="10" dy="3">f</tspan>', { fs: 13, b: 1 }) +
    L(110, 74, 320, 74, 'v', 'e', { w: 2.4 }) + T(215, 68, 's', { c: C.v, it: 1, b: 1 }) +
    L(40, 96, 110, 96, 'k', 'e') + T(75, 90, 's<tspan font-size="10" dy="3">i</tspan>', { it: 1, b: 1 }) +
    L(40, 120, 320, 120, 'k', 'e') + T(180, 114, 's<tspan font-size="10" dy="3">f</tspan>', { it: 1, b: 1 }) +
    L(110, 40, 110, 96, 's', '', { d: '3 3', w: 1 }) + L(320, 40, 320, 120, 's', '', { d: '3 3', w: 1 }));

  // right-angled triangle: A bottom-left, B bottom-right, C top-right
  F.tri = (A, B, Cc, ab, bc, ac) => svg(260, 190,
    L(50, 160, 200, 160, 'g', 'e', { w: 2.6 }) + L(200, 160, 200, 40, 'v', 'e', { w: 2.6 }) + L(50, 160, 200, 40, 'o', 'e', { w: 2.6 }) +
    P('M80,160 A30,30 0 0 0 74,141', 'ink', { w: 1.4 }) + T(92, 150, 'θ', { it: 1 }) +
    T(40, 176, A, { b: 1 }) + T(212, 176, B, { b: 1 }) + T(212, 36, Cc, { b: 1 }) +
    T(125, 180, ab, { fs: 13 }) + T(222, 104, bc, { fs: 13, a: 'start' }) + T(110, 92, ac, { fs: 13, a: 'end' }));

  // points on a straight line with movement arrows above. pts: {L:x}, moves: [[from,to,label,colour,y]]
  F.track = (pts, moves) => {
    const xs = Object.values(pts), min = Math.min(...xs), max = Math.max(...xs), sx = x => 50 + (x - min) / (max - min) * 300;
    let b = L(30, 110, 370, 110, 'k', '', { w: 3 });
    Object.entries(pts).forEach(([n, x]) => { b += L(sx(x), 104, sx(x), 116, 'k', '', { w: 2 }) + T(sx(x), 134, n, { b: 1 }); });
    moves.forEach(([f, t, lab, c, y]) => { b += L(sx(pts[f]), y, sx(pts[t]), y, c, 'e', { w: 2.4 }) + T((sx(pts[f]) + sx(pts[t])) / 2, y - 7, lab, { fs: 13, c: C[c] }); });
    return svg(400, 145, b + dot(sx(pts.A), 100, 8));
  };

  // curve with tangent triangle (gradient of the tangent)
  F.tangent = (yl) => svg(260, 200,
    axes(40, 170, 200, 150, 't', yl, { noO: 1 }) + T(32, 184, 'O', { fs: 12 }) +
    P('M40,168 C120,165 190,140 215,30', 'o', { w: 2.4 }) +
    L(120, 168, 222, 70, 'v', '', { w: 1.6 }) + dot(176, 115, 3.5, C.ink) +
    L(160, 131, 200, 131, 's', '', { d: '4 3', w: 1.4 }) + L(200, 131, 200, 92, 's', '', { d: '4 3', w: 1.4 }) +
    T(180, 147, 'Δt', { fs: 13 }) + T(214, 116, `Δ${yl}`, { fs: 13, a: 'start' }));

  F.path = () => svg(380, 170,
    P('M30,90 C40,10 120,10 130,70 S170,170 215,150 S290,70 300,40 S330,20 350,30', 'ink', { w: 2.4 }) +
    dot(130, 70, 5, C.ball) + dot(213, 150, 5, C.ball) + dot(296, 47, 5, C.ball) +
    L(213, 150, 300, 150, 'v', 'e', { w: 2.6 }) + T(120, 62, 'B', { b: 1 }) + T(213, 140, 'A', { b: 1 }) + T(310, 52, 'C', { b: 1, a: 'start' }) +
    T(305, 140, 'direction of the', { fs: 12, a: 'start', c: C.v }) + T(305, 156, 'velocity at A', { fs: 12, a: 'start', c: C.v }));

  F.gradLine = () => svg(240, 180,
    axes(40, 150, 180, 130, 't', 's') + L(40, 150, 190, 40, 'o', '', { w: 2.4 }) +
    L(110, 99, 160, 99, 'g', '', { d: '4 3', w: 1.4 }) + L(160, 99, 160, 62, 'g', '', { d: '4 3', w: 1.4 }) +
    T(135, 116, 'Δt', { fs: 13 }) + T(166, 86, 'Δs', { fs: 13, a: 'start' }));

  // mini graphs for the summary grid. kind: line types
  F.mini = (yl, kind, c) => {
    const k = { flat0: 'M30,75 L140,75', flatP: 'M30,45 L140,45', flatN: 'M30,98 L140,98', up: 'M30,95 L135,25', down: 'M30,25 L135,95', upFrom0: 'M30,75 L135,15',
      curveUp: 'M30,75 C80,73 115,55 135,15', curveDown: 'M30,75 C50,35 90,22 135,20', downFrom: 'M30,30 L135,75' }[kind];
    const x0 = 30, y0 = 75;
    return svg(160, 115, L(x0, kind === 'flatN' ? 110 : y0, x0, 8, 'k', 'e', { w: 1.4 }) + (kind === 'flatN' ? L(x0, y0, 150, y0, 'k', 'e', { w: 1.4 }) : L(x0, y0, 150, y0, 'k', 'e', { w: 1.4 })) +
      T(x0 - 12, 16, yl, { it: 1, fs: 13 }) + T(150, y0 + 15, 't', { it: 1, fs: 13 }) + P(k, c || 'o', { w: 2.6 }), 160);
  };

  F.ex216 = () => two(
    svg(262, 170, axes(40, 140, 170, 120, 't', 'speed') + T(28, 64, '20', { fs: 12, a: 'end' }) + L(36, 60, 44, 60, 'k', '', { w: 1 }) +
      P('M40,60 L115,140 L190,60', 'o', { w: 2.6 }) + T(115, 156, '2.04 s', { fs: 11, c: C.sub }) + T(190, 156, '4.08 s', { fs: 11, c: C.sub }), 262),
    svg(262, 200, axes(40, 100, 170, 90, 't', 'velocity', { yb: 190 }) + T(28, 44, '20', { fs: 12, a: 'end' }) + T(28, 164, '−20', { fs: 12, a: 'end' }) +
      P('M40,40 L190,160', 'v', { w: 2.6 }) + L(40, 160, 190, 160, 's', '', { d: '3 3', w: 1 }) +
      T(110, 50, 'going up', { fs: 12, c: C.o, a: 'start' }) + T(150, 128, 'coming down', { fs: 12, c: C.o, a: 'start' }), 262));

  F.ex217 = () => svg(330, 190,
    L(40, 100, 300, 100, 'k', 'e', { w: 1.6 }) + L(40, 180, 40, 15, 'k', 'e', { w: 1.6 }) + T(306, 104, 't', { it: 1, a: 'start' }) + T(40, 10, 'v', { it: 1 }) +
    P('M40,100 L110,30', 'o', { w: 2.6 }) + P('M110,30 L170,100', '#C9A800', { w: 2.6 }) + P('M170,100 L215,145', 'g', { w: 2.6 }) + P('M215,145 L262,100', 'v', { w: 2.6 }) +
    T(30, 96, 'A', { b: 1, a: 'end' }) + T(110, 22, 'B', { b: 1 }) + T(170, 92, 'C', { b: 1 }) + T(215, 163, 'D', { b: 1 }) + T(266, 92, 'E', { b: 1 }));

  F.ex218 = () => svg(395, 210,
    axes(50, 170, 290, 140, 't / s', 'v / m s⁻¹') + L(50, 60, 106, 60, 's', '', { d: '4 3', w: 1.2 }) + T(42, 64, '20', { fs: 12, a: 'end' }) +
    P('M50,170 L106,60', 'v', { w: 2.8 }) + P('M106,60 L190,60', 'g', { w: 2.8 }) + P('M190,60 L218,170', '#C4127A', { w: 2.8 }) +
    L(106, 60, 106, 170, 's', '', { d: '4 3', w: 1.2 }) + L(190, 60, 190, 170, 's', '', { d: '4 3', w: 1.2 }) +
    T(106, 188, '4', { fs: 12 }) + T(190, 188, '10', { fs: 12 }) + T(218, 188, '12', { fs: 12 }) +
    T(50, 160, 'A', { b: 1, a: 'end' }) + T(106, 52, 'B', { b: 1 }) + T(190, 52, 'C', { b: 1 }) + T(226, 166, 'D', { b: 1, a: 'start' }));

  F.vt = (shade) => svg(310, 200,
    axes(40, 170, 220, 150, 'time', 'velocity') + (shade ? `<path d="M40,170 L40,120 L200,50 L200,170 Z" fill="${C.fill}" stroke="none"/>` : '') +
    L(40, 120, 200, 50, 'r', '', { w: 2.6 }) + L(40, 50, 200, 50, 's', '', { d: '4 3', w: 1.2 }) + L(200, 50, 200, 170, 's', '', { d: '4 3', w: 1.2 }) +
    T(32, 124, 'u', { it: 1, a: 'end' }) + T(32, 54, 'v', { it: 1, a: 'end' }) + T(200, 188, 't', { it: 1 }) +
    (shade ? T(120, 140, 'area = s', { fs: 13, c: C.v, b: 1 }) : ''));

  // building drop
  F.drop = (hl, tl, top) => svg(250, 230,
    `<rect x="120" y="30" width="60" height="180" fill="${C.fill}" stroke="${C.v}" stroke-width="1.5"/>` +
    Array.from({ length: 8 }, (_, i) => `<line x1="120" y1="${52 + i * 21}" x2="180" y2="${52 + i * 21}" stroke="${C.lilac}" stroke-width="1"/>`).join('') +
    L(20, 210, 230, 210, 'k', '', { w: 3 }) + dot(100, 22, 8, '#E83E6C') + T(112, 18, top || 'u = 0', { fs: 13, a: 'start', it: 1 }) +
    L(100, 34, 100, 80, 'v', 'e', { w: 2.4 }) + L(80, 30, 80, 208, 's', 'b', { w: 1.4 }) +
    T(72, 120, hl, { fs: 13, a: 'end', it: 1 }) + (tl ? T(72, 140, tl, { fs: 13, a: 'end', it: 1 }) : '') + T(100, 226, 'v = ?', { fs: 13, it: 1 }));

  // vertical throw from the ground
  F.up = (u, extra) => svg(260, 220,
    L(30, 190, 230, 190, 'k', '', { w: 3 }) + dot(150, 180, 8, '#C4127A') + `<circle cx="150" cy="38" r="8" fill="none" stroke="${C.sub}" stroke-dasharray="3 3"/>` +
    T(166, 42, 'v = 0', { fs: 13, a: 'start', it: 1 }) + L(124, 176, 124, 52, 'g', 'e', { w: 2.4 }) + L(176, 52, 176, 176, 'r', 'e', { w: 2.4 }) +
    T(116, 118, '+s', { fs: 13, a: 'end', c: C.g, it: 1 }) + T(184, 118, '−s', { fs: 13, a: 'start', c: C.r, it: 1 }) +
    T(110, 210, `u = +${u} m/s`, { fs: 13, it: 1 }) + (extra || ''));

  // launched from a table / cliff top
  F.table = (H, u, lab) => svg(280, 230,
    L(20, 210, 260, 210, 'k', '', { w: 3 }) + `<rect x="70" y="110" width="80" height="100" fill="#BDEBD9" stroke="${C.g}" stroke-width="1.5"/>` +
    T(110, 166, H, { fs: 14 }) + dot(110, 104, 6, C.v) + L(110, 96, 110, 40, 'r', 'e', { w: 2.4 }) + T(120, 52, `u = +${u} m/s`, { fs: 12, a: 'start', it: 1 }) +
    L(50, 110, 50, 208, 'g', 'b', { w: 1.6 }) + T(42, 164, 'H', { it: 1, a: 'end' }) + (lab || ''));

  // projectile overview (slide 65)
  F.proj = () => {
    const pts = [], X = t => 50 + t * 360, Y = t => 210 - 4 * 150 * t * (1 - t);
    for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push(`${X(t).toFixed(1)},${Y(t).toFixed(1)}`); }
    let b = L(30, 210, 440, 210, 'k', 'e', { w: 1.6 }) + L(50, 230, 50, 30, 'k', 'e', { w: 1.6 }) + T(446, 214, 'x', { a: 'start', it: 1 }) + T(50, 24, 'y', { it: 1 }) +
      `<polyline points="${pts.join(' ')}" fill="none" stroke="${C.ink}" stroke-width="2.6"/>`;
    [0, 0.2, 0.5, 0.8, 1].forEach(t => {
      const x = X(t), y = Y(t), vy = 600 * (1 - 2 * t) / 360 * 50, ux = 50;
      b += L(x, y, x + ux, y, 'o', 'e', { w: 2.2 });
      if (Math.abs(vy) > 1) b += L(x, y, x, y - vy, 'v', 'e', { w: 2.2 }) + L(x, y, x + ux, y - vy, 'r', 'e', { w: 2 });
      b += dot(x, y, 4, C.ink);
    });
    b += T(102, 214 - 4 * 150 * 0.16 + 0, '', {}) + T(96, 200, 'α', { it: 1 }) + T(64, 150, 'u', { it: 1, b: 1, c: C.r }) +
      T(232, 52, 'v<tspan font-size="10" dy="3">y</tspan> = 0', { fs: 12, it: 1 }) + L(230, 60, 230, 210, 's', '', { d: '4 3', w: 1.2 }) + T(238, 140, 'h', { it: 1, a: 'start' }) +
      L(50, 238, 410, 238, 'g', 'b', { w: 1.6 }) + T(230, 254, 's<tspan font-size="10" dy="3">x</tspan> = R  (time T)', { fs: 13, it: 1, c: C.g });
    return svg(470, 262, b) + `<div class="ls-legend"><span><i style="background:${C.o}"></i>u<sub>x</sub> horizontal component (same everywhere)</span><span><i style="background:${C.v}"></i>v<sub>y</sub> vertical component</span><span><i style="background:${C.r}"></i>velocity v (along the tangent)</span></div>`;
  };

  F.comp = (a, b2, ang) => svg(230, 160,
    L(30, 140, 190, 40, 'k', 'e', { w: 2.6 }) + L(30, 140, 190, 140, 'o', 'e', { w: 2 }) + L(190, 140, 190, 40, 'v', 'e', { w: 2 }) +
    dot(30, 140, 6, '#3CB371') + P('M70,140 A40,40 0 0 0 64,119', 'ink', { w: 1.4 }) + T(82, 132, ang || 'α', { it: 1 }) +
    T(100, 82, 'u', { it: 1, b: 1 }) + T(110, 156, a || 'u<tspan font-size="10" dy="3">x</tspan>', { it: 1 }) + T(200, 94, b2 || 'u<tspan font-size="10" dy="3">y</tspan>', { it: 1, a: 'start' }));

  F.vres = (vx, vy) => svg(220, 170,
    L(40, 30, 170, 30, 'v', 'e', { w: 2.4 }) + L(40, 30, 40, 150, 'v', 'e', { w: 2.4 }) + L(40, 30, 170, 150, 'r', 'e', { w: 2.8 }) +
    L(170, 30, 170, 150, 's', '', { d: '4 3', w: 1.2 }) + L(40, 150, 170, 150, 's', '', { d: '4 3', w: 1.2 }) +
    P('M75,30 A35,35 0 0 1 66,54', 'ink', { w: 1.4 }) + T(84, 54, 'θ', { it: 1 }) + T(100, 102, 'v', { it: 1, b: 1 }) +
    T(105, 22, vx, { fs: 12, b: 1 }) + T(34, 160, vy, { fs: 12, b: 1, a: 'start' }));

  F.angles = () => {
    let b = axes(50, 200, 400, 175, 'x (m)', 'y (m)');
    const u2g = 200; // range at 45° = 200 m
    [15, 30, 45, 60, 75].forEach((d, k) => {
      const th = d * Math.PI / 180, R = u2g * Math.sin(2 * th), H = u2g * Math.sin(th) ** 2 / 2, pts = [];
      for (let i = 0; i <= 40; i++) { const x = R * i / 40, y = x * Math.tan(th) * (1 - x / R); pts.push(`${(50 + x * 1.9).toFixed(1)},${(200 - y * 1.6).toFixed(1)}`); }
      const col = ['#8FA3C8', '#6A63EC', '#C0392B', '#4A42C9', '#2B3990'][k];
      b += `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="${d === 45 ? 3 : 2}"/>` + T(50 + R * 0.5 * 1.9, 200 - H * 1.6 - 6, d + '°', { fs: 12, c: col, b: 1 });
    });
    [50, 100, 150, 200].forEach(x => { b += T(50 + x * 1.9, 216, x, { fs: 11, c: C.sub }); });
    return svg(500, 225, b);
  };

  F.wall = () => svg(330, 200,
    L(20, 170, 300, 170, 'k', '', { w: 2 }) + `<rect x="250" y="20" width="50" height="150" fill="#E3F4D5" stroke="${C.g}"/>` + T(275, 60, 'wall', { fs: 13, it: 1 }) +
    dot(40, 170, 6, C.v) + L(40, 170, 100, 125, 'r', 'e', { w: 2.6 }) + P('M40,170 Q150,40 250,118', 'ink', { w: 1.8, d: '2 4' }) +
    L(240, 120, 240, 168, 'k', 'b', { w: 1.6 }) + T(232, 148, 'H = ?', { fs: 13, a: 'end', it: 1 }) + T(84, 120, 'u = 20 m/s', { fs: 12, a: 'end', it: 1 }) +
    P('M68,170 A28,28 0 0 0 62,153', 'ink', { w: 1.2 }) + T(76, 162, '37°', { fs: 12, a: 'start' }) + L(40, 188, 250, 188, 'k', 'b', { w: 1.4 }) + T(145, 200, 'R = 32 m', { fs: 13, it: 1 }) + T(256, 182, 'O', { fs: 12, a: 'start' }));

  F.buildings = () => svg(340, 210,
    `<rect x="30" y="80" width="70" height="125" fill="#BDEBD9" stroke="${C.g}"/>` + L(270, 10, 270, 205, 'k', '', { w: 2 }) +
    dot(100, 80, 5, C.ink) + L(100, 80, 140, 47, 'v', 'e', { w: 2.6 }) + T(146, 42, 'u = 20 m/s', { fs: 12, a: 'start', it: 1 }) +
    P('M126,80 A26,26 0 0 0 120,63', 'r', { w: 1.4 }) + T(132, 72, '40°', { fs: 12, a: 'start' }) +
    P('M100,80 Q180,-10 270,118', 'ink', { w: 1.8, d: '2 4' }) + L(100, 80, 270, 80, 's', '', { d: '4 3', w: 1 }) +
    L(285, 80, 285, 118, 'k', 'e', { w: 1.6 }) + T(292, 104, 's<tspan font-size="10" dy="3">y</tspan>', { a: 'start', it: 1 }) +
    L(100, 140, 270, 140, 'k', 'b', { w: 1.4 }) + T(185, 156, '50 m', { fs: 13, b: 1 }));

  F.bomb = () => svg(340, 220,
    `<rect x="0" y="0" width="340" height="220" fill="#EAF4FB"/>` + L(0, 200, 340, 200, 'g', '', { w: 3 }) +
    `<path d="M30,30 l40,0 l10,-6 l4,6 l-4,6 z" fill="${C.sub}"/>` + L(56, 30, 110, 30, 'r', 'e', { w: 2.6 }) + T(116, 34, 'uₓ = 120 m/s', { fs: 12, a: 'start' }) +
    P('M56,36 Q200,40 270,198', 'o', { w: 2, d: '5 4' }) + L(56, 36, 56, 198, 'v', 'b', { w: 1.6 }) + T(64, 120, 's<tspan font-size="10" dy="3">y</tspan> = −2000 m', { fs: 12, a: 'start', it: 1 }) +
    L(56, 212, 270, 212, 'k', 'b', { w: 1.4 }) + T(160, 208, 'sₓ = ?', { fs: 12, it: 1 }));


  // ---------- Chapter 2: Kinematics ----------
  const S21 = `
<section class="ls-sec" id="ls-2-0">
<h3 class="ls-h">2.0 Introduction</h3>
${def('Kinematics', `is the study of ${red('motion without regard to mass or force')}. (From the Greek word for <i>motion</i>.)`)}
<p>In this chapter we study motion along</p>
${ul([`<b>a straight line</b> (one-dimensional motion): linear motion, including <b>free fall</b>`, `<b>a curved path</b> (two-dimensional motion): <b>projectile motion</b>`])}
</section>

<section class="ls-sec" id="ls-2-1">
<h3 class="ls-h">2.1 Linear motion</h3>

<h4 class="ls-h4">Distance and displacement</h4>
${def('Distance, <i>s</i>', `is the ${red('length of the path')} between two specified moments in time. It is a <b>scalar</b>.`)}
${def('Displacement, ' + vec('s'), `is the ${red('difference between the final position and the initial position')} of a moving object. It is a <b>vector</b>.`)}
${eq(`<i>s</i> = <i>s</i><sub>f</sub> − <i>s</i><sub>i</sub>`)}
<p class="ls-small">where <i>s</i><sub>f</sub> = final position and <i>s</i><sub>i</sub> = initial position.</p>
${fig(F.disp())}

<h4 class="ls-h4">Speed and velocity</h4>
${two(def('Speed, <i>v</i>', `is the ${red('rate of change of distance')} (change of distance per unit time). Scalar.`) + eq(`<i>v</i> = ${fr('d<i>s</i>', 'd<i>t</i>')}`),
      def('Velocity, ' + vec('v'), `is the ${red('rate of change of displacement')} (change of displacement per unit time). Vector.`) + eq(`${vec('v')} = ${fr('d<i>s</i>', 'd<i>t</i>')}`))}

${two(def('Average speed, ' + avg('<i>v</i>'), `is the ${red('distance travelled divided by the elapsed time')}.`) + eq(`${avg('<i>v</i>')} = ${fr('Δ<i>s</i>', 'Δ<i>t</i>')}`),
      def('Average velocity, ' + avg(vec('v')), `is the ${red('displacement divided by the elapsed time')}, in the same direction as the displacement.`) + eq(`${avg(vec('v'))} = ${fr('Δ<i>s</i>', 'Δ<i>t</i>')} = ${fr('<i>s</i><sub>f</sub> − <i>s</i><sub>i</sub>', '<i>t</i><sub>f</sub> − <i>t</i><sub>i</sub>')}`))}

${two(fig(F.gradLine()), `<p><b>Average velocity = gradient</b> of the displacement–time graph:</p>${eq(`${avg(vec('v'))} = ${fr('Δ<i>s</i>', 'Δ<i>t</i>')}`)}<p>A ${red('straight-line')} <i>s</i>–<i>t</i> graph means the object moves with ${red('uniform velocity')}, so the velocity at every instant equals the average velocity.</p>`)}

${def('Instantaneous velocity', `is the limit of the average velocity as the time interval approaches zero; it equals the instantaneous rate of change of displacement with time.`)}
${two(eq(`${vec('v')} = lim<sub style="font-size:.7em">Δ<i>t</i>→0</sub> ${fr('Δ<i>s</i>', 'Δ<i>t</i>')} = ${fr('d<i>s</i>', 'd<i>t</i>')}`) + `<p>= <b>gradient of the tangent</b> to the <i>s</i>–<i>t</i> graph at that instant.</p>`, fig(F.tangent('s')))}
${ul([`Instantaneous velocity is a <b>vector</b>.`, `Its <b>direction</b> at any instant is <b><i>along the tangent</i></b> to the path at that point (e.g. point A).`, `Its <b>magnitude</b> at any instant is equal to the <b><i>speed</i></b> at that point.`])}
${fig(F.path())}

${def('Uniform velocity', `Velocity is uniform (${red('constant')}) if (a) its magnitude is constant and (b) its direction is unchanged. The average and instantaneous velocities are then equal.`)}

<h4 class="ls-h4">Acceleration</h4>
${def('Acceleration, ' + vec('a'), `is the ${red('rate of change of velocity')}.`)}
${eq(`${vec('a')} = ${fr('d<i>v</i>', 'd<i>t</i>')}`)}
${ul([`<b>Acceleration</b> is the rate of <b><i>increase</i></b> of velocity: acceleration and velocity point in the same direction (positive value).`, `<b>Deceleration</b> is the rate of <b><i>decrease</i></b> of velocity: acceleration and velocity point in opposite directions (negative value).`])}
${def('Average acceleration, ' + avg(vec('a')), `is the ${red('change in velocity divided by the time taken')}. It shows how the speed and its direction change with time.`)}
${eq(`${avg(vec('a'))} = ${fr('Δ<i>v</i>', 'Δ<i>t</i>')} = ${fr('<i>v</i><sub>f</sub> − <i>v</i><sub>i</sub>', '<i>t</i><sub>f</sub> − <i>t</i><sub>i</sub>')}`)}
${def('Instantaneous acceleration', `is the limit of the average acceleration as the time interval approaches zero; it equals the instantaneous rate of change of velocity with time.`)}
${two(eq(`${vec('a')} = lim<sub style="font-size:.7em">Δ<i>t</i>→0</sub> ${fr('Δ<i>v</i>', 'Δ<i>t</i>')} = ${fr('d<i>v</i>', 'd<i>t</i>')}`) + `<p>= <b>gradient of the tangent</b> to the <i>v</i>–<i>t</i> graph.</p>`, fig(F.tangent('v')))}
${def('Uniform acceleration', `Acceleration is uniform (${red('constant')}) if (a) its magnitude is constant and (b) its direction is unchanged. The average and instantaneous accelerations are then equal.`)}
<div class="ls-grid2">
  <div>${F.mini('v', 'upFrom0')}<p><b>Velocity increases uniformly</b>: gradient constant, so <i>a</i> is uniform.</p></div>
  <div>${F.mini('v', 'flatP', 'r')}<p><b>Constant velocity</b>: gradient = 0, so <i>a</i> = 0.</p></div>
</div>

<h4 class="ls-h4">Worked examples: distance, displacement, speed and velocity</h4>
${example('2.1.1', `An object moves 3 m from A to B, then 4 m from B to C (at right angles). Find its distance and displacement.`,
  steps([`Distance = AB + BC = 3 + 4 = <b>7 m</b>`, `Displacement: magnitude AC = ${sq('3<sup>2</sup> + 4<sup>2</sup>')} = <b>5 m</b>`, `Direction: θ = cos<sup>−1</sup> ${fr('3', '5')} = <b>53.1°</b> from AB`]), fig(F.tri('A', 'B', 'C', '3 m', '4 m', '5 m')))}
${example('2.1.2', `An object moves from A to B (5 m) and then from B back to C (2 m). What is its distance? What is its displacement?`,
  steps([`Distance = AB + BC = 5 + 2 = <b>7 m</b>`, `Displacement: AC = (+5) + (−2) = <b>+3 m</b>`, `Direction: <b>3 m to the right of A</b>`]),
  fig(F.track({ A: 0, C: 3, B: 5 }, [['A', 'B', '5 m', 'g', 70], ['B', 'C', '2 m', 'v', 88]])))}
${example('2.1.3', `An object moves from A to B (5 m) and then from B back to A. What are the distance and the displacement?`,
  steps([`Distance = 5 + 5 = <b>10 m</b>`, `Displacement = (+5) + (−5) = <b>0 m</b>`]),
  fig(F.track({ A: 0, B: 5 }, [['A', 'B', '5 m', 'r', 70], ['B', 'A', '', 'g', 88]])))}
${example('2.1.4', `An object moves from A to B (5 m) and then from B to C (8 m). What is its distance? What is its displacement?`,
  steps([`Distance = 5 + 8 = <b>13 m</b>`, `Displacement: AC = (+5) + (−8) = <b>−3 m</b>`, `Direction: <b>3 m to the left of A</b>`]),
  fig(F.track({ C: -3, A: 0, B: 5 }, [['A', 'B', '5 m', 'r', 70], ['B', 'C', '8 m', 'g', 88]])))}

${two(def('Speed, <i>v</i>', `Scalar. Total distance moved, <i>s</i>, divided by the time, <i>t</i>.`) + eq(`<i>v</i> = ${fr('<i>s</i>', '<i>t</i>')}`),
      def('Velocity, ' + vec('v'), `Vector. Displacement, <i>s</i>, divided by the time, <i>t</i>.`) + eq(`${vec('v')} = ${fr('<i>s</i>', '<i>t</i>')} &nbsp;or&nbsp; ${vec('v')} = lim<sub style="font-size:.7em">Δ<i>t</i>→0</sub> ${fr('Δ<i>s</i>', 'Δ<i>t</i>')} = ${fr('d<i>s</i>', 'd<i>t</i>')}`))}

${example('2.1.5', `An object moves from P to Q (3 m) in 3 s and from Q to R (4 m, at right angles) in 2 s. What are its speed and velocity?`,
  steps([`Distance = PQ + QR = 3 + 4 = 7 m; time = 3 + 2 = 5 s`, `Speed = ${fr('7', '5')} = <b>1.4 ${ms}</b>`, `Displacement = PR = 5 m; time = 5 s`, `Velocity: magnitude = ${fr('5', '5')} = <b>1 ${ms}</b>`, `Direction: tan θ = ${fr('4', '3')}, θ = <b>53.1°</b> from PQ`]),
  fig(F.tri('P', 'Q', 'R', '3 m', '4 m', '5 m')))}
${example('2.1.6', `A stone is thrown vertically upward with velocity <i>u</i> = 20 ${ms} and returns to its original position. Sketch the graphs of speed against time and velocity against time.`,
  `<p>Going up, the speed falls from 20 ${ms} to 0 at the top; coming down it rises back to 20 ${ms}. The velocity changes uniformly from +20 ${ms} to −20 ${ms} (negative = downward); the gradient is −<i>g</i> throughout.</p>${F.ex216()}`)}

<h4 class="ls-h4">Acceleration and deceleration from a graph</h4>
${example('2.1.7', `Based on the <i>v</i>–<i>t</i> graph below, describe the motion of the particle.`,
  ul([`<b>AB</b>: <i>v</i> increases ⇒ <b>acceleration</b> (constant)`, `<b>BC</b>: <i>v</i> decreases ⇒ <b>deceleration</b> (constant)`, `<b>CD</b>: <i>v</i> increases in the opposite direction (−<i>v</i>) ⇒ <b>acceleration</b>`, `<b>DE</b>: <i>v</i> decreases, still in the opposite direction (−<i>v</i>) ⇒ <b>deceleration</b>`]),
  fig(F.ex217()))}

<h4 class="ls-h4">Graphs for linear motion</h4>
<p>Gradient of <i>s</i>–<i>t</i> = velocity. Gradient of <i>v</i>–<i>t</i> = acceleration. Area under <i>v</i>–<i>t</i> = displacement. Area under <i>a</i>–<i>t</i> = change in velocity.</p>
<div class="ls-gtab">
  <div class="ls-gh"></div><div class="ls-gh"><i>s</i>–<i>t</i> graph</div><div class="ls-gh"><i>v</i>–<i>t</i> graph</div><div class="ls-gh"><i>a</i>–<i>t</i> graph</div>
  <div class="ls-gr">Uniform velocity</div><div>${F.mini('s', 'upFrom0')}<p>gradient = velocity (constant)</p></div><div>${F.mini('v', 'flatP', 'r')}<p>gradient = 0, area = displacement</p></div><div>${F.mini('a', 'flat0', 'v')}<p><i>a</i> = 0</p></div>
  <div class="ls-gr">Uniform acceleration</div><div>${F.mini('s', 'curveUp')}<p>gradient increases: velocity increases</p></div><div>${F.mini('v', 'up', 'r')}<p>velocity increases uniformly</p></div><div>${F.mini('a', 'flatP', 'v')}<p><i>a</i> positive, area = change in velocity</p></div>
  <div class="ls-gr">Uniform deceleration</div><div>${F.mini('s', 'curveDown')}<p>gradient decreases: velocity decreases</p></div><div>${F.mini('v', 'down', 'r')}<p>velocity decreases uniformly</p></div><div>${F.mini('a', 'flatN', 'v')}<p><i>a</i> negative, area = change in velocity</p></div>
</div>
${sim('graphs', 'Motion graphs: watch s–t, v–t and a–t being drawn', 'Pick a motion, or set the initial velocity and acceleration yourself, then press Play. Turn on "Area under v–t" to see that the shaded area equals the displacement.')}

${example('2.1.8', `From the <i>v</i>–<i>t</i> graph, describe the motion of the object and determine (a) the acceleration, (b) the deceleration, (c) the total distance moved.`,
  ul([`At A: <i>t</i> = 0, <i>v</i> = 0`, `<b>AB</b>: <i>v</i> increases uniformly, constant acceleration`, `<b>BC</b>: constant <i>v</i>, <i>a</i> = 0`, `<b>CD</b>: <i>v</i> decreases uniformly, constant deceleration`, `At D: <i>v</i> = 0`]) +
  steps([`(a) Acceleration, <i>a</i> = ${fr('20', '4')} = <b>5 ${ms2}</b>`, `(b) Deceleration, <i>a</i> = ${fr('0 − 20', '12 − 10')} = <b>−10 ${ms2}</b>`, `(c) Total distance = area under graph = ${half}[(10 − 4) + 12] × 20 = <b>180 m</b>`]),
  fig(F.ex218()))}
</section>

<section class="ls-sec" id="ls-2-1-eq">
<h3 class="ls-h">2.1 Equations of motion (uniform acceleration)</h3>
${two(`<p>From the <i>v</i>–<i>t</i> graph:</p>${ul(['<i>v</i> = final velocity', '<i>u</i> = initial velocity', '<i>a</i> = acceleration', '<i>t</i> = time', '<i>s</i> = area under the graph = displacement'])}`, fig(F.vt(true)))}
${steps([
  `From ${'<i>a</i>'} = ${fr('d<i>v</i>', 'd<i>t</i>')} = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')}, rearranging: <span class="ls-tag">(i)</span> <b><i>v</i> = <i>u</i> + <i>at</i></b>`,
  `Area under the graph (trapezium): <span class="ls-tag">(ii)</span> <b><i>s</i> = ${half}(<i>u</i> + <i>v</i>)<i>t</i></b>`,
  `Substitute (i) into (ii): <i>s</i> = ${half}[<i>u</i> + (<i>u</i> + <i>at</i>)]<i>t</i>, so <span class="ls-tag">(iii)</span> <b><i>s</i> = <i>ut</i> + ${half}<i>at</i><sup>2</sup></b>`,
  `From (i), <i>t</i> = ${fr('<i>v</i> − <i>u</i>', '<i>a</i>')}. Substitute into (iii): <i>s</i> = <i>u</i>(${fr('<i>v</i> − <i>u</i>', '<i>a</i>')}) + ${half}<i>a</i>(${fr('<i>v</i> − <i>u</i>', '<i>a</i>')})<sup>2</sup>`,
  `2<i>as</i> = 2<i>uv</i> − 2<i>u</i><sup>2</sup> + (<i>v</i><sup>2</sup> − 2<i>uv</i> + <i>u</i><sup>2</sup>), so <span class="ls-tag">(iv)</span> <b><i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> + 2<i>as</i></b>`])}
${key(`<i>s</i> = ${half}(<i>u</i> + <i>v</i>)<i>t</i><br><i>s</i> = <i>ut</i> + ${half}<i>at</i><sup>2</sup><br><i>v</i> = <i>u</i> + <i>at</i><br><i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> + 2<i>as</i>`, 'Equations of motion with uniform acceleration')}

<h4 class="ls-h4">Sign convention</h4>
<div class="ls-tw"><table class="ls-t"><thead><tr><th>Quantity</th><th>To the left</th><th>To the right</th></tr></thead><tbody>
<tr><td>Displacement, <i>s</i></td><td>−ve</td><td>+ve</td></tr><tr><td>Velocity, <i>v</i></td><td>−ve</td><td>+ve</td></tr></tbody></table></div>
${ul(['Acceleration: +ve; deceleration: −ve.', `Special case, uniform velocity: <i>u</i> = <i>v</i> ⇒ <i>a</i> = 0 and <i>s</i> = <i>ut</i>.`])}

${example('2.2.1', `An object is moving along the x-axis. Its velocity at the starting point O is 5 ${ms}. If it has a uniform acceleration of 6 ${ms2}, calculate (a) its position after 2 s, (b) its velocity after 3 s.`,
  steps([`Given: <i>u</i> = 5 ${ms}, <i>a</i> = 6 ${ms2}`, `(a) <i>s</i> = <i>ut</i> + ${half}<i>at</i><sup>2</sup> = (5)(2) + ${half}(6)(2)<sup>2</sup> = <b>22 m</b> (to the right)`, `(b) <i>v</i> = <i>u</i> + <i>at</i> = 5 + (6)(3) = <b>23 ${ms}</b> (to the right)`]))}
${example('2.2.2', `An airplane lands with an initial velocity of 70.0 m/s and then decelerates at 1.50 m/s² for 40.0 s. What is its final velocity?`,
  steps([`Given: <i>u</i> = 70.0 m/s, <i>a</i> = −1.50 m/s², <i>t</i> = 40.0 s`, `<i>v</i> = <i>u</i> + <i>at</i> = 70.0 + (−1.50)(40.0) = <b>10.0 m/s</b>`]))}
${example('2.2.3', `A vehicle accelerates uniformly along a straight road, increasing its speed from 4.0 m/s to 30.0 m/s in 13 s. Calculate (a) its acceleration, (b) the distance it moves in this time.`,
  steps([`(a) <i>a</i> = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')} = ${fr('30.0 − 4.0', '13')} = <b>2.0 m/s²</b>`, `(b) <i>s</i> = ${half}(<i>u</i> + <i>v</i>)<i>t</i> = ${half}(4.0 + 30.0)(13) = 221 ≈ <b>220 m</b>`]))}
${example('2.2.4', `A body with initial velocity 8.0 m/s moves along a straight line with constant acceleration and travels 640 m in 40 s. For the 40 s interval, find (a) the average velocity, (b) the final velocity, (c) the acceleration.`,
  steps([`Given: <i>u</i> = 8.0 m/s, <i>s</i> = 640 m, <i>t</i> = 40 s`, `(a) ${avg(vec('v'))} = ${fr('<i>s</i>', '<i>t</i>')} = ${fr('640', '40')} = <b>16 m/s</b>`, `(b) ${avg(vec('v'))} = ${fr('<i>u</i> + <i>v</i>', '2')} ⇒ <i>v</i> = 2(16) − 8.0 = <b>24 m/s</b>`, `(c) <i>a</i> = ${fr('<i>v</i> − <i>u</i>', '<i>t</i>')} = ${fr('24 − 8.0', '40')} = <b>0.40 m/s²</b>`]))}

${exercises('Exercises: equations of motion', [
  { q: `A vehicle on a straight downhill road accelerated uniformly from 4.0 m/s to 29 m/s over a distance of 850 m, when the driver braked and stopped the vehicle in 28 s.<br>(a) Calculate (i) the time taken to reach 29 m/s from 4 m/s, (ii) its acceleration during this time.<br>(b) Calculate (i) the distance it travelled during deceleration, (ii) its average deceleration as it slowed down.`, a: `(a)(i) 52 s &nbsp; (ii) 0.49 m/s² &nbsp; (b)(i) 406 m &nbsp; (ii) −1.04 m/s²` },
  { q: `A rail wagon moving at 2.0 m/s on a level track reached a steady incline, which slowed it down in 15.0 s and caused it to reverse. Calculate (a) the distance it moved up the incline, (b) its acceleration on the incline, (c) its velocity and position on the incline after 20.0 s.`, a: `(a) 15 m &nbsp; (b) −0.133 m/s² &nbsp; (c) 0.67 m/s downwards, 13.3 m from the start` }])}
</section>

<section class="ls-sec" id="ls-2-1-ff">
<h3 class="ls-h">2.1 Linear motion: free fall</h3>
${def('Free fall', `${red('Free-fall motion')} is the motion of an object under the influence of the <b><i>Earth's gravitational attraction</i></b> only.`)}
${ul([`An object in free fall has only gravity acting on it (<b><i>no air resistance or friction</i></b>).`, `On Earth all free-falling objects have the same <b><i>acceleration due to gravity, g</i></b> = 9.81 ${ms2}.`, `The direction of <i>g</i> is <b>downward</b>.`])}
${key(`<i>s</i> = <i>ut</i> − ${half}<i>gt</i><sup>2</sup><br><i>v</i> = <i>u</i> − <i>gt</i><br><i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> − 2<i>gs</i>`, `Upward is positive, so <i>a</i> = −<i>g</i>. Put <i>g</i> = 9.81 ${ms2} into these equations: the minus sign is already in them.`)}
<h4 class="ls-h4">Sign convention</h4>
<div class="ls-tw"><table class="ls-t"><thead><tr><th>Quantity</th><th>Upward motion</th><th>Downward motion</th></tr></thead><tbody>
<tr><td>Displacement, <i>s</i></td><td>+ve</td><td>−ve</td></tr><tr><td>Velocity, <i>v</i></td><td>+ve</td><td>−ve</td></tr><tr><td>Acceleration due to gravity</td><td>−ve</td><td>−ve</td></tr></tbody></table></div>
<p>An object released from rest (<i>u</i> = 0) at height <i>h</i> has displacement <b>−<i>s</i></b> when it reaches the ground.</p>

${sim('vertical', 'Vertical motion: drop it, throw it up, launch it from a height', 'Set the launch velocity (upward is positive) and the starting height, or tap one of the examples. The ball, its velocity arrow and the v–t graph run together; the results appear when it lands.')}

${example('2.3.1', `An object is released from rest at a height of 25 m from a building. Determine the time and velocity when it reaches the ground.`,
  steps([`<i>u</i> = 0, <i>s</i> = −25 m, <i>g</i> = 9.81 ${ms2}`, `<i>s</i> = <i>ut</i> − ${half}<i>gt</i><sup>2</sup>: −25 = 0 − ${half}(9.81)<i>t</i><sup>2</sup>, <i>t</i> = <b>2.26 s</b>`, `<i>v</i> = <i>u</i> − <i>gt</i> = 0 − (9.81)(2.26) = <b>−22.2 ${ms}</b> (−ve: downward)`]), fig(F.drop('h = 25 m', 't = ?')))}
${example('2.3.2', `An object is released from rest at height <i>H</i> from a building; it takes 12 s to reach the ground. Determine the height and the velocity when it reaches the ground.`,
  steps([`<i>u</i> = 0, <i>t</i> = 12 s, <i>g</i> = 9.81 ${ms2}`, `<i>s</i> = <i>ut</i> − ${half}<i>gt</i><sup>2</sup> = 0 − ${half}(9.81)(12)<sup>2</sup> = −706 m, so the height is <b>706 m</b>`, `<i>v</i> = <i>u</i> − <i>gt</i> = 0 − (9.81)(12) = <b>−118 ${ms}</b> (−ve: downward)`]), fig(F.drop('H = ?', 't = 12 s')))}
${example('2.3.3', `An object is thrown upward with a velocity of 15 ${ms}. What is its <b>final velocity</b> when it reaches the ground? What is the <b>flight time</b>?`,
  steps([`Back on the ground: displacement <i>s</i> = 0; <i>u</i> = +15 ${ms}`, `<i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> − 2<i>gs</i> = (15)<sup>2</sup> − 2(9.81)(0) ⇒ <i>v</i> = <b>−15 ${ms}</b> (moving down)`, `<i>s</i> = <i>ut</i> − ${half}<i>gt</i><sup>2</sup>: 0 = 15<i>t</i> − ${half}(9.81)<i>t</i><sup>2</sup> ⇒ <i>t</i> = <b>3.06 s</b>`]), fig(F.up(15)))}
${example('2.3.4', `A ball is thrown vertically upward with <i>u</i> = 20 ${ms}. Determine the ${red('maximum height')} and the ${red('time taken to reach the maximum height')}.`,
  steps([`At maximum height, <i>v</i> = 0. <i>u</i> = 20 ${ms}, <i>g</i> = 9.81 ${ms2}`, `<i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> − 2<i>gs</i>: 0 = 20<sup>2</sup> − 2(9.81)<i>s</i> ⇒ <i>h</i> = <b>20.4 m</b>`, `<i>v</i> = <i>u</i> − <i>gt</i>: 0 = 20 − 9.81<i>t</i> ⇒ <i>t</i> = <b>2.04 s</b>`]), fig(F.up(20)))}
${example('2.3.5', `An object is launched upward from a table of height 5 m with velocity 10 ${ms}. Determine (a) the ${red('maximum height')}, (b) the ${red('time of flight')}, (c) its ${red('velocity')} when it hits the ground.`,
  steps([`(a) At maximum height <i>v</i> = 0: 0 = 10<sup>2</sup> − 2(9.81)<i>s</i> ⇒ <i>s</i> = 5.10 m above the table.<br>Maximum height above the ground, <i>h</i> = <i>s</i> + <i>H</i> = 5.10 + 5 = <b>10.10 m</b>`,
    `(b) Ground is 5 m below the launch point: <i>s</i> = −5 m.<br>−5 = 10<i>T</i> − ${half}(9.81)<i>T</i><sup>2</sup> ⇒ <i>T</i> = <b>2.45 s</b>`,
    `(c) <i>v</i> = <i>u</i> − <i>gt</i> = 10 − (9.81)(2.45) = −14.03 ${ms}<br>or <i>v</i><sup>2</sup> = <i>u</i><sup>2</sup> − 2<i>gs</i> = 10<sup>2</sup> − 2(9.81)(−5) ⇒ <i>v</i> = ±14.07, take <b>−14.07 ${ms}</b> (moving downward)`]) +
    note(`The two answers differ slightly only because <i>T</i> was rounded to 2.45 s. The <i>v</i><sup>2</sup> method does not need <i>T</i>, so it is the more accurate one.`), fig(F.table('5 m', 10)))}

${exercises('Exercises: free fall', [
  { q: `A pebble, released at rest from a bridge, took 0.9 s to hit the water. Calculate (a) the distance it fell before hitting the water, (b) its speed just before hitting the water.`, a: `(a) 4.0 m &nbsp; (b) 8.8 m/s` },
  { q: `A spanner was dropped from a hot-air balloon when the balloon was at rest 50 m above the ground. Calculate (a) the time taken for the spanner to hit the ground, (b) the speed of impact of the spanner on hitting the ground.`, a: `(a) 3.2 s &nbsp; (b) 31 m/s` },
  { q: `A stone is thrown vertically upward with a speed of 12.0 m/s from the edge of a cliff 75.0 m high. (a) How much later does it reach the bottom of the cliff? (b) What is its speed just before hitting? (c) What total distance did it travel?`, a: `(a) 5.33 s &nbsp; (b) 40.2 m/s &nbsp; (c) 89.7 m` }])}
</section>

<section class="ls-sec" id="ls-2-2">
<h3 class="ls-h">2.2 Projectile motion</h3>
${def('Projectile motion', `is a combination of <b><i>horizontal motion with constant velocity</i></b> and <b><i>vertical motion with constant acceleration</i></b>.`)}
${ul([`<b>Horizontal</b>: the velocity in the ${red('x-direction is constant')} (<i>v</i><sub>x</sub> = constant, <i>a</i><sub>x</sub> = 0).`, `<b>Vertical</b>: the velocity in the ${red('y-direction has a constant acceleration due to gravity')}, air resistance ignored (<i>a</i><sub>y</sub> = −<i>g</i> = −9.81 ${ms2}).`])}
${fig(F.proj(), 'Parabola: the path is symmetrical.')}
<p class="ls-small"><i>u</i> = initial velocity; <i>v</i> = velocity at time <i>t</i>; <i>u</i><sub>x</sub>, <i>u</i><sub>y</sub> = initial x- and y-components; <i>v</i><sub>y</sub> = y-component at time <i>t</i>; <i>s</i><sub>x</sub> = <i>R</i> = horizontal range; α (or θ) = launch angle; <i>h</i> = maximum height; <i>T</i> = time of flight.</p>

<h4 class="ls-h4">Equations of projectile motion</h4>
${two(fig(F.comp()), eq(`<i>u</i><sub>x</sub> = <i>u</i> cos α<br><i>u</i><sub>y</sub> = <i>u</i> sin α<br>α = tan<sup>−1</sup> ${fr('<i>u</i><sub>y</sub>', '<i>u</i><sub>x</sub>')}`))}
<div class="ls-tw"><table class="ls-t"><thead><tr><th>Quantity</th><th>Horizontal (x-component)</th><th>Vertical (y-component)</th></tr></thead><tbody>
<tr><td>Displacement, <i>s</i></td><td><i>s</i><sub>x</sub> = <i>u</i><sub>x</sub><i>t</i></td><td><i>s</i><sub>y</sub> = <i>u</i><sub>y</sub><i>t</i> − ${half}<i>gt</i><sup>2</sup></td></tr>
<tr><td>Velocity, <i>v</i></td><td><i>v</i><sub>x</sub> = <i>u</i><sub>x</sub> (constant)</td><td><i>v</i><sub>y</sub> = <i>u</i><sub>y</sub> − <i>gt</i><br><i>v</i><sub>y</sub><sup>2</sup> = <i>u</i><sub>y</sub><sup>2</sup> − 2<i>gs</i><sub>y</sub></td></tr>
<tr><td>Acceleration, <i>a</i></td><td><i>a</i><sub>x</sub> = 0</td><td><i>a</i><sub>y</sub> = −<i>g</i> = −9.81 ${ms2} (constant)</td></tr></tbody></table></div>

<h4 class="ls-h4">Velocity at any point</h4>
${two(eq(`Magnitude: |<i>v</i>| = ${sq('<i>v</i><sub>x</sub><sup>2</sup> + <i>v</i><sub>y</sub><sup>2</sup>')}`) + eq(`Direction: θ = tan<sup>−1</sup> ${fr('<i>v</i><sub>y</sub>', '<i>v</i><sub>x</sub>')}`), fig(F.vres('vₓ', 'vᵧ')))}

<h4 class="ls-h4">Maximum height, <i>H</i></h4>
<p>Vertically: <i>u</i><sub>y</sub> = <i>u</i> sin θ. At maximum height <i>v</i><sub>y</sub> = 0.</p>
${eq(`<i>v</i><sub>y</sub><sup>2</sup> = <i>u</i><sub>y</sub><sup>2</sup> − 2<i>gs</i><sub>y</sub> ⇒ 0 = (<i>u</i> sin θ)<sup>2</sup> − 2<i>gH</i>`)}
${key(`<i>H</i> = ${fr('<i>u</i><sup>2</sup> sin<sup>2</sup> θ', '2<i>g</i>')}`)}

<h4 class="ls-h4">Time of flight, <i>T</i></h4>
<p>Vertically: at the highest point <i>v</i><sub>y</sub> = 0. Using <i>v</i><sub>y</sub> = <i>u</i><sub>y</sub> − <i>gt</i>: 0 = <i>u</i> sin θ − <i>gt</i>, so the time to reach the maximum height is</p>
${eq(`<i>t</i> = ${fr('<i>u</i> sin θ', '<i>g</i>')}`)}
<p>The path is symmetrical: <b>time to go up = time to come down</b>.</p>
${key(`<i>T</i> = 2<i>t</i> = ${fr('2<i>u</i> sin θ', '<i>g</i>')}`)}

<h4 class="ls-h4">Horizontal range, <i>R</i></h4>
<p>Horizontally: <i>a</i><sub>x</sub> = 0, <i>u</i><sub>x</sub> = <i>u</i> cos θ, <i>s</i><sub>x</sub> = <i>R</i> = <i>u</i><sub>x</sub><i>T</i></p>
${eq(`<i>R</i> = (<i>u</i> cos θ)(${fr('2<i>u</i> sin θ', '<i>g</i>')}) &nbsp; where sin 2θ = 2 sin θ cos θ`)}
${key(`<i>R</i> = ${fr('<i>u</i><sup>2</sup> sin 2θ', '<i>g</i>')}`, 'The horizontal range is the horizontal displacement of the projectile (back to the launch level).')}

<h4 class="ls-h4">Maximum range and maximum height</h4>
<div class="ls-two">
<div class="ls-maxc">${eq(`<i>H</i> = ${fr('<i>u</i><sup>2</sup> sin<sup>2</sup> θ', '2<i>g</i>')}`)}<p>maximum when <b>θ = 90°</b>:</p>${eq(`<i>H</i><sub>max</sub> = ${fr('<i>u</i><sup>2</sup>', '2<i>g</i>')}`)}</div>
<div class="ls-maxc y">${eq(`<i>R</i> = ${fr('<i>u</i><sup>2</sup> sin 2θ', '<i>g</i>')}`)}<p>maximum when 2θ = 90°, i.e. <b>θ = 45°</b>:</p>${eq(`<i>R</i><sub>max</sub> = ${fr('<i>u</i><sup>2</sup>', '<i>g</i>')}`)}</div>
</div>
${fig(F.angles(), 'Same launch speed, different angles: 45° goes furthest; 30° and 60° (and 15° and 75°) land at the same place.')}

${sim('projectile', 'Projectile launcher', 'Change the launch speed, angle and height. Watch the horizontal component stay the same while the vertical component shrinks, reverses and grows. "Compare angles" draws 15° to 75° together; "Air resistance" shows the real, lopsided path.')}

${example('2.4.1', `A ball is launched with a velocity of 20 ${ms} at an angle of 60° with the horizontal at point A. Calculate (a) the <b>maximum height</b>, <i>H</i>, (b) the <b>time of flight</b>, (c) the <b>horizontal range</b>, <i>R</i>, (d) its <b>velocity</b> when it strikes the ground.`,
  steps([`(a) Vertically: <i>u</i><sub>y</sub> = 20 sin 60°, <i>v</i><sub>y</sub> = 0 at maximum height.<br><i>v</i><sub>y</sub><sup>2</sup> = <i>u</i><sub>y</sub><sup>2</sup> − 2<i>gs</i><sub>y</sub>: 0 = (20 sin 60°)<sup>2</sup> − 2(9.81)<i>H</i> ⇒ <i>H</i> = <b>15.29 m</b>`,
    `(b) Vertically: <i>s</i><sub>y</sub> = 0 (back on the ground). 0 = <i>u</i> sin θ <i>t</i> − ${half}<i>gt</i><sup>2</sup> ⇒ <i>T</i> = ${fr('2<i>u</i> sin θ', '<i>g</i>')} = ${fr('2(20 sin 60°)', '9.81')} = <b>3.53 s</b>`,
    `(c) Horizontally: <i>u</i><sub>x</sub> = 20 cos 60°, <i>a</i><sub>x</sub> = 0. <i>R</i> = <i>u</i><sub>x</sub><i>T</i> = (20 cos 60°)(3.53) = <b>35.3 m</b>`,
    `(d) <i>v</i><sub>x</sub> = <i>u</i><sub>x</sub> = 20 cos 60° = 10 ${ms}<br><i>v</i><sub>y</sub> = <i>u</i><sub>y</sub> − <i>gT</i> = 20 sin 60° − (9.81)(3.53) = −17.31 ${ms} (downward)`,
    `Magnitude: <i>v</i> = ${sq('10<sup>2</sup> + (−17.31)<sup>2</sup>')} = <b>20 ${ms}</b><br>Direction: θ = tan<sup>−1</sup> ${fr('−17.31', '10')} = −60°`,
    `<b>Its velocity is 20 m/s at 60° below the x-axis.</b>`]) + fig(F.vres('vₓ = 10 m s⁻¹', 'vᵧ = −17.31 m s⁻¹')))}
${example('2.4.2', `Refer to the figure. Where will the ball hit the wall?`,
  steps([`Horizontally: <i>u</i><sub>x</sub> = 20 cos 37°, <i>s</i><sub>x</sub> = 32 m. <i>s</i><sub>x</sub> = <i>u</i><sub>x</sub><i>t</i>: 32 = (20 cos 37°)<i>t</i> ⇒ <i>t</i> = 2.0 s`,
    `Vertically: <i>u</i><sub>y</sub> = 20 sin 37°. <i>s</i><sub>y</sub> = <i>u</i><sub>y</sub><i>t</i> − ${half}<i>gt</i><sup>2</sup> = (20 sin 37°)(2.0) − ${half}(9.81)(2.0)<sup>2</sup> = 4.5 m`,
    `The ball hits the wall <b>4.5 m above point O</b>.`]), fig(F.wall()))}
${example('2.4.3', `A ball is thrown from the top of one building toward a tall building 50 m away. The initial velocity of the ball is 20 m/s at 40° above the horizontal. How far above or below its original level will the ball strike the opposite wall?`,
  steps([`Horizontally: <i>u</i><sub>x</sub> = 20 cos 40°, <i>s</i><sub>x</sub> = 50 m. 50 = (20 cos 40°)<i>t</i> ⇒ <i>t</i> = 3.26 s`,
    `Vertically: <i>u</i><sub>y</sub> = 20 sin 40°. <i>s</i><sub>y</sub> = (20 sin 40°)(3.26) − ${half}(9.81)(3.26)<sup>2</sup> = −10.22 m`,
    `The ball hits <b>10.22 m below</b> its original level.`]), fig(F.buildings()))}
${example('2.4.4', `A military airplane is flying horizontally at 120 m/s and accidentally drops a bomb at an elevation of 2000 m. (a) How much time is required for the bomb to reach the earth? (b) How far does it travel horizontally while falling? (c) Find the horizontal and vertical components of its velocity just before it strikes the earth. (d) Find the resultant velocity of the bomb just before it strikes the earth.`,
  steps([`(a) Vertically: <i>u</i><sub>y</sub> = 120 sin 0° = 0, <i>s</i><sub>y</sub> = −2000 m.<br>−2000 = 0 − ${half}(9.81)<i>t</i><sup>2</sup> ⇒ <i>t</i> = <b>20.2 s</b>`,
    `(b) Horizontally: <i>u</i><sub>x</sub> = 120 cos 0° = 120 m/s. <i>s</i><sub>x</sub> = <i>u</i><sub>x</sub><i>t</i> = (120)(20.2) = <b>2424 m</b>`,
    `(c) <i>v</i><sub>x</sub> = 120 ${ms}; <i>v</i><sub>y</sub> = <i>u</i><sub>y</sub> − <i>gt</i> = 0 − (9.81)(20.2) = <b>−198 ${ms}</b> (downward)`,
    `(d) Magnitude: <i>v</i> = ${sq('120<sup>2</sup> + (−198)<sup>2</sup>')} = <b>231.5 ${ms}</b><br>Direction: θ = tan<sup>−1</sup> ${fr('−198', '120')} = −58.8°`,
    `<b>The bomb hits the ground at 231.5 m/s, 58.8° below the x-axis.</b>`]), fig(F.bomb()))}

${exercises('Exercises: projectile motion', [
  { q: `A body is projected upward from level ground at an angle of 50° with the horizontal with an initial speed of 40 m/s. (a) How long will it take to hit the ground? (b) How far from the starting point will it strike? (c) At what angle with the horizontal will it strike?`, a: `(a) 6.3 s &nbsp; (b) 0.16 km &nbsp; (c) 50°` },
  { q: `An object is projected horizontally at 16 m/s into the sea from a cliff top 45.0 m high. Calculate (a) how long it takes to reach the sea, (b) the horizontal range, (c) its impact velocity.`, a: `(a) 3.0 s &nbsp; (b) 49 m &nbsp; (c) 34 m/s at 62° to the horizontal` },
  { q: `An object is thrown at 37° with the horizontal from a bridge 20.0 m above a river, with initial speed 30.0 m/s. Calculate (a) the time of flight, (b) the horizontal range, (c) the final velocity at impact.`, a: `(a) 4.57 s &nbsp; (b) 110 m &nbsp; (c) 35.9 m/s, 48.1° below the horizontal` },
  { q: `An arrow is fired at 45 m/s at 30° above the horizontal. Calculate (a) its maximum height, (b) how long it takes to reach the maximum height, (c) how long it takes to return to the same horizontal level as it started, (d) the horizontal distance travelled to the point of return in (c).`, a: `(a) 25.8 m &nbsp; (b) 2.3 s &nbsp; (c) 4.6 s &nbsp; (d) 179 m` },
  { q: `A ball is thrown upward at 30° to the horizontal and lands on the top edge of a building 20 m away. The top edge is 5.0 m above the throwing point. How fast was the ball thrown?`, a: `20 m/s` }])}
</section>

<section class="ls-sec" id="ls-2-2-air">
<h3 class="ls-h">2.2 Air resistance effects on projectile motion</h3>
<div class="ls-two">
<div class="ls-cmp"><div class="ls-cmp-h">Without air resistance</div>${ul(['The trajectory is a perfect parabola.', 'Horizontal velocity is constant; vertical acceleration = <i>g</i>.', 'Maximum range is achieved at launch angle θ = 45°.'])}</div>
<div class="ls-cmp o"><div class="ls-cmp-h">With air resistance</div>${ul(['<b>Horizontal velocity decreases</b>: air drag opposes the horizontal motion.', '<b>Vertical deceleration increases</b> on the way up: net downward force = <i>mg</i> + drag.', '<b>The trajectory is no longer a symmetrical parabola.</b>', '<b>Maximum range occurs at an angle less than 45°.</b>', '<b>Horizontal range and maximum height are both reduced.</b>', 'The time to descend is longer than the time to ascend.', 'The impact speed is less than the launch speed.'])}</div>
</div>
${tip('Open the projectile launcher above and switch on "Air resistance": the dashed path is the ideal parabola, the solid path is with drag. Try 45° and then 40°: with drag, 40° goes further.')}
</section>
<section class="ls-sec" id="ls-2-rw">${window.PhysiQRealWorld ? window.PhysiQRealWorld.sportsBlock('ls-2-rw-sports') : ''}</section>`;

  window.PhysiQLessons.register('LESSON-2', { html: () => S21 });
})();
