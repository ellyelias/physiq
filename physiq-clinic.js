/* PhysiQ Concept Clinic: animated fixes for the concepts where students lose marks (Semester 3).
   - mount(box, sem):   the Concept Clinic page in Notes (option CLINIC-3), one topic at a time
   - forLesson(k):      the chapter's clinic animations at the end of its full notes (mounted by mountAll)
   - mountAll(scope):   starts every <div class="cc-mount" data-cc="topic,topic"> inside scope
   Topics: shm (Ch 20), intensity (Ch 21), doppler (Ch 22), film (Ch 24), xray + stop (Ch 25), decay (Ch 26), round (all chapters).
   Self-contained canvas animations; each pauses while off screen and stops when removed from the page. */
(function () {
  'use strict';
  const C = { bg: '#1F2E21', line: '#3A5236', ink: '#F3F5EC', muted: '#B9C4AE', gold: '#D5DC3B', cyan: '#B7A2F0', xr: '#F79A3E',
    red: '#FF7A5C', green: '#A6D64A', violet: '#8F89FF', dark: '#1D2B1F', copper: '#B8733F' };
  const DISP = '"Oswald","Arial Narrow",sans-serif', BODY = '"Inter","Segoe UI",system-ui,sans-serif';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), rnd = Math.random;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${a})`; };
  const FS = w => clamp(w / 54, w < 520 ? 9 : 12, 22);

  /* ---------- drawing helpers ---------- */
  function T(ctx, s, x, y, o = {}) { ctx.font = `${o.w || 600} ${o.size || 16}px ${o.f || BODY}`; ctx.fillStyle = o.c || C.ink; ctx.textAlign = o.a || 'left'; ctx.textBaseline = o.b || 'alphabetic'; ctx.fillText(s, x, y); return ctx.measureText(s).width; }
  // rich text: '_x' subscript, '^x' superscript
  function R(ctx, parts, x, y, o = {}) {
    const size = o.size || 16, w = o.w || 600, f = o.f || BODY;
    const segs = parts.map(p => { let m = 'n', t = p; if (p.length > 1 && p[0] === '_') { m = 'sub'; t = p.slice(1); } else if (p.length > 1 && p[0] === '^') { m = 'sup'; t = p.slice(1); } return { m, t, sz: m === 'n' ? size : size * 0.66 }; });
    let tot = 0; segs.forEach(s => { ctx.font = `${w} ${s.sz}px ${f}`; s.wd = ctx.measureText(s.t).width; tot += s.wd; });
    if (o.measure) return tot;
    let cx = o.a === 'center' ? x - tot / 2 : o.a === 'right' ? x - tot : x;
    ctx.fillStyle = o.c || C.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    segs.forEach(s => { ctx.font = `${w} ${s.sz}px ${f}`; const dy = s.m === 'sub' ? size * 0.24 : s.m === 'sup' ? -size * 0.42 : 0; ctx.fillText(s.t, cx, y + dy); cx += s.wd; });
    return tot;
  }
  function FR(ctx, num, den, x, y, o = {}) {
    const size = o.size || 16, a = R(ctx, num, 0, 0, { ...o, measure: true }), b = R(ctx, den, 0, 0, { ...o, measure: true }), W = Math.max(a, b) + size * 0.4;
    R(ctx, num, x + W / 2, y - size * 0.22, { ...o, a: 'center' }); R(ctx, den, x + W / 2, y + size * 0.92, { ...o, a: 'center' });
    ctx.strokeStyle = o.c || C.ink; ctx.lineWidth = Math.max(1.5, size / 14); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + W, y); ctx.stroke();
    return W;
  }
  function arrow(ctx, x1, y1, x2, y2, col, lw = 2, hd = 10) { ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hd * Math.cos(a - .42), y2 - hd * Math.sin(a - .42)); ctx.lineTo(x2 - hd * Math.cos(a + .42), y2 - hd * Math.sin(a + .42)); ctx.closePath(); ctx.fill(); }
  function darrow(ctx, x1, y, x2, col, lw, hd) { arrow(ctx, (x1 + x2) / 2, y, x1, y, col, lw, hd); arrow(ctx, (x1 + x2) / 2, y, x2, y, col, lw, hd); }
  function line(ctx, x1, y1, x2, y2, col, lw = 2, dash) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); }
  function dot(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
  function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function lead(ctx, px, py, lx, ly, text, fs, a = 'center') { ctx.save(); ctx.strokeStyle = rgba(C.gold, .75); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lx, ly + fs * 0.35); ctx.stroke(); ctx.restore(); dot(ctx, px, py, 3.5, C.gold); T(ctx, text, lx, ly, { size: fs, a }); }
  function wave(ctx, x, y, ang, L, amp, col, lw) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const s = L * i / 40; ctx.lineTo(s, Math.sin(s / L * Math.PI * 6) * amp); } ctx.stroke(); ctx.restore(); }

  /* ---------- scenes (one object per animation instance) ---------- */
  const SCENES = {};

  SCENES.xray = () => ({ mode: 'tube', V: 80, target: 'W', els: [], phs: [], heat: 0, acc: 0, prog: 0,
    reset() { this.els = []; this.phs = []; this.heat = 0; this.prog = 0; },
    set(k, v) { this[k] = v; if (k !== 'V') this.prog = 0; },
    draw(ctx, w, h, dt) { this.mode === 'tube' ? this.tube(ctx, w, h, dt) : this.spec(ctx, w, h, dt); },
    tube(ctx, w, h, dt) {
      const fs = FS(w), cy = h * 0.42, gx0 = w * 0.1, gx1 = w * 0.9, gh = h * 0.36, top = cy - gh / 2, bot = cy + gh / 2;
      const A = { x: w * 0.655, y: cy - h * 0.11 }, B = { x: w * 0.715, y: cy + h * 0.10 };
      const faceX = y => A.x + (y - A.y) * (B.x - A.x) / (B.y - A.y), hitX = faceX(cy);
      ctx.fillStyle = C.copper; ctx.fillRect(w * 0.84, cy - h * 0.035, w * 0.13, h * 0.07);
      ctx.save(); ctx.fillStyle = 'rgba(200,230,190,.06)'; ctx.strokeStyle = 'rgba(215,235,205,.6)'; ctx.lineWidth = 2.5; rrect(ctx, gx0, top, gx1 - gx0, gh, gh / 2); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.fillStyle = C.bg; ctx.fillRect(hitX - w * 0.045, bot - 4, w * 0.09, 8); line(ctx, hitX - w * 0.045, bot, hitX + w * 0.045, bot, C.gold, 2, [5, 4]);
      ctx.fillStyle = C.copper; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.lineTo(w * 0.845, B.y); ctx.lineTo(w * 0.845, A.y); ctx.closePath(); ctx.fill();
      line(ctx, A.x, A.y, B.x, B.y, '#C9D1DC', 7);
      this.heat = clamp(this.heat * Math.pow(0.25, dt), 0, 1);
      const g = ctx.createRadialGradient(hitX, cy, 0, hitX, cy, w * 0.06); g.addColorStop(0, `rgba(255,120,40,${0.15 + 0.7 * this.heat})`); g.addColorStop(1, 'rgba(255,90,30,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hitX, cy, w * 0.06, 0, 7); ctx.fill();
      line(ctx, w * 0.03, cy - h * 0.025, w * 0.18, cy - h * 0.025, '#8F9B8A', 3); line(ctx, w * 0.03, cy + h * 0.025, w * 0.18, cy + h * 0.025, '#8F9B8A', 3);
      ctx.strokeStyle = '#A3AE9C'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w * 0.225, cy - h * 0.08); ctx.lineTo(w * 0.175, cy - h * 0.08); ctx.lineTo(w * 0.175, cy + h * 0.08); ctx.lineTo(w * 0.225, cy + h * 0.08); ctx.stroke();
      const fg = ctx.createRadialGradient(w * 0.2, cy, 0, w * 0.2, cy, w * 0.035); fg.addColorStop(0, 'rgba(255,170,60,.65)'); fg.addColorStop(1, 'rgba(255,140,40,0)'); ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(w * 0.2, cy, w * 0.035, 0, 7); ctx.fill();
      ctx.strokeStyle = '#FFB347'; ctx.lineWidth = 2.5; ctx.beginPath(); for (let i = 0; i <= 8; i++) ctx.lineTo(w * 0.2 + (i % 2 ? w * 0.008 : -w * 0.008), cy - h * 0.045 + h * 0.09 * i / 8); ctx.stroke();
      const a = w * 1.5 * (this.V / 60);
      this.acc += dt * 38; while (this.acc >= 1) { this.acc--; this.els.push({ x: w * 0.212, y: cy + (rnd() - .5) * h * 0.06, vx: w * 0.02 }); }
      const er = Math.max(2.2, w / 330);
      this.els = this.els.filter(e => {
        e.vx += a * dt; e.x += e.vx * dt; e.y += (cy - e.y) * dt * 1.4;
        if (e.x >= faceX(e.y)) { this.heat += 0.035; if (rnd() < 0.3) this.phs.push({ x: faceX(e.y), y: e.y, ang: Math.PI / 2 + (rnd() - .5) * 0.55 }); return false; }
        const tl = Math.min(e.vx * 0.05, w * 0.05); ctx.strokeStyle = rgba(C.cyan, .35); ctx.lineWidth = er; ctx.beginPath(); ctx.moveTo(e.x - tl, e.y); ctx.lineTo(e.x, e.y); ctx.stroke(); dot(ctx, e.x, e.y, er, C.cyan); return true;
      });
      const ps = w * 0.32;
      this.phs = this.phs.filter(p => { p.x += Math.cos(p.ang) * ps * dt; p.y += Math.sin(p.ang) * ps * dt; wave(ctx, p.x, p.y, p.ang + Math.PI, w * 0.045, w * 0.006, C.xr, 2.5); return p.y < h + 20; });
      const tr = fs * 0.75;
      [[w * 0.03, cy, '−'], [w * 0.97, cy, '+']].forEach(([x, y, s]) => { dot(ctx, x, y, tr, C.bg); ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, tr, 0, 7); ctx.stroke(); T(ctx, s, x, y + 1, { size: fs * 1.2, a: 'center', b: 'middle', w: 700, c: C.gold }); });
      lead(ctx, w * 0.2, cy - h * 0.05, w * 0.17, h * 0.1, 'Heated filament (cathode)', fs);
      lead(ctx, (A.x + w * 0.8) / 2, A.y + 2, w * 0.62, h * 0.1, `${this.target === 'W' ? 'Tungsten' : 'Molybdenum'} target (anode)`, fs);
      T(ctx, 'Vacuum', w * 0.43, top + fs * 1.7, { size: fs, a: 'center', c: C.muted });
      T(ctx, 'Electrons accelerated by p.d. V', w * 0.43, cy + fs * 2.1, { size: fs, a: 'center', c: C.cyan });
      T(ctx, 'Copper conducts heat away', w * 0.97, bot + fs * 1.8, { size: fs, a: 'right', c: '#E2A06E' });
      T(ctx, 'X-rays leave through the window', hitX - w * 0.07, h * 0.78, { size: fs, a: 'right', c: C.xr });
      T(ctx, `V = ${this.V} kV`, w * 0.04, h * 0.9, { size: fs * 2, f: DISP, w: 700, c: C.gold });
      T(ctx, '≈ 1% of the energy → X-rays,  ≈ 99% → heat', w * 0.04, h * 0.965, { size: fs * 0.95, c: C.muted });
    },
    spec(ctx, w, h, dt) {
      this.prog = Math.min(1, this.prog + dt * 0.7);
      const fs = FS(w), L0 = w * 0.1, L1 = w * 0.94, Y0 = h * 0.83, Y1 = h * 0.15, LM = 0.12;
      const X = l => L0 + l / LM * (L1 - L0), Yv = f => Y0 - f * (Y0 - Y1);
      line(ctx, L0, Y0, L1, Y0, C.muted, 2); line(ctx, L0, Y0, L0, Y1 - 10, C.muted, 2);
      for (let l = 0; l <= 0.12001; l += 0.02) { const x = X(l); line(ctx, x, Y0, x, Y0 + 6, C.muted, 2); T(ctx, l.toFixed(2), x, Y0 + fs * 1.4, { size: fs * 0.85, a: 'center', c: C.muted }); }
      T(ctx, 'Wavelength λ / nm', (L0 + L1) / 2, Y0 + fs * 2.8, { size: fs, a: 'center', c: C.muted });
      ctx.save(); ctx.translate(L0 - fs * 1.2, (Y0 + Y1) / 2); ctx.rotate(-Math.PI / 2); T(ctx, 'Intensity', 0, 0, { size: fs, a: 'center', c: C.muted }); ctx.restore();
      const tg = this.target === 'W' ? { n: 'Tungsten', edge: 69.5, lines: [['α', 0.0209], ['β', 0.0184]] } : { n: 'Molybdenum', edge: 20.0, lines: [['α', 0.0709], ['β', 0.0632]] };
      const lm = 1.24 / this.V, on = this.V >= tg.edge, sc = 0.22 + 0.42 * this.V / 120, sig = 0.0007;
      const I = l => { if (l <= lm) return 0; let v = ((l / lm - 1) / (l * l)) / (1 / (4 * lm * lm)) * sc; if (on) tg.lines.forEach(([, c], i) => { v += (i ? 0.3 : 0.45) * Math.exp(-((l - c) ** 2) / (2 * sig * sig)); }); return Math.min(v, 0.98); };
      const xEnd = L0 + (L1 - L0) * this.prog;
      ctx.beginPath(); ctx.moveTo(L0, Y0); for (let x = L0; x <= xEnd; x += 1) ctx.lineTo(x, Yv(I((x - L0) / (L1 - L0) * LM))); ctx.lineTo(xEnd, Y0); ctx.closePath(); ctx.fillStyle = rgba(C.gold, .16); ctx.fill();
      ctx.beginPath(); for (let x = L0; x <= xEnd; x += 1) { const y = Yv(I((x - L0) / (L1 - L0) * LM)); x === L0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
      const xm = X(lm); line(ctx, xm, Y0, xm, Y1 + fs * 1.5, C.cyan, 2.5, [7, 5]);
      R(ctx, ['λ', '_min', ' = hc/eV = ', lm.toFixed(4), ' nm'], Math.min(xm + 8, w * 0.5), Y1 + fs * 0.8, { size: fs * 1.05, c: C.cyan, w: 700 });
      if (on && this.prog > 0.4) tg.lines.forEach(([n, c]) => { const x = X(c); if (x <= xEnd) R(ctx, ['K', '_' + n], x, Yv(I(c)) - 8, { size: fs * 1.1, a: 'center', w: 700 }); });
      const lx = w * 0.55;
      T(ctx, `Target: ${tg.n}`, lx, Y1 + fs * 3, { size: fs * 1.05, w: 700 });
      T(ctx, 'Smooth curve: continuous spectrum (bremsstrahlung)', lx, Y1 + fs * 4.6, { size: fs * 0.85, c: C.gold });
      T(ctx, on ? 'Sharp peaks: characteristic lines of the target' : `V below ${tg.edge} kV: cannot remove a K-shell electron`, lx, Y1 + fs * 6, { size: fs * 0.85, c: on ? C.ink : C.red });
      if (!on) T(ctx, '→ no characteristic lines', lx, Y1 + fs * 7.3, { size: fs * 0.85, c: C.red });
      T(ctx, `V = ${this.V} kV`, w * 0.94, h * 0.08 + fs, { size: fs * 1.8, f: DISP, w: 700, c: C.gold, a: 'right' });
    } });

  SCENES.shm = () => ({ mode: 'comp', t: 0, trace: [], cmp: false, tt: 0,
    reset() { this.t = 0; this.trace = []; this.tt = 0; },
    set(k, v) { this[k] = v; if (k === 'mode') this.reset(); },
    x(t) { const wt = 5.24 * t; return this.mode === 'comp' ? -Math.cos(wt) : this.mode === 'stretch' ? Math.cos(wt) : Math.sin(wt); },
    draw(ctx, w, h, dt) { this.mode === 'trap' ? this.trap(ctx, w, h, dt) : this.osc(ctx, w, h, dt); },
    osc(ctx, w, h, dt) {
      const fs = FS(w), TMAX = 2.4;
      this.t += dt * 0.3; if (this.t > TMAX + 0.5) { this.t = 0; this.trace = []; }
      const tc = Math.min(this.t, TMAX), xv = this.x(tc);
      const eqx = w * 0.4, Apx = w * 0.16, by = h * 0.25, bw = w * 0.085, bh = h * 0.15, floor = by + bh / 2, bx = eqx + xv * Apx;
      ctx.fillStyle = C.line; ctx.fillRect(w * 0.04, by - bh * 1.1, w * 0.018, bh * 1.6); line(ctx, w * 0.04, floor, w * 0.68, floor, C.muted, 2);
      [[-1, '−A'], [0, '0'], [1, '+A']].forEach(([k, s]) => { const x = eqx + k * Apx; line(ctx, x, by - bh * 0.9, x, floor + 6, rgba(C.muted, .6), 1.5, [5, 5]); T(ctx, s, x, floor + fs * 1.4, { size: fs * 1.05, a: 'center', c: C.muted, w: 700 }); });
      ctx.strokeStyle = '#C9D1C4'; ctx.lineWidth = 2.5; const sx1 = w * 0.058, sx2 = bx - bw / 2; ctx.beginPath(); ctx.moveTo(sx1, by); const n = 16, L = sx2 - sx1; for (let i = 1; i < n; i++) ctx.lineTo(sx1 + L * i / n, by + (i % 2 ? 1 : -1) * h * 0.035); ctx.lineTo(sx2, by); ctx.stroke();
      ctx.fillStyle = C.gold; rrect(ctx, bx - bw / 2, by - bh / 2, bw, bh, 6); ctx.fill(); T(ctx, 'm', bx, by + fs * 0.4, { size: fs * 1.3, a: 'center', c: C.dark, w: 700, f: DISP });
      R(ctx, [{ comp: 'x = −A cos ωt', stretch: 'x = A cos ωt', eq: 'x = A sin ωt' }[this.mode]], w * 0.7, h * 0.13, { size: fs * 1.9, w: 700, f: DISP, c: C.gold });
      T(ctx, { comp: 'Compressed, then released', stretch: 'Stretched, then released', eq: 'Starts at x = 0, moving +' }[this.mode], w * 0.7, h * 0.13 + fs * 1.6, { size: fs * 0.95 });
      R(ctx, ['A = 0.060 m,  ω = 5.24 rad s', '^−1'], w * 0.7, h * 0.13 + fs * 3, { size: fs * 0.85, c: C.muted });
      T(ctx, `t = ${tc.toFixed(2)} s  (slow motion)`, w * 0.7, h * 0.13 + fs * 4.3, { size: fs * 0.85, c: C.muted });
      const G0 = w * 0.1, G1 = w * 0.95, gy = h * 0.71, ay = h * 0.16, X = t => G0 + t / TMAX * (G1 - G0), Y = v => gy - v * ay;
      line(ctx, G0, gy, G1 + 8, gy, C.muted, 2); line(ctx, G0, gy - ay - 14, G0, gy + ay + 14, C.muted, 2);
      T(ctx, 'x', G0 - fs * 0.9, gy - ay - 4, { size: fs * 1.1, a: 'center', c: C.muted, w: 700 }); T(ctx, 't / s', G1, gy + fs * 1.5, { size: fs * 0.9, a: 'right', c: C.muted });
      [1, -1].forEach(k => { line(ctx, G0, Y(k), G1, Y(k), rgba(C.muted, .35), 1, [4, 6]); T(ctx, k > 0 ? '+A' : '−A', G0 - 8, Y(k) + fs * 0.35, { size: fs * 0.85, a: 'right', c: C.muted }); });
      for (let t = 0.5; t <= TMAX; t += 0.5) T(ctx, t.toFixed(1), X(t), gy + fs * 1.4, { size: fs * 0.75, a: 'center', c: C.muted });
      if (this.cmp) [['A sin ωt', t => Math.sin(5.24 * t), C.violet], ['A cos ωt', t => Math.cos(5.24 * t), C.cyan], ['−A cos ωt', t => -Math.cos(5.24 * t), C.gold]].forEach(([lab, f, col], i) => {
        ctx.save(); ctx.setLineDash([6, 6]); ctx.strokeStyle = rgba(col, .75); ctx.lineWidth = 2; ctx.beginPath(); for (let t = 0; t <= TMAX; t += 0.01) { const p = [X(t), Y(f(t))]; t ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.stroke(); ctx.restore();
        T(ctx, lab, G1 - i * fs * 6.2, gy - ay - fs * 0.9, { size: fs * 0.85, c: col, w: 700, a: 'right' });
      });
      this.trace.push([tc, xv]);
      ctx.beginPath(); this.trace.forEach(([t, v], i) => { i ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v)); }); ctx.strokeStyle = C.gold; ctx.lineWidth = 3.5; ctx.stroke();
      dot(ctx, X(tc), Y(xv), 6, C.gold);
      const x0 = this.x(0); ctx.strokeStyle = C.red; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(X(0), Y(x0), 11, 0, 7); ctx.stroke();
      T(ctx, `t = 0:  x = ${x0 > 0.5 ? '+A' : x0 < -0.5 ? '−A' : '0'}`, X(0) + 18, Y(x0) + (x0 < 0 ? fs * 1.4 : x0 > 0 ? -8 : -12), { size: fs, c: C.red, w: 700 });
    },
    trap(ctx, w, h, dt) {
      const fs = FS(w); this.tt += dt; const TH = 8.38, th = Math.min(TH, this.tt * 2.0);
      const cx = w * 0.25, cy = h * 0.53, r = h * 0.3;
      ctx.strokeStyle = rgba(C.muted, .6); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
      line(ctx, cx - r - 10, cy, cx + r + 10, cy, rgba(C.muted, .5), 1.5); line(ctx, cx, cy - r - 10, cx, cy + r + 10, rgba(C.muted, .5), 1.5);
      ctx.beginPath(); for (let a = 0; a <= th; a += 0.02) { const rr = r * 0.55 + a * r * 0.035; ctx.lineTo(cx + rr * Math.cos(-a), cy + rr * Math.sin(-a)); } ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
      line(ctx, cx, cy, cx + r * Math.cos(-th), cy + r * Math.sin(-th), C.gold, 4); dot(ctx, cx + r * Math.cos(-th), cy + r * Math.sin(-th), 7, C.gold);
      const dg = 8.38 * Math.PI / 180; ctx.fillStyle = rgba(C.red, .35); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, 0, -dg, true); ctx.closePath(); ctx.fill(); line(ctx, cx, cy, cx + r * Math.cos(-dg), cy + r * Math.sin(-dg), C.red, 2.5);
      T(ctx, '8.38° (degree mode)', cx + r + 14, cy - 8, { size: fs * 0.9, c: C.red, w: 700 });
      const laps = Math.floor(th / (2 * Math.PI)), rem = th - laps * 2 * Math.PI;
      T(ctx, `ωt = ${th.toFixed(2)} rad`, cx, h * 0.11, { size: fs * 1.7, a: 'center', f: DISP, w: 700, c: C.gold });
      T(ctx, `= ${laps} full turn${laps === 1 ? '' : 's'} + ${(rem * 180 / Math.PI).toFixed(1)}°`, cx, h * 0.11 + fs * 1.5, { size: fs, a: 'center' });
      const sr = Math.sin(TH), sd = Math.sin(TH * Math.PI / 180), k = 0.060 * 5.24, x = w * 0.55, y = h * 0.2;
      R(ctx, ['v = Aω sin ωt'], x, y, { size: fs * 1.7, f: DISP, w: 700, c: C.gold });
      R(ctx, ['= (0.060)(5.24) sin(8.38)'], x, y + fs * 1.9, { size: fs * 1.15 });
      if (this.tt > TH / 2 + 0.3) {
        rrect(ctx, x - 10, y + fs * 3, w * 0.42, fs * 4.2, 8); ctx.fillStyle = rgba(C.green, .14); ctx.fill();
        T(ctx, 'RAD', x, y + fs * 4.4, { size: fs * 1.1, w: 700, c: C.green, f: DISP }); R(ctx, [`sin(8.38) = ${sr.toFixed(3)}`], x + fs * 3, y + fs * 4.4, { size: fs * 1.1 });
        R(ctx, [`v = ${(k * sr).toFixed(3)} m s`, '^−1', '   ✓'], x + fs * 3, y + fs * 6, { size: fs * 1.25, w: 700, c: C.green });
        rrect(ctx, x - 10, y + fs * 7.8, w * 0.42, fs * 4.2, 8); ctx.fillStyle = rgba(C.red, .14); ctx.fill();
        T(ctx, 'DEG', x, y + fs * 9.2, { size: fs * 1.1, w: 700, c: C.red, f: DISP }); R(ctx, [`sin(8.38) = ${sd.toFixed(3)}`], x + fs * 3, y + fs * 9.2, { size: fs * 1.1 });
        R(ctx, [`v = ${(k * sd).toFixed(4)} m s`, '^−1', '   ✗'], x + fs * 3, y + fs * 10.8, { size: fs * 1.25, w: 700, c: C.red });
        R(ctx, ['ω is in rad s', '^−1', ', so ωt is in radians.'], x, y + fs * 13.2, { size: fs * 0.95 });
        T(ctx, 'Press MODE → RAD before any SHM question.', x, y + fs * 14.6, { size: fs * 0.95, c: C.gold, w: 700 });
      }
    } });

  SCENES.doppler = () => ({ mode: 'source', need: true,
    reset() { this.need = true; }, set(k, v) { this[k] = v; this.need = true; },
    init(w) { this.W = w; this.t = 0; this.c = w * 0.16; this.T = 0.55; const m = this.mode; this.vs = (m === 'source' || m === 'both') ? 0.4 * this.c : 0; this.vo = (m === 'observer' || m === 'both') ? 0.4 * this.c : 0; this.sx = this.vs ? w * 0.12 : w * 0.3; this.ox = w * 0.88; this.fr = []; this.hits = []; this.acc = this.T; this.flash = 0; this.need = false; },
    draw(ctx, w, h, dt) {
      if (this.need || this.W !== w) this.init(w);
      const fs = FS(w), cy = h * 0.52;
      this.t += dt; this.sx += this.vs * dt; this.ox -= this.vo * dt; this.acc += dt;
      while (this.acc >= this.T) { this.acc -= this.T; this.fr.push({ x: this.sx, t0: this.t - this.acc, hit: false }); }
      if (this.sx > w * 0.6 || this.ox < w * 0.6 || this.t > 16) this.init(w);
      line(ctx, 0, cy, w, cy, rgba(C.muted, .3), 1.5);
      this.fr = this.fr.filter(f => { const r = this.c * (this.t - f.t0); if (!f.hit && r >= Math.abs(this.ox - f.x)) { f.hit = true; this.hits.push(this.t); this.flash = 1; }
        ctx.strokeStyle = rgba(C.cyan, clamp(1 - r / (w * 1.2), 0, 1) * 0.85); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(f.x, cy, r, 0, 7); ctx.stroke(); return r < w * 1.25; });
      const n = this.fr.length;
      if (n >= 3) { const f1 = this.fr[n - 1], f2 = this.fr[n - 2], r1 = this.c * (this.t - f1.t0), r2 = this.c * (this.t - f2.t0), by = cy + h * 0.2;
        const a1 = f1.x + r1, a2 = f2.x + r2, b1 = f1.x - r1, b2 = f2.x - r2;
        if (a2 < this.ox - 10) { darrow(ctx, a1, by, a2, C.gold, 2, 9); T(ctx, this.vs ? 'λ′ shorter' : 'λ', (a1 + a2) / 2, by + fs * 1.5, { size: fs, a: 'center', c: C.gold, w: 700 }); }
        if (this.vs && b2 > 8) { darrow(ctx, b2, by, b1, C.muted, 2, 9); T(ctx, 'λ′ longer', (b1 + b2) / 2, by + fs * 1.5, { size: fs, a: 'center', c: C.muted, w: 700 }); } }
      const sr = Math.max(10, w * 0.017); dot(ctx, this.sx, cy, sr, C.gold); T(ctx, 'S', this.sx, cy + 1, { size: sr * 1.2, a: 'center', b: 'middle', c: C.dark, w: 700, f: DISP });
      if (this.vs) { arrow(ctx, this.sx + sr + 4, cy - sr * 2.2, this.sx + sr + w * 0.06, cy - sr * 2.2, C.gold, 3, 10); R(ctx, ['v', '_s'], this.sx + sr + w * 0.03, cy - sr * 2.2 - 8, { size: fs, a: 'center', c: C.gold, w: 700 }); }
      this.flash = Math.max(0, this.flash - dt * 3);
      if (this.flash > 0) { ctx.strokeStyle = rgba(C.green, this.flash); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(this.ox, cy, sr + (1 - this.flash) * sr * 2.2, 0, 7); ctx.stroke(); }
      dot(ctx, this.ox, cy, sr, C.green); T(ctx, 'O', this.ox, cy + 1, { size: sr * 1.2, a: 'center', b: 'middle', c: C.dark, w: 700, f: DISP });
      if (this.vo) { arrow(ctx, this.ox - sr - 4, cy - sr * 2.2, this.ox - sr - w * 0.06, cy - sr * 2.2, C.green, 3, 10); R(ctx, ['v', '_o'], this.ox - sr - w * 0.03, cy - sr * 2.2 - 8, { size: fs, a: 'center', c: C.green, w: 700 }); }
      const th = (this.c + this.vo) / (this.c - this.vs);
      let meas = null; const hh = this.hits; if (hh.length >= 4) { const k = hh.length; meas = 3 / (hh[k - 1] - hh[k - 4]) * this.T; }
      T(ctx, `f′ = ${th.toFixed(2)} f`, w * 0.03, h * 0.12, { size: fs * 2.2, f: DISP, w: 700, c: C.gold });
      T(ctx, meas ? `Counted at O: ${meas.toFixed(2)} f` : 'Counted at O: waiting…', w * 0.03, h * 0.12 + fs * 1.6, { size: fs * 0.95, c: C.muted });
      let xx = w * 0.97; if (this.vo) xx -= R(ctx, ['v', '_o', ' = 0.4v'], xx, h * 0.12, { size: fs, a: 'right', c: C.muted }) + fs; if (this.vs) R(ctx, ['v', '_s', ' = 0.4v'], xx, h * 0.12, { size: fs, a: 'right', c: C.muted });
      const msg = { still: ['Both at rest: wavefronts are evenly spaced, f′ = f.'], source: ['Source moves: wavefronts bunch up ahead, so λ′ is shorter and f′ is higher.'],
        observer: ['Observer moves: λ is unchanged, but waves pass O at relative speed v + v', '_o', '.'], both: ['Both effects together: shorter λ′ and higher relative speed.'] }[this.mode];
      R(ctx, msg, w * 0.5, h * 0.95, { size: fs * 1.05, a: 'center' });
    } });

  SCENES.stop = () => ({ Va: 1.0, els: [], acc: 0,
    reset() { this.els = []; }, set(k, v) { this[k] = v; },
    draw(ctx, w, h, dt) {
      const fs = FS(w), K0 = 1.96, x0 = w * 0.16, x1 = w * 0.56, pt = h * 0.12, pb = h * 0.6;
      ctx.fillStyle = '#A3AE9C'; ctx.fillRect(x0 - 12, pt, 12, pb - pt); ctx.fillRect(x1, pt, 12, pb - pt);
      T(ctx, 'Emitter', x0 - 6, pb + fs * 1.4, { size: fs * 0.9, a: 'center', c: C.muted }); T(ctx, 'Collector', x1 + 6, pb + fs * 1.4, { size: fs * 0.9, a: 'center', c: C.muted });
      T(ctx, '+', x0 - 6, pt - 8, { size: fs * 1.5, a: 'center', c: C.red, w: 700 }); T(ctx, '−', x1 + 6, pt - 8, { size: fs * 1.5, a: 'center', c: C.red, w: 700 });
      for (let i = 0; i < 3; i++) wave(ctx, x0 - w * 0.12 + i * 4, pt + h * 0.08 + i * h * 0.15, 0.35, w * 0.09, w * 0.006, C.violet, 2.5);
      T(ctx, 'Light', x0 - w * 0.1, pt + h * 0.02, { size: fs * 0.9, c: C.violet, w: 700 });
      const V = this.Va, base = w * 0.22; this.acc += dt * 3;
      while (this.acc >= 1) { this.acc--; this.els.push({ s: 0, d: 1, y: pt + (pb - pt) * (0.12 + 0.76 * rnd()) }); }
      this.els = this.els.filter(e => { const K = K0 - V * e.s, v = base * Math.sqrt(Math.max(K, 0) / K0) + base * 0.04; if (K <= 0.0001 && e.d > 0) e.d = -1; e.s += e.d * v * dt / (x1 - x0);
        if (e.s >= 1) return false; if (e.s <= 0 && e.d < 0) return false; dot(ctx, x0 + e.s * (x1 - x0), e.y, Math.max(3, w / 300), C.cyan); return true; });
      const ex0 = x0, ex1 = x1, ey0 = h * 0.95, ey1 = h * 0.7, E = v => ey0 - v / 3 * (ey0 - ey1);
      line(ctx, ex0, ey0, ex1, ey0, rgba(C.muted, .7), 1.5);
      line(ctx, ex0, E(K0), ex1, E(K0), C.cyan, 2, [6, 4]); R(ctx, ['K', '_max', ' = 1.96 eV'], ex1 + 8, E(K0) + fs * 0.35, { size: fs * 0.85, c: C.cyan, w: 700 });
      line(ctx, ex0, ey0, ex1, E(V), C.red, 2.5); R(ctx, ['PE gain = eV = ', V.toFixed(2), ' eV'], ex1 + 8, E(V) + fs * 1.1, { size: fs * 0.85, c: C.red, w: 700 });
      if (V > K0) { const sx = ex0 + (K0 / V) * (ex1 - ex0); dot(ctx, sx, E(K0), 5, C.gold); T(ctx, 'electron stops here', sx, E(K0) - 8, { size: fs * 0.8, a: 'center', c: C.gold }); }
      const x = w * 0.66, y = h * 0.17;
      R(ctx, ['K', '_max', ' = 1.96 eV'], x, y, { size: fs * 1.5, w: 700, f: DISP, c: C.cyan }); T(ctx, 'energy', x, y + fs * 1.2, { size: fs * 0.85, c: C.muted });
      T(ctx, `Applied V = ${V.toFixed(2)} V`, x, y + fs * 3, { size: fs * 1.15, w: 700, c: C.red });
      const reach = V < K0 - 0.005, at = Math.abs(V - K0) <= 0.005;
      T(ctx, reach ? 'Electrons reach the collector' : 'No electron reaches the collector', x, y + fs * 4.6, { size: fs, c: reach ? C.green : C.gold, w: 700 });
      T(ctx, reach ? '→ photocurrent flows' : '→ photocurrent = 0', x, y + fs * 5.9, { size: fs, c: reach ? C.green : C.gold, w: 700 });
      R(ctx, ['eV', '_s', ' = K', '_max'], x, y + fs * 8.2, { size: fs * 1.3, w: 700 });
      R(ctx, ['V', '_s', ' = 1.96 V  ✓'], x, y + fs * 9.9, { size: fs * 1.5, w: 700, f: DISP, c: C.green });
      R(ctx, ['V', '_s', ' = 1.96 eV  ✗'], x, y + fs * 11.5, { size: fs * 1.5, w: 700, f: DISP, c: C.red });
      if (at) T(ctx, 'This is the stopping potential', x, y + fs * 13, { size: fs * 0.9, c: C.gold, w: 700 });
    } });

  SCENES.intensity = () => ({ parts: [], acc: 0,
    reset() { this.parts = []; }, set() {},
    draw(ctx, w, h, dt) {
      const fs = FS(w), sx = w * 0.08, sy = h * 0.55, d1 = w * 0.3, s1 = h * 0.16, x1 = sx + d1, x2 = sx + 2 * d1, s2 = 2 * s1, sk = 0.3, half = s2 / 2 / (2 * d1), xe = x2 + w * 0.05;
      ctx.fillStyle = rgba(C.gold, .06); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(xe, sy - (xe - sx) * half); ctx.lineTo(xe, sy + (xe - sx) * half); ctx.closePath(); ctx.fill();
      line(ctx, sx, sy, xe, sy - (xe - sx) * half, rgba(C.gold, .5), 1.5, [5, 5]); line(ctx, sx, sy, xe, sy + (xe - sx) * half, rgba(C.gold, .5), 1.5, [5, 5]);
      this.acc += dt * 45; while (this.acc >= 1) { this.acc--; this.parts.push({ x: sx, k: (rnd() * 2 - 1) * half }); }
      this.parts = this.parts.filter(p => { p.x += w * 0.22 * dt; dot(ctx, p.x, sy + (p.x - sx) * p.k, 2.6, C.gold); return p.x < xe; });
      const scr = (x, s, n) => { const q = s * sk; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.fillStyle = rgba(C.cyan, .12); ctx.beginPath(); ctx.moveTo(x - q / 2, sy - s / 2 + q * 0.3); ctx.lineTo(x + q / 2, sy - s / 2 - q * 0.3); ctx.lineTo(x + q / 2, sy + s / 2 - q * 0.3); ctx.lineTo(x - q / 2, sy + s / 2 + q * 0.3); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (n > 1) { ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, sy - s / 2); ctx.lineTo(x, sy + s / 2); ctx.moveTo(x - q / 2, sy + q * 0.3); ctx.lineTo(x + q / 2, sy - q * 0.3); ctx.stroke(); } };
      scr(x1, s1, 1); scr(x2, s2, 2);
      dot(ctx, sx, sy, 9, C.gold); T(ctx, 'Point source, power P', sx - 6, sy + fs * 2.2, { size: fs * 0.9, c: C.gold, w: 700 });
      const ly = sy + s2 / 2 + fs * 2.4; darrow(ctx, sx, ly, x1, C.muted, 2, 9); T(ctx, 'r', (sx + x1) / 2, ly - 8, { size: fs * 1.1, a: 'center', c: C.muted, w: 700 });
      darrow(ctx, sx, ly + fs * 2, x2, C.muted, 2, 9); T(ctx, '2r', (sx + x2) / 2, ly + fs * 2 - 8, { size: fs * 1.1, a: 'center', c: C.muted, w: 700 });
      T(ctx, 'Area A', x1, sy - s1 / 2 - fs * 1.2, { size: fs, a: 'center', c: C.cyan, w: 700 }); T(ctx, 'Area 4A', x2, sy - s2 / 2 - fs * 1.2, { size: fs, a: 'center', c: C.cyan, w: 700 });
      const x = w * 0.04, y = h * 0.13, wI = R(ctx, ['I = '], 0, 0, { size: fs * 1.7, f: DISP, w: 700, measure: true });
      R(ctx, ['I ='], x, y + fs * 0.4, { size: fs * 1.7, f: DISP, w: 700, c: C.gold }); FR(ctx, ['P'], ['4πr', '^2'], x + wI + 4, y, { size: fs * 1.4, w: 700, c: C.gold });
      R(ctx, ['Unit: W m', '^−2', '  ✓'], w * 0.33, y - fs * 0.2, { size: fs * 1.3, w: 700, c: C.green });
      R(ctx, ['W m', '^−1', '  ✗'], w * 0.33, y + fs * 1.4, { size: fs * 1.3, w: 700, c: C.red });
      T(ctx, 'Same power over 4× the area,', w * 0.64, y - fs * 0.2, { size: fs * 1.05 }); T(ctx, 'so intensity falls to ¼.', w * 0.64, y + fs * 1.2, { size: fs * 1.05 });
    } });

  SCENES.film = () => ({ mode: 'none', tt: 0,
    reset() { this.tt = 0; },
    set(k, v) { this[k] = v; this.tt = 0; },
    draw(ctx, w, h, dt) {
      this.tt += dt;
      if (this.mode === 'inside' || this.mode === 'extra') this.lanes(ctx, w, h); else this.slits(ctx, w, h);
    },
    slits(ctx, w, h) {
      const fs = FS(w), cy = h * 0.5, bx = w * 0.24, s1 = cy - h * 0.075, s2 = cy + h * 0.075, sx = w * 0.78, sw = w * 0.028, sp = h * 0.062;
      const film = this.mode === 'shift', lam = Math.max(16, w * 0.032), t = this.tt;
      for (let k = 0; k < 6; k++) { const x = w * 0.04 + ((t * lam * 1.4 + k * lam) % (bx - w * 0.06)); line(ctx, x, cy - h * 0.25, x, cy + h * 0.25, rgba(C.muted, .55), 1.4); }
      if (w > 520) T(ctx, 'monochromatic light', w * 0.04, cy - h * 0.29, { size: fs * 0.8, c: C.muted });
      ctx.save(); ctx.beginPath(); ctx.rect(bx + 3, h * 0.06, sx - bx - 3, h * 0.84); ctx.clip();
      const ph = (t * lam * 1.4) % lam;
      [[s1, C.gold, film ? lam * 0.5 : 0], [s2, C.cyan, 0]].forEach(([y, c, lag]) => { ctx.strokeStyle = rgba(c, .38); ctx.lineWidth = 1.4;
        for (let r = ph - lag; r < w; r += lam) { if (r <= 2) continue; ctx.beginPath(); ctx.arc(bx, y, r, -1.15, 1.15); ctx.stroke(); } });
      ctx.restore();
      ctx.fillStyle = C.ink; ctx.fillRect(bx - 3, h * 0.06, 6, s1 - h * 0.03 - h * 0.06); ctx.fillRect(bx - 3, s1 + h * 0.03, 6, s2 - s1 - h * 0.06); ctx.fillRect(bx - 3, s2 + h * 0.03, 6, h * 0.9 - s2 - h * 0.03);
      R(ctx, ['S', '_1'], bx - 10, s1 + fs * 0.35, { size: fs * 1.1, a: 'right', c: C.gold, w: 700 }); R(ctx, ['S', '_2'], bx - 10, s2 + fs * 0.35, { size: fs * 1.1, a: 'right', c: C.cyan, w: 700 });
      let shift = 0;
      if (film) { const p = clamp((t % 8 - 1) / 3, 0, 1); shift = 5 * (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
        ctx.fillStyle = rgba(C.green, .9); ctx.fillRect(bx + 4, s1 - h * 0.035, w * 0.012, h * 0.07); T(ctx, 'film', bx + w * 0.02, s1 - h * 0.075, { size: fs * 0.85, c: C.green, w: 700 }); }
      const top = h * 0.06, bot = h * 0.9, centre = cy - shift * sp;
      ctx.fillStyle = '#05080A'; ctx.fillRect(sx, top, sw, bot - top);
      for (let y = top; y < bot; y++) { const I = Math.pow(Math.cos(Math.PI * (y - centre) / sp), 2); ctx.fillStyle = rgba(C.gold, I * .95); ctx.fillRect(sx, y, sw, 1); }
      const P5 = cy - 5 * sp;
      for (let m = 1; m <= 5; m++) line(ctx, sx + sw, cy - m * sp, sx + sw + 6, cy - m * sp, C.muted, 1.5);
      T(ctx, 'O', sx + sw + 10, cy + fs * 0.35, { size: fs, w: 700 }); R(ctx, w > 600 ? ['P', '_5', '  (old 5th bright)'] : ['P', '_5'], sx + sw + 10, P5 + fs * 0.35, { size: fs * 0.85, w: 700 });
      const yP = film ? centre : cy; line(ctx, bx, s1, sx, yP, C.gold, 2); line(ctx, bx, s2, sx, yP, C.cyan, 2);
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(sx - 4, centre); ctx.lineTo(sx - 16, centre - 7); ctx.lineTo(sx - 16, centre + 7); ctx.fill();
      T(ctx, 'central', sx - 20, centre - 10, { size: fs * 0.8, a: 'right', c: C.ink });
      const cap = film ? (shift > 4.95 ? 'Central fringe now at P₅:  (n − 1)t = 5λ' : 'Film delays S₁ by (n − 1)t → pattern slides towards S₁')
                       : 'S₁O = S₂O → path difference 0 → O is the central bright fringe';
      T(ctx, cap, (bx + sx) / 2, h * 0.96, { size: fs * 1.0, a: 'center', c: film && shift > 4.95 ? C.gold : C.ink, w: 700 });
    },
    lanes(ctx, w, h) {
      const fs = FS(w), x0 = w * 0.1, L = w * 0.6, amp = h * 0.085, t = this.tt, ext = this.mode === 'extra';
      [[h * 0.3, 'Through AIR', L / 3, '3 waves  (t / λ)', C.muted], [h * 0.68, 'Through FILM  (n = 1.50)', L / 4.5, '4.5 waves  (nt / λ)', C.green]].forEach(([y, nm, lam, cnt, col], i) => {
        if (i) { ctx.fillStyle = rgba(C.green, .14); ctx.fillRect(x0, y - amp * 1.5, L, amp * 3); }
        if (i && ext) { ctx.fillStyle = rgba(C.gold, .28); ctx.fillRect(x0 + L * 2 / 3, y - amp * 1.5, L / 3, amp * 3); T(ctx, '1.5 extra waves', x0 + L * 5 / 6, y - amp * 1.75, { size: fs * 0.9, a: 'center', c: C.gold, w: 700 }); }
        line(ctx, x0, y - amp * 1.5, x0, y + amp * 1.5, C.ink, 2); line(ctx, x0 + L, y - amp * 1.5, x0 + L, y + amp * 1.5, C.ink, 2);
        T(ctx, nm, x0, y - amp * 1.75, { size: fs, c: i ? C.green : C.ink, w: 700 });
        ctx.strokeStyle = C.red; ctx.lineWidth = 2.5; ctx.beginPath();
        for (let x = 0; x <= L; x += 2) { const yy = y - amp * Math.sin(2 * Math.PI * (x / lam - t * 0.6)); x ? ctx.lineTo(x0 + x, yy) : ctx.moveTo(x0 + x, yy); } ctx.stroke();
        for (let x = 0; x <= L + 0.1; x += lam) line(ctx, x0 + x, y + amp * 1.2, x0 + x, y + amp * 1.45, C.ink, 2);
        T(ctx, cnt, x0 + L + fs, y + fs * 0.35, { size: fs, w: 700, c: i ? C.green : C.ink });
      });
      darrow(ctx, x0, h * 0.92, x0 + L, C.muted, 1.6, 9); T(ctx, 'same thickness t', x0 + L / 2, h * 0.9, { size: fs * 0.9, a: 'center', c: C.muted });
      if (ext) { const x = x0 + L + fs, y = h * 0.5; R(ctx, ['extra = nt − t'], x, y - fs * 0.6, { size: fs * 1.1, w: 700, c: C.gold }); R(ctx, ['= (n − 1)t'], x, y + fs * 1.0, { size: fs * 1.5, w: 700, f: DISP, c: C.gold }); }
      else T(ctx, 'λ in film = λ / n', x0 + L + fs, h * 0.5, { size: fs * 1.05, w: 700, c: C.green });
    } });

  SCENES.round = () => ({ rt: 0,
    reset() { this.rt = 0; }, set() {},
    draw(ctx, w, h, dt) {
      this.rt += dt; const fs = clamp(w / 46, 13, 26), st = Math.floor(this.rt / 1.1);
      T(ctx, 'Two-step Doppler answer', w * 0.05, h * 0.1, { size: fs * 1.4, f: DISP, w: 700, c: C.gold });
      const wh = R(ctx, ['f', '_2', ' = f', '_1', ' × '], w * 0.05, h * 0.19, { size: fs }); FR(ctx, ['1515'], ['1495'], w * 0.05 + wh, h * 0.19 - fs * 0.3, { size: fs * 0.85 });
      [[w * 0.05, 'Round too early', C.red, '1.01', '1.0235', '1.02', '✗'], [w * 0.53, 'Keep 4 s.f.', C.green, '1.013', '1.0270', '1.03', '✓']].forEach(([x, hd, col, a, b, c, m]) => {
        rrect(ctx, x - 12, h * 0.27, w * 0.43, h * 0.58, 10); ctx.fillStyle = rgba(col, .1); ctx.fill(); ctx.strokeStyle = rgba(col, .55); ctx.lineWidth = 2; ctx.stroke();
        T(ctx, hd, x, h * 0.27 + fs * 1.6, { size: fs * 1.2, f: DISP, w: 700, c: col });
        [['f', '_1', ' = ' + a + ' × 10', '^4', ' Hz'], ['f', '_2', ' = ' + a + ' × 10', '^4', ' × 1515 / 1495'], ['    = ' + b + ' × 10', '^4', ' Hz'], ['    ≈ ' + c + ' × 10', '^4', ' Hz   ' + m]].forEach((r, i) => {
          if (st > i) R(ctx, r, x, h * 0.27 + fs * (3.4 + i * 1.9), { size: i === 3 ? fs * 1.25 : fs, w: i === 3 ? 700 : 600, c: i === 3 ? col : C.ink, f: i === 3 ? DISP : BODY });
        });
      });
      if (st > 4) T(ctx, 'Keep ≥ 4 s.f. in the working. Round to 3 s.f. only at the final answer.', w * 0.5, h * 0.94, { size: fs * 0.85, a: 'center', c: C.gold, w: 700 });
    } });

  SCENES.decay = () => ({ heat: false,
    reset() { this.t = 0; this.N = 200; this.nuc = Array.from({ length: 200 }, () => ({ d: false, f: 0 })); this.parts = []; this.data = [[0, 200]]; this.nd = 0.25; },
    set(k, v) { this[k] = v; },
    draw(ctx, w, h, dt) {
      if (!this.nuc) this.reset();
      const fs = FS(w), lam = Math.log(2) / 5, TM = 25;
      if (this.t < TM) { this.t += dt;
        this.nuc.forEach((n, i) => { if (!n.d && rnd() < lam * dt) { n.d = true; n.f = 1; this.N--; this.parts.push({ i, a: rnd() * Math.PI * 2, age: 0 }); } });
        while (this.t >= this.nd) { this.data.push([this.nd, this.N]); this.nd += 0.25; } }
      const cs = Math.min(w * 0.52 / 20, h * 0.6 / 10), gx = w * 0.04, gy = h * 0.2, rad = cs * 0.36, pos = i => [gx + (i % 20 + 0.5) * cs, gy + (Math.floor(i / 20) + 0.5) * cs];
      if (this.heat) { ctx.fillStyle = rgba(C.red, .1); ctx.fillRect(gx - 8, gy - 8, cs * 20 + 16, cs * 10 + 16); ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.strokeRect(gx - 8, gy - 8, cs * 20 + 16, cs * 10 + 16); }
      this.nuc.forEach((n, i) => { const [x, y] = pos(i); n.d ? dot(ctx, x, y, rad * 0.8, rgba(C.cyan, .55)) : dot(ctx, x, y, rad, C.gold);
        if (n.f > 0) { n.f = Math.max(0, n.f - dt * 1.5); ctx.strokeStyle = rgba(C.ink, n.f); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, rad + (1 - n.f) * cs * 0.9, 0, 7); ctx.stroke(); } });
      this.parts = this.parts.filter(p => { p.age += dt; const [x, y] = pos(p.i), d = p.age * w * 0.25; dot(ctx, x + Math.cos(p.a) * d, y + Math.sin(p.a) * d, 3, rgba(C.red, clamp(1 - p.age / 0.9, 0, 1))); return p.age < 0.9; });
      const ly = gy + cs * 10 + fs * 1.8; let lx = gx;
      [[C.gold, 'Undecayed parent'], [rgba(C.cyan, .55), 'Daughter nuclide'], [C.red, 'α / β emitted']].forEach(([c, s]) => { dot(ctx, lx + 6, ly - fs * 0.35, 6, c); lx += 16 + T(ctx, s, lx + 16, ly, { size: fs * 0.85, c: C.muted }) + 22; });
      const nw = T(ctx, `N = ${this.N}`, gx, h * 0.12, { size: fs * 2, f: DISP, w: 700, c: C.gold });
      T(ctx, `undecayed    t = ${Math.min(this.t, TM).toFixed(1)} s    half-life = 5.0 s`, gx + nw + fs * 0.6, h * 0.12, { size: fs * 0.95, c: C.muted });
      if (this.heat) T(ctx, 'Temperature and pressure raised: decay rate unchanged', gx, h * 0.12 + fs * 1.7, { size: fs * 0.95, c: C.red, w: 700 });
      const G0 = w * 0.64, G1 = w * 0.96, Y0 = h * 0.82, Y1 = h * 0.2, X = t => G0 + t / TM * (G1 - G0), Y = n => Y0 - n / 200 * (Y0 - Y1);
      line(ctx, G0, Y0, G1, Y0, C.muted, 2); line(ctx, G0, Y0, G0, Y1 - 8, C.muted, 2);
      T(ctx, 'N', G0, Y1 - fs * 0.9, { size: fs, a: 'center', c: C.muted, w: 700 }); T(ctx, 't / s', G1, Y0 + fs * 1.5, { size: fs * 0.85, a: 'right', c: C.muted });
      [0, 5, 10, 15, 20, 25].forEach(t => T(ctx, String(t), X(t), Y0 + fs * 1.5, { size: fs * 0.75, a: 'center', c: C.muted }));
      [200, 100, 50].forEach(n => T(ctx, String(n), G0 - 6, Y(n) + fs * 0.3, { size: fs * 0.75, a: 'right', c: C.muted }));
      [[5, 100, ['N', '_0', '/2']], [10, 50, ['N', '_0', '/4']]].forEach(([t, n, s]) => { line(ctx, G0, Y(n), X(t), Y(n), rgba(C.muted, .45), 1, [4, 4]); line(ctx, X(t), Y(n), X(t), Y0, rgba(C.muted, .45), 1, [4, 4]); R(ctx, s, X(t) + 5, Y(n) - 5, { size: fs * 0.8, c: C.muted }); });
      ctx.beginPath(); for (let t = 0; t <= TM; t += 0.1) { const p = [X(t), Y(200 * Math.exp(-lam * t))]; t ? ctx.lineTo(...p) : ctx.moveTo(...p); } ctx.strokeStyle = rgba(C.cyan, .75); ctx.setLineDash([6, 5]); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); this.data.forEach(([t, n], i) => { i ? ctx.lineTo(X(t), Y(n)) : ctx.moveTo(X(t), Y(n)); }); ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.stroke();
      T(ctx, '— counted', G1, Y1 + fs * 0.2, { size: fs * 0.8, a: 'right', c: C.gold, w: 700 });
      R(ctx, ['- - N = N', '_0', 'e', '^−λt'], G1, Y1 + fs * 1.6, { size: fs * 0.8, a: 'right', c: C.cyan, w: 700 });
      T(ctx, 'Activity ∝ N', (G0 + G1) / 2, h * 0.95, { size: fs * 1.2, a: 'center', c: C.gold, w: 700, f: DISP });
    } });

  /* ---------- topic content: title, chapter, key equation and teaching points ---------- */
  const FRAC = (a, b) => `<span class="cc-frac"><span>${a}</span><span>${b}</span></span>`;
  const TOPICS = {
    shm: { sem: '3', lesson: 'LESSON-S3-20', title: 'SHM: choose the right equation', ch: 20, sub: 'The starting position decides sine or cosine, and the sign',
      eq: 'x = −A cos ωt', eqn: 'Compressed, then released: x = −A at t = 0',
      pts: ['Ask first: where is the object at t = 0?', 'Released from <b>compression</b>: starts at x = −A, so x = −A cos ωt.', 'Released from <b>stretch</b>: starts at x = +A, so x = A cos ωt.',
        'Starts at equilibrium moving in the + direction: x = A sin ωt.', 'Check: put t = 0 into your equation. It must give the starting position.', 'v = dx/dt. For x = −A cos ωt, v = Aω sin ωt.',
        'ω is in rad s<sup>−1</sup>, so ωt is in <b>radians</b>. Set the calculator to RAD first.'],
      segs: [['mode', [['comp', 'Released from compression'], ['stretch', 'Released from stretch'], ['eq', 'Starts at 0, moving +'], ['trap', 'Radian trap']]]], toggles: [['cmp', 'Compare sin & cos']] },
    intensity: { sem: '3', lesson: 'LESSON-S3-21', title: 'Wave intensity: W m⁻²', ch: 21, sub: 'Power spreads over a sphere', eq: 'I = ' + FRAC('P', '4πr<sup>2</sup>'), eqn: 'Point source radiating power P equally in all directions',
      pts: ['Intensity is power per unit area. Its unit is <b>W m<sup>−2</sup></b>, not W m<sup>−1</sup>.', 'From a point source, the power spreads over a sphere of area 4πr<sup>2</sup>.', 'So I ∝ 1/r<sup>2</sup>: doubling r spreads the same power over 4 times the area, and I falls to ¼.'] },
    doppler: { sem: '3', lesson: 'LESSON-S3-22', title: 'Doppler effect', ch: 22, sub: 'Explain each motion separately in Section C', eq: 'f′ = ' + FRAC('v + v<sub>o</sub>', 'v − v<sub>s</sub>') + ' f', eqn: 'Source and observer moving towards each other',
      pts: ['<b>Moving source</b>: each new wavefront is emitted closer to the one before, so the wavefronts bunch up ahead.', 'The wavelength in front decreases: λ′ = (v − v<sub>s</sub>) / f.', 'The speed of sound in air does not change with the source’s motion.',
        '<b>Moving observer</b>: the wavelength is unchanged, but the waves pass the observer at relative speed v + v<sub>o</sub>.', 'So the observer meets more wavefronts per second: f′ = (v + v<sub>o</sub>) / λ.'],
      segs: [['mode', [['still', 'Both at rest'], ['source', 'Source moves'], ['observer', 'Observer moves'], ['both', 'Both move']], 'source']] },
    film: { sem: '3', lesson: 'LESSON-S3-24', title: 'Film over one slit: why (n − 1)t', ch: 24, sub: 'Young’s double slit with a thin film over one slit', eq: '(n − 1)t = Nλ', eqn: 'The pattern moves N fringes towards the covered slit',
      pts: ['Without the film, S<sub>1</sub>O = S<sub>2</sub>O, so O is the central bright fringe (path difference 0). The 5th bright fringe P<sub>5</sub> is where S<sub>2</sub>P − S<sub>1</sub>P = 5λ.',
        'In the film, light slows to c/n but its frequency does not change, so its wavelength shrinks to λ/n.', 'More waves fit into the thickness t: t/λ waves in air, but nt/λ waves in the film. Optical path = n × thickness.',
        'The film <b>replaces</b> a layer of air of the same thickness. Extra optical path = nt − t = <b>(n − 1)t</b>, not nt. Check: n = 1 gives no change.',
        'The central fringe still needs zero total path difference, so it moves towards the <b>covered slit</b>, to where S<sub>2</sub>P − S<sub>1</sub>P = (n − 1)t. The fringe separation does not change.',
        'It lands on the old 5th bright fringe: (n − 1)t = 5λ, so t = 5(590 × 10<sup>−9</sup>) / (1.50 − 1) = <b>5.90 × 10<sup>−6</sup> m</b>.'],
      segs: [['mode', [['none', 'No film'], ['inside', 'Inside the film'], ['extra', 'Why n − 1'], ['shift', 'Fringes move']]]] },
    xray: { sem: '3', lesson: 'LESSON-S3-25', title: 'Production of X-rays', ch: 25, sub: 'Continuous and characteristic spectra', eq: 'λ<sub>min</sub> = ' + FRAC('hc', 'eV'), eqn: 'One electron loses all its kinetic energy eV in a single collision',
      pts: ['Electrons leave the heated filament by thermionic emission.', 'A high p.d. V accelerates them across the vacuum, so each gains kinetic energy eV.', 'Electrons decelerate in the target and emit a <b>continuous spectrum</b> (bremsstrahlung).',
        'The shortest wavelength is λ<sub>min</sub>, when all of eV becomes one photon.', '<b>Characteristic lines</b>: an electron knocks out a K-shell electron, an outer electron drops into the gap and emits a photon of fixed energy.',
        'Increase V: λ<sub>min</sub> decreases and intensity increases. The lines do not move.', 'Change the target metal: the lines move. λ<sub>min</sub> stays the same.', 'About 99% of the energy becomes heat, so the anode must be cooled.'],
      segs: [['mode', [['tube', 'X-ray tube'], ['spectrum', 'Spectrum']]], ['target', [['W', 'Tungsten'], ['Mo', 'Molybdenum']]]], sliders: [['V', 'Tube p.d.', 20, 120, 1, 80, 'kV', 0]] },
    stop: { sem: '3', lesson: 'LESSON-S3-25', title: 'Stopping potential: V, not eV', ch: 25, sub: 'Photoelectric effect', eq: 'eV<sub>s</sub> = K<sub>max</sub>', eqn: 'K<sub>max</sub> = 1.96 eV (energy) gives V<sub>s</sub> = 1.96 V (potential difference)',
      pts: ['Stopping potential is a potential difference. Its unit is <b>V</b>, never eV.', 'The electronvolt (eV) is a unit of energy: 1 eV = 1.60 × 10<sup>−19</sup> J.', 'At the stopping potential the fastest photoelectrons just fail to reach the collector, so the photocurrent is zero.', 'eV<sub>s</sub> = K<sub>max</sub>, so K<sub>max</sub> = 1.96 eV gives V<sub>s</sub> = 1.96 V.'],
      sliders: [['Va', 'Retarding p.d.', 0, 3, 0.01, 1, 'V', 2]] },
    decay: { sem: '3', lesson: 'LESSON-S3-26', title: 'Radioactive decay', ch: 26, sub: 'The four marking points for the definition', eq: FRAC('dN', 'dt') + ' = −λN', eqn: 'Rate of decay is proportional to the number of undecayed nuclei',
      pts: ['An unstable nucleus emits <b>α, β or γ radiation</b>.', 'It becomes a different, more stable <b>daughter nuclide</b>.', 'The decay is spontaneous: it is <b>not affected by physical conditions</b> such as temperature and pressure.',
        'The rate of decay is <b>proportional to the number of undecayed nuclei</b>.', 'The decay is random: we cannot predict which nucleus decays next, only the fraction that decays.'],
      toggles: [['heat', 'Raise temperature & pressure']] },
    round: { sem: '3', lesson: null, title: 'Rounding: keep 4 s.f.', ch: 0, sub: 'Every chapter', eq: 'Working ≥ 4 s.f. · Final answer 3 s.f.', eqn: 'Early rounding changes the final answer',
      pts: ['Keep at least <b>4 significant figures</b> in all working.', 'Carry the unrounded value from an earlier part into the next part (use the calculator memory).', 'Round only the final answer, normally to 3 s.f., and always give the unit.'] }
  };
  // Semester 1 topics are added by physiq-clinic-s1.js through PhysiQClinic.add()
  const order = sem => Object.keys(TOPICS).filter(k => TOPICS[k].sem === String(sem));
  const lessonTopics = k => Object.keys(TOPICS).filter(t => TOPICS[t].lesson === k);
  const chLabel = t => t.ch ? `Chapter ${t.ch}` : 'All chapters';

  /* ---------- widget ---------- */
  const LIVE = new Set();
  const reduce = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.target._cc) e.target._cc.vis = e.isIntersecting; }), { rootMargin: '100px' }) : null;

  function widget(key) {
    const t = TOPICS[key], sc = SCENES[key](); if (sc.reset) sc.reset();
    const root = document.createElement('div'); root.className = 'cc-w'; root.dataset.topic = key;
    const segs = (t.segs || []).map(([k, opts, def]) => `<div class="cc-seg" role="group" data-k="${k}">${opts.map(([v, l], i) => `<button type="button" data-v="${v}" aria-pressed="${def ? v === def : i === 0}">${esc(l)}</button>`).join('')}</div>`).join('');
    const sls = (t.sliders || []).map(([k, l, mn, mx, st, v, u, d]) => `<label class="cc-sl">${esc(l)} <input type="range" data-k="${k}" min="${mn}" max="${mx}" step="${st}" value="${v}"><output>${(+v).toFixed(d)}${u === '°' ? '' : ' '}${u}</output></label>`).join('');
    const tgs = (t.toggles || []).map(([k, l]) => `<button type="button" class="cc-btn cc-tg" data-k="${k}" aria-pressed="false">${esc(l)}</button>`).join('');
    const fsOk = !!(document.fullscreenEnabled && root.requestFullscreen);
    root.innerHTML = `<div class="cc-top"><span class="cc-tag">Concept Clinic</span><span class="cc-ch">${chLabel(t)}</span></div>
