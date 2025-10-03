#!/usr/bin/env bash
set -euo pipefail

# Defaults
IN="."
OUT="./out"
WIDTHS="768 1280 1600 1920 2560 3840"
JQ=78         # JPEG-Qualität
WQ=75         # WebP-Qualität
EXACT=0       # 16:9 Crop (0=aus, 1=an)
UPSCALE=0     # Upscaling erlauben (0=nein, 1=ja)
FLATTEN=0     # Transparenz auf weiß setzen (0=nein, 1=ja)

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Options:
  -i <dir>     Eingabe-Ordner (default: .)
  -o <dir>     Ausgabe-Ordner (default: ./out)
  -w "<list>"  Breiten (default: "$WIDTHS")
  -q <0-100>   JPEG Qualität (default: $JQ)
  -Q <0-100>   WebP Qualität (default: $WQ)
  -e           Exakt 16:9 crop & center (z.B. 1920x1080)
  -U           Upscaling erlauben
  -f           Transparenz auf weiß (für PNG/WebP mit Alpha)
  -h           Hilfe
EOF
}

while getopts ":i:o:w:q:Q:eUfh" opt; do
  case $opt in
    i) IN="$OPTARG" ;;
    o) OUT="$OPTARG" ;;
    w) WIDTHS="$OPTARG" ;;
    q) JQ="$OPTARG" ;;
    Q) WQ="$OPTARG" ;;
    e) EXACT=1 ;;
    U) UPSCALE=1 ;;
    f) FLATTEN=1 ;;
    h) usage; exit 0 ;;
    \?) echo "Unbekannte Option: -$OPTARG" >&2; usage; exit 1 ;;
    :)  echo "Option -$OPTARG braucht ein Argument." >&2; usage; exit 1 ;;
  esac
done

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick (magick) nicht gefunden. Installiere es z. B. mit:"
  echo "  brew install imagemagick libheif"
  exit 1
fi

mkdir -p "$OUT/jpg" "$OUT/webp"

# (Best-effort) Zählung ohne Sonderzeichenstress
COUNT=$(find "$IN" -type f \( \
  -iname '*.jpg'  -o -iname '*.jpeg' -o -iname '*.png'  -o -iname '*.webp' -o \
  -iname '*.heic' -o -iname '*.heif'  -o -iname '*.tif' -o -iname '*.tiff' \
\) | wc -l | tr -d ' ')
if [ "$COUNT" -eq 0 ]; then
  echo "Keine geeigneten Bilddateien in: $IN"
  exit 0
fi

echo "Verarbeite $COUNT Dateien → $OUT"
echo "Breiten: $WIDTHS | 16:9 Crop: $EXACT | Upscale: $UPSCALE | Flatten: $FLATTEN"

# NUL-sichere Schleife statt 'mapfile'
find "$IN" -type f \( \
  -iname '*.jpg'  -o -iname '*.jpeg' -o -iname '*.png'  -o -iname '*.webp' -o \
  -iname '*.heic' -o -iname '*.heif'  -o -iname '*.tif' -o -iname '*.tiff' \
\) -print0 | while IFS= read -r -d '' f; do
  base="$(basename "$f")"
  name_noext="${base%.*}"

  for w in $WIDTHS; do
    # Resize-Geometrie
    if [ "$EXACT" -eq 1 ]; then
      H=$(awk "BEGIN{printf \"%d\", $w*9/16}")
      RESIZE="-resize ${w}x${H}^ -gravity center -extent ${w}x${H}"
    else
      if [ "$UPSCALE" -eq 1 ]; then
        RESIZE="-resize ${w}x"
      else
        RESIZE="-resize ${w}x>"
      fi
    fi

    COMMON="-auto-orient -strip -colorspace sRGB"
    if [ "$FLATTEN" -eq 1 ]; then
      COMMON="$COMMON -background white -alpha remove -alpha off"
    fi

    out_jpg="$OUT/jpg/${name_noext}-${w}.jpg"
    out_webp="$OUT/webp/${name_noext}-${w}.webp"

    # JPEG
    magick "$f" $COMMON $RESIZE \
      -sampling-factor 4:2:0 -interlace Plane -quality "$JQ" \
      "$out_jpg"

    # WebP
    magick "$f" $COMMON $RESIZE \
      -define webp:method=6 -quality "$WQ" \
      "$out_webp"

    echo "✔ $base → ${w}px (jpg/webp)"
  done
done

echo
echo "Fertig. Dateien unter:"
echo "  $OUT/jpg"
echo "  $OUT/webp"
