/* PhysiQ Concept Clinic, Semester 1: animations built from the mistakes in the marked STPM 2022 Paper 1 scripts.
   Topics: projectiles (Ch 2), terminal velocity and momentum signs (Ch 3), conical pendulum (Ch 5), g and r (Ch 6),
   ladder statics (Ch 8), force–extension energy (Ch 9), adiabatic compression (Ch 11), conduction and convection (Ch 12).
   Registers with physiq-clinic.js, which must load first. */
(function () {
  'use strict';
  const PC = window.PhysiQClinic; if (!PC) return;
  const { C, DISP, clamp, rnd, rgba, FS, T, R, FR, arrow, darrow, line, dot, rrect } = PC.U;
  const d2r = Math.PI / 180;
  const FRAC = (a, b) => `<span class="cc-frac"><span>${a}</span><span>${b}</span></span>`;
  // cool (lilac) → hot (orange-red) for temperatures
  const heat = f => { f = clamp(f, 0, 1); const a = [143, 137, 255], b = [255, 122, 92]; return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * f)).join(',')})`; };
  const add = (k, topic, scene) => PC.add(k, Object.assign({ sem: '1' }, topic), scene);

  /* ---------- Ch 2 Projectiles ---------- */
  add('proj', { lesson: 'LESSON-2', ch: 2, title: 'Projectiles: same range, different time', sub: 'Complementary angles and the 45° rule',
    eq: 'R = ' + FRAC('u<sup>2</sup> sin 2θ', 'g'), eqn: 'sin 2θ = sin (180° − 2θ), so θ and (90° − θ) give the same range',
    pts: ['Angles θ and (90° − θ) give the <b>same range</b> at the same launch speed.', 'The range is a <b>maximum at 45°</b>, where sin 2θ = 1. It is not above 45°.',
      'The steeper launch has a larger vertical component u sin θ, so it goes higher and stays in the air longer: T = 2u sin θ / g.',
      'The horizontal velocity u cos θ stays constant (no air resistance). The vertical acceleration is g downwards.',
      'So the shallower launch reaches the same target first.'],
    segs: [['mode', [['pair', 'Two launches'], ['graph', 'Range vs angle']]]], sliders: [['th', 'Angle θ', 10, 44, 1, 25, '°', 0]], toggles: [['show45', 'Show 45°']] },
  () => ({ mode: 'pair', th: 25, show45: false, t: 0, hold: 0, p: 0,
    reset() { this.t = 0; this.hold = 0; this.p = 0; }, set(k, v) { this[k] = v; this.reset(); },
    draw(ctx, w, h, dt) { this.mode === 'graph' ? this.graph(ctx, w, h, dt) : this.pair(ctx, w, h, dt); },
    pair(ctx, w, h, dt) {
      const fs = FS(w), u = 31, g = 9.81, angs = [[this.th, C.gold], [90 - this.th, C.cyan]];
      if (this.show45) angs.push([45, C.green]);
      const s = Math.min(w * 0.6 / 98, h * 0.62 / 49), gx = w * 0.06, gy = h * 0.84;
      const Tmax = Math.max(...angs.map(([a]) => 2 * u * Math.sin(a * d2r) / g));
      this.t += dt * 1.6; if (this.t >= Tmax) { this.t = Tmax; this.hold += dt; if (this.hold > 1.8) { this.t = 0; this.hold = 0; } }
      line(ctx, gx - 10, gy, gx + 100 * s, gy, C.muted, 2);
      for (let m = 0; m <= 100; m += 20) { line(ctx, gx + m * s, gy, gx + m * s, gy + 6, C.muted, 2); T(ctx, String(m), gx + m * s, gy + fs * 1.3, { size: fs * 0.75, a: 'center', c: C.muted }); }
      T(ctx, 'm', gx + 100 * s + 6, gy + fs * 1.3, { size: fs * 0.75, c: C.muted });
      angs.forEach(([a, col]) => {
        const c = Math.cos(a * d2r), sn = Math.sin(a * d2r), TT = 2 * u * sn / g, P = t => [gx + u * c * t * s, gy - (u * sn * t - g * t * t / 2) * s];
        ctx.save(); ctx.setLineDash([5, 6]); ctx.strokeStyle = rgba(col, .35); ctx.lineWidth = 2; ctx.beginPath(); for (let t = 0; t <= TT + 1e-6; t += TT / 80) { const q = P(t); t ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke(); ctx.restore();
        const te = Math.min(this.t, TT); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); for (let t = 0; t <= te + 1e-6; t += TT / 80) { const q = P(Math.min(t, te)); t ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke();
        const q = P(te); dot(ctx, q[0], q[1], 7, col);
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(gx, gy, fs * (a > 50 ? 2.4 : a > 40 ? 3.6 : 4.8), -a * d2r, 0); ctx.stroke();
      });
      T(ctx, `${this.th}°`, gx + fs * 5.2, gy - fs * 0.6, { size: fs, c: C.gold, w: 700 });
      const Rr = u * u * Math.sin(2 * this.th * d2r) / g;
      darrow(ctx, gx, gy + fs * 2.4, gx + Rr * s, C.gold, 2, 8); T(ctx, `Same range R = ${Rr.toFixed(1)} m`, gx + Rr * s / 2, gy + fs * 3.9, { size: fs, a: 'center', c: C.gold, w: 700 });
      const x = w * 0.7; let y = h * 0.12;
      R(ctx, ['u = 31 m s', '^−1'], x, y, { size: fs, c: C.muted });
      y += fs * 1.9;
      angs.forEach(([a, col]) => {
        const TT = 2 * u * Math.sin(a * d2r) / g, H = Math.pow(u * Math.sin(a * d2r), 2) / (2 * g), Ra = u * u * Math.sin(2 * a * d2r) / g;
        T(ctx, `θ = ${a}°`, x, y, { size: fs * 1.25, f: DISP, w: 700, c: col });
        T(ctx, `T = ${TT.toFixed(2)} s   H = ${H.toFixed(1)} m`, x, y + fs * 1.3, { size: fs * 0.9 });
        T(ctx, `R = ${Ra.toFixed(1)} m`, x, y + fs * 2.5, { size: fs * 0.9, c: C.muted }); y += fs * 3.8;
      });
      T(ctx, `sin ${2 * this.th}° = sin ${180 - 2 * this.th}°`, x, y + fs * 0.4, { size: fs * 1.05, c: C.gold, w: 700 });
      T(ctx, 'Steeper: higher and longer in the air', x, y + fs * 1.9, { size: fs * 0.85, c: C.cyan, w: 600 });
    },
    graph(ctx, w, h, dt) {
      const fs = FS(w), u = 31, g = 9.81; this.p = Math.min(1, this.p + dt * 0.6);
      const G0 = w * 0.1, G1 = w * 0.66, Y0 = h * 0.84, Y1 = h * 0.12, X = a => G0 + a / 90 * (G1 - G0), Y = r => Y0 - r / 100 * (Y0 - Y1), Rf = a => u * u * Math.sin(2 * a * d2r) / g;
      line(ctx, G0, Y0, G1 + 8, Y0, C.muted, 2); line(ctx, G0, Y0, G0, Y1 - 8, C.muted, 2);
      [0, 15, 30, 45, 60, 75, 90].forEach(a => T(ctx, a + '°', X(a), Y0 + fs * 1.4, { size: fs * 0.8, a: 'center', c: a === 45 ? C.green : C.muted, w: a === 45 ? 700 : 600 }));
      [0, 25, 50, 75, 100].forEach(r => T(ctx, String(r), G0 - 8, Y(r) + fs * 0.3, { size: fs * 0.8, a: 'right', c: C.muted }));
      T(ctx, 'Launch angle θ', (G0 + G1) / 2, Y0 + fs * 2.8, { size: fs * 0.9, a: 'center', c: C.muted });
      T(ctx, 'R / m', G0, Y1 - fs * 0.9, { size: fs * 0.9, a: 'center', c: C.muted });
      ctx.beginPath(); for (let a = 0; a <= 90 * this.p; a += 0.5) { const q = [X(a), Y(Rf(a))]; a ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
      if (this.p > 0.55) { line(ctx, X(45), Y(Rf(45)), X(45), Y0, C.green, 2, [5, 5]); dot(ctx, X(45), Y(Rf(45)), 6, C.green); T(ctx, `Maximum at 45°: ${Rf(45).toFixed(0)} m`, X(45), Y(Rf(45)) - fs * 0.8, { size: fs * 0.95, a: 'center', c: C.green, w: 700 }); }
      if (this.p >= 1) {
        const a1 = this.th, a2 = 90 - a1, r = Rf(a1);
        line(ctx, X(a1), Y(r), X(a2), Y(r), C.cyan, 2, [6, 4]); [a1, a2].forEach((a, i) => { line(ctx, X(a), Y(r), X(a), Y0, rgba(i ? C.cyan : C.gold, .8), 1.5, [3, 4]); dot(ctx, X(a), Y(r), 6, i ? C.cyan : C.gold); });
        T(ctx, `${a1}° and ${a2}°: both ${r.toFixed(1)} m`, (X(a1) + X(a2)) / 2, Y(r) + fs * 1.5, { size: fs * 0.9, a: 'center', c: C.cyan, w: 700 });
      }
      const x = w * 0.72; let y = h * 0.2;
      T(ctx, 'The graph is symmetrical', x, y, { size: fs * 1.05, w: 700 }); T(ctx, 'about θ = 45°.', x, y + fs * 1.4, { size: fs * 1.05, w: 700 });
      T(ctx, 'Above 45° the range', x, y + fs * 3.6, { size: fs * 0.95, c: C.red, w: 600 }); T(ctx, 'decreases again.', x, y + fs * 4.9, { size: fs * 0.95, c: C.red, w: 600 });
    } }));

  /* ---------- Ch 3 Terminal velocity ---------- */
  add('terminal', { lesson: 'LESSON-3', ch: 3, title: 'Terminal velocity: the full chain', sub: 'A sphere falling through a fluid',
    eq: 'W = U + F', eqn: 'At terminal velocity the net force is zero, so a = 0',
    pts: ['Three forces act: weight W (down), upthrust U (up) and viscous drag F (up). F increases with speed; W and U stay constant.',
      'At the start v = 0, so F = 0. The net force W − U is downwards and the sphere accelerates.',
      'As v increases, F increases, so the net force (W − U − F) and the acceleration <b>decrease</b>. The speed still increases.',
      'When <b>W = U + F</b>, the net force is zero, so by Newton’s second law a = 0. The sphere moves at constant <b>terminal velocity</b>.',
      'The speed never decreases. Write the whole chain: cause → effect → conclusion.'] },
  () => ({ t: 0, data: [], off: 0,
    reset() { this.t = 0; this.data = [[0, 0]]; this.off = 0; }, set() {},
    draw(ctx, w, h, dt) {
      const fs = FS(w), tau = 1.2, TM = 7;
      this.t += dt; if (this.t > TM + 2) this.reset();
      const tc = Math.min(this.t, TM), v = 1 - Math.exp(-tc / tau);
      if (this.t <= TM) this.data.push([tc, v]);
      const cx = w * 0.2, cw = w * 0.17, top = h * 0.06, bot = h * 0.96;
      ctx.fillStyle = rgba(C.cyan, .12); ctx.fillRect(cx - cw / 2, top, cw, bot - top); ctx.strokeStyle = rgba(C.cyan, .5); ctx.lineWidth = 2; ctx.strokeRect(cx - cw / 2, top, cw, bot - top);
      const gap = h * 0.09; this.off = (this.off + v * h * 0.5 * dt) % gap;
      for (let y = bot - this.off; y > top; y -= gap) line(ctx, cx - cw / 2, y, cx - cw / 2 + cw * 0.18, y, rgba(C.muted, .7), 2);
      const sy = h * 0.42, r = Math.min(cw * 0.22, h * 0.05);
      const k = h * 0.25, LW = k, LU = k * 0.25, LF = (LW - LU) * v;
      arrow(ctx, cx, sy + r, cx, sy + r + LW, C.gold, 3.5, 11); T(ctx, 'W', cx + 8, sy + r + LW, { size: fs * 1.1, c: C.gold, w: 700 });
      arrow(ctx, cx - r * 0.55, sy - r, cx - r * 0.55, sy - r - LU, C.cyan, 3.5, 11); T(ctx, 'U', cx - r * 0.55 - 8, sy - r - LU, { size: fs * 1.1, c: C.cyan, w: 700, a: 'right' });
      if (LF > 4) { arrow(ctx, cx + r * 0.55, sy - r, cx + r * 0.55, sy - r - LF, C.red, 3.5, 11); T(ctx, 'F', cx + r * 0.55 + 8, sy - r - LF + fs * 0.3, { size: fs * 1.1, c: C.red, w: 700 }); }
      dot(ctx, cx, sy, r, '#D9DED0');
      const G0 = w * 0.44, G1 = w * 0.95, Y0 = h * 0.9, Y1 = h * 0.5, X = t => G0 + t / TM * (G1 - G0), Y = vv => Y0 - vv * (Y0 - Y1) * 0.9;
      line(ctx, G0, Y0, G1, Y0, C.muted, 2); line(ctx, G0, Y0, G0, Y1 - 10, C.muted, 2);
      T(ctx, 'v', G0 - 8, Y1, { size: fs, a: 'right', c: C.muted, w: 700 }); T(ctx, 't', G1, Y0 + fs * 1.3, { size: fs, a: 'right', c: C.muted, w: 700 });
      line(ctx, G0, Y(1), G1, Y(1), C.green, 1.5, [6, 5]); R(ctx, ['v', '_t', ' terminal velocity'], G1, Y(1) - 8, { size: fs * 0.85, a: 'right', c: C.green, w: 700 });
      ctx.beginPath(); this.data.forEach(([t, vv], i) => { i ? ctx.lineTo(X(t), Y(vv)) : ctx.moveTo(X(t), Y(vv)); }); ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke(); dot(ctx, X(tc), Y(v), 5, C.gold);
      const x = w * 0.44; let y = h * 0.1, st = v < 0.06 ? 0 : v < 0.97 ? 1 : 2;
      const rows = [['v = 0, F = 0', 'Net force W − U downwards: accelerates'], ['v ↑ → F ↑ → net force ↓ → a ↓', 'Speed still increases, more slowly'], ['W = U + F → net force = 0 → a = 0', 'Constant terminal velocity']];
      rows.forEach(([a, b], i) => { const on = i === st, col = on ? (i === 2 ? C.green : C.gold) : rgba(C.muted, .7);
        if (on) { rrect(ctx, x - 10, y - fs * 1.15, w * 0.52, fs * 2.85, 8); ctx.fillStyle = rgba(i === 2 ? C.green : C.gold, .12); ctx.fill(); }
        T(ctx, a, x, y, { size: fs * 1.05, w: 700, c: col }); T(ctx, b, x, y + fs * 1.25, { size: fs * 0.85, c: on ? C.ink : rgba(C.muted, .7) }); y += fs * 3.2; });
    } }));

  /* ---------- Ch 3 Momentum signs ---------- */
  add('momentum', { lesson: 'LESSON-3', ch: 3, title: 'Momentum: signs decide the answer', sub: 'A ball rebounding from a wall',
    eq: 'Δp = m(v − u)', eqn: 'Take a positive direction first. A rebound reverses the sign of the velocity.',
    pts: ['Choose a positive direction and mark it on your sketch.', 'A velocity in the opposite direction is negative: rebounding at 3.0 m s<sup>−1</sup> means v = −3.0 m s<sup>−1</sup>.',
      'Δp = m(v − u) = 0.20(−3.0 − 5.0) = <b>−1.6 N s</b>. The minus sign means the change is towards the left.',
      'The force on the ball, F = Δp/Δt, also acts to the left. By Newton’s third law, the ball pushes the wall to the right.',
      'A rebound gives a bigger change in momentum than stopping dead.'] },
  () => ({ t: 0, reset() { this.t = 0; }, set() {},
    draw(ctx, w, h, dt) {
      const fs = FS(w); this.t += dt; if (this.t > 10) this.t = 0;
      const t = this.t, wallX = w * 0.6, gy = h * 0.5, r = Math.min(h * 0.07, w * 0.04), x0 = w * 0.08, dist = wallX - r - x0;
      line(ctx, w * 0.03, gy + r, wallX, gy + r, C.muted, 2);
      ctx.fillStyle = '#3A5236'; ctx.fillRect(wallX, h * 0.18, w * 0.03, gy + r - h * 0.18); for (let y = h * 0.2; y < gy + r; y += 12) line(ctx, wallX + w * 0.03, y, wallX + w * 0.03 + 8, y + 8, C.muted, 1.5);
      arrow(ctx, w * 0.06, h * 0.1, w * 0.2, h * 0.1, C.ink, 2.5, 10); T(ctx, '+ direction', w * 0.21, h * 0.1 + fs * 0.35, { size: fs, w: 700 });
      let bx, sq = 1, phase;
      if (t < 1.6) { bx = x0 + dist * t / 1.6; phase = 0; } else if (t < 1.85) { bx = x0 + dist; sq = 0.8; phase = 1; } else if (t < 4.5) { bx = x0 + dist - dist * 0.6 * (t - 1.85) / 1.6; phase = 2; } else { bx = x0 + dist - dist * 0.6 * 2.65 / 1.6; phase = 2; }
      bx = Math.max(bx, x0 * 0.6);
      ctx.save(); ctx.translate(bx, gy); ctx.scale(sq, 1 / sq); dot(ctx, 0, 0, r, C.gold); ctx.restore();
      T(ctx, '0.20 kg', bx, gy + fs * 0.35, { size: fs * 0.75, a: 'center', c: C.dark, w: 700 });
      if (phase === 0) { arrow(ctx, bx, gy - r - fs, bx + w * 0.1, gy - r - fs, C.gold, 3, 10); R(ctx, ['u = +5.0 m s', '^−1'], bx, gy - r - fs * 1.8, { size: fs, c: C.gold, w: 700 }); }
      if (phase === 2) { arrow(ctx, bx, gy - r - fs, bx - w * 0.06, gy - r - fs, C.cyan, 3, 10); R(ctx, ['v = −3.0 m s', '^−1'], bx - w * 0.06, gy - r - fs * 1.8, { size: fs, c: C.cyan, w: 700 }); }
      const k = w * 0.16, xr = w * 0.95; let y = h * 0.22;
      if (t > 4.6) { T(ctx, 'p before = +1.0 N s', w * 0.68, y, { size: fs * 0.9, c: C.gold, w: 700 }); arrow(ctx, xr - k, y + fs * 0.9, xr - k + k, y + fs * 0.9, C.gold, 3, 9); }
      if (t > 5.4) { y += fs * 3; T(ctx, 'p after = −0.6 N s', w * 0.68, y, { size: fs * 0.9, c: C.cyan, w: 700 }); arrow(ctx, xr - k, y + fs * 0.9, xr - k - k * 0.6, y + fs * 0.9, C.cyan, 3, 9); }
      if (t > 6.2) { y += fs * 3; T(ctx, 'Δp = −1.6 N s', w * 0.68, y, { size: fs * 0.9, c: C.red, w: 700 }); arrow(ctx, xr - k + k * 0.6, y + fs * 0.9, xr - k - k, y + fs * 0.9, C.red, 3, 9); }
      const bx0 = w * 0.06, by0 = h * 0.72;
      if (t > 4.6) R(ctx, ['Δp = m(v − u)'], bx0, by0, { size: fs * 1.3, f: DISP, w: 700, c: C.gold });
      if (t > 5.4) R(ctx, ['= 0.20(−3.0 − 5.0) = −1.6 N s   ✓'], bx0, by0 + fs * 1.7, { size: fs * 1.1, w: 700, c: C.green });
      if (t > 6.6) R(ctx, ['0.20(3.0 − 5.0) = −0.40 N s   ✗  sign of v forgotten'], bx0, by0 + fs * 3.3, { size: fs * 1.0, w: 700, c: C.red });
      if (t > 7.6) T(ctx, 'The wall pushes the ball to the left (negative direction).', bx0, by0 + fs * 4.9, { size: fs * 0.95, c: C.ink });
    } }));

  /* ---------- Ch 5 Conical pendulum ---------- */
  add('conical', { lesson: 'LESSON-5', ch: 5, title: 'Conical pendulum: derive, don’t quote', sub: 'Resolve the tension, then divide',
    eq: 'v = √(Lg sin θ tan θ)', eqn: 'θ is the angle between the string and the vertical',
    pts: ['Draw the diagram and mark θ, the angle between the string and the <b>vertical</b>.', 'Only two forces act on the bob: tension T and weight mg. The centripetal force is the horizontal component of T, not an extra force.',
      'Vertical: <b>T cos θ = mg</b>, because there is no vertical acceleration.', 'Horizontal: <b>T sin θ = mv<sup>2</sup>/r</b>, towards the centre of the circle.',
      'Divide: tan θ = v<sup>2</sup>/(rg). With r = L sin θ, v = √(Lg sin θ tan θ).', 'θ is measured from the vertical, so the vertical component uses cos θ, not sin θ.'],
    sliders: [['th', 'Angle θ', 5, 40, 1, 15, '°', 0]] },
  () => ({ th: 15, t: 0, reset() { this.t = 0; }, set(k, v) { this[k] = v; },
    draw(ctx, w, h, dt) {
      const fs = FS(w), L = 1.5, g = 9.81, m = 0.30, th = this.th * d2r;
      const v = Math.sqrt(L * g * Math.sin(th) * Math.tan(th)), rr = L * Math.sin(th), Tn = m * g / Math.cos(th), om = v / rr;
      this.t += dt;
      const px = w * 0.2, py = h * 0.1, Lp = Math.min(h * 0.55, w * 0.18 / Math.sin(40 * d2r)), rp = Lp * Math.sin(th), cy = py + Lp * Math.cos(th), ey = 0.28, ph = this.t * om;
      line(ctx, px - w * 0.08, py, px + w * 0.08, py, C.muted, 3);
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = rgba(C.cyan, .7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(px, cy, rp, rp * ey, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      line(ctx, px, py, px - rp, cy, rgba(C.muted, .3), 1.5); line(ctx, px, py, px + rp, cy, rgba(C.muted, .3), 1.5); line(ctx, px, py, px, cy, rgba(C.muted, .6), 1.5, [4, 4]);
      const bx = px + rp * Math.cos(ph), by = cy + rp * ey * Math.sin(ph);
      line(ctx, px, cy, bx, by, rgba(C.cyan, .8), 1.5, [3, 3]); line(ctx, px, py, bx, by, '#D9DED0', 2); dot(ctx, bx, by, Math.max(6, h * 0.02), C.gold);
      R(ctx, ['r = L sin θ'], px, cy + rp * ey + fs * 1.6, { size: fs * 0.9, a: 'center', c: C.cyan, w: 700 });
      T(ctx, `L = ${L} m`, px + 8, py + fs * 1.5, { size: fs * 0.85, c: C.muted });
      // free-body diagram
      const fx = w * 0.43, fy = h * 0.1, Lf = Math.min(h * 0.38, w * 0.2), qx = fx + Lf * Math.sin(th), qy = fy + Lf * Math.cos(th), k = h * 0.2 / (m * g);
      line(ctx, fx - w * 0.04, fy, fx + w * 0.04, fy, C.muted, 3); line(ctx, fx, fy, fx, qy + h * 0.08, rgba(C.muted, .6), 1.5, [4, 4]); line(ctx, fx, fy, qx, qy, '#D9DED0', 2);
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(fx, fy, Lf * 0.3, Math.PI / 2 - th, Math.PI / 2); ctx.stroke();
      T(ctx, 'θ', fx + Lf * 0.36 * Math.sin(th / 2), fy + Lf * 0.36 * Math.cos(th / 2) + fs * 0.3, { size: fs * 1.1, c: C.gold, w: 700, a: 'center' });
      const TL = Tn * k; arrow(ctx, qx, qy, qx - TL * Math.sin(th), qy - TL * Math.cos(th), C.violet, 3, 10);
      T(ctx, 'T', qx - TL * Math.sin(th) - 8, qy - TL * Math.cos(th) + fs * 0.4, { size: fs * 1.1, a: 'right', c: C.violet, w: 700 });
      arrow(ctx, qx, qy, qx, qy + m * g * k, C.gold, 3, 10); T(ctx, 'mg', qx + 8, qy + m * g * k, { size: fs, c: C.gold, w: 700 });
      line(ctx, qx, qy, qx, qy - TL * Math.cos(th), rgba(C.green, .9), 2, [5, 4]); R(ctx, ['T cos θ'], qx + 8, qy - TL * Math.cos(th) * 0.6, { size: fs * 0.9, c: C.green, w: 700 });
      line(ctx, qx, qy, qx - TL * Math.sin(th), qy, rgba(C.red, .9), 2, [5, 4]); R(ctx, ['T sin θ'], qx - TL * Math.sin(th) - 6, qy + fs * 0.35, { size: fs * 0.9, a: 'right', c: C.red, w: 700 });
      dot(ctx, qx, qy, 7, C.gold);
      const x = w * 0.64, gap = fs * 1.75, n = Math.floor(this.t / 1.1); let y = h * 0.11;
      const rows = [[['Vertical:  T cos θ = mg'], C.green], [['Horizontal:  T sin θ = mv', '^2', '/r'], C.red], [['Divide:  tan θ = v', '^2', '/(rg)'], C.ink], [['r = L sin θ'], C.cyan], [['v = √(Lg sin θ tan θ)'], C.gold],
        [[`L = 1.5 m, θ = ${this.th}°, m = 0.30 kg`], C.muted], [[`v = ${v.toFixed(2)} m s`, '^−1'], C.gold], [[`T = mg / cos θ = ${Tn.toFixed(2)} N`], C.violet]];
      rows.forEach(([p, col], i) => { if (i <= n) R(ctx, p, x, y + i * gap, { size: i === 4 || i === 6 ? fs * 1.2 : fs, w: 700, c: col, f: i === 4 || i === 6 ? DISP : undefined }); });
    } }));

  /* ---------- Ch 6 g and distance from the centre ---------- */
  add('gfield', { lesson: 'LESSON-6', ch: 6, title: 'g changes with r, not h', sub: 'Measure r from the centre of the Earth',
    eq: 'g = ' + FRAC('GM', 'r<sup>2</sup>'), eqn: 'g / g₀ = (R / r)², with r measured from the centre',
    pts: ['g = GM/r<sup>2</sup>, where r is measured from the <b>centre</b> of the Earth, not from the surface.', 'At height h above the surface, r = R + h. At h = R, r = 2R and g = g₀/4, not g₀/2.',
      'Use the ratio: g/g₀ = (R/r)<sup>2</sup>. At r = 4R, g = g₀/16 = 0.613 m s<sup>−2</sup>.', 'Outside the Earth g ∝ 1/r<sup>2</sup>. Inside a uniform Earth g ∝ r.',
      'As an object falls towards the Earth, r decreases, so g increases.'],
    sliders: [['n', 'Distance from centre r =', 1, 5, 0.1, 2, 'R', 1]] },
  () => ({ n: 2, reset() {}, set(k, v) { this[k] = v; },
    draw(ctx, w, h, dt) {
      const fs = FS(w), g0 = 9.81, n = this.n, g = g0 / (n * n);
      const Rp = Math.min(h * 0.1, w * 0.06), ex = w * 0.04 + Rp, ey = h * 0.55;
      for (let i = 2; i <= 5; i++) { ctx.strokeStyle = rgba(C.muted, .18); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ex, ey, i * Rp, -0.5, 0.5); ctx.stroke(); }
      dot(ctx, ex, ey, Rp, rgba(C.cyan, .35)); ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex, ey, Rp, 0, 7); ctx.stroke(); dot(ctx, ex, ey, 3, C.ink);
      T(ctx, 'Earth', ex, ey + Rp + fs * 1.3, { size: fs * 0.85, a: 'center', c: C.cyan, w: 700 });
      for (let i = 1; i <= 5; i++) T(ctx, i === 1 ? 'R' : i + 'R', ex + i * Rp, ey + fs * 3.4, { size: fs * 0.75, a: 'center', c: C.muted });
      const ox = ex + n * Rp; dot(ctx, ox, ey, 7, C.gold);
      arrow(ctx, ox - 8, ey, ox - 8 - Math.max(10, h * 0.2 * g / g0), ey, C.gold, 3, 9);
      darrow(ctx, ex, ey - Rp - fs * 1.4, ox, C.ink, 1.8, 8); T(ctx, `r = ${n.toFixed(1)}R`, (ex + ox) / 2, ey - Rp - fs * 2, { size: fs, a: 'center', w: 700 });
      if (n > 1.15) { darrow(ctx, ex + Rp, ey + fs * 1.8, ox, C.red, 1.8, 8); T(ctx, `h = ${(n - 1).toFixed(1)}R`, (ex + Rp + ox) / 2, ey + fs * 1.3, { size: fs * 0.9, a: 'center', c: C.red, w: 700 }); }
      const n2 = n * n;
      R(ctx, [`g = ${g.toFixed(3)} m s`, '^−2'], w * 0.04, h * 0.13, { size: fs * 1.9, f: DISP, w: 700, c: C.gold });
      R(ctx, ['g', '_0', ` × (1 / ${n.toFixed(1)})`, '^2', ` = g`, '_0', ` / ${Number.isInteger(+n2.toFixed(2)) ? n2.toFixed(0) : n2.toFixed(2)}`], w * 0.04, h * 0.13 + fs * 1.7, { size: fs * 1.05, w: 600 });
      const G0 = w * 0.6, G1 = w * 0.96, Y0 = h * 0.86, Y1 = h * 0.16, X = x => G0 + x / 5 * (G1 - G0), Y = gg => Y0 - gg / g0 * (Y0 - Y1);
      line(ctx, G0, Y0, G1, Y0, C.muted, 2); line(ctx, G0, Y0, G0, Y1 - 8, C.muted, 2);
      [0, 1, 2, 3, 4, 5].forEach(i => T(ctx, i ? (i === 1 ? 'R' : i + 'R') : '0', X(i), Y0 + fs * 1.3, { size: fs * 0.75, a: 'center', c: C.muted }));
      T(ctx, 'r', G1, Y0 + fs * 2.5, { size: fs * 0.85, a: 'right', c: C.muted, w: 700 }); T(ctx, 'g', G0, Y1 - fs * 0.9, { size: fs * 0.9, a: 'center', c: C.muted, w: 700 });
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(1), Y(g0)); for (let x = 1; x <= 5; x += 0.02) ctx.lineTo(X(x), Y(g0 / (x * x))); ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.stroke();
      [[1, 'g₀'], [2, 'g₀/4'], [4, 'g₀/16']].forEach(([x, s]) => { line(ctx, X(x), Y(g0 / (x * x)), X(x), Y0, rgba(C.muted, .4), 1, [3, 4]); T(ctx, s, X(x) + 5, Y(g0 / (x * x)) - 6, { size: fs * 0.8, c: C.muted }); });
      dot(ctx, X(n), Y(g), 6, C.gold);
      T(ctx, 'Inside: g ∝ r', X(0.15), Y(g0 * 0.55), { size: fs * 0.75, c: C.muted });
    } }));

  /* ---------- Ch 8 Ladder statics ---------- */
  add('ladder', { lesson: 'LESSON-8', ch: 8, title: 'The ladder: moments and the floor force', sub: 'Uniform ladder against a smooth wall',
    eq: 'Moment = F × d<sub>⊥</sub>', eqn: 'd⊥ is the perpendicular distance from the pivot to the line of action',
    pts: ['Take moments about the foot of the ladder, so the unknown floor forces have no moment.', 'Moment = force × <b>perpendicular distance</b> from the pivot to the line of action, not the distance along the ladder.',
      'Weight at the midpoint: perpendicular distance (L/2) cos θ. Smooth-wall reaction (horizontal): perpendicular distance L sin θ.',
      'Resolve: vertically N = W, horizontally F = S. Friction F ≤ μN.', '“Determine the force at the floor”: give the components, the resultant √(N<sup>2</sup> + F<sup>2</sup>) and its direction.',
      'When only three non-parallel forces act, their lines of action meet at one point.'],
    segs: [['mode', [['moment', 'Moments'], ['floor', 'Floor force'], ['three', 'Three forces meet']]]] },
  () => ({ mode: 'moment', t: 0, reset() { this.t = 0; }, set(k, v) { this[k] = v; this.t = 0; },
    draw(ctx, w, h, dt) {
      const fs = FS(w); this.t += dt; const st = Math.floor(this.t / 0.9);
      const th = 60 * d2r, Wn = 200, S = Wn * Math.cos(th) / (2 * Math.sin(th)), N = Wn, F = S, Rf = Math.hypot(N, F), ang = Math.atan2(N, F) / d2r;
      const gy = h * 0.9, wallX = w * 0.48, Lp = Math.min(h * 0.74 / Math.sin(th), w * 0.36 / Math.cos(th));
      const A = { x: wallX - Lp * Math.cos(th), y: gy }, B = { x: wallX, y: gy - Lp * Math.sin(th) }, M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      line(ctx, w * 0.02, gy, wallX + w * 0.03, gy, C.muted, 2.5); ctx.fillStyle = '#3A5236'; ctx.fillRect(wallX, h * 0.04, w * 0.025, gy - h * 0.04);
      line(ctx, A.x, A.y, B.x, B.y, '#C9A86A', 7); for (let i = 1; i < 9; i++) { const x = A.x + (B.x - A.x) * i / 9, y = A.y + (B.y - A.y) * i / 9; line(ctx, x - 6, y - 4, x + 6, y + 4, '#E2C98F', 2); }
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(A.x, A.y, fs * 2.4, -th, 0); ctx.stroke(); T(ctx, '60°', A.x + fs * 2.6, A.y - fs * 1.6, { size: fs * 0.85 });
      const k = h * 0.24 / Wn, m = this.mode;
      if (st >= 0) { arrow(ctx, M.x, M.y, M.x, M.y + Wn * k, C.gold, 3.5, 11); T(ctx, 'W = 200 N', M.x + 8, M.y + Wn * k - 4, { size: fs * 0.9, c: C.gold, w: 700 }); }
      if (st >= 1) { arrow(ctx, B.x, B.y, B.x - S * k * 1.6, B.y, C.cyan, 3.5, 11); T(ctx, 'S', B.x - S * k * 1.6 - 6, B.y - 6, { size: fs * 1.1, a: 'right', c: C.cyan, w: 700 }); }
      dot(ctx, A.x, A.y, 6, C.ink);
      const x = w * 0.57; let y = h * 0.1; const L = (p, o) => { R(ctx, p, x, y, Object.assign({ size: fs, w: 600 }, o)); y += fs * 1.7; };
      if (m === 'moment') {
        if (st >= 2) { line(ctx, A.x, gy - 4, M.x, gy - 4, C.green, 3); line(ctx, M.x, M.y, M.x, gy, rgba(C.gold, .6), 1.5, [4, 4]); R(ctx, ['(L/2) cos θ  ✓'], (A.x + M.x) / 2, gy + fs * 1.3, { size: fs * 0.85, a: 'center', c: C.green, w: 700 }); }
        if (st >= 3) { const ox = A.x - fs * 0.9; line(ctx, ox, gy, ox, B.y, C.green, 3); line(ctx, ox, B.y, B.x, B.y, rgba(C.cyan, .6), 1.5, [4, 4]); R(ctx, ['L sin θ'], ox - 6, (gy + B.y) / 2, { size: fs * 0.9, a: 'right', c: C.green, w: 700 }); }
        if (st >= 4) { R(ctx, ['L/2 along the ladder  ✗'], (A.x + M.x) / 2 - fs * 2, (A.y + M.y) / 2 - fs * 0.6, { size: fs * 0.85, a: 'right', c: C.red, w: 700 }); }
        T(ctx, 'Pivot', A.x, gy + fs * 2.6, { size: fs * 0.8, a: 'center', c: C.muted });
        L(['Moments about the foot:'], { c: C.muted }); if (st >= 3) L(['S × L sin θ = W × (L/2) cos θ'], { w: 700 });
        if (st >= 4) L([`S = ${S.toFixed(1)} N`], { size: fs * 1.4, f: DISP, w: 700, c: C.cyan });
        if (st >= 5) { L(['Distance along the ladder gives'], { c: C.red, size: fs * 0.85 }); L(['S × L = W × L/2  →  S = 100 N  ✗'], { c: C.red, size: fs * 0.85 }); }
      } else {
        if (st >= 2) { arrow(ctx, A.x, A.y, A.x, A.y - N * k, C.green, 3.5, 11); T(ctx, 'N', A.x - 8, A.y - N * k, { size: fs * 1.1, a: 'right', c: C.green, w: 700 }); }
        if (st >= 3) { arrow(ctx, A.x, A.y, A.x + F * k * 1.6, A.y, C.violet, 3.5, 11); T(ctx, 'F', A.x + F * k * 1.6 + 6, A.y - 6, { size: fs * 1.1, c: C.violet, w: 700 }); }
        if (st >= 4) { const L2 = Rf * k; arrow(ctx, A.x, A.y, A.x + L2 * Math.cos(ang * d2r), A.y - L2 * Math.sin(ang * d2r), C.red, 3.5, 11); T(ctx, 'R', A.x + L2 * Math.cos(ang * d2r) + 6, A.y - L2 * Math.sin(ang * d2r), { size: fs * 1.1, c: C.red, w: 700 }); }
        if (m === 'three' && st >= 5) {
          const P = { x: M.x, y: B.y }; line(ctx, M.x, M.y, P.x, P.y, rgba(C.gold, .8), 1.5, [6, 4]); line(ctx, B.x, B.y, P.x, P.y, rgba(C.cyan, .8), 1.5, [6, 4]); line(ctx, A.x, A.y, P.x, P.y, rgba(C.red, .8), 1.5, [6, 4]);
          const pulse = 6 + 4 * Math.sin(this.t * 5); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(P.x, P.y, pulse, 0, 7); ctx.stroke(); T(ctx, 'P', P.x - 10, P.y - 8, { size: fs, a: 'right', w: 700 });
        }
        if (m === 'floor') {
          L(['Vertical:  N = W = 200 N'], { c: C.green, w: 700 }); if (st >= 3) L([`Horizontal:  F = S = ${S.toFixed(1)} N`], { c: C.violet, w: 700 });
          if (st >= 4) { L(['R = √(N', '^2', ' + F', '^2', `) = ${Rf.toFixed(0)} N`], { c: C.red, w: 700, size: fs * 1.15 }); L([`at ${ang.toFixed(1)}° above the floor`], { c: C.red, w: 700 }); }
          if (st >= 5) { y += fs * 0.5; L(['Give all three: N, F and R with'], { c: C.muted, size: fs * 0.9 }); L(['its direction. Friction: F ≤ μN'], { c: C.muted, size: fs * 0.9 }); }
        } else {
          L(['Three forces: W, S and R'], { w: 700 }); if (st >= 5) { L(['Their lines of action'], { c: C.gold, w: 700 }); L(['meet at one point P.'], { c: C.gold, w: 700 }); y += fs * 0.4; L(['So R is not vertical:'], { size: fs * 0.9 }); L(['it points from the foot to P.'], { size: fs * 0.9 }); L([`tan α = 2 tan θ → α = ${ang.toFixed(1)}°`], { size: fs * 0.9, c: C.red, w: 700 }); }
        }
      }
    } }));

  /* ---------- Ch 9 Force–extension energy ---------- */
  add('fe', { lesson: 'LESSON-9', ch: 9, title: 'Energy = area under the F–e graph', sub: 'Loading, beyond the limit and unloading',
    eq: 'E = ½Fe', eqn: 'Only for the straight-line (Hooke’s law) part of the graph',
    pts: ['Work done in stretching = <b>area under the force–extension graph</b>.', '½Fe applies only to the straight-line part (Hooke’s law region).',
      'Beyond the elastic limit, find the area under the curve (count squares or split it into shapes). ½Fe gives the wrong answer.',
      'On unloading, the line is parallel to the loading line. The area under it is the elastic energy recovered.',
      'The area between loading and unloading is energy not recovered: it goes into permanent deformation and heat.', 'Convert mm to m before calculating energy in joules.'],
    segs: [['mode', [['linear', 'Within the limit'], ['beyond', 'Beyond the limit'], ['unload', 'Unloading']]]] },
  () => ({ mode: 'linear', p: 0, hold: 0, reset() { this.p = 0; this.hold = 0; }, set(k, v) { this[k] = v; this.reset(); },
    draw(ctx, w, h, dt) {
      const fs = FS(w), Fn = e => e <= 2 ? 20 * e : 40 + 25 * (1 - Math.exp(-(e - 2) / 1.5)), m = this.mode;
      this.p = Math.min(1, this.p + dt * (m === 'unload' ? 0.22 : 0.35)); if (this.p >= 1) { this.hold += dt; if (this.hold > 2.5) this.reset(); }
      const G0 = w * 0.09, G1 = w * 0.58, Y0 = h * 0.86, Y1 = h * 0.1, X = e => G0 + e / 8 * (G1 - G0), Y = f => Y0 - f / 70 * (Y0 - Y1);
      line(ctx, G0, Y0, G1 + 8, Y0, C.muted, 2); line(ctx, G0, Y0, G0, Y1 - 8, C.muted, 2);
      [0, 2, 4, 6, 8].forEach(e => T(ctx, String(e), X(e), Y0 + fs * 1.3, { size: fs * 0.8, a: 'center', c: C.muted }));
      [0, 20, 40, 60].forEach(f => T(ctx, String(f), G0 - 8, Y(f) + fs * 0.3, { size: fs * 0.8, a: 'right', c: C.muted }));
      T(ctx, 'Extension e / mm', (G0 + G1) / 2, Y0 + fs * 2.6, { size: fs * 0.85, a: 'center', c: C.muted }); T(ctx, 'F / N', G0, Y1 - fs * 0.8, { size: fs * 0.85, a: 'center', c: C.muted });
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = rgba(C.muted, .5); ctx.lineWidth = 1.5; ctx.beginPath(); for (let e = 0; e <= 8; e += 0.05) { const q = [X(e), Y(Fn(e))]; e ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke(); ctx.restore();
      const eMax = m === 'linear' ? 2 : 6, lp = m === 'unload' ? Math.min(1, this.p / 0.55) : this.p, eEnd = eMax * lp;
      const shade = (e0, e1, f, col) => { ctx.beginPath(); ctx.moveTo(X(e0), Y0); for (let e = e0; e <= e1 + 1e-9; e += 0.02) ctx.lineTo(X(e), Y(f(e))); ctx.lineTo(X(e1), Y0); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
      const F6 = Fn(6), ep = 6 - F6 / 20, unl = e => 20 * (e - ep);
      if (m === 'unload' && this.p > 0.55) { const up = Math.min(1, (this.p - 0.55) / 0.35), eu = 6 - (6 - ep) * up;
        shade(0, 6, Fn, rgba(C.red, .28)); ctx.beginPath(); ctx.moveTo(X(ep), Y0); ctx.lineTo(X(6), Y(F6)); ctx.lineTo(X(6), Y0); ctx.closePath(); ctx.fillStyle = rgba(C.cyan, .45); ctx.fill();
        line(ctx, X(6), Y(F6), X(eu), Y(unl(eu)), C.cyan, 3); dot(ctx, X(eu), Y(unl(eu)), 6, C.cyan);
        line(ctx, X(0), Y(0), X(2), Y(40), C.gold, 3);
      } else { if (eEnd > 0) shade(0, eEnd, Fn, rgba(C.gold, .28)); }
      ctx.beginPath(); for (let e = 0; e <= eEnd + 1e-9; e += 0.02) { const q = [X(e), Y(Fn(e))]; e ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
      if (!(m === 'unload' && this.p > 0.55)) dot(ctx, X(eEnd), Y(Fn(eEnd)), 6, C.gold);
      dot(ctx, X(2), Y(40), 4, C.ink); T(ctx, 'Limit of proportionality', X(2) - 8, Y(40) - 8, { size: fs * 0.75, a: 'right', c: C.muted });
      let Wt = 0; for (let e = 0; e < 6; e += 0.001) Wt += Fn(e + 0.0005) * 0.001; Wt /= 1000; const Er = 0.5 * F6 * (6 - ep) / 1000;
      const x = w * 0.63; let y = h * 0.12; const L = (p, o) => { R(ctx, p, x, y, Object.assign({ size: fs, w: 600 }, o)); y += fs * 1.75; };
      if (m === 'linear') { L(['Within the limit:'], { c: C.muted }); L(['E = ½Fe'], { size: fs * 1.6, f: DISP, w: 700, c: C.gold }); y += fs * 0.3;
        if (this.p > 0.5) L(['= ½ × 40 × 2.0 × 10', '^−3']); if (this.p > 0.8) L(['= 0.040 J'], { size: fs * 1.3, w: 700, c: C.green }); if (this.p >= 1) { y += fs * 0.4; L(['e in metres: 2.0 mm = 2.0 × 10', '^−3', ' m'], { size: fs * 0.85, c: C.muted }); } }
      else if (m === 'beyond') { L(['Beyond the limit:'], { c: C.muted }); L(['Work done = area under curve'], { w: 700, c: C.gold });
        if (this.p >= 1) { L([`= ${Wt.toFixed(3)} J  ✓`], { size: fs * 1.3, w: 700, c: C.green }); y += fs * 0.4; L(['½Fe = ½ × ' + F6.toFixed(1) + ' × 6.0 × 10', '^−3'], { c: C.red, size: fs * 0.9 }); L([`= ${(0.5 * F6 * 6 / 1000).toFixed(3)} J  ✗`], { c: C.red, w: 700 }); L(['½Fe ignores the curved part'], { c: C.red, size: fs * 0.85 }); } }
      else { L(['Unloading line is parallel'], { w: 700 }); L(['to the loading line.'], { w: 700 });
        if (this.p > 0.9) { L([`Permanent extension = ${ep.toFixed(2)} mm`], { size: fs * 0.9 }); y += fs * 0.3; L([`Recovered = ${Er.toFixed(3)} J`], { c: C.cyan, w: 700 }); L([`Not recovered = ${(Wt - Er).toFixed(3)} J`], { c: C.red, w: 700 }); L(['(permanent deformation, heat)'], { size: fs * 0.85, c: C.muted }); } }
    } }));

  /* ---------- Ch 11 Adiabatic compression ---------- */
  add('adiabatic', { lesson: 'LESSON-11', ch: 11, title: 'Adiabatic compression: T rises', sub: 'Use Q = ΔU + W with the condition first',
    eq: 'Q = ΔU + W', eqn: 'W = work done by the gas. Compression: W is negative.',
    pts: ['First law: Q = ΔU + W, where W is the work done <b>by</b> the gas.', 'Insulated, or compressed very quickly: no heat transfer, so <b>Q = 0</b>. State this first.',
      'Compression: work is done <b>on</b> the gas, so W is negative.', 'ΔU = Q − W = −W, which is positive, so the internal energy and the <b>temperature increase</b>.',
      'Compare isothermal compression (slow, good thermal contact): ΔU = 0, so Q = W. Heat flows out of the gas.'],
    segs: [['mode', [['adia', 'Adiabatic (insulated)'], ['iso', 'Isothermal (slow)']]]] },
  () => ({ mode: 'adia', t: 0, mol: null, reset() { this.t = 0; this.mol = Array.from({ length: 36 }, () => ({ x: rnd(), y: rnd(), a: rnd() * Math.PI * 2 })); }, set(k, v) { this[k] = v; this.reset(); },
    draw(ctx, w, h, dt) {
      if (!this.mol) this.reset();
      const fs = FS(w), ad = this.mode === 'adia', dur = ad ? 1.6 : 5; this.t += dt; if (this.t > dur + 5) this.reset();
      const p = clamp((this.t - 0.8) / dur, 0, 1), V = 1 - 0.5 * p, Tk = ad ? 300 * Math.pow(1 / V, 0.4) : 300;
      const x0 = w * 0.06, x1 = w * 0.5, yt = h * 0.2, yb = h * 0.62, xp = x0 + (x1 - x0) * V;
      if (ad) { ctx.fillStyle = '#4C5F45'; ctx.fillRect(x0 - 14, yt - 14, x1 - x0 + 30, 14); ctx.fillRect(x0 - 14, yb, x1 - x0 + 30, 14); ctx.fillRect(x0 - 14, yt - 14, 14, yb - yt + 28);
        for (let x = x0 - 10; x < x1 + 14; x += 10) { line(ctx, x, yt - 12, x + 8, yt - 2, C.muted, 1); line(ctx, x, yb + 2, x + 8, yb + 12, C.muted, 1); }
        T(ctx, 'Insulated walls: Q = 0', x0, yb + fs * 2.4, { size: fs * 0.95, c: C.gold, w: 700 }); }
      else { line(ctx, x0, yt, x1 + 16, yt, '#C9D1DC', 3); line(ctx, x0, yb, x1 + 16, yb, '#C9D1DC', 3); line(ctx, x0, yt, x0, yb, '#C9D1DC', 3);
        if (p > 0 && p < 1) for (let i = 0; i < 4; i++) { const xx = x0 + (xp - x0) * (0.2 + i * 0.2), o = (this.t * 30) % 20; arrow(ctx, xx, yb + 4 + o * 0.3, xx, yb + 24 + o * 0.6, C.red, 2, 7); }
        T(ctx, 'Heat flows out through the walls', x0, yb + fs * 2.4, { size: fs * 0.95, c: C.red, w: 700 }); }
      const sp = 0.35 * Math.sqrt(Tk / 300);
      this.mol.forEach(m => { m.x += Math.cos(m.a) * sp * dt / V; m.y += Math.sin(m.a) * sp * dt * 1.4;
        if (m.x < 0) { m.x = -m.x; m.a = Math.PI - m.a; } if (m.x > 1) { m.x = 2 - m.x; m.a = Math.PI - m.a; } if (m.y < 0) { m.y = -m.y; m.a = -m.a; } if (m.y > 1) { m.y = 2 - m.y; m.a = -m.a; }
        dot(ctx, x0 + 6 + m.x * (xp - x0 - 12), yt + 6 + m.y * (yb - yt - 12), 4.5, heat((Tk - 300) / 120)); });
      ctx.fillStyle = '#A3AE9C'; ctx.fillRect(xp, yt + 3, 12, yb - yt - 6); ctx.fillRect(xp + 12, (yt + yb) / 2 - 5, w * 0.12, 10);
      if (p > 0 && p < 1) arrow(ctx, xp + w * 0.2, yt - fs * 0.4, xp + w * 0.13, yt - fs * 0.4, C.gold, 3, 10);
      T(ctx, ad ? 'Pushed in quickly' : 'Pushed in slowly', xp + w * 0.04, yt - fs * 1.4, { size: fs * 0.9, c: C.gold, w: 700 });
      const tx = w * 0.6, tt = h * 0.18, tb = h * 0.66, fr = clamp((Tk - 280) / 140, 0, 1);
      rrect(ctx, tx - 7, tt, 14, tb - tt, 7); ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fill(); ctx.fillStyle = heat((Tk - 300) / 120); ctx.fillRect(tx - 3, tb - (tb - tt) * fr, 6, (tb - tt) * fr); dot(ctx, tx, tb + 8, 12, heat((Tk - 300) / 120));
      T(ctx, `${Tk.toFixed(0)} K`, tx, tt - 10, { size: fs * 1.2, a: 'center', f: DISP, w: 700, c: heat((Tk - 300) / 120) });
      const x = w * 0.68; let y = h * 0.14; const L = (s, o) => { R(ctx, s, x, y, Object.assign({ size: fs, w: 600 }, o)); y += fs * 1.75; };
      L(['Q = ΔU + W'], { size: fs * 1.5, f: DISP, w: 700, c: C.gold }); L(['W = work done by the gas'], { size: fs * 0.8, c: C.muted }); y += fs * 0.3;
      if (ad) { L(['Q = 0'], { w: 700, c: C.gold }); L(['W < 0 (work done on gas)'], { w: 700 }); L(['ΔU = −W > 0'], { w: 700, c: C.red }); L(['U increases, so T increases'], { w: 700, c: C.red }); }
      else { L(['T constant, so ΔU = 0'], { w: 700, c: C.cyan }); L(['W < 0 (work done on gas)'], { w: 700 }); L(['Q = W < 0'], { w: 700, c: C.red }); L(['Heat flows out of the gas'], { w: 700, c: C.red }); }
    } }));

  /* ---------- Ch 12 Conduction in metals ---------- */
  add('conduct', { lesson: 'LESSON-12', ch: 12, title: 'Conduction in a metal: two mechanisms', sub: 'Lattice vibration and free electrons',
    eq: 'Lattice vibration + free electrons', eqn: 'Write “atoms”, not “molecules”, for a metal',
    pts: ['In a metal, energy is conducted by <b>lattice vibration</b> and by <b>free electrons</b>.', 'Atoms at the hot end vibrate with larger amplitude about fixed positions and pass energy to neighbouring atoms.',
      'Free electrons at the hot end gain kinetic energy, <b>diffuse to the cold end</b> and transfer energy by colliding with atoms there.',
      'Free electrons move fast, so metals conduct much better than non-metals, which rely on lattice vibration only.', 'Write “atoms”, not “molecules”, for a metal.'],
    segs: [['mode', [['metal', 'Metal'], ['non', 'Non-metal']]]] },
  () => ({ mode: 'metal', reset() { this.t = 0; this.T = Array(16).fill(300); this.el = Array.from({ length: 40 }, () => ({ x: rnd() * 16, y: rnd(), a: rnd() * 6.283, E: 300 })); }, set(k, v) { this[k] = v; this.reset(); },
    draw(ctx, w, h, dt) {
      if (!this.T) this.reset();
      const fs = FS(w), n = 16, metal = this.mode === 'metal', Tt = this.T, D = metal ? 18 : 1.6; this.t += dt; if (this.t > 20) this.reset();
      for (let s = 0; s < 4; s++) { const d = dt / 4, nT = Tt.slice(); for (let i = 1; i < n; i++) { const r = i === n - 1 ? Tt[i - 1] : Tt[i + 1]; nT[i] = Tt[i] + D * d * (Tt[i - 1] - 2 * Tt[i] + r); } nT[0] = 600; this.T = nT; }
      const T2 = this.T, rx0 = w * 0.12, rx1 = w * 0.92, ry0 = h * 0.26, ry1 = h * 0.6, cw = (rx1 - rx0) / n, rows = 4, rh = (ry1 - ry0) / rows;
      rrect(ctx, rx0, ry0, rx1 - rx0, ry1 - ry0, 8); ctx.fillStyle = metal ? 'rgba(201,209,220,.1)' : 'rgba(184,115,63,.12)'; ctx.fill(); ctx.strokeStyle = rgba(C.muted, .5); ctx.lineWidth = 1.5; ctx.stroke();
      for (let i = 0; i < 3; i++) { const fx = w * 0.06, fy = (ry0 + ry1) / 2, fl = Math.sin(this.t * 9 + i * 2) * 4; ctx.fillStyle = i ? 'rgba(242,102,27,.75)' : 'rgba(213,220,59,.85)'; ctx.beginPath(); ctx.moveTo(fx - 14 + i * 4, fy + 34); ctx.quadraticCurveTo(fx - 18, fy, fx + 6 + fl, fy - 30 + i * 8); ctx.quadraticCurveTo(fx + 18, fy, fx + 14 - i * 4, fy + 34); ctx.closePath(); ctx.fill(); }
      T(ctx, 'Heated end', w * 0.06, ry1 + fs * 3, { size: fs * 0.85, a: 'center', c: C.xr, w: 700 });
      for (let i = 0; i < n; i++) for (let j = 0; j < rows; j++) { const f = (T2[i] - 300) / 300, amp = cw * (0.03 + 0.2 * f), cx = rx0 + (i + 0.5) * cw, cy = ry0 + (j + 0.5) * rh;
        dot(ctx, cx + Math.sin(this.t * 23 + i * 7 + j * 3) * amp, cy + Math.cos(this.t * 19 + i * 5 + j * 11) * amp, Math.min(cw, rh) * 0.24, heat(f)); }
      if (metal) this.el.forEach(e => { const i = clamp(Math.floor(e.x), 0, n - 1), sp = 3.2 * Math.sqrt(T2[i] / 300);
        e.x += Math.cos(e.a) * sp * dt; e.y += Math.sin(e.a) * sp * dt / rows; if (rnd() < dt * 3) e.a = rnd() * 6.283;
        if (e.x < 0) { e.x = -e.x; e.a = Math.PI - e.a; } if (e.x > n) { e.x = 2 * n - e.x; e.a = Math.PI - e.a; } if (e.y < 0) { e.y = -e.y; e.a = -e.a; } if (e.y > 1) { e.y = 2 - e.y; e.a = -e.a; }
        e.E += (T2[clamp(Math.floor(e.x), 0, n - 1)] - e.E) * Math.min(1, dt * 1.5);
        const px = rx0 + e.x * cw, py = ry0 + e.y * (ry1 - ry0); dot(ctx, px, py, 3, '#FFFFFF'); dot(ctx, px, py, 2, heat((e.E - 300) / 300)); });
      const far = T2[n - 1];
      T(ctx, `Far end: ${(far - 273).toFixed(0)} °C`, rx1, h * 0.17, { size: fs * 1.3, a: 'right', f: DISP, w: 700, c: heat((far - 300) / 300) });
      T(ctx, `t = ${this.t.toFixed(1)} s`, rx1, h * 0.17 + fs * 1.4, { size: fs * 0.85, a: 'right', c: C.muted });
      T(ctx, metal ? 'Metal: lattice vibration + free electrons' : 'Non-metal: lattice vibration only', rx0, h * 0.17, { size: fs * 1.15, w: 700, c: C.gold });
      let lx = rx0; const ly = ry1 + fs * 2.4;
      dot(ctx, lx + 7, ly - fs * 0.35, 7, heat(0.5)); lx += 20 + T(ctx, 'Atom: vibrates about a fixed position', lx + 20, ly, { size: fs * 0.85, c: C.muted }) + 26;
      if (metal) { dot(ctx, lx + 5, ly - fs * 0.35, 4, '#FFFFFF'); T(ctx, 'Free electron', lx + 16, ly, { size: fs * 0.85, c: C.muted }); }
      T(ctx, metal ? 'Fast electrons from the hot end diffuse to the cold end and collide with atoms there.' : 'Energy passes from atom to atom only, so the far end warms up slowly.', rx0, h * 0.86, { size: fs * 0.95, w: 600 });
    } }));

  /* ---------- Ch 12 Natural and forced convection ---------- */
  add('convect', { lesson: 'LESSON-12', ch: 12, title: 'Natural vs forced convection', sub: 'What drives the flow?',
    eq: 'Natural: density differences · Forced: fan or pump', eqn: 'Convection is heat transfer by the bulk movement of a fluid',
    pts: ['Convection is heat transfer by the <b>bulk movement of a fluid</b>.', '<b>Natural</b> convection: the heated fluid expands, its density decreases and it rises. Cooler, denser fluid sinks to take its place.',
      '<b>Forced</b> convection: a fan or pump drives the flow, not density differences.', 'Forced convection carries heat away faster, for example a car radiator fan or a CPU cooling fan.',
      'Convection needs a fluid. It cannot happen in a solid.'],
    segs: [['mode', [['natural', 'Natural'], ['forced', 'Forced']]]] },
  () => ({ mode: 'natural', reset() { this.t = 0; this.ps = Array.from({ length: 150 }, () => ({ x: rnd(), y: rnd(), q: 0.3 })); }, set(k, v) { this[k] = v; this.reset(); },
    draw(ctx, w, h, dt) {
      if (!this.ps) this.reset();
      const fs = FS(w), nat = this.mode === 'natural'; this.t += dt;
      const x0 = w * 0.06, x1 = w * 0.6, y0 = h * 0.14, y1 = h * 0.8, W = x1 - x0, H = y1 - y0, P = Math.PI;
      rrect(ctx, x0, y0, W, H, 8); ctx.fillStyle = rgba(C.cyan, .08); ctx.fill(); ctx.strokeStyle = rgba(C.muted, .6); ctx.lineWidth = 2; ctx.stroke();
      const hx0 = nat ? 0.02 : 0.35, hx1 = nat ? 0.4 : 0.75;
      ctx.fillStyle = C.red; ctx.fillRect(x0 + W * hx0, y1 - 4, W * (hx1 - hx0), 8);
      T(ctx, 'Heater', x0 + W * (hx0 + hx1) / 2, y1 + fs * 1.6, { size: fs * 0.85, a: 'center', c: C.red, w: 700 });
      this.ps.forEach(p => {
        let u, v;
        if (nat) { u = P * Math.sin(P * p.x) * Math.cos(P * p.y) * 0.09; v = -P * Math.cos(P * p.x) * Math.sin(P * p.y) * 0.09; }
        else { u = 0.32 + 0.06 * Math.sin(p.y * 9 + this.t); v = 0.03 * Math.sin(p.x * 12 + this.t * 2); }
        p.x += (u + (rnd() - .5) * 0.02) * dt; p.y += (v + (rnd() - .5) * 0.02) * dt;
        if (nat) { p.x = clamp(p.x, 0.01, 0.99); p.y = clamp(p.y, 0.01, 0.99); } else { if (p.x > 1) { p.x -= 1; p.q = 0.15; } p.y = clamp(p.y, 0.02, 0.98); }
        if (p.y > (nat ? 0.78 : 0.84) && p.x > hx0 && p.x < hx1) p.q += (1 - p.q) * dt * (nat ? 3.5 : 3);
        p.q -= p.q * dt * (nat ? (p.y < 0.2 ? 0.6 : 0.06) : 0.15);
        dot(ctx, x0 + p.x * W, y0 + p.y * H, 3.2, heat(p.q));
      });
      if (nat) {
        arrow(ctx, x0 + W * 0.18, y0 + H * 0.7, x0 + W * 0.18, y0 + H * 0.3, rgba(C.xr, .9), 3, 11); arrow(ctx, x0 + W * 0.82, y0 + H * 0.3, x0 + W * 0.82, y0 + H * 0.7, rgba(C.violet, .9), 3, 11);
        T(ctx, 'Warm: expands, density ↓, rises', x0 + W * 0.04, y0 - fs * 0.6, { size: fs * 0.85, c: C.xr, w: 700 });
        T(ctx, 'Cool, denser fluid sinks', x1, y0 - fs * 0.6, { size: fs * 0.85, a: 'right', c: C.violet, w: 700 });
      } else {
        const fx = x0 - w * 0.015, fy = (y0 + y1) / 2, a = this.t * 12; ctx.fillStyle = C.muted;
        for (let i = 0; i < 3; i++) { const b = a + i * 2.094; ctx.beginPath(); ctx.ellipse(fx, fy + Math.sin(b) * H * 0.18, 6, H * 0.1 * Math.abs(Math.cos(b)) + 3, 0, 0, 7); ctx.fill(); }
        for (let i = 0; i < 3; i++) arrow(ctx, x0 + W * 0.05, y0 + H * (0.25 + i * 0.25), x0 + W * 0.2, y0 + H * (0.25 + i * 0.25), rgba(C.ink, .7), 2.5, 9);
        T(ctx, 'Fan drives the flow', x0, y0 - fs * 0.6, { size: fs * 0.85, c: C.ink, w: 700 });
        T(ctx, 'Warm fluid carried away', x1, y0 - fs * 0.6, { size: fs * 0.85, a: 'right', c: C.xr, w: 700 });
      }
      const x = w * 0.66; let y = h * 0.16; const L = (s, o) => { T(ctx, s, x, y, Object.assign({ size: fs, w: 600 }, o)); y += fs * 1.6; };
      L(nat ? 'Natural convection' : 'Forced convection', { size: fs * 1.4, f: DISP, w: 700, c: C.gold }); y += fs * 0.3;
      if (nat) { L('Flow is caused by'); L('density differences', { w: 700, c: C.gold }); L('from heating.'); y += fs * 0.5; L('Needs gravity (upthrust).', { c: C.muted, size: fs * 0.9 }); }
      else { L('Flow is caused by'); L('a fan or a pump,', { w: 700, c: C.gold }); L('not by density differences.'); y += fs * 0.5; L('Removes heat faster.', { c: C.muted, size: fs * 0.9 }); L('e.g. car radiator, CPU fan', { c: C.muted, size: fs * 0.9 }); }
    } }));
})();
