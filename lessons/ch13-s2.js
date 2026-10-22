/* Semester 2 Chapter 12 Electrostatics: full notes by Cikgu Suhaili (from Unit_3_-_Electrostatics.pptx).
   App chapter 12 = STPM 2026 syllabus chapter 13. Relative permittivity (13.1 c, d) and Gauss's law (13.3)
   are not in the slides and were written from the syllabus. */
(function () {
  'use strict';
  const { card, fr, sq, eq, key, def, red, note, tip, ul, steps, fig, two, example, exercises, sim, svg, L, T, P, dot, axes, C, table, sec, h4, rw } = window.PhysiQLessons.H;

  // ---------- shared physics for the figures and the simulations ----------
  // charges: [{x, y, q}] in drawing units; field and potential up to a constant
  const fieldAt = (Q, x, y) => { let ex = 0, ey = 0; for (const c of Q) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2) || 1e-6, k = c.q / (r2 * r); ex += k * dx; ey += k * dy; } return [ex, ey]; };
  const potAt = (Q, x, y) => Q.reduce((s, c) => s + c.q / (Math.hypot(x - c.x, y - c.y) || 1e-6), 0);
  // field lines: start around the positive charges (or around the negative ones when there is no positive charge)
  function traceLines(Q, box, perUnit, step, r0) {
    const out = [], pos = Q.filter(c => c.q > 0), src = pos.length ? pos : Q, dir = pos.length ? 1 : -1;
    for (const c of src) {
      const n = Math.max(1, Math.round(Math.abs(c.q) * perUnit));
      for (let i = 0; i < n; i++) {
        const a = 2 * Math.PI * (i + 0.5) / n + (c.rot || 0);
        let x = c.x + r0 * Math.cos(a), y = c.y + r0 * Math.sin(a); const pts = [[x, y]];
        for (let s = 0; s < 2500; s++) {
          const [ex, ey] = fieldAt(Q, x, y), m = Math.hypot(ex, ey); if (!m) break;
          x += dir * step * ex / m; y += dir * step * ey / m; pts.push([x, y]);
          if (x < box[0] || x > box[2] || y < box[1] || y > box[3]) break;
          if (Q.some(o => o !== c && Math.hypot(x - o.x, y - o.y) < r0 * 0.9)) break;
        }
        out.push({ pts, dir });
      }
    }
    return out;
  }
  // equipotential contours by marching squares: returns [[x1,y1,x2,y2], ...] for each level
  function contours(f, box, levels, res) {
    const [x0, y0, x1, y1] = box, nx = Math.ceil((x1 - x0) / res), ny = Math.ceil((y1 - y0) / res), V = [];
    for (let j = 0; j <= ny; j++) { V[j] = []; for (let i = 0; i <= nx; i++) V[j][i] = f(x0 + i * res, y0 + j * res); }
    return levels.map(lv => {
      const seg = [];
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const a = V[j][i], b = V[j][i + 1], c = V[j + 1][i + 1], d = V[j + 1][i], X = x0 + i * res, Y = y0 + j * res, pts = [];
        const cut = (p, q, xa, ya, xb, yb) => { if ((p - lv) * (q - lv) < 0 && isFinite(p) && isFinite(q)) { const t = (lv - p) / (q - p); pts.push([xa + t * (xb - xa), ya + t * (yb - ya)]); } };
        cut(a, b, X, Y, X + res, Y); cut(b, c, X + res, Y, X + res, Y + res); cut(d, c, X, Y + res, X + res, Y + res); cut(a, d, X, Y, X, Y + res);
        if (pts.length >= 2) seg.push([pts[0][0], pts[0][1], pts[1][0], pts[1][1]]);
        if (pts.length === 4) seg.push([pts[2][0], pts[2][1], pts[3][0], pts[3][1]]);
      }
      return seg;
    });
  }

  // ---------- figures ----------
  const chg = (x, y, s, lab, o = {}) => `<circle cx="${x}" cy="${y}" r="${o.r || 11}" fill="${s > 0 ? '#F9D9C8' : '#D9E7F7'}" stroke="${s > 0 ? C.r : '#2C6BB3'}" stroke-width="1.8"/>` +
    T(x, y + 5, s > 0 ? '+' : '−', { fs: 15, b: 1, c: s > 0 ? C.r : '#2C6BB3' }) + (lab ? T(x + (o.dx || 0), y + (o.dy != null ? o.dy : -17), lab, { fs: o.fs || 12, it: o.it, b: o.lb }) : '');
  const pathOf = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const arrowOn = (pts, dir, col, frac = 0.45) => {
    const i = Math.max(1, Math.min(pts.length - 2, Math.round(pts.length * frac))), [x, y] = pts[i], [xp, yp] = pts[i - 1];
    let ux = x - xp, uy = y - yp; const m = Math.hypot(ux, uy) || 1; ux = ux / m * dir; uy = uy / m * dir;
    const h = 6, w = 3.6; return `<path d="M${(x + ux * h).toFixed(1)},${(y + uy * h).toFixed(1)} L${(x - uy * w).toFixed(1)},${(y + ux * w).toFixed(1)} L${(x + uy * w).toFixed(1)},${(y - ux * w).toFixed(1)}Z" fill="${col}"/>`;
  };
  const fieldFig = (Q, W, H, o = {}) => {
    const box = [-6, -6, W + 6, H + 6], lines = traceLines(Q, box, o.per || 7, 2, 12);
    let body = `<rect x="0" y="0" width="${W}" height="${H}" fill="#FBFCF6" rx="8"/>`;
    if (o.eq) contours((x, y) => potAt(Q, x, y), [0, 0, W, H], o.eq, 3).forEach(seg => { body += `<path d="${seg.map(s => `M${s[0].toFixed(1)},${s[1].toFixed(1)}L${s[2].toFixed(1)},${s[3].toFixed(1)}`).join('')}" stroke="${C.g}" stroke-width="1.4" stroke-dasharray="4 3" fill="none"/>`; });
    lines.forEach(l => { const pts = l.pts.filter(p => p[0] > -2 && p[0] < W + 2 && p[1] > -2 && p[1] < H + 2); if (pts.length < 3) return; body += `<path d="${pathOf(pts)}" stroke="${C.v}" stroke-width="1.5" fill="none"/>` + arrowOn(pts, l.dir, C.v, o.af || 0.4); });
    Q.forEach(c => { body += chg(c.x, c.y, c.q, c.lab, { dy: c.ly != null ? c.ly : 28, lb: 1 }); });
    if (o.extra) body += o.extra;
    return svg(W, H, body, o.max || W);
  };
  const F = {};
  F.pair = () => svg(430, 150, chg(60, 40, 1, 'q₁', { it: 1 }) + chg(190, 40, -1, 'q₂', { it: 1 }) + L(72, 40, 112, 40, 'r', 'e', { w: 2.4 }) + L(178, 40, 138, 40, 'r', 'e', { w: 2.4 }) + T(98, 30, 'F₁₂', { fs: 12, b: 1, c: C.r }) + T(152, 30, 'F₂₁', { fs: 12, b: 1, c: C.r }) + L(60, 64, 190, 64, 's', 'b', { w: 1 }) + T(125, 78, 'r', { it: 1, fs: 13 }) + T(125, 100, 'unlike charges attract', { fs: 12, c: C.sub }) +
    chg(280, 40, 1, 'q₁', { it: 1 }) + chg(370, 40, 1, 'q₂', { it: 1 }) + L(268, 40, 232, 40, 'r', 'e', { w: 2.4 }) + L(382, 40, 418, 40, 'r', 'e', { w: 2.4 }) + T(246, 30, 'F₁₂', { fs: 12, b: 1, c: C.r }) + T(404, 30, 'F₂₁', { fs: 12, b: 1, c: C.r }) + L(280, 64, 370, 64, 's', 'b', { w: 1 }) + T(325, 78, 'r', { it: 1, fs: 13 }) + T(325, 100, 'like charges repel', { fs: 12, c: C.sub }) +
    T(215, 126, 'F₁₂ = force on q₁ due to q₂;  F₂₁ = force on q₂ due to q₁', { fs: 11.5, c: C.ink }) + T(215, 144, 'F₁₂ = −F₂₁ (Newton’s third law)', { fs: 11.5, c: C.ink }), 430);
  F.Fr = () => two(svg(200, 150, axes(30, 125, 150, 105, 'r', 'F', { noO: 1 }) + P((() => { let d = ''; for (let i = 0; i <= 60; i++) { const r = 0.35 + i / 60 * 2.6; d += (i ? ' L' : 'M') + (30 + (r / 3) * 150).toFixed(1) + ',' + (125 - Math.min(100, 11 / (r * r))).toFixed(1); } return d; })(), 'v', { w: 2.4 }) + T(125, 60, 'F ∝ 1/r²', { fs: 12, it: 1 }), 200),
    svg(200, 150, axes(30, 125, 150, 105, '1/r²', 'F', { noO: 1 }) + L(30, 125, 165, 35, 'o', '', { w: 2.4 }) + L(120, 65, 150, 65, 's', '', { w: 1, d: '3 3' }) + L(150, 65, 150, 45, 's', '', { w: 1, d: '3 3' }) + T(108, 100, 'gradient = kq₁q₂', { fs: 11, it: 1 }), 200));
  // example 12.1.3: q1 at origin, q2 15 cm along +x, q3 10 cm up-left at 32° to the vertical
  F.tri = (forces) => { const s = 9, x1 = 150, y1 = 150, x2 = x1 + 15 * s, a = 32 * Math.PI / 180, x3 = x1 - 10 * s * Math.sin(a), y3 = y1 - 10 * s * Math.cos(a);
    let b = L(x1, 50, x1, 240, 's', '', { w: 1, d: '3 4' }) + L(x1, y1, x2, y1, 'k', '', { w: 1.4 }) + L(x1, y1, x3, y3, 'k', '', { w: 1.4 }) + T((x1 + x2) / 2 + 10, y1 - 8, 'r₁₂ = 15 cm', { fs: 11 }) + T((x1 + x3) / 2 - 8, (y1 + y3) / 2 + 4, 'r₁₃ = 10 cm', { fs: 11, a: 'end' }) + `<path d="M${x1},${y1 - 26} A26,26 0 0 0 ${(x1 - 26 * Math.sin(a)).toFixed(1)},${(y1 - 26 * Math.cos(a)).toFixed(1)}" stroke="${C.sub}" fill="none"/>` + T(x1 - 8, y1 - 32, '32°', { fs: 11 });
    if (forces) b += L(x1, y1, x1 + 60, y1, 'r', 'e', { w: 2.6 }) + T(x1 + 64, y1 - 6, 'F₁₂', { fs: 12, b: 1, c: C.r, a: 'start' }) + L(x1, y1, x1 + 72 * Math.sin(a), y1 + 72 * Math.cos(a), 'v', 'e', { w: 2.6 }) + T(x1 + 72 * Math.sin(a) + 6, y1 + 72 * Math.cos(a) + 6, 'F₁₃', { fs: 12, b: 1, c: C.v, a: 'start' }) + T(x1 + 30, y1 + 20, '58°', { fs: 11, c: C.sub });
    return svg(330, 250, b + chg(x1, y1, -1, 'q₁ = −1.2 μC', { dy: 4, dx: -54, fs: 11 }) + chg(x2, y1, 1, 'q₂ = +3.7 μC', { dy: 28, fs: 11 }) + chg(x3, y3, -1, 'q₃ = −2.3 μC', { dy: -18, fs: 11 }), 330); };
  F.line3 = (labs, gaps) => { let x = 40, b = ''; const xs = [x]; gaps.forEach(g => { x += g[0]; xs.push(x); }); gaps.forEach((g, i) => { b += L(xs[i], 52, xs[i + 1], 52, 's', 'b', { w: 1 }) + T((xs[i] + xs[i + 1]) / 2, 66, g[1], { fs: 11 }); });
    labs.forEach((l, i) => { b += chg(xs[i], 28, l[0], l[1], { fs: 11, dy: -16 }); }); return svg(x + 40, 76, b, x + 40); };
  F.ptA = (s, lab) => svg(240, 70, chg(40, 34, s, lab, { fs: 11, dy: -16 }) + dot(180, 34, 3.5, C.ink) + T(190, 30, 'A', { fs: 13, b: 1, a: 'start' }) + L(40, 56, 180, 56, 's', 'b', { w: 1 }) + T(110, 68, '2.0 cm', { fs: 11 }), 240);
  F.twoA = (s1, s2) => svg(300, 84, chg(40, 34, s1, `q₁ = ${s1 > 0 ? '+' : '−'}1.0 μC`, { fs: 11, dy: -16 }) + chg(260, 34, s2, 'q₂ = −4.0 μC', { fs: 11, dy: -16 }) + dot(128, 34, 3.5, C.ink) + T(128, 22, 'A', { fs: 13, b: 1 }) + L(40, 60, 128, 60, 's', 'b', { w: 1 }) + T(84, 74, '2.0 cm', { fs: 11 }) + L(128, 60, 260, 60, 's', 'b', { w: 1 }) + T(194, 74, '3.0 cm', { fs: 11 }), 300);
  F.sq8 = (vec) => { const x0 = 70, y0 = 40, a = 150; let b = L(x0, y0, x0 + a, y0, 's', '', { w: 1, d: '3 3' }) + L(x0, y0, x0, y0 + a, 's', '', { w: 1, d: '3 3' }) + L(x0 + a, y0, x0 + a, y0 + a, 's', '', { w: 1, d: '3 3' }) + L(x0, y0 + a, x0 + a, y0 + a, 's', '', { w: 1, d: '3 3' }) + L(x0, y0, x0 + a, y0 + a, 's', '', { w: 1, d: '2 4' }) + T(x0 + a / 2, y0 - 8, '30.0 cm', { fs: 11 }) + T(x0 - 6, y0 + a / 2, '30.0 cm', { fs: 11, a: 'end' }) + T(x0 + a / 2 + 18, y0 + a / 2 - 6, '42.4 cm', { fs: 11 });
    if (vec) { const xa = x0 + a, ya = y0 + a; b += L(xa, ya, xa + 50, ya + 50, 'r', 'e', { w: 2.4 }) + T(xa + 56, ya + 52, 'E₁', { fs: 12, b: 1, c: C.r, a: 'start' }) + L(xa, ya, xa, ya - 62, 'v', 'e', { w: 2.4 }) + T(xa + 6, ya - 56, 'E₂', { fs: 12, b: 1, c: C.v, a: 'start' }) + L(xa, ya, xa - 50, ya, 'g', 'e', { w: 2.4 }) + T(xa - 52, ya + 16, 'E₃', { fs: 12, b: 1, c: C.g }); }
    return svg(320, 270, b + chg(x0, y0, 1, 'q₁ = +8.00 μC', { fs: 11, dy: -16, dx: -10 }) + chg(x0 + a, y0, -1, 'q₂ = −5.00 μC', { fs: 11, dy: -16, dx: 20 }) + chg(x0, y0 + a, -1, 'q₃ = −4.00 μC', { fs: 11, dy: 26 }) + dot(x0 + a, y0 + a, 4, C.ink) + T(x0 + a + 10, y0 + a + 18, 'A', { fs: 13, b: 1 }), 320); };
  F.hrw1 = () => { const px = 150, py = 110, d = 50, u = Math.SQRT1_2; return svg(300, 210, L(px - d * u, py - d * u, px + d * u, py + d * u, 's', '', { w: 1 }) + L(px, py, px + 2 * d * u, py - 2 * d * u, 's', '', { w: 1 }) + dot(px, py, 3.5, C.ink) + T(px - 12, py + 16, 'P', { fs: 13, b: 1 }) +
    T(px - d * u / 2 - 10, py - d * u / 2 + 2, 'd', { fs: 12, it: 1 }) + T(px + d * u / 2 + 10, py + d * u / 2 + 2, 'd', { fs: 12, it: 1 }) + T(px + d * u / 2 - 10, py - d * u / 2 - 6, 'd', { fs: 12, it: 1 }) + T(px + 1.5 * d * u - 10, py - 1.5 * d * u - 6, 'd', { fs: 12, it: 1 }) +
    chg(px - d * u, py - d * u, 1, '+5.0q', { fs: 11, dy: -16 }) + chg(px + d * u, py + d * u, 1, '+5.0q', { fs: 11, dy: 26 }) + chg(px + d * u, py - d * u, 1, '+3.0q', { fs: 11, dx: 30, dy: 4 }) + chg(px + 2 * d * u, py - 2 * d * u, -1, '−12q', { fs: 11, dx: 30, dy: 4 }), 300); };
  F.hrw2 = () => svg(240, 200, L(50, 40, 190, 40, 's', '', { w: 1 }) + L(50, 40, 50, 180, 's', '', { w: 1 }) + L(190, 40, 190, 180, 's', '', { w: 1 }) + L(50, 180, 190, 180, 's', '', { w: 1 }) + T(120, 34, 'a', { it: 1 }) + T(40, 114, 'a', { it: 1 }) + dot(120, 110, 3, C.ink) + chg(50, 40, 1, '+q', { fs: 12, dy: -15, it: 1 }) + chg(190, 40, -1, '−2q', { fs: 12, dy: -15, it: 1 }) + chg(50, 180, -1, '−q', { fs: 12, dy: 28, it: 1 }) + chg(190, 180, 1, '+2q', { fs: 12, dy: 28, it: 1 }), 240);
  F.ex3 = () => svg(280, 150, L(50, 30, 210, 30, 's', '', { w: 1 }) + L(50, 30, 50, 120, 's', '', { w: 1 }) + T(130, 22, '4 m', { fs: 12 }) + T(40, 80, '3 m', { fs: 12, a: 'end' }) + chg(50, 30, 1, 'q₁ = 5 μC', { fs: 11, dy: -14, dx: -6 }) + chg(210, 30, 1, 'q₂ = 2 μC', { fs: 11, dy: -14 }) + chg(50, 120, -1, 'q₃ = −3 μC', { fs: 11, dy: 26 }), 280);
  F.rect = () => svg(340, 140, `<rect x="50" y="30" width="200" height="60" fill="none" stroke="${C.sub}" stroke-dasharray="3 3"/>` + T(150, 22, 'l = 60.0 cm', { fs: 11, it: 1 }) + T(262, 64, 'w = 15.0 cm', { fs: 11, it: 1, a: 'start' }) + chg(50, 30, 1, '') + chg(250, 30, 1, '') + chg(50, 90, 1, 'this charge', { fs: 11, dy: 30 }) + chg(250, 90, 1, ''), 340);
  // charge moving through parallel plates
  F.plates = () => { const x0 = 70, x1 = 290, yt = 40, yb = 140, ym = 90; let fl = ''; for (let x = x0 + 12; x < x1; x += 22) fl += L(x, yb - 2, x, yt + 4, 'o', 'e', { w: 1 }); let path = 'M30,' + ym; const k = 40 / ((x1 - x0) * (x1 - x0)); for (let x = x0; x <= x1; x += 5) path += ` L${x},${(ym - k * (x - x0) * (x - x0)).toFixed(1)}`; path += ` L${x1 + 80},${(ym - 40 - 2 * k * (x1 - x0) * 80).toFixed(1)}`;
    return svg(400, 200, `<rect x="${x0}" y="${yt - 10}" width="${x1 - x0}" height="10" fill="#D9E7F7"/><rect x="${x0}" y="${yb}" width="${x1 - x0}" height="10" fill="#F9D9C8"/>` + T(x0 - 8, yt - 2, '−', { fs: 16, b: 1, a: 'end', c: '#2C6BB3' }) + T(x0 - 8, yb + 9, '+', { fs: 16, b: 1, a: 'end', c: C.r }) + fl + T(x1 - 6, yb - 30, 'E', { fs: 13, it: 1, b: 1, c: C.o }) +
      P(path, 'v', { w: 2.4, d: '6 4' }) + chg(30, ym, -1, 'electron', { r: 8, fs: 11, dy: -14 }) + L(40, ym, 64, ym, 'k', 'e', { w: 2 }) + T(52, ym + 18, 'v₀', { fs: 12, it: 1 }) + L(x0, 182, x1, 182, 's', 'b', { w: 1 }) + T((x0 + x1) / 2, 196, 'x (length of plates)', { fs: 11, it: 1 }) +
      L(x1, ym - 40, x1 + 50, ym - 40, 'k', 'e', { w: 2 }) + L(x1, ym - 40, x1, ym - 40 - 22, 'k', 'e', { w: 2 }) + L(x1, ym - 40, x1 + 50, ym - 62, 'r', 'e', { w: 2.4 }) + T(x1 + 54, ym - 36, 'vₓ = v₀', { fs: 11, a: 'start' }) + T(x1 - 4, ym - 64, 'v_y', { fs: 11, a: 'end' }) + T(x1 + 56, ym - 62, 'v', { fs: 12, b: 1, c: C.r, a: 'start' }) + T(x1 + 22, ym - 44, 'θ', { fs: 11 }) +
      L(x1 + 6, ym, x1 + 6, ym - 40, 's', 'b', { w: 1 }) + T(x1 + 12, ym - 14, 'y', { fs: 12, it: 1, a: 'start' }) + L(x0, ym, x1 + 10, ym, 's', '', { w: 1, d: '2 3' }), 400); };
  F.plateLines = () => { let b = `<rect x="40" y="20" width="12" height="140" fill="#F9D9C8" stroke="${C.r}"/><rect x="228" y="20" width="12" height="140" fill="#D9E7F7" stroke="#2C6BB3"/>`; for (let y = 32; y <= 148; y += 13) b += T(46, y + 4, '+', { fs: 11, b: 1, c: C.r }) + T(234, y + 4, '−', { fs: 11, b: 1, c: '#2C6BB3' });
    [44, 60, 76, 92, 108, 124, 140].forEach(y => { b += L(52, y, 228, y, 'v', '', { w: 1.5 }) + `<path d="M${142},${y - 3.5} L${149},${y} L${142},${y + 3.5}Z" fill="${C.v}"/>`; });
    b += P('M52,28 C100,24 180,24 228,28', 'v', { w: 1.3 }) + P('M52,24 C100,6 180,6 228,24', 'v', { w: 1.3 }) + P('M52,152 C100,156 180,156 228,152', 'v', { w: 1.3 }) + P('M52,156 C100,174 180,174 228,156', 'v', { w: 1.3 });
    return svg(280, 182, b + T(140, 178, 'uniform between the plates; fringing at the edges', { fs: 10.5, c: C.sub }), 280); };
  F.sheet = () => { let b = `<rect x="134" y="16" width="12" height="140" fill="#F9D9C8" stroke="${C.r}"/>`; for (let y = 28; y <= 148; y += 13) b += T(140, y + 4, '+', { fs: 11, b: 1, c: C.r }); [32, 52, 72, 92, 112, 132].forEach(y => { b += L(146, y, 250, y, 'v', 'e', { w: 1.5 }) + L(134, y, 30, y, 'v', 'e', { w: 1.5 }); });
    return svg(280, 170, b + T(140, 168, 'field lines perpendicular to the surface, on both sides', { fs: 10.5, c: C.sub }), 280); };
  F.flux = () => svg(330, 170, `<path d="M70,130 L150,150 L230,110 L150,90 Z" fill="#EEEAFD" stroke="${C.v}" stroke-width="1.6"/>` + L(150, 120, 150, 40, 'k', 'e', { w: 2 }) + T(156, 44, 'A (normal to the surface)', { fs: 11, a: 'start' }) + L(150, 120, 225, 52, 'r', 'e', { w: 2.4 }) + T(232, 52, 'E', { fs: 13, it: 1, b: 1, c: C.r, a: 'start' }) + `<path d="M150,84 A36,36 0 0 1 175,94" stroke="${C.sub}" fill="none"/>` + T(166, 80, 'θ', { fs: 12, it: 1 }) + [0, 1, 2, 3].map(i => L(60 + i * 30, 160, 135 + i * 30, 92, 'r', 'e', { w: 1, d: '3 3' })).join(''), 330);
  F.gauss = () => two(svg(200, 180, `<circle cx="100" cy="90" r="62" fill="#EEEAFD" fill-opacity=".5" stroke="${C.v}" stroke-dasharray="5 4" stroke-width="1.6"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4; return L(100 + 14 * Math.cos(a), 90 + 14 * Math.sin(a), 100 + 86 * Math.cos(a), 90 + 86 * Math.sin(a), 'r', 'e', { w: 1.5 }); }).join('') + chg(100, 90, 1, '') + L(100, 90, 100 + 62 * Math.cos(-0.9), 90 + 62 * Math.sin(-0.9), 'k', '', { w: 1 }) + T(128, 66, 'r', { it: 1 }) + T(100, 176, 'Gaussian sphere of radius r', { fs: 10.5, c: C.sub }), 200),
    svg(200, 180, `<circle cx="100" cy="88" r="36" fill="#F9D9C8" stroke="${C.r}" stroke-width="2"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const a = i * Math.PI / 5; return T(100 + 30 * Math.cos(a), 92 + 30 * Math.sin(a), '+', { fs: 10, b: 1, c: C.r }); }).join('') + `<circle cx="100" cy="88" r="66" fill="none" stroke="${C.v}" stroke-dasharray="5 4" stroke-width="1.6"/><circle cx="100" cy="88" r="20" fill="none" stroke="${C.g}" stroke-dasharray="3 3" stroke-width="1.4"/>` + T(100, 92, 'E = 0', { fs: 10, c: C.g, b: 1 }) + T(100, 172, 'conducting sphere: charge on the surface', { fs: 10.5, c: C.sub }), 200));
  F.pill = () => svg(320, 180, `<rect x="140" y="14" width="22" height="150" fill="#F9D9C8" stroke="${C.r}"/>` + [24, 44, 64, 84, 104, 124, 144].map(y => T(151, y + 4, '+', { fs: 10, b: 1, c: C.r })).join('') + `<ellipse cx="162" cy="89" rx="8" ry="26" fill="#EEEAFD" stroke="${C.v}"/><path d="M162,63 L232,63 M162,115 L232,115" stroke="${C.v}"/><ellipse cx="232" cy="89" rx="8" ry="26" fill="#EEEAFD" stroke="${C.v}"/>` + L(240, 89, 300, 89, 'r', 'e', { w: 2.4 }) + T(296, 80, 'E', { fs: 13, it: 1, b: 1, c: C.r }) + T(232, 130, 'end of area A', { fs: 10.5, c: C.v }) + T(110, 89, 'E = 0 inside', { fs: 10.5, c: C.g, a: 'end' }) + T(80, 104, 'the conductor', { fs: 10.5, c: C.g, a: 'end' }) + T(200, 172, 'Gaussian cylinder (pillbox)', { fs: 10.5, c: C.sub }), 320);
  F.sphereEV = () => { const R = 50, x0 = 30, y0 = 125; const E = r => r < R ? 0 : 95 * (R * R) / (r * r), V = r => r < R ? 95 : 95 * R / r; let pe = '', pv = ''; for (let r = 0; r <= 150; r += 2) { pe += (r ? ' L' : 'M') + (x0 + r) + ',' + (y0 - E(r)).toFixed(1); pv += (r ? ' L' : 'M') + (x0 + r) + ',' + (y0 - V(r)).toFixed(1); }
    return two(svg(200, 150, axes(x0, y0, 160, 110, 'r', 'E', { noO: 1 }) + `<path d="M${x0},${y0} L${x0 + R},${y0}" stroke="${C.v}" stroke-width="2.6"/>` + P('M' + (x0 + R) + ',' + (y0 - 95) + pe.slice(pe.indexOf('L' + (x0 + R + 2))), 'v', { w: 2.4 }) + L(x0 + R, y0, x0 + R, y0 - 95, 's', '', { w: 1, d: '3 3' }) + T(x0 + R, y0 + 14, 'R', { it: 1, fs: 12 }) + T(x0 + R + 6, y0 - 96, 'Q/4πε₀R²', { fs: 10.5, a: 'start' }), 200),
      svg(200, 150, axes(x0, y0, 160, 110, 'r', 'V', { noO: 1 }) + P(pv, 'o', { w: 2.4 }) + L(x0 + R, y0, x0 + R, y0 - 95, 's', '', { w: 1, d: '3 3' }) + T(x0 + R, y0 + 14, 'R', { it: 1, fs: 12 }) + T(x0 + 4, y0 - 100, 'Q/4πε₀R', { fs: 10.5, a: 'start' }), 200)); };
  F.Vr = () => { const x0 = 30, y0 = 75; let pp = '', pn = ''; for (let i = 0; i <= 60; i++) { const r = 0.25 + i / 60 * 2.75, v = Math.min(62, 18 / r); pp += (i ? ' L' : 'M') + (x0 + r * 52).toFixed(1) + ',' + (y0 - v).toFixed(1); pn += (i ? ' L' : 'M') + (x0 + r * 52).toFixed(1) + ',' + (y0 + v).toFixed(1); }
    return two(svg(200, 150, L(x0, y0, x0 + 160, y0, 'k', 'e', { w: 1.6 }) + L(x0, 140, x0, 8, 'k', 'e', { w: 1.6 }) + T(x0 + 160, y0 + 16, 'r', { it: 1 }) + T(x0, 6, 'V', { it: 1 }) + P(pp, 'r', { w: 2.4 }) + T(120, 44, '+Q: V = kQ/r', { fs: 11, c: C.r }), 200),
      svg(200, 150, L(x0, y0, x0 + 160, y0, 'k', 'e', { w: 1.6 }) + L(x0, 140, x0, 8, 'k', 'e', { w: 1.6 }) + T(x0 + 160, y0 - 6, 'r', { it: 1 }) + T(x0, 6, 'V', { it: 1 }) + P(pn, 'v', { w: 2.4 }) + T(120, 112, '−Q: V = −kQ/r', { fs: 11, c: C.v }), 200)); };
  F.eqUni = () => { let b = `<rect x="30" y="20" width="12" height="130" fill="#F9D9C8" stroke="${C.r}"/><rect x="238" y="20" width="12" height="130" fill="#D9E7F7" stroke="#2C6BB3"/>`; [40, 62, 84, 106, 128].forEach(y => { b += L(42, y, 238, y, 'v', '', { w: 1.4 }) + `<path d="M${136},${y - 3.5} L${143},${y} L${136},${y + 3.5}Z" fill="${C.v}"/>`; }); [82, 122, 162, 202].forEach(x => { b += L(x, 22, x, 148, 'g', '', { w: 1.6, d: '5 4' }); });
    return svg(280, 172, b + T(82, 166, 'V₁', { fs: 11, c: C.g }) + T(122, 166, 'V₂', { fs: 11, c: C.g }) + T(162, 166, 'V₃', { fs: 11, c: C.g }) + T(202, 166, 'V₄', { fs: 11, c: C.g }) + T(140, 14, 'V₁ > V₂ > V₃ > V₄', { fs: 11, c: C.g }), 280); };
  F.v316 = () => { const X = x => 150 + x * 8, Y = v => 80 - v * 5.5; const ax = (yl) => L(20, 80, 290, 80, 'k', 'e', { w: 1.4 }) + L(150, 140, 150, 12, 'k', 'e', { w: 1.4 }) + T(290, 94, 'x / m', { fs: 11, it: 1, a: 'end' }) + T(156, 14, yl, { fs: 11, a: 'start' }) + [-15, -10, -5, 5, 10, 15].map(x => L(X(x), 77, X(x), 83, 'k', '', { w: 1 }) + T(X(x), 96, String(x).replace('-', '−'), { fs: 10, c: C.sub })).join('');
    return svg(300, 150, ax('V / V') + [10, 5, -5, -10].map(v => L(147, Y(v), 153, Y(v), 'k', '', { w: 1 }) + T(144, Y(v) + 4, String(v).replace('-', '−'), { fs: 10, c: C.sub, a: 'end' })).join('') + P(`M${X(-15)},${Y(0)} L${X(-5)},${Y(10)} L${X(5)},${Y(-10)} L${X(10)},${Y(-10)} L${X(15)},${Y(0)}`, 'v', { w: 2.4 }), 300); };
  F.e316 = () => { const X = x => 150 + x * 8, Y = v => 80 - v * 22; return svg(300, 150, L(20, 80, 290, 80, 'k', 'e', { w: 1.4 }) + L(150, 140, 150, 12, 'k', 'e', { w: 1.4 }) + T(290, 94, 'x / m', { fs: 11, it: 1, a: 'end' }) + T(156, 14, 'E / V m⁻¹', { fs: 11, a: 'start' }) + [-15, -10, -5, 5, 10, 15].map(x => L(X(x), 77, X(x), 83, 'k', '', { w: 1 }) + T(X(x), 96, String(x).replace('-', '−'), { fs: 10, c: C.sub })).join('') + [2, 1, -1, -2].map(v => L(147, Y(v), 153, Y(v), 'k', '', { w: 1 }) + T(144, Y(v) + 4, String(v).replace('-', '−'), { fs: 10, c: C.sub, a: 'end' })).join('') +
    L(X(-15), Y(-1), X(-5), Y(-1), 'r', '', { w: 2.8 }) + L(X(-5), Y(2), X(5), Y(2), 'r', '', { w: 2.8 }) + L(X(5), Y(0), X(10), Y(0), 'r', '', { w: 2.8 }) + L(X(10), Y(-2), X(15), Y(-2), 'r', '', { w: 2.8 }) + [-5, 5, 10].map(x => L(X(x), 30, X(x), 130, 's', '', { w: 0.8, d: '3 3' })).join(''), 300); };
  F.ex311 = (neg) => svg(240, 140, L(50, 30, 170, 30, 's', '', { w: 1, d: '3 3' }) + L(50, 30, 50, 120, 's', '', { w: 1 }) + L(50, 120, 170, 30, 's', '', { w: 1 }) + T(40, 80, '3 cm', { fs: 11, a: 'end' }) + T(122, 82, '5 cm', { fs: 11, a: 'start' }) + chg(50, 30, 1, 'Q₁ = +2 μC', { fs: 11, dy: -15 }) + chg(170, 30, neg ? -1 : 1, `Q₂ = ${neg ? '−' : '+'}2 μC`, { fs: 11, dy: -15 }) + dot(50, 120, 4, C.ink) + T(40, 128, 'A', { fs: 13, b: 1, a: 'end' }), 240);
  F.ex313 = () => svg(220, 180, `<rect x="50" y="30" width="120" height="120" fill="none" stroke="${C.sub}" stroke-dasharray="3 3"/>` + L(50, 30, 170, 150, 's', '', { w: 0.8, d: '2 4' }) + L(170, 30, 50, 150, 's', '', { w: 0.8, d: '2 4' }) + dot(110, 90, 3.5, C.ink) + T(110, 108, 'O', { fs: 12, b: 1 }) + T(186, 94, '10 cm', { fs: 11, a: 'start' }) + T(110, 168, '10 cm', { fs: 11 }) + chg(50, 30, 1, '+0.01 μC', { fs: 11, dy: -15 }) + chg(170, 30, 1, '+0.02 μC', { fs: 11, dy: -15 }) + chg(50, 150, 1, '+0.01 μC', { fs: 11, dy: 26 }) + chg(170, 150, -1, '−0.02 μC', { fs: 11, dy: 26 }), 240);
  F.ex315 = () => svg(300, 150, L(50, 120, 250, 120, 's', '', { w: 1 }) + L(50, 120, 178, 24, 's', '', { w: 1 }) + L(250, 120, 178, 24, 's', '', { w: 1 }) + T(98, 64, '0.080 m', { fs: 11, a: 'end' }) + T(222, 64, '0.060 m', { fs: 11, a: 'start' }) + T(100, 138, '0.050 m', { fs: 11 }) + T(200, 138, '0.050 m', { fs: 11 }) + dot(150, 120, 4, C.ink) + T(150, 108, 'A', { fs: 13, b: 1 }) + dot(178, 24, 4, C.ink) + T(178, 14, 'B', { fs: 13, b: 1 }) + chg(50, 120, 1, 'q₁', { it: 1, dy: 4, dx: -22 }) + chg(250, 120, -1, 'q₂', { it: 1, dy: 4, dx: 22 }), 300);
  F.ex318 = () => svg(240, 170, L(170, 30, 170, 140, 's', '', { w: 1 }) + L(170, 30, 78, 85, 's', '', { w: 1 }) + L(170, 140, 78, 85, 's', '', { w: 1 }) + T(178, 90, 'r₁₂ = 4.0 cm', { fs: 11, a: 'start' }) + T(118, 48, 'r₂₃ = 5.0 cm', { fs: 11, a: 'end' }) + T(118, 132, 'r₁₃ = 5.0 cm', { fs: 11, a: 'end' }) + chg(170, 30, 1, 'q₂ = +10 μC', { fs: 11, dy: -15 }) + chg(170, 140, -1, 'q₁ = −10 μC', { fs: 11, dy: 27 }) + chg(78, 85, 1, 'q₃ = +10 μC', { fs: 11, dy: 27 }), 260);
  F.lineQ = () => { // four standard field patterns
    const s = (Q, W, H, o) => fieldFig(Q, W, H, o);
    return { single: two(s([{ x: 110, y: 90, q: 1, lab: '' }], 220, 180, { per: 12 }), s([{ x: 110, y: 90, q: -1, lab: '' }], 220, 180, { per: 12 })),
      dipole: s([{ x: 120, y: 110, q: 1 }, { x: 240, y: 110, q: -1 }], 360, 220, { per: 14 }),
      like: s([{ x: 120, y: 110, q: 1 }, { x: 240, y: 110, q: 1 }], 360, 220, { per: 12, extra: dot(180, 110, 4, C.o) + T(180, 132, 'X', { fs: 12, b: 1, c: C.o }) }),
      unequal: s([{ x: 230, y: 110, q: 2, lab: '+2q' }, { x: 120, y: 110, q: -1, lab: '−q' }], 360, 220, { per: 8 }) };
  };
  F.eqpts = () => { const Q1 = [{ x: 110, y: 100, q: 1 }]; return fieldFig(Q1, 220, 200, { per: 10, eq: [1 / 30, 1 / 50, 1 / 75] }); };
  F.eqdip = () => fieldFig([{ x: 120, y: 110, q: 1 }, { x: 240, y: 110, q: -1 }], 360, 220, { per: 12, eq: [0.05, 0.025, 0.012, 0, -0.012, -0.025, -0.05] });

  const LQ = F.lineQ();
  const k9 = '9.0 × 10<sup>9</sup>';
  const S = `
<p>Electrostatics is the study of <b>electric charges at rest</b>, the forces between them and the electric fields around them.</p>

${sec('12-1', '13.1 Coulomb’s law', `
${def('Coulomb’s law', `The electric force between two point charges is ${red('directly proportional to the product of their charges')} and ${red('inversely proportional to the square of the distance')} between them.`)}
${key(`<i>F</i> = ${fr('<i>Qq</i>', '4πε<sub>0</sub><i>r</i><sup>2</sup>')} = ${fr('<i>kQq</i>', '<i>r</i><sup>2</sup>')}`, `<i>k</i> = ${fr('1', '4πε<sub>0</sub>')} = 9.0 × 10<sup>9</sup> N m<sup>2</sup> C<sup>−2</sup> (Coulomb’s constant); &nbsp; ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> C<sup>2</sup> N<sup>−1</sup> m<sup>−2</sup> (permittivity of free space)`)}
${fig(F.pair(), 'Figure 13.1: the forces between two point charges are equal in size and opposite in direction.')}
${ul([`Like charges repel; unlike charges attract.`, `The two forces form an action–reaction pair: F<sub>12</sub> = F<sub>21</sub> = <i>kq</i><sub>1</sub><i>q</i><sub>2</sub>/<i>r</i><sup>2</sup>, even if the charges are different in size.`, `Doubling <i>r</i> makes the force four times smaller (inverse-square law).`])}
${fig(F.Fr(), 'Figure 13.2: <i>F</i> against <i>r</i> (a curve) and <i>F</i> against 1/<i>r</i><sup>2</sup> (a straight line through the origin).')}
${tip(`Use only the <b>size</b> of each charge in Coulomb’s law. Decide the <b>direction</b> separately from "like repel, unlike attract", then draw the force on the diagram.`)}
${h4('Relative permittivity')}
<p>When the charges are in a medium (not a vacuum), the force is smaller. Replace ε<sub>0</sub> by the permittivity of the medium, ε.</p>
${def('Relative permittivity, ε<sub>r</sub>', `the ${red('ratio of the permittivity of a medium to the permittivity of free space')}. It has no unit.`)}
${key(`ε<sub>r</sub> = ${fr('ε', 'ε<sub>0</sub>')} &nbsp;&nbsp;&nbsp; <i>F</i><sub>medium</sub> = ${fr('<i>Qq</i>', '4πε<sub>r</sub>ε<sub>0</sub><i>r</i><sup>2</sup>')} = ${fr('<i>F</i><sub>vacuum</sub>', 'ε<sub>r</sub>')}`, 'ε<sub>r</sub> of air ≈ 1.0006 (taken as 1); water ≈ 80; paper ≈ 3.7. The bigger ε<sub>r</sub>, the weaker the force between the charges.')}
${h4('More than two charges')}
<p>The resultant force on one charge is the <b>vector sum</b> of the forces from each of the other charges. Work out each force separately, then add them as vectors (along a line: add with signs; in two dimensions: resolve into <i>x</i> and <i>y</i> components).</p>
${example('13.1.1', `Two point charges <i>q</i><sub>1</sub> = −20 nC and <i>q</i><sub>2</sub> = +90 nC are 4.0 cm apart. Find the magnitude and direction of (a) the electric force on <i>q</i><sub>1</sub> due to <i>q</i><sub>2</sub>, (b) the electric force on <i>q</i><sub>2</sub> due to <i>q</i><sub>1</sub>. (<i>k</i> = ${k9} N m<sup>2</sup> C<sup>−2</sup>)`,
  steps([`(a) <i>F</i><sub>12</sub> = ${fr('<i>kq</i><sub>1</sub><i>q</i><sub>2</sub>', '<i>r</i><sup>2</sup>')} = ${fr(`(${k9})(2.0 × 10<sup>−8</sup>)(9.0 × 10<sup>−8</sup>)`, '(4.0 × 10<sup>−2</sup>)<sup>2</sup>')} = <b>1.0 × 10<sup>−2</sup> N</b>, towards <i>q</i><sub>2</sub> (attraction)`, `(b) <i>F</i><sub>21</sub> = <b>1.0 × 10<sup>−2</sup> N</b>, towards <i>q</i><sub>1</sub>: equal in size and opposite in direction (Newton’s third law)`]), F.line3([[-1, 'q₁ = −20 nC'], [1, 'q₂ = +90 nC']], [[170, '4.0 cm']]))}
