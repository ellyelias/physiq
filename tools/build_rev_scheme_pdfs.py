"""Build downloadable marking-scheme PDFs for every revision paper (downloads/qa/PhysiQ_Rev_<sem>_<id>.pdf).
Run from the repo root:  python3 -m http.server 8765 &  then  python3 tools/build_rev_scheme_pdfs.py
Uses the app's own revSchemeHTML rendering (Teacher Dashboard), so the PDF matches the on-screen scheme."""
import asyncio, os
from playwright.async_api import async_playwright
BASE = 'http://localhost:8765/'
# papers whose marking scheme PDF is a hand-built detailed Q&A document (LaTeX); never overwrite them here
KEEP = {'1:s1-set-b', '1:s1-trial-2027', '1:s1-trial-2027-2'}
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page()
        await pg.goto(BASE + 'index.html'); await pg.wait_for_timeout(2500)
        items = await pg.evaluate("""() => [...document.querySelectorAll('#rev-scheme-list details')].map(d => {
            d.open = true; d.dispatchEvent(new Event('toggle'));
            const body = d.querySelector('.rev-scheme-body');
            return {key: body.dataset.key, title: d.querySelector('summary').textContent.replace(/^Semester \\d+ · /, '')};
        })""")
        await pg.wait_for_timeout(800)
        css = await pg.evaluate("[...document.querySelectorAll('style')].map(s=>s.outerHTML).join('') + [...document.querySelectorAll('link[rel=stylesheet]')].map(l=>'<link rel=\"stylesheet\" href=\"'+l.href+'\">').join('')")
        os.makedirs('downloads/qa', exist_ok=True)
        for it in items:
            if it['key'] in KEEP: print('kept', it['key']); continue
            html = await pg.evaluate("k => document.querySelector(`.rev-scheme-body[data-key=\"${k}\"]`).innerHTML", it['key'])
            sem, pid = it['key'].split(':')
            doc = f"""<!doctype html><html><head><meta charset="utf-8"><base href="{BASE}">{css}
<style>html,body{{background:#fff!important;}} body{{padding:0;margin:0;font-family:Calibri,Carlito,"Segoe UI",sans-serif;color:#111;}}
.dgfig,svg{{break-inside:avoid;}} div[style*="border-left:3px"]{{break-inside:avoid;}}</style></head>
<body><h1 style="font-size:22px;margin:0;color:#1F3864;">{it['title']}</h1>
<p style="margin:2px 0 12px;">Marking scheme (question and answer) · Physics 960/{sem} · Prepared by Cikgu Suhaili</p>{html}</body></html>"""
            out = await b.new_page()
            await out.set_content(doc, wait_until='networkidle')
            path = f'downloads/qa/PhysiQ_Rev_Sem{sem}_{pid}.pdf'
            await out.pdf(path=path, format='A4', print_background=True, margin={'top':'14mm','bottom':'14mm','left':'14mm','right':'14mm'},
                          display_header_footer=True, header_template='<span></span>',
                          footer_template='<div style="font-size:8px;width:100%;text-align:center;color:#777;">PhysiQ by Cikgu Suhaili · page <span class="pageNumber"></span> of <span class="totalPages"></span></div>')
            await out.close(); print(path)
        await b.close()
asyncio.run(main())
