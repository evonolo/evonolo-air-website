/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
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
            // position: 'left right',
            flipButtons: false,
            equalWeightButtons: true
        }
    },
    
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },   // _ga, _ga_xxxxx
              { name: '_gid' },
              { name: '_gat' }
            ]
          },
        }
    },

    language: {
        default: 'de',
        translations: {
            de: {
                consentModal: {
                    title: 'Wir nutzen Cookies',
                    description: 'Diese Website nutzt notwendige Cookies für den Betrieb. Mit deiner Zustimmung verwenden wir zusätzlich Statistik-Cookies (Google Analytics 4), um unsere Inhalte zu optimieren.',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Alle ablehnen',
                    showPreferencesBtn: 'Individuell anpassen'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'Somebody said ... cookies?',
                            description: 'I want one!'
                        },
                        {
                            title: 'Strictly Necessary cookies',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            }
        }
    }
});