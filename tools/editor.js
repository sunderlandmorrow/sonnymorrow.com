// Live text editor — loaded only by the local preview server (tools/serve.mjs), never on the live site.
// Turn on "Edit text", double-click any text, type, then press Enter (or click away) to save.
// Esc cancels. Shift+Enter is ignored (text blocks are single paragraphs).
(() => {
  const TEXT = 'h1, h2, h3, p, li, dd, dt, figcaption, .kicker, .hero-tag, .eyebrow, .more, .num, .todo, .hint, .btn, .wordmark, .site-header nav a, .pager-text span, .pager-text strong, .pager-text em, .badge, .ba-label, .toc a, .footer-row span, .inline-link, small';
  let on = false;

  const css = document.createElement('style');
  css.textContent = `
    .ed-bar { position: fixed; right: 16px; bottom: 16px; z-index: 9999; display: flex; gap: 8px; font: 500 14px/1 system-ui, sans-serif; }
    .ed-bar button { border: 0; border-radius: 999px; padding: 11px 16px; cursor: pointer; background: #2b241d; color: #f3ece2; box-shadow: 0 6px 20px rgb(0 0 0 / .35); }
    .ed-bar button.on { background: #d0703f; color: #fff; }
    .ed-bar .pub { background: #f3ece2; color: #1b1712; }
    .ed-toast { position: fixed; right: 16px; bottom: 66px; z-index: 9999; max-width: 360px; padding: 10px 14px; border-radius: 10px; font: 14px/1.4 system-ui, sans-serif; background: #1b1712; color: #f3ece2; box-shadow: 0 6px 20px rgb(0 0 0 / .35); }
    .ed-toast.err { background: #8a2b1d; }
    body.ed-on :is(${TEXT}):hover { outline: 1px dashed #d0703f; outline-offset: 3px; cursor: text; }
    body.ed-on a { cursor: text; }
    body.ed-noimg :is(img, video, .collage, .card-img, .gallery, .ph) { display: none !important; }
    body.ed-noimg .p-hero { height: auto !important; min-height: 0 !important; margin-top: 0 !important; padding-top: 90px; background: #2b241d; }
    body.ed-noimg .p-hero-text { position: static !important; }
    body.ed-noimg .hero { grid-template-columns: 1fr !important; }
    .gi { position: relative; }
    .ed-x { display: none; position: absolute; top: 8px; right: 8px; z-index: 5; width: 34px; height: 34px; border: 2px solid #fff; border-radius: 50%; background: #d42a1e; color: #fff; font: 700 22px/1 system-ui, sans-serif; cursor: pointer; box-shadow: 0 2px 10px rgb(0 0 0 / .45); padding: 0; }
    .ed-x:hover { background: #a81c12; transform: scale(1.08); }
    body.ed-on .ed-x { display: block; }
    [contenteditable] { outline: 2px solid #d0703f !important; outline-offset: 3px; background: rgb(208 112 63 / .08); }
  `;
  document.head.append(css);

  const bar = document.createElement('div');
  bar.className = 'ed-bar';
  bar.innerHTML = '<button type="button" class="img"></button><button type="button" class="tog">Edit text</button><button type="button" class="pub">Publish</button>';
  document.body.append(bar);
  const tog = bar.querySelector('.tog');

  // Hide images (local preview only) so you can focus on the text. Remembered between pages.
  const imgBtn = bar.querySelector('.img');
  function setImages(show) {
    document.body.classList.toggle('ed-noimg', !show);
    imgBtn.textContent = show ? 'Hide images' : 'Show images';
    try { localStorage.setItem('ed-img', show ? 'show' : 'hide'); } catch {}
  }
  let imgPref = 'hide';
  try { imgPref = localStorage.getItem('ed-img') || 'hide'; } catch {}
  setImages(imgPref === 'show');
  imgBtn.addEventListener('click', () => setImages(document.body.classList.contains('ed-noimg')));

  let toastTimer;
  function toast(msg, err) {
    document.querySelector('.ed-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'ed-toast' + (err ? ' err' : '');
    t.textContent = msg;
    document.body.append(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.remove(), err ? 6000 : 2500);
  }

  const api = (url, body) => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-portfolio-editor': '1' }, body: JSON.stringify(body || {}) }).then((r) => r.json());

  function setOn(v) {
    on = v;
    document.body.classList.toggle('ed-on', on);
    tog.classList.toggle('on', on);
    tog.textContent = on ? 'Editing — double-click text' : 'Edit text';
    try { sessionStorage.setItem('ed-on', on ? '1' : ''); } catch {}
  }
  tog.addEventListener('click', () => setOn(!on));
  try { if (sessionStorage.getItem('ed-on')) setOn(true); } catch {}

  bar.querySelector('.pub').addEventListener('click', async () => {
    if (!confirm('Publish your text changes to sonnymorrow.com?')) return;
    toast('Publishing…');
    const r = await api('/__publish');
    toast(r.message, !r.ok);
  });

  // Red X on every photo in a project page's photo groups (shown while editing) to remove it.
  const slug = (location.pathname.match(/\/projects\/([^/]+)\//) || [])[1];
  if (slug) {
    const fileOf = (gi) => {
      const m = gi.querySelector('video, img');
      return m ? decodeURIComponent((m.getAttribute('src') || '').split('/').pop().split('?')[0]) : '';
    };
    const items = [...document.querySelectorAll('.gallery .gi')];
    const seen = {};
    for (const gi of items) {
      const file = fileOf(gi);
      if (!file) continue;
      const index = (seen[file] = (seen[file] ?? -1) + 1);
      const x = document.createElement('button');
      x.type = 'button'; x.className = 'ed-x'; x.title = 'Remove this photo'; x.textContent = '×';
      x.addEventListener('click', async (e) => {
        e.preventDefault(); e.stopPropagation();
        if (!confirm(`Remove this photo from the page?\n${file}`)) return;
        toast('Removing…');
        const r = await api('/__remove-image', { slug, file, index });
        if (r.ok) { try { sessionStorage.setItem('ed-scroll', String(scrollY)); } catch {} location.reload(); }
        else toast(r.message, true);
      });
      gi.append(x);
    }
    try { const y = sessionStorage.getItem('ed-scroll'); if (y) { sessionStorage.removeItem('ed-scroll'); requestAnimationFrame(() => scrollTo(0, +y)); toast('Photo removed.'); } } catch {}
  }

  // While editing, links don't navigate (so you can double-click text inside cards and links).
  document.addEventListener('click', (e) => {
    if (!on || e.target.closest('.ed-bar, .ed-x')) return;
    if (e.target.closest('a, [data-lb]')) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Pick the element to edit. If it mixes text with other elements (e.g. a chapter
  // number before a heading), wrap just its longest piece of text and edit that.
  function target(el) {
    if (!el.closest(TEXT) || el.closest('.ed-bar')) return null;
    el = el.closest(TEXT);
    if (!el.children.length) return el;
    const texts = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
    if (!texts.length) return null;
    const node = texts.sort((a, b) => b.textContent.length - a.textContent.length)[0];
    const span = document.createElement('span');
    span.dataset.edWrap = '';
    node.replaceWith(span);
    span.append(node);
    return span;
  }

  function unwrap(el) {
    if (el.dataset.edWrap === undefined) return;
    el.replaceWith(...el.childNodes);
  }

  document.addEventListener('dblclick', (e) => {
    if (!on) return;
    const el = target(e.target);
    if (!el) return;
    e.preventDefault();
    const before = el.textContent.trim();
    el.contentEditable = 'plaintext-only';
    if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);

    let done = false;
    const finish = async (save) => {
      if (done) return; done = true;
      el.removeAttribute('contenteditable');
      el.removeEventListener('keydown', keys);
      const after = el.textContent.replace(/\s+/g, ' ').trim();
      if (!save || after === before) { el.textContent = before; unwrap(el); return; }
      const page = location.pathname;
      let r = await api('/__save', { before, after, page });
      if (r.multiple && confirm(`"${before.slice(0, 60)}${before.length > 60 ? '…' : ''}" appears ${r.multiple} times on the site. Change all of them?`)) {
        r = await api('/__save', { before, after, all: true, page });
      }
      if (!r.ok && !r.kept) el.textContent = before;
      unwrap(el);
      toast(r.message || (r.ok ? 'Saved.' : 'Not saved.'), !r.ok);
    };
    const keys = (k) => {
      if (k.key === 'Enter') { k.preventDefault(); finish(true); el.blur(); }
      if (k.key === 'Escape') { k.preventDefault(); finish(false); }
    };
    el.addEventListener('keydown', keys);
    el.addEventListener('blur', () => finish(true), { once: true });
  });
})();
