source "https://rubygems.org"

# Jekyll Version für GitHub Pages
gem "jekyll", "~> 3.9.3"

# GitHub Pages Gem (enthält alle von GitHub Pages unterstützten Plugins)
gem "github-pages", "~> 228", group: :jekyll_plugins

# Zusätzliche Gems für Entwicklung
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows und JRuby Support
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-Booster für file watching
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