${example('13.1.2', `Three point charges lie on the <i>x</i>-axis: <i>q</i><sub>1</sub> = +2 μC, <i>q</i><sub>2</sub> = +4 μC (3.0 cm to the right of <i>q</i><sub>1</sub>) and <i>q</i><sub>3</sub> = −6 μC (5.0 cm to the right of <i>q</i><sub>2</sub>). Find the net electric force on <i>q</i><sub>2</sub>.`,
  steps([`<i>F</i><sub>21</sub> = ${fr(`(${k9})(4 × 10<sup>−6</sup>)(2 × 10<sup>−6</sup>)`, '(3.0 × 10<sup>−2</sup>)<sup>2</sup>')} = 80 N, to the right (<i>q</i><sub>1</sub> repels <i>q</i><sub>2</sub>)`, `<i>F</i><sub>23</sub> = ${fr(`(${k9})(4 × 10<sup>−6</sup>)(6 × 10<sup>−6</sup>)`, '(5.0 × 10<sup>−2</sup>)<sup>2</sup>')} = 86.4 N, to the right (<i>q</i><sub>3</sub> attracts <i>q</i><sub>2</sub>)`, `Both forces point the same way: <i>F</i><sub>2</sub> = 80 + 86.4 = <b>166 N, to the right</b> (towards <i>q</i><sub>3</sub>)`]), F.line3([[1, 'q₁ = +2 μC'], [1, 'q₂ = +4 μC'], [-1, 'q₃ = −6 μC']], [[110, '3.0 cm'], [180, '5.0 cm']]))}
