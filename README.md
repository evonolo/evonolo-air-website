# Evonolo Air Website

Eine moderne, minimalistische Website auf Basis von **Jekyll** und **Bootstrap 5**, optimiert für das Hosting auf **GitHub Pages**.

## 🚀 Features

- ✅ **Jekyll 3.9** - Statischer Site Generator
- ✅ **Bootstrap 5** - Modernes, responsives CSS Framework
- ✅ **GitHub Pages** kompatibel - Keine benutzerdefinierten Plugins
- ✅ **Modulares Section-System** - Einfach erweiterbar
- ✅ **OnePager-Ansatz** - Alle Inhalte auf einer Seite
- ✅ **SEO-optimiert** - Mit jekyll-seo-tag
- ✅ **Responsive Design** - Mobile-First Ansatz

## 📁 Projektstruktur

```
evonolo-air-website/
├── _config.yml              # Jekyll Konfiguration
├── Gemfile                  # Ruby Dependencies
├── .gitignore              # Git Ignore-Datei
│
├── _layouts/               # Layout-Templates
│   ├── default.html        # Basis-Layout
│   ├── home.html           # Homepage Layout (OnePager)
│   └── page.html           # Standard-Seiten Layout
│
├── _includes/              # Wiederverwendbare Komponenten
│   ├── navigation.html     # Navigationsleiste
│   ├── footer.html         # Footer
│   └── sections/           # Section-Templates
│       ├── image-text.html # Bild-Text Kombination
│       ├── features.html   # Feature-Grid
│       ├── text.html       # Nur Text
│       ├── image.html      # Nur Bild
│       ├── carousel.html   # Bildslider
│       └── gallery.html    # Bildergalerie
│
├── _sections/              # Section Content (Collections)
│   ├── 01-features.md      # Features Section
│   ├── 02-about.md         # Über uns Section
│   └── 03-cta.md           # Call-to-Action Section
│
├── assets/                 # Statische Assets
│   ├── css/
│   │   └── main.scss       # Haupt-Stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript
│   └── images/             # Bilder
│
├── index.md                # Startseite
├── impressum.md            # Impressum
├── datenschutz.md          # Datenschutzerklärung
├── kontakt.md              # Kontaktseite
└── README.md               # Diese Datei
```

## 🛠️ Installation & Setup

### Voraussetzungen

- **Ruby** >= 2.7 (empfohlen: 3.0+)
- **Bundler** (`gem install bundler`)
- **Git**

### Lokale Installation

1. **Repository klonen:**
   ```bash
   git clone https://github.com/username/evonolo-air-website.git
   cd evonolo-air-website
   ```

2. **Dependencies installieren:**
   ```bash
   bundle install
   ```

3. **Development Server starten:**
   ```bash
   bundle exec jekyll serve
   ```

4. **Im Browser öffnen:**
   ```
   http://localhost:4000
   ```

### Live-Reload während Entwicklung

```bash
bundle exec jekyll serve --livereload
```

## 📝 Content Management

### Section-System

Die Website nutzt ein modulares Section-System. Sections können auf zwei Arten definiert werden:

#### Methode 1: Collection-Dateien (_sections/)

Erstelle Markdown-Dateien im `_sections/` Ordner:

```yaml
---
type: features              # Section-Typ (features, image-text, text, etc.)
order: 1                    # Reihenfolge (niedrigere Zahlen = weiter oben)
enabled: true               # Section aktivieren/deaktivieren
id: features                # HTML ID (für Anchor-Links)
background: light           # Hintergrundfarbe (light, dark, oder null)

headline: "Unsere Features"
tagline: "Entdecken Sie die Vorteile"

features:
  - icon: "lightning-charge"
    title: "Schnell"
    description: "Optimierte Performance"
---
```

#### Methode 2: Frontmatter in index.md

```yaml
---
layout: home
sections:
  - type: text
    headline: "Willkommen"
    text: "Ihre Nachricht hier"
---
```

### Verfügbare Section-Typen

#### 1. **image-text** - Bild-Text Kombination

```yaml
type: image-text
headline: "Überschrift"
tagline: "Untertitel"
image: "/assets/images/beispiel.jpg"
image_alt: "Alternativer Text"
image_position: "left"      # oder "right"
title: "Section Titel"
text: "Ihr Text hier (Markdown möglich)"
button_text: "Mehr erfahren"
button_link: "/kontakt/"
```

#### 2. **features** - Feature-Grid

```yaml
type: features
headline: "Unsere Features"
features:
  - icon: "lightning-charge"  # Bootstrap Icon Name
    title: "Feature 1"
    description: "Beschreibung"
    link: "/details/"         # Optional
```

**Verfügbare Bootstrap Icons:** https://icons.getbootstrap.com/

#### 3. **text** - Nur Text

```yaml
type: text
headline: "Überschrift"
tagline: "Untertitel"
text: "Ihr Text (Markdown)"
text_align: center          # left, center, right
button_text: "Button"
button_link: "/link/"
```

