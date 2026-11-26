// Builds the static site from tools/content.mjs.  Run:  node tools/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { site, projects } from './content.mjs';
import { dims } from './dims.mjs';
import crypto from 'crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const year = new Date().getFullYear();

const missing = new Set();
// Content hash added to CSS/JS links so browsers fetch the new file after every change.
const ver = (f) => crypto.createHash('md5').update(fs.readFileSync(path.join(root, 'assets', f))).digest('hex').slice(0, 8);
const V = { css: ver('style.css'), js: ver('site.js') };
function img(file, prefix, { alt = '', cls = '', eager = false, sizes = '100vw', pos = '' } = {}) {
  const p = path.join(root, 'images', file);
  if (!fs.existsSync(p)) { missing.add(file); return ''; }
  const [w, h] = dims(p) || [1200, 800];
  return `<img src="${prefix}images/${esc(file)}" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${pos ? ` style="object-position:${esc(pos)}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" sizes="${sizes}">`;
}

// Width/height ratio of a gallery item (videos use their poster frame).
function ratio(file) {
  const f = file.endsWith('.mp4') ? file.replace(/\.mp4$/, '-poster.jpeg') : file;
  const p = path.join(root, 'images', f);
  const d = fs.existsSync(p) && dims(p);
  return d ? d[0] / d[1] : 16 / 9;
}

function placeholder(label, prefix) {
  return `<div class="ph-empty"><img src="${prefix}assets/favicon.svg" alt="" width="40" height="40"><span>${esc(label)}</span></div>`;
}
const cover = (file, prefix, opts, label = 'Photos coming soon') => (file ? img(file, prefix, opts) : placeholder(label, prefix));
const badge = (p) => (p.status === 'in-progress' ? '<span class="badge">In progress</span>' : '');

function head({ title, description, prefix, image }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${site.useCustomDomain ? `<meta property="og:image" content="https://${site.domain}/images/${esc(image)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${prefix}assets/style.css?v=${V.css}">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>`;
}

function header(prefix, current) {
  return `<header class="site-header">
  <a class="wordmark" href="${prefix}">${esc(site.name)}</a>
  <nav>
    <a href="${prefix}#professional">Professional</a>
    <a href="${prefix}#personal">Personal</a>
    <button class="theme-toggle" type="button" aria-label="Toggle dark mode"><span></span></button>
  </nav>
</header>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-row">
      <span>© ${year} ${esc(site.name)}</span>
    </div>
  </div>
</footer>
<div class="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb-close" aria-label="Close">×</button>
  <button class="lb-prev" aria-label="Previous photo">‹</button>
  <figure><img alt=""><figcaption></figcaption></figure>
  <button class="lb-next" aria-label="Next photo">›</button>
</div>
<script src="${prefix}assets/site.js?v=${V.js}" defer></script>
</body>
</html>`;
}

// A short silent clip that behaves like a GIF: autoplays, loops, no controls.
// Put "name.mp4" in a photo group; "name-poster.jpeg" is used as the still frame if it exists.
function loopVideo(file, prefix) {
  const p = path.join(root, 'images', file);
  if (!fs.existsSync(p)) { missing.add(file); return ''; }
  const posterFile = file.replace(/\.mp4$/, '-poster.jpeg');
  const hasPoster = fs.existsSync(path.join(root, 'images', posterFile));
  const [w, h] = (hasPoster && dims(path.join(root, 'images', posterFile))) || [16, 9];
  return `<div class="ph ph-video"><video src="${prefix}images/${esc(file)}"${hasPoster ? ` poster="${prefix}images/${esc(posterFile)}"` : ''} width="${w}" height="${h}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video></div>`;
}