<h4 class="cc-t">${t.title}</h4><p class="cc-s">${t.sub}</p>
<div class="cc-grid"><div class="cc-stage"><div class="cc-cv"><canvas aria-label="${esc(t.title)} animation" role="img"></canvas></div>
<div class="cc-ctl">${segs}${sls}${tgs}</div>
<div class="cc-ctl cc-run"><button type="button" class="cc-btn cc-main" data-a="play">${reduce ? 'Play' : 'Pause'}</button><button type="button" class="cc-btn" data-a="restart">Restart</button>${fsOk ? '<button type="button" class="cc-btn" data-a="full">Full screen</button>' : ''}</div></div>
<aside class="cc-side"><div class="cc-eq"><div>${t.eq}</div><small>${t.eqn}</small></div><ol class="cc-pts">${t.pts.map(p => `<li><span>${p}</span></li>`).join('')}</ol>
<div class="cc-ctl"><button type="button" class="cc-btn" data-a="next">Next point</button><button type="button" class="cc-btn" data-a="all">Show all</button></div></aside></div>`;
    const inst = { root, sc, cv: root.querySelector('canvas'), play: !reduce, vis: true, step: -1 };
    root._cc = inst;
    const playBtn = root.querySelector('[data-a="play"]'), lis = [...root.querySelectorAll('.cc-pts li')];
    root.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const seg = b.closest('.cc-seg');
      if (seg) { seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); sc.set(seg.dataset.k, b.dataset.v); return; }
      if (b.classList.contains('cc-tg')) { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); sc.set(b.dataset.k, on); return; }
      const a = b.dataset.a;
      if (a === 'play') { inst.play = !inst.play; playBtn.textContent = inst.play ? 'Pause' : 'Play'; }
      else if (a === 'restart') sc.reset();
      else if (a === 'full') { try { const p = document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen(); if (p && p.catch) p.catch(() => {}); } catch (err) {} }
      else if (a === 'next') { root.classList.add('cc-stepping'); inst.step = (inst.step + 1) % lis.length; lis.forEach((l, i) => { l.classList.toggle('cur', i === inst.step); l.classList.toggle('done', i < inst.step); }); }
      else if (a === 'all') { root.classList.remove('cc-stepping'); inst.step = -1; lis.forEach(l => l.classList.remove('cur', 'done')); }
    });
    root.querySelectorAll('.cc-sl input').forEach(inp => {
      const sl = t.sliders.find(s => s[0] === inp.dataset.k), out = inp.parentNode.querySelector('output');
      inp.addEventListener('input', () => { out.textContent = (+inp.value).toFixed(sl[7]) + (sl[6] === '°' ? '' : ' ') + sl[6]; sc.set(inp.dataset.k, +inp.value); });
    });
    LIVE.add(inst); if (io) io.observe(root);
    return root;
  }

  let last = 0, running = false;
  function frame(now) {
    const dt0 = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
    LIVE.forEach(inst => {
      if (!inst.root.isConnected) { LIVE.delete(inst); if (io) io.unobserve(inst.root); return; }
      if (!inst.vis && inst.drawn) return;
      const cv = inst.cv, r = cv.getBoundingClientRect(); if (!r.width) return;
      const d = window.devicePixelRatio || 1, W = Math.round(r.width * d), H = Math.round(r.height * d);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      const ctx = cv.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0); ctx.fillStyle = C.bg; ctx.fillRect(0, 0, r.width, r.height);
      try { inst.sc.draw(ctx, r.width, r.height, inst.play ? dt0 : 0); } catch (e) { if (window.console) console.error(e); }
      inst.drawn = true;
    });
    if (LIVE.size) requestAnimationFrame(frame); else { running = false; last = 0; }
  }
  function kick() { if (!running) { running = true; last = 0; requestAnimationFrame(frame); } }

  function mountAll(scope) {
    (scope || document).querySelectorAll('.cc-mount[data-cc]:not([data-on])').forEach(m => {
      m.dataset.on = '1'; m.dataset.cc.split(',').forEach(k => { if (TOPICS[k]) m.appendChild(widget(k)); });
    });
    kick();
  }

  // Concept Clinic page in Notes
  function mount(box, sem) {
    const s = String(sem || '3'), ORDER = order(s);
    if (!ORDER.length) { box.innerHTML = '<p class="empty">The Concept Clinic is not ready for this semester yet.</p>'; return; }
    box.innerHTML = `<div class="cc-page"><header class="cc-head"><div class="cc-k">Semester ${s} · ${ORDER.length} animations</div><h2 class="cc-title">Concept Clinic</h2>
