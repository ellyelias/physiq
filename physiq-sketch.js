/* PhysiQ sketch pad — lets students draw sketches, graphs and diagrams in the app.
   window.PhysiQSketch.open(title, onSave) — onSave(dataURL) receives a JPEG of the drawing. */
(function(){
  const css = `
  .sk-back{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:10px;}
  .sk-card{background:#fff;border-radius:14px;width:min(920px,100%);max-height:100%;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.3);overflow:hidden;}
  .sk-head{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #e5e7eb;}
  .sk-head b{flex:1;color:var(--navy,#1F3864);font-size:15px;}
  .sk-tools{display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;border-bottom:1px solid #e5e7eb;background:#f8fafc;}
  .sk-tools button{border:1px solid #cbd5e1;background:#fff;border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer;min-height:36px;}
  .sk-tools button.on{background:var(--navy,#1F3864);color:#fff;border-color:var(--navy,#1F3864);}
  .sk-tools .sk-sep{width:1px;background:#cbd5e1;margin:2px 4px;}
  .sk-dot{display:inline-block;width:12px;height:12px;border-radius:50%;vertical-align:-1px;}
  .sk-wrap{flex:1;overflow:auto;padding:10px;background:#e2e8f0;display:flex;justify-content:center;}
  .sk-wrap canvas{background:#fff;touch-action:none;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,.15);max-width:100%;}
  .sk-foot{display:flex;gap:8px;justify-content:flex-end;padding:10px 14px;border-top:1px solid #e5e7eb;flex-wrap:wrap;align-items:center;}
  .sk-foot span{flex:1;font-size:12px;color:#64748b;min-width:180px;}
  .sk-btn{border:0;border-radius:999px;padding:8px 18px;font-weight:700;cursor:pointer;font-size:14px;}
  .sk-save{background:var(--navy,#1F3864);color:#fff;} .sk-cancel{background:#fff;border:1px solid #cbd5e1;color:#334155;}
  `;
  let styled = false;
  function open(title, onSave){
    if (!styled){ const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); styled = true; }
    const back = document.createElement('div'); back.className = 'sk-back';
    back.innerHTML = `<div class="sk-card" role="dialog" aria-modal="true" aria-label="Draw your answer">
      <div class="sk-head"><b>${title || 'Draw your answer'}</b></div>
      <div class="sk-tools">
        <button data-t="pen" class="on">✏️ Pen</button><button data-t="line">╱ Line</button><button data-t="arrow">➝ Arrow</button><button data-t="eraser">Eraser</button>
        <span class="sk-sep"></span>
        <button data-c="#111111" class="on"><span class="sk-dot" style="background:#111"></span></button><button data-c="#1d4ed8"><span class="sk-dot" style="background:#1d4ed8"></span></button><button data-c="#c62828"><span class="sk-dot" style="background:#c62828"></span></button>
        <span class="sk-sep"></span>
        <button data-w="2">Thin</button><button data-w="3.5" class="on">Medium</button><button data-w="6">Thick</button>
        <span class="sk-sep"></span>
        <button data-a="grid">Grid</button><button data-a="text">T Label</button><button data-a="undo">↶ Undo</button><button data-a="clear">Clear</button>
      </div>
      <div class="sk-wrap"><canvas></canvas></div>
      <div class="sk-foot"><span>Draw with your finger or stylus. Use Line and Arrow for axes and force arrows, and Label to add text. Your drawing goes into your PDF.</span>
        <button class="sk-btn sk-cancel">Cancel</button><button class="sk-btn sk-save">Add to my answer</button></div></div>`;
    document.body.appendChild(back);
    const cv = back.querySelector('canvas'), ctx = cv.getContext('2d');
    const W = 900, H = 600, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    const fit = () => { const wrap = back.querySelector('.sk-wrap'); const maxW = wrap.clientWidth - 20, maxH = Math.max(240, wrap.clientHeight - 20); const sc = Math.min(maxW / W, maxH / H, 1.2); cv.style.width = (W * sc) + 'px'; cv.style.height = (H * sc) + 'px'; };
    let tool = 'pen', color = '#111111', width = 3.5, grid = false;
    const items = []; let cur = null;
    function drawGrid(){ ctx.save(); ctx.strokeStyle = '#dbe4ef'; ctx.lineWidth = 1; for (let x = 0; x <= W; x += 30){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y <= H; y += 30){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.restore(); }
    function drawItem(it){
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = it.c; ctx.fillStyle = it.c; ctx.lineWidth = it.w;
      if (it.t === 'eraser'){ ctx.strokeStyle = '#fff'; ctx.lineWidth = it.w * 5; }
      if (it.t === 'text'){ ctx.font = `${16 + it.w * 3}px Calibri, Carlito, sans-serif`; ctx.fillText(it.s, it.p[0][0], it.p[0][1]); ctx.restore(); return; }
      const p = it.p; ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
      if (it.t === 'line' || it.t === 'arrow'){ const e = p[p.length - 1]; ctx.lineTo(e[0], e[1]); ctx.stroke();
        if (it.t === 'arrow'){ const a = Math.atan2(e[1] - p[0][1], e[0] - p[0][0]), L = 10 + it.w * 3; ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(e[0] - L * Math.cos(a - 0.45), e[1] - L * Math.sin(a - 0.45)); ctx.lineTo(e[0] - L * Math.cos(a + 0.45), e[1] - L * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill(); }
      } else { if (p.length === 1) ctx.lineTo(p[0][0] + 0.1, p[0][1]); for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]); ctx.stroke(); }
      ctx.restore();
    }
    function redraw(){ ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); if (grid) drawGrid(); items.forEach(drawItem); if (cur) drawItem(cur); }
    const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
    cv.addEventListener('pointerdown', e => {
      e.preventDefault(); const pt = pos(e);
      if (tool === 'text'){ const s = prompt('Label text (e.g. N, W = 200 N, 60°):'); if (s){ items.push({t:'text', c:color, w:width, p:[pt], s}); redraw(); } return; }
      try{ cv.setPointerCapture(e.pointerId); }catch(_){}
      cur = {t:tool, c:color, w:width, p:[pt]}; redraw();
    });
    cv.addEventListener('pointermove', e => { if (!cur) return; e.preventDefault(); const pt = pos(e); if (cur.t === 'line' || cur.t === 'arrow') cur.p = [cur.p[0], pt]; else cur.p.push(pt); redraw(); });
    const end = () => { if (!cur) return; items.push(cur); cur = null; redraw(); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    const tools = back.querySelector('.sk-tools');
    tools.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const grp = sel => tools.querySelectorAll(sel).forEach(x => x.classList.toggle('on', x === b));
      if (b.dataset.t){ tool = b.dataset.t; grp('[data-t],[data-a="text"]'); }
      else if (b.dataset.c){ color = b.dataset.c; grp('[data-c]'); if (tool === 'eraser'){ tool = 'pen'; tools.querySelectorAll('[data-t],[data-a="text"]').forEach(x => x.classList.toggle('on', x.dataset.t === 'pen')); } }
      else if (b.dataset.w){ width = +b.dataset.w; grp('[data-w]'); }
      else if (b.dataset.a === 'text'){ tool = 'text'; grp('[data-t],[data-a="text"]'); }
      else if (b.dataset.a === 'grid'){ grid = !grid; b.classList.toggle('on', grid); redraw(); }
      else if (b.dataset.a === 'undo'){ items.pop(); redraw(); }
      else if (b.dataset.a === 'clear'){ if (!items.length || confirm('Clear the whole drawing?')){ items.length = 0; redraw(); } }
    });
    const close = () => { window.removeEventListener('resize', fit); back.remove(); };
    back.querySelector('.sk-cancel').addEventListener('click', () => { if (!items.length || confirm('Discard this drawing?')) close(); });
    back.querySelector('.sk-save').addEventListener('click', () => {
      if (!items.length){ alert('Draw your answer first.'); return; }
      const out = document.createElement('canvas'); out.width = W; out.height = H;
      out.getContext('2d').drawImage(cv, 0, 0, W, H);
      const url = out.toDataURL('image/jpeg', 0.85); close(); onSave(url);
    });
    window.addEventListener('resize', fit); fit(); redraw();
  }
  window.PhysiQSketch = {open};
})();
