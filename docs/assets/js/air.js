/* evonolo Air – Bewegung und Bedienung. Ohne Bibliotheken, alles optional:
   Ohne JavaScript oder mit "Bewegung reduzieren" bleibt jede Seite vollständig lesbar. */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* Fortschrittsbalken, Navigation, mobile Anfrageleiste */
  const bar = $('.progress span'), nav = $('.nav'), mcta = $('.mobile-cta');
  const flowFns = [];
  const onScroll = () => {
    const h = document.documentElement, y = h.scrollTop;
    if (bar) bar.style.transform = `scaleX(${y / ((h.scrollHeight - h.clientHeight) || 1)})`;
    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    if (mcta) mcta.classList.toggle('show', y > innerHeight * 0.6);
    flowFns.forEach(f => f());
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* Menü auf kleinen Bildschirmen: schließt bei Klick auf einen Link und mit Escape */
  const burger = $('.nav-burger');
  if (burger && nav) {
    const setMenu = (open) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    };
    burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('.nav-links a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* Hero-Video (optional): Steht im Hero ein <video data-src="…">, ersetzt es die Kamerafahrt
     über das Foto, sobald es abspielbar ist. Ohne das Element passiert hier nichts. */
  const video = $('.hero-media video');
  if (video && !calm) {
    video.addEventListener('canplay', () => {
      video.closest('.hero').classList.add('has-video');
      video.play().catch(() => {});
    }, { once: true });
    video.src = video.dataset.src;
  }

  /* Einblenden beim Scrollen */
  const seen = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  $$('.reveal').forEach(el => seen.observe(el));

  /* Zählende Kennzahlen */
  const count = (el) => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1500;
    if (calm) { el.textContent = end; return; }
    const tick = (t) => {
      const p = clamp((t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counter = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { count(e.target); counter.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => counter.observe(el));

  /* Zielgruppen-Reiter */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const select = (tab, focus) => {
      tabs.forEach(t => {
        const on = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        panel.hidden = !on;
        if (on) { panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap'); }
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
        if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
  });

  /* Vergleichsregler Wärmebild / Foto */
  $$('.compare').forEach(box => {
    const input = $('input', box);
    let touched = false;
    const set = (v) => box.style.setProperty('--pos', v + '%');
    input.addEventListener('input', () => { touched = true; set(input.value); });
    if (calm) return;
    const hint = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      hint.disconnect();
      const t0 = performance.now();
      const sweep = (t) => {
        if (touched) return;
        const p = clamp((t - t0) / 2600), v = 50 + Math.sin(p * Math.PI * 2) * 24;
        input.value = v;
        set(v);
        if (p < 1) requestAnimationFrame(sweep);
      };
      requestAnimationFrame(sweep);
    }, { threshold: 0.55 });
    hint.observe(box);
  });

  /* Ablauf: Die Flugbahn zeichnet sich beim Scrollen, die Drohne fliegt mit */
  $$('.flow').forEach(flow => {
    const path = $('.done', flow), drone = $('.drone', flow), steps = $$('.step', flow), holder = $('.flow-path', flow);
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    const marks = [0.03, 0.35, 0.66, 0.97];
    const update = () => {
      const r = flow.getBoundingClientRect(), vh = innerHeight;
      const visible = holder.offsetParent !== null;
      const p = calm ? 1 : clamp((vh * 0.82 - r.top) / (vh * 0.5));
      path.style.strokeDashoffset = len * (1 - p);
      if (visible) {
        const pt = path.getPointAtLength(len * p);
        drone.style.left = (pt.x / 1000 * 100) + '%';
        drone.style.top = (pt.y / 120 * 100) + '%';
      }
      steps.forEach((s, i) => s.classList.toggle('on',
        visible ? p >= marks[i] : s.getBoundingClientRect().top < vh * 0.8));
    };
    flowFns.push(update);
  });

  /* Lichtpunkt, der auf Kacheln dem Zeiger folgt */
  $$('.tile').forEach(t => t.addEventListener('pointermove', (e) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  /* Leistungsseite: aktiver Abschnitt in der Unternavigation */
  const subLinks = $$('.subnav a');
  if (subLinks.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          subLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    subLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  /* Direkt verlinkte Frage (faq.html#frage) aufklappen */
  const openTarget = () => {
    if (location.hash.length < 2) return;
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };
  addEventListener('hashchange', openTarget);
  openTarget();

  onScroll();
})();