${example('13.1.3', `Three point charges are placed as shown. <i>q</i><sub>1</sub> = −1.2 μC, <i>q</i><sub>2</sub> = +3.7 μC, <i>q</i><sub>3</sub> = −2.3 μC, <i>r</i><sub>12</sub> = 15 cm, <i>r</i><sub>13</sub> = 10 cm and the line <i>q</i><sub>1</sub><i>q</i><sub>3</sub> makes 32° with the vertical. Find the magnitude and direction of the resultant force on <i>q</i><sub>1</sub>.`,
  steps([`<i>F</i><sub>12</sub> = ${fr(`(${k9})(1.2 × 10<sup>−6</sup>)(3.7 × 10<sup>−6</sup>)`, '(0.15)<sup>2</sup>')} = 1.78 N, along +<i>x</i> (attracted towards <i>q</i><sub>2</sub>)`, `<i>F</i><sub>13</sub> = ${fr(`(${k9})(1.2 × 10<sup>−6</sup>)(2.3 × 10<sup>−6</sup>)`, '(0.10)<sup>2</sup>')} = 2.48 N, away from <i>q</i><sub>3</sub> (repulsion): down and to the right at 58° below the horizontal`, `Σ<i>F</i><sub>x</sub> = 1.78 + 2.48 cos 58° = 1.78 + 1.31 = 3.09 N`, `Σ<i>F</i><sub>y</sub> = −2.48 sin 58° = −2.10 N`, `<i>F</i><sub>1</sub> = ${sq('3.09<sup>2</sup> + 2.10<sup>2</sup>')} = <b>3.74 N</b>; &nbsp; θ = tan<sup>−1</sup>(2.10/3.09) = <b>34.2° below the +<i>x</i> direction</b>`, fig(F.tri(true))]), fig(F.tri(false)))}
