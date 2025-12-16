# Projektstruktur Übersicht

```
evonolo-air-website/
│
├── _config.yml                 # Jekyll Hauptkonfiguration
├── Gemfile                     # Ruby Gem Dependencies
├── .gitignore                  # Git Ignore Regeln
├── README.md                   # Projektdokumentation
│
├── _layouts/                   # HTML Layout-Templates
│   ├── default.html            # Basis-Layout (Header, Footer)
│   ├── home.html               # Homepage mit Section-System
│   └── page.html               # Standard-Seiten (Impressum, etc.)
│
├── _includes/                  # Wiederverwendbare Komponenten
│   ├── navigation.html         # Hauptnavigation
│   ├── footer.html             # Footer mit Links
│   └── sections/               # Section Templates
│       ├── image-text.html     # Bild + Text Kombination
│       ├── features.html       # Feature Cards Grid
│       ├── text.html           # Reine Text-Section
│       ├── image.html          # Reine Bild-Section
│       ├── carousel.html       # Bootstrap Carousel/Slider
│       └── gallery.html        # Bildergalerie Grid
│
├── _sections/                  # Section Content (Jekyll Collection)
│   ├── 01-features.md          # Features Showcase
│   ├── 02-about.md             # Über uns / Company Info
│   └── 03-cta.md               # Call-to-Action Section
│
├── _sass/                      # SASS Partials (optional)
│   └── bootstrap/              # Bootstrap Overrides
│
├── assets/                     # Statische Ressourcen
│   ├── css/
│   │   └── main.scss           # Haupt-Stylesheet (Bootstrap + Custom)
│   ├── js/
│   │   └── main.js             # JavaScript (Form Validation, etc.)
│   └── images/                 # Bilder und Grafiken
│       └── README.md           # Bildverwaltung Dokumentation
│
├── index.md                    # Homepage (mit Hero & Sections)
├── impressum.md                # Rechtliches Impressum
├── datenschutz.md              # DSGVO Datenschutzerklärung
└── kontakt.md                  # Kontaktformular

```

## Wichtige Dateien erklärt

### Konfiguration
- **_config.yml**: Zentrale Jekyll-Einstellungen, Site-Metadaten, Collections
- **Gemfile**: Ruby Dependencies (Jekyll, Plugins)

### Layouts (_layouts/)
- **default.html**: Basis-Wrapper für alle Seiten
- **home.html**: Spezialisiert für Homepage mit Section-Rendering
- **page.html**: Einfaches Layout für Textseiten

### Komponenten (_includes/)
- **navigation.html**: Responsive Bootstrap Navbar
- **footer.html**: Footer mit Links zu Impressum, Datenschutz
- **sections/**: Wiederverwendbare Section-Templates

### Content
- **_sections/**: Modulare Content-Blöcke als Collection
- **index.md**: Homepage Frontmatter + Hero Definition
- ***.md**: Standard-Seiten mit Markdown Content

### Assets
- **main.scss**: Bootstrap Variables + Custom CSS
- **main.js**: Client-side JavaScript Features
- **images/**: Alle Website-Bilder

## Workflow

1. **Content erstellen** → Neue Section in `_sections/` anlegen
2. **Styling anpassen** → Variablen in `assets/css/main.scss` ändern
3. **Testen** → `bundle exec jekyll serve` → localhost:4000
4. **Deployment** → Git Push → GitHub Pages baut automatisch