// Photos are never cropped: each row is "justified" — every photo keeps its own
// shape and the row's widths are shared so all photos in a row are the same height.
// stacked = true puts every photo on its own full-width row (used by { stack: [...] }).
function gallery(files, prefix, stacked = false) {
  const n = files.length;
  // Split into rows of at most 3 (4 → 2+2, 7 → 3+2+2 …).
  const rows = [];
  let rest = [...files];
  while (rest.length) {
    const take = stacked ? 1 : rest.length === 4 ? 2 : Math.min(3, rest.length);
    rows.push(rest.slice(0, take));
    rest = rest.slice(take);
  }
  const item = (f, perRow) => {
    const r = ratio(f).toFixed(4);
    const sizes = perRow === 1 ? '(min-width: 900px) 860px, 100vw' : '(min-width: 900px) 430px, 50vw';
    const inner = f.endsWith('.mp4') ? loopVideo(f, prefix) : `<a class="ph" href="${prefix}images/${esc(f)}" data-lb>${img(f, prefix, { sizes })}</a>`;
    return `<div class="gi" style="--r:${r}">${inner}</div>`;
  };
  return `<div class="gallery${n === 1 || stacked ? ' g1' : ''}">${rows
    .map((row) => `<div class="grow">${row.map((f) => item(f, row.length)).join('')}</div>`)
    .join('')}</div>`;
}

function block(b, prefix) {
  if (typeof b === 'string') return `<p>${esc(b)}</p>`;
  if (Array.isArray(b)) return gallery(b, prefix);
  if (b.stack) return gallery(b.stack, prefix, true);
  if (b.todo) return `<div class="todo"><strong>To add</strong>${esc(b.todo)}</div>`;
  if (b.note) return `<p class="note">${esc(b.note)}</p>`;
  if (b.link) return `<p><a class="inline-link" href="${prefix}projects/${b.link}/">${esc(b.text)} →</a></p>`;
  return '';
}

// ---------- Sections ----------
// Each project has section: 'personal' (default) or 'professional'.
const sectionOf = (p) => p.section || 'personal';
const SECTIONS = {
  professional: {
    id: 'professional', title: 'Professional work', label: 'Professional project',
    blurb: 'Selected projects from my professional work.',
    empty: 'Case studies from my professional work are on the way.',
  },
  personal: {
    id: 'personal', title: 'Personal projects', label: 'Personal project', hideHead: true,
    blurb: 'Things I’ve designed and built on my own time — by hand, start to finish.',
  },
};
const inSection = (key) => projects.filter((p) => sectionOf(p) === key);

// ---------- Home ----------
function home() {
  const prefix = '';
  const card = (p, i) => `<article class="card reveal">
    <a href="projects/${p.slug}/" class="card-link">
      <div class="card-img${p.cover && p.coverFit !== 'crop' ? ' card-img--whole' : ''}"${p.cover && p.coverFit !== 'crop' ? ` style="--r:${ratio(p.cover).toFixed(4)}"` : ''}>${badge(p)}${cover(p.cover, prefix, { alt: p.title, sizes: '(min-width: 900px) 60vw, 100vw', pos: p.coverPos })}</div>
      <div class="card-body">
        <span class="num">${pad(i + 1)}</span>
        <span class="kicker">${esc(p.kicker)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <span class="more">${p.status === 'in-progress' ? 'Follow the build' : 'Read the build'} <span aria-hidden="true">→</span></span>
      </div>
    </a>
  </article>`;
  const sectionHtml = (key) => {
    const sec = SECTIONS[key];
    const list = inSection(key);
    const body = list.length
      ? list.map(card).join('\n  ')
      : `<div class="section-empty reveal"><span class="badge">Coming soon</span><p>${esc(sec.empty)}</p></div>`;
    return `<section id="${sec.id}" class="work wrap">
  ${sec.hideHead ? '' : `<header class="section-head"><h2 class="section-title">${sec.title}</h2><p>${esc(sec.blurb)}</p></header>`}
  ${body}
</section>`;
  };
  // Professional goes first once it has projects; until then it sits after personal.
  const order = inSection('professional').length ? ['professional', 'personal'] : ['personal', 'professional'];

  return `${head({ title: `${site.name} — Projects`, description: site.intro, prefix, image: site.heroImage })}
<body class="home">
${header(prefix)}
<main>
<section class="hero">
  <div class="hero-text">
    <p class="eyebrow">Portfolio · Northern California</p>
    <h1>Mechanical engineer <em>&amp;</em> builder.</h1>
    <p class="lede">${esc(site.intro)}</p>
    <a class="btn" href="#work">See the work <span aria-hidden="true">↓</span></a>
  </div>
  <div class="collage">${site.collage
    .map((t, i) => t.pair
      ? `<a class="tile t${i + 1} pair" href="${prefix}projects/${t.project}/">${t.pair
          .map((h) => `<span class="half${h.image.endsWith('.png') ? ' dwg' : ''}">${img(h.image, prefix, { alt: h.label, eager: true, pos: h.pos, sizes: '(min-width: 900px) 25vw, 50vw' })}<span class="hero-tag">${esc(h.label)}</span></span>`)
          .join('')}</a>`
      : `<a class="tile t${i + 1}" href="${prefix}projects/${t.project}/">${img(t.image, prefix, { alt: t.label, eager: true, pos: t.pos, sizes: '(min-width: 900px) 15vw, 33vw' })}<span class="hero-tag">${esc(t.label)}</span></a>`)
    .join('\n    ')}
  </div>
</section>

<div id="work">
${order.map(sectionHtml).join('\n')}
</div>
</main>
${footer(prefix)}`;
}