${example('13.1.4', `Two charges +3.0 μC and −2.0 μC are 5.0 cm apart in oil of relative permittivity 2.5. Find the force between them.`,
  steps([`<i>F</i> = ${fr('<i>Qq</i>', '4πε<sub>r</sub>ε<sub>0</sub><i>r</i><sup>2</sup>')} = ${fr(`(${k9})(3.0 × 10<sup>−6</sup>)(2.0 × 10<sup>−6</sup>)`, '2.5 × (0.050)<sup>2</sup>')} = <b>8.6 N</b>, attractive`, `In air the force would be 21.6 N; the oil reduces it by a factor of ε<sub>r</sub> = 2.5.`]))}
${exercises('Exercise: Coulomb’s law', [
  { q: `Two point charges of −1.0 × 10<sup>−6</sup> C and +2.0 × 10<sup>−6</sup> C are 0.30 m apart. What is the electrostatic force on each charge?`, a: `0.20 N, each directed towards the other` },
  { q: `Calculate the net electrostatic force on (i) <i>q</i><sub>1</sub>, (ii) <i>q</i><sub>2</sub>, (iii) <i>q</i><sub>3</sub>.`, f: fig(F.line3([[1, 'q₁ = +5 μC'], [1, 'q₂ = +2 μC'], [-1, 'q₃ = −3 μC']], [[150, '4.0 cm'], [80, '2.0 cm']])), a: `(i) 18.75 N to the left &nbsp; (ii) 191.25 N to the right &nbsp; (iii) 172.5 N to the left` },
  { q: `Calculate the net electrostatic force on <i>q</i><sub>2</sub>.`, f: fig(F.ex3()), a: `4.11 × 10<sup>−3</sup> N, 18.4° below the +<i>x</i> direction` },
  { q: `<i>q</i><sub>1</sub> = +2.5 μC is at (0, +0.30 m), <i>q</i><sub>2</sub> = +2.5 μC is at (0, −0.30 m) and <i>q</i><sub>3</sub> = +3 μC is at (+0.40 m, 0). What is the electrostatic force on <i>q</i><sub>3</sub>?`, a: `0.43 N in the +<i>x</i> direction (each force is 0.27 N at 0.50 m; the <i>y</i> components cancel)` },
  { q: `Four identical point charges (<i>q</i> = +10.0 μC) are at the corners of a rectangle, <i>l</i> = 60.0 cm and <i>w</i> = 15.0 cm. Find the magnitude and direction of the resultant force on the charge at the lower left corner.`, f: fig(F.rect()), a: `40.9 N at 263° (measured anticlockwise from the +<i>x</i> direction): almost straight down` }])}
`)}

${sec('12-2', '13.2 Electric field', `
${def('Electric field', `a ${red('region around a charge where another charge experiences an electric force')}.`)}
<p>An electric field is shown with <b>electric field lines</b> (lines of force). The direction of the field at a point is the tangent to the line at that point: the direction of the force on a <b>positive</b> test charge.</p>
${h4('Field patterns')}
${fig(LQ.single, 'Figure 13.3: an isolated point charge. Positive: the lines point radially outwards. Negative: the lines point radially inwards.')}
${fig(LQ.dipole, 'Figure 13.4: an electric dipole (+<i>q</i> and −<i>q</i>). The lines curve from the positive charge to the negative charge.')}
${fig(LQ.like, 'Figure 13.5: two equal positive charges. X is the <b>neutral point</b>: the resultant field (and force on a charge) there is zero.')}
${fig(LQ.unequal, 'Figure 13.6: +2<i>q</i> and −<i>q</i>. Twice as many lines leave +2<i>q</i> as enter −<i>q</i>; the rest go off to infinity.')}
${two(fig(F.sheet(), 'Figure 13.7: a uniformly charged surface (plate).'), fig(F.plateLines(), 'Figure 13.8: two oppositely charged parallel plates.'))}
${ul([`Field lines start on positive charges and end on negative charges. The number of lines is proportional to the size of the charge.`, `The closer the lines, the stronger the field.`, `Field lines <b>never cross</b>: the field cannot have two directions at one point.`, `At a charged conducting surface, the lines are <b>perpendicular</b> to the surface.`, `Between two parallel plates the lines are parallel and equally spaced: the field is <b>uniform</b>. The fringing at the edges is ignored when the separation is small compared with the size of the plates.`])}
${sim('efield', 'Electric field lines and the field at a point', 'Choose a set of charges and change the second charge. Tap anywhere to place a test point and read the field strength and potential there. Turn on the equipotentials to see that they always cross the field lines at right angles.')}
${h4('Electric field strength')}
${def('Electric field strength, <i>E</i>', `the ${red('electric force per unit positive charge')} acting on a small test charge placed at that point.`)}
${key(`<i>E</i> = ${fr('<i>F</i>', '<i>q</i>')} &nbsp;&nbsp;&nbsp;&nbsp; for a point charge: &nbsp;<i>E</i> = ${fr('<i>Q</i>', '4πε<sub>0</sub><i>r</i><sup>2</sup>')} = ${fr('<i>kQ</i>', '<i>r</i><sup>2</sup>')}`, 'vector; unit N C<sup>−1</sup> (= V m<sup>−1</sup>). Points away from a positive charge and towards a negative charge.')}
${note(`Derivation for a point charge: a test charge <i>q</i> at distance <i>r</i> from <i>Q</i> feels <i>F</i> = <i>kQq</i>/<i>r</i><sup>2</sup>, so <i>E</i> = <i>F</i>/<i>q</i> = <i>kQ</i>/<i>r</i><sup>2</sup>. It does not depend on the test charge.`)}
${tip(`For several charges, find <i>E</i> from each charge using only its size, mark its direction on the diagram (away from +, towards −), then add the fields as <b>vectors</b>. The force on a charge <i>q</i> placed there is <i>F</i> = <i>qE</i> (opposite to <i>E</i> if <i>q</i> is negative).`)}
${example('13.2.1', `An electric field of magnitude 0.370 N C<sup>−1</sup> exerts a force of 6.20 × 10<sup>−4</sup> N on a test charge. What is the size of the test charge?`,
  steps([`<i>q</i> = ${fr('<i>F</i>', '<i>E</i>')} = ${fr('6.20 × 10<sup>−4</sup>', '0.370')} = <b>1.68 × 10<sup>−3</sup> C</b> (1.68 mC)`]))}
${example('13.2.2', `Find the electric field strength at point A, 2.0 cm from a point charge of (a) +5.0 μC, (b) −5.0 μC.`,
  steps([`<i>E</i> = ${fr('<i>kq</i>', '<i>r</i><sup>2</sup>')} = ${fr(`(${k9})(5.0 × 10<sup>−6</sup>)`, '(2.0 × 10<sup>−2</sup>)<sup>2</sup>')} = <b>1.1 × 10<sup>8</sup> N C<sup>−1</sup></b>`, `(a) directed <b>away from</b> the charge; (b) the same size, directed <b>towards</b> the charge`]), two(fig(F.ptA(1, '+5.0 μC')), fig(F.ptA(-1, '−5.0 μC'))))}
${example('13.2.3', `Point A is 2.0 cm from <i>q</i><sub>1</sub> = +1.0 μC and 3.0 cm from <i>q</i><sub>2</sub> = −4.0 μC, on the line between them. Find (a) the electric field at A, (b) the force on a charge <i>q</i><sub>0</sub> = +4.0 μC placed at A.`,
  steps([`<i>E</i><sub>1</sub> = ${fr(`(${k9})(1.0 × 10<sup>−6</sup>)`, '(0.020)<sup>2</sup>')} = 2.25 × 10<sup>7</sup> N C<sup>−1</sup>, to the right (away from +<i>q</i><sub>1</sub>)`, `<i>E</i><sub>2</sub> = ${fr(`(${k9})(4.0 × 10<sup>−6</sup>)`, '(0.030)<sup>2</sup>')} = 4.0 × 10<sup>7</sup> N C<sup>−1</sup>, to the right (towards −<i>q</i><sub>2</sub>)`, `(a) <i>E</i> = 2.25 × 10<sup>7</sup> + 4.0 × 10<sup>7</sup> = <b>6.3 × 10<sup>7</sup> N C<sup>−1</sup>, to the right</b>`, `(b) <i>F</i> = <i>q</i><sub>0</sub><i>E</i> = (4.0 × 10<sup>−6</sup>)(6.25 × 10<sup>7</sup>) = <b>250 N, to the right</b>`]), fig(F.twoA(1, -1)))}
${example('13.2.4', `Repeat Example 13.2.3 with <i>q</i><sub>1</sub> = −1.0 μC.`,
  steps([`<i>E</i><sub>1</sub> = 2.25 × 10<sup>7</sup> N C<sup>−1</sup>, now to the <b>left</b> (towards −<i>q</i><sub>1</sub>); <i>E</i><sub>2</sub> = 4.0 × 10<sup>7</sup> N C<sup>−1</sup>, to the right`, `(a) <i>E</i> = 4.0 × 10<sup>7</sup> − 2.25 × 10<sup>7</sup> = <b>1.75 × 10<sup>7</sup> N C<sup>−1</sup>, to the right</b>`, `(b) <i>F</i> = (4.0 × 10<sup>−6</sup>)(1.75 × 10<sup>7</sup>) = <b>70 N, to the right</b>`]), fig(F.twoA(-1, -1)))}
${example('13.2.5', `Three charges are at three corners of a square of side 30.0 cm. Find the electric field at the fourth corner A, and the force on a +6.00 μC charge placed at A.`,
  steps([`<i>E</i><sub>1</sub> = ${fr(`(${k9})(8.00 × 10<sup>−6</sup>)`, '(0.424)<sup>2</sup>')} = 4.00 × 10<sup>5</sup> N C<sup>−1</sup>, away from <i>q</i><sub>1</sub> (down-right, 45°)`, `<i>E</i><sub>2</sub> = ${fr(`(${k9})(5.00 × 10<sup>−6</sup>)`, '(0.300)<sup>2</sup>')} = 5.00 × 10<sup>5</sup> N C<sup>−1</sup>, up (towards <i>q</i><sub>2</sub>)`, `<i>E</i><sub>3</sub> = ${fr(`(${k9})(4.00 × 10<sup>−6</sup>)`, '(0.300)<sup>2</sup>')} = 4.00 × 10<sup>5</sup> N C<sup>−1</sup>, left (towards <i>q</i><sub>3</sub>)`, `Σ<i>E</i><sub>x</sub> = 4.00 × 10<sup>5</sup> cos 45° − 4.00 × 10<sup>5</sup> = −1.17 × 10<sup>5</sup> N C<sup>−1</sup>`, `Σ<i>E</i><sub>y</sub> = 5.00 × 10<sup>5</sup> − 4.00 × 10<sup>5</sup> sin 45° = +2.17 × 10<sup>5</sup> N C<sup>−1</sup>`, `<i>E</i> = ${sq('(1.17 × 10<sup>5</sup>)<sup>2</sup> + (2.17 × 10<sup>5</sup>)<sup>2</sup>')} = <b>2.47 × 10<sup>5</sup> N C<sup>−1</sup></b>, at tan<sup>−1</sup>(2.17/1.17) = <b>61.7° above the −<i>x</i> direction</b> (up and to the left)`, `<i>F</i> = <i>qE</i> = (6.00 × 10<sup>−6</sup>)(2.47 × 10<sup>5</sup>) = <b>1.48 N</b>, in the same direction as <i>E</i>`, fig(F.sq8(true))]), fig(F.sq8(false)))}