<p class="cc-sub">Animated fixes for the concepts where marks are most often lost. Pick a topic, watch the animation, then go through the points.</p>
<nav class="cc-jump">${ORDER.map((k, i) => `<button type="button" data-cc-go="${k}" aria-pressed="${i === 0}"><span>${TOPICS[k].ch || 'All'}</span>${esc(TOPICS[k].title)}</button>`).join('')}</nav></header>
<div class="cc-host"></div></div>`;
    const host = box.querySelector('.cc-host');
    const show = k => { host.innerHTML = ''; host.appendChild(widget(k)); kick(); box.querySelectorAll('[data-cc-go]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ccGo === k)); };
    box.querySelector('.cc-jump').addEventListener('click', e => { const b = e.target.closest('[data-cc-go]'); if (b) show(b.dataset.ccGo); });
    show(ORDER[0]);
  }

  // the chapter's animations at the end of its full notes
  function forLesson(k) {
    const list = lessonTopics(k); if (!list.length) return '';
    return `<section class="ls-sec cc-lesson" id="ls-cc"><h3 class="ls-h">Concept Clinic</h3>
<p class="cc-lsub">Animated fixes for the mistakes students make most often in this chapter.</p><div class="cc-mount" data-cc="${list.join(',')}"></div></section>`;
  }
  const hasLesson = k => lessonTopics(k).length > 0;

  const has = sem => order(sem).length > 0;
  const add = (key, topic, scene) => { TOPICS[key] = topic; SCENES[key] = scene; };
  const U = { C, DISP, BODY, clamp, rnd, rgba, FS, T, R, FR, arrow, darrow, line, dot, rrect, lead, wave };
  window.PhysiQClinic = { mount, mountAll, forLesson, hasLesson, has, add, U, topics: TOPICS };
})();
