(() => {
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle
  const toggle = document.querySelector('.theme-toggle');
  toggle?.addEventListener('click', () => {
    const dark = doc.dataset.theme ? doc.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    doc.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', doc.dataset.theme); } catch (e) {}
  });

  // Header border + reading progress
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.progress');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 10);
    if (bar) bar.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, doc.scrollHeight - innerHeight))})`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Count-up stats
  const counters = document.querySelectorAll('[data-count]');
  if (!reduce) {
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const end = +e.target.dataset.count, t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  // Active chapter in table of contents
  const tocLinks = [...document.querySelectorAll('.toc a')];
  if (tocLinks.length) {
    const map = new Map(tocLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const tio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        tocLinks.forEach((a) => a.classList.remove('active'));
        map.get(e.target.id)?.classList.add('active');
      }
    }), { rootMargin: '-30% 0px -60% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) tio.observe(s); });
  }

  // Before / after slider
  document.querySelectorAll('.ba').forEach((ba) => {
    const r = ba.querySelector('input');
    const set = () => ba.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', set);
    set();
  });

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const links = [...document.querySelectorAll('[data-lb]')];
  if (lb && links.length) {
    const img = lb.querySelector('img'), cap = lb.querySelector('figcaption');
    let i = 0, lastFocus = null;
    const show = (n) => {
      i = (n + links.length) % links.length;
      img.src = links[i].getAttribute('href');
      cap.textContent = `${i + 1} / ${links.length}`;
    };
    const open = (n) => { lastFocus = document.activeElement; show(n); lb.hidden = false; doc.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); };
    const close = () => { lb.hidden = true; doc.style.overflow = ''; img.removeAttribute('src'); lastFocus?.focus(); };
    links.forEach((a, n) => a.addEventListener('click', (e) => { e.preventDefault(); open(n); }));
    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = () => show(i - 1);
    lb.querySelector('.lb-next').onclick = () => show(i + 1);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
})();

// Looping clips: only play while on screen; respect "reduce motion".
(() => {
  const vids = document.querySelectorAll('.ph-video video');
  if (!vids.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    vids.forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; v.removeAttribute('aria-hidden'); });
    return;
  }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
  }), { threshold: 0.25 });
  vids.forEach((v) => io.observe(v));
})();
