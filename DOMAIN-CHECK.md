# Domain-Check: www.evonolo-air.com

Stand: 14.10.2026. Diese Datei liegt bewusst im Repo-Root und nicht in `docs/`, damit sie nicht veröffentlicht wird.

## Befund

| Prüfung | Ergebnis |
|---|---|
| `docs/CNAME` | `evonolo-air.com` ✅ |
| `https://evonolo-air.com/` | 200, läuft über **Cloudflare** (Proxy aktiv, `server: cloudflare`) ✅ |
| `http://www.evonolo-air.com/` | 301 von GitHub Pages ✅ |
| `https://www.evonolo-air.com/` | ❌ **Zertifikatsfehler**: GitHub liefert nur `*.github.io`, kein Zertifikat für `www.evonolo-air.com` |
| DNS `www` | CNAME auf `evonolo.github.io`, **nicht** über Cloudflare geproxied |
| DNS Apex | Cloudflare-IPs (188.114.96.12 / 188.114.97.12) |

Ursache: Die Hauptdomain läuft über den Cloudflare-Proxy, `www` geht direkt zu GitHub. GitHub kann für `www` kein Zertifikat ausstellen, weil die Domain im Pages-Setup auf die Apex-Adresse zeigt und die Apex nicht direkt bei GitHub ankommt. Ein Crawler, der `https://www.…` aufruft, bricht deshalb ab. Beim GEO-Check sah das aus wie „von robots.txt abgewiesen“.

## Lösung (empfohlen, in Cloudflare)

1. **Cloudflare → DNS → Records**: Beim Eintrag `www` (CNAME → `evonolo.github.io`) die Wolke auf **orange (Proxied)** stellen. Damit gilt das Cloudflare-Zertifikat auch für `www`.
2. **Cloudflare → Rules → Redirect Rules → Create rule**
   - Wenn: Hostname gleich `www.evonolo-air.com`
   - Dann: Dynamic Redirect auf `concat("https://evonolo-air.com", http.request.uri.path)`, Statuscode **301**, „Preserve query string“ aktiv.
3. **Cloudflare → SSL/TLS**: Modus **Full** (nicht „Flexible“), „Always Use HTTPS“ an.
4. **GitHub → Repo evonolo-air-website → Settings → Pages**: Custom domain bleibt `evonolo-air.com`. „Enforce HTTPS“ aktivieren, falls die Option anwählbar ist (bei Cloudflare-Proxy ist sie manchmal ausgegraut, dann übernimmt Schritt 3 das).

Alternative ohne Cloudflare-Proxy: Apex und `www` beide auf „DNS only“ (graue Wolke) stellen, Apex mit den vier GitHub-A-Records (185.199.108.153 bis 185.199.111.153). Dann stellt GitHub selbst Zertifikate für beide Adressen aus und leitet `www` weiter. Das dauert nach der Umstellung bis zu 24 Stunden.

## Test

```sh
curl -I https://www.evonolo-air.com/
```

Erwartet: `HTTP/2 301` und `location: https://evonolo-air.com/`.

```sh
curl -I https://www.evonolo-air.com/robots.txt
```

Erwartet: 301 auf `https://evonolo-air.com/robots.txt`, danach 200 mit `Allow: /`.