#### 4. **image** - Nur Bild

```yaml
type: image
headline: "Bildergalerie"
image: "/assets/images/bild.jpg"
image_alt: "Alt Text"
caption: "Bildunterschrift"
```

#### 5. **carousel** - Bildslider

```yaml
type: carousel
headline: "Unsere Projekte"
slides:
  - image: "/assets/images/slide1.jpg"
    title: "Slide 1"
    description: "Beschreibung"
  - image: "/assets/images/slide2.jpg"
    title: "Slide 2"
```

#### 6. **gallery** - Bildergalerie

```yaml
type: gallery
headline: "Galerie"
images:
  - image: "/assets/images/gallery1.jpg"
    title: "Bild 1"
    alt: "Beschreibung"
  - image: "/assets/images/gallery2.jpg"
    title: "Bild 2"
```

## 🎨 Styling Anpassungen

### Bootstrap Variablen überschreiben

Bearbeite `assets/css/main.scss`:

```scss
// Farben anpassen
$primary: #007bff;
$secondary: #6c757d;

// Typografie
$font-family-sans-serif: 'Your Font', sans-serif;
$font-size-base: 1rem;

// Eigene Styles
.custom-class {
  // Deine Styles
}
```

### Eigene CSS-Klassen

Alle Sections unterstützen die `background` Option:
- `background: light` - Heller Hintergrund
- `background: dark` - Dunkler Hintergrund (weiße Schrift)
- `background: null` - Weißer Hintergrund (Standard)

## 🌐 GitHub Pages Deployment

### 1. Repository erstellen

Erstelle ein neues Repository auf GitHub (z.B. `username.github.io` oder `project-name`)

### 2. _config.yml anpassen

```yaml
baseurl: ""                           # Für username.github.io
# baseurl: "/repository-name"         # Für Projekt-Repository

url: "https://username.github.io"
```

### 3. Pushen

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository.git
git push -u origin main
```

### 4. GitHub Pages aktivieren

1. GitHub Repository öffnen
2. **Settings** → **Pages**
3. **Source**: `main` Branch
4. **Folder**: `/ (root)`
5. **Save**

Die Website ist nach wenigen Minuten unter `https://username.github.io` erreichbar.

## 🔧 Konfiguration

### _config.yml - Wichtige Einstellungen

```yaml
title: "Deine Website"               # Site Titel
description: "Beschreibung"          # Meta Description
lang: de                             # Sprache

# Für GitHub Pages
baseurl: ""                          # Siehe oben
url: "https://username.github.io"

# Collections
collections:
  sections:
    output: false
    sort_by: order
```

## 📮 Kontaktformular

Das Kontaktformular nutzt **Formspree** (kostenlos für bis zu 50 Submissions/Monat):

1. Account erstellen auf https://formspree.io/
2. Neues Formular erstellen
3. Form ID in `kontakt.md` eintragen:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Alternative Services:**
- Basin (https://usebasin.com/)
- Netlify Forms (bei Netlify Hosting)
- Getform (https://getform.io/)

## 🔍 SEO & Meta Tags

Die Website nutzt `jekyll-seo-tag` für automatische Meta Tags.

Frontmatter in Seiten:

```yaml
---
title: "Seitentitel"
description: "Meta Description für SEO"
image: "/assets/images/og-image.jpg"  # Open Graph Bild
---
```

## 📱 Responsive Design

Alle Sections sind standardmäßig responsive. Bootstrap 5 Breakpoints:

- **xs**: < 576px (Mobile)
- **sm**: ≥ 576px (Mobile Landscape)
- **md**: ≥ 768px (Tablet)
- **lg**: ≥ 992px (Desktop)
- **xl**: ≥ 1200px (Large Desktop)
- **xxl**: ≥ 1400px (Extra Large)

## 🐛 Troubleshooting

### Jekyll Server startet nicht

```bash
# Bundle neu installieren
bundle install

# Cache löschen
bundle exec jekyll clean
```

### Styles werden nicht geladen

- YAML Front Matter in `main.scss` prüfen (muss `---` enthalten)
- Browser Cache leeren
- Jekyll Server neu starten

### Sections werden nicht angezeigt

- `enabled: true` in Section-Frontmatter prüfen
- `order` Wert gesetzt?
- Richtiger `type` angegeben?
- Entsprechende Template-Datei in `_includes/sections/` vorhanden?

## 📚 Weitere Ressourcen

- [Jekyll Dokumentation](https://jekyllrb.com/docs/)
- [Bootstrap 5 Dokumentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Frei verwendbar für private und kommerzielle Projekte.

## 🤝 Support

Bei Fragen oder Problemen:
1. GitHub Issues öffnen
2. Jekyll Community: https://talk.jekyllrb.com/
3. Bootstrap Community: https://github.com/twbs/bootstrap/discussions

---

**Erstellt mit ❤️ und Jekyll**

