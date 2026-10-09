/*
 * Google Analytics 4 für evonolo-air.com — nur nach Einwilligung.
 *
 * Wird auf jeder Seite VOR cookieconsent.umd.js eingebunden, damit die
 * Ereignisse des Banners (cc:onConsent, cc:onChange) schon abgehört werden,
 * wenn der Banner startet. Ohne Zustimmung zur Kategorie „analytics“ wird
 * Google nicht geladen.
 *
 * Gleich aufgebaut wie auf www.evonolo.com (Vorgabe Andreas Prosch,
 * 09.10.2026): Google-Signale und Werbefunktionen aus, gezählt werden Klicks
 * auf E-Mail, Telefon und WhatsApp sowie das Absenden des Kontaktformulars.
 */
(function () {
  var MESS_ID = 'G-NJ0X3KDVX9';
  var geladen = false;

  function laden() {
    if (geladen) return;
    geladen = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    window.gtag('js', new Date());
    window.gtag('config', MESS_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var skript = document.createElement('script');
    skript.async = true;
    skript.src = 'https://www.googletagmanager.com/gtag/js?id=' + MESS_ID;
    document.head.appendChild(skript);
  }

  function erlaubt(detail) {
    return !!(detail && detail.cookie && detail.cookie.categories &&
      detail.cookie.categories.indexOf('analytics') !== -1);
  }

  window.addEventListener('cc:onConsent', function (e) {
    if (erlaubt(e.detail)) laden();
  });

  /* Wer die Zustimmung zurücknimmt, bekommt eine frisch geladene Seite:
     Das bereits geladene Skript von Google lässt sich nicht entladen. Die
     Cookies löscht der Banner selbst (autoClear). */
  window.addEventListener('cc:onChange', function (e) {
    if (erlaubt(e.detail)) laden();
    else if (geladen) location.reload();
  });

  document.addEventListener('click', function (e) {
    if (!geladen) return;
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    var ziel = link.getAttribute('href') || '';
    if (ziel.indexOf('mailto:') === 0) window.gtag('event', 'contact_email');
    else if (ziel.indexOf('tel:') === 0) window.gtag('event', 'contact_phone');
    else if (ziel.indexOf('https://wa.me/') === 0) window.gtag('event', 'contact_whatsapp');
  });

  document.addEventListener('submit', function (e) {
    if (!geladen) return;
    if (e.target && e.target.matches && e.target.matches('form[data-bss-recipient]')) {
      window.gtag('event', 'contact_form');
    }
  }, true);
})();
