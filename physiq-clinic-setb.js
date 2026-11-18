/* PhysiQ · Revision Paper Semester 1 Set B: animated worked solutions for Questions 21–25.
   One animation per question part, in step with the numbered points beside it: "Next point" moves the
   animation to that step, "Show all" plays every step in turn. The topics carry paper:'s1-set-b', so they
   are kept out of the general Concept Clinic list and appear only in Set B, after the student has
   downloaded their answers. Registers with physiq-clinic.js, which must load first. */
(function () {
  'use strict';
  const PC = window.PhysiQClinic; if (!PC) return;
  const { C, DISP, clamp, rgba, R, FR, arrow, line, dot, rrect } = PC.U, T0 = PC.U.T;
  // labels: 'v_y', 'τ_motor', 'C_V,m' are drawn with real subscripts
  const T = (ctx, s, x, y, o = {}) => /_[A-Za-z]/.test(s) ? R(ctx, s.split(/(_[A-Za-z]+(?:,[A-Za-z]+)?)/).filter(Boolean), x, y, o) : T0(ctx, s, x, y, o);
  const FRAC = (a, b) => `<span class="cc-frac"><span>${a}</span><span>${b}</span></span>`;
  const d2r = Math.PI / 180, TAU = Math.PI * 2;
  const ease = p => { p = clamp(p, 0, 1); return p * p * (3 - 2 * p); };
  const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
  const FSZ = w => clamp(w / 44, 11, 23);
  const heat = f => { f = clamp(f, 0, 1); const a = [143, 137, 255], b = [255, 122, 92]; return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * f)).join(',')})`; };

  /* ---------- equations on the canvas: strings ('_x' subscript, '^x' superscript), {f:[num, den]}, {sq:[...]} ---------- */
  function itemW(ctx, it, o) {
    if (typeof it === 'string') return R(ctx, [it], 0, 0, Object.assign({}, o, { measure: true }));
    if (it.f) { const a = R(ctx, it.f[0], 0, 0, Object.assign({}, o, { measure: true })), b = R(ctx, it.f[1], 0, 0, Object.assign({}, o, { measure: true })); return Math.max(a, b) + o.size * 0.55; }
    if (it.sq) return o.size * 0.7 + R(ctx, it.sq, 0, 0, Object.assign({}, o, { measure: true }));
    return 0;
  }
  function EQ(ctx, items, x, y, o) {
    o = Object.assign({ size: 16, w: 600, c: C.ink }, o);
    const W = items.reduce((s, it) => s + itemW(ctx, it, o), 0);
    if (o.measure) return W;
    let cx = o.a === 'center' ? x - W / 2 : o.a === 'right' ? x - W : x;
    items.forEach(it => {
      const iw = itemW(ctx, it, o);
      if (typeof it === 'string') R(ctx, [it], cx, y, o);
      else if (it.f) FR(ctx, it.f[0], it.f[1], cx + o.size * 0.08, y - o.size * 0.32, o);
      else if (it.sq) {
        const sz = o.size, tw = iw - sz * 0.7;
        T(ctx, '√', cx, y + sz * 0.05, { size: sz * 1.1, w: o.w, c: o.c });
        R(ctx, it.sq, cx + sz * 0.62, y, o);
        line(ctx, cx + sz * 0.55, y - sz * 0.95, cx + sz * 0.66 + tw, y - sz * 0.95, o.c, Math.max(1.4, sz / 14));
      }
      cx += iw;
    });
    return W;
  }
  const hasFrac = items => items.some(it => it && it.f);
  // a column of equation lines; each line shrinks to fit the width
  function board(S, x, y, maxW, lines, o = {}) {
    const { ctx } = S; const base = o.size || S.fs * 1.05;
    lines.forEach(L => {
      if (!L) return;
      const items = L.e || L, size0 = (L.s || 1) * base, op = L.o == null ? 1 : L.o;
      const W = EQ(ctx, items, 0, 0, { size: size0, w: L.w || 650, measure: true });
      const size = W > maxW ? size0 * maxW / W : size0;
      const fr = hasFrac(items);
      y += fr ? size * 1.6 : size * 0.95;
      ctx.save(); ctx.globalAlpha = op;
      EQ(ctx, items, o.a === 'center' ? x + maxW / 2 : x, y, { size, w: L.w || 650, c: L.c || C.ink, a: o.a === 'center' ? 'center' : 'left' });
      ctx.restore();
      y += fr ? size * 1.4 : size * 0.75;
    });
    return y;
  }
  function wrap(ctx, s, maxW, size, wgt) {
    ctx.font = `${wgt || 600} ${size}px "Inter","Segoe UI",system-ui,sans-serif`;
    const words = s.split(' '), out = []; let cur = '';
    words.forEach(wd => { const t = cur ? cur + ' ' + wd : wd; if (ctx.measureText(t).width > maxW && cur) { out.push(cur); cur = wd; } else cur = t; });
    if (cur) out.push(cur); return out;
  }

  /* ---------- the step engine ---------- */
  function layout(w, h, fs) {
    const side = w >= 600 && w / h > 1.42, top = fs * 2.1, capH = side ? fs * 3.2 : 0, bot = h - capH - fs * 0.4;
    if (side) return { side, top, bot, capH, fig: { x: w * 0.02, y: top, w: w * 0.55, h: bot - top }, brd: { x: w * 0.595, y: top + fs * 0.3, w: w * 0.385 } };
    const fh = (bot - top) * 0.56;
    return { side, top, bot, capH, fig: { x: w * 0.02, y: top, w: w * 0.96, h: fh }, brd: { x: w * 0.05, y: top + fh + fs * 0.2, w: w * 0.9 } };
  }
  function scene(steps, draw, extra) {
    return Object.assign({
      t: 0, man: -1,
      reset() { this.t = 0; if (this.init) this.init(); },
      set(k, v) { this[k] = v; this.reset(); },
      onStep(s) { this.man = s; this.t = 0; if (this.init) this.init(); },
      draw(ctx, w, h, dt) {
        if (!this._ok) { this._ok = 1; if (this.init) this.init(); }
        this.t += dt;
        const durs = steps.map(s => s.d || 5), tot = durs.reduce((a, b) => a + b, 0);
        let k, lt;
        if (this.man >= 0) { k = Math.min(this.man, steps.length - 1); lt = this.t; }
        else { let x = this.t % tot; k = 0; while (k < steps.length - 1 && x >= durs[k]) { x -= durs[k]; k++; } lt = x; }
        const fs = FSZ(w), L = layout(w, h, fs);
        const S = { ctx, w, h, fs, k, lt, p: clamp(lt / (durs[k] * 0.8), 0, 1), dt, st: this, L, n: steps.length, auto: this.man < 0 };
        draw(S);
        T(ctx, `Step ${k + 1} of ${steps.length}`, w * 0.02, fs * 1.35, { size: fs * 0.8, c: C.muted, w: 700 });
        T(ctx, S.auto ? 'Playing all steps · tap Next point to go one step at a time' : 'Tap Next point for the next step', w * 0.98, fs * 1.35, { size: fs * 0.7, c: rgba(C.muted, .8), a: 'right' });
        if (L.side && steps[k].cap) {
          const lines = wrap(ctx, steps[k].cap, w * 0.92, fs * 0.92, 700).slice(0, 2), y0 = h - L.capH + fs * 0.2;
          ctx.fillStyle = 'rgba(0,0,0,.22)'; rrect(ctx, w * 0.02, y0, w * 0.96, L.capH - fs * 0.5, 10); ctx.fill();
          lines.forEach((s, i) => T(ctx, s, w / 2, y0 + fs * (lines.length === 1 ? 1.65 : 1.15 + i * 1.25), { size: fs * 0.92, a: 'center', c: steps[k].col || C.gold, w: 700 }));
        }
      }
    }, extra || {});
  }
  const add = (key, q, part, topic, steps, draw, extra) => PC.add(key,
    Object.assign({ sem: '1', paper: 's1-set-b', lesson: null, ch: topic.ch, qlabel: `Set B · Question ${q}${part}` }, topic, { eq: `<span>${topic.eq}</span>`, pts: steps.map(s => s.pt) }),
    () => scene(steps, draw, extra));

  /* world → screen map that keeps the aspect ratio inside a box */
  function mapper(box, x0, x1, y0, y1, pad = 0.04) {
    const bw = box.w * (1 - 2 * pad), bh = box.h * (1 - 2 * pad), s = Math.min(bw / (x1 - x0), bh / (y1 - y0));
    const ox = box.x + (box.w - s * (x1 - x0)) / 2, oy = box.y + (box.h + s * (y1 - y0)) / 2;
    return { s, X: x => ox + (x - x0) * s, Y: y => oy - (y - y0) * s };
  }
  function bracketV(ctx, x, ya, yb, col, label, fs, side = 1) {
    line(ctx, x, ya, x, yb, col, 2); line(ctx, x - 6, ya, x + 6, ya, col, 2); line(ctx, x - 6, yb, x + 6, yb, col, 2);
    T(ctx, label, x + side * fs * 0.5, (ya + yb) / 2 + fs * 0.35, { size: fs * 0.9, c: col, w: 700, a: side > 0 ? 'left' : 'right' });
  }
  function bracketH(ctx, xa, xb, y, col, label, fs) {
    line(ctx, xa, y, xb, y, col, 2); line(ctx, xa, y - 6, xa, y + 6, col, 2); line(ctx, xb, y - 6, xb, y + 6, col, 2);
    T(ctx, label, (xa + xb) / 2, y + fs * 1.25, { size: fs * 0.9, c: col, w: 700, a: 'center' });
  }
  function arc(ctx, x, y, r, a0, a1, col, lw = 2) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(x, y, r, a0, a1, a1 < a0); ctx.stroke(); }

  /* =====================================================================
     Question 21 · basketball free throw
     ===================================================================== */
  const B = { u: 7.4468, th: 52 * d2r, g: 9.81, y0: 2.10, xh: 4.60, yh: 3.05, th_: 1.0033 };
  const bPos = (t, u = B.u) => ({ x: u * Math.cos(B.th) * t, y: B.y0 + u * Math.sin(B.th) * t - 0.5 * B.g * t * t });
  const bY = (x, u = B.u) => B.y0 + x * Math.tan(B.th) - B.g * x * x / (2 * u * u * Math.cos(B.th) ** 2);
  function court(S, M, o = {}) {
    const { ctx, fs } = S;
    line(ctx, M.X(-0.9), M.Y(0), M.X(5.6), M.Y(0), C.muted, 2.5);
    for (let x = -0.9; x < 5.6; x += 0.3) line(ctx, M.X(x), M.Y(0), M.X(x - 0.12), M.Y(-0.12), rgba(C.muted, .6), 1);
    const px = -0.28, s = M.s; ctx.strokeStyle = C.ink; ctx.lineWidth = Math.max(2, s * 0.05);
    ctx.beginPath(); ctx.arc(M.X(px), M.Y(1.78), s * 0.13, 0, TAU); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(M.X(px), M.Y(1.64)); ctx.lineTo(M.X(px), M.Y(0.95)); ctx.lineTo(M.X(px - 0.18), M.Y(0)); ctx.moveTo(M.X(px), M.Y(0.95)); ctx.lineTo(M.X(px + 0.15), M.Y(0));
    ctx.moveTo(M.X(px), M.Y(1.45)); ctx.lineTo(M.X(-0.04), M.Y(2.02)); ctx.stroke();
    line(ctx, M.X(5.15), M.Y(0), M.X(5.15), M.Y(3.3), '#C9D1DC', Math.max(3, s * 0.07)); line(ctx, M.X(4.95), M.Y(3.3), M.X(5.15), M.Y(3.3), '#C9D1DC', 3);
    line(ctx, M.X(4.95), M.Y(2.85), M.X(4.95), M.Y(3.95), '#E8ECF2', Math.max(4, s * 0.08));
    line(ctx, M.X(4.37), M.Y(3.05), M.X(4.95), M.Y(3.05), C.xr, Math.max(3, s * 0.06));
    ctx.strokeStyle = rgba(C.ink, .55); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(M.X(4.4), M.Y(3.03)); ctx.lineTo(M.X(4.5), M.Y(2.75)); ctx.lineTo(M.X(4.72), M.Y(2.75)); ctx.lineTo(M.X(4.82), M.Y(3.03)); ctx.stroke();
    if (o.label !== false) T(ctx, 'hoop', M.X(4.6), M.Y(3.32), { size: fs * 0.8, c: C.muted, a: 'center' });
  }
  function ball(S, M, x, y, col = C.xr) { const r = Math.max(5, M.s * 0.12); dot(S.ctx, M.X(x), M.Y(y), r, col); S.ctx.strokeStyle = 'rgba(0,0,0,.35)'; S.ctx.lineWidth = 1.2; S.ctx.beginPath(); S.ctx.arc(M.X(x), M.Y(y), r, 0, TAU); S.ctx.stroke(); }
  function path(S, M, fx, x0, x1, col, lw = 2, dash) {
    const { ctx } = S; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.beginPath();
    for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80, y = fx(x); if (y < 0) break; i ? ctx.lineTo(M.X(x), M.Y(y)) : ctx.moveTo(M.X(x), M.Y(y)); }
    ctx.stroke(); ctx.restore();
  }
  const M21 = S => mapper(S.L.fig, -1.75, 5.9, -0.35, 4.25);

  add('sb21a', 21, '(a)', { ch: 2, title: 'Free throw: find the speed of projection', sub: 'Use the equation of the path, with displacements measured from the hand',
    eq: 'y = x tan θ − ' + FRAC('gx<sup>2</sup>', '2u<sup>2</sup> cos<sup>2</sup> θ'), eqn: 'Equation of the path of a projectile, origin at the point of release' }, [
    { cap: 'Measure from the hand, not from the floor: y = 3.05 − 2.10 = 0.95 m', pt: '<b>Find the displacements.</b> Take the point of release as the origin. The hoop is 3.05 m above the floor, but the ball starts 2.10 m above the floor, so y = 3.05 − 2.10 = <b>0.95 m</b>. Horizontally, x = <b>4.60 m</b>.' },
    { cap: 'Horizontally the velocity u cos θ is constant: equal distances in equal times', pt: '<b>Horizontal motion.</b> There is no horizontal force, so u cos θ stays constant: x = (u cos θ)t, which gives t = ' + FRAC('x', 'u cos θ') + '.' },
    { cap: 'Vertically the ball slows down, stops, then speeds up downwards: acceleration g', pt: '<b>Vertical motion.</b> The acceleration is g downwards: y = (u sin θ)t − ½gt<sup>2</sup>.' },
    { cap: 'Put t = x / (u cos θ) into the vertical equation to get the path', pt: '<b>Remove t.</b> Substitute t into the vertical equation: y = x tan θ − ' + FRAC('gx<sup>2</sup>', '2u<sup>2</sup> cos<sup>2</sup> θ') + '. This is the equation of the path.' },
    { cap: 'Substitute x = 4.60 m, y = 0.95 m and θ = 52.0°', pt: '<b>Substitute.</b> 0.95 = 4.60 tan 52.0° − ' + FRAC('(9.81)(4.60)<sup>2</sup>', '2u<sup>2</sup> cos<sup>2</sup> 52.0°') + ', so 0.95 = 5.888 − ' + FRAC('207.6', '0.7581u<sup>2</sup>') + '.' },
    { cap: 'u = 7.45 m/s is the only speed whose path goes through the hoop', pt: '<b>Solve.</b> ' + FRAC('207.6', '0.7581u<sup>2</sup>') + ' = 4.938, so u<sup>2</sup> = 55.46 and <b>u = 7.45 m s<sup>−1</sup></b>. A slower throw falls short; a faster one goes long.', col: C.green }
  ], S => {
    const { ctx, fs, k, p, lt, L } = S, M = M21(S); court(S, M);
    const B0 = { x: L.brd.x, y: L.brd.y, w: L.brd.w };
    if (k === 0) {
      ball(S, M, 0, B.y0);
      line(ctx, M.X(-0.6), M.Y(B.y0), M.X(5.0), M.Y(B.y0), rgba(C.gold, .6), 1.5, [6, 5]);
      bracketV(ctx, M.X(5.45), M.Y(0), M.Y(3.05), C.cyan, '3.05 m', fs);
      if (p > 0.25) bracketV(ctx, M.X(-0.7), M.Y(0), M.Y(B.y0), C.cyan, '2.10 m', fs, -1);
      if (p > 0.55) { ctx.save(); ctx.globalAlpha = ease(seg(p, 0.55, 0.8)); bracketV(ctx, M.X(4.25), M.Y(B.y0), M.Y(3.05), C.gold, 'y = 0.95 m', fs, -1); bracketH(ctx, M.X(0), M.X(4.6), M.Y(B.y0) + fs * 0.6, C.gold, 'x = 4.60 m', fs); ctx.restore(); }
      board(S, B0.x, B0.y, B0.w, [
        { e: ['y = 3.05 − 2.10'], o: ease(seg(p, 0.5, 0.7)) },
        { e: ['y = 0.95 m'], c: C.gold, w: 800, s: 1.2, o: ease(seg(p, 0.7, 0.9)) },
        { e: ['x = 4.60 m'], c: C.gold, w: 800, s: 1.2, o: ease(seg(p, 0.75, 0.95)) }]);
    } else if (k === 1 || k === 2) {
      path(S, M, x => bY(x), 0, 4.6, rgba(C.ink, .25), 1.5, [5, 5]);
      const tt = (lt * 0.45) % 1.25, tc = Math.min(tt, B.th_), P = bPos(tc);
      for (let i = 0; i <= 10; i++) {
        const ti = i * 0.1; if (ti > tc) break; const Q = bPos(ti);
        if (k === 1) { dot(ctx, M.X(Q.x), M.Y(0) - 6, 4, C.gold); line(ctx, M.X(Q.x), M.Y(Q.y), M.X(Q.x), M.Y(0) - 6, rgba(C.gold, .25), 1, [3, 4]); }
        else { dot(ctx, M.X(-0.75), M.Y(Q.y), 4, C.cyan); line(ctx, M.X(Q.x), M.Y(Q.y), M.X(-0.75), M.Y(Q.y), rgba(C.cyan, .25), 1, [3, 4]); }
      }
      ball(S, M, P.x, P.y);
      const sc = M.s * 0.16, vx = B.u * Math.cos(B.th), vy = B.u * Math.sin(B.th) - B.g * tc;
      if (k === 1) { arrow(ctx, M.X(P.x), M.Y(P.y), M.X(P.x) + vx * sc, M.Y(P.y), C.gold, 3, 10); T(ctx, 'u cos θ', M.X(P.x) + vx * sc + 6, M.Y(P.y) + fs * 0.35, { size: fs * 0.85, c: C.gold, w: 700 }); }
      else { if (Math.abs(vy) > 0.15) arrow(ctx, M.X(P.x), M.Y(P.y), M.X(P.x), M.Y(P.y) - vy * sc, C.cyan, 3, 10); T(ctx, `v_y = ${vy.toFixed(1)} m/s`, M.X(P.x) + 10, M.Y(P.y) - fs * 0.8, { size: fs * 0.8, c: C.cyan, w: 700 }); }
      T(ctx, k === 1 ? 'shadow on the floor every 0.1 s: equally spaced' : 'height every 0.1 s: spacing changes', M.X(2.2), M.Y(0) + fs * 1.5, { size: fs * 0.8, c: k === 1 ? C.gold : C.cyan, a: 'center' });
      board(S, B0.x, B0.y, B0.w, k === 1 ? [
        { e: ['Horizontal (constant velocity):'], s: 0.8, c: C.muted },
        { e: ['x = (u cos θ) t'], w: 800 },
        { e: ['t = ', { f: [['x'], ['u cos θ']] }], c: C.gold, w: 800 }] : [
        { e: ['Vertical (acceleration g down):'], s: 0.8, c: C.muted },
        { e: ['y = (u sin θ) t − ½ g t', '^2'], w: 800, c: C.cyan }]);
    } else if (k === 3) {
      const pr = ease(seg(p, 0, 0.7)); path(S, M, x => bY(x), 0, 4.6 * pr, C.gold, 3); ball(S, M, 4.6 * pr, bY(4.6 * pr));
      board(S, B0.x, B0.y, B0.w, [
        { e: ['y = (u sin θ)', { f: [['x'], ['u cos θ']] }, ' − ½ g', { f: [['x', '^2'], ['u', '^2', ' cos', '^2', ' θ']] }], s: 0.9 },
        { e: ['y = x tan θ − ', { f: [['g x', '^2'], ['2u', '^2', ' cos', '^2', ' θ']] }], c: C.gold, w: 800, s: 1.1, o: ease(seg(p, 0.4, 0.7)) }]);
    } else if (k === 4) {
      path(S, M, x => bY(x), 0, 4.6, C.gold, 3); ball(S, M, 4.6, 3.05);
      T(ctx, '(4.60, 0.95)', M.X(4.2), M.Y(3.05) + fs * 1.6, { size: fs * 0.85, c: C.gold, a: 'right', w: 700 });
      board(S, B0.x, B0.y, B0.w, [
        { e: ['0.95 = 4.60 tan 52.0° − ', { f: [['(9.81)(4.60)', '^2'], ['2u', '^2', ' cos', '^2', ' 52.0°']] }], s: 0.92 },
        { e: ['0.95 = 5.888 − ', { f: [['207.6'], ['0.7581 u', '^2']] }], o: ease(seg(p, 0.35, 0.6)) },
        { e: [{ f: [['207.6'], ['0.7581 u', '^2']] }, ' = 5.888 − 0.95 = 4.938'], s: 0.92, o: ease(seg(p, 0.6, 0.85)) }]);
    } else {
      [[7.0, C.red, 'u = 7.0 m/s: short'], [8.0, C.violet, 'u = 8.0 m/s: long']].forEach(([u, c, lb], i) => { path(S, M, x => bY(x, u), 0, 5.4, rgba(c, .8), 2, [6, 4]); T(ctx, lb, M.X(i ? 2.9 : 3.5), M.Y(bY(i ? 2.9 : 3.5, u)) - fs * (i ? 0.7 : -1.6), { size: fs * 0.8, c, w: 700, a: 'center' }); });
      const pr = (lt * 0.5) % 1.3, x = 4.6 * Math.min(pr, 1); path(S, M, xx => bY(xx), 0, 4.6, C.green, 3); ball(S, M, x, bY(x));
      board(S, B0.x, B0.y, B0.w, [
        { e: ['u', '^2', ' = ', { f: [['207.6'], ['(0.7581)(4.938)']] }, ' = 55.46'] },
        { e: ['u = 7.45 m s', '^−1'], c: C.green, w: 800, s: 1.35 }]);
    }
  });

  add('sb21b', 21, '(b)', { ch: 2, title: 'Free throw: velocity at the hoop', sub: 'Find both components, then combine them',
    eq: 'v = √(v<sub>x</sub><sup>2</sup> + v<sub>y</sub><sup>2</sup>)', eqn: 'tan α = |v<sub>y</sub>| / v<sub>x</sub>, the angle with the horizontal' }, [
    { cap: 'Time to reach the hoop: t = x / (u cos θ) = 1.003 s', pt: '<b>Time to the hoop.</b> From the horizontal motion: t = ' + FRAC('x', 'u cos θ') + ' = ' + FRAC('4.60', '(7.447) cos 52.0°') + ' = <b>1.003 s</b>. Keep 4 significant figures in the working.' },
    { cap: 'The horizontal component never changes: vx = u cos θ = 4.585 m/s', pt: '<b>Horizontal component.</b> v<sub>x</sub> = u cos θ = (7.447) cos 52.0° = <b>4.585 m s<sup>−1</sup></b>, the same all the way.' },
    { cap: 'Vertical component: vy = u sin θ − gt = −3.974 m/s. The minus sign means downwards', pt: '<b>Vertical component.</b> v<sub>y</sub> = u sin θ − gt = 5.868 − (9.81)(1.003) = <b>−3.974 m s<sup>−1</sup></b>. Negative means downwards: the ball has passed its highest point and drops into the hoop.' },
    { cap: 'Combine the two components with Pythagoras: v = 6.07 m/s', pt: '<b>Magnitude.</b> v = √(4.585<sup>2</sup> + 3.974<sup>2</sup>) = √36.81 = <b>6.07 m s<sup>−1</sup></b>.' },
    { cap: 'Direction: α = 40.9° below the horizontal', pt: '<b>Direction.</b> tan α = ' + FRAC('3.974', '4.585') + ', so α = <b>40.9° below the horizontal</b>. Always say "below the horizontal", or the mark is lost.', col: C.green },
    { cap: 'Check with energy: v² = u² − 2gy gives the same 6.07 m/s', pt: '<b>Check.</b> Energy is conserved: ½mv<sup>2</sup> = ½mu<sup>2</sup> − mgy, so v<sup>2</sup> = 55.46 − 2(9.81)(0.95) = 36.82 and v = 6.07 m s<sup>−1</sup>. ✓' }
  ], S => {
    const { ctx, fs, k, p, lt, L } = S, M = M21(S); court(S, M, { label: false });
    path(S, M, x => bY(x), 0, 4.6, rgba(C.gold, .55), 2);
    const B0 = L.brd, hx = M.X(4.6), hy = M.Y(3.05), sc = M.s * 0.2, vx = 4.585, vy = -3.974;
    if (k === 0) {
      const tc = Math.min((lt * 0.6) % 1.4, B.th_), P = bPos(tc); ball(S, M, P.x, P.y);
      T(ctx, `t = ${tc.toFixed(2)} s`, M.X(2.3), M.Y(0.6), { size: fs * 1.3, c: C.gold, w: 800, f: DISP, a: 'center' });
      board(S, B0.x, B0.y, B0.w, [{ e: ['t = ', { f: [['x'], ['u cos θ']] }, ' = ', { f: [['4.60'], ['(7.447) cos 52.0°']] }], s: 0.95 }, { e: ['t = 1.003 s'], c: C.gold, w: 800, s: 1.2 }]);
      return;
    }
    ball(S, M, 4.6, 3.05);
    const ga = k >= 1 ? 1 : 0, gb = k >= 2 ? (k === 2 ? ease(seg(p, 0, 0.5)) : 1) : 0;
    arrow(ctx, hx, hy, hx + vx * sc, hy, C.gold, 3.5, 12); T(ctx, 'vₓ = 4.585', hx + vx * sc * 0.5, hy - fs * 0.6, { size: fs * 0.85, c: C.gold, w: 700, a: 'center' });
    if (gb) { ctx.save(); ctx.globalAlpha = gb; arrow(ctx, hx, hy, hx, hy - vy * sc, C.cyan, 3.5, 12); T(ctx, 'v_y = 3.974', hx - fs * 0.5, hy - vy * sc * 0.6, { size: fs * 0.85, c: C.cyan, w: 700, a: 'right' }); ctx.restore(); }
    if (k === 2) { const top = bPos(B.u * Math.sin(B.th) / B.g); dot(ctx, M.X(top.x), M.Y(top.y), 5, C.cyan); T(ctx, 'highest point: v_y = 0', M.X(top.x), M.Y(top.y) - fs * 0.9, { size: fs * 0.8, c: C.cyan, a: 'center' }); }
    if (k >= 3) {
      const g = k === 3 ? ease(seg(p, 0, 0.5)) : 1; ctx.save(); ctx.globalAlpha = g;
      line(ctx, hx + vx * sc, hy, hx + vx * sc, hy - vy * sc, rgba(C.cyan, .5), 1.5, [4, 4]);
      arrow(ctx, hx, hy, hx + vx * sc, hy - vy * sc, C.green, 4, 13); T(ctx, 'v = 6.07 m/s', hx + vx * sc + 8, hy - vy * sc + fs * 0.4, { size: fs * 0.95, c: C.green, w: 800 }); ctx.restore();
    }
    if (k >= 4) { arc(ctx, hx, hy, sc * 1.6, 0, Math.atan2(-vy, vx), C.green, 2.5); T(ctx, 'α = 40.9°', hx + sc * 1.75, hy + fs * 1.1, { size: fs * 0.95, c: C.green, w: 800 }); }
    const lines = {
      1: [{ e: ['v', '_x', ' = u cos θ'] }, { e: ['v', '_x', ' = (7.447) cos 52.0°'], s: 0.92 }, { e: ['v', '_x', ' = 4.585 m s', '^−1'], c: C.gold, w: 800 }],
      2: [{ e: ['v', '_y', ' = u sin θ − g t'] }, { e: ['= (7.447) sin 52.0° − (9.81)(1.003)'], s: 0.85 }, { e: ['v', '_y', ' = −3.974 m s', '^−1'], c: C.cyan, w: 800 }, { e: ['(minus: downwards)'], s: 0.8, c: C.muted }],
      3: [{ e: ['v = ', { sq: ['v', '_x', '^2', ' + v', '_y', '^2'] }] }, { e: ['v = ', { sq: ['4.585', '^2', ' + 3.974', '^2'] }], s: 0.95 }, { e: ['v = 6.07 m s', '^−1'], c: C.green, w: 800, s: 1.2 }],
      4: [{ e: ['tan α = ', { f: [['3.974'], ['4.585']] }] }, { e: ['α = 40.9°'], c: C.green, w: 800, s: 1.2 }, { e: ['below the horizontal'], c: C.green, w: 800 }],
      5: [{ e: ['v', '^2', ' = u', '^2', ' − 2 g y'] }, { e: ['= 55.46 − 2(9.81)(0.95)'], s: 0.95 }, { e: ['v = 6.07 m s', '^−1', '  ✓'], c: C.green, w: 800 }]
    };
    board(S, B0.x, B0.y, B0.w, lines[k]);
  });

  // air resistance: integrate with drag a = −k|v|v
  function dragPath(u, kd) {
    const pts = []; let x = 0, y = B.y0, vx = u * Math.cos(B.th), vy = u * Math.sin(B.th); const h = 0.004;
    for (let i = 0; i < 2000 && y > 0 && x < 5.6; i++) { const v = Math.hypot(vx, vy); vx += -kd * v * vx * h; vy += (-B.g - kd * v * vy) * h; x += vx * h; y += vy * h; if (i % 5 === 0) pts.push([x, y]); }
    return pts;
  }
  function yAt(pts, X) { for (let i = 1; i < pts.length; i++) if (pts[i][0] >= X) { const a = pts[i - 1], b = pts[i], f = (X - a[0]) / (b[0] - a[0]); return a[1] + f * (b[1] - a[1]); } return -1; }
  add('sb21c', 21, '(c)', { ch: 2, title: 'Free throw with air resistance', sub: 'Same angle: faster or slower?', eq: 'Air resistance acts against the motion', eqn: 'It reduces both components of the velocity' }, [
    { cap: 'No air resistance: u = 7.45 m/s at 52.0° goes through the hoop', pt: '<b>Without air resistance</b>, the throw from part (a) goes through the hoop.' },
    { cap: 'With air resistance at the same speed, the ball slows down and falls short', pt: '<b>With air resistance</b>, a force acts against the motion of the ball. It reduces the velocity, so at the same speed the ball <b>falls short</b> of the hoop.', col: C.red },
    { cap: 'Answer: throw faster, because air resistance reduces the velocity of the ball', pt: '<b>Answer: faster</b>, because air resistance reduces the velocity of the ball, so the ball needs a larger speed at the same angle to reach the hoop. "Faster" without the reason gets no mark.', col: C.green }
  ], S => {
    const { ctx, fs, k, lt, L } = S, M = M21(S), st = S.st; court(S, M);
    const trace = (pts, col, dash, n) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; if (dash) ctx.setLineDash(dash); ctx.beginPath(); pts.slice(0, n).forEach((q, i) => i ? ctx.lineTo(M.X(q[0]), M.Y(q[1])) : ctx.moveTo(M.X(q[0]), M.Y(q[1]))); ctx.stroke(); ctx.restore(); };
    const run = (pts, col) => { const n = Math.min(pts.length, Math.floor(((lt * 0.75) % 1.6) / 1.2 * pts.length) + 1); trace(pts, col, null, n); const q = pts[Math.min(n, pts.length) - 1]; ball(S, M, q[0], q[1]); };
    if (k === 0) run(st.p0, C.gold);
    if (k === 1) { trace(st.p0, rgba(C.gold, .45), [6, 5]); run(st.p1, C.red); T(ctx, 'falls short', M.X(3.6), M.Y(1.3), { size: fs, c: C.red, w: 800, a: 'center' }); }
    if (k === 2) { trace(st.p0, rgba(C.gold, .35), [6, 5]); trace(st.p1, rgba(C.red, .55), [6, 5]); run(st.p2, C.green); }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      { e: ['No air resistance:'], s: 0.8, c: C.muted }, { e: ['u = 7.45 m s', '^−1', ' → scores'], c: C.gold, w: 800 },
      k >= 1 ? { e: ['With air resistance:'], s: 0.8, c: C.muted } : null,
      k >= 1 ? { e: ['u = 7.45 m s', '^−1', ' → falls short'], c: C.red, w: 800 } : null,
      k >= 2 ? { e: [`u = ${st.u2.toFixed(2)} m s`, '^−1', ' → scores'], c: C.green, w: 800 } : null,
      k >= 2 ? { e: ['So: throw FASTER'], c: C.green, w: 800, s: 1.2 } : null]);
  }, {
    init() { const kd = 0.035; this.p0 = dragPath(B.u, 0); this.p1 = dragPath(B.u, kd); let a = B.u, b = 10; for (let i = 0; i < 40; i++) { const m = (a + b) / 2; yAt(dragPath(m, kd), 4.6) < 3.05 ? a = m : b = m; } this.u2 = (a + b) / 2; this.p2 = dragPath(this.u2, kd); }
  });

  /* =====================================================================
     Question 22 · car tyre
     ===================================================================== */
  function Gas(n, seed) {
    let s = seed || 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    this.m = Array.from({ length: n }, () => { const a = r() * TAU, d = 0.5 + r() * 0.42, b = r() * TAU; return { x: d * Math.cos(a), y: d * Math.sin(a), vx: Math.cos(b), vy: Math.sin(b), out: 0 }; });
  }
  Gas.prototype.step = function (dt, sp, rin) {
    this.m.forEach(m => {
      if (m.out) { m.x += m.vx * dt * 0.8; m.y += m.vy * dt * 0.8; return; }
      m.x += m.vx * sp * dt; m.y += m.vy * sp * dt; const r = Math.hypot(m.x, m.y);
      if (r > 0.97) { const nx = m.x / r, ny = m.y / r, d = m.vx * nx + m.vy * ny; if (d > 0) { m.vx -= 2 * d * nx; m.vy -= 2 * d * ny; } }
      if (r < rin) { const nx = m.x / r, ny = m.y / r, d = m.vx * nx + m.vy * ny; if (d < 0) { m.vx -= 2 * d * nx; m.vy -= 2 * d * ny; } }
    });
  };
  function tyre(S, cx, cy, Rr, gas, Tk, sc = 1) {
    const { ctx } = S, Ro = Rr * sc;
    ctx.fillStyle = '#2B2B2B'; ctx.beginPath(); ctx.arc(cx, cy, Ro * 1.13, 0, TAU); ctx.fill();
    for (let a = 0; a < TAU; a += TAU / 28) line(ctx, cx + Ro * 1.07 * Math.cos(a), cy + Ro * 1.07 * Math.sin(a), cx + Ro * 1.13 * Math.cos(a), cy + Ro * 1.13 * Math.sin(a), '#555', 2);
    ctx.fillStyle = 'rgba(183,162,240,.10)'; ctx.beginPath(); ctx.arc(cx, cy, Ro, 0, TAU); ctx.fill();
    const col = heat((Tk - 290) / 60);
    gas.m.forEach(m => dot(ctx, cx + m.x * Ro, cy + m.y * Ro, Math.max(2.5, Rr * 0.03), m.out ? C.gold : col));
    ctx.fillStyle = '#9AA3A0'; ctx.beginPath(); ctx.arc(cx, cy, Rr * 0.42, 0, TAU); ctx.fill(); ctx.fillStyle = '#6C7472'; ctx.beginPath(); ctx.arc(cx, cy, Rr * 0.14, 0, TAU); ctx.fill();
  }
  function gauge(S, cx, cy, r, val, lo, hi, label) {
    const { ctx, fs } = S; ctx.fillStyle = '#F3F5EC'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill();
    const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    for (let i = 0; i <= 8; i++) { const a = a0 + (a1 - a0) * i / 8; line(ctx, cx + r * 0.78 * Math.cos(a), cy + r * 0.78 * Math.sin(a), cx + r * 0.92 * Math.cos(a), cy + r * 0.92 * Math.sin(a), '#333', 1.5); }
    const f = clamp((val - lo) / (hi - lo), 0, 1), a = a0 + (a1 - a0) * f;
    line(ctx, cx, cy, cx + r * 0.75 * Math.cos(a), cy + r * 0.75 * Math.sin(a), '#C62828', 3); dot(ctx, cx, cy, 4, '#333');
    T(ctx, label, cx, cy + r * 0.55, { size: Math.max(9, r * 0.22), c: '#1D2B1F', w: 800, a: 'center' });
    T(ctx, '× 10⁵ Pa', cx, cy + r + fs * 0.95, { size: fs * 0.75, c: C.muted, a: 'center' });
  }

  add('sb22a', 22, '(a)', { ch: 10, title: 'Tyre: mean kinetic energy = (3/2)kT', sub: 'Join the kinetic theory equation and the ideal gas equation',
    eq: '½m⟨c<sup>2</sup>⟩ = <sup>3</sup>⁄<sub>2</sub> kT', eqn: 'Mean translational kinetic energy of one molecule' }, [
    { cap: 'Pressure comes from molecules hitting the walls: p = ⅓ρ⟨c²⟩', pt: '<b>Start.</b> Pressure is caused by the molecules hitting the walls: p = ⅓ρ⟨c<sup>2</sup>⟩.' },
    { cap: 'N molecules of mass m in volume V: density ρ = Nm / V', pt: '<b>Write the density in molecules.</b> N molecules, each of mass m, in volume V: ρ = ' + FRAC('Nm', 'V') + ', so <b>pV = ⅓Nm⟨c<sup>2</sup>⟩</b>.' },
    { cap: 'Ideal gas equation for N molecules: pV = NkT', pt: '<b>Ideal gas equation in molecules.</b> pV = NkT, where k = R / N<sub>A</sub> is the Boltzmann constant.' },
    { cap: 'Equate the two: ½m⟨c²⟩ = (3/2)kT', pt: '<b>Equate.</b> ⅓Nm⟨c<sup>2</sup>⟩ = NkT, so m⟨c<sup>2</sup>⟩ = 3kT and <b>½m⟨c<sup>2</sup>⟩ = <sup>3</sup>⁄<sub>2</sub>kT</b> (shown).', col: C.green },
    { cap: 'Meaning: a hotter gas has faster molecules. KE depends only on T', pt: '<b>Meaning.</b> The mean kinetic energy depends only on the absolute temperature T. When the tyre heats up, the molecules move faster.' }
  ], S => {
    const { ctx, fs, k, dt, L, st } = S, F = L.fig, bx = F.x + F.w * 0.1, by = F.y + F.h * 0.1, bw = F.w * 0.62, bh = F.h * 0.78;
    const Tk = k === 4 ? 300 + 60 * (0.5 + 0.5 * Math.sin(st.t * 1.4)) : 300, sp = 0.5 * Math.sqrt(Tk / 300);
    ctx.strokeStyle = '#C9D1DC'; ctx.lineWidth = 3; ctx.strokeRect(bx, by, bw, bh);
    st.box.forEach(m => { m.x += m.vx * sp * dt; m.y += m.vy * sp * dt * 1.3; if (m.x < 0 || m.x > 1) { m.vx = -m.vx; m.x = clamp(m.x, 0, 1); if (m.x === 1) m.hit = 0.3; } if (m.y < 0 || m.y > 1) { m.vy = -m.vy; m.y = clamp(m.y, 0, 1); } m.hit = Math.max(0, (m.hit || 0) - dt);
      dot(ctx, bx + 6 + m.x * (bw - 12), by + 6 + m.y * (bh - 12), Math.max(3, fs * 0.28), m.hit > 0 && k === 0 ? C.gold : heat((Tk - 290) / 70)); if (m.hit > 0 && k === 0) arrow(ctx, bx + bw + 4, by + 6 + m.y * (bh - 12), bx + bw + fs * 1.6, by + 6 + m.y * (bh - 12), C.gold, 2, 7); });
    if (k === 0) T(ctx, 'each hit pushes on the wall → pressure', bx + bw / 2, by + bh + fs * 1.3, { size: fs * 0.85, c: C.gold, a: 'center', w: 700 });
    if (k === 1) { T(ctx, `N molecules, each of mass m`, bx + bw / 2, by + bh + fs * 1.3, { size: fs * 0.85, c: C.gold, a: 'center', w: 700 }); T(ctx, 'volume V', bx + bw / 2, by - fs * 0.5, { size: fs * 0.85, c: C.cyan, a: 'center', w: 700 }); }
    if (k === 4) { const tx = bx + bw + F.w * 0.12, tt = by, tb = by + bh, f = (Tk - 280) / 100; rrect(ctx, tx - 7, tt, 14, tb - tt, 7); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill(); ctx.fillStyle = heat((Tk - 290) / 70); ctx.fillRect(tx - 3, tb - (tb - tt) * f, 6, (tb - tt) * f); T(ctx, `${Tk.toFixed(0)} K`, tx, tt - fs * 0.5, { size: fs, c: heat((Tk - 290) / 70), a: 'center', w: 800 }); }
    const B0 = L.brd, rows = [
      { e: ['p = ⅓ ρ ⟨c', '^2', '⟩'], w: 800, c: k === 0 ? C.gold : C.ink },
      k >= 1 ? { e: ['ρ = ', { f: [['N m'], ['V']] }, '  ⇒  pV = ⅓ N m ⟨c', '^2', '⟩'], c: k === 1 ? C.gold : C.ink } : null,
      k >= 2 ? { e: ['pV = N k T'], c: k === 2 ? C.gold : C.ink, w: 800 } : null,
      k >= 3 ? { e: ['⅓ N m ⟨c', '^2', '⟩ = N k T'] } : null,
      k >= 3 ? { e: ['½ m ⟨c', '^2', '⟩ = ', { f: [['3'], ['2']] }, ' k T'], c: C.green, w: 800, s: 1.2 } : null];
    board(S, B0.x, B0.y, B0.w, rows);
  }, { init() { this.box = new Gas(26, 3).m.map(m => ({ x: (m.x + 1) / 2, y: (m.y + 1) / 2, vx: m.vx, vy: m.vy })); } });

  add('sb22b', 22, '(b)(c)', { ch: 10, title: 'Tyre after the drive: pressure and r.m.s. speed', sub: 'Same amount of air, new temperature and a slightly bigger volume',
    eq: FRAC('p<sub>1</sub>V<sub>1</sub>', 'T<sub>1</sub>') + ' = ' + FRAC('p<sub>2</sub>V<sub>2</sub>', 'T<sub>2</sub>'), eqn: 'Fixed amount of ideal gas. T must be in kelvin.' }, [
    { cap: 'Change both temperatures to kelvin: 27 °C = 300 K, 57 °C = 330 K', pt: '<b>Kelvin first.</b> T<sub>1</sub> = 27 + 273 = 300 K and T<sub>2</sub> = 57 + 273 = 330 K. Using °C gives 0 marks.' },
    { cap: 'No air goes in or out, so pV/T stays the same', pt: '<b>Same amount of air</b> (no leak), so ' + FRAC('p<sub>1</sub>V<sub>1</sub>', 'T<sub>1</sub>') + ' = ' + FRAC('p<sub>2</sub>V<sub>2</sub>', 'T<sub>2</sub>') + '.' },
    { cap: 'The tyre expands by 2.0%: V₂ = 1.02 V₁', pt: '<b>New volume.</b> The volume increases by 2.0%, so V<sub>2</sub> = 1.02V<sub>1</sub> and ' + FRAC('V<sub>1</sub>', 'V<sub>2</sub>') + ' = ' + FRAC('1', '1.02') + '.' },
    { cap: 'p₂ = 3.30 × 10⁵ × (330/300) × (1/1.02) = 3.56 × 10⁵ Pa', pt: '<b>Calculate.</b> p<sub>2</sub> = p<sub>1</sub>(' + FRAC('T<sub>2</sub>', 'T<sub>1</sub>') + ')(' + FRAC('V<sub>1</sub>', 'V<sub>2</sub>') + ') = (3.30 × 10<sup>5</sup>)(' + FRAC('330', '300') + ')(' + FRAC('1', '1.02') + ') = <b>3.56 × 10<sup>5</sup> Pa</b>. Heating raises p; the small expansion lowers it slightly.', col: C.green },
    { cap: '(c) Hotter molecules move faster: c_rms = √(3RT/M) = 533 m/s', pt: '<b>(c) r.m.s. speed.</b> c<sub>rms</sub> = √(3RT/M) = √(' + FRAC('3(8.31)(330)', '0.0290') + ') = <b>533 m s<sup>−1</sup></b>. M must be in kg mol<sup>−1</sup> (0.0290, not 29).', col: C.green }
  ], S => {
    const { ctx, fs, k, p, dt, L, st } = S, F = L.fig, cx = F.x + F.w * 0.36, cy = F.y + F.h * 0.52, Rr = Math.min(F.w * 0.3, F.h * 0.4);
    const after = k >= 1 ? (k === 1 ? ease(seg(p, 0.1, 0.7)) : 1) : 0, Tk = 300 + 30 * after, sc = 1 + (k >= 2 ? 0.02 * (k === 2 ? ease(seg(p, 0, 0.6)) : 1) * 2.5 : 0);
    st.gas.step(dt, 0.55 * Math.sqrt(Tk / 300), 0.46); tyre(S, cx, cy, Rr, st.gas, Tk, sc);
    const pv = k >= 3 ? 3.559 : k === 2 ? 3.63 - 0.071 * ease(seg(p, 0.1, 0.6)) : 3.30 + 0.33 * after;
    gauge(S, F.x + F.w * 0.84, F.y + F.h * 0.3, Math.min(F.w * 0.13, F.h * 0.2), pv, 3.0, 3.8, pv.toFixed(2));
    T(ctx, `${Tk.toFixed(0)} K (${(Tk - 273).toFixed(0)} °C)`, cx, F.y + fs * 0.3, { size: fs * 1.05, c: heat((Tk - 290) / 60), a: 'center', w: 800 });
    if (k === 2) T(ctx, 'volume +2.0% (exaggerated)', cx, cy + Rr * 1.3 + fs * 0.8, { size: fs * 0.8, c: C.cyan, a: 'center', w: 700 });
    if (k === 4) T(ctx, 'c_rms = 533 m/s', cx, cy + Rr * 1.3 + fs * 0.8, { size: fs * 0.95, c: C.green, a: 'center', w: 800 });
    const B0 = L.brd, rows = [
      { e: ['T', '_1', ' = 27 + 273 = 300 K'], s: 0.92 }, { e: ['T', '_2', ' = 57 + 273 = 330 K'], s: 0.92 },
      k >= 1 ? { e: [{ f: [['p', '_1', 'V', '_1'], ['T', '_1']] }, ' = ', { f: [['p', '_2', 'V', '_2'], ['T', '_2']] }], c: k === 1 ? C.gold : C.ink } : null,
      k >= 2 && k < 4 ? { e: ['V', '_2', ' = 1.02 V', '_1'], c: k === 2 ? C.gold : C.ink } : null,
      k === 3 ? { e: ['p', '_2', ' = (3.30×10', '^5', ')', { f: [['330'], ['300']] }, { f: [['1'], ['1.02']] }], s: 0.92 } : null,
      k >= 3 ? { e: ['p', '_2', ' = 3.56 × 10', '^5', ' Pa'], c: C.green, w: 800, s: 1.1 } : null,
      k === 4 ? { e: ['c', '_rms', ' = ', { sq: ['3RT/M'] }, ' = ', { sq: ['3(8.31)(330)/0.0290'] }], s: 0.82 } : null,
      k === 4 ? { e: ['c', '_rms', ' = 533 m s', '^−1'], c: C.green, w: 800, s: 1.1 } : null];
    board(S, B0.x, B0.y, B0.w, rows);
  }, { init() { this.gas = new Gas(40, 11); } });

  add('sb22d', 22, '(d)', { ch: 10, title: 'Letting air out at the rest stop', sub: 'Same V and T, so the pressure falls only because n falls',
    eq: 'pV = nRT', eqn: 'V and T constant, so n ∝ p' }, [
    { cap: 'V and T do not change, so the pressure drops only because air (moles) leaves', pt: '<b>Idea.</b> V and T stay the same. The pressure falls from 3.56 × 10<sup>5</sup> Pa to 3.30 × 10<sup>5</sup> Pa only because some air leaves, so there are fewer moles: n ∝ p.' },
    { cap: 'Before: n₁ = p₂V₂ / RT₂ = 3.309 mol', pt: '<b>Moles before.</b> V<sub>2</sub> = 1.02 × 2.50 × 10<sup>−2</sup> = 2.55 × 10<sup>−2</sup> m<sup>3</sup>. n<sub>1</sub> = ' + FRAC('p<sub>2</sub>V<sub>2</sub>', 'RT<sub>2</sub>') + ' = ' + FRAC('(3.559 × 10<sup>5</sup>)(2.55 × 10<sup>−2</sup>)', '(8.31)(330)') + ' = <b>3.309 mol</b>.' },
    { cap: 'After: n₂ = p₁V₂ / RT₂ = 3.069 mol', pt: '<b>Moles after.</b> n<sub>2</sub> = ' + FRAC('(3.30 × 10<sup>5</sup>)(2.55 × 10<sup>−2</sup>)', '(8.31)(330)') + ' = <b>3.069 mol</b>, so Δn = 3.309 − 3.069 = <b>0.241 mol</b>.' },
    { cap: 'Mass released = Δn × M = 0.241 × 0.0290 = 6.98 × 10⁻³ kg (about 7 g)', pt: '<b>Mass.</b> Δm = Δn × M = (0.241)(0.0290) = <b>6.98 × 10<sup>−3</sup> kg</b>, about 7 g of air.', col: C.green }
  ], S => {
    const { ctx, fs, k, p, dt, L, st } = S, F = L.fig, cx = F.x + F.w * 0.36, cy = F.y + F.h * 0.55, Rr = Math.min(F.w * 0.3, F.h * 0.38);
    const rel = k === 0 ? ease(seg(p, 0.2, 0.9)) : k === 1 ? 0 : 1, nOut = Math.round(rel * st.gas.m.length * 0.073);
    st.gas.m.forEach((m, i) => { if (i < nOut && !m.out) { m.out = 1; m.x = 0; m.y = -1.0; m.vx = (i % 2 ? 0.25 : -0.25); m.vy = -1; } });
    st.gas.step(dt, 0.58, 0.46); tyre(S, cx, cy, Rr, st.gas, 330, 1.05);
    line(ctx, cx, cy - Rr * 1.05, cx, cy - Rr * 1.3, '#C9D1DC', 6); T(ctx, 'valve', cx + fs * 0.5, cy - Rr * 1.22, { size: fs * 0.8, c: C.muted });
    const pv = 3.559 - 0.259 * rel; gauge(S, F.x + F.w * 0.84, F.y + F.h * 0.3, Math.min(F.w * 0.13, F.h * 0.2), pv, 3.0, 3.8, pv.toFixed(2));
    const n = 3.309 - 0.240 * rel; T(ctx, `n = ${n.toFixed(3)} mol`, F.x + F.w * 0.84, F.y + F.h * 0.72, { size: fs * 1.1, c: C.gold, a: 'center', w: 800 });
    T(ctx, '330 K · V = 2.55 × 10⁻² m³ (constant)', cx, F.y + F.h + fs * 0.1, { size: fs * 0.8, c: C.muted, a: 'center' });
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      k === 0 ? { e: ['V, T constant  ⇒  n ∝ p'], c: C.gold, w: 800 } : null,
      k >= 1 ? { e: ['n', '_1', ' = ', { f: [['p', '_2', 'V', '_2'], ['RT', '_2']] }, ' = ', { f: [['(3.559×10', '^5', ')(2.55×10', '^−2', ')'], ['(8.31)(330)']] }], s: 0.85 } : null,
      k >= 1 ? { e: ['n', '_1', ' = 3.309 mol'], c: k === 1 ? C.gold : C.ink, w: 800 } : null,
      k >= 2 ? { e: ['n', '_2', ' = ', { f: [['(3.30×10', '^5', ')(2.55×10', '^−2', ')'], ['(8.31)(330)']] }, ' = 3.069 mol'], s: 0.85 } : null,
      k >= 2 ? { e: ['Δn = 0.241 mol'], c: C.gold, w: 800 } : null,
      k >= 3 ? { e: ['Δm = Δn M = (0.241)(0.0290)'], s: 0.9 } : null,
      k >= 3 ? { e: ['Δm = 6.98 × 10', '^−3', ' kg'], c: C.green, w: 800, s: 1.15 } : null]);
  }, { init() { this.gas = new Gas(55, 5); } });

  /* =====================================================================
     Question 23 · geostationary TV satellite
     ===================================================================== */
  const GM = 6.67e-11 * 5.97e24, RE = 6.37e6, RG = 4.2226e7;
  function earth(ctx, x, y, r, rot) {
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, '#5FA8D3'); g.addColorStop(1, '#245E86');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(120,190,110,.75)'; for (let i = 0; i < 3; i++) { const a = rot + i * 2.1; ctx.beginPath(); ctx.ellipse(x + r * 0.5 * Math.cos(a), y + r * 0.5 * Math.sin(a), r * 0.28, r * 0.18, a, 0, TAU); ctx.fill(); }
  }
  function sat(ctx, x, y, s, a = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = '#9AA3A0'; ctx.fillRect(-s * 0.35, -s * 0.35, s * 0.7, s * 0.7); ctx.fillStyle = '#3A5F9E'; ctx.fillRect(-s * 0.2, -s * 1.3, s * 0.4, s * 0.9); ctx.fillRect(-s * 0.2, s * 0.4, s * 0.4, s * 0.9); ctx.restore(); }

  add('sb23ab', 23, '(a)(b)', { ch: 6, title: 'Geostationary orbit: why the dish never moves', sub: 'Gravitational potential, and the two conditions',
    eq: 'T<sub>orbit</sub> = 24 h, equatorial plane', eqn: 'The satellite turns together with the Earth' }, [
    { cap: '(a) Gravitational potential: work done per unit mass to bring a mass from infinity', pt: '<b>(a) Definition.</b> Gravitational potential at a point is the <b>work done per unit mass</b> in bringing a mass <b>from infinity</b> to that point. It is negative, because gravity attracts.' },
    { cap: 'Condition 1: period = 24 h, moving west to east like the Earth', pt: '<b>Condition 1.</b> The period of the orbit equals the period of the Earth\'s rotation, <b>24 h</b>, and the satellite moves in the <b>same direction</b> as the Earth rotates (west to east).' },
    { cap: 'Condition 2: the orbit is in the equatorial plane, directly above the equator', pt: '<b>Condition 2.</b> The orbit is in the <b>equatorial plane</b>. A tilted orbit would make the satellite drift north and south in the sky.' },
    { cap: 'So the satellite stays above the same point: the dish keeps pointing at it', pt: '<b>Why the dish is fixed.</b> The satellite turns together with the Earth, so it <b>stays above the same point</b> on the Earth. Its position relative to the dish does not change. A lower satellite moves faster and crosses the sky.', col: C.green }
  ], S => {
    const { ctx, fs, k, p, st, L } = S, F = L.fig, cx = F.x + F.w * 0.42, cy = F.y + F.h * 0.5, Rm = Math.min(F.w * 0.4, F.h * 0.46), re = Rm * 0.3, rg = Rm * 0.92;
    const rot = st.t * TAU / 9;
    if (k === 0) {
      earth(ctx, cx - Rm * 0.4, cy, re, 0);
      const P = { x: cx + Rm * 0.25, y: cy }, far = F.x + F.w * 0.98, mx = far - (far - P.x) * ease(seg(p, 0.1, 0.8));
      dot(ctx, P.x, P.y, 5, C.gold); T(ctx, 'P', P.x - fs * 0.2, P.y - fs * 0.7, { size: fs, c: C.gold, w: 800, a: 'center' });
      T(ctx, '∞', far - fs * 0.3, cy - fs * 0.8, { size: fs * 1.5, c: C.muted, w: 800, a: 'center' });
      line(ctx, P.x, cy, far, cy, rgba(C.muted, .4), 1.5, [5, 5]); dot(ctx, mx, cy, 7, C.cyan); T(ctx, '1 kg', mx, cy + fs * 1.4, { size: fs * 0.8, c: C.cyan, a: 'center', w: 700 });
      T(ctx, 'work done per unit mass', (P.x + far) / 2, cy - fs * 1.8, { size: fs * 0.9, c: C.ink, a: 'center', w: 700 });
    } else if (k === 1 || k === 3) {
      ctx.save(); ctx.strokeStyle = rgba(C.ink, .3); ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(cx, cy, rg, 0, TAU); ctx.stroke(); ctx.restore();
      earth(ctx, cx, cy, re, rot); const gx = cx + re * Math.cos(rot), gy = cy + re * Math.sin(rot), sx = cx + rg * Math.cos(rot), sy = cy + rg * Math.sin(rot);
      line(ctx, gx, gy, sx, sy, C.xr, 2); dot(ctx, gx, gy, 5, C.gold); sat(ctx, sx, sy, fs * 0.7, rot);
      arc(ctx, cx, cy, re * 1.35, rot - 0.9, rot - 0.2, C.gold, 2.5);
      T(ctx, k === 1 ? 'Earth: 24 h' : 'dish', gx + (gx - cx) * 0.25, gy + (gy - cy) * 0.25 + fs * 0.3, { size: fs * 0.8, c: C.gold, a: 'center', w: 700 });
      if (k === 3) { const rl = re * 1.9, al = rot * (Math.pow(rg / rl, 1.5)), lx = cx + rl * Math.cos(al), ly = cy + rl * Math.sin(al); ctx.save(); ctx.strokeStyle = rgba(C.red, .45); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(cx, cy, rl, 0, TAU); ctx.stroke(); ctx.restore(); dot(ctx, lx, ly, 5, C.red); T(ctx, 'lower satellite: faster', lx, ly - fs * 0.8, { size: fs * 0.75, c: C.red, a: 'center' }); }
      T(ctx, 'view from above the North Pole · west → east', cx, F.y + F.h + fs * 0.2, { size: fs * 0.75, c: C.muted, a: 'center' });
    } else {
      const ex = cx, ey = cy; earth(ctx, ex, ey, re, 0); line(ctx, ex - Rm, ey, ex + Rm, ey, rgba(C.gold, .7), 1.5, [6, 4]); T(ctx, 'equatorial plane', ex - Rm, ey - fs * 0.5, { size: fs * 0.8, c: C.gold });
      const ph = st.t * 1.6, sx = ex + rg * Math.cos(ph);
      sat(ctx, sx, ey, fs * 0.6); T(ctx, '✓ equatorial: stays over the equator', ex, ey + Rm * 0.75, { size: fs * 0.85, c: C.green, a: 'center', w: 700 });
      const ti = 30 * d2r, ix = ex + rg * Math.cos(ph) * Math.cos(ti), iy = ey - rg * Math.cos(ph) * Math.sin(ti);
      line(ctx, ex - rg * Math.cos(ti), ey + rg * Math.sin(ti), ex + rg * Math.cos(ti), ey - rg * Math.sin(ti), rgba(C.red, .5), 1.5, [4, 4]); dot(ctx, ix, iy, 5, C.red);
      T(ctx, '✗ tilted orbit: drifts north–south', ex, ey - Rm * 0.7, { size: fs * 0.85, c: C.red, a: 'center', w: 700 });
    }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      k === 0 ? { e: ['V = ', { f: [['work done'], ['mass']] }, ' (from ∞)'], c: C.gold, w: 800 } : null,
      k === 0 ? { e: ['V = −', { f: [['G M'], ['r']] }, '  (always negative)'], s: 0.9 } : null,
      k >= 1 ? { e: ['1. T = 24 h, west → east'], c: k === 1 ? C.gold : C.ink, w: 800 } : null,
      k >= 2 ? { e: ['2. equatorial plane'], c: k === 2 ? C.gold : C.ink, w: 800 } : null,
      k >= 3 ? { e: ['⇒ stays above the same point'], c: C.green, w: 800 } : null,
      k >= 3 ? { e: ['⇒ dish does not need turning'], c: C.green, w: 800 } : null]);
  });

  add('sb23c', 23, '(c)', { ch: 6, title: 'Radius and height of the geostationary orbit', sub: 'Gravity provides the centripetal force',
    eq: FRAC('GM<sub>E</sub>m', 'r<sup>2</sup>') + ' = mr' + '(' + FRAC('2π', 'T') + ')<sup>2</sup>', eqn: 'The satellite\'s mass m cancels' }, [
    { cap: 'The only force on the satellite is gravity, towards the centre of the Earth', pt: '<b>The force.</b> The only force on the satellite is the Earth\'s gravitational force, towards the centre. It provides the <b>centripetal force</b>.' },
    { cap: 'Gravitational force = centripetal force, with ω = 2π/T', pt: '<b>Equation.</b> ' + FRAC('GM<sub>E</sub>m', 'r<sup>2</sup>') + ' = mrω<sup>2</sup> = mr(' + FRAC('2π', 'T') + ')<sup>2</sup>.' },
    { cap: 'Rearrange: r³ = GMT² / 4π², so r = (GMT²/4π²)^(1/3)', pt: '<b>Rearrange.</b> m cancels: r<sup>3</sup> = ' + FRAC('GM<sub>E</sub>T<sup>2</sup>', '4π<sup>2</sup>') + ', so r = (' + FRAC('GM<sub>E</sub>T<sup>2</sup>', '4π<sup>2</sup>') + ')<sup>1/3</sup> (shown).' },
    { cap: 'T = 24.0 × 3600 = 86 400 s, so r = 4.22 × 10⁷ m (drawn to scale)', pt: '<b>Numbers.</b> T = 24.0 × 3600 = 86 400 s. r = (' + FRAC('(6.67 × 10<sup>−11</sup>)(5.97 × 10<sup>24</sup>)(86 400)<sup>2</sup>', '4π<sup>2</sup>') + ')<sup>1/3</sup> = <b>4.22 × 10<sup>7</sup> m</b>, about 6.6 times the Earth\'s radius.' },
    { cap: 'Height is from the surface: h = r − R_E = 3.59 × 10⁷ m', pt: '<b>Height.</b> r is measured from the centre of the Earth, so h = r − R<sub>E</sub> = 4.22 × 10<sup>7</sup> − 6.37 × 10<sup>6</sup> = <b>3.59 × 10<sup>7</sup> m</b>.', col: C.green }
  ], S => {
    const { ctx, fs, k, p, st, L } = S, F = L.fig, cx = F.x + F.w * 0.45, cy = F.y + F.h * 0.5, rg = Math.min(F.w * 0.42, F.h * 0.46), re = rg * RE / RG, a = st.t * 0.5;
    ctx.save(); ctx.strokeStyle = rgba(C.ink, .3); ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.arc(cx, cy, rg, 0, TAU); ctx.stroke(); ctx.restore();
    earth(ctx, cx, cy, re, a); const sx = cx + rg * Math.cos(-a), sy = cy + rg * Math.sin(-a); sat(ctx, sx, sy, fs * 0.6, -a);
    if (k <= 2) { arrow(ctx, sx, sy, sx + (cx - sx) * 0.3, sy + (cy - sy) * 0.3, C.gold, 3.5, 12); T(ctx, 'F = GMm/r²', sx + (cx - sx) * 0.32, sy + (cy - sy) * 0.32 - fs * 0.6, { size: fs * 0.85, c: C.gold, w: 700, a: 'center' }); }
    if (k >= 3) { const ang = -0.6, ex = cx + rg * Math.cos(ang), ey = cy + rg * Math.sin(ang); line(ctx, cx, cy, ex, ey, C.cyan, 2.5); T(ctx, 'r = 4.22 × 10⁷ m', (cx + ex) / 2 + fs * 0.4, (cy + ey) / 2 - fs * 0.5, { size: fs * 0.85, c: C.cyan, w: 800 }); }
    if (k >= 4) { const ang = 2.4, x1 = cx + re * Math.cos(ang), y1 = cy + re * Math.sin(ang), x2 = cx + rg * Math.cos(ang), y2 = cy + rg * Math.sin(ang); line(ctx, x1, y1, x2, y2, C.green, 3.5); T(ctx, 'h = 3.59 × 10⁷ m', (x1 + x2) / 2 - fs * 0.4, (y1 + y2) / 2 + fs * 1.3, { size: fs * 0.85, c: C.green, w: 800, a: 'right' }); T(ctx, 'R_E', cx, cy + re + fs * 1.0, { size: fs * 0.75, c: C.muted, a: 'center' }); }
    T(ctx, 'Earth and orbit to scale', cx, F.y + F.h + fs * 0.2, { size: fs * 0.75, c: C.muted, a: 'center' });
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      k >= 1 ? { e: [{ f: [['G M', '_E', ' m'], ['r', '^2']] }, ' = m r ω', '^2', ' = m r', { f: [['4π', '^2'], ['T', '^2']] }], c: k === 1 ? C.gold : C.ink } : { e: ['gravitational force = centripetal force'], c: C.gold, w: 800, s: 0.9 },
      k >= 2 ? { e: ['r', '^3', ' = ', { f: [['G M', '_E', ' T', '^2'], ['4π', '^2']] }], c: k === 2 ? C.gold : C.ink } : null,
      k >= 3 ? { e: ['T = 24.0 × 3600 = 86 400 s'], s: 0.85 } : null,
      k >= 3 ? { e: ['r = 4.22 × 10', '^7', ' m'], c: C.cyan, w: 800 } : null,
      k >= 4 ? { e: ['h = 4.22×10', '^7', ' − 6.37×10', '^6'], s: 0.9 } : null,
      k >= 4 ? { e: ['h = 3.59 × 10', '^7', ' m'], c: C.green, w: 800, s: 1.15 } : null]);
  });

  add('sb23d', 23, '(d)', { ch: 6, title: 'Energy to raise the satellite', sub: 'Use the change in TOTAL energy, not only potential energy',
    eq: 'E = −' + FRAC('GM<sub>E</sub>m', '2r'), eqn: 'Total energy in a circular orbit: KE + PE' }, [
    { cap: 'In orbit: KE = GMm/2r, PE = −GMm/r, so total E = −GMm/2r', pt: '<b>Total energy in orbit.</b> From ' + FRAC('mv<sup>2</sup>', 'r') + ' = ' + FRAC('GM<sub>E</sub>m', 'r<sup>2</sup>') + ', KE = ' + FRAC('GM<sub>E</sub>m', '2r') + '. PE = −' + FRAC('GM<sub>E</sub>m', 'r') + '. So <b>E = −' + FRAC('GM<sub>E</sub>m', '2r') + '</b>.' },
    { cap: 'Parking orbit r₁ = 6.67 × 10⁶ m: E₁ = −1.42 × 10¹¹ J. Geostationary: E₂ = −2.24 × 10¹⁰ J', pt: '<b>The two orbits.</b> r<sub>1</sub> = 6.37 × 10<sup>6</sup> + 3.00 × 10<sup>5</sup> = 6.67 × 10<sup>6</sup> m gives E<sub>1</sub> = −1.42 × 10<sup>11</sup> J. At r<sub>2</sub> = 4.22 × 10<sup>7</sup> m, E<sub>2</sub> = −2.24 × 10<sup>10</sup> J.' },
    { cap: 'Energy needed = E₂ − E₁ = 1.20 × 10¹¹ J', pt: '<b>Energy needed.</b> ΔE = E<sub>2</sub> − E<sub>1</sub> = ' + FRAC('GM<sub>E</sub>m', '2') + '(' + FRAC('1', 'r<sub>1</sub>') + ' − ' + FRAC('1', 'r<sub>2</sub>') + ') = <b>1.20 × 10<sup>11</sup> J</b>.', col: C.green },
    { cap: 'Trap: PE alone rises by 2.39 × 10¹¹ J, but KE falls by 1.20 × 10¹¹ J', pt: '<b>Common mistake.</b> Using only the potential energy gives 2.39 × 10<sup>11</sup> J (maximum 1 mark). The satellite moves <b>more slowly</b> in the higher orbit, so its kinetic energy falls by 1.20 × 10<sup>11</sup> J.', col: C.red }
  ], S => {
    const { ctx, fs, k, p, L } = S, F = L.fig, base = F.y + F.h * 0.38, sc = F.h * 0.55 / 2.842e11, gw = F.w * 0.12;
    const cols = [{ x: F.x + F.w * 0.25, KE: 1.421e11, PE: -2.842e11, E: -1.421e11, lab: 'parking orbit' }, { x: F.x + F.w * 0.68, KE: 2.244e10, PE: -4.489e10, E: -2.244e10, lab: 'geostationary' }];
    line(ctx, F.x, base, F.x + F.w, base, C.muted, 1.5); T(ctx, '0', F.x + 2, base - 4, { size: fs * 0.75, c: C.muted });
    const g = k === 0 ? ease(seg(p, 0, 0.8)) : 1;
    cols.forEach((c, i) => {
      if (k === 0 && i === 1) return;
      const bar = (v, dx, col, lab) => { const hgt = v * sc * g; ctx.fillStyle = col; ctx.fillRect(c.x + dx, base - Math.max(hgt, 0), gw * 0.8, Math.abs(hgt)); T(ctx, lab, c.x + dx + gw * 0.4, v > 0 ? base - hgt - fs * 0.4 : base - hgt + fs * 1.1, { size: fs * 0.75, c: col, a: 'center', w: 800 }); };
      bar(c.KE, -gw * 1.3, C.gold, 'KE'); bar(c.PE, -gw * 0.4, C.red, 'PE'); bar(c.E, gw * 0.5, C.violet, 'E');
      T(ctx, c.lab, c.x, F.y + fs * 0.4, { size: fs * 0.85, c: C.ink, a: 'center', w: 700 });
    });
    if (k >= 2) { const y1 = base - cols[0].E * sc, y2 = base - cols[1].E * sc, xx = cols[1].x + gw * 1.6; line(ctx, cols[0].x + gw * 1.3, y1, xx, y1, rgba(C.violet, .7), 1.5, [4, 4]); arrow(ctx, xx, y1, xx, y2, C.green, 3.5, 12); T(ctx, 'ΔE = 1.20 × 10¹¹ J', xx - fs * 0.4, y1 - fs * 0.6, { size: fs * 0.85, c: C.green, w: 800, a: 'right' }); }
    if (k === 3) { const y1 = base - cols[0].PE * sc, y2 = base - cols[1].PE * sc, xx = cols[1].x - gw * 0.85; line(ctx, cols[0].x, y1, xx, y1, rgba(C.red, .7), 1.5, [4, 4]); arrow(ctx, xx, y1, xx, y2, C.red, 3, 10); T(ctx, 'ΔPE = 2.39 × 10¹¹ J', xx + fs * 0.4, (y1 + y2) / 2 + fs, { size: fs * 0.8, c: C.red, w: 800 }); }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      { e: ['KE = ', { f: [['G M m'], ['2r']] }, ',  PE = −', { f: [['G M m'], ['r']] }], s: 0.9 },
      { e: ['E = −', { f: [['G M m'], ['2r']] }], c: C.violet, w: 800 },
      k >= 2 ? { e: ['ΔE = ', { f: [['G M m'], ['2']] }, '(', { f: [['1'], ['r', '_1']] }, ' − ', { f: [['1'], ['r', '_2']] }, ')'], s: 0.95 } : (k === 1 ? { e: ['r', '_1', ' = 6.67 × 10', '^6', ' m,  r', '_2', ' = 4.22 × 10', '^7', ' m'], s: 0.85, c: C.gold } : null),
      k >= 2 ? { e: ['ΔE = 1.20 × 10', '^11', ' J'], c: C.green, w: 800, s: 1.15 } : null,
      k === 3 ? { e: ['✗ ΔPE only = 2.39 × 10', '^11', ' J'], c: C.red, w: 800, s: 0.9 } : null]);
  });

  add('sb23ef', 23, '(e)(f)', { ch: 6, title: 'Signal delay and the V–r graph', sub: 'Up and down at the speed of light, then V = −GM/r',
    eq: 't = ' + FRAC('2h', 'c') + ' &nbsp;·&nbsp; V = −' + FRAC('GM<sub>E</sub>', 'r'), eqn: 'The signal travels up h and back down h' }, [
    { cap: '(e) The signal goes up h and comes back down h: distance 2h', pt: '<b>(e) Distance.</b> The signal is an electromagnetic wave. It goes up to the satellite (h) and back down (h): total distance <b>2h</b>.' },
    { cap: 't = 2h / c = 2(3.59 × 10⁷) / (3.00 × 10⁸) = 0.239 s', pt: '<b>Time.</b> t = ' + FRAC('2h', 'c') + ' = ' + FRAC('2(3.59 × 10<sup>7</sup>)', '3.00 × 10<sup>8</sup>') + ' = <b>0.239 s</b>. That is why a live match on satellite TV is about a quarter of a second behind.', col: C.green },
    { cap: '(f) At the surface: V = −GM/R = −6.25 × 10⁷ J/kg', pt: '<b>(f) Value at the surface.</b> GM<sub>E</sub> = 3.98 × 10<sup>14</sup> N m<sup>2</sup> kg<sup>−1</sup>. V = −' + FRAC('3.98 × 10<sup>14</sup>', '6.37 × 10<sup>6</sup>') + ' = <b>−6.25 × 10<sup>7</sup> J kg<sup>−1</sup></b>.' },
    { cap: 'At the geostationary orbit: V = −9.43 × 10⁶ J/kg (less negative)', pt: '<b>Value at the orbit.</b> V = −' + FRAC('3.98 × 10<sup>14</sup>', '4.22 × 10<sup>7</sup>') + ' = <b>−9.43 × 10<sup>6</sup> J kg<sup>−1</sup></b>.' },
    { cap: 'Sketch: always negative, starts at r = R, rises towards zero but never touches', pt: '<b>The sketch.</b> The curve is below the r-axis, starts at r = R<sub>E</sub>, and rises towards zero as r increases (V ∝ −1/r), never touching the axis. Mark both values.', col: C.green }
  ], S => {
    const { ctx, fs, k, p, st, L } = S, F = L.fig;
    if (k <= 1) {
      const gy = F.y + F.h * 0.88, sy = F.y + F.h * 0.12, gx = F.x + F.w * 0.25, hx = F.x + F.w * 0.5, sx = F.x + F.w * 0.375;
      ctx.fillStyle = '#245E86'; ctx.fillRect(F.x, gy, F.w, F.h * 0.12); sat(ctx, sx, sy, fs * 0.7);
      dot(ctx, gx, gy - 4, 6, C.gold); T(ctx, 'ground station', gx, gy + fs * 1.3, { size: fs * 0.8, c: C.ink, a: 'center' });
      ctx.fillStyle = C.ink; ctx.fillRect(hx - 8, gy - 12, 16, 12); T(ctx, 'home dish', hx + fs * 0.4, gy + fs * 1.3, { size: fs * 0.8, c: C.ink, a: 'center' });
      line(ctx, gx, gy, sx, sy, rgba(C.xr, .4), 1.5, [5, 5]); line(ctx, sx, sy, hx, gy, rgba(C.xr, .4), 1.5, [5, 5]);
      const tt = (st.t * 0.6) % 1.4, f = clamp(tt, 0, 1), up = f < 0.5, q = up ? f * 2 : (f - 0.5) * 2;
      const px = up ? gx + (sx - gx) * q : sx + (hx - sx) * q, py = up ? gy + (sy - gy) * q : sy + (gy - sy) * q; dot(ctx, px, py, 7, C.xr);
      T(ctx, `t = ${(0.239 * f).toFixed(3)} s`, F.x + F.w * 0.78, F.y + F.h * 0.45, { size: fs * 1.3, c: C.gold, w: 800, f: DISP, a: 'center' });
      T(ctx, 'h', (gx + sx) / 2 - fs * 0.6, (gy + sy) / 2, { size: fs, c: C.xr, w: 800 }); T(ctx, 'h', (sx + hx) / 2 + fs * 0.4, (gy + sy) / 2, { size: fs, c: C.xr, w: 800 });
      T(ctx, 'not to scale', F.x + F.w * 0.78, F.y + F.h * 0.6, { size: fs * 0.75, c: C.muted, a: 'center' });
    } else {
      const ox = F.x + F.w * 0.1, oy = F.y + F.h * 0.1, gw = F.w * 0.85, gh = F.h * 0.82, rmax = 8;
      const X = r => ox + gw * r / rmax, Y = v => oy + gh * (-v);   // v in units of GM/R (0 to −1)
      line(ctx, ox, oy, ox + gw, oy, C.muted, 1.5); line(ctx, ox, oy, ox, oy + gh, C.muted, 1.5); T(ctx, 'r', ox + gw + 4, oy + fs * 0.3, { size: fs, c: C.muted }); T(ctx, 'V', ox - fs * 0.9, oy + gh * 0.5, { size: fs, c: C.muted }); T(ctx, '0', ox - fs * 0.6, oy + fs * 0.3, { size: fs * 0.8, c: C.muted });
      const upto = k === 4 ? 1 + 6.8 * ease(seg(p, 0, 0.8)) : 1;
      ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); for (let r = 1; r <= upto; r += 0.05) { r === 1 ? ctx.moveTo(X(r), Y(-1 / r)) : ctx.lineTo(X(r), Y(-1 / r)); } ctx.stroke();
      line(ctx, X(1), oy, X(1), Y(-1), rgba(C.ink, .35), 1, [4, 4]); T(ctx, 'R', X(1), oy - fs * 0.4, { size: fs * 0.85, c: C.ink, a: 'center', w: 700 });
      dot(ctx, X(1), Y(-1), 5, C.cyan); T(ctx, '−6.25 × 10⁷ J/kg', X(1) + fs * 0.6, Y(-1) + fs * 0.3, { size: fs * 0.8, c: C.cyan, w: 800 });
      if (k >= 3) { const rr = 6.63; line(ctx, X(rr), oy, X(rr), Y(-1 / rr), rgba(C.ink, .35), 1, [4, 4]); T(ctx, 'r_geo', X(rr), oy - fs * 0.4, { size: fs * 0.85, c: C.ink, a: 'center', w: 700 }); dot(ctx, X(rr), Y(-1 / rr), 5, C.green); T(ctx, '−9.43 × 10⁶ J/kg', X(rr), Y(-1 / rr) + fs * 1.4, { size: fs * 0.8, c: C.green, w: 800, a: 'center' }); }
    }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, k <= 1 ? [
      { e: ['distance = h + h = 2h'], c: k === 0 ? C.gold : C.ink, w: 800 },
      k >= 1 ? { e: ['t = ', { f: [['2h'], ['c']] }, ' = ', { f: [['2(3.59 × 10', '^7', ')'], ['3.00 × 10', '^8']] }] } : null,
      k >= 1 ? { e: ['t = 0.239 s'], c: C.green, w: 800, s: 1.2 } : null] : [
      { e: ['V = −', { f: [['G M', '_E'], ['r']] }], w: 800 },
      { e: ['r = R', '_E', ':  V = −6.25 × 10', '^7', ' J kg', '^−1'], s: 0.88, c: C.cyan },
      k >= 3 ? { e: ['r = 4.22×10', '^7', ' m:  V = −9.43 × 10', '^6', ' J kg', '^−1'], s: 0.88, c: C.green } : null,
      k >= 4 ? { e: ['negative, rising to 0, never touching'], s: 0.85, c: C.gold, w: 800 } : null]);
  });

  /* =====================================================================
     Question 24 · diesel engine
     ===================================================================== */
  add('sb24a', 24, '(a)', { ch: 10, title: 'Diatomic gas: five degrees of freedom', sub: 'Equipartition gives C<sub>V,m</sub> and γ',
    eq: 'γ = ' + FRAC('C<sub>p,m</sub>', 'C<sub>V,m</sub>') + ' = ' + FRAC('7', '5'), eqn: 'Diatomic ideal gas at room temperature' }, [
    { cap: '(i) Equipartition: each degree of freedom gets the same mean energy, ½kT', pt: '<b>(i) Principle.</b> In thermal equilibrium, the mean energy of a molecule is <b>shared equally</b> among its degrees of freedom. Each degree of freedom has mean energy <b>½kT</b>.' },
    { cap: 'A diatomic molecule moves in 3 directions: 3 translational degrees of freedom', pt: '<b>Translation.</b> The molecule (like N<sub>2</sub> or O<sub>2</sub> in air) can move along x, y and z: <b>3</b> translational degrees of freedom.' },
    { cap: 'It also rotates about 2 axes. At room temperature it does not vibrate: f = 5', pt: '<b>Rotation.</b> It can rotate about the <b>2 axes</b> perpendicular to the bond (rotation about the bond itself has negligible energy). It does not vibrate at room temperature. So <b>f = 3 + 2 = 5</b>.' },
    { cap: 'U = (5/2)nRT, so C_V,m = (1/n) dU/dT = (5/2)R', pt: '<b>C<sub>V,m</sub>.</b> Each molecule has ' + FRAC('5', '2') + 'kT, so for n moles U = ' + FRAC('5', '2') + 'nRT. C<sub>V,m</sub> = ' + FRAC('1', 'n') + FRAC('dU', 'dT') + ' = <b>' + FRAC('5', '2') + 'R</b>.' },
    { cap: 'C_p,m = C_V,m + R = (7/2)R, so γ = 7/5 = 1.40', pt: '<b>γ.</b> C<sub>p,m</sub> = C<sub>V,m</sub> + R = ' + FRAC('7', '2') + 'R, so γ = ' + FRAC('C<sub>p,m</sub>', 'C<sub>V,m</sub>') + ' = ' + FRAC('7', '5') + ' = <b>1.40</b>.', col: C.green }
  ], S => {
    const { ctx, fs, k, st, L } = S, F = L.fig, cx = F.x + F.w * 0.45, cy = F.y + F.h * 0.45, s = Math.min(F.w, F.h) * 0.16;
    let ox = 0, oy = 0, ang = 0.4;
    if (k === 1) { ox = Math.sin(st.t * 1.3) * s * 0.9; oy = Math.cos(st.t * 0.9) * s * 0.4; }
    if (k === 2) ang = st.t * 1.6;
    const ax = cx + ox, ay = cy + oy, dx = Math.cos(ang) * s * 0.75, dy = Math.sin(ang) * s * 0.35;
    line(ctx, ax - dx, ay - dy, ax + dx, ay + dy, '#C9D1DC', 4); dot(ctx, ax - dx, ay - dy, s * 0.3, C.cyan); dot(ctx, ax + dx, ay + dy, s * 0.3, C.cyan);
    if (k === 1) { arrow(ctx, cx - s * 1.8, cy + s * 1.3, cx - s * 0.9, cy + s * 1.3, C.gold, 2.5, 9); arrow(ctx, cx - s * 1.8, cy + s * 1.3, cx - s * 1.8, cy + s * 0.4, C.gold, 2.5, 9); arrow(ctx, cx - s * 1.8, cy + s * 1.3, cx - s * 2.4, cy + s * 1.75, C.gold, 2.5, 9); T(ctx, 'x, y, z: 3', cx - s * 1.3, cy + s * 2.05, { size: fs * 0.9, c: C.gold, w: 800, a: 'center' }); }
    if (k === 2) { line(ctx, cx, cy - s * 1.3, cx, cy + s * 1.3, rgba(C.gold, .8), 1.5, [5, 4]); T(ctx, 'axis 1', cx + 6, cy - s * 1.2, { size: fs * 0.8, c: C.gold }); dot(ctx, cx, cy, 4, C.gold); T(ctx, 'axis 2: into the page', cx + s * 1.3, cy + s * 0.2, { size: fs * 0.8, c: C.gold }); T(ctx, 'no vibration at room T', cx + s * 1.3, cy + s * 0.75, { size: fs * 0.75, c: C.muted }); }
    const bx = F.x + F.w * 0.08, by = F.y + F.h * 0.86, bw = F.w * 0.15, labs = ['x', 'y', 'z', 'rot 1', 'rot 2'], n = k === 0 ? 5 : k === 1 ? 3 : 5;
    for (let i = 0; i < 5; i++) { const on = i < n || k >= 3; ctx.fillStyle = on ? rgba(C.gold, .85) : 'rgba(255,255,255,.08)'; rrect(ctx, bx + i * bw * 1.12, by - fs * 1.6, bw, fs * 1.6, 5); ctx.fill(); T(ctx, k === 0 ? '½kT' : labs[i], bx + i * bw * 1.12 + bw / 2, by - fs * 0.45, { size: fs * 0.8, c: on ? '#1D2B1F' : C.muted, a: 'center', w: 800 }); }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      { e: ['each degree of freedom: ½ k T'], c: k === 0 ? C.gold : C.ink, w: 800 },
      k >= 1 ? { e: ['f = 3 (translation)', k >= 2 ? ' + 2 (rotation) = 5' : ''], c: k <= 2 ? C.gold : C.ink, w: 800, s: 0.9 } : null,
      k >= 3 ? { e: ['U = ', { f: [['5'], ['2']] }, ' n R T  ⇒  C', '_V,m', ' = ', { f: [['5'], ['2']] }, ' R'], c: k === 3 ? C.gold : C.ink } : null,
      k >= 4 ? { e: ['C', '_p,m', ' = C', '_V,m', ' + R = ', { f: [['7'], ['2']] }, ' R'] } : null,
      k >= 4 ? { e: ['γ = ', { f: [['7'], ['5']] }, ' = 1.40'], c: C.green, w: 800, s: 1.2 } : null]);
  });

  const DZ = { A: [500, 1.00, 300], B: [27.78, 57.2, 953.3], C: [55.56, 57.2, 1906.6], D: [500, 2.639, 791.7] };
  function cyc(s) {   // s in [0,4): A→B→C→D→A
    const i = Math.floor(clamp(s, 0, 3.9999)), f = s - i;
    if (i === 0) { const V = 500 + (27.78 - 500) * f, p = Math.pow(500 / V, 1.4); return { V, p, T: 300 * Math.pow(500 / V, 0.4) }; }
    if (i === 1) { const V = 27.78 + 27.78 * f; return { V, p: 57.2, T: 953.3 * V / 27.78 }; }
    if (i === 2) { const V = 55.56 + (500 - 55.56) * f; return { V, p: 57.2 * Math.pow(55.56 / V, 1.4), T: 1906.6 * Math.pow(55.56 / V, 0.4) }; }
    const p = 2.639 + (1 - 2.639) * f; return { V: 500, p, T: 791.7 * p / 2.639 };
  }
  function engine(S, box, st8) {
    const { ctx, fs } = S, cx = box.x + box.w / 2, top = box.y + fs * 1.2, len = box.h - fs * 3.4, cw = box.w * 0.62, gl = len * st8.V / 520;
    ctx.fillStyle = heat((st8.T - 300) / 1200); ctx.globalAlpha = 0.55; ctx.fillRect(cx - cw / 2, top, cw, gl); ctx.globalAlpha = 1;
    line(ctx, cx - cw / 2, top, cx - cw / 2, top + len, '#C9D1DC', 3); line(ctx, cx + cw / 2, top, cx + cw / 2, top + len, '#C9D1DC', 3); line(ctx, cx - cw / 2, top, cx + cw / 2, top, '#C9D1DC', 3);
    ctx.fillStyle = '#9AA3A0'; ctx.fillRect(cx - cw / 2 + 2, top + gl, cw - 4, fs * 0.8); line(ctx, cx, top + gl + fs * 0.8, cx, top + len + fs * 0.6, '#9AA3A0', 5);
    line(ctx, cx, top - fs * 0.9, cx, top, C.ink, 3); T(ctx, `${st8.T.toFixed(0)} K`, cx, top + len + fs * 1.9, { size: fs * 0.9, c: heat((st8.T - 300) / 1200), a: 'center', w: 800 });
    return { cx, top, gl, cw };
  }
  function pvGraph(S, box, s, upto) {
    const { ctx, fs } = S, ox = box.x + fs * 1.4, oy = box.y + box.h - fs * 1.4, gw = box.w - fs * 2, gh = box.h - fs * 2.4;
    const X = V => ox + gw * V / 540, Y = p => oy - gh * p / 62;
    line(ctx, ox, oy, ox + gw, oy, C.muted, 1.5); line(ctx, ox, oy, ox, oy - gh, C.muted, 1.5);
    T(ctx, 'V', ox + gw, oy + fs * 1.1, { size: fs * 0.85, c: C.muted, a: 'center' }); T(ctx, 'p', ox - fs * 0.8, oy - gh + fs * 0.4, { size: fs * 0.85, c: C.muted });
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2.5; ctx.beginPath(); const N = Math.ceil(upto * 400); for (let i = 0; i <= N; i++) { const z = cyc(Math.min(upto, i / 400)); i ? ctx.lineTo(X(z.V), Y(z.p)) : ctx.moveTo(X(z.V), Y(z.p)); } ctx.stroke();
    [['A', DZ.A, 8, 4], ['B', DZ.B, -16, -4], ['C', DZ.C, 6, -6], ['D', DZ.D, 8, -6]].forEach(([n, d, dx, dy], i) => { if (upto >= i || i === 0) T(ctx, n, X(d[0]) + dx, Y(d[1]) + dy, { size: fs * 0.9, c: C.ink, w: 800 }); });
    const z = cyc(s); dot(ctx, X(z.V), Y(z.p), 6, C.xr);
  }
  add('sb24b', 24, '(b)(i)–(iii)', { ch: 11, title: 'The diesel cycle: sketch, T and p at B, ignition', sub: 'Adiabatic compression makes the air hot enough to light the fuel',
    eq: 'TV<sup>γ−1</sup> = constant &nbsp;·&nbsp; pV<sup>γ</sup> = constant', eqn: 'Adiabatic process (no heat exchanged)' }, [
    { cap: 'State A: 500 cm³ of air at 1.00 × 10⁵ Pa and 300 K', pt: '<b>Start at A.</b> V<sub>A</sub> = 5.00 × 10<sup>−4</sup> m<sup>3</sup> (500 cm<sup>3</sup>), p<sub>A</sub> = 1.00 × 10<sup>5</sup> Pa, T<sub>A</sub> = 27 + 273 = 300 K.' },
    { cap: 'A → B: compressed very fast to 1/18 of the volume. No heat escapes, so T rises', pt: '<b>A → B.</b> The piston compresses the air quickly to 1/18 of its volume. No heat is exchanged (adiabatic), so the work done on the air raises its temperature. On the graph: a steep curve up to B.' },
    { cap: 'T_B = T_A(V_A/V_B)^(γ−1) = 300 × 18^0.40 = 953 K', pt: '<b>(ii) Temperature at B.</b> T<sub>A</sub>V<sub>A</sub><sup>γ−1</sup> = T<sub>B</sub>V<sub>B</sub><sup>γ−1</sup>, so T<sub>B</sub> = T<sub>A</sub>(' + FRAC('V<sub>A</sub>', 'V<sub>B</sub>') + ')<sup>γ−1</sup> = 300(18)<sup>0.40</sup> = 300(3.178) = <b>953 K</b>.' },
    { cap: 'p_B = p_A(V_A/V_B)^γ = (1.00 × 10⁵)(18)^1.40 = 5.72 × 10⁶ Pa', pt: '<b>(ii) Pressure at B.</b> p<sub>A</sub>V<sub>A</sub><sup>γ</sup> = p<sub>B</sub>V<sub>B</sub><sup>γ</sup>, so p<sub>B</sub> = (1.00 × 10<sup>5</sup>)(18)<sup>1.40</sup> = (1.00 × 10<sup>5</sup>)(57.2) = <b>5.72 × 10<sup>6</sup> Pa</b>.' },
    { cap: '(iii) 953 K = 680 °C, far above 210 °C: the injected fuel lights by itself', pt: '<b>(iii) Ignition.</b> T<sub>B</sub> = 953 − 273 = <b>680 °C</b>, much higher than the ignition temperature of 210 °C, so the fuel <b>ignites by itself</b> as soon as it is injected. No spark plug is needed.', col: C.green },
    { cap: 'B → C: the fuel burns at constant pressure (horizontal line) and the volume doubles', pt: '<b>B → C.</b> The burning fuel heats the gas at constant pressure: a <b>horizontal line</b> on the p–V graph, as the volume doubles.' },
    { cap: 'C → D adiabatic expansion, D → A cooling at constant volume: a clockwise loop', pt: '<b>(i) The sketch.</b> C → D is an adiabatic curve back to the original volume; D → A is a <b>vertical line</b> (constant volume) down to A. Label A, B, C, D with arrows: the cycle goes <b>clockwise</b>.', col: C.green, d: 6 }
  ], S => {
    const { ctx, fs, k, p, st, L } = S, F = L.fig, eb = { x: F.x, y: F.y, w: F.w * 0.32, h: F.h }, gb = { x: F.x + F.w * 0.36, y: F.y, w: F.w * 0.62, h: F.h };
    let s = 0, upto = 0;
    if (k === 1) { s = ease(seg(p, 0.1, 0.8)); upto = s; } else if (k >= 2 && k <= 4) { s = 1; upto = 1; }
    else if (k === 5) { s = 1 + ease(seg(p, 0.1, 0.8)); upto = s; } else if (k === 6) { s = 2 + 2 * ease(seg(p, 0, 0.85)); upto = s; }
    const z = cyc(s), e = engine(S, eb, z); pvGraph(S, gb, s, upto);
    if (k === 4) { const fl = 0.5 + 0.5 * Math.sin(st.t * 18); for (let i = 0; i < 9; i++) dot(ctx, e.cx + (i - 4) * e.cw * 0.08, e.top + e.gl * 0.5 + Math.sin(i * 3.1 + st.t * 9) * 3, 3 + fl * 2, i % 2 ? C.xr : C.gold); T(ctx, 'fuel ignites!', e.cx, e.top + e.gl + fs * 2.4, { size: fs * 0.9, c: C.xr, a: 'center', w: 800 }); }
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      k === 0 ? { e: ['V', '_A', ' = 5.00×10', '^−4', ' m', '^3', ', T', '_A', ' = 300 K'], s: 0.9 } : null,
      k === 1 ? { e: ['adiabatic: Q = 0, T rises'], c: C.gold, w: 800 } : null,
      k >= 2 && k <= 4 ? { e: ['T', '_B', ' = T', '_A', '(', { f: [['V', '_A'], ['V', '_B']] }, ')', '^γ−1', ' = 300(18)', '^0.40'], s: 0.9 } : null,
      k >= 2 && k <= 4 ? { e: ['T', '_B', ' = 953 K'], c: C.gold, w: 800 } : null,
      k >= 3 && k <= 4 ? { e: ['p', '_B', ' = p', '_A', '(', { f: [['V', '_A'], ['V', '_B']] }, ')', '^γ', ' = (1.00×10', '^5', ')(18)', '^1.40'], s: 0.85 } : null,
      k >= 3 && k <= 4 ? { e: ['p', '_B', ' = 5.72 × 10', '^6', ' Pa'], c: C.gold, w: 800 } : null,
      k === 4 ? { e: ['953 K = 680 °C > 210 °C'], c: C.green, w: 800 } : null,
      k === 5 ? { e: ['B → C: constant p, V doubles'], c: C.gold, w: 800 } : null,
      k === 6 ? { e: ['A→B, C→D: adiabatic curves'], s: 0.9 } : null,
      k === 6 ? { e: ['B→C horizontal, D→A vertical'], s: 0.9 } : null,
      k === 6 ? { e: ['clockwise cycle'], c: C.green, w: 800 } : null]);
  });

  add('sb24c', 24, '(b)(iv)(v)', { ch: 11, title: 'Combustion stroke: heat, work and ΔU', sub: 'First law: Q = ΔU + W',
    eq: 'Q = ΔU + W', eqn: 'W = work done BY the gas' }, [
    { cap: 'Number of moles from state A: n = pV/RT = 0.02006 mol', pt: '<b>Moles.</b> n = ' + FRAC('p<sub>A</sub>V<sub>A</sub>', 'RT<sub>A</sub>') + ' = ' + FRAC('(1.00 × 10<sup>5</sup>)(5.00 × 10<sup>−4</sup>)', '(8.31)(300)') + ' = <b>0.02006 mol</b>.' },
    { cap: 'Constant pressure: V/T is constant. V doubles, so T doubles: T_C = 1907 K', pt: '<b>Temperature at C.</b> At constant pressure, ' + FRAC('V', 'T') + ' is constant. The volume doubles, so T<sub>C</sub> = 2T<sub>B</sub> = 2(953) = <b>1907 K</b>.' },
    { cap: 'Heat at constant pressure uses C_p,m: Q = nC_p,mΔT = 556 J', pt: '<b>(iv) Heat supplied.</b> Q = nC<sub>p,m</sub>ΔT = (0.02006)(' + FRAC('7', '2') + ' × 8.31)(1907 − 953) = <b>556 J</b>. Use C<sub>p,m</sub>, not C<sub>V,m</sub>.', col: C.green },
    { cap: 'Work done by the gas pushing the piston: W = pΔV = 159 J', pt: '<b>(v) Work done by the gas.</b> V<sub>B</sub> = ' + FRAC('5.00 × 10<sup>−4</sup>', '18') + ' = 2.778 × 10<sup>−5</sup> m<sup>3</sup> and ΔV = V<sub>B</sub>. W = pΔV = (5.72 × 10<sup>6</sup>)(2.778 × 10<sup>−5</sup>) = <b>159 J</b>.' },
    { cap: 'The rest raises the internal energy: ΔU = Q − W = 397 J', pt: '<b>(v) Internal energy.</b> First law: ΔU = Q − W = 556 − 159 = <b>397 J</b>. Of the 556 J of heat, 159 J pushes the piston and 397 J raises the internal energy. Check: nC<sub>V,m</sub>ΔT = 397 J ✓', col: C.green }
  ], S => {
    const { ctx, fs, k, p, st, L } = S, F = L.fig, eb = { x: F.x, y: F.y, w: F.w * 0.34, h: F.h };
    const s = k >= 1 ? 1 + (k === 1 ? ease(seg(p, 0.1, 0.8)) : 1) : 1, z = cyc(s), e = engine(S, eb, z);
    if (k >= 2) for (let i = 0; i < 3; i++) { const yy = e.top + e.gl * (0.3 + 0.2 * i), o = (st.t * 40 + i * 13) % 26; arrow(ctx, e.cx - e.cw * 0.95 + o * 0.3, yy, e.cx - e.cw * 0.55, yy, C.xr, 2.5, 9); }
    if (k >= 3) arrow(ctx, e.cx + e.cw * 0.7, e.top + e.gl - fs, e.cx + e.cw * 0.7, e.top + e.gl + fs * 1.6, C.cyan, 3, 10);
    const bx = F.x + F.w * 0.42, bw = F.w * 0.54, by = F.y + F.h * 0.25, bh = fs * 2.4;
    if (k >= 2) {
      const tot = 556, g = k === 2 ? ease(seg(p, 0, 0.6)) : 1;
      ctx.fillStyle = C.xr; rrect(ctx, bx, by, bw * g, bh, 6); ctx.fill(); T(ctx, 'Q = 556 J (heat in)', bx + bw / 2, by + bh * 0.66, { size: fs * 0.9, c: '#1D2B1F', a: 'center', w: 800 });
      if (k >= 3) { const w1 = bw * 159 / tot, g2 = k === 3 ? ease(seg(p, 0, 0.6)) : 1; ctx.fillStyle = C.cyan; rrect(ctx, bx, by + bh * 1.7, w1 * g2, bh, 6); ctx.fill(); T(ctx, 'W', bx + w1 / 2, by + bh * 1.7 + bh * 0.66, { size: fs * 0.85, c: '#1D2B1F', a: 'center', w: 800 }); T(ctx, 'W = 159 J pushes the piston', bx, by + bh * 3.1, { size: fs * 0.75, c: C.cyan }); }
      if (k >= 4) { const w1 = bw * 159 / tot, g3 = ease(seg(p, 0, 0.6)); ctx.fillStyle = C.green; rrect(ctx, bx + w1 + 4, by + bh * 1.7, (bw - w1 - 4) * g3, bh, 6); ctx.fill(); T(ctx, 'ΔU = 397 J', bx + w1 + (bw - w1) / 2, by + bh * 1.7 + bh * 0.66, { size: fs * 0.85, c: '#1D2B1F', a: 'center', w: 800 }); T(ctx, 'ΔU = 397 J raises the internal energy', bx + bw, by + bh * 3.1 + fs * 1.2, { size: fs * 0.75, c: C.green, a: 'right' }); }
    } else T(ctx, k === 0 ? 'n from state A: 500 cm³, 300 K' : 'B → C at constant p', bx + bw / 2, by + bh * 0.66, { size: fs, c: C.gold, a: 'center', w: 800 });
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      { e: ['n = ', { f: [['p', '_A', 'V', '_A'], ['RT', '_A']] }, ' = 0.02006 mol'], s: 0.9, c: k === 0 ? C.gold : C.ink },
      k >= 1 ? { e: ['T', '_C', ' = 2T', '_B', ' = 1907 K'], c: k === 1 ? C.gold : C.ink, w: 800 } : null,
      k >= 2 ? { e: ['Q = n C', '_p,m', ' ΔT = 556 J'], c: k === 2 ? C.xr : C.ink, w: 800 } : null,
      k >= 3 ? { e: ['W = p ΔV = (5.72×10', '^6', ')(2.778×10', '^−5', ') = 159 J'], s: 0.82, c: k === 3 ? C.cyan : C.ink } : null,
      k >= 4 ? { e: ['ΔU = Q − W = 397 J'], c: C.green, w: 800, s: 1.15 } : null]);
  });

  /* =====================================================================
     Question 25 · ceiling fan (supplementary)
     ===================================================================== */
  function fan(S, cx, cy, r, ang, o = {}) {
    const { ctx } = S;
    for (let i = 0; i < 3; i++) { const a = ang + i * TAU / 3; ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.fillStyle = '#A67C52'; rrect(ctx, r * 0.15, -r * 0.1, r * 0.85, r * 0.2, r * 0.08); ctx.fill(); ctx.restore();
      if (o.mass) { dot(ctx, cx + r * 0.75 * Math.cos(a), cy + r * 0.75 * Math.sin(a), 6, C.gold); } }
    dot(ctx, cx, cy, r * 0.18, '#9AA3A0'); dot(ctx, cx, cy, r * 0.06, '#555');
  }
  add('sb25b', 25, '(a)(b)', { ch: 7, title: 'Ceiling fan: the frictional torque', sub: 'Switch off, count the revolutions, find α, then τ = Iα',
    eq: 'ω<sup>2</sup> = ω<sub>0</sub><sup>2</sup> + 2αθ &nbsp;·&nbsp; τ = Iα', eqn: 'Rotational versions of v² = u² + 2as and F = ma' }, [
    { cap: '(a) Moment of inertia I = Σmr²: each bit of mass times (distance from axis)²', pt: '<b>(a) Definition.</b> I = Σm<sub>i</sub>r<sub>i</sub><sup>2</sup>: the sum of the products of the mass of each particle and the square of its <b>perpendicular distance from the axis</b>.' },
    { cap: 'SI units: 300 rev/min = 31.4 rad/s, and 40 revolutions = 251 rad', pt: '<b>Convert.</b> One revolution = 2π rad, one minute = 60 s. ω<sub>0</sub> = 300 × ' + FRAC('2π', '60') + ' = <b>31.4 rad s<sup>−1</sup></b>; θ = 40 × 2π = <b>251 rad</b>.' },
    { cap: 'Switched off: only friction acts. The fan slows down and stops after 40 revolutions', pt: '<b>Slowing down.</b> After switching off, only the frictional torque acts, so the fan decelerates uniformly and stops after 40 revolutions.', d: 7 },
    { cap: 'ω² = ω₀² + 2αθ with ω = 0: α = −31.4² / (2 × 251) = −1.96 rad/s²', pt: '<b>Angular deceleration.</b> ω<sup>2</sup> = ω<sub>0</sub><sup>2</sup> + 2αθ with final ω = 0: 0 = 31.4<sup>2</sup> + 2α(251), so α = <b>−1.96 rad s<sup>−2</sup></b> (like v<sup>2</sup> = u<sup>2</sup> + 2as).' },
    { cap: 'τ_f = I|α| = (0.180)(1.96) = 0.353 N m', pt: '<b>Frictional torque.</b> Newton\'s second law for rotation, τ = Iα (like F = ma): τ<sub>f</sub> = (0.180)(1.96) = <b>0.353 N m</b>. The minus sign only shows it is slowing down.', col: C.green }
  ], S => {
    const { ctx, fs, k, lt, L, st, dt } = S, F = L.fig, cx = F.x + F.w * 0.42, cy = F.y + F.h * 0.5, r = Math.min(F.w * 0.36, F.h * 0.42);
    let w = 31.4, revs = null;
    if (k === 2) { const tr = clamp(lt / 5.6, 0, 1) * 16.0, a = 1.963; w = Math.max(0, 31.4 - a * tr); revs = (31.4 * tr - 0.5 * a * tr * tr) / TAU; }
    st.ang = (st.ang || 0) + w * 0.12 * dt * (k === 2 ? 2.9 : 1);
    fan(S, cx, cy, r, st.ang, { mass: k === 0 });
    if (k === 0) { const a = st.ang; line(ctx, cx, cy, cx + r * 0.75 * Math.cos(a), cy + r * 0.75 * Math.sin(a), C.cyan, 2); T(ctx, 'm', cx + r * 0.75 * Math.cos(a) + 8, cy + r * 0.75 * Math.sin(a) - 8, { size: fs, c: C.gold, w: 800 }); T(ctx, 'r', cx + r * 0.4 * Math.cos(a) + 6, cy + r * 0.4 * Math.sin(a) + fs, { size: fs, c: C.cyan, w: 800 }); }
    const mx = F.x + F.w * 0.86;
    T(ctx, `${w.toFixed(1)} rad/s`, mx, F.y + F.h * 0.3, { size: fs * 1.2, c: C.gold, w: 800, a: 'center', f: DISP });
    T(ctx, `${(w * 60 / TAU).toFixed(0)} rev/min`, mx, F.y + F.h * 0.3 + fs * 1.4, { size: fs * 0.8, c: C.muted, a: 'center' });
    if (revs != null) T(ctx, `${revs.toFixed(1)} rev`, mx, F.y + F.h * 0.62, { size: fs * 1.2, c: C.cyan, w: 800, a: 'center', f: DISP });
    T(ctx, 'rotation shown slowed down', cx, F.y + F.h + fs * 0.2, { size: fs * 0.75, c: C.muted, a: 'center' });
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, [
      k === 0 ? { e: ['I = Σ m r', '^2'], c: C.gold, w: 800, s: 1.2 } : null,
      k >= 1 ? { e: ['ω', '_0', ' = 300 × ', { f: [['2π'], ['60']] }, ' = 31.4 rad s', '^−1'], s: 0.9 } : null,
      k >= 1 ? { e: ['θ = 40 × 2π = 251 rad'], s: 0.9 } : null,
      k >= 3 ? { e: ['0 = 31.4', '^2', ' + 2α(251)'], s: 0.95 } : null,
      k >= 3 ? { e: ['α = −1.96 rad s', '^−2'], c: C.gold, w: 800 } : null,
      k >= 4 ? { e: ['τ', '_f', ' = I|α| = (0.180)(1.96)'], s: 0.9 } : null,
      k >= 4 ? { e: ['τ', '_f', ' = 0.353 N m'], c: C.green, w: 800, s: 1.15 } : null]);
  });

  add('sb25c', 25, '(c)(d)', { ch: 7, title: 'Ceiling fan: motor torque and kinetic energy', sub: 'The motor must beat friction AND speed the fan up',
    eq: 'τ<sub>motor</sub> − τ<sub>f</sub> = Iα', eqn: 'Net torque gives the angular acceleration' }, [
    { cap: 'Speeding up: the motor torque turns the fan forward, friction acts against it', pt: '<b>Two torques.</b> While speeding up, the motor torque acts forward and the frictional torque (0.353 N m) acts against the rotation.' },
    { cap: 'α₁ = (31.4 − 0) / 6.0 = 5.24 rad/s²', pt: '<b>Angular acceleration.</b> α<sub>1</sub> = ' + FRAC('ω − ω<sub>0</sub>', 't') + ' = ' + FRAC('31.4 − 0', '6.0') + ' = <b>5.24 rad s<sup>−2</sup></b>.' },
    { cap: 'Net torque = τ_motor − τ_f = Iα₁ = (0.180)(5.24) = 0.943 N m', pt: '<b>Net torque.</b> τ<sub>motor</sub> − τ<sub>f</sub> = Iα<sub>1</sub> = (0.180)(5.24) = 0.943 N m.' },
    { cap: 'τ_motor = 0.943 + 0.353 = 1.30 N m', pt: '<b>Motor torque.</b> τ<sub>motor</sub> = 0.943 + 0.353 = <b>1.30 N m</b>. Forgetting friction gives 0.943 N m (1 mark only).', col: C.green },
    { cap: '(d) Rotational KE = ½Iω² = ½(0.180)(31.4)² = 88.8 J', pt: '<b>(d) Kinetic energy.</b> K = ½Iω<sup>2</sup> = ½(0.180)(31.4)<sup>2</sup> = <b>88.8 J</b>. It is like ½mv<sup>2</sup>, with I for m and ω for v.', col: C.green }
  ], S => {
    const { ctx, fs, k, lt, L, st, dt } = S, F = L.fig, cx = F.x + F.w * 0.4, cy = F.y + F.h * 0.5, r = Math.min(F.w * 0.33, F.h * 0.4);
    const w = k === 4 ? 31.4 : Math.min(31.4, 5.236 * (lt % 7.5));
    st.ang = (st.ang || 0) + w * 0.12 * dt; fan(S, cx, cy, r, st.ang);
    const R1 = r * 1.15;
    if (k <= 3) {
      arc(ctx, cx, cy, R1, -2.4, -0.9, C.gold, 4); arrow(ctx, cx + R1 * Math.cos(-1.05), cy + R1 * Math.sin(-1.05), cx + R1 * Math.cos(-0.9), cy + R1 * Math.sin(-0.9), C.gold, 4, 12);
      T(ctx, k >= 3 ? 'τ_motor = 1.30 N m' : 'τ_motor', cx + R1 * 0.2, cy - R1 - fs * 0.4, { size: fs * 0.9, c: C.gold, w: 800, a: 'center' });
      arc(ctx, cx, cy, R1, 2.2, 0.9, C.red, 3); arrow(ctx, cx + R1 * Math.cos(1.05), cy + R1 * Math.sin(1.05), cx + R1 * Math.cos(0.9), cy + R1 * Math.sin(0.9), C.red, 3, 10);
      T(ctx, 'τ_f = 0.353 N m', cx, cy + R1 + fs * 1.3, { size: fs * 0.85, c: C.red, w: 800, a: 'center' });
    }
    const mx = F.x + F.w * 0.86; T(ctx, `${w.toFixed(1)} rad/s`, mx, F.y + F.h * 0.35, { size: fs * 1.2, c: C.gold, w: 800, a: 'center', f: DISP });
    if (k !== 4) T(ctx, `t = ${Math.min(6, lt % 7.5).toFixed(1)} s`, mx, F.y + F.h * 0.35 + fs * 1.5, { size: fs * 0.85, c: C.muted, a: 'center' });
    else T(ctx, 'K = 88.8 J', mx, F.y + F.h * 0.6, { size: fs * 1.2, c: C.green, w: 800, a: 'center', f: DISP });
    const B0 = L.brd;
    board(S, B0.x, B0.y, B0.w, k <= 3 ? [
      { e: ['τ', '_motor', ' − τ', '_f', ' = I α', '_1'], c: k === 0 ? C.gold : C.ink, w: 800 },
      k >= 1 ? { e: ['α', '_1', ' = ', { f: [['31.4 − 0'], ['6.0']] }, ' = 5.24 rad s', '^−2'], s: 0.92, c: k === 1 ? C.gold : C.ink } : null,
      k >= 2 ? { e: ['I α', '_1', ' = (0.180)(5.24) = 0.943 N m'], s: 0.88, c: k === 2 ? C.gold : C.ink } : null,
      k >= 3 ? { e: ['τ', '_motor', ' = 0.943 + 0.353'], s: 0.92 } : null,
      k >= 3 ? { e: ['τ', '_motor', ' = 1.30 N m'], c: C.green, w: 800, s: 1.15 } : null] : [
      { e: ['K = ½ I ω', '^2', '   (like ½ m v', '^2', ')'], s: 0.92 },
      { e: ['K = ½(0.180)(31.4)', '^2'] },
      { e: ['K = 88.8 J'], c: C.green, w: 800, s: 1.2 }]);
  });
})();
