// Builds the PhysiQ chapter mind-map posters (one A4 page per chapter) from tools/mindmap_data.js.
// Output: downloads/mindmaps/PhysiQ_MindMap_<id>.pdf  (A4, for printing)
//         assets/mindmaps/<id>.webp                    (shown in the app's Notes tab)
// Needs: node + playwright, python3 + Pillow, and in NODE_PATH (or tools/node_modules):
//        katex, @fontsource/barlow-condensed, @fontsource/source-sans-3
// usage: node tools/build_mindmaps.js [chapterId ...]     e.g.  node tools/build_mindmaps.js S2-18
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const { chromium } = require('playwright');
const katex = require('katex');

const ROOT = path.join(__dirname, '..');
const OUT_PDF = path.join(ROOT, 'downloads', 'mindmaps');
const OUT_IMG = path.join(ROOT, 'assets', 'mindmaps');
const TMP = path.join(os.tmpdir(), 'physiq_mm');
[OUT_PDF, OUT_IMG, TMP].forEach(d => fs.mkdirSync(d, { recursive: true }));
const mod = n => path.dirname(require.resolve(n + '/package.json'));
const KATEX = path.join(mod('katex'), 'dist');
const FBC = path.join(mod('@fontsource/barlow-condensed'), 'files');
const FSS = path.join(mod('@fontsource/source-sans-3'), 'files');

// ---------- topic figures straight from index.html ----------
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const a0 = html.indexOf('  const TOPIC_FIGS = (() => {'), b0 = html.indexOf('\n  })();', a0) + 7;
const TOPIC_FIGS = new Function(html.slice(a0, b0) + ';return TOPIC_FIGS;')();
const names = {};
for (const m of html.matchAll(/'((?:S[23]-)?\d+)':'Chapter (\d+) — ([^']+)'/g)) names[m[1]] = { num: m[2], title: m[3] };

