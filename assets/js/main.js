// Main JavaScript für die Website

// Bootstrap Form Validation
(function () {
  'use strict'

  // Alle Formulare mit .needs-validation class
  var forms = document.querySelectorAll('.needs-validation')

  // Loop über Forms und verhindere Submission bei ungültigen Eingaben
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

// Smooth Scrolling für Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      e.preventDefault()
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0
      const targetPosition = target.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  })
})

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow')
    } else {
      navbar.classList.remove('shadow')
    }
  }
})

// Lazy Loading für Bilder (optional - moderne Browser unterstützen loading="lazy")
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })
}

// Console Info
console.log('%c🚀 Evonolo Air Website', 'font-size: 20px; color: #007bff; font-weight: bold;')
console.log('%cGebaut mit Jekyll & Bootstrap 5', 'font-size: 14px; color: #6c757d;')

