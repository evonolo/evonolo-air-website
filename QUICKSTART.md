# 🚀 Quickstart Guide

## Sofort loslegen (3 Schritte)

### 1. Dependencies installieren

```bash
bundle install
```

### 2. Development Server starten

```bash
bundle exec jekyll serve
```

### 3. Im Browser öffnen

```
http://localhost:4000
```

## Erste Schritte

### Website-Informationen anpassen

Bearbeite `_config.yml`:

```yaml
title: "Deine Website"
description: "Deine Beschreibung"
url: "https://deine-domain.de"
```

**Wichtig:** Nach Änderungen in `_config.yml` musst du den Server neu starten!

### Hero-Section anpassen

Bearbeite `index.md`:

```yaml
---
layout: home
title: Home

hero:
  title: "Deine Überschrift"
  subtitle: "Dein Untertitel"
  cta_text: "Dein Button"
  cta_link: "#dein-link"
---
```

### Neue Section hinzufügen

Erstelle eine neue Datei in `_sections/`, z.B. `04-meine-section.md`:

```yaml
---
type: text
order: 4
enabled: true
id: meine-section
background: light

headline: "Meine Überschrift"
tagline: "Mein Untertitel"
text: |
  Dein Text hier. **Markdown** ist möglich!
---
```

Die Zahl im Dateinamen (04-) hilft beim Sortieren.

### Kontaktformular aktivieren

1. Registriere dich kostenlos auf [formspree.io](https://formspree.io/)
2. Erstelle ein neues Formular
3. Kopiere die Form ID
4. Öffne `kontakt.md` und ersetze `YOUR_FORM_ID`

```html
<form action="https://formspree.io/f/DEINE_FORM_ID" method="POST">
```

### Impressum & Datenschutz anpassen

Bearbeite die Dateien:
- `impressum.md` - Füge deine Firmeninformationen ein
- `datenschutz.md` - Passe die Datenschutzerklärung an

### Eigene Bilder einfügen

1. Lege Bilder in `assets/images/` ab
2. Referenziere sie in Sections:

```yaml
image: "/assets/images/mein-bild.jpg"
```

**Tipp:** Für Entwicklung kannst du auch Placeholder verwenden:
```yaml
image: "https://picsum.photos/800/600"
```

## Verfügbare Section-Typen

### text
Nur Text, optional mit Button

```yaml
type: text
headline: "Überschrift"
text: "Dein Text"
button_text: "Button"
button_link: "/link/"
```

### image-text
Bild und Text nebeneinander

```yaml
type: image-text
image: "/assets/images/bild.jpg"
image_position: "left"  # oder "right"
title: "Titel"
text: "Beschreibung"
```

### features
Feature-Grid mit Icons

```yaml
type: features
features:
  - icon: "lightning-charge"
    title: "Feature 1"
    description: "Beschreibung"
```

[Alle Bootstrap Icons](https://icons.getbootstrap.com/)

### gallery
Bildergalerie

```yaml
type: gallery
images:
  - image: "/assets/images/bild1.jpg"
    title: "Bild 1"
  - image: "/assets/images/bild2.jpg"
    title: "Bild 2"
```

### carousel
Bildslider

```yaml
type: carousel
slides:
  - image: "/assets/images/slide1.jpg"
    title: "Slide 1"
    description: "Text"
```

## Styling anpassen

Bearbeite `assets/css/main.scss`:

```scss
// Farben
$primary: #007bff;      // Hauptfarbe
$secondary: #6c757d;    // Sekundärfarbe

// Schrift
$font-family-sans-serif: 'Your Font', sans-serif;
```

## Deployment auf GitHub Pages

1. Erstelle ein Repository auf GitHub
2. In `_config.yml` anpassen:

```yaml
baseurl: ""  # Für username.github.io
# baseurl: "/repo-name"  # Für Projekt-Repository

url: "https://username.github.io"
```

3. Push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

4. In GitHub: Settings → Pages → Source: `main` Branch

Fertig! Die Website ist nach wenigen Minuten live.

## Nützliche Befehle

```bash
# Server mit Live-Reload
bundle exec jekyll serve --livereload

# Server auf anderem Port
bundle exec jekyll serve --port 4001

# Production Build
bundle exec jekyll build

# Cache löschen
bundle exec jekyll clean
```

## Probleme?

### "Address already in use"
Port 4000 ist belegt. Nutze einen anderen Port:
```bash
bundle exec jekyll serve --port 4001
```

### Änderungen werden nicht angezeigt
1. Cache löschen: `bundle exec jekyll clean`
2. Browser-Cache leeren (Cmd+Shift+R / Ctrl+Shift+R)
3. Bei `_config.yml` Änderungen: Server neu starten

### Styles werden nicht geladen
Prüfe, dass `assets/css/main.scss` mit `---` beginnt:
```scss
---
---

// Dein CSS...
```

## Weitere Hilfe

- 📖 [Vollständige README](README.md)
- 🏗️ [Projektstruktur](STRUCTURE.md)
- 💬 [Jekyll Community](https://talk.jekyllrb.com/)

**Viel Erfolg! 🎉**

