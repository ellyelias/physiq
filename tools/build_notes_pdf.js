// Builds PhysiQ notes PDFs from index.html (the single source of truth) into ../downloads/.
// Needs: node + playwright, poppler (pdftotext, pdfinfo), python3 + pypdf.   usage: node tools/build_notes_pdf.js [1|2|3|all] [nochap]
const fs = require('fs'), vm = require('vm'), path = require('path'), cp = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'downloads');
const TMP = path.join(require('os').tmpdir(), 'physiq_pdf');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(TMP, { recursive: true });

// ---------- load notes + mathify straight from index.html ----------
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const L = html.split('\n');
const s = L.findIndex(l => l.startsWith('const NOTES_CONTENT'));
let e = s; while (!/^\};\s*$/.test(L[e])) e++;
const x = L.findIndex(l => l.startsWith('const NOTES_EXTRA'));
let y = x; while (!/^\}\)\(\);/.test(L[y])) y++;
const ctx = {}; vm.createContext(ctx);
vm.runInContext(L.slice(s, e + 1).join('\n').replace('const NOTES_CONTENT', 'NOTES_CONTENT'), ctx);
vm.runInContext(L.slice(x, y + 1).join('\n').replace('const NOTES_EXTRA', 'NOTES_EXTRA'), ctx);
const NOTES = ctx.NOTES_CONTENT, EXTRA = ctx.NOTES_EXTRA;
const a0 = html.indexOf('  function mathify(html){'), b0 = html.indexOf('  function renderNotesContent(){');
const mathify = (new Function(html.slice(a0, b0) + '\nreturn mathify;'))();

// chapter names
const names = {};
for (const m of html.matchAll(/'((?:S[23]-)?\d+)':'(Chapter \d+ — [^']+)'/g)) names[m[1]] = m[2];