${exercises('Exercise: electric field', [
  { q: `Find the magnitude of the electric field at P due to the four point charges shown, if <i>q</i> = 1 nC and <i>d</i> = 1 cm. (ε<sub>0</sub> = 8.85 × 10<sup>−12</sup> C<sup>2</sup> N<sup>−1</sup> m<sup>−2</sup>)`, f: fig(F.hrw1()), a: `Zero. The two +5.0<i>q</i> fields cancel. On the other line, +3.0<i>q</i> at <i>d</i> gives 3<i>kq</i>/<i>d</i><sup>2</sup> away from it and −12<i>q</i> at 2<i>d</i> gives 12<i>kq</i>/4<i>d</i><sup>2</sup> = 3<i>kq</i>/<i>d</i><sup>2</sup> towards it: they cancel too.` },
  { q: `Find the magnitude and direction of the electric field at the centre of the square if <i>q</i> = 1.0 × 10<sup>−8</sup> C and <i>a</i> = 5.0 cm.`, f: fig(F.hrw2()), a: `1.02 × 10<sup>5</sup> N C<sup>−1</sup>, upwards` }])}
${h4('Motion of a charge in a uniform electric field')}
<p>In a uniform field the only force on the charge is <i>F</i> = <i>qE</i> (its weight is negligible). The force is constant, so the acceleration is constant:</p>
${key(`<i>a</i> = ${fr('<i>qE</i>', '<i>m</i>')} &nbsp;&nbsp;&nbsp; <i>E</i> = ${fr('<i>V</i>', '<i>d</i>')} between parallel plates`, 'a positive charge accelerates along <i>E</i>; a negative charge (electron) accelerates opposite to <i>E</i>')}
${two(`<p><b>Moving along the field lines</b></p>${ul([`The charge speeds up (or slows down) in a straight line, like a body falling under gravity.`, `Work done by the field = <i>qV</i> = gain in kinetic energy: ${fr('1', '2')}<i>mv</i><sup>2</sup> = <i>qV</i> (from rest)`])}`, `<p><b>Entering at right angles to the field</b></p>${ul([`Horizontal: no force, so <i>v</i><sub>x</sub> = <i>v</i><sub>0</sub> stays constant.`, `Vertical: constant acceleration <i>a</i> = <i>qE</i>/<i>m</i>.`, `The path between the plates is a <b>parabola</b> (like a projectile). After leaving the plates it moves in a straight line.`])}`)}
${fig(F.plates(), 'Figure 13.9: an electron enters the field between parallel plates at right angles to the field.')}
${steps([`time between the plates: <i>t</i> = ${fr('<i>x</i>', '<i>v</i><sub>0</sub>')}`, `vertical velocity on leaving: <i>v</i><sub>y</sub> = <i>at</i> = ${fr('<i>qEx</i>', '<i>mv</i><sub>0</sub>')}`, `vertical displacement: <i>y</i> = ${fr('1', '2')}<i>at</i><sup>2</sup> = ${fr('<i>qEx</i><sup>2</sup>', '2<i>mv</i><sub>0</sub><sup>2</sup>')} &nbsp;(<i>y</i> ∝ <i>x</i><sup>2</sup>: a parabola)`, `speed and direction on leaving: <i>v</i> = ${sq('<i>v</i><sub>x</sub><sup>2</sup> + <i>v</i><sub>y</sub><sup>2</sup>')}, &nbsp; θ = tan<sup>−1</sup>${fr('<i>v</i><sub>y</sub>', '<i>v</i><sub>x</sub>')}`])}
${sim('deflect', 'A charge between parallel plates', 'Choose the particle, then change the voltage across the plates and the entry speed. See when the particle leaves the plates and when it hits one of them.')}
${example('13.2.6', `An electron travelling at 1.5 × 10<sup>7</sup> ${'m&#8239;s<sup>−1</sup>'} enters midway between two parallel plates 60 mm long and 20 mm apart. The field between the plates is 4.0 × 10<sup>3</sup> V m<sup>−1</sup>, with the upper plate positive. (a) Sketch the path of the electron between and after the plates. (b) Find the acceleration of the electron. (c) Find the components of its velocity as it leaves the plates. (d) Find the angle of deflection. (<i>e</i> = 1.60 × 10<sup>−19</sup> C, <i>m</i><sub>e</sub> = 9.11 × 10<sup>−31</sup> kg)`,
  steps([`(a) a parabola curving towards the positive plate between the plates, then a straight line after it leaves`, `(b) <i>a</i> = ${fr('<i>eE</i>', '<i>m</i>')} = ${fr('(1.60 × 10<sup>−19</sup>)(4.0 × 10<sup>3</sup>)', '9.11 × 10<sup>−31</sup>')} = <b>7.03 × 10<sup>14</sup> m s<sup>−2</sup></b>, towards the positive plate (opposite to <i>E</i>)`, `(c) <i>t</i> = 0.060/1.5 × 10<sup>7</sup> = 4.0 × 10<sup>−9</sup> s; &nbsp; <i>v</i><sub>x</sub> = <b>1.5 × 10<sup>7</sup> m s<sup>−1</sup></b>; &nbsp; <i>v</i><sub>y</sub> = <i>at</i> = (7.03 × 10<sup>14</sup>)(4.0 × 10<sup>−9</sup>) = <b>2.8 × 10<sup>6</sup> m s<sup>−1</sup></b>`, `Check: <i>y</i> = ½<i>at</i><sup>2</sup> = 5.6 mm, less than 10 mm, so it does leave the plates.`, `(d) θ = tan<sup>−1</sup>${fr('2.8 × 10<sup>6</sup>', '1.5 × 10<sup>7</sup>')} = <b>10.6°</b>`]))}
${example('13.2.7', `An electron starts from rest at the negative plate and is accelerated across a potential difference of 500 V. Find its speed when it reaches the positive plate.`,
  steps([`½<i>mv</i><sup>2</sup> = <i>eV</i> ⇒ <i>v</i> = ${sq(fr('2<i>eV</i>', '<i>m</i>'))} = ${sq(fr('2(1.60 × 10<sup>−19</sup>)(500)', '9.11 × 10<sup>−31</sup>'))} = <b>1.33 × 10<sup>7</sup> m s<sup>−1</sup></b>`]))}
`)}

${sec('12-3', '13.3 Gauss’s law', `
${def('Electric flux, Φ', `through a surface of area <i>A</i> in a uniform field <i>E</i>: ${red('the scalar product of E and the area vector A')}. It measures how many field lines pass through the surface.`)}
${key(`Φ = <b><i>E</i></b> · <b><i>A</i></b> = <i>EA</i> cos θ`, 'θ = angle between <i>E</i> and the <b>normal</b> to the surface; unit N m<sup>2</sup> C<sup>−1</sup> (= V m); scalar')}
${fig(F.flux(), 'Figure 13.10: the area vector <i>A</i> is normal to the surface.')}
${ul([`θ = 0 (field perpendicular to the surface): Φ = <i>EA</i>, the maximum.`, `θ = 90° (field parallel to the surface): Φ = 0, no lines pass through.`, `For a <b>closed</b> surface the normal points outwards: flux leaving is positive, flux entering is negative.`])}
${def('Gauss’s law', `The ${red('total electric flux through a closed surface is equal to the net charge enclosed by the surface divided by ε<sub>0</sub>')}.`)}
${key(`Φ = ∮ <b><i>E</i></b> · d<b><i>A</i></b> = ${fr('<i>Q</i><sub>enclosed</sub>', 'ε<sub>0</sub>')}`, 'the closed surface is called a Gaussian surface; its shape and size do not matter, only the charge inside')}
${ul([`A charge <b>outside</b> the closed surface gives zero net flux: every line that enters also leaves.`, `If the net charge inside is zero, the net flux is zero (but the field on the surface need not be zero).`])}
${sim('gauss', 'Gauss’s law', 'Change the size of the Gaussian sphere and move the second charge in and out. The flux depends only on the charge inside. Then look at a charged conducting sphere: E and V inside and outside.')}
${example('13.3.1', `A uniform field of 2.0 × 10<sup>3</sup> N C<sup>−1</sup> passes through a flat square of side 10 cm. Find the flux through the square when its normal makes (a) 0°, (b) 60°, (c) 90° with the field.`,
  steps([`<i>A</i> = (0.10)<sup>2</sup> = 0.010 m<sup>2</sup>`, `(a) Φ = (2.0 × 10<sup>3</sup>)(0.010) cos 0° = <b>20 N m<sup>2</sup> C<sup>−1</sup></b>`, `(b) Φ = 20 cos 60° = <b>10 N m<sup>2</sup> C<sup>−1</sup></b>`, `(c) Φ = 20 cos 90° = <b>0</b>`]))}
${example('13.3.2', `A point charge of +5.0 nC is at the centre of a cube. Find (a) the total flux through the cube, (b) the flux through one face. (c) What is the flux through the cube if the charge is moved outside it?`,
  steps([`(a) Φ = ${fr('<i>Q</i>', 'ε<sub>0</sub>')} = ${fr('5.0 × 10<sup>−9</sup>', '8.85 × 10<sup>−12</sup>')} = <b>565 N m<sup>2</sup> C<sup>−1</sup></b>`, `(b) by symmetry the six faces share it equally: 565/6 = <b>94.2 N m<sup>2</sup> C<sup>−1</sup></b>`, `(c) <b>zero</b>: no charge is enclosed`]))}
${h4('Using Gauss’s law to find E')}
<p>Choose a Gaussian surface on which <i>E</i> has the same size everywhere and is perpendicular to the surface. Then ∮<b><i>E</i></b>·d<b><i>A</i></b> = <i>E</i> × (area).</p>
${fig(F.gauss(), 'Figure 13.11: Gaussian spheres around a point charge and around a charged conducting sphere.')}
<p><b>(a) Isolated point charge <i>Q</i>.</b> Take a sphere of radius <i>r</i> centred on the charge. <i>E</i> is radial and the same size at every point on it:</p>
${eq(`<i>E</i>(4π<i>r</i><sup>2</sup>) = ${fr('<i>Q</i>', 'ε<sub>0</sub>')} &nbsp; ⇒ &nbsp; <i>E</i> = ${fr('<i>Q</i>', '4πε<sub>0</sub><i>r</i><sup>2</sup>')}`)}
<p>This is Coulomb’s law again.</p>
<p><b>(b) Isolated charged conducting sphere</b> (radius <i>R</i>, charge <i>Q</i>). The charge spreads over the <b>outer surface</b>.</p>
${ul([`Outside (<i>r</i> ≥ <i>R</i>): a Gaussian sphere of radius <i>r</i> encloses <i>Q</i>, so <i>E</i> = ${fr('<i>Q</i>', '4πε<sub>0</sub><i>r</i><sup>2</sup>')}: the sphere acts like a point charge at its centre.`, `Inside (<i>r</i> &lt; <i>R</i>): a Gaussian sphere inside encloses no charge, so <i>E</i> = 0.`, `The potential is the same everywhere inside, equal to the surface value <i>Q</i>/4πε<sub>0</sub><i>R</i>.`])}
${fig(F.sphereEV(), 'Figure 13.12: <i>E</i> and <i>V</i> against <i>r</i> for a charged conducting sphere.')}
<p><b>(c) Uniformly charged conducting plate.</b> The surface charge density is σ = <i>Q</i>/<i>A</i>. Take a small cylinder (pillbox) with one end inside the conductor and the other end, of area <i>A</i>, just outside. Inside the conductor <i>E</i> = 0, and no flux passes through the curved side (<i>E</i> is perpendicular to the surface), so only the outer end counts:</p>
${fig(F.pill(), 'Figure 13.13: a Gaussian pillbox at the surface of a charged conducting plate.')}
${eq(`<i>EA</i> = ${fr('σ<i>A</i>', 'ε<sub>0</sub>')} &nbsp; ⇒ &nbsp; <i>E</i> = ${fr('σ', 'ε<sub>0</sub>')}`)}
${note(`The same result, <i>E</i> = σ/ε<sub>0</sub>, gives the uniform field between two parallel plates with charges +<i>Q</i> and −<i>Q</i>. It does not depend on the distance from the plate.`)}
${tip(`Why is a car a safe place in a thunderstorm? The metal body is a conductor: the charge stays on its outer surface, and Gauss’s law gives <i>E</i> = 0 inside.`)}
${example('13.3.3', `A conducting sphere of radius 10 cm carries a charge of +2.0 μC. Find the electric field and the potential at (a) 5.0 cm, (b) 10 cm, (c) 20 cm from its centre.`,
  steps([`(a) inside: <b><i>E</i> = 0</b>; <i>V</i> = <i>V</i><sub>surface</sub> = ${fr(`(${k9})(2.0 × 10<sup>−6</sup>)`, '0.10')} = <b>1.8 × 10<sup>5</sup> V</b>`, `(b) <i>E</i> = ${fr(`(${k9})(2.0 × 10<sup>−6</sup>)`, '(0.10)<sup>2</sup>')} = <b>1.8 × 10<sup>6</sup> N C<sup>−1</sup></b>; <i>V</i> = <b>1.8 × 10<sup>5</sup> V</b>`, `(c) <i>E</i> = ${fr(`(${k9})(2.0 × 10<sup>−6</sup>)`, '(0.20)<sup>2</sup>')} = <b>4.5 × 10<sup>5</sup> N C<sup>−1</sup></b>; <i>V</i> = ${fr(`(${k9})(2.0 × 10<sup>−6</sup>)`, '0.20')} = <b>9.0 × 10<sup>4</sup> V</b>`]))}
${example('13.3.4', `A charge of 4.0 nC is spread evenly over one face of a conducting plate of area 0.020 m<sup>2</sup>. Find the electric field just outside the plate.`,
  steps([`σ = <i>Q</i>/<i>A</i> = 4.0 × 10<sup>−9</sup>/0.020 = 2.0 × 10<sup>−7</sup> C m<sup>−2</sup>`, `<i>E</i> = σ/ε<sub>0</sub> = 2.0 × 10<sup>−7</sup>/8.85 × 10<sup>−12</sup> = <b>2.3 × 10<sup>4</sup> N C<sup>−1</sup></b>, perpendicular to the plate`]))}
