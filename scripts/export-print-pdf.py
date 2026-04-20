#!/usr/bin/env python3
"""
Export Studio Kaku zine as print-ready PDF with 3mm bleed and crop marks.
Output: public/zine/studio-kaku-zine-print.pdf
"""

import subprocess, os, re, sys
from pathlib import Path

ZINE_HTML = Path('/Users/Eleanor/Sites/studio-kaku.com/public/zine/index.html')
PRINT_HTML = Path('/tmp/zine-print.html')
OUTPUT_PDF = Path('/Users/Eleanor/Sites/studio-kaku.com/public/zine/studio-kaku-zine-print.pdf')
CHROME    = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

# A5 trim: 148mm × 210mm  |  bleed 3mm each side → 154mm × 216mm
# Mark area: 8mm outside bleed edge for crop lines

PRINT_CSS = """
<style id="print-overrides">

/* ── Page size: A5 + 3mm bleed each side ── */
@page {
  size: 154mm 216mm;
  margin: 0;
}

/* ── Reset browser layout ── */
*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: white !important;
  width: 154mm !important;
}

/* ── Remove spread/viewer chrome ── */
.spread {
  display: block !important;
  width: 154mm !important;
  height: auto !important;
  background: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* ── Each page: 154×216, content shifted 3mm in from every edge ── */
.page {
  width:  154mm !important;
  height: 216mm !important;
  padding: 13mm 13mm 13mm !important; /* original 10mm + 3mm bleed inset */
  overflow: hidden !important;
  position: relative !important;
  page-break-after: always !important;
  break-after: page !important;
  page-break-inside: avoid !important;
}
.page:last-of-type {
  page-break-after: avoid !important;
  break-after: avoid !important;
}

/* ── Crop marks (drawn at trim edge = 3mm from page edge) ── */
/* Each corner has two lines: one horizontal, one vertical
   Lines are 5mm long, sit flush at the trim edge, pointing outward */
.cropmark { position: absolute; background: #000; z-index: 9999; }

/* top-left */
.cm-tl-h { top: 3mm; left: 0;    width: 2.5mm; height: 0.3pt; }
.cm-tl-v { top: 0;   left: 3mm;  width: 0.3pt; height: 2.5mm; }
/* top-right */
.cm-tr-h { top: 3mm; right: 0;   width: 2.5mm; height: 0.3pt; }
.cm-tr-v { top: 0;   right: 3mm; width: 0.3pt; height: 2.5mm; }
/* bottom-left */
.cm-bl-h { bottom: 3mm; left: 0;    width: 2.5mm; height: 0.3pt; }
.cm-bl-v { bottom: 0;   left: 3mm;  width: 0.3pt; height: 2.5mm; }
/* bottom-right */
.cm-br-h { bottom: 3mm; right: 0;   width: 2.5mm; height: 0.3pt; }
.cm-br-v { bottom: 0;   right: 3mm; width: 0.3pt; height: 2.5mm; }

/* ── Fix page-specific padding overrides ── */
.p1, .p8 { padding: 13mm !important; }

/* ── Client list: keep tight spacing for print ── */
.client-list { justify-content: space-between; }

/* ── Hide any UI elements not needed in print ── */
.lang-toggle, nav, header, footer { display: none !important; }

</style>
"""

CROP_MARKS_HTML = """
<div class="cropmark cm-tl-h"></div>
<div class="cropmark cm-tl-v"></div>
<div class="cropmark cm-tr-h"></div>
<div class="cropmark cm-tr-v"></div>
<div class="cropmark cm-bl-h"></div>
<div class="cropmark cm-bl-v"></div>
<div class="cropmark cm-br-h"></div>
<div class="cropmark cm-br-v"></div>
"""

def main():
    print("Reading zine HTML…")
    html = ZINE_HTML.read_text(encoding='utf-8')

    # Fix asset paths to be absolute (Chrome needs full file:// paths for local assets)
    zine_dir = ZINE_HTML.parent.parent  # public/
    html = html.replace('src="../', f'src="file://{zine_dir}/')
    html = html.replace("src='../", f"src='file://{zine_dir}/")
    html = html.replace('href="../', f'href="file://{zine_dir}/')
    html = html.replace("url('../", f"url('file://{zine_dir}/")
    html = html.replace('url("../', f'url("file://{zine_dir}/')

    # Fix font paths inside the zine html (fonts are relative)
    public_dir = str(zine_dir)
    html = html.replace("url('/fonts/", f"url('file://{public_dir}/fonts/")
    html = html.replace('url("/fonts/', f'url("file://{public_dir}/fonts/')

    # Inject print CSS before </head>
    html = html.replace('</head>', PRINT_CSS + '</head>', 1)

    # Inject crop marks into every .page div
    # Find opening tags like <div class="page p1"> etc.
    html = re.sub(
        r'(<div[^>]+class="page[^"]*"[^>]*>)',
        r'\1' + CROP_MARKS_HTML,
        html
    )

    print(f"Writing print HTML to {PRINT_HTML}…")
    PRINT_HTML.write_text(html, encoding='utf-8')

    print("Exporting PDF via Chrome headless…")
    cmd = [
        CHROME,
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--run-all-compositor-stages-before-draw',
        '--print-to-pdf-no-header',
        f'--print-to-pdf={OUTPUT_PDF}',
        '--no-margins',
        f'--window-size=583,817',   # 154mm × 216mm @ 96dpi ≈ 583×817px
        f'file://{PRINT_HTML}',
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        print("STDERR:", result.stderr[-2000:])
        sys.exit(1)

    size = OUTPUT_PDF.stat().st_size / 1024
    print(f"✓ Exported: {OUTPUT_PDF} ({size:.0f} KB)")

if __name__ == '__main__':
    main()