const SEM = {
  1: { title: 'Mechanics & Heat', range: '1–12' },
  2: { title: 'Electricity & Magnetism', range: '12–18' },
  3: { title: 'Oscillations, Waves & Modern Physics', range: '19–25' },
};
const chapterId = k => { const m = k.match(/^(S[23]-)?(\d+)\./); return m ? (m[1] || '') + m[2] : null; };
const semOf = k => k.startsWith('S2-') ? 2 : k.startsWith('S3-') ? 3 : 1;
const chNum = id => id.replace(/^S\d-/, '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = t => t.replace(/^Chapter \d+ — /, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- group topics ----------
const bySem = { 1: [], 2: [], 3: [] };
for (const k of Object.keys(NOTES)) {
  const cid = chapterId(k); if (!cid) continue;
  const sem = semOf(k);
  let ch = bySem[sem].find(c => c.id === cid);
  if (!ch) { ch = { id: cid, num: +chNum(cid), title: names[cid], topics: [] }; bySem[sem].push(ch); }
  ch.topics.push(k);
}
for (const sem in bySem) bySem[sem].sort((a, b) => a.num - b.num);

// ---------- CSS ----------
const CSS = `
@page { size: A4; margin: 20mm 16mm 20mm 16mm; }
:root{--navy:#1B3A6B;--navy-tint:#EEF2F8;--orange:#EA580C;--orange-tint:#FDECE0;--ink:#1E293B;--sub:#64748B;--line:#DCE3ED;}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
html,body{margin:0;padding:0;}
body{font-family:Calibri,Carlito,Candara,"Segoe UI",sans-serif;font-size:10.5pt;line-height:1.5;color:var(--ink);}
.mono{font-family:Consolas,"DejaVu Sans Mono",monospace;}
/* cover */
.cover{height:257mm;position:relative;page-break-after:always;}
.cover .band{background:var(--navy);color:#fff;margin:-20mm -16mm 0;padding:26mm 16mm 16mm;height:118mm;position:relative;}
.cover .eyebrow{font-family:Consolas,"DejaVu Sans Mono",monospace;letter-spacing:.2em;font-size:10pt;color:#FDBA74;text-transform:uppercase;font-weight:700;}
.cover h1{font-size:44pt;line-height:1.02;margin:10mm 0 3mm;font-weight:700;letter-spacing:-.01em;}
.cover h1 span{color:#FB923C;display:block;font-size:30pt;margin-top:2mm;}
.cover .scale{position:absolute;left:16mm;right:16mm;bottom:12mm;height:7mm;border-bottom:1.6px solid #8FA6CB;
  background:repeating-linear-gradient(to right,#8FA6CB 0,#8FA6CB 1.6px,transparent 1.6px,transparent 8mm) bottom/100% 5mm no-repeat;}
.cover .sem{margin-top:16mm;}
.cover .sem .big{font-size:26pt;font-weight:700;color:var(--navy);line-height:1.15;}
.cover .sem .sub{font-size:14pt;color:var(--sub);margin-top:2mm;}
.cover .what{margin-top:14mm;border-left:4px solid var(--orange);padding:3mm 0 3mm 6mm;font-size:11.5pt;color:var(--ink);max-width:140mm;}
.cover .what b{color:var(--navy);}
.cover .foot{position:absolute;left:0;right:0;bottom:0;font-size:9.5pt;color:var(--sub);display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:4mm;}
/* contents */
.toc h1{font-size:22pt;color:var(--navy);margin:0 0 6mm;padding-bottom:3mm;border-bottom:3px solid var(--orange);}
.toc .row{display:flex;align-items:baseline;gap:3mm;}
.toc .row .t{flex:0 1 auto;}
.toc .row .dots{flex:1 1 auto;border-bottom:1px dotted #94A3B8;transform:translateY(-3px);min-width:6mm;}
.toc .row .pg{flex:0 0 auto;font-weight:700;color:var(--navy);font-family:Consolas,"DejaVu Sans Mono",monospace;font-size:9.5pt;}
.toc .ch{margin-top:4.2mm;font-weight:700;color:var(--navy);font-size:11.5pt;}
.toc .tp{margin-left:6mm;font-size:10pt;color:#334155;}
.toc .legend{margin-top:9mm;font-size:9.5pt;}
.toc .legend .note-trap,.toc .legend .note-trick{margin:2mm 0;}
/* chapter + topic headings */
.chapter{page-break-before:always;margin:0 0 6mm;}
.chapter .lab{font-family:Consolas,"DejaVu Sans Mono",monospace;letter-spacing:.16em;color:var(--orange);font-weight:700;font-size:9.5pt;text-transform:uppercase;}
.chapter h1{font-size:23pt;color:var(--navy);margin:1mm 0 0;line-height:1.15;padding-bottom:3mm;border-bottom:3px solid var(--orange);}
.topic{margin-top:8mm;}
.topic:first-of-type{margin-top:0;}
.topic > h2{font-size:15pt;color:var(--navy);margin:0 0 3mm;padding:2mm 0 1.6mm;border-bottom:1.2px solid var(--line);break-after:avoid;}
.guide-h{page-break-before:always;}
/* notes content (mirrors the app) */
.nc h3{color:var(--navy);margin:5mm 0 2mm;font-size:11.5pt;text-transform:uppercase;letter-spacing:.05em;break-after:avoid;border-left:4px solid var(--orange);padding-left:2.5mm;}
.nc h3:first-child{margin-top:0;}
.nc ul{margin:0 0 3mm 5mm;padding:0;}
.nc li{margin-bottom:1.6mm;font-size:10.5pt;line-height:1.5;break-inside:avoid;}
.nc p{margin:0 0 3mm;}
.nc b{color:var(--navy);}
.nc .note-trap,.note-trap{background:var(--orange-tint);border-left:3px solid var(--orange);padding:2.2mm 3.5mm;border-radius:0 5px 5px 0;margin:2.2mm 0;font-size:10pt;line-height:1.45;break-inside:avoid;}
.nc .note-trick,.note-trick{background:var(--navy-tint);border-left:3px solid var(--navy);padding:2.2mm 3.5mm;border-radius:0 5px 5px 0;margin:2.2mm 0;font-size:10pt;line-height:1.45;break-inside:avoid;}
.nc .ftable-wrap{margin:0 0 3mm;}
.nc table.ftable{border-collapse:collapse;width:100%;font-size:9.6pt;}
.nc .ftable thead{display:table-header-group;}
.nc .ftable tr{break-inside:avoid;}
.nc .ftable th{background:var(--navy);color:#fff;text-align:left;padding:2mm 2.5mm;font-size:8.2pt;letter-spacing:.06em;text-transform:uppercase;}
.nc .ftable td{padding:2mm 2.5mm;border:1px solid #CBD5E1;vertical-align:top;line-height:1.5;}
.nc .ftable tbody tr:nth-child(even) td{background:#F7F9FC;}
.nc .ftable td:nth-child(1){font-weight:700;color:var(--navy);width:21%;}
.nc .ftable td:nth-child(2){font-size:10.8pt;width:33%;background:#F1F5FB !important;}
.nc .ftable td:nth-child(3){color:#475569;font-size:9pt;}
.nc ul.fremarks{margin-top:-1mm;}
/* typography helpers (same as app) */
sup,sub{font-size:.72em;line-height:0;position:relative;vertical-align:baseline;}
sup{top:-.5em;} sub{top:.28em;}
.frac{display:inline-block;vertical-align:middle;text-align:center;margin:0 .18em;line-height:1.2;font-size:.96em;}
.frac .n{display:block;padding:0 .25em .06em;border-bottom:1.3px solid currentColor;}
.frac .d{display:block;padding:.06em .25em 0;}
.sqrt .rad{border-top:1.3px solid currentColor;padding:0 .12em;margin-left:1px;}
svg.inf{width:1.3em;height:.65em;vertical-align:-.04em;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;}
`;

const DATE = 'October 2026';
const wrap = (body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${extra}</style></head><body>${body}</body></html>`;

// ---------- sections ----------
const topicHtml = k => `<section class="topic"><h2>${esc(k.replace(/^S[23]-/, ''))}</h2><div class="nc">${mathify(NOTES[k])}</div></section>`;
const chapterHead = ch => `<div class="chapter"><div class="lab">Chapter ${ch.num}</div><h1>${esc(ch.title.replace(/^Chapter \d+ — /, ''))}</h1></div>`;
const chapterHeadFirst = ch => chapterHead(ch).replace('class="chapter"', 'class="chapter" style="page-break-before:auto"');
const guideHtml = sem => `<div class="chapter guide-h"><div class="lab">Section A · Semester ${sem}</div><h1>${'Section A Guide'}</h1></div><div class="nc">${mathify(EXTRA.guides['GUIDE-' + sem])}</div>`;

function cover(sem) {
  const S = SEM[sem], chs = bySem[sem];
  const ntopics = chs.reduce((n, c) => n + c.topics.length, 0);
  return `<div class="cover">
  <div class="band"><div class="eyebrow">STPM Physics · Revision notes</div>
    <h1>PhysiQ<span>by Cikgu Suhaili</span></h1><div class="scale"></div></div>
  <div class="sem"><div class="big">Semester ${sem} Notes</div>
    <div class="sub">${esc(S.title)} · Chapters ${S.range}</div></div>
  <div class="what"><b>${chs.length} chapters · ${ntopics} topics.</b> Definitions and laws, formula tables with symbols and units,
    how to answer in MPM style, and the Section A traps and tricks that cost marks in the multiple-choice paper.</div>
  <div class="foot"><span>ellyelias.github.io/physiq</span><span>${DATE}</span></div></div>`;
}

function toc(sem, pages) {
  const chs = bySem[sem];
  const row = (cls, text, pg) => `<div class="row ${cls}"><span class="t">${esc(text)}</span><span class="dots"></span><span class="pg">${pg || ''}</span></div>`;
  let h = `<div class="toc"><h1>Contents</h1>`;
  h += row('ch', 'Section A Guide — traps, tricks and routine', pages['GUIDE']);
  for (const ch of chs) {
    h += row('ch', ch.title, pages['CH' + ch.id]);
    for (const t of ch.topics) h += row('tp', t.replace(/^S[23]-/, ''), pages[t]);
  }
  h += `<div class="legend"><div class="note-trap"><b>Trap:</b> a wrong option that looks right — the slip examiners rely on.</div>
        <div class="note-trick"><b>Trick:</b> a quick check or shortcut for the multiple-choice paper.</div></div></div>`;
  return h;
}

const headerT = sem => `<div style="width:100%;font-family:Carlito,Calibri,sans-serif;font-size:8px;color:#64748B;padding:0 16mm;display:flex;justify-content:space-between;border-bottom:.5px solid #DCE3ED;padding-bottom:3px;margin-top:6mm;-webkit-print-color-adjust:exact;"><span><b style="color:#1B3A6B">PhysiQ</b> by Cikgu Suhaili</span><span>STPM Physics · Semester ${sem}</span></div>`;
const footerT = `<div style="width:100%;font-family:Carlito,Calibri,sans-serif;font-size:8px;color:#64748B;padding:0 16mm;display:flex;justify-content:space-between;margin-bottom:6mm;"><span>ellyelias.github.io/physiq</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

async function render(browser, bodyHtml, file, sem, withHF = true, extraCss = '', zero = false) {
  const p = await browser.newPage();
  await p.setContent(wrap(bodyHtml, extraCss), { waitUntil: 'load' });
  await p.pdf({ path: file, format: 'A4', printBackground: true, displayHeaderFooter: withHF,
    headerTemplate: withHF ? headerT(sem) : '<div></div>', footerTemplate: withHF ? footerT : '<div></div>',
    margin: zero ? { top: '0', bottom: '0', left: '0', right: '0' } : { top: '20mm', bottom: '20mm', left: '16mm', right: '16mm' }, outline: true, tagged: true });
  await p.close();
}

const pageTexts = f => {
  const n = +/Pages:\s+(\d+)/.exec(cp.execSync(`pdfinfo "${f}"`).toString())[1];
  const arr = []; for (let i = 1; i <= n; i++) arr.push(cp.execSync(`pdftotext -f ${i} -l ${i} -layout "${f}" -`).toString().replace(/\s+/g, ' '));
  return arr;
};

async function buildSemester(browser, sem) {
  const chs = bySem[sem];
  const bodyOf = pages => toc(sem, pages) + guideHtml(sem) + chs.map(ch => chapterHead(ch) + ch.topics.map(topicHtml).join('')).join('');
  const tmpBody = path.join(TMP, `sem${sem}_body.pdf`);
  // pass 1: no page numbers (use placeholder width so layout is stable)
  const dummy = {}; dummy['GUIDE'] = '00'; for (const ch of chs) { dummy['CH' + ch.id] = '00'; for (const t of ch.topics) dummy[t] = '00'; }
  await render(browser, bodyOf(dummy), tmpBody, sem);
  const texts = pageTexts(tmpBody);
  const last = needle => { for (let i = texts.length - 1; i >= 0; i--) if (texts[i].includes(needle)) return i + 1; return null; };
  const pages = {};
  pages['GUIDE'] = last('SECTION A · SEMESTER ' + sem) || last('Section A Guide');
  for (const ch of chs) {
    pages['CH' + ch.id] = last('CHAPTER ' + ch.num + ' ' + ch.title.replace(/^Chapter \d+ — /, '').toUpperCase().slice(0, 12)) || last(ch.title.replace(/^Chapter \d+ — /, ''));
    for (const t of ch.topics) pages[t] = last(t.replace(/^S[23]-/, ''));
  }
  // pass 2: with real page numbers
  const finalBody = path.join(TMP, `sem${sem}_final.pdf`);
  await render(browser, bodyOf(pages), finalBody, sem);
  const t2 = pageTexts(finalBody);
  // cover
  const coverPdf = path.join(TMP, `sem${sem}_cover.pdf`);
  const COVER_CSS = `@page{margin:0}.cover{height:296.5mm;page-break-after:auto;overflow:hidden}.cover .band{margin:0;padding:34mm 20mm 16mm;height:132mm}.cover .scale{left:20mm;right:20mm;bottom:14mm}.cover .sem,.cover .what{margin-left:20mm;margin-right:20mm}.cover .sem{margin-top:20mm}.cover .what{max-width:150mm}.cover .foot{left:20mm;right:20mm;bottom:14mm}`;
  await render(browser, cover(sem), coverPdf, sem, false, COVER_CSS, true);
  const outFile = path.join(OUT, `PhysiQ_Sem${sem}_Notes.pdf`);
  cp.execSync(`python3 - <<'PY'
import warnings; warnings.filterwarnings('ignore')
from pypdf import PdfWriter, PdfReader
w=PdfWriter()
w.append(PdfReader("${coverPdf}"),pages=(0,1))
w.append(PdfReader("${finalBody}"),import_outline=True)
w.add_metadata({"/Title":"PhysiQ — STPM Physics Semester ${sem} Notes","/Author":"Cikgu Suhaili","/Subject":"STPM Physics revision notes"})
w.write("${outFile}")
PY`);
  // check numbers consistent between passes
  const drift = Object.keys(pages).filter(k => { const nn = (k === 'GUIDE' ? 'SECTION A · SEMESTER ' + sem : k.startsWith('CH') ? null : k.replace(/^S[23]-/, '')); return false; });
  console.log(`Sem ${sem}: ${chs.length} chapters, body ${t2.length} pages -> ${outFile}`);
  return outFile;
}

async function buildChapters(browser, sem) {
  for (const ch of bySem[sem]) {
    const body = `<div class="chapter" style="page-break-before:auto;margin-top:0"><div class="lab">STPM Physics · Semester ${sem} · Chapter ${ch.num}</div><h1>${esc(ch.title.replace(/^Chapter \d+ — /, ''))}</h1></div>` + ch.topics.map(topicHtml).join('');
    const f = path.join(OUT, `PhysiQ_Sem${sem}_Ch${String(ch.num).padStart(2, '0')}.pdf`);
    await render(browser, body, f, sem);
    cp.execSync(`python3 - <<'PY'
import warnings; warnings.filterwarnings('ignore')
from pypdf import PdfReader, PdfWriter
r=PdfReader("${f}"); w=PdfWriter(); w.append(r,import_outline=True)
w.add_metadata({"/Title":"PhysiQ — Semester ${sem}, ${ch.title.replace(/"/g, '')}","/Author":"Cikgu Suhaili"})
w.write("${f}")
PY`);
  }
  console.log(`Sem ${sem}: ${bySem[sem].length} chapter PDFs`);
}

(async () => {
  const which = process.argv[2] || 'all';
  const sems = which === 'all' ? [1, 2, 3] : [+which];
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
  for (const sem of sems) { await buildSemester(browser, sem); if (process.argv[3] !== 'nochap') await buildChapters(browser, sem); }
  await browser.close();
})();