// ---------- small SVG kit for the posters ----------
const INK = '#1E293B';
const svg = (w, h, body, max) => `<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${max || w}px;height:auto;display:block;margin:4px auto" font-family="Source Sans 3" font-size="14" fill="${INK}">${body}</svg>`;
const line = (x1, y1, x2, y2, c = INK, w = 2, o = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" ${o}/>`;
const text = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 14}" fill="${o.c || INK}" ${o.b ? 'font-weight="700"' : ''} ${o.i ? 'font-style="italic"' : ''}>${s}</text>`;
const arrow = (x1, y1, x2, y2, c = INK, w = 2) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
  return line(x1, y1, x2, y2, c, w) + `<path d="M${x2} ${y2} L${(x2 - h * Math.cos(a - .4)).toFixed(1)} ${(y2 - h * Math.sin(a - .4)).toFixed(1)} L${(x2 - h * Math.cos(a + .4)).toFixed(1)} ${(y2 - h * Math.sin(a + .4)).toFixed(1)}Z" fill="${c}"/>`;
};
const curve = (xa, xb, f, c, w = 2.4, dash) => { let d = ''; for (let x = xa; x <= xb + .01; x += 1.5) { const y = f(x); if (isFinite(y)) d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" ${dash ? 'stroke-dasharray="6 4"' : ''}/>`; };
// component symbols, drawn horizontally centred on (x,y)
const SYM = {
  R: (x, y, c = INK) => `<path d="M${x - 30} ${y} h8 l4 -9 l7 18 l7 -18 l7 18 l7 -18 l4 9 h8" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/>`,
  C: (x, y, c = INK) => line(x - 30, y, x - 5, y, c, 2.4) + line(x - 5, y - 13, x - 5, y + 13, c, 3.4) + line(x + 5, y - 13, x + 5, y + 13, c, 3.4) + line(x + 5, y, x + 30, y, c, 2.4),
  L: (x, y, c = INK) => `<path d="M${x - 30} ${y} h6 ${[0, 1, 2, 3].map(() => 'a6 7 0 0 1 12 0').join(' ')} h6" fill="none" stroke="${c}" stroke-width="2.4"/>`,
  AC: (x, y, c = INK) => `<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${c}" stroke-width="2.2"/><path d="M${x - 8} ${y} q4 -9 8 0 t8 0" fill="none" stroke="${c}" stroke-width="2"/>`,
};
const sym = (k, c) => svg(70, 34, SYM[k](35, 17, c), 70);
// series loop: parts = ['R','L'] drawn across the top wire, a.c. source at the bottom
const loop = (parts, labels) => {
  const W = 220, H = 110, x0 = 20, x1 = 200, yt = 30, yb = 92, n = parts.length, sp = (x1 - x0) / n;
  let b = line(x0, yt, x0, yb) + line(x1, yt, x1, yb) + line(x0, yb, 96, yb) + line(124, yb, x1, yb) + SYM.AC(110, yb);
  let xs = x0;
  parts.forEach((p, i) => { const cx = x0 + sp * (i + .5); b += line(xs, yt, cx - 30, yt) + SYM[p](cx, yt) + text(cx, yt - 17, labels[i], { i: 1, s: 15 }); xs = cx + 30; });
  return svg(W, H, b + line(xs, yt, x1, yt), 220);
};
// graph of X against f: X_L straight line, X_C hyperbola
const reactanceGraph = () => {
  const ox = 40, oy = 150, W = 300, H = 170;
  let b = arrow(ox, oy, 285, oy) + arrow(ox, oy, ox, 12) + text(285, oy + 18, 'f', { i: 1, a: 'end', s: 16 }) + text(ox - 8, 22, 'X', { i: 1, a: 'end', s: 16 }) + text(ox - 6, oy + 16, '0', { a: 'end' });
  b += curve(ox, 260, x => oy - (x - ox) * 0.55, '#DC2626', 2.6) + text(250, 30, 'X<tspan font-size="11" dy="4">L</tspan><tspan dy="-4"> = 2πfL</tspan>', { c: '#DC2626', b: 1, a: 'end' });
  b += curve(ox + 9, 275, x => oy - 1300 / (x - ox + 4), '#2563EB', 2.6) + text(272, oy - 22, 'X<tspan font-size="11" dy="4">C</tspan><tspan dy="-4"> = 1/2πfC</tspan>', { c: '#2563EB', b: 1, a: 'end' });
  return svg(W, H, b, 300);
};
// phasor diagram: V along +x, I at angle (deg, + = leads)
const phasor = (deg, lab) => {
  const ox = 22, oy = deg > 0 ? 92 : deg < 0 ? 22 : 50, L = 90, red = '#DC2626', blu = '#2563EB';
  let b = arrow(ox, oy, ox + L, oy, red, 2.6) + text(ox + L + 4, oy + 5, 'V', { a: 'start', i: 1, b: 1, c: red, s: 17 });
  if (deg === 0) b = arrow(ox, oy - 4, ox + L, oy - 4, red, 2.6) + text(ox + L + 4, oy + 1, 'V', { a: 'start', i: 1, b: 1, c: red, s: 17 }) + arrow(ox, oy + 8, ox + L - 22, oy + 8, blu, 2.6) + text(ox + L - 18, oy + 14, 'I', { a: 'start', i: 1, b: 1, c: blu, s: 17 });
  else { const y2 = deg > 0 ? oy - 66 : oy + 66; b += arrow(ox, oy, ox, y2, blu, 2.6) + text(ox + 8, y2 + (deg > 0 ? 8 : 4), 'I', { a: 'start', i: 1, b: 1, c: blu, s: 17 }) + `<path d="M${ox + 24} ${oy} A24 24 0 0 ${deg > 0 ? 0 : 1} ${ox} ${oy + (deg > 0 ? -24 : 24)}" fill="none" stroke="${INK}" stroke-width="1.5"/>` + text(ox + 30, oy + (deg > 0 ? -12 : 22), '90°', { a: 'start', s: 13 }); }
  return svg(140, 136, b + (lab ? text(70, 132, lab, { s: 14, c: '#334155', b: 1 }) : ''), 140);
};
// V and I against t: amplitude ratio and phase shift (rad, + = I leads)
const waves = (ph = 0) => {
  const ox = 44, oy = 92, W = 310, wl = 120, red = '#DC2626', blu = '#2563EB';
  let b = arrow(ox, oy, W - 8, oy) + arrow(ox, 156, ox, 8) + text(W - 8, oy + 18, 't', { i: 1, a: 'end', s: 16 }) + text(ox + 8, 16, 'V, I', { i: 1, a: 'start', s: 14 });
  b += curve(ox, ox + 2 * wl, x => oy - 56 * Math.sin(2 * Math.PI * (x - ox) / wl), red, 2.6) + curve(ox, ox + 2 * wl, x => oy - 34 * Math.sin(2 * Math.PI * (x - ox) / wl + ph), blu, 2.6);
  b += line(ox - 4, oy - 56, ox + wl / 4, oy - 56, '#94A3B8', 1.2, 'stroke-dasharray="4 3"') + text(ox - 6, oy - 52, 'V₀', { a: 'end', s: 13, c: red, b: 1 });
  b += line(ox + wl, oy - 4, ox + wl, oy + 4) + text(ox + wl + 8, oy - 6, 'T', { i: 1, s: 14 }) + text(ox + 2 * wl + 10, oy - 6, '2T', { i: 1, s: 14 });
  b += text(ox + wl * .62, oy - 46, 'V', { i: 1, b: 1, c: red, s: 16 }) + text(ox + wl * .46, oy - 14, 'I', { i: 1, b: 1, c: blu, s: 16 });
  return svg(W, 162, b, 300);
};
// mean power: P = P0 sin² wt between 0 and P0, mean P0/2 dashed
const powerGraph = () => {
  const ox = 40, oy = 114, W = 300, wl = 120;
  let b = arrow(ox, oy, W - 10, oy) + arrow(ox, oy, ox, 6) + text(W - 10, oy + 18, 't', { i: 1, a: 'end', s: 16 }) + text(ox + 8, 14, 'P', { i: 1, a: 'start', s: 16 });
  b += curve(ox, ox + 2 * wl, x => oy - 76 * Math.sin(Math.PI * (x - ox) / wl) ** 2, '#DB2777', 2.6);
  b += line(ox, oy - 38, ox + 2 * wl + 6, oy - 38, '#1E293B', 1.6, 'stroke-dasharray="6 4"') + text(ox - 6, oy - 34, '⟨P⟩', { a: 'end', s: 13, b: 1 }) + text(ox - 6, oy - 72, 'P₀', { a: 'end', s: 13, b: 1 });
  b += line(ox, oy - 76, ox + wl / 2, oy - 76, '#94A3B8', 1.2, 'stroke-dasharray="4 3"');
  return svg(W, 134, b, 290);
};
// impedance triangle: R across, X up (or down), Z hypotenuse
const zTriangle = (xl = 'X_L') => {
  const x0 = 26, y0 = 112, w = 170, h = 84, c = '#DC2626';
  const sub = s => s.replace(/_(\w)/, '<tspan font-size="11" dy="4">$1</tspan><tspan dy="-4"></tspan>');
  let b = line(x0, y0, x0 + w, y0, '#1E293B', 2.6) + line(x0 + w, y0, x0 + w, y0 - h, '#1E293B', 2.6) + line(x0, y0, x0 + w, y0 - h, c, 3);
  b += `<path d="M${x0 + w - 12} ${y0} v-12 h12" fill="none" stroke="#1E293B" stroke-width="1.4"/>` + `<path d="M${x0 + 40} ${y0} A40 40 0 0 0 ${(x0 + 40 * Math.cos(Math.atan(h / w))).toFixed(1)} ${(y0 - 40 * Math.sin(Math.atan(h / w))).toFixed(1)}" fill="none" stroke="#1E293B" stroke-width="1.5"/>`;
  b += text(x0 + 52, y0 - 6, 'φ', { i: 1, s: 16 }) + text(x0 + w / 2, y0 + 20, 'R  (V<tspan font-size="11" dy="4">R</tspan><tspan dy="-4">)</tspan>', { i: 1, s: 15 }) + text(x0 + w + 8, y0 - h / 2 + 5, sub(xl), { a: 'start', i: 1, s: 15 }) + text(x0 + w / 2 - 14, y0 - h / 2 - 8, 'Z  (V)', { i: 1, s: 15, c, b: 1 });
  return svg(250, 136, b, 240);
};
const fig = (topic, i = 0, max = 330) => { const f = (TOPIC_FIGS[topic] || [])[i]; if (!f) throw new Error('no fig ' + topic + ' #' + i); return f.svg.replace(/<svg /, `<svg style="width:100%;max-width:${max}px;height:auto;display:block;margin:4px auto" `).replace(/ width="\d+"/, ''); };
// simple plot: curves given as normalised y(x) on 0..1; o = {xl, yl, c:[{f,col,lab,lx,ly,dash}], h:[[y,label]], v:[[x,label]], W, H}
const plot = o => {
  const W = o.W || 290, H = o.H || 160, ox = 40, oy = H - 26, w = W - ox - 22, h = oy - 18;
  let b = arrow(ox, oy, ox + w + 12, oy) + arrow(ox, oy, ox, 8) + text(ox + w + 12, oy + 19, o.xl, { i: 1, a: 'end', s: 15 }) + text(ox + 8, 16, o.yl, { i: 1, a: 'start', s: 15 }) + (o.zero === false ? '' : text(ox - 6, oy + 16, '0', { a: 'end', s: 13 }));
  (o.h || []).forEach(([y, l]) => { b += line(ox, oy - y * h, ox + w, oy - y * h, '#94A3B8', 1.3, 'stroke-dasharray="5 4"') + text(ox - 5, oy - y * h + 5, l, { a: 'end', s: 13, b: 1 }); });
  (o.v || []).forEach(([x, l]) => { b += line(ox + x * w, oy, ox + x * w, 14, '#94A3B8', 1.3, 'stroke-dasharray="5 4"') + text(ox + x * w, oy + 17, l, { s: 13, b: 1 }); });
  (o.c || []).forEach(c => { b += curve(ox + (c.x0 || 0) * w, ox + (c.x1 == null ? 1 : c.x1) * w, x => oy - c.f((x - ox) / w) * h, c.col || '#2563EB', 2.6, c.dash); if (c.lab) b += text(ox + c.lx * w, oy - c.ly * h, c.lab, { c: c.col || '#2563EB', b: 1, s: 14, a: c.a || 'start' }); });
  return svg(W, H, b + (o.extra || ''), W);
};
const K = { svg, plot, line, text, arrow, curve, SYM, sym, loop, reactanceGraph, phasor, waves, powerGraph, zTriangle, fig };

// ---------- markup ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tex = (t, display) => katex.renderToString(t, { displayMode: !!display, throwOnError: true, output: 'html', strict: false });
// inline: $...$ is TeX, **...** bold, everything else is HTML
const inl = s => String(s).replace(/\$([^$]+)\$/g, (_, t) => tex(t)).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
const COLORS = { blue: '#2563EB', green: '#15803D', pink: '#DB2777', purple: '#7C3AED', teal: '#0F766E', orange: '#EA580C', red: '#DC2626', amber: '#B45309', navy: '#1B3A6B', sky: '#0369A1' };

function item(it) {
  const [k, v, w] = it;
  switch (k) {
    case 'f': return `<div class="fx">${tex(v, true)}</div>`;
    case 'fs': return `<div class="fxs">${v.map(t => `<div class="fx">${tex(t, true)}</div>`).join('')}</div>`;
    case 'b': return `<ul>${v.map(x => `<li>${inl(x)}</li>`).join('')}</ul>`;
    case 'p': return `<p>${inl(v)}</p>`;
    case 'note': return `<p class="note">${inl(v)}</p>`;
    case 'kv': return `<dl>${v.map(([a, b]) => `<dt>${inl(a)}</dt><dd>${inl(b)}</dd>`).join('')}</dl>`;
    case 'svg': return v;
    case 'row': return `<div class="row" style="grid-template-columns:${(w || v.map(() => '1fr').join(' ')).replace(/([\d.]+)fr/g, 'minmax(0,$1fr)')}">${v.map(c => `<div>${c.map(item).join('')}</div>`).join('')}</div>`;
    case 'sub': return `<div class="sub" style="--c:${COLORS[w] || w}"><h4>${inl(v[0])}</h4>${v.slice(1).map(item).join('')}</div>`;
    case 'tbl': return `<table><thead><tr>${v[0].map(h => `<th>${inl(h)}</th>`).join('')}</tr></thead><tbody>${v.slice(1).map(r => `<tr>${r.map(c => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    case 'num': return `<ol class="num">${v.map(x => `<li>${inl(x)}</li>`).join('')}</ol>`;
    default: throw new Error('unknown item ' + k);
  }
}
let boxNo = 0;
function page(id, ch) {
  boxNo = 0;
  const nm = names[id], sem = id.startsWith('S2-') ? 2 : id.startsWith('S3-') ? 3 : 1;
  const col = c => ch.boxes.filter(b => b.col === c);
  boxNo = 0; [...ch.boxes, ...(ch.rows || []).flatMap(r => r.boxes)].forEach(b => { if (b.n !== false) b._n = ++boxNo; });
  const boxN = b => { const n = b.n === false ? '' : `<span class="no">${b._n}</span>`; return `<section class="box" data-link="${b.link === false || b.col === 'W' ? 0 : 1}" style="--c:${COLORS[b.c] || b.c}${b.grow === false ? ';flex-grow:0' : ''}"><h3>${n}<span>${inl(b.t)}</span>${b.icon ? `<span class="ic">${b.icon}</span>` : ''}</h3><div class="bd">${b.body.map(item).join('')}</div></section>`; };
  const colH = c => { const bs = col(c).map(boxN); if (c === 'M') bs.splice(ch.hubAt || 0, 0, `<section class="hub" id="hub"><div class="hubin"><div class="hc">Chapter ${nm.num}</div><h1>${inl(ch.hubTitle || nm.title)}</h1>${ch.hubIcon || ''}<p>${inl(ch.idea)}</p></div></section>`); return `<div class="col">${bs.join('')}</div>`; };
  const rows = (ch.rows || []).map(r => `<div class="wrow" style="grid-template-columns:${(r.cols || r.boxes.map(() => '1fr').join(' ')).replace(/([\d.]+)fr/g, 'minmax(0,$1fr)')}">${r.boxes.map(boxN).join('')}</div>`).join('');
  const tips = ch.tips ? `<div class="tips"><div class="tl">EXAM TIPS</div>${ch.tips.map(t => `<div class="tp">${inl(t)}</div>`).join('')}</div>` : '';
  const css = `
@font-face{font-family:'Barlow Condensed';font-weight:600;src:url('file://${FBC}/barlow-condensed-latin-600-normal.woff2')}
@font-face{font-family:'Barlow Condensed';font-weight:700;src:url('file://${FBC}/barlow-condensed-latin-700-normal.woff2')}
${[400, 600, 700].map(w => `@font-face{font-family:'Source Sans 3';font-weight:${w};src:url('file://${FSS}/source-sans-3-latin-${w}-normal.woff2')}@font-face{font-family:'Source Sans 3';font-style:italic;font-weight:${w};src:url('file://${FSS}/source-sans-3-latin-${w}-italic.woff2')}`).join('')}
@page{size:A4;margin:0}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff}
:root{--fs:17px}
body{font-family:'Source Sans 3',sans-serif;color:#1E293B;font-size:var(--fs);line-height:1.32}
.pg{width:1240px;height:1754px;padding:26px 30px 22px;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden;background:#FBFCFE}
.top{display:flex;justify-content:space-between;align-items:center;font-family:'Barlow Condensed';font-weight:600;font-size:19px;letter-spacing:.06em;text-transform:uppercase;color:#1B3A6B;border-bottom:3px solid #1B3A6B;padding-bottom:6px}
.top b{color:#EA580C}
.grid{flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;min-height:0;position:relative;z-index:1}
.col{display:flex;flex-direction:column;gap:16px;min-height:0}
.box{flex-grow:1;background:#fff;border:2.6px solid var(--c);border-radius:16px;overflow:hidden;position:relative;z-index:2}
.box h3{margin:0;display:flex;align-items:center;gap:9px;padding:7px 12px 6px;background:color-mix(in srgb,var(--c) 11%,#fff);border-bottom:2px solid color-mix(in srgb,var(--c) 35%,#fff);color:color-mix(in srgb,var(--c) 82%,#000);font-family:'Barlow Condensed';font-weight:700;font-size:calc(var(--fs) * 1.45);letter-spacing:.03em;text-transform:uppercase;line-height:1.05}
.box h3 .ic{margin-left:auto;display:flex}
.no{flex:none;width:1.25em;height:1.25em;border-radius:50%;background:var(--c);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.85em}
.bd{padding:8px 13px 10px}
.bd>*:first-child{margin-top:0}
p{margin:5px 0}
ul{margin:5px 0;padding-left:1.15em}
li{margin:2px 0}
li::marker{color:var(--c)}
.fx{overflow:hidden;border:2px solid color-mix(in srgb,var(--c) 55%,#fff);background:color-mix(in srgb,var(--c) 5%,#fff);border-radius:10px;padding:2px 12px;margin:7px auto;width:max-content;max-width:100%}
.fx .katex-display{margin:3px 0}
.fx .katex{font-size:1.18em}
.fxs{display:flex;flex-wrap:wrap;gap:4px 12px;justify-content:center}
.fxs .fx{margin:4px 0}
.katex{font-size:1.06em}
.note{background:color-mix(in srgb,var(--c) 9%,#fff);border-left:4px solid var(--c);padding:5px 9px;border-radius:0 8px 8px 0}
dl{display:grid;grid-template-columns:max-content 1fr;gap:10px 14px;margin:6px 0;align-items:center}
dt{font-weight:700;color:color-mix(in srgb,var(--c) 82%,#000)}
dd{margin:0}
.row{display:grid;gap:10px;align-items:center}
.sub{border:2px solid var(--c);border-radius:12px;padding:6px 10px 7px;margin:8px 0;background:#fff}
.sub h4{margin:0 0 3px;font-family:'Barlow Condensed';font-weight:700;font-size:calc(var(--fs) * 1.25);text-transform:uppercase;color:var(--c);letter-spacing:.03em}
table{border-collapse:collapse;width:100%;margin:4px 0;font-size:.95em}
th{background:color-mix(in srgb,var(--c) 14%,#fff);color:color-mix(in srgb,var(--c) 80%,#000);text-align:left;padding:4px 7px;border:1.5px solid color-mix(in srgb,var(--c) 35%,#fff);font-weight:700}
td{padding:3px 7px;border:1.5px solid color-mix(in srgb,var(--c) 25%,#fff);vertical-align:middle}
ol.num{list-style:none;padding:0;margin:4px 0;counter-reset:n}
ol.num li{counter-increment:n;padding-left:1.9em;position:relative;margin:4px 0}
ol.num li::before{content:counter(n);position:absolute;left:0;top:.05em;width:1.35em;height:1.35em;border-radius:50%;background:var(--c);color:#fff;font-weight:700;font-size:.85em;display:flex;align-items:center;justify-content:center}
.hub{flex:none;display:flex;align-items:center;justify-content:center;padding:8px 0;position:relative;z-index:3}
.hubin{background:#fff;border:4px solid #1B3A6B;border-radius:42% 46% 40% 44% / 50% 46% 50% 44%;box-shadow:0 0 0 7px #fff,0 0 0 10px #EA580C;padding:20px 52px 18px;text-align:center;width:100%}
.hc{font-family:'Barlow Condensed';font-weight:700;color:#EA580C;letter-spacing:.12em;text-transform:uppercase;font-size:calc(var(--fs) * 1.1)}
.hub h1{margin:2px 0 6px;font-family:'Barlow Condensed';font-weight:700;color:#1B3A6B;font-size:calc(var(--fs) * 2.55);line-height:.98;text-transform:uppercase}
.hub p{margin:6px auto 0;color:#334155;font-size:.92em;max-width:88%}
.wrow{display:grid;gap:16px;position:relative;z-index:2}
.tips{display:flex;gap:10px;align-items:stretch;border:2.6px solid #1B3A6B;border-radius:14px;padding:8px 10px;background:#fff;position:relative;z-index:2}
.tl{flex:none;display:flex;align-items:center;font-family:'Barlow Condensed';font-weight:700;font-size:calc(var(--fs) * 1.45);color:#fff;background:#1B3A6B;border-radius:9px;padding:0 14px;letter-spacing:.04em}
.tp{flex:1;font-size:.93em;padding:2px 6px 2px 22px;position:relative;align-self:center}
.tp::before{content:'✓';position:absolute;left:4px;color:#EA580C;font-weight:700}
.foot{display:flex;justify-content:space-between;font-size:14px;color:#64748B}
.foot b{color:#1B3A6B}
#links{position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;pointer-events:none}
`;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="file://${KATEX}/katex.min.css"><style>${css}</style></head><body>
<div class="pg" id="pg"><svg id="links"></svg>
<div class="top"><span>PhysiQ <b>·</b> STPM Physics Semester ${sem}</span><span>Chapter ${nm.num} mind map</span></div>
<div class="grid">${['L', 'M', 'R'].map(colH).join('')}</div>
${rows}${tips}
<div class="foot"><span><b>PhysiQ</b> by Cikgu Suhaili</span><span>ellyelias.github.io/physiq</span></div>
</div></body></html>`;
}

// in-page: shrink the base font until everything fits, then draw hub-to-box links
async function fit(pg) {
  return pg.evaluate(async () => {
    await document.fonts.ready;
    const root = document.documentElement, P = document.getElementById('pg');
    const over = () => {
      if (P.scrollHeight > P.clientHeight + 1) return true;
      for (const b of document.querySelectorAll('.box,.box .bd,.hub,.tips')) { if (b.scrollWidth > b.clientWidth + 2) return true; }
      for (const c of document.querySelectorAll('.col')) { let s = 0; for (const k of c.children) s += k.scrollHeight; s += 16 * (c.children.length - 1); if (s > c.clientHeight + 1) return true; }
      return false;
    };
    let fs = 22; root.style.setProperty('--fs', fs + 'px');
    while (over() && fs > 12) { fs -= 0.25; root.style.setProperty('--fs', fs + 'px'); }
    // a formula wider than its box gets a smaller font of its own instead of shrinking the whole poster
    for (const f of document.querySelectorAll('.fx')) { let k = 1; while (f.scrollWidth > f.clientWidth + 1 && k > 0.6) { k -= 0.04; f.style.fontSize = k + 'em'; } }
    const hub = document.getElementById('hub').querySelector('.hubin').getBoundingClientRect(), pr = P.getBoundingClientRect();
    const hx = hub.left + hub.width / 2 - pr.left, hy = hub.top + hub.height / 2 - pr.top;
    let s = '';
    for (const b of document.querySelectorAll('.grid .box[data-link="1"]')) {
      const r = b.getBoundingClientRect(), c = getComputedStyle(b).getPropertyValue('--c');
      const bx = Math.min(Math.max(hx, r.left - pr.left + 30), r.right - pr.left - 30), by = r.top - pr.top + r.height / 2;
      const tx = (r.left - pr.left + r.width / 2), ty = by;
      const mx = (hx + tx) / 2;
      s += `<path d="M${hx} ${hy} C${mx} ${hy} ${mx} ${ty} ${tx} ${ty}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;
    }
    document.getElementById('links').innerHTML = s;
    return { fs, overflow: over() };
  });
}

(async () => {
  const DATA = require('./mindmap_data.js')(K);
  const want = process.argv.slice(2);
  const ids = want.length ? want : Object.keys(DATA);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: 1.25 });
  for (const id of ids) {
    if (!DATA[id]) { console.log('skip', id); continue; }
    const f = path.join(TMP, id + '.html');
    fs.writeFileSync(f, page(id, DATA[id]));
    const pg = await ctx.newPage();
    await pg.goto('file://' + f);
    const r = await fit(pg);
    const png = path.join(TMP, id + '.png');
    await pg.locator('#pg').screenshot({ path: png });
    await pg.pdf({ path: path.join(OUT_PDF, `PhysiQ_MindMap_${id}.pdf`), format: 'A4', printBackground: true, scale: 793.7 / 1240, margin: { top: 0, right: 0, bottom: 0, left: 0 }, pageRanges: '1' });
    cp.execFileSync('python3', ['-c', `from PIL import Image;Image.open(${JSON.stringify(png)}).save(${JSON.stringify(path.join(OUT_IMG, id + '.webp'))},'WEBP',quality=82,method=6)`]);
    console.log(id, 'font', r.fs, r.overflow ? 'OVERFLOW' : 'ok');
    await pg.close();
  }
  await browser.close();
  // list every chapter that has a poster in index.html so the Notes tab shows it
  const have = fs.readdirSync(OUT_IMG).filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)).filter(i => DATA[i]);
  const ord = i => (i.startsWith('S2-') ? 200 : i.startsWith('S3-') ? 300 : 100) + +i.replace(/^S\d-/, '');
  have.sort((x, y) => ord(x) - ord(y));
  const ip = path.join(ROOT, 'index.html');
  const src = fs.readFileSync(ip, 'utf8'), re = /const MINDMAP_POSTERS = \[[^\]]*\];/;
  if (!re.test(src)) throw new Error('MINDMAP_POSTERS not found in index.html');
  fs.writeFileSync(ip, src.replace(re, `const MINDMAP_POSTERS = ${JSON.stringify(have)};`));
  console.log('posters:', have.join(' '));
  // one PDF per semester with every chapter's mind map
  for (const sem of [1, 2, 3]) {
    const ids = have.filter(i => (i.startsWith('S2-') ? 2 : i.startsWith('S3-') ? 3 : 1) === sem);
    if (!ids.length) continue;
    const all = path.join(OUT_PDF, `PhysiQ_MindMaps_Sem${sem}.pdf`);
    cp.execFileSync('python3', ['-c', 'import sys;from pypdf import PdfWriter\nw=PdfWriter()\nfor p in sys.argv[2:]: w.append(p)\nw.write(sys.argv[1])', all, ...ids.map(i => path.join(OUT_PDF, `PhysiQ_MindMap_${i}.pdf`))]);
  }
})().catch(e => { console.error(e); process.exit(1); });
