"""Layout check: running text fills the width of its card (no fixed max-width on paragraphs).

Locks the fix of 15 Nov 2026 (chapter header scene line, overview lead, characters intro,
translation intro). Usage: python3 tests/layout_width_check.py [base_url]
Default base_url: the live review site. Exit code 1 if any paragraph of 120+ characters
is more than 40 px narrower than its container at 1440 px.
"""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'https://adib-psych.github.io/nepal-mhpss-iec-review/'
PAGES = ['#overview', '#characters'] + [f'#ch{n}/{t}' for n in range(1, 7) for t in ('poster', 'leaflet', 'guide', 'translation')]
JS = """()=>{const out=[];document.querySelectorAll('#main p').forEach(p=>{if(!p.offsetParent)return;
const t=p.innerText.trim();if(t.length<120)return;const par=p.parentElement,cs=getComputedStyle(par);
const avail=par.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
const w=p.getBoundingClientRect().width;if(avail-w>40)out.push([Math.round(w),Math.round(avail),t.slice(0,60)])});return out}"""

fails = []
with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.add_init_script("localStorage.setItem('iec-entry',JSON.stringify('2026-11-14'))")
    for h in PAGES:
        pg.goto(BASE + h)
        pg.wait_for_timeout(800)
        for r in pg.evaluate(JS):
            fails.append((h, *r))
    b.close()
for f in fails:
    print('NARROW', f)
print('layout width check:', 'FAIL' if fails else 'OK', f'({len(PAGES)} pages)')
sys.exit(1 if fails else 0)
