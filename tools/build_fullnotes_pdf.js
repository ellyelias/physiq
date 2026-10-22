// Builds the "Full notes · Cikgu Suhaili" PDFs (one per chapter + the whole semester) from the lessons in the app.
// The app is opened in a headless browser, each chapter is rendered exactly as students see it, then printed to A4:
// solutions and answers are shown open, and each simulation becomes a still picture with a pointer to the app.
// usage: (serve the repo folder's parent on :8766) node tools/build_fullnotes_pdf.js [sem=1]
//   env FONTS = path to @fontsource (inter, oswald, newsreader, dancing-script)
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'downloads', 'fullnotes');
const URL = process.env.PHYSIQ_URL || 'http://localhost:8766/physiq/index.html';
const SEM = process.argv[2] || '1';
const F = process.env.FONTS;
fs.mkdirSync(OUT, { recursive: true });

const ff = (fam, file, w, st = 'normal') => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(/__fonts/${file}) format('woff2')}`;
const FONT_CSS = [400, 500, 600, 700, 800].map(w => ff('Inter', `inter/files/inter-latin-${w}-normal.woff2`, w)).join('') +
  [400, 600, 700].map(w => ff('Inter', `inter/files/inter-greek-${w}-normal.woff2`, w)).join('') +
  [500, 600].map(w => ff('Newsreader', `newsreader/files/newsreader-latin-${w}-normal.woff2`, w)).join('') +
  ff('Anton', 'anton/files/anton-latin-400-normal.woff2', 400) +
  [500, 600, 700].map(w => ff('Oswald', `oswald/files/oswald-latin-${w}-normal.woff2`, w)).join('') +
  ff('Dancing Script', 'dancing-script/files/dancing-script-latin-700-normal.woff2', 700);

const PRINT_CSS = `
@page{size:A4;margin:14mm 13mm 17mm;}
html,body{background:#fff !important;}
#pdf *{box-shadow:none !important;text-shadow:none !important;filter:none !important;backdrop-filter:none !important;}
body{margin:0 !important;padding:0 !important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
#pdf{max-width:none;margin:0;padding:0;}
#pdf .ls{--ls-fs:13.5px;}
#pdf .ls-head{margin-bottom:16px;}
#pdf .ls-toc,#pdf .ls-size{display:none !important;}
#pdf .pdf-ch + .pdf-ch{break-before:page;}
#pdf .ls-ex,#pdf .ls-def,#pdf .ls-key,#pdf figure,#pdf .ls-simw,#pdf .ls-tw,#pdf .ls-tip,#pdf .ls-note,#pdf .ls-exer li,#pdf .ls-two,#pdf .ls-eq{break-inside:avoid;}
#pdf h3,#pdf h4,#pdf .ls-ex-h,#pdf .ls-exer-h{break-after:avoid;}
#pdf .ls-h{display:table;}
#pdf .ls-h,#pdf .ls-h4{break-inside:avoid;}
#pdf .ls-h::after,#pdf .ls-h4::after{content:"";display:block;height:110px;margin-bottom:-110px;}
#pdf details>summary{list-style:none;pointer-events:none;font-weight:700;}
#pdf details>summary::-webkit-details-marker{display:none;}
#pdf details>summary::before,#pdf details>summary::after{display:none !important;}
#pdf .ls-sim{display:flex;flex-direction:column;align-items:center;gap:6px;}
#pdf .ls-sim img{max-width:100%;max-height:300px;width:auto;height:auto;border-radius:10px;}
#pdf .sm-ro{display:flex !important;flex-wrap:wrap;gap:6px;justify-content:center;width:100%;}
#pdf .sm-ro>div{flex:0 1 auto;min-width:110px;margin:0 !important;}
#pdf .pdf-simnote{font-size:12px;color:#5A6170;margin:6px 0 0;text-align:center;}
#pdf .ls-svg{max-height:340px;}
.pdf-cover{break-after:page;height:263mm;background:#1D2B1F;color:#fff;border-radius:18px;padding:22mm 18mm;box-sizing:border-box;position:relative;overflow:hidden;font-family:Inter,sans-serif;}
.pdf-cover::after{content:"";position:absolute;right:-80mm;top:-62mm;width:125mm;height:95mm;border-radius:50%;border:12mm solid #D5DC3B;transform:rotate(-18deg);z-index:0;}
.pdf-cover>*{position:relative;z-index:1;}
.pdf-cover .k{color:#D5DC3B;font-weight:600;font-size:15px;letter-spacing:.04em;}
.pdf-cover h1{color:#fff !important;font-family:Oswald,sans-serif;font-weight:600;text-transform:uppercase;font-size:52px;line-height:1.05;margin:10px 0 6px;position:relative;z-index:1;}
.pdf-cover .by{font-family:'Dancing Script',cursive;font-size:34px;color:#D5DC3B;margin:0 0 12mm;}
.pdf-cover ol{list-style:none;padding:0;margin:0;max-width:120mm;font-size:16px;}
.pdf-cover li{color:#fff;display:flex;gap:14px;align-items:baseline;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.15);}
.pdf-cover li b{color:#D5DC3B !important;font-family:Oswald,sans-serif;font-weight:600;color:#D5DC3B;min-width:2.2em;font-size:18px;}
.pdf-cover .foot{position:absolute !important;left:18mm;bottom:16mm;font-size:13px;color:#C9D0BF;}
`;

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 760, height: 1000 }, deviceScaleFactor: 2 });
  await ctx.route(/script\.google\.com/, r => r.fulfill({ json: { ok: true, value: '', rows: [] } }));
  await ctx.route(/fonts\.googleapis\.com/, r => r.fulfill({ contentType: 'text/css', body: F ? FONT_CSS : '' }));
  if (F) await ctx.route(/\/__fonts\//, r => r.fulfill({ path: path.join(F, r.request().url().split('/__fonts/')[1]) }).catch(() => r.abort()));
  const p = await ctx.newPage(); p.on('pageerror', e => console.error('page error:', e.message));
  await p.goto(URL); await p.waitForTimeout(1200);
  if (SEM !== '1') { await p.selectOption('#semester-select', SEM); await p.waitForTimeout(1200); }
  await p.evaluate(() => document.querySelector('.tab[data-tab="notes"]').click());

  const keys = await p.evaluate(sem => Object.entries(window.PhysiQLessons.LESSONS).filter(([, L]) => L.sem === sem).sort((a, b) => a[1].chapter - b[1].chapter).map(([k, L]) => ({ k, ch: L.chapter, title: L.title })), SEM);
  const chapters = [];
  for (const c of keys) {
    await p.evaluate(k => { const s = document.getElementById('notes-topic-select'); s.value = k; s.dispatchEvent(new Event('change')); }, c.k);
    await p.waitForSelector('#notes-content .ls-body .ls-sec', { timeout: 15000 });
    await p.waitForTimeout(2500);   // let simulations run and draw a frame worth showing
    // simulations without a canvas: picture of the drawing area
    const simShots = {};
    const sims = await p.$$('#notes-content .ls-sim');
    for (let i = 0; i < sims.length; i++) {
      const hasCanvas = await sims[i].evaluate(el => !!el.querySelector('canvas'));
      if (!hasCanvas) { await sims[i].scrollIntoViewIfNeeded(); simShots[i] = 'data:image/png;base64,' + (await sims[i].screenshot()).toString('base64'); }
    }
    const html = await p.evaluate(({ shots, ch, sem }) => {
      const toJpg = c => { const w = document.createElement('canvas'); w.width = c.width; w.height = c.height; const x = w.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w.width, w.height); x.drawImage(c, 0, 0); return w.toDataURL('image/jpeg', 0.88); };
      const root = document.querySelector('#notes-content .ls');
      root.querySelectorAll('.ls-sim').forEach((s, i) => {
        const imgs = shots[i] ? [shots[i]] : [...s.querySelectorAll('canvas')].filter(c => c.width > 40 && c.height > 40).map(toJpg);
        const ro = s.querySelector('.sm-ro');
        s.innerHTML = imgs.map(u => `<img src="${u}" alt="">`).join('') + (ro ? ro.outerHTML : '') +
          `<p class="pdf-simnote">This is a still picture. Open PhysiQ › Notes › Semester ${sem} › Chapter ${ch} to use the simulation.</p>`;
      });
      root.querySelectorAll('.ls-sim-tag').forEach(t => { t.textContent = 'Simulation'; });
      root.querySelectorAll('details').forEach(d => {
        d.open = true; const s = d.querySelector('summary');
        if (s) s.textContent = /answer/i.test(s.textContent) ? 'Answer' : 'Solution';
      });
      const c = root.cloneNode(true);
      c.querySelectorAll('.ls-toc,.ls-size,script').forEach(x => x.remove());
      c.removeAttribute('data-size');
      return c.outerHTML;
    }, { shots: simShots, ch: c.ch, sem: SEM });
    chapters.push({ ...c, html });
    console.log('rendered', c.k, Math.round(html.length / 1024) + ' KB');
  }

  // print page: the app's own styles, only the notes in the body
  const semName = { 1: 'Mechanics & Heat', 2: 'Electricity & Magnetism', 3: 'Oscillations, Waves & Modern Physics' }[SEM];
  async function print(list, file, footerLabel, cover) {
    await p.evaluate(({ list, css, cover }) => {
      document.querySelectorAll('.pqb-view').forEach(x => x.remove());
      document.body.className = '';
      document.body.innerHTML = `<style>${css}</style><div id="pdf"><div id="notes-content">${cover || ''}${list.map(c => `<div class="pdf-ch">${c.html}</div>`).join('')}</div></div>`;
    }, { list, css: PRINT_CSS, cover });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.emulateMedia({ media: 'screen' });
    await p.pdf({
      path: path.join(OUT, file), format: 'A4', printBackground: true, displayHeaderFooter: true,
      margin: { top: '14mm', bottom: '17mm', left: '13mm', right: '13mm' },
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font:9px Inter,Arial,sans-serif;color:#6b7280;padding:0 13mm;display:flex;justify-content:space-between;"><span>PhysiQ · Notes by Cikgu Suhaili · ${footerLabel}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`
    });
    console.log('saved', file, Math.round(fs.statSync(path.join(OUT, file)).size / 1024) + ' KB');
  }
  const pad = n => String(n).padStart(2, '0');
  for (const c of chapters) await print([c], `PhysiQ_FullNotes_Sem${SEM}_Ch${pad(c.ch)}.pdf`, `Semester ${SEM} · Chapter ${c.ch} ${c.title}`);
  const cover = `<section class="pdf-cover"><div class="k">STPM Physics · Semester ${SEM} · ${semName}</div><h1>Full notes</h1><div class="by">Cikgu Suhaili</div>
    <ol>${chapters.map(c => `<li><b>${c.ch}</b><span>${c.title}</span></li>`).join('')}</ol>
    <div class="foot">PhysiQ · ellyelias.github.io/physiq · Worked examples, exercises with answers and the simulations from the app.</div></section>`;
  await print(chapters, `PhysiQ_FullNotes_Sem${SEM}.pdf`, `Semester ${SEM} full notes`, cover);
  await b.close();
})();
