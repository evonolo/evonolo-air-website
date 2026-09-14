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
  robots.txt, sitemap.xml
  CNAME                   evonolo-air.com
  assets/
    css/frisch-luftig.css  Eigenes Design, aktiv über <body class="fl-theme">
    css/…                  Bootstrap-Studio-Export, Schriften, Cookie-Consent
    js/                    Bootstrap, Cookie-Consent
    img/web/               Für das Web verkleinerte Bilder
    img/…                  Originalbilder nach Leistung sortiert
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

Das Design lebt in `docs/assets/css/frisch-luftig.css`. Die Datei setzt Bootstrap-Variablen
für den hellen Auftritt und definiert eigene Klassen:

| Klasse | Zweck |
| --- | --- |
| `fl-theme` | Auf `<body>`, schaltet das gesamte Design ein |
| `fl-top` | Kopfbereich mit Himmelsverlauf |
| `fl-nav`, `fl-nav-pill` | Schwebende Navigationsleiste |
| `fl-hero`, `fl-badge`, `fl-hero-stat` | Startseiten-Kopf |
| `fl-bento`, `fl-tile`, `fl-tile-img` | Leistungskacheln |
| `fl-stats`, `fl-stat` | Kennzahlen |
| `fl-cta` | Dunkler Kontakt-Block |
| `fl-faq` | Aufklappbare Fragen (`<details>`, ohne JavaScript) |
| `fl-legal` | Impressum und Datenschutz |
| `fl-card` | Bootstrap-Karte im hellen Look |

## Bilder

Große Originale liegen unter `docs/assets/img/<leistung>/`. Für die Website gehören
verkleinerte Fassungen nach `docs/assets/img/web/`:

```bash
sips -s format jpeg -s formatOptions 66 -Z 1600 original.jpg --out docs/assets/img/web/name.jpg
```

Jedes `<img>` braucht ein `alt`-Attribut, das beschreibt, was zu sehen ist.

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
- `llms.txt` fasst Leistungen, Preise und Kontakt für Sprachmodelle zusammen und wird
  bei inhaltlichen Änderungen mitgepflegt.

## Achtung: Bootstrap Studio

Im Repository liegt `evonolo-air-website.bsdesign`. Die Seiten in `docs/` wurden seit
September 2026 direkt im HTML und CSS bearbeitet und sind **nicht** mit dem Bootstrap-Studio-Projekt
synchron. Ein erneuter Export aus Bootstrap Studio würde diese Änderungen überschreiben.