`)}

${sec('12-4', '13.4 Electric potential', `
${def('Electric potential, <i>V</i>', `at a point: the ${red('work done to bring a unit positive charge from infinity to that point')}. The potential at infinity is zero.`)}
${key(`<i>V</i> = ${fr('<i>Q</i>', '4πε<sub>0</sub><i>r</i>')} = ${fr('<i>kQ</i>', '<i>r</i>')}`, 'scalar; unit volt, V (= J C<sup>−1</sup>). Put in the sign of <i>Q</i>: positive near a positive charge, negative near a negative charge.')}
${h4('Derivation')}
<p>Bring a test charge <i>q</i><sub>0</sub> from infinity to a point at distance <i>r</i> from a positive charge <i>Q</i>, slowly (no acceleration). The external force must balance the electric force, <i>F</i><sub>ext</sub> = <i>kQq</i><sub>0</sub>/<i>x</i><sup>2</sup>, pointing towards <i>Q</i>:</p>
${eq(`<i>W</i> = −∫<sub>∞</sub><sup><i>r</i></sup> ${fr('<i>kQq</i><sub>0</sub>', '<i>x</i><sup>2</sup>')} d<i>x</i> = <i>kQq</i><sub>0</sub>[${fr('1', '<i>x</i>')}]<sub>∞</sub><sup><i>r</i></sup> = ${fr('<i>kQq</i><sub>0</sub>', '<i>r</i>')} &nbsp; ⇒ &nbsp; <i>V</i> = ${fr('<i>W</i>', '<i>q</i><sub>0</sub>')} = ${fr('<i>kQ</i>', '<i>r</i>')}`)}
${ul([`For a positive <i>Q</i>, <i>W</i> is positive: work is done <b>by the external force</b> against the repulsion.`, `For a negative <i>Q</i>, <i>W</i> = −<i>kQq</i><sub>0</sub>/<i>r</i> is negative: the work is done <b>by the electric force</b> (the test charge is attracted).`])}
${fig(F.Vr(), 'Figure 13.14: the potential against distance for a positive and a negative point charge.')}
${h4('Potential due to several charges')}
<p>Potential is a scalar: add the potentials from each charge <b>with their signs</b>. <i>V</i> = <i>k</i>(<i>Q</i><sub>1</sub>/<i>r</i><sub>1</sub> + <i>Q</i><sub>2</sub>/<i>r</i><sub>2</sub> + …)</p>
${example('13.4.1', `Find the electric potential at a point A, 10 m from a point charge of +5.0 μC, and explain what the answer means.`,
  steps([`<i>V</i> = ${fr('<i>kq</i>', '<i>r</i>')} = ${fr(`(${k9})(5.0 × 10<sup>−6</sup>)`, '10')} = <b>4.5 × 10<sup>3</sup> V</b>`, `Meaning: 4.5 × 10<sup>3</sup> J of work is done to bring each coulomb of positive charge from infinity to A.`]))}
${example('13.4.2', `Find the potential at A in each arrangement.`,
  steps([`(a) <i>V</i><sub>A</sub> = <i>k</i>(${fr('<i>Q</i><sub>1</sub>', '<i>r</i><sub>1</sub>')} + ${fr('<i>Q</i><sub>2</sub>', '<i>r</i><sub>2</sub>')}) = (${k9})(${fr('2 × 10<sup>−6</sup>', '0.03')} + ${fr('2 × 10<sup>−6</sup>', '0.05')}) = <b>9.6 × 10<sup>5</sup> V</b>`, `(b) <i>V</i><sub>A</sub> = (${k9})(${fr('2 × 10<sup>−6</sup>', '0.03')} − ${fr('2 × 10<sup>−6</sup>', '0.05')}) = <b>2.4 × 10<sup>5</sup> V</b> (put in the minus sign of <i>Q</i><sub>2</sub>)`]), two(fig(F.ex311(false), '(a)'), fig(F.ex311(true), '(b)')))}
${example('13.4.3', `Four charges are at the corners of a square of side 10 cm. Find the potential at the centre O.`,
  steps([`Each charge is ${fr('10', '√2')} = 7.07 cm from O.`, `<i>V</i><sub>O</sub> = ${fr('<i>k</i>', '<i>r</i>')}(Σ<i>q</i>) = ${fr(k9, '0.0707')}(0.01 + 0.02 + 0.01 − 0.02) × 10<sup>−6</sup> = <b>2.55 × 10<sup>3</sup> V</b>`]), fig(F.ex313()))}
${h4('Potential difference and work done')}
${def('Potential difference between A and B', `the work done per unit positive charge in moving a charge from B to A (against the field, with no acceleration).`)}
${key(`<i>V</i><sub>AB</sub> = <i>V</i><sub>A</sub> − <i>V</i><sub>B</sub> = ${fr('<i>W</i><sub>B→A</sub>', '<i>q</i>')} &nbsp;&nbsp;&nbsp; <i>W</i><sub>A→B</sub> = <i>q</i>(<i>V</i><sub>B</sub> − <i>V</i><sub>A</sub>)`, '<i>W</i> is the work done by an <b>external force</b>. The work done by the <b>electric field</b> is the negative of this.')}
${ul([`If <i>q</i> and (<i>V</i><sub>B</sub> − <i>V</i><sub>A</sub>) have the same sign, the external force does positive work (the charge is pushed against the field).`, `If they have opposite signs, the work done by the external force is negative: the field does the work.`])}
${example('13.4.4', `(a) Find the potential at (i) 10 cm, (ii) 50 cm from a point charge of +2 μC. (b) Find the work done to move a charge of +0.05 μC from 50 cm to 10 cm from the point charge. Is the work done by an external force or by the electric field?`,
  steps([`(a)(i) <i>V</i> = (${k9})(2 × 10<sup>−6</sup>)/0.10 = <b>1.8 × 10<sup>5</sup> V</b> &nbsp; (ii) <i>V</i> = (${k9})(2 × 10<sup>−6</sup>)/0.50 = <b>3.6 × 10<sup>4</sup> V</b>`, `(b) <i>W</i> = <i>q</i>(<i>V</i><sub>10</sub> − <i>V</i><sub>50</sub>) = (0.05 × 10<sup>−6</sup>)(1.8 × 10<sup>5</sup> − 3.6 × 10<sup>4</sup>) = <b>7.2 × 10<sup>−3</sup> J</b>`, `<i>W</i> is positive: the work is done <b>by an external force against the electric field</b> (a positive charge is pushed towards a positive charge). The field itself does −7.2 × 10<sup>−3</sup> J.`]))}
${example('13.4.5', `<i>q</i><sub>1</sub> = +2.40 nC and <i>q</i><sub>2</sub> = −6.50 nC are 0.100 m apart. A is midway between them; B is 0.080 m from <i>q</i><sub>1</sub> and 0.060 m from <i>q</i><sub>2</sub>. Find (a) <i>V</i><sub>A</sub>, (b) <i>V</i><sub>B</sub>, (c) the work done by the electric field on a charge of +2.5 nC that moves from B to A.`,
  steps([`(a) <i>V</i><sub>A</sub> = (${k9})(${fr('2.40 × 10<sup>−9</sup>', '0.050')} − ${fr('6.50 × 10<sup>−9</sup>', '0.050')}) = 432 − 1170 = <b>−738 V</b>`, `(b) <i>V</i><sub>B</sub> = (${k9})(${fr('2.40 × 10<sup>−9</sup>', '0.080')} − ${fr('6.50 × 10<sup>−9</sup>', '0.060')}) = 270 − 975 = <b>−705 V</b>`, `(c) work done by the field = <i>q</i>(<i>V</i><sub>B</sub> − <i>V</i><sub>A</sub>) = (2.5 × 10<sup>−9</sup>)(−705 + 738) = <b>+8.3 × 10<sup>−8</sup> J</b>`, `(The positive charge moves to a lower potential, so the field does positive work. An external force would do −8.3 × 10<sup>−8</sup> J.)`]), fig(F.ex315()))}
${h4('Equipotential surfaces')}
${def('Equipotential surface', `a ${red('surface on which every point has the same potential')}.`)}
${ul([`<b>No work</b> is done in moving a charge along an equipotential surface (Δ<i>V</i> = 0).`, `Equipotential surfaces are always <b>perpendicular to the field lines</b>.`, `Where the equipotentials are closer together, the field is stronger.`])}
${two(fig(F.eqpts(), 'Figure 13.15: point charge: concentric spheres (circles in 2D).'), fig(F.eqUni(), 'Figure 13.16: uniform field: equally spaced parallel planes.'))}
${fig(F.eqdip(), 'Figure 13.17: electric dipole. Dashed green lines are equipotentials; the middle one (V = 0) is a straight line.')}
${h4('Relation between E and V')}
${key(`<i>E</i> = −${fr('d<i>V</i>', 'd<i>r</i>')} &nbsp;&nbsp;&nbsp; uniform field: &nbsp;<i>E</i> = ${fr('<i>V</i>', '<i>d</i>')}`, 'the field strength is the negative of the potential gradient; <i>E</i> points from high potential to low potential')}
${ul([`The steeper the <i>V</i>–<i>r</i> graph, the stronger the field.`, `Between parallel plates with p.d. <i>V</i> and separation <i>d</i>, <i>V</i> falls steadily from one plate to the other, so <i>E</i> = <i>V</i>/<i>d</i> is uniform.`])}
${example('13.4.6', `The graph shows how the potential <i>V</i> varies with distance <i>x</i> along the <i>x</i>-axis. Sketch the graph of the electric field <i>E</i> against <i>x</i>.`,
  steps([`Use <i>E</i> = −d<i>V</i>/d<i>x</i> for each straight section:`, `−15 m to −5 m: gradient = 10/10 = +1 ⇒ <i>E</i> = <b>−1 V m<sup>−1</sup></b>`, `−5 m to 5 m: gradient = −20/10 = −2 ⇒ <i>E</i> = <b>+2 V m<sup>−1</sup></b>`, `5 m to 10 m: gradient = 0 ⇒ <i>E</i> = <b>0</b>`, `10 m to 15 m: gradient = 10/5 = +2 ⇒ <i>E</i> = <b>−2 V m<sup>−1</sup></b>`, fig(F.e316())]), fig(F.v316()))}
${h4('Electric potential energy')}
${def('Electric potential energy, <i>U</i>', `of a charge at a point: the ${red('work done to bring the charge from infinity to that point')}.`)}
${key(`<i>U</i> = <i>qV</i> = ${fr('<i>Qq</i>', '4πε<sub>0</sub><i>r</i>')} &nbsp;&nbsp;&nbsp; Δ<i>U</i> = <i>q</i>Δ<i>V</i>`, 'scalar; unit joule. Put in the signs of both charges: <i>U</i> &gt; 0 for like charges (repel), <i>U</i> &lt; 0 for unlike charges (attract).')}
<p>For a system of charges, add the potential energy of every pair:</p>
${eq(`<i>U</i> = <i>k</i>(${fr('<i>q</i><sub>1</sub><i>q</i><sub>2</sub>', '<i>r</i><sub>12</sub>')} + ${fr('<i>q</i><sub>1</sub><i>q</i><sub>3</sub>', '<i>r</i><sub>13</sub>')} + ${fr('<i>q</i><sub>2</sub><i>q</i><sub>3</sub>', '<i>r</i><sub>23</sub>')})`)}
${example('13.4.7', `(a) Find the electric potential energy of a +0.05 μC charge at (i) 10 cm, (ii) 50 cm from a +2 μC point charge. (b) Find the change in potential energy between (i) and (ii).`,
  steps([`(a)(i) <i>U</i> = <i>qV</i> = (0.05 × 10<sup>−6</sup>)(1.8 × 10<sup>5</sup>) = <b>9.0 × 10<sup>−3</sup> J</b> &nbsp; (ii) <i>U</i> = (0.05 × 10<sup>−6</sup>)(3.6 × 10<sup>4</sup>) = <b>1.8 × 10<sup>−3</sup> J</b>`, `(b) Δ<i>U</i> = 9.0 × 10<sup>−3</sup> − 1.8 × 10<sup>−3</sup> = <b>7.2 × 10<sup>−3</sup> J</b>: the same as the work done in Example 13.4.4`]))}
${example('13.4.8', `Find the potential energy of the system of charges shown.`,
  steps([`<i>U</i> = (${k9})[${fr('(−10)(10)', '0.040')} + ${fr('(−10)(10)', '0.050')} + ${fr('(10)(10)', '0.050')}] × 10<sup>−12</sup>`, `= (9.0 × 10<sup>−3</sup>)(−2500 − 2000 + 2000) = <b>−22.5 J</b>`, `Negative: work would have to be done to pull the charges apart to infinity.`]), fig(F.ex318()))}
${exercises('Exercise: electric potential', [
  { q: `Two parallel plates 5.0 mm apart have a potential difference of 100 V. Find the electric field between them and the force on an electron there.`, a: `<i>E</i> = 100/5.0 × 10<sup>−3</sup> = 2.0 × 10<sup>4</sup> V m<sup>−1</sup>; <i>F</i> = <i>eE</i> = 3.2 × 10<sup>−15</sup> N, towards the positive plate` },
  { q: `How much work must an external force do to bring two protons from infinity to 1.0 × 10<sup>−14</sup> m apart?`, a: `<i>W</i> = <i>ke</i><sup>2</sup>/<i>r</i> = (9.0 × 10<sup>9</sup>)(1.60 × 10<sup>−19</sup>)<sup>2</sup>/1.0 × 10<sup>−14</sup> = 2.3 × 10<sup>−14</sup> J` },
  { q: `Explain why no work is done when a charge moves along an equipotential surface, and why the field lines must cross the equipotentials at right angles.`, a: `<i>W</i> = <i>q</i>Δ<i>V</i> and Δ<i>V</i> = 0 along the surface. If <i>E</i> had a component along the surface, a force would act along it and work would be done, so <i>E</i> must be perpendicular to the surface.` }])}
