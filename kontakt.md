---
layout: page
title: Kontakt
permalink: /kontakt/
---

## Nehmen Sie Kontakt mit uns auf

Wir freuen uns auf Ihre Nachricht! Füllen Sie einfach das folgende Formular aus und wir melden uns schnellstmöglich bei Ihnen.

<div class="row mt-5">
  <div class="col-lg-8">
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="name" class="form-label">Name *</label>
        <input type="text" class="form-control" id="name" name="name" required>
        <div class="invalid-feedback">
          Bitte geben Sie Ihren Namen ein.
        </div>
      </div>
      
      <div class="mb-3">
        <label for="email" class="form-label">E-Mail *</label>
        <input type="email" class="form-control" id="email" name="_replyto" required>
        <div class="invalid-feedback">
          Bitte geben Sie eine gültige E-Mail-Adresse ein.
        </div>
      </div>
      
      <div class="mb-3">
        <label for="subject" class="form-label">Betreff</label>
        <input type="text" class="form-control" id="subject" name="_subject">
      </div>
      
      <div class="mb-3">
        <label for="message" class="form-label">Nachricht *</label>
        <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
        <div class="invalid-feedback">
          Bitte geben Sie eine Nachricht ein.
        </div>
      </div>
      
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="privacy" required>
        <label class="form-check-label" for="privacy">
          Ich habe die <a href="{{ '/datenschutz/' | relative_url }}">Datenschutzerklärung</a> gelesen und akzeptiert. *
        </label>
        <div class="invalid-feedback">
          Sie müssen die Datenschutzerklärung akzeptieren.
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary">Absenden</button>
    </form>
  </div>
  
  <div class="col-lg-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Kontaktinformationen</h5>
        <hr>
        <p><i class="bi bi-geo-alt me-2"></i><strong>Adresse:</strong><br>
        Musterstraße 123<br>
        12345 Musterstadt</p>
        
        <p><i class="bi bi-envelope me-2"></i><strong>E-Mail:</strong><br>
        <a href="mailto:info@example.com">info@example.com</a></p>
        
        <p><i class="bi bi-telephone me-2"></i><strong>Telefon:</strong><br>
        <a href="tel:+491234567890">+49 123 456789</a></p>
      </div>
    </div>
  </div>
</div>

---

**Hinweis:** Für das Kontaktformular wird [Formspree](https://formspree.io/) empfohlen - ein kostenloser Service für statische Websites. Ersetzen Sie `YOUR_FORM_ID` durch Ihre eigene Formspree-ID.

