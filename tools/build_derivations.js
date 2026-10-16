// Builds the printable "syllabus derivations" sheets, one PDF per chapter, from the DV data in index.html.
// Output: downloads/derivations/PhysiQ_Derivations_<id>.pdf  (+ PhysiQ_Derivations_Sem<n>.pdf with every chapter)
// Needs: node + playwright, python3 + pypdf, and in NODE_PATH: @fontsource/barlow-condensed, @fontsource/source-sans-3
// usage: node tools/build_derivations.js [1|2|3 ...]      (default: 1)
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'downloads', 'derivations');
const TMP = path.join(os.tmpdir(), 'physiq_dv');
[OUT, TMP].forEach(d => fs.mkdirSync(d, { recursive: true }));
const mod = n => path.dirname(require.resolve(n + '/package.json'));
const FBC = path.join(mod('@fontsource/barlow-condensed'), 'files');
const FSS = path.join(mod('@fontsource/source-sans-3'), 'files');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const grab = (start, end) => { const a = html.indexOf(start), b = html.indexOf(end, a); if (a < 0 || b < 0) throw new Error('not found: ' + start); return html.slice(a, b); };
const mathify = new Function(grab('  function mathify(html){', '  function renderNotesContent(){') + '\nreturn mathify;')();
const DV = new Function(grab('  const DV = (() => {', '\n  })();') + '\n  })();\nreturn DV;')();
const derivPrep = new Function(grab('  function derivPrep(t){', '\n  function derivPage(') + '\nreturn derivPrep;')();
const derivAppChapter = (sem, ch) => sem === 1 ? String(ch) : 'S' + sem + '-' + (Number(ch) - 1);
const M = t => mathify(derivPrep(t));
const COLORS = ['#2563EB', '#15803D', '#DB2777', '#7C3AED', '#0F766E', '#EA580C', '#DC2626', '#B45309'];