`)}

${sec('12-5', 'Summary', table(['Quantity', 'Point charge <i>Q</i>', 'Scalar or vector', 'Unit'], [
  ['Force on <i>q</i>', '<i>F</i> = <i>kQq</i>/<i>r</i><sup>2</sup>', 'vector', 'N'],
  ['Field strength', '<i>E</i> = <i>kQ</i>/<i>r</i><sup>2</sup> = <i>F</i>/<i>q</i>', 'vector', 'N C<sup>−1</sup> or V m<sup>−1</sup>'],
  ['Potential', '<i>V</i> = <i>kQ</i>/<i>r</i>', 'scalar', 'V (J C<sup>−1</sup>)'],
  ['Potential energy of <i>q</i>', '<i>U</i> = <i>qV</i> = <i>kQq</i>/<i>r</i>', 'scalar', 'J'],
  ['Flux through a closed surface', 'Φ = <i>Q</i><sub>enclosed</sub>/ε<sub>0</sub>', 'scalar', 'N m<sup>2</sup> C<sup>−1</sup>'],
  ['Link', '<i>E</i> = −d<i>V</i>/d<i>r</i>; uniform field <i>E</i> = <i>V</i>/<i>d</i>', '', '']]))}

${sec('12-rw', 'Real-World Physics: the Burj Khalifa lightning conductor', rw({
  id: 'ls-12-rw-lightning',
  meta: 'Dubai · Richard Hammond’s BIG',
  title: 'Does the Burj Khalifa collect lightning for electricity?',
  lead: `<p>Being the tallest structure for miles, the Burj Khalifa is struck by lightning during thunderstorms. In <i>Richard Hammond’s BIG</i>, Richard climbs to its lightning conductor at the very top.</p><p><b>A common misconception:</b> the tower does <b>not</b> collect lightning to use as electricity. The lightning protection system safely carries the charge to earth. The tower’s steel frame also acts as a <b>Faraday cage</b>, so the current flows around the outside and the people inside are safe. No one has yet found a practical way to store the energy of lightning.</p>`,
  video: { id: 'E0RdTXJaqJs', title: 'How The Burj Khalifa Is Dubai’s Lightning Rod', channel: 'Richard Hammond’s BIG' },
  watch: 'notice the shape of the conductor at the top, and where the charge goes after a strike.',
  video2: { id: 've6XGKZxYxA', title: 'Richard Hammond inside a car struck by lightning (Top Gear)', channel: 'BBC Studios' },
  watch2: 'Richard sits inside a car while it is hit by an artificial lightning strike. Watch where the discharge travels, and think about which part of the car protects him.',
  physics: ul([`On a charged conductor, charge collects most densely at <b>sharp points</b>. The electric field there is very strong and can ionise the air, giving lightning an easy path to the conductor.`, `The conductor gives a <b>low-resistance path</b> to earth, so charge flows safely into the ground instead of through the building.`, `Inside a closed conductor the electric field is zero, and charge stays on the outer surface (Gauss’s law). This is why a steel-framed building protects the people inside.`, `A strike carries about 1 × 10<sup>9</sup> J, but it lasts only tens of microseconds and its time and place cannot be predicted, so it cannot practically be stored.`]),
  qs: [
    { q: `Why does a lightning conductor have a sharp, pointed tip?`, opts: ['Sharp points have a lower electric potential than flat surfaces.', 'Charge density is greatest at sharp points, so the electric field is strongest there and the air is easily ionised.', 'Sharp points have a smaller resistance than the rest of the conductor.', 'Sharp points repel lightning away from the building.'], ans: 1,
      why: `<p>On a conductor, the surface charge density is highest where the curvature is greatest. The strong field at the tip ionises the air and provides a conducting path for the discharge.</p>` },
    { q: `Why are people inside a steel-framed building safe when lightning strikes it?`, opts: ['The electric field inside a closed conductor is zero, and the charge stays on its outer surface.', 'Steel is an electrical insulator.', 'The lightning energy is stored in the steel frame.', 'The electric potential inside the building is always zero.'], ans: 0,
      why: `<p>By Gauss’s law, there is no net charge and no electric field inside a closed conducting shell, so the current flows along the outside of the frame to earth (a Faraday cage).</p>` },
    { q: `In the Top Gear clip, Richard Hammond is unharmed when lightning strikes the car he is sitting in. What is the main reason?`, opts: ['The rubber tyres insulate the car from the ground.', 'The metal body of the car conducts the charge around the outside to earth, so there is no electric field inside.', 'The glass windows absorb the energy of the lightning.', 'The car is moving, so the lightning cannot reach the inside.'], ans: 1,
      why: `<p>The car acts as a Faraday cage. The charge flows over the outer metal body and jumps to earth, and the field inside the closed conductor is zero. It is <b>not</b> the tyres: a discharge that has crossed hundreds of metres of air easily crosses a few centimetres of rubber. (A soft-top car or a motorcycle gives no such protection.)</p>` },
    { q: `A lightning strike carries 1.0 × 10<sup>9</sup> J. A home uses 30 kWh of electrical energy per day. For how long could one strike supply the home, if all the energy could be stored?`, opts: ['0.3 days', '9.3 days', '33 days', '9.3 years'], ans: 1,
      why: steps([`Energy per day = 30 kWh = 30 × 1000 × 3600 = 1.08 × 10<sup>8</sup> J`, `Time = ${fr('1.0 × 10<sup>9</sup>', '1.08 × 10<sup>8</sup>')} = <b>9.3 days</b>`]) + `<p>Even if it could be stored, one strike would run one home for only about a week, not a skyscraper.</p>` },
    { q: `A lightning strike has an average current of 30 kA for 50 μs. How much charge flows to earth?`, opts: ['1.5 C', '600 C', '1.5 × 10<sup>−3</sup> C', '6.0 × 10<sup>8</sup> C'], ans: 0,
      why: steps([`<i>Q</i> = <i>It</i>`, `= (30 × 10<sup>3</sup>)(50 × 10<sup>−6</sup>)`, `= <b>1.5 C</b>`]) + `<p>With 1.0 × 10<sup>9</sup> J, the potential difference is <i>V</i> = <i>W</i>/<i>Q</i> = 1.0 × 10<sup>9</sup>/1.5 ≈ 7 × 10<sup>8</sup> V: hundreds of millions of volts.</p>` }
  ],
  src: `Sources: <i>Richard Hammond’s BIG</i>, Episode 7 “Tallest Building On Earth” (Discovery, 2020); <i>Top Gear</i> (BBC Studios); The National (UAE); UNSW Sydney. Preview the clip before class. <a href="https://www.youtube.com/watch?v=E0RdTXJaqJs" target="_blank" rel="noopener">youtube.com/watch?v=E0RdTXJaqJs</a>`
}))}
`;
  window.PhysiQLessons.register('LESSON-S2-13', { html: () => S });

  // ===================== simulations =====================
  const K = 8.99e9;
  const EX = v => { if (!v) return '0'; const s = v.toExponential(2), m = s.match(/^(-?)([\d.]+)e([+-])(\d+)$/), sup = d => d.split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join(''); return (m[1] ? '−' : '') + (m[4] === '0' ? m[2] : m[2] + ' × 10' + (m[3] === '-' ? '⁻' : '') + sup(m[4])); };
  // ---------- 1. field lines, equipotentials and the field at a point ----------
  window.PhysiQSims.add('efield', function (root) {
    const { COL, fmt, el, slider, button, toggle, canvas, text, arrow, readouts } = window.PhysiQSims.U;
    const S = { set: 'dipole', q2: -1, sep: 0.16, lines: true, eqp: false, probe: null };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const sets = [['single', 'one charge'], ['dipole', 'two charges'], ['plates', 'parallel plates']];
    const chips = sets.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.set ? ' on' : ''), () => { S.set = k; chips.forEach(x => x.classList.toggle('on', x === b)); S.probe = null; ui(); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'charge <i>q</i><sub>1</sub> (μC)', -2, 2, 1, 1, 'μC', v => { S.q1 = v; draw(); });
    S.q1 = 1;
    const sq2 = slider(ctl, 'charge <i>q</i><sub>2</sub> (μC)', -2, 2, 1, S.q2, 'μC', v => { S.q2 = v; draw(); });
    const ssep = slider(ctl, 'separation', 0.08, 0.24, 0.01, S.sep, 'm', v => { S.sep = v; draw(); });
    const tg = el('div', 'sm-row'); root.appendChild(tg);
    toggle(tg, 'Field lines', S.lines, v => { S.lines = v; draw(); });
    toggle(tg, 'Equipotentials', S.eqp, v => { S.eqp = v; draw(); });
    const cv = canvas(root); const ro = readouts(root);
    function ui() { [sq2, ssep].forEach(s => { const w = s === sq2 ? ctl.children[1] : ctl.children[2]; w.style.display = S.set === 'dipole' ? '' : 'none'; }); ctl.children[0].style.display = S.set === 'plates' ? 'none' : ''; }
    let geo = null;
    function charges(w, h) {
      const m = 0.40 / w; // metres per pixel: the canvas is 40 cm wide
      if (S.set === 'single') return { m, Q: [{ x: w / 2, y: h / 2, q: S.q1 }] };
      if (S.set === 'dipole') { const d = S.sep / m; return { m, Q: [{ x: w / 2 - d / 2, y: h / 2, q: S.q1 }, { x: w / 2 + d / 2, y: h / 2, q: S.q2 }].filter(c => c.q !== 0) }; }
      const Q = [], n = 24, top = h * 0.12, bot = h * 0.88; for (let i = 0; i < n; i++) { const y = top + (bot - top) * (i + 0.5) / n; Q.push({ x: w * 0.3, y, q: 0.25 }); Q.push({ x: w * 0.7, y, q: -0.25 }); } return { m, Q, plates: true };
    }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.62, 260, 440); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#FBFCF6'; ctx.fillRect(0, 0, w, h);
      const G = charges(w, h); geo = G; const Q = G.Q;
      if (S.eqp && Q.length) {
        const f = (x, y) => potAt(Q, x, y), vmax = Q.reduce((s, c) => Math.max(s, Math.abs(c.q)), 0) / 14;
        const lv = G.plates ? [-0.6, -0.3, 0, 0.3, 0.6].map(t => t * 3) : [-1, -0.6, -0.35, -0.2, -0.1, 0, 0.1, 0.2, 0.35, 0.6, 1].map(t => t * vmax);
        const segs = contours(f, [0, 0, w, h], lv, 5); ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.3; ctx.setLineDash([5, 4]); ctx.beginPath(); segs.forEach(sg => sg.forEach(s => { ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); })); ctx.stroke(); ctx.setLineDash([]);
      }
      if (S.lines && Q.length) {
        const lines = G.plates ? (() => { const out = []; const ys = []; for (let i = 0; i < 9; i++) ys.push(h * 0.16 + (h * 0.68) * i / 8); ys.forEach(y0 => { let x = w * 0.3 + 4, y = y0; const pts = [[x, y]]; for (let s = 0; s < 800; s++) { const [ex, ey] = fieldAt(Q, x, y), mm = Math.hypot(ex, ey); x += 2 * ex / mm; y += 2 * ey / mm; pts.push([x, y]); if (x > w * 0.7 - 3 || x < 0 || y < 0 || y > h) break; } out.push({ pts, dir: 1 }); }); return out; })() : traceLines(Q, [-10, -10, w + 10, h + 10], 12 / Math.max(...Q.map(c => Math.abs(c.q))), 2.5, 10);
        ctx.strokeStyle = COL.v; ctx.lineWidth = 1.4;
        lines.forEach(l => { ctx.beginPath(); l.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); const i = Math.round(l.pts.length * 0.35); if (l.pts.length > 8) { const [x, y] = l.pts[i], [xp, yp] = l.pts[i - 2]; let ux = (x - xp) * l.dir, uy = (y - yp) * l.dir; const mm = Math.hypot(ux, uy) || 1; ux /= mm; uy /= mm; ctx.fillStyle = COL.v; ctx.beginPath(); ctx.moveTo(x + ux * 6, y + uy * 6); ctx.lineTo(x - uy * 3.5, y + ux * 3.5); ctx.lineTo(x + uy * 3.5, y - ux * 3.5); ctx.fill(); } });
      }
      if (G.plates) { ctx.fillStyle = '#F9D9C8'; ctx.fillRect(w * 0.3 - 8, h * 0.1, 8, h * 0.8); ctx.fillStyle = '#D9E7F7'; ctx.fillRect(w * 0.7, h * 0.1, 8, h * 0.8); text(ctx, '+', w * 0.3 - 18, h / 2, { b: 1, fs: 18, c: COL.r, a: 'center' }); text(ctx, '−', w * 0.7 + 18, h / 2, { b: 1, fs: 18, c: '#2C6BB3', a: 'center' }); }
      else Q.forEach(c => { ctx.beginPath(); ctx.arc(c.x, c.y, 12, 0, 7); ctx.fillStyle = c.q > 0 ? '#F9D9C8' : '#D9E7F7'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = c.q > 0 ? COL.r : '#2C6BB3'; ctx.stroke(); text(ctx, (c.q > 0 ? '+' : '−') + Math.abs(c.q), c.x, c.y + 5, { a: 'center', b: 1, fs: 12, c: c.q > 0 ? COL.r : '#2C6BB3' }); });
      // probe: real units (each unit of q = 1 μC; plates: E from V/d with V = 100 V)
      if (S.probe) {
        const [px, py] = [S.probe[0] * w, S.probe[1] * h];
        let Ex, Ey, V;
        if (G.plates) { const inside = px > w * 0.3 && px < w * 0.7 && py > h * 0.1 && py < h * 0.9, d = 0.4 * w * G.m; Ex = inside ? 100 / d : 0; Ey = 0; V = inside ? 50 - 100 * (px - w / 2) / (0.4 * w) : null; }
        else { Ex = 0; Ey = 0; V = 0; Q.forEach(c => { const dx = (px - c.x) * G.m, dy = (py - c.y) * G.m, r = Math.hypot(dx, dy) || 1e-6, qq = c.q * 1e-6; Ex += K * qq * dx / (r * r * r); Ey += K * qq * dy / (r * r * r); V += K * qq / r; }); }
        const Em = Math.hypot(Ex, Ey);
        if (Em > 0) { const len = G.plates ? 40 : Math.min(70, 14 + 10 * Math.log10(1 + Em / 1e4)); arrow(ctx, px, py, px + Ex / Em * len, py + Ey / Em * len, COL.o, 2.6, 9); }
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 7); ctx.fillStyle = COL.ink; ctx.fill();
        const dist = G.plates ? null : Q.map(c => Math.hypot(px - c.x, py - c.y) * G.m);
        ro([['field strength E', Em ? EX(Em) + ' N C⁻¹' : '0', 'hl'], ['potential V', V == null ? 'outside the plates' : EX(V) + ' V', 'hl'], ['direction of E', Em ? Math.round((Math.atan2(-Ey, Ex) * 180 / Math.PI + 360) % 360) + '° from +x' : '—']].concat(dist ? dist.map((d, i) => ['distance to q' + (i + 1), fmt(d * 100, 1) + ' cm']) : [['plates', 'V = 100 V across 16 cm']]));
      } else ro([['tap the picture', 'to place a test point'], ['scale', 'picture width = 40 cm'], ['charges', S.set === 'plates' ? '+ plate and − plate' : Q.map((c, i) => 'q' + (i + 1) + ' = ' + (c.q > 0 ? '+' : '−') + Math.abs(c.q) + ' μC').join(', ')]]);
      if (S.set === 'dipole' && S.q1 * S.q2 > 0 && Q.length === 2) { const r = Math.sqrt(Math.abs(S.q1) / Math.abs(S.q2)), d = Q[1].x - Q[0].x, xn = Q[0].x + d * r / (1 + r); ctx.beginPath(); ctx.arc(xn, h / 2, 5, 0, 7); ctx.fillStyle = COL.o; ctx.fill(); text(ctx, 'neutral point', xn, h / 2 + 22, { a: 'center', fs: 11, b: 1, c: COL.o }); }
    }
    cv.c.addEventListener('click', e => { const r = cv.c.getBoundingClientRect(); S.probe = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; draw(); });
    ui();
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 2. charged particle between parallel plates ----------
  window.PhysiQSims.add('deflect', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, arrow, loop, readouts } = window.PhysiQSims.U;
    const P = { e: { q: -1.6e-19, m: 9.11e-31, n: 'electron', v: [0.5, 3, 1.5], u: 1e7 }, p: { q: 1.6e-19, m: 1.67e-27, n: 'proton', v: [0.5, 5, 1], u: 1e6 }, a: { q: 3.2e-19, m: 6.64e-27, n: 'alpha particle', v: [0.5, 5, 1], u: 1e6 } };
    const S = { k: 'e', V: 100, v0: 1.5, Lp: 0.06, d: 0.02, t: 0, run: true };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const chips = Object.keys(P).map(k => { const b = button(pre, P[k].n, 'sm-chip' + (k === S.k ? ' on' : ''), () => { S.k = k; chips.forEach(x => x.classList.toggle('on', x === b)); mk(); S.t = 0; }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    slider(ctl, 'p.d. across the plates <i>V</i>', 0, 600, 10, S.V, 'V', v => { S.V = v; S.t = 0; });
    let vs = null; const vbox = el('div'); ctl.appendChild(vbox);
    function mk() { vbox.innerHTML = ''; const p = P[S.k]; S.v0 = p.v[2]; vs = slider(vbox, 'entry speed <i>v</i><sub>0</sub> (× ' + '10<sup>' + Math.round(Math.log10(p.u)) + '</sup>' + ' m s<sup>−1</sup>)', p.v[0], p.v[1], 0.1, S.v0, '', v => { S.v0 = v; S.t = 0; }); }
    mk();
    const cv = canvas(root); const ro = readouts(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    button(bar, '↺ Fire again', 'sm-main', () => { S.t = 0; });
    function calc() { const p = P[S.k], E = S.V / S.d, a = p.q * E / p.m, v0 = S.v0 * p.u; // upper plate positive: field points down; a positive charge accelerates down (a<0 upward)
      const ay = -a; // upward-positive acceleration: E points downward (upper plate +)
      const tp = S.Lp / v0, yExit = 0.5 * ay * tp * tp, hit = Math.abs(yExit) > S.d / 2; let tHit = null; if (hit) tHit = Math.sqrt(S.d / Math.abs(ay)); return { p, E, ay, v0, tp, yExit, hit, tHit, vy: ay * (hit ? tHit : tp) }; }
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.5, 230, 360); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, h);
      const R = calc(), x0 = 40, sx = (w - 70) / (S.Lp * 2.1), ym = h / 2, sy = (h * 0.32) / (S.d / 2), X = x => x0 + x * sx, Y = y => ym - y * sy;
      // plates
      ctx.fillStyle = '#F9D9C8'; ctx.fillRect(X(0), Y(S.d / 2) - 8, S.Lp * sx, 8); ctx.fillStyle = '#D9E7F7'; ctx.fillRect(X(0), Y(-S.d / 2), S.Lp * sx, 8);
      text(ctx, '+  ' + S.V + ' V', X(0), Y(S.d / 2) - 14, { fs: 12, b: 1, c: COL.r }); text(ctx, '−  0 V', X(0), Y(-S.d / 2) + 24, { fs: 12, b: 1, c: '#2C6BB3' });
      if (S.V > 0) for (let x = 0.006; x < S.Lp; x += 0.012) arrow(ctx, X(x), Y(S.d / 2) + 4, X(x), Y(-S.d / 2) - 4, 'rgba(242,102,27,.45)', 1.2, 6);
      text(ctx, 'E', X(S.Lp) - 14, Y(0) + 4, { it: 1, b: 1, c: COL.o });
      // path
      const T1 = R.hit ? R.tHit : R.tp + (S.Lp * 1.05) / R.v0, steps = 200; ctx.strokeStyle = 'rgba(106,99,236,.35)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath();
      const pos = t => { if (t <= R.tp || R.hit) return [R.v0 * t, 0.5 * R.ay * t * t]; return [R.v0 * t, R.yExit + R.ay * R.tp * (t - R.tp)]; };
      for (let i = 0; i <= steps; i++) { const [x, y] = pos(T1 * i / steps); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke(); ctx.setLineDash([]);
      const tt = Math.min(S.t * T1 / 2.2, T1), [px, py] = pos(tt); ctx.beginPath(); ctx.arc(X(px), Y(py), 7, 0, 7); ctx.fillStyle = R.p.q < 0 ? '#D9E7F7' : '#F9D9C8'; ctx.fill(); ctx.strokeStyle = R.p.q < 0 ? '#2C6BB3' : COL.r; ctx.lineWidth = 1.6; ctx.stroke(); text(ctx, R.p.q < 0 ? '−' : '+', X(px), Y(py) + 4, { a: 'center', b: 1, fs: 11, c: R.p.q < 0 ? '#2C6BB3' : COL.r });
      if (R.hit && tt >= T1) text(ctx, 'hits the ' + (R.ay > 0 ? 'upper' : 'lower') + ' plate', X(px), Y(py) + (R.ay > 0 ? 26 : -16), { a: 'center', b: 1, fs: 12, c: COL.r });
      text(ctx, 'plates: 6.0 cm long, 2.0 cm apart', w - 10, h - 8, { a: 'right', fs: 10, c: COL.sub });
      const ex = EX;
      ro([['field E = V/d', ex(R.E || 0) + ' V m⁻¹'], ['acceleration qE/m', ex(Math.abs(R.ay) || 0) + ' m s⁻²', 'hl'], ['time between plates', R.hit ? 'does not get through' : ex(R.tp) + ' s'], ['vertical deflection y', R.hit ? '≥ 1.0 cm (hits)' : fmt(Math.abs(R.yExit) * 1000, 2) + ' mm', 'hl'], ['v_y on leaving', R.hit ? '—' : ex(Math.abs(R.vy)) + ' m s⁻¹'], ['angle of deflection θ', R.hit ? '—' : fmt(Math.atan(Math.abs(R.vy) / R.v0) * 180 / Math.PI, 1) + '°', 'hl']]);
    }
    loop(cv, dt => { if (S.run) S.t += dt; draw(); });
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });

  // ---------- 3. Gauss's law ----------
  window.PhysiQSims.add('gauss', function (root) {
    const { COL, fmt, el, slider, button, canvas, text, readouts } = window.PhysiQSims.U;
    const S = { mode: 'flux', R: 0.5, q1: 2, q2: -1, x2: 0.75, Rs: 0.3, Qs: 2, r: 0.6 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const modes = [['flux', 'Gaussian surface'], ['sphere', 'charged conducting sphere']];
    const chips = modes.map(([k, n]) => { const b = button(pre, n, 'sm-chip' + (k === S.mode ? ' on' : ''), () => { S.mode = k; chips.forEach(x => x.classList.toggle('on', x === b)); mk(); draw(); }); return b; });
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    function mk() { ctl.innerHTML = '';
      if (S.mode === 'flux') { slider(ctl, 'radius of the Gaussian sphere', 0.2, 0.95, 0.01, S.R, '', v => { S.R = v; draw(); }); slider(ctl, 'charge q₁ (nC), at the centre', -3, 3, 1, S.q1, 'nC', v => { S.q1 = v; draw(); }); slider(ctl, 'charge q₂ (nC)', -3, 3, 1, S.q2, 'nC', v => { S.q2 = v; draw(); }); slider(ctl, 'position of q₂', 0.2, 0.95, 0.01, S.x2, '', v => { S.x2 = v; draw(); }); }
      else { slider(ctl, 'charge on the sphere Q (μC)', 1, 4, 0.5, S.Qs, 'μC', v => { S.Qs = v; draw(); }); slider(ctl, 'distance from the centre r', 0, 1, 0.01, S.r, '', v => { S.r = v; draw(); }); }
    }
    mk();
    const cv = canvas(root); const ro = readouts(root);
    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.6, 260, 420); ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#FBFCF6'; ctx.fillRect(0, 0, w, h);
      if (S.mode === 'flux') {
        const cx = w * 0.42, cy = h / 2, sc = Math.min(w * 0.4, h * 0.46), Q = [{ x: cx, y: cy, q: S.q1 }, { x: cx + S.x2 * sc * 1.25, y: cy, q: S.q2 }].filter(c => c.q !== 0);
        if (Q.length) { const lines = traceLines(Q, [-10, -10, w + 10, h + 10], 6, 2.5, 10); ctx.strokeStyle = 'rgba(106,99,236,.75)'; ctx.lineWidth = 1.3; lines.forEach(l => { ctx.beginPath(); l.pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }); }
        ctx.beginPath(); ctx.arc(cx, cy, S.R * sc, 0, 7); ctx.fillStyle = 'rgba(213,220,59,.18)'; ctx.fill(); ctx.setLineDash([6, 4]); ctx.strokeStyle = COL.gr; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
        Q.forEach((c, i) => { ctx.beginPath(); ctx.arc(c.x, c.y, 11, 0, 7); ctx.fillStyle = c.q > 0 ? '#F9D9C8' : '#D9E7F7'; ctx.fill(); ctx.strokeStyle = c.q > 0 ? COL.r : '#2C6BB3'; ctx.lineWidth = 2; ctx.stroke(); text(ctx, 'q' + (c.x === cx ? '₁' : '₂'), c.x, c.y + 4, { a: 'center', fs: 11, b: 1, c: c.q > 0 ? COL.r : '#2C6BB3' }); });
        const in2 = S.x2 * 1.25 < S.R, qin = S.q1 + (in2 ? S.q2 : 0), phi = qin * 1e-9 / 8.85e-12;
        text(ctx, 'Gaussian surface', cx, cy - S.R * sc - 8, { a: 'center', fs: 11, b: 1, c: COL.gr });
        ro([['charge enclosed', (qin > 0 ? '+' : qin < 0 ? '−' : '') + Math.abs(qin) + ' nC', 'hl'], ['flux Φ = Q/ε₀', (phi < 0 ? '−' : '') + fmt(Math.abs(phi), 0) + ' N m² C⁻¹', 'hl'], ['q₂ is', S.q2 === 0 ? 'zero' : in2 ? 'inside: it counts' : 'outside: its lines go in and out, net flux 0'], ['size of the surface', 'does not change Φ']]);
      } else {
        const cx = w * 0.25, cy = h * 0.5, Rpx = Math.min(w * 0.13, h * 0.3), Rm = 0.10, rm = S.r * 0.4, kq = K * S.Qs * 1e-6;
        ctx.beginPath(); ctx.arc(cx, cy, Rpx, 0, 7); ctx.fillStyle = '#F9D9C8'; ctx.fill(); ctx.strokeStyle = COL.r; ctx.lineWidth = 2; ctx.stroke();
        for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; text(ctx, '+', cx + (Rpx - 8) * Math.cos(a), cy + (Rpx - 8) * Math.sin(a) + 4, { a: 'center', b: 1, fs: 11, c: COL.r }); }
        const rp = cx + rm / Rm * Rpx; if (rp < w * 0.48) { ctx.beginPath(); ctx.arc(rp, cy, 4, 0, 7); ctx.fillStyle = COL.ink; ctx.fill(); }
        text(ctx, 'R = 10 cm', cx, cy + Rpx + 18, { a: 'center', fs: 11, c: COL.sub }); text(ctx, 'E = 0 inside', cx, cy + 4, { a: 'center', fs: 11, b: 1, c: COL.gr });
        // graphs
        const gx = w * 0.55, gw = w * 0.4, gh = h * 0.34, E = r => r < Rm ? 0 : kq / (r * r), V = r => r < Rm ? kq / Rm : kq / r, rmax = 0.4, Emax = kq / (Rm * Rm) * 1.1, Vmax = kq / Rm * 1.15;
        const plot = (y0, f, fmax, col, lab) => { ctx.strokeStyle = COL.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, y0); ctx.lineTo(gx + gw, y0); ctx.moveTo(gx, y0); ctx.lineTo(gx, y0 - gh); ctx.stroke(); text(ctx, lab, gx + 4, y0 - gh + 4, { b: 1, fs: 12, c: col }); text(ctx, 'r', gx + gw, y0 + 14, { it: 1, fs: 11, a: 'right' });
          ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const r = rmax * i / 200, v = f(r); const X = gx + gw * r / rmax, Yv = y0 - gh * Math.min(1, v / fmax); i ? ctx.lineTo(X, Yv) : ctx.moveTo(X, Yv); } ctx.stroke();
          const Xr = gx + gw * rm / rmax; ctx.setLineDash([3, 3]); ctx.strokeStyle = COL.sub; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Xr, y0); ctx.lineTo(Xr, y0 - gh); ctx.stroke(); ctx.setLineDash([]); ctx.beginPath(); ctx.arc(Xr, y0 - gh * Math.min(1, f(rm) / fmax), 4, 0, 7); ctx.fillStyle = col; ctx.fill();
          const XR = gx + gw * Rm / rmax; text(ctx, 'R', XR, y0 + 14, { a: 'center', fs: 11, it: 1 }); };
        plot(h * 0.45, E, Emax, COL.v, 'E'); plot(h * 0.92, V, Vmax, COL.o, 'V');
        const ex = EX;
        ro([['distance r', fmt(rm * 100, 1) + ' cm' + (rm < Rm ? ' (inside)' : '')], ['E', rm < Rm ? '0' : ex(E(rm)) + ' N C⁻¹', 'hl'], ['V', ex(V(rm)) + ' V', 'hl'], ['outside', 'acts like a point charge at the centre']]);
      }
    }
    new ResizeObserver(() => draw()).observe(root);
    draw();
  });
})();