// ---------- Project ----------
// Previous / next card at the bottom of a project page: cover photo, label, title, kicker.
const pagerCard = (q, cls, label, prefix) => `<a href="${prefix}projects/${q.slug}/" class="${cls}"><div class="pager-img">${cover(q.cover, prefix, { alt: '', sizes: '(min-width: 900px) 520px, 100vw', pos: q.coverPos })}</div><div class="pager-text"><span>${label}</span><strong>${esc(q.title)}</strong>${q.kicker ? `<em>${esc(q.kicker)}</em>` : ''}</div></a>`;

function projectPage(p, i) {
  const prefix = '../../';
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const toc = p.chapters.map((c, j) => `<li><a href="#ch-${j + 1}"><span>${pad(j + 1)}</span>${esc(c.title)}</a></li>`).join('');
  const extras = [];
  if (p.beforeAfter) extras.push(['before-after', 'Before & after']);
  if (p.parts) extras.push(['parts', 'Parts replaced']);
  if (p.video) extras.push(['video', 'Video']);
  const extraToc = extras.map(([id, t]) => `<li><a href="#${id}"><span>·</span>${t}</a></li>`).join('');

  const chapters = p.chapters
    .map(
      (c, j) => `<section class="chapter reveal" id="ch-${j + 1}">
      <h2><span class="ch-num">${pad(j + 1)}</span>${esc(c.title)}</h2>
      ${c.blocks.map((b) => block(b, prefix)).join('\n      ')}
    </section>`
    )
    .join('\n    ');

  const ba = p.beforeAfter
    ? `<section class="chapter reveal" id="before-after">
      <h2><span class="ch-num">·</span>Before &amp; after</h2>
      <p class="hint">Drag the handle to compare.</p>
      <div class="ba" style="--pos:50%">
        ${img(p.beforeAfter.after, prefix, { alt: 'After', cls: 'ba-after' })}
        <div class="ba-before">${img(p.beforeAfter.before, prefix, { alt: 'Before' })}</div>
        <span class="ba-label l">Before</span><span class="ba-label r">After</span>
        <input type="range" min="0" max="100" value="50" aria-label="Before and after comparison">
        <span class="ba-handle" aria-hidden="true"></span>
      </div>
    </section>`
    : '';

  const parts = p.parts
    ? `<section class="chapter reveal" id="parts">
      <h2><span class="ch-num">·</span>Parts replaced <small>${p.parts.length}</small></h2>
      <ul class="parts">${p.parts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </section>`
    : '';

  const video = p.video
    ? `<section class="chapter reveal" id="video">
      <h2><span class="ch-num">·</span>As seen on YouTube</h2>
      <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${p.video.id}?start=${p.video.start || 0}" title="Video about the ${esc(p.title)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    </section>`
    : '';

  return `${head({ title: `${p.title} — ${site.name}`, description: p.summary, prefix, image: p.cover || site.heroImage })}
<body class="project">
<div class="progress" aria-hidden="true"></div>
${header(prefix)}
<main>
<section class="p-hero${p.hero ? '' : ' p-hero--empty'}">
  ${p.hero && p.heroFit !== 'crop' ? img(p.hero, prefix, { alt: '', cls: 'p-hero-fill' }) : ''}
  ${p.hero ? img(p.hero, prefix, { alt: p.title, eager: true, pos: p.heroPos, cls: p.heroFit !== 'crop' ? 'p-hero-whole' : '' }) : ''}
  <div class="p-hero-text wrap">
    <span class="kicker">${SECTIONS[sectionOf(p)].label} · ${esc(p.kicker)}</span>${badge(p)}
    <h1>${esc(p.title)}</h1>
  </div>
</section>

<section class="p-intro wrap">
  ${p.meta?.length ? `<dl class="meta">${p.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
  <div class="p-lede">${p.intro.map((t) => (typeof t !== 'string' ? block(t, prefix) : t.startsWith('TODO:') ? block({ todo: t.slice(5).trim() }) : `<p>${esc(t)}</p>`)).join('')}</div>
</section>

<div class="p-body wrap">
  <aside class="toc"><nav aria-label="Chapters"><p>Contents</p><ol>${toc}${extraToc}</ol></nav></aside>
  <article class="chapters">
    ${chapters}
    ${ba}
    ${parts}
    <section class="chapter outcome reveal">
      <h2><span class="ch-num">✓</span>${p.status === 'in-progress' ? 'Where it stands' : 'The result'}</h2>
      ${p.outcome ? `<p>${esc(p.outcome)}</p>` : '<div class="todo"><strong>To add</strong>How it turned out — a short wrap-up once the project is done.</div>'}
    </section>
    ${video}
  </article>
</div>

<nav class="pager wrap" aria-label="More projects">
  ${pagerCard(prev, 'prev', '← Previous', prefix)}
  ${pagerCard(next, 'next', 'Next →', prefix)}
  <a class="pager-home" href="${prefix}#work"><span aria-hidden="true">←</span> All projects</a>
</nav>
</main>
${footer(prefix)}`;
}

function notFound() {
  return `${head({ title: `Not found — ${site.name}`, description: 'Page not found', prefix: '/', image: site.heroImage })}
<body class="home">
${header('/')}
<main class="wrap nf"><h1>Nothing built here yet.</h1><p><a class="btn" href="/">Back to the work</a></p></main>
${footer('/')}`;
}

// ---------- Write ----------
const write = (rel, html) => {
  const out = path.join(root, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
};
write('index.html', home());
projects.forEach((p, i) => write(`projects/${p.slug}/index.html`, projectPage(p, i)));
write('404.html', notFound());
const cname = path.join(root, 'CNAME');
if (site.useCustomDomain) write('CNAME', site.domain); // no trailing newline — matches what GitHub writes
else if (fs.existsSync(cname)) fs.unlinkSync(cname);
write('.nojekyll', '');

// Report unused images (handy for cleanup)
const used = new Set([site.heroImage, ...site.collage.flatMap((t) => (t.pair ? t.pair.map((h) => h.image) : [t.image])), ...projects.flatMap((p) => [p.cover, p.hero, ...p.chapters.flatMap((c) => c.blocks.flatMap((b) => (Array.isArray(b) ? b : b?.stack || []))), p.beforeAfter?.before, p.beforeAfter?.after].filter(Boolean))]);
const unused = fs.readdirSync(path.join(root, 'images')).filter((f) => !used.has(f) && !f.endsWith('-poster.jpeg'));
if (missing.size) console.warn('MISSING images:', [...missing].join(', '));
console.log(`Built ${projects.length + 2} pages. Unused images: ${unused.length ? unused.join(', ') : 'none'}`);
