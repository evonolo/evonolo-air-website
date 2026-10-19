#!/usr/bin/env python3
"""Erzeugt die Bildmarke von evonolo aus ihrer Geometrie.

Die Marke lag nur als 512-px-PNG vor. Die Proportionen hier sind daraus
vermessen und auf die Kantenlaenge normiert:

    Rand aussen 69/512   Zelle 182/512   Luecke 10/512
    Zellenradius 48/182  Strichstaerke 38/182   Innenradius 16/106
    Eckenradius der Flaeche 105/512

Aufruf:
    python3 make_logo.py            beides
    python3 make_logo.py favicons   nur docs/favicon*, apple-touch-icon
    python3 make_logo.py google     nur brand/google/
    python3 make_logo.py pruefen    Rekonstruktion gegen die Originale halten
"""
import os
import pathlib
import sys

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent

NAVY = (0x2D, 0x41, 0x56, 255)
GREEN = (0x8C, 0xFF, 0x00, 255)
WHITE = (0xFF, 0xFF, 0xFF, 255)

SS = 4  # Supersampling, gegen ausgefranste Rundungen

# Anteil der Kantenlaenge, den die Marke einnimmt
FRAC_ICON = 374 / 512   # Favicons: fuellt die Flaeche wie im Original
FRAC_GOOGLE = 0.60      # Google beschneidet rund, deshalb enger


def draw_mark(d, x, y, size, stroke=WHITE, hole=NAVY, accent=GREEN):
    """Zeichnet die vier Quadrate in das Quadrat (x, y, size)."""
    cell = size * 182 / 374
    gap = size * 10 / 374
    r = cell * 48 / 182
    st = cell * 38 / 182
    ri = (cell - 2 * st) * 16 / 106
    for row in range(2):
        for col in range(2):
            cx, cy = x + col * (cell + gap), y + row * (cell + gap)
            if row == 1 and col == 1:
                d.rounded_rectangle([cx, cy, cx + cell, cy + cell], r, fill=accent)
            else:
                d.rounded_rectangle([cx, cy, cx + cell, cy + cell], r, fill=stroke)
                d.rounded_rectangle([cx + st, cy + st, cx + cell - st, cy + cell - st],
                                    ri, fill=hole)


def render(size, frac=FRAC_ICON, bg=NAVY, stroke=WHITE, hole=NAVY, round_corners=True):
    """Rendert ein quadratisches Logo.

    round_corners=True laesst die Ecken frei (Favicon), False fuellt sie
    durch (Google und iOS maskieren selbst).
    """
    s = size * SS
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0) if round_corners else bg)
    d = ImageDraw.Draw(im)
    if round_corners:
        d.rounded_rectangle([0, 0, s - 1, s - 1], s * 105 / 512, fill=bg)
    m = s * frac
    draw_mark(d, (s - m) / 2, (s - m) / 2, m, stroke, hole)
    return im.resize((size, size), Image.LANCZOS)


def build_favicons():
    docs = ROOT / "docs"
    for size in (512, 192, 96):
        render(size).save(docs / f"favicon-{size}.png", optimize=True)
        print(f"docs/favicon-{size}.png")
    # iOS maskiert selbst und mag keine Transparenz
    render(180, round_corners=False).convert("RGB").save(
        docs / "apple-touch-icon.png", optimize=True)
    print("docs/apple-touch-icon.png")
    # favicon.ico traegt 16/32/48 px in einer Datei
    ico = render(48)
    ico.save(docs / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("docs/favicon.ico")


def build_google():
    out = ROOT / "brand/google"
    os.makedirs(out, exist_ok=True)
    for px in (1024, 720):
        p = out / f"evonolo-air-google-logo-{px}.png"
        render(px, frac=FRAC_GOOGLE, round_corners=False).convert("RGB").save(
            p, "PNG", optimize=True)
        print(f"{p.relative_to(ROOT)}  {p.stat().st_size / 1024:.1f} KB")


def check():
    """Haelt die Rekonstruktion gegen die eingecheckten Originale."""
    for name, size, round_corners in [("favicon-512.png", 512, True),
                                      ("favicon-192.png", 192, True),
                                      ("favicon-96.png", 96, True),
                                      ("apple-touch-icon.png", 180, False)]:
        ref = Image.open(ROOT / "docs" / name).convert("RGBA")
        rec = render(size, round_corners=round_corners)
        d = sum(abs(a[i] - b[i]) for a, b in zip(ref.getdata(), rec.getdata())
                for i in range(4)) / (size * size * 4)
        print(f"{name:<22} Abweichung {d:5.2f}/255  {'ok' if d < 8 else 'PRUEFEN'}")


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 else "alles"
    if what in ("alles", "favicons"):
        build_favicons()
    if what in ("alles", "google"):
        build_google()
    if what == "pruefen":
        check()
