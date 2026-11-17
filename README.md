# evonolo Air Website

Website von [evonolo-air.com](https://evonolo-air.com), dem Drohnenservice der evonolo GmbH
aus Fieberbrunn in Tirol.

Statische Website ohne Build-Schritt. Ausgeliefert über GitHub Pages aus dem Ordner `docs/`.

## Aufbau

```
docs/                     wird von GitHub Pages ausgeliefert
  index.html              Startseite
  inspektionen.html       Thermografie & Inspektionen
  vermessung-und-3d.html  Vermessung & 3D-Modelle
  monitoring.html         Monitoring
  dokumentation.html      Dokumentation
  sicherheit.html         Sicherheit
  fotografie-und-video.html
  pricing.html            Preise
  faq.html                Häufige Fragen (mit FAQPage-Strukturdaten)
  contacts.html           Kontakt
  impressum.html          Impressum
  datenschutz.html        Datenschutzerklärung
  llms.txt                Kurzfassung der Website für Sprachmodelle
  favicon.ico             Browser-Icon (16/32/48 px), dazu favicon-96/192/512.png
  apple-touch-icon.png    Icon für den iOS-Homescreen (180 px)
  site.webmanifest        Name, Farben und Icons für Android
  robots.txt, sitemap.xml
  CNAME                   evonolo-air.com
  assets/
    css/air.css            Das gesamte Design, ohne Framework
    css/Inter.css, Outfit.css, cookieconsent.css   Schriften und Cookie-Banner
    js/air.js              Bewegung und Bedienung (Menü, Reiter, Regler, Einblenden)
    js/…                   Cookie-Banner, Analytics, Kontaktformular
    img/web/               Für das Web verkleinerte Bilder
    img/…                  Originalbilder nach Leistung sortiert
brand/                    Markenwerkzeug, nicht Teil der Website
  make_logo.py            erzeugt Favicons und Logos aus der Geometrie der Bildmarke
  google/                 Logo für das Google-Unternehmensprofil (720 und 1024 px)
texts/                    Ausgangstexte der Leistungsseiten (RTF)
images/                   Rohmaterial, nicht Teil der Website
evonolo-air-website.bsdesign  Bootstrap-Studio-Projekt (siehe Warnung unten)
```

## Lokal ansehen

```bash
cd docs
python3 -m http.server 8765
# http://127.0.0.1:8765
```

## Änderungen

Die Seiten sind einzelne HTML-Dateien ohne Template-System. Navigation und Footer stehen
in jeder Datei. Wer eines davon ändert, muss die Änderung auf allen Seiten nachziehen.

Das Design lebt in `docs/assets/css/air.css`, die Bewegung in `docs/assets/js/air.js`.
Beides kommt ohne Framework und ohne Bibliotheken aus. Eingebunden werden auf jeder Seite
nur `Inter.css`, `Outfit.css`, `cookieconsent.css` und `air.css`. Wer `air.css` oder `air.js`
ändert, zählt das `?v=` in den zwölf Seiten hoch, damit Browser die neue Fassung laden.

| Klasse | Zweck |
| --- | --- |
| `nav`, `nav-links`, `nav-burger` | Schwebende Navigationsleiste, auf dem Handy mit Menüknopf |
| `hero`, `hero-sub`, `kenburns` | Seitenkopf mit Bild und langsamer Kamerafahrt (Startseite, Leistungsseiten) |
| `page-head` | Seitenkopf ohne Bild (Preise, FAQ, Kontakt, Impressum, Datenschutz) |
| `section`, `wrap`, `wrap narrow` | Abschnitt und Inhaltsbreite (1200 px, schmal 880 px) |
| `reveal` | Blendet ein Element beim Scrollen ein, `style="--d:1"` verzögert |
| `tabs`, `tab`, `panel` | Reiter „Wofür brauchst du uns?“ auf der Startseite |
| `tile`, `grid-3`, `grid-4` | Leistungskacheln und Raster |
| `compare` | Vergleichsregler Wärmebild und Foto |
| `flow`, `steps`, `step` | Ablauf mit Flugbahn, die sich beim Scrollen zeichnet |
| `price-card`, `rows`, `note` | Preiskarten, Zusatzleistungen, Hinweis zur Umsatzsteuer |
| `kurz`, `topics`, `topic`, `gallery` | Leistungsseiten: Kurzfassung, Themenkarten, Bilder |
| `on-dark`, `checks`, `checks-grid` | Dunkler Abschnitt und Häkchenlisten |
| `faq`, `faq-group`, `faq-body` | Aufklappbare Fragen (`<details>`) |
| `contact`, `field`, `dark-card` | Kontaktformular und Karte „Direkt erreichen“ |
| `prose`, `updated` | Impressum und Datenschutz |
| `cta`, `foot`, `mobile-cta` | Kontakt-Block, Fuß, feste Anfrageleiste auf dem Handy |

Ohne JavaScript und mit der Systemeinstellung „Bewegung reduzieren“ bleiben alle Seiten
vollständig lesbar. Ein Hero-Video lässt sich nachrüsten: `<video muted loop playsinline
preload="none" data-src="assets/video/hero.mp4" aria-hidden="true"></video>` in
`.hero-media` hinter das Bild setzen, `air.js` blendet es ein, sobald es abspielbar ist.

## Bilder

Große Originale liegen unter `docs/assets/img/<leistung>/`. Für die Website gehören
verkleinerte Fassungen nach `docs/assets/img/web/`:

```bash
sips -s format jpeg -s formatOptions 66 -Z 1600 original.jpg --out docs/assets/img/web/name.jpg
```

Jedes `<img>` braucht ein `alt`-Attribut, das beschreibt, was zu sehen ist.

## Logo und Favicons

Zwei Marken sind im Spiel: die **Wortmarke** „evonolo air“ unter
`docs/assets/img/evonolo-air-logo*.png` und die **Bildmarke** von evonolo – vier
Quadrate auf Navy, das untere rechte in Neongrün. Die Bildmarke gibt es nicht als
Vektordatei; `brand/make_logo.py` baut sie stattdessen aus ihren Proportionen nach
und rendert sie in jeder Größe.

```bash
cd brand
python3 make_logo.py pruefen    # Rekonstruktion gegen die eingecheckten Dateien halten
python3 make_logo.py favicons   # docs/favicon*, apple-touch-icon.png, favicon.ico
python3 make_logo.py google     # brand/google/evonolo-air-google-logo-*.png
```

`pruefen` vergleicht Pixel für Pixel mit den Originalen; Abweichungen unter 8 von 255
sind Antialiasing. Wer die Marke ändert, läuft danach `favicons` und zieht
`docs/site.webmanifest` nach.

Für das **Google-Unternehmensprofil** sitzt die Marke enger als im Favicon (60 statt
73 Prozent der Kantenlänge). Google beschneidet das Logo an manchen Stellen rund, und
bei der Favicon-Dichte würden die Ecken der Marke knapp angeschnitten. Hochgeladen
wird `brand/google/evonolo-air-google-logo-720.png`; die 1024er Fassung liegt als
Reserve daneben. Google verlangt quadratisch, mindestens 250 px und höchstens 5 MB.

## Veröffentlichen

Ein Push auf `main` löst den Deploy aus. Nach ein bis zwei Minuten ist die Änderung live.

```bash
git add docs && git commit -m "…" && git push
```

Wenn eine neue Seite dazukommt, gehört sie in `docs/sitemap.xml`, in `docs/llms.txt`
sowie in Navigation und Footer aller Seiten.

## Suchmaschinen und KI

- Jede Seite hat eigenen Titel, eigene Beschreibung und Open-Graph-Angaben.
- Die Startseite trägt `LocalBusiness`-Strukturdaten, die FAQ-Seite `FAQPage`.
- Das Browser-Icon zeigt die Bildmarke von evonolo: vier Quadrate auf Navy, das untere
  rechte in Neongrün. Erzeugt wird es von `brand/make_logo.py` (siehe „Logo und Favicons“).
- `llms.txt` fasst Leistungen, Preise und Kontakt für Sprachmodelle zusammen und wird
  bei inhaltlichen Änderungen mitgepflegt.

## Achtung: Bootstrap Studio

Im Repository liegt `evonolo-air-website.bsdesign`. Die Seiten in `docs/` wurden seit
September 2026 direkt im HTML und CSS bearbeitet und im November 2026 ohne Bootstrap neu aufgebaut.
Bootstrap, Font Awesome, Swiper und AOS liegen seither nicht mehr im Ordner.
Sie sind **nicht** mit dem Bootstrap-Studio-Projekt synchron. Ein erneuter Export aus Bootstrap Studio würde diese Änderungen überschreiben.