const CSS = `
@font-face{font-family:'Barlow Condensed';font-weight:700;src:url('file://${FBC}/barlow-condensed-latin-700-normal.woff2')}
@font-face{font-family:'Barlow Condensed';font-weight:600;src:url('file://${FBC}/barlow-condensed-latin-600-normal.woff2')}
${[400, 600, 700].map(w => `@font-face{font-family:'Source Sans 3';font-weight:${w};src:url('file://${FSS}/source-sans-3-latin-${w}-normal.woff2')}@font-face{font-family:'Source Sans 3';font-style:italic;font-weight:${w};src:url('file://${FSS}/source-sans-3-latin-${w}-italic.woff2')}`).join('')}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;background:#fff}
body{font-family:'Source Sans 3',sans-serif;color:#1E293B;font-size:21px;line-height:1.45;width:1240px;padding:6px 34px 0}
.top{display:flex;justify-content:space-between;font-family:'Barlow Condensed';font-weight:600;font-size:19px;letter-spacing:.06em;text-transform:uppercase;color:#1B3A6B;border-bottom:3px solid #1B3A6B;padding-bottom:6px}
.top b{color:#EA580C}
.band{margin:18px 0 22px;background:#1B3A6B;border-radius:18px;padding:22px 30px;color:#fff;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;box-shadow:inset 0 -6px 0 #EA580C}
.band .k{font-family:'Barlow Condensed';font-weight:700;letter-spacing:.14em;color:#FDBA74;font-size:22px;text-transform:uppercase}
.band h1{margin:2px 0 0;font-family:'Barlow Condensed';font-weight:700;font-size:58px;line-height:1;text-transform:uppercase}
.band .r{text-align:right;font-size:19px;color:#CBD5E1;max-width:360px}
.band .r b{display:block;font-family:'Barlow Condensed';font-size:46px;color:#fff;line-height:1}
.card{border:2.6px solid var(--c);border-radius:16px;margin:0 0 22px;break-inside:avoid;overflow:hidden;background:#fff}
.card h2{margin:0;display:flex;align-items:center;gap:12px;padding:9px 16px;background:color-mix(in srgb,var(--c) 11%,#fff);border-bottom:2px solid color-mix(in srgb,var(--c) 35%,#fff);color:color-mix(in srgb,var(--c) 82%,#000);font-family:'Barlow Condensed';font-weight:700;font-size:31px;text-transform:uppercase;letter-spacing:.02em;line-height:1.05}
.no{flex:none;width:1.2em;height:1.2em;border-radius:50%;background:var(--c);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:.8em}
.code{flex:none;margin-left:auto;font-size:.62em;letter-spacing:.06em;border:2px solid var(--c);border-radius:20px;padding:2px 10px;color:var(--c);background:#fff}
.bd{padding:12px 18px 14px}
.res{border:2.4px solid color-mix(in srgb,var(--c) 60%,#fff);background:color-mix(in srgb,var(--c) 6%,#fff);border-radius:12px;padding:8px 16px;margin:2px 0 12px;font-size:1.12em;display:flex;gap:14px;align-items:center}
.res .l{font-family:'Barlow Condensed';font-weight:700;text-transform:uppercase;color:var(--c);letter-spacing:.06em;font-size:.85em}
.grid{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;align-items:start}
.grid.f{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)}
ol{list-style:none;counter-reset:n;margin:0;padding:0}
ol li{counter-increment:n;position:relative;padding-left:2.1em;margin:0 0 9px}
ol li::before{content:counter(n);position:absolute;left:0;top:.1em;width:1.45em;height:1.45em;border-radius:50%;background:var(--c);color:#fff;font-weight:700;font-size:.8em;display:flex;align-items:center;justify-content:center}
.fig{border:1.5px solid color-mix(in srgb,var(--c) 30%,#fff);border-radius:12px;padding:8px;background:#fff}
.fig svg{display:block;width:100%;height:auto}
.note{margin:10px 0 0;background:color-mix(in srgb,var(--c) 9%,#fff);border-left:5px solid var(--c);padding:7px 12px;border-radius:0 9px 9px 0;font-size:.95em}
b{color:#1B3A6B}
sup,sub{font-size:.72em;line-height:0;position:relative;vertical-align:baseline}
sup{top:-.5em} sub{top:.28em}
.frac{display:inline-block;vertical-align:middle;text-align:center;margin:0 .18em;line-height:1.2;font-size:.96em}
.frac .n,.frac>span:first-child{display:block;padding:0 .25em .06em;border-bottom:1.3px solid currentColor}
.frac .d,.frac>span:last-child{display:block;padding:.06em .25em 0}
.sqrt .rad{border-top:1.3px solid currentColor;padding:0 .12em;margin-left:1px}
.sqrt.sq2{display:inline-flex;align-items:stretch;vertical-align:middle;margin:0 .08em 0 .12em;white-space:nowrap;line-height:1.15;}
.sqrt.sq2 .rs{position:relative;flex:none;width:.62em;overflow:hidden;color:inherit;-webkit-text-fill-color:transparent;user-select:none; background: linear-gradient(to bottom right, transparent calc(50% - .75px), currentColor calc(50% - .75px), currentColor calc(50% + .75px), transparent calc(50% + .75px)) right top/62% 100% no-repeat, linear-gradient(to top right, transparent calc(50% - .9px), currentColor calc(50% - .9px), currentColor calc(50% + .9px), transparent calc(50% + .9px)) 4% bottom/36% 44% no-repeat;}
.sqrt.sq2 .rs::after{content:"";position:absolute;left:0;bottom:44%;width:10%;height:1.4px;background:currentColor;}
.sqrt.sq2 .rad{display:inline-flex;align-items:center;border-top:1.5px solid currentColor;margin-left:0;padding:.14em .14em 0 .1em;}
.sqrt.sq2 .rs{background:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 20' preserveAspectRatio='none'><path d='M0.3 12.2 L2.2 11 L5.4 19.6 L9.7 0.4' fill='none' stroke='%231E293B' stroke-width='1.3' stroke-linejoin='round' vector-effect='non-scaling-stroke'/></svg>") 0 0/100% 100% no-repeat !important} .sqrt.sq2 .rs::after{display:none}
svg.inf{width:1.3em;height:.65em;vertical-align:-.04em;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
`;

