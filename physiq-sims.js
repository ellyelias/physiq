/* PhysiQ simulations: drawn on <canvas> inside lesson notes (<div class="ls-sim" data-sim="...">).
   graphs     – s–t, v–t, a–t drawn live for uniform velocity / acceleration / deceleration
   vertical   – free fall and vertical throws, from the ground or from a height
   projectile – launcher with components, compare-angles and air resistance
   Self-contained; each animation stops itself when its canvas leaves the page. */
(function () {
  'use strict';
  const g = 9.81;
  const COL = { ink: '#1C2230', sub: '#5A6170', grid: '#E6E9DC', axis: '#9AA08C', v: '#6A63EC', o: '#F2661B', r: '#C0392B', gr: '#3E8E1E', ball: '#2BB3A3', fill: 'rgba(106,99,236,.18)', fillN: 'rgba(242,102,27,.18)', dark: '#1D2B1F', lime: '#D5DC3B' };
  const fmt = (x, d = 2) => (Math.abs(x) < 1e-9 ? 0 : x).toFixed(d).replace('-', '−');
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  // ---------- UI helpers ----------
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function slider(parent, label, min, max, step, val, unit, on) {
    const w = el('label', 'sm-sl');
    w.innerHTML = `<span class="sm-sl-l">${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}"><output></output>`;
    const inp = w.querySelector('input'), out = w.querySelector('output');
    const show = () => { out.innerHTML = fmt(+inp.value, step < 1 ? (step < 0.1 ? 2 : 1) : 0) + (unit ? ' ' + unit : ''); };
    inp.addEventListener('input', () => { show(); on(+inp.value); }); show(); parent.appendChild(w);
    return { set(v) { inp.value = v; show(); }, get: () => +inp.value };
  }
  function toggle(parent, label, val, on) {
    const b = el('button', 'sm-tg' + (val ? ' on' : ''), label); b.type = 'button'; b.setAttribute('aria-pressed', val);
    b.addEventListener('click', () => { val = !val; b.classList.toggle('on', val); b.setAttribute('aria-pressed', val); on(val); });
    parent.appendChild(b); return { set(v) { val = v; b.classList.toggle('on', v); b.setAttribute('aria-pressed', v); } };
  }
  function button(parent, label, cls, on) { const b = el('button', 'sm-btn ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', on); parent.appendChild(b); return b; }
  function canvas(parent, cls) {
    const c = el('canvas', 'sm-cv ' + (cls || '')); parent.appendChild(c);
    const ctx = c.getContext('2d');
    return {
      c, ctx,
      size(hRatio, minH, maxH) {
        const w = Math.max(240, c.parentNode.clientWidth || 600), h = clamp(Math.round(w * hRatio), minH || 160, maxH || 520), d = window.devicePixelRatio || 1;
        if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) { c.width = Math.round(w * d); c.height = Math.round(h * d); c.style.height = h + 'px'; }
        ctx.setTransform(d, 0, 0, d, 0, 0); return { w, h };
      }
    };
  }
  function arrow(ctx, x1, y1, x2, y2, col, w = 2.4, head = 8) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); if (L < 2) return;
    const ux = dx / L, uy = dy / L, hh = Math.min(head, L * 0.6);
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hh * 0.8, y2 - uy * hh * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * hh - uy * hh * 0.5, y2 - uy * hh + ux * hh * 0.5); ctx.lineTo(x2 - ux * hh + uy * hh * 0.5, y2 - uy * hh - ux * hh * 0.5); ctx.closePath(); ctx.fill();
  }
  function text(ctx, s, x, y, o = {}) {
    ctx.font = `${o.b ? '700 ' : ''}${o.it ? 'italic ' : ''}${o.fs || 12}px Inter, "Segoe UI", sans-serif`;
    ctx.fillStyle = o.c || COL.ink; ctx.textAlign = o.a || 'left'; ctx.textBaseline = o.bl || 'alphabetic'; ctx.fillText(s, x, y);
  }
  function niceStep(span, n) { const raw = span / n, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; }
  function ball(ctx, x, y, r = 8, col = COL.ball) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 1.4; ctx.strokeStyle = COL.ink; ctx.stroke(); }

  // a small x–y graph panel. box {x,y,w,h}; ranges; returns mappers
  function panel(ctx, box, t0, t1, y0, y1, xl, yl, unit) {
    const X = t => box.x + (t - t0) / (t1 - t0) * box.w, Y = v => box.y + box.h - (v - y0) / (y1 - y0) * box.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeStyle = COL.grid; ctx.lineWidth = 1;
    const ys = niceStep(y1 - y0, 4);
    for (let v = Math.ceil(y0 / ys) * ys; v <= y1 + 1e-9; v += ys) { ctx.beginPath(); ctx.moveTo(box.x, Y(v)); ctx.lineTo(box.x + box.w, Y(v)); ctx.stroke(); text(ctx, fmt(v, ys < 1 ? 1 : 0), box.x - 4, Y(v) + 4, { a: 'right', fs: 10, c: COL.sub }); }
    const ts = niceStep(t1 - t0, 5);
    for (let t = 0; t <= t1 + 1e-9; t += ts) { ctx.beginPath(); ctx.moveTo(X(t), box.y); ctx.lineTo(X(t), box.y + box.h); ctx.stroke(); text(ctx, fmt(t, ts < 1 ? 1 : 0), X(t), box.y + box.h + 13, { a: 'center', fs: 10, c: COL.sub }); }
    ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.5;
    const zy = clamp(Y(0), box.y, box.y + box.h);
    ctx.beginPath(); ctx.moveTo(box.x, zy); ctx.lineTo(box.x + box.w, zy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(box.x, box.y); ctx.lineTo(box.x, box.y + box.h); ctx.stroke();
    text(ctx, yl, box.x, box.y - 7, { it: 1, b: 1, fs: 12 }); if (unit) text(ctx, unit, box.x + ctx.measureText(yl).width + 4, box.y - 7, { fs: 10, c: COL.sub });
    text(ctx, xl, box.x + box.w, box.y + box.h + 26, { a: 'right', it: 1, fs: 11, c: COL.sub });
    return { X, Y };
  }
  function loop(cv, step) {
    let last = performance.now(), on = true;
    function f(now) { if (!cv.c.isConnected) return; const dt = Math.min(0.05, (now - last) / 1000); last = now; step(dt); if (on) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  function readouts(parent) { const r = el('div', 'sm-ro'); parent.appendChild(r); return v => { r.innerHTML = v.map(([k, x, cls]) => `<div class="${cls || ''}"><span>${k}</span><b>${x}</b></div>`).join(''); }; }

  // =====================================================================
  // 1. Motion graphs
  // =====================================================================
  function simGraphs(root) {
    const S = { u: 0, a: 1.2, t: 0, play: false, area: false, tan: true, D: 8 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const presets = [['Uniform velocity', 3, 0], ['Uniform acceleration', 0, 1.2], ['Uniform deceleration', 8, -1], ['Slows, stops, comes back', 6, -1.5]];
    const pb = presets.map(([n, u, a]) => button(pre, n, 'sm-chip', () => { S.u = u; S.a = a; su.set(u); sa.set(a); mark(n); reset(true); }));
    const mark = n => pb.forEach(b => b.classList.toggle('on', b.textContent === n));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const su = slider(ctl, 'initial velocity <i>u</i>', -6, 10, 0.5, S.u, 'm/s', v => { S.u = v; mark(''); reset(); });
    const sa = slider(ctl, 'acceleration <i>a</i>', -2, 2, 0.1, S.a, 'm/s²', v => { S.a = v; mark(''); reset(); });
    const track = canvas(root, 'sm-track');
    const graphs = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const playB = button(bar, '▶ Play', 'sm-main', () => { if (S.t >= S.D) S.t = 0; S.play = !S.play; upd(); });
    button(bar, '↺ Reset', '', () => reset(true));
    toggle(bar, 'Area under v–t', S.area, v => { S.area = v; draw(); });
    toggle(bar, 'Tangent on s–t', S.tan, v => { S.tan = v; draw(); });
    const ro = readouts(root);
    mark('Uniform acceleration');
    function upd() { playB.textContent = S.play ? '❚❚ Pause' : (S.t >= S.D ? '▶ Replay' : '▶ Play'); }
    function reset(go) { S.t = 0; S.play = !!go; upd(); draw(); }
    const sAt = t => S.u * t + 0.5 * S.a * t * t, vAt = t => S.u + S.a * t;
    function draw() {
      const ctx = track.ctx, { w } = track.size(0, 120, 120);
      // range of positions
      let smin = 0, smax = 0; for (let i = 0; i <= 80; i++) { const s = sAt(i / 80 * S.D); smin = Math.min(smin, s); smax = Math.max(smax, s); }
      if (smax - smin < 4) { const m = (smax + smin) / 2; smin = m - 2; smax = m + 2; }
      const pad = 30, X = s => pad + (s - smin) / (smax - smin) * (w - 2 * pad);
      ctx.clearRect(0, 0, w, 120); ctx.fillStyle = '#F7F8F0'; ctx.fillRect(0, 0, w, 120);
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 78); ctx.lineTo(w - 10, 78); ctx.stroke();
      const st = niceStep(smax - smin, 6);
      for (let s = Math.ceil(smin / st) * st; s <= smax + 1e-9; s += st) { ctx.strokeStyle = COL.axis; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(s), 78); ctx.lineTo(X(s), 85); ctx.stroke(); text(ctx, fmt(s, st < 1 ? 1 : 0), X(s), 99, { a: 'center', fs: 10, c: COL.sub }); }
      text(ctx, 's / m', w - 12, 114, { a: 'right', fs: 10, c: COL.sub, it: 1 });
      text(ctx, 'O', X(0), 99, { a: 'center', fs: 10, b: 1 });
      // ticker-tape dots every 0.5 s
      for (let t = 0; t <= S.t + 1e-9; t += 0.5) { ctx.beginPath(); ctx.arc(X(sAt(t)), 70, 2.4, 0, 7); ctx.fillStyle = COL.sub; ctx.fill(); }
      const x = X(sAt(S.t)), v = vAt(S.t);
      ctx.fillStyle = COL.dark; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - 16, 50, 32, 18, 5) : ctx.rect(x - 16, 50, 32, 18); ctx.fill();
      ctx.fillStyle = COL.lime; ctx.fillRect(x - 10, 54, 20, 6);
      ctx.fillStyle = COL.ink; [x - 9, x + 9].forEach(cx => { ctx.beginPath(); ctx.arc(cx, 70, 4, 0, 7); ctx.fill(); });
      const vx2 = clamp(x + v * 9, 14, w - 14), ax2 = clamp(x + S.a * 22, 14, w - 14);
      arrow(ctx, x, 38, vx2, 38, COL.v, 3); if (Math.abs(v) > 0.2) text(ctx, 'v', vx2 + (v > 0 ? -4 : 4), 33, { it: 1, b: 1, c: COL.v, a: v > 0 ? 'right' : 'left' });
      arrow(ctx, x, 20, ax2, 20, COL.o, 3); if (Math.abs(S.a) > 0.05) text(ctx, 'a', ax2 + (S.a > 0 ? -4 : 4), 15, { it: 1, b: 1, c: COL.o, a: S.a > 0 ? 'right' : 'left' });
      text(ctx, 'dots: position every 0.5 s', 12, 14, { fs: 10, c: COL.sub });

      // graphs
      const narrow = (graphs.c.parentNode.clientWidth || 600) < 620;
      const gc = graphs.ctx, H = narrow ? 3 * 170 + 20 : 230, { w: W } = graphs.size(0, H, H);
      gc.clearRect(0, 0, W, H);
      const bw = narrow ? W - 60 : (W - 60 - 2 * 46) / 3, bh = narrow ? 120 : 160;
      const box = i => narrow ? { x: 46, y: 22 + i * 170, w: bw, h: bh } : { x: 46 + i * (bw + 46), y: 24, w: bw, h: bh };
      let vmin = Math.min(0, vAt(0), vAt(S.D)), vmax = Math.max(0, vAt(0), vAt(S.D)); if (vmax - vmin < 2) { vmax += 1; vmin -= 1; }
      const amin = Math.min(-2.5, S.a - 0.5), amax = Math.max(2.5, S.a + 0.5);
      const ps = panel(gc, box(0), 0, S.D, smin, smax, 't / s', 's', '/ m');
      const pv = panel(gc, box(1), 0, S.D, vmin - 0.5, vmax + 0.5, 't / s', 'v', '/ m s⁻¹');
      const pa = panel(gc, box(2), 0, S.D, amin, amax, 't / s', 'a', '/ m s⁻²');
      if (S.area) {
        gc.beginPath(); gc.moveTo(pv.X(0), pv.Y(0)); for (let i = 0; i <= 60; i++) { const t = S.t * i / 60; gc.lineTo(pv.X(t), pv.Y(vAt(t))); } gc.lineTo(pv.X(S.t), pv.Y(0)); gc.closePath();
        gc.fillStyle = COL.fill; gc.fill();
        gc.beginPath(); gc.moveTo(pa.X(0), pa.Y(0)); gc.lineTo(pa.X(0), pa.Y(S.a)); gc.lineTo(pa.X(S.t), pa.Y(S.a)); gc.lineTo(pa.X(S.t), pa.Y(0)); gc.closePath(); gc.fillStyle = COL.fillN; gc.fill();
      }
      const curve = (p, f, col) => { gc.strokeStyle = col; gc.lineWidth = 2.6; gc.beginPath(); for (let i = 0; i <= 80; i++) { const t = S.t * i / 80; i ? gc.lineTo(p.X(t), p.Y(f(t))) : gc.moveTo(p.X(t), p.Y(f(t))); } gc.stroke(); gc.beginPath(); gc.arc(p.X(S.t), p.Y(f(S.t)), 4.5, 0, 7); gc.fillStyle = col; gc.fill(); };
      curve(ps, sAt, COL.o); curve(pv, vAt, COL.r); curve(pa, () => S.a, COL.v);
      if (S.tan && S.t > 0) {
        const t0 = S.t, s0 = sAt(t0), m = vAt(t0), dt = S.D * 0.18;
        gc.save(); gc.beginPath(); gc.rect(box(0).x, box(0).y, box(0).w, box(0).h); gc.clip();
        gc.strokeStyle = COL.gr; gc.lineWidth = 1.6; gc.setLineDash([5, 4]); gc.beginPath(); gc.moveTo(ps.X(t0 - dt), ps.Y(s0 - m * dt)); gc.lineTo(ps.X(t0 + dt), ps.Y(s0 + m * dt)); gc.stroke(); gc.restore(); gc.setLineDash([]);
        text(gc, `gradient = ${fmt(m, 1)} m/s`, box(0).x + 6, box(0).y + 14, { fs: 11, c: COL.gr, b: 1 });
      }
      ro([['t', fmt(S.t, 1) + ' s'], ['displacement s', fmt(sAt(S.t), 1) + ' m'], ['velocity v', fmt(vAt(S.t), 1) + ' m/s'], ['acceleration a', fmt(S.a, 1) + ' m/s²'],
        ...(S.area ? [['area under v–t', fmt(sAt(S.t), 1) + ' m  (= s)', 'hl']] : [])]);
    }
    loop(graphs, dt => { if (S.play) { S.t = Math.min(S.D, S.t + dt); if (S.t >= S.D) { S.play = false; upd(); } draw(); } });
    new ResizeObserver(() => draw()).observe(root);
    reset(false);
  }

  // =====================================================================
  // 2. Vertical motion (free fall / vertical throw)
  // =====================================================================
  function simVertical(root) {
    const S = { u: 10, H: 5, t: 0, play: false, slow: false };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const presets = [['Ex 2.3.1 drop from 25 m', 0, 25], ['Ex 2.3.3 throw up 15 m/s', 15, 0], ['Ex 2.3.4 throw up 20 m/s', 20, 0], ['Ex 2.3.5 from a 5 m table', 10, 5], ['Cliff 75 m, up 12 m/s', 12, 75], ['Throw down 10 m/s from 30 m', -10, 30]];
    const pb = presets.map(([n, u, H]) => button(pre, n, 'sm-chip', () => { S.u = u; S.H = H; su.set(u); sh.set(H); mark(n); reset(true); }));
    const mark = n => pb.forEach(b => b.classList.toggle('on', b.textContent === n));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const su = slider(ctl, 'launch velocity <i>u</i> (up +)', -20, 30, 0.5, S.u, 'm/s', v => { S.u = v; mark(''); reset(); });
    const sh = slider(ctl, 'starting height', 0, 80, 1, S.H, 'm', v => { S.H = v; mark(''); reset(); });
    const wrap = el('div', 'sm-split'); root.appendChild(wrap);
    const a = el('div'), b = el('div'); wrap.appendChild(a); wrap.appendChild(b);
    const cv1 = canvas(a), cv2 = canvas(b);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const playB = button(bar, '▶ Play', 'sm-main', () => { if (S.t >= T()) S.t = 0; S.play = !S.play; upd(); });
    button(bar, '↺ Reset', '', () => reset(true));
    toggle(bar, 'Slow motion', S.slow, v => { S.slow = v; });
    const ro = readouts(root);
    mark('Ex 2.3.5 from a 5 m table');
    const T = () => { const d = S.u * S.u + 2 * g * S.H; return (S.u + Math.sqrt(Math.max(0, d))) / g; };
    const y = t => S.H + S.u * t - 0.5 * g * t * t, v = t => S.u - g * t;
    function upd() { playB.textContent = S.play ? '❚❚ Pause' : (S.t >= T() && T() > 0 ? '▶ Replay' : '▶ Play'); }
    function reset(go) { S.t = 0; S.play = !!go && T() > 0; upd(); draw(); }
    function draw() {
      const TT = T(), top = S.u > 0 ? S.H + S.u * S.u / (2 * g) : S.H, tTop = S.u > 0 ? S.u / g : 0, vImp = v(TT);
      // left: column view
      const ctx = cv1.ctx, { w, h } = cv1.size(1.05, 300, 420);
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#EEF5FB'; ctx.fillRect(0, 0, w, h);
      const ymax = Math.max(4, top * 1.12), base = h - 30, Y = yy => base - yy / ymax * (h - 60);
      ctx.fillStyle = '#7BAE4E'; ctx.fillRect(0, base, w, h - base);
      const st = niceStep(ymax, 6);
      for (let yy = 0; yy <= ymax + 1e-9; yy += st) { ctx.strokeStyle = COL.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(38, Y(yy)); ctx.lineTo(w - 8, Y(yy)); ctx.stroke(); text(ctx, fmt(yy, 0), 32, Y(yy) + 4, { a: 'right', fs: 10, c: COL.sub }); }
      text(ctx, 'height / m', 6, 14, { fs: 10, c: COL.sub, it: 1 });
      const cx = w * 0.58;
      if (S.H > 0) { ctx.fillStyle = '#BDEBD9'; ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.5; ctx.fillRect(cx - 70, Y(S.H), 54, base - Y(S.H)); ctx.strokeRect(cx - 70, Y(S.H), 54, base - Y(S.H)); }
      if (S.u > 0) { ctx.setLineDash([5, 4]); ctx.strokeStyle = COL.v; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - 40, Y(top)); ctx.lineTo(w - 10, Y(top)); ctx.stroke(); ctx.setLineDash([]); text(ctx, `max height ${fmt(top, 1)} m  (v = 0)`, w - 10, Y(top) - 5, { a: 'right', fs: 11, c: COL.v, b: 1 }); }
      // ghost positions every T/10
      if (TT > 0) for (let i = 0; i <= 10; i++) { const tt = TT * i / 10; if (tt > S.t) break; ctx.beginPath(); ctx.arc(cx + 22, Y(y(tt)), 3, 0, 7); ctx.fillStyle = 'rgba(28,34,48,.28)'; ctx.fill(); }
      const yb = Y(Math.max(0, y(S.t))), vv = v(S.t);
      ball(ctx, cx, yb - 8, 9, '#E83E6C');
      const L = clamp(vv * 4, -120, 120); arrow(ctx, cx + 22, yb - 8, cx + 22, yb - 8 - L, vv >= 0 ? COL.gr : COL.r, 3);
      if (Math.abs(vv) > 0.3) text(ctx, 'v', cx + 30, yb - 8 - L / 2, { it: 1, b: 1, c: vv >= 0 ? COL.gr : COL.r });
      arrow(ctx, cx - 10, 26, cx - 10, 56, COL.o, 2.6); text(ctx, 'g', cx - 2, 46, { it: 1, b: 1, c: COL.o });
      // right: v–t
      const c2 = cv2.ctx, { w: w2, h: h2 } = cv2.size(1.05, 300, 420);
      c2.clearRect(0, 0, w2, h2);
      const vmax = Math.max(1, S.u), vmin = Math.min(-1, vImp);
      const p = panel(c2, { x: 46, y: 24, w: w2 - 62, h: h2 - 60 }, 0, Math.max(TT, 0.5), vmin * 1.1, vmax * 1.15, 't / s', 'v', '/ m s⁻¹');
      c2.strokeStyle = COL.r; c2.lineWidth = 2.6; c2.beginPath(); c2.moveTo(p.X(0), p.Y(v(0))); c2.lineTo(p.X(S.t), p.Y(v(S.t))); c2.stroke();
      c2.beginPath(); c2.arc(p.X(S.t), p.Y(v(S.t)), 4.5, 0, 7); c2.fillStyle = COL.r; c2.fill();
      if (S.u > 0 && S.t >= tTop) { c2.beginPath(); c2.arc(p.X(tTop), p.Y(0), 4, 0, 7); c2.fillStyle = COL.v; c2.fill(); text(c2, `top at ${fmt(tTop, 2)} s`, p.X(tTop) + 6, p.Y(0) - 6, { fs: 11, c: COL.v, b: 1 }); }
      text(c2, 'gradient = −g = −9.81 m s⁻²', 52, h2 - 6, { fs: 11, c: COL.sub });
      const done = S.t >= TT - 1e-6 && TT > 0;
      ro([['t', fmt(S.t, 2) + ' s'], ['displacement s', fmt(y(S.t) - S.H, 2) + ' m'], ['velocity v', fmt(vv, 2) + ' m/s'],
        ['max height (above ground)', fmt(top, 2) + ' m', 'hl'], ['time to top', S.u > 0 ? fmt(tTop, 2) + ' s' : '—', 'hl'],
        ['time of flight', done ? fmt(TT, 2) + ' s' : '…', 'hl'], ['impact velocity', done ? fmt(vImp, 2) + ' m/s' : '…', 'hl']]);
    }
    loop(cv1, dt => { if (S.play) { const TT = T(), rate = S.slow ? 0.35 : clamp(TT / 3.5, 0.6, 2.5); S.t = Math.min(TT, S.t + dt * rate); if (S.t >= TT) { S.play = false; upd(); } draw(); } });
    new ResizeObserver(() => draw()).observe(root);
    reset(false);
  }

  // =====================================================================
  // 3. Projectile launcher
  // =====================================================================
  function simProjectile(root) {
    const S = { u: 20, th: 60, h: 0, t: 0, play: false, air: false, cmp: false, comp: true, k: 0.01 };
    const pre = el('div', 'sm-row sm-pre'); root.appendChild(pre);
    const presets = [['Ex 2.4.1 20 m/s at 60°', 20, 60, 0], ['Ex 2 16 m/s off a 45 m cliff', 16, 0, 45], ['Ex 3 30 m/s at 37° from 20 m', 30, 37, 20], ['Ex 4 arrow 45 m/s at 30°', 45, 30, 0]];
    const pb = presets.map(([n, u, th, h]) => button(pre, n, 'sm-chip', () => { Object.assign(S, { u, th, h }); su.set(u); st.set(th); sh.set(h); mark(n); reset(true); }));
    const mark = n => pb.forEach(b => b.classList.toggle('on', b.textContent === n));
    const ctl = el('div', 'sm-row'); root.appendChild(ctl);
    const su = slider(ctl, 'launch speed <i>u</i>', 5, 50, 1, S.u, 'm/s', v => { S.u = v; mark(''); reset(); });
    const st = slider(ctl, 'angle θ', 0, 90, 1, S.th, '°', v => { S.th = v; mark(''); reset(); });
    const sh = slider(ctl, 'launch height', 0, 60, 1, S.h, 'm', v => { S.h = v; mark(''); reset(); });
    const cv = canvas(root);
    const bar = el('div', 'sm-row sm-bar'); root.appendChild(bar);
    const playB = button(bar, '▶ Launch', 'sm-main', () => { if (S.t >= endT()) S.t = 0; S.play = !S.play; upd(); });
    button(bar, '↺ Reset', '', () => reset(true));
    toggle(bar, 'Components', S.comp, v => { S.comp = v; draw(); });
    toggle(bar, 'Compare angles', S.cmp, v => { S.cmp = v; draw(); });
    toggle(bar, 'Air resistance', S.air, v => { S.air = v; reset(); });
    const ro = readouts(root);
    mark('Ex 2.4.1 20 m/s at 60°');

    const rad = () => S.th * Math.PI / 180;
    const ideal = () => { const ux = S.u * Math.cos(rad()), uy = S.u * Math.sin(rad()), T = (uy + Math.sqrt(uy * uy + 2 * g * S.h)) / g; return { ux, uy, T, R: ux * T, Hm: S.h + uy * uy / (2 * g), tTop: Math.max(0, uy / g), vyI: uy - g * T }; };
    let airPath = null;
    function computeAir() {
      const pts = []; let x = 0, y = S.h, vx = S.u * Math.cos(rad()), vy = S.u * Math.sin(rad()), t = 0, dt = 0.002, ymax = y, tTop = 0;
      pts.push([0, x, y, vx, vy]);
      while (t < 60) {
        const sp = Math.hypot(vx, vy), ax = -S.k * sp * vx, ay = -g - S.k * sp * vy;
        vx += ax * dt; vy += ay * dt; x += vx * dt; y += vy * dt; t += dt;
        if (y > ymax) { ymax = y; tTop = t; }
        if (y < 0) break; if (Math.round(t / dt) % 10 === 0) pts.push([t, x, y, vx, vy]);
      }
      pts.push([t, x, Math.max(0, y), vx, vy]);
      airPath = { pts, T: t, R: x, Hm: ymax, tTop, vx, vy };
    }
    const endT = () => S.air ? airPath.T : ideal().T;
    function stateAt(t) {
      if (S.air) { const p = airPath.pts; let i = p.findIndex(q => q[0] >= t); if (i < 0) i = p.length - 1; const q = p[i]; return { x: q[1], y: q[2], vx: q[3], vy: q[4] }; }
      const I = ideal(); return { x: I.ux * t, y: S.h + I.uy * t - 0.5 * g * t * t, vx: I.ux, vy: I.uy - g * t };
    }
    function upd() { playB.textContent = S.play ? '❚❚ Pause' : (S.t >= endT() ? '▶ Launch again' : '▶ Launch'); }
    function reset(go) { if (S.air) computeAir(); S.t = 0; S.play = !!go; upd(); draw(); }

    function draw() {
      const ctx = cv.ctx, { w, h } = cv.size(0.58, 280, 520), I = ideal();
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = '#EEF5FB'; ctx.fillRect(0, 0, w, h);
      // world extent (equal scale on both axes so angles look right)
      let xmax = I.R, ymax = I.Hm;
      if (S.cmp) [15, 30, 45, 60, 75].forEach(d => { const r = d * Math.PI / 180, ux = S.u * Math.cos(r), uy = S.u * Math.sin(r), T = (uy + Math.sqrt(uy * uy + 2 * g * S.h)) / g; xmax = Math.max(xmax, ux * T); ymax = Math.max(ymax, S.h + uy * uy / (2 * g)); });
      xmax = Math.max(xmax, 10); ymax = Math.max(ymax, 5);
      const L = 46, B = 34, Rm = 16, Tm = 22, sc = Math.min((w - L - Rm) / (xmax * 1.06), (h - B - Tm) / (ymax * 1.12));
      const X = x => L + x * sc, Y = y => h - B - y * sc;
      // grid
      const gs = niceStep(Math.max(xmax, ymax), 7);
      ctx.lineWidth = 1; ctx.strokeStyle = COL.grid;
      for (let x = 0; X(x) <= w - 4; x += gs) { ctx.beginPath(); ctx.moveTo(X(x), Tm - 10); ctx.lineTo(X(x), h - B); ctx.stroke(); text(ctx, fmt(x, 0), X(x), h - B + 14, { a: 'center', fs: 10, c: COL.sub }); }
      for (let y = 0; Y(y) >= 4; y += gs) { ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(w - 4, Y(y)); ctx.stroke(); text(ctx, fmt(y, 0), L - 5, Y(y) + 4, { a: 'right', fs: 10, c: COL.sub }); }
      text(ctx, 'x / m', w - 6, h - 4, { a: 'right', fs: 10, c: COL.sub, it: 1 }); text(ctx, 'y / m', 6, 12, { fs: 10, c: COL.sub, it: 1 });
      ctx.fillStyle = '#7BAE4E'; ctx.fillRect(0, Y(0), w, h - Y(0));
      if (S.h > 0) { ctx.fillStyle = '#BDEBD9'; ctx.strokeStyle = COL.gr; ctx.lineWidth = 1.5; ctx.fillRect(X(0) - 30, Y(S.h), 30, Y(0) - Y(S.h)); ctx.strokeRect(X(0) - 30, Y(S.h), 30, Y(0) - Y(S.h)); }
      const pathIdeal = (th, col, wd, dash) => {
        const r = th * Math.PI / 180, ux = S.u * Math.cos(r), uy = S.u * Math.sin(r), T = (uy + Math.sqrt(uy * uy + 2 * g * S.h)) / g;
        ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.setLineDash(dash || []); ctx.beginPath();
        for (let i = 0; i <= 120; i++) { const t = T * i / 120, x = ux * t, y = S.h + uy * t - 0.5 * g * t * t; i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); }
        ctx.stroke(); ctx.setLineDash([]); return { ux, uy, T };
      };
      if (S.cmp) [15, 30, 45, 60, 75].forEach((d, i) => { const q = pathIdeal(d, ['#9AAAD0', '#8C86F0', '#C0392B', '#5B54D6', '#2B3990'][i], d === 45 ? 2.4 : 1.6); const tt = q.uy / g, xx = q.ux * tt, yy = S.h + q.uy * tt - 0.5 * g * tt * tt; text(ctx, d + '°', X(xx), Y(yy) - 5, { a: 'center', fs: 11, b: 1, c: ['#7B8BB4', '#6A63EC', '#C0392B', '#4A42C9', '#2B3990'][i] }); });
      pathIdeal(S.th, S.air ? 'rgba(28,34,48,.45)' : COL.ink, 2, S.air ? [6, 5] : (S.cmp ? [2, 3] : []));
      if (S.air) { ctx.strokeStyle = COL.o; ctx.lineWidth = 2.8; ctx.beginPath(); airPath.pts.forEach((p, i) => i ? ctx.lineTo(X(p[1]), Y(p[2])) : ctx.moveTo(X(p[1]), Y(p[2]))); ctx.stroke(); }
      // equal-time markers
      const TT = endT();
      for (let i = 1; i <= 10; i++) { const tt = TT * i / 10; if (tt > S.t + 1e-9) break; const q = stateAt(tt); ctx.beginPath(); ctx.arc(X(q.x), Y(q.y), 3, 0, 7); ctx.fillStyle = 'rgba(28,34,48,.35)'; ctx.fill(); }
      // launch angle
      ctx.strokeStyle = COL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(X(0), Y(S.h), 26, -rad(), 0); ctx.stroke(); text(ctx, S.th + '°', X(0) + 30, Y(S.h) - 6, { fs: 11, b: 1 });
      // ball + components
      const q = stateAt(S.t), bx = X(q.x), by = Y(Math.max(0, q.y)), k = 60 / Math.max(15, S.u);
      if (S.comp) {
        arrow(ctx, bx, by, bx + q.vx * k, by, COL.o, 2.6); arrow(ctx, bx, by, bx, by - q.vy * k, COL.v, 2.6); arrow(ctx, bx, by, bx + q.vx * k, by - q.vy * k, COL.r, 2.2);
        ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(28,34,48,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx + q.vx * k, by); ctx.lineTo(bx + q.vx * k, by - q.vy * k); ctx.lineTo(bx, by - q.vy * k); ctx.stroke(); ctx.setLineDash([]);
      }
      ball(ctx, bx, by, 7);
      // top marker
      const tTop = S.air ? airPath.tTop : I.tTop;
      if (S.t >= tTop && I.uy > 0) { const p = stateAt(tTop); text(ctx, 'vᵧ = 0', X(p.x), Y(p.y) - 12, { a: 'center', fs: 11, b: 1, c: COL.v }); }
      // readouts
      const done = S.t >= TT - 1e-6, vImpI = Math.hypot(I.ux, I.vyI), angI = Math.atan2(-I.vyI, I.ux) * 180 / Math.PI;
      const rows = [['t', fmt(S.t, 2) + ' s'], ['vₓ (horizontal)', fmt(q.vx, 2) + ' m/s', 'o'], ['vᵧ (vertical)', fmt(q.vy, 2) + ' m/s', 'v'], ['speed |v|', fmt(Math.hypot(q.vx, q.vy), 2) + ' m/s'],
        ['max height H', fmt(I.Hm, 2) + ' m', 'hl'], ['time of flight T', fmt(I.T, 2) + ' s', 'hl'], ['range R', fmt(I.R, 2) + ' m', 'hl'], ['impact', `${fmt(vImpI, 1)} m/s, ${fmt(angI, 1)}° below`, 'hl']];
      if (S.air) rows.push(['with air: H', fmt(airPath.Hm, 2) + ' m', 'ao'], ['with air: T', fmt(airPath.T, 2) + ' s', 'ao'], ['with air: R', fmt(airPath.R, 2) + ' m', 'ao'], ['with air: impact', `${fmt(Math.hypot(airPath.vx, airPath.vy), 1)} m/s`, 'ao']);
      ro(rows);
      void done;
    }
    loop(cv, dt => { if (S.play) { const TT = endT(), rate = clamp(TT / 3.5, 0.5, 3); S.t = Math.min(TT, S.t + dt * rate); if (S.t >= TT) { S.play = false; upd(); } draw(); } });
    new ResizeObserver(() => draw()).observe(root);
    reset(false);
  }

  // chapter files add their own simulations with PhysiQSims.add(kind, fn) and use these helpers
  const KINDS = { graphs: simGraphs, vertical: simVertical, projectile: simProjectile };
  const U = { g, COL, fmt, clamp, el, slider, toggle, button, canvas, arrow, text, niceStep, ball, panel, loop, readouts };
  function mountAll(scope) {
    (scope || document).querySelectorAll('.ls-sim[data-sim]:not([data-on])').forEach(d => {
      const f = KINDS[d.dataset.sim]; if (!f) return; d.dataset.on = '1';
      try { f(d); } catch (e) { d.innerHTML = '<p class="sm-err">This simulation could not start on this browser.</p>'; if (window.console) console.error(e); }
    });
  }
  window.PhysiQSims = { mountAll, U, add: (k, f) => { KINDS[k] = f; } };
})();
