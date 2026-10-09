/**
 * Cookie-Banner von evonolo-air.com (CookieConsent 3.1).
 * Optionen: https://cookieconsent.orestbida.com/reference/configuration-reference.html
 *
 * Google Analytics lädt assets/js/analytics.js, und zwar nur nach Zustimmung
 * zur Kategorie „analytics“. Texte überarbeitet am 09.10.2026: vorher standen
 * im Einstellungsfenster englische Platzhalter der Vorlage und die falsche
 * Aussage, alle Daten seien anonymisiert.
 */
CookieConsent.run({

    guiOptions: {
        consentModal: {
            layout: 'cloud',
            position: 'bottom center',
            flipButtons: false,
            equalWeightButtons: true
        },
        preferencesModal: {
            layout: 'box',
            flipButtons: false,
            equalWeightButtons: true
        }
    },

    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' },
                    { name: '_gat' }
                ]
            }
        }
    },

    language: {
        default: 'de',
        translations: {
            de: {
                consentModal: {
                    title: 'Dürfen wir messen?',
                    description: 'Wir möchten verstehen, wie diese Website genutzt wird, und setzen dafür Google Analytics ein – aber nur mit deiner Zustimmung. Lehnst du ab, wird nichts an Google übertragen, und die Website funktioniert genauso. Mehr dazu in der <a href="/datenschutz.html">Datenschutzerklärung</a>.',
                    acceptAllBtn: 'Erlauben',
                    acceptNecessaryBtn: 'Ablehnen',
                    showPreferencesBtn: 'Einstellungen'
                },
                preferencesModal: {
                    title: 'Cookie-Einstellungen',
                    acceptAllBtn: 'Alle erlauben',
                    acceptNecessaryBtn: 'Alle ablehnen',
                    savePreferencesBtn: 'Auswahl speichern',
                    closeIconLabel: 'Schließen',
                    sections: [
                        {
                            title: 'Deine Auswahl',
                            description: 'Hier legst du fest, welche Cookies wir verwenden dürfen. Du kannst deine Entscheidung jederzeit über den Link „Cookies“ am Seitenende ändern.'
                        },
                        {
                            title: 'Notwendig',
                            description: 'Speichert deine Auswahl in diesem Fenster. Ohne diesen Eintrag müssten wir dich bei jedem Besuch erneut fragen. Er lässt sich nicht abschalten.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Statistik (Google Analytics)',
                            description: 'Zeigt uns, welche Seiten aufgerufen werden, woher Besucher kommen und ob jemand anruft, eine E-Mail schreibt oder das Kontaktformular abschickt. Dabei wird deine IP-Adresse an Google übertragen und Cookies werden gesetzt. Einzelheiten in der Datenschutzerklärung.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Fragen?',
                            description: 'Schreib uns an <a href="mailto:office@evonolo.com">office@evonolo.com</a>.'
                        }
                    ]
                }
            }
        }
    }
});