function sheet(sem, num, name, items) {
  const cards = items.map(([code, title, result, steps, fig, note], i) => {
    const c = COLORS[i % COLORS.length];
    return `<section class="card" style="--c:${c}"><h2><span class="no">${i + 1}</span><span>${title}</span><span class="code">Syllabus ${code}</span></h2><div class="bd">
<div class="res"><span class="l">Result</span><span>${M(result)}</span></div>
<div class="grid${fig ? ' f' : ''}"><ol>${steps.map(s => `<li>${M(s)}</li>`).join('')}</ol>${fig ? `<div class="fig">${fig}</div>` : ''}</div>
${note ? `<p class="note">${M(note)}</p>` : ''}</div></section>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="top"><span>PhysiQ <b>·</b> STPM Physics Semester ${sem}</span><span>Syllabus derivations</span></div>
<div class="band"><div><div class="k">Chapter ${num} · derivations</div><h1>${name}</h1></div><div class="r"><b>${items.length}</b>derivation${items.length > 1 ? 's' : ''} the STPM 2026 syllabus asks you to derive, deduce or show</div></div>
${cards}</body></html>`;
}

(async () => {
  const sems = (process.argv.slice(2).length ? process.argv.slice(2) : ['1']).map(Number);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
  const footer = `<div style="width:100%;font-family:sans-serif;font-size:8px;color:#64748B;display:flex;justify-content:space-between;padding:0 11mm"><span><b style="color:#1B3A6B">PhysiQ</b> by Cikgu Suhaili</span><span>page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;
  for (const sem of sems) {
    const parts = [];
    for (const [num, name, items] of DV.SEM[sem] || []) {
      const id = derivAppChapter(sem, num);
      const f = path.join(TMP, id + '.html');
      fs.writeFileSync(f, sheet(sem, sem === 1 ? num : Number(num) - 1, name, items)); // app chapter numbers (Sem 2 and 3 are one lower than the syllabus)
      await page.goto('file://' + f);
      await page.evaluate(() => document.fonts.ready);
      const out = path.join(OUT, `PhysiQ_Derivations_${id}.pdf`);
      await page.pdf({ path: out, format: 'A4', printBackground: true, scale: (210 - 0) / 25.4 * 96 / 1240, margin: { top: '9mm', bottom: '12mm', left: '0', right: '0' }, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: footer });
      parts.push(out);
      const pages = cp.execFileSync('pdfinfo', [out]).toString().match(/Pages:\s+(\d+)/)[1];
      console.log(id, name, items.length, 'derivations,', pages, 'page(s)');
    }
    const all = path.join(OUT, `PhysiQ_Derivations_Sem${sem}.pdf`);
    cp.execFileSync('python3', ['-c', 'import sys;from pypdf import PdfWriter\nw=PdfWriter()\nfor p in sys.argv[2:]: w.append(p)\nw.write(sys.argv[1])', all, ...parts]);
    console.log('semester file', path.basename(all));
  }
  await browser.close();
  // list every chapter that has a derivations sheet in index.html
  const have = fs.readdirSync(OUT).map(f => (f.match(/^PhysiQ_Derivations_((?:S\d-)?\d+)\.pdf$/) || [])[1]).filter(Boolean);
  const ord = i => (i.startsWith('S2-') ? 200 : i.startsWith('S3-') ? 300 : 100) + +i.replace(/^S\d-/, '');
  have.sort((x, y) => ord(x) - ord(y));
  const ip = path.join(ROOT, 'index.html'), src = fs.readFileSync(ip, 'utf8'), re = /const DERIV_SHEETS = \[[^\]]*\];/;
  if (!re.test(src)) throw new Error('DERIV_SHEETS not found in index.html');
  fs.writeFileSync(ip, src.replace(re, `const DERIV_SHEETS = ${JSON.stringify(have)};`));
  console.log('derivation sheets:', have.join(' '));
})().catch(e => { console.error(e); process.exit(1); });
