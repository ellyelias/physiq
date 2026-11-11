"""Builds search-index.json for PhysiQ's Search: opens every Notes page (all 3 semesters) in a headless
browser and records each heading / paragraph / list item / table row with the page it came from.
Run after notes change:  python3 tools/build_search_index.py  (serves the repo on a local port itself)."""
import json, os, subprocess, sys, time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 8799
EXTRACT = r"""
() => {
  const SUP = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','+':'⁺','-':'⁻','−':'⁻','n':'ⁿ','(':'⁽',')':'⁾','=':'⁼','i':'ⁱ'};
  const SUB = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','+':'₊','-':'₋','−':'₋','(':'₍',')':'₎','=':'₌','a':'ₐ','e':'ₑ','o':'ₒ','x':'ₓ','h':'ₕ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','p':'ₚ','s':'ₛ','t':'ₜ'};
  const conv = (s, M) => [...s].every(c => M[c]) ? [...s].map(c => M[c]).join('') : null;
  const clean = el => {
    const c = el.cloneNode(true);
    c.querySelectorAll('svg,script,style,button,.ls-size,.ls-toc,.sm,.sim,canvas,video,iframe,.rw-card,.cc-card').forEach(x => x.remove());
    c.querySelectorAll('sup').forEach(s => { const t = s.textContent.trim(); const u = conv(t, SUP); s.replaceWith(document.createTextNode(u != null ? u : '^' + t)); });
    c.querySelectorAll('sub').forEach(s => { const t = s.textContent.trim(); const u = conv(t, SUB); s.replaceWith(document.createTextNode(u != null ? u : '_' + t)); });
    c.querySelectorAll('.frac').forEach(f => { const n = f.querySelector('.n'), d = f.querySelector('.d'); if (n && d) f.replaceWith(document.createTextNode('(' + n.textContent + ')/(' + d.textContent + ')')); });
    c.querySelectorAll('td,th,[data-label],.ql-q,.ql-eq').forEach(x => x.append(document.createTextNode(' · ')));
    c.querySelectorAll('br').forEach(x => x.replaceWith(document.createTextNode(' ')));
    return c.textContent.replace(/\(([^()\s]{1,3})\)\/\(([^()\s]{1,3})\)/g, '$1/$2').replace(/\s*·\s*$/,'').replace(/\s+/g, ' ').trim();
  };
  const box = document.getElementById('notes-content');
  const SEL = 'h2,h3,h4,h5,summary,p,li,tr,dt,dd,figcaption,blockquote,.dv-result,.key,.ls-def';
  const all = [...box.querySelectorAll(SEL)].filter(e => (e.tagName === 'SUMMARY' || !e.closest('summary')) && !e.closest('svg,.ls-toc,.ls-head-m,.ls-size,.rw-card,nav,thead'));
  const isHead = e => /^(H[2-5]|SUMMARY)$/.test(e.tagName);
  const out = []; let h = '';
  all.forEach(e => {
    if (!isHead(e) && e.querySelector(SEL.split(',').filter(s => !/^h/.test(s)).join(','))) return; // keep the innermost blocks only
    const t = clean(e); if (!t || t.length < 3) return;
    if (e.tagName === 'SUMMARY') { const ti = e.querySelector('.dv-title'), re = e.querySelector('.dv-res'); const tt = ti ? clean(ti) : t; h = tt; out.push({h: tt, x: tt + (re ? ' : ' + clean(re) : ''), head: 1}); return; }
    if (isHead(e)) { h = t; out.push({h: t, x: t, head: 1}); return; }
    out.push({h, x: t.length > 420 ? t.slice(0, 420) + '…' : t});
  });
  const title = (box.querySelector('h2') ? clean(box.querySelector('h2')) : '');
  return {title, blocks: out};
}
"""

def main():
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT)], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    pages, items, seen = [], [], set()
    try:
        with sync_playwright() as p:
            exe = '/usr/bin/google-chrome' if os.path.exists('/usr/bin/google-chrome') else None
            b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
            pg = b.new_page(viewport={'width': 1200, 'height': 900})
            pg.goto(f'http://localhost:{PORT}/index.html?build-search=1'); pg.wait_for_timeout(2500)
            for sem in ['1', '2', '3']:
                pg.evaluate("s => { const e = document.getElementById('semester-select'); e.value = s; e.dispatchEvent(new Event('change')); }", sem)
                pg.wait_for_timeout(700)
                opts = pg.evaluate("() => [...document.querySelectorAll('#notes-topic-select option')].map(o => [o.value, o.textContent, o.parentElement.label || ''])")
                for v, label, group in opts:
                    if v.startswith('FLASH-') or (v, sem) in seen: continue
                    seen.add((v, sem))
                    pg.evaluate("v => { const s = document.getElementById('notes-topic-select'); s.value = v; s.dispatchEvent(new Event('change')); }", v)
                    for _ in range(40):
                        pg.wait_for_timeout(120)
                        if not pg.evaluate("() => !!document.querySelector('#notes-content .ls-loading')"): break
                    pg.wait_for_timeout(150)
                    r = pg.evaluate(EXTRACT)
                    pi = len(pages)
                    pages.append([v, sem, label.strip(), group.strip()])
                    for blk in r['blocks']:
                        items.append([pi, blk['h'], blk['x']] + ([1] if blk.get('head') else []))
                    print(sem, v, len(r['blocks']))
            b.close()
    finally:
        srv.terminate()
    # drop exact duplicate texts within a page
    dedup, keyset = [], set()
    for it in items:
        k = (it[0], it[2])
        if k in keyset: continue
        keyset.add(k); dedup.append(it)
    out = {'v': time.strftime('%Y%m%d%H%M'), 'pages': pages, 'items': dedup}
    with open(os.path.join(ROOT, 'search-index.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print('pages', len(pages), 'items', len(dedup), 'bytes', os.path.getsize(os.path.join(ROOT, 'search-index.json')))

if __name__ == '__main__':
    main()
