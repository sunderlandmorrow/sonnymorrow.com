// Local preview:  node tools/serve.mjs
// Starts on port 4321, or the next free port if that one is taken, and prints the address.
//
// Live text editing (local preview only): every page gets an "Edit text" button.
// Turn it on, double-click any text, type, then press Enter or click away to save.
// Saving rewrites the matching text in tools/content.mjs and rebuilds the site.
// "Publish" commits and pushes to GitHub, which updates sonnymorrow.com.
import http from 'http'; import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentFile = path.join(root, 'tools', 'content.mjs');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };

const run = (cmd, args) => new Promise((resolve) => execFile(cmd, args, { cwd: root, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout: 120000 }, (err, stdout, stderr) => resolve({ ok: !err, out: `${stdout}${stderr}`.trim() })));
const rebuild = () => run(process.execPath, [path.join(root, 'tools', 'build.mjs')]);

// Text as it appears inside a single-quoted string in content.mjs.
const lit = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
const count = (hay, needle) => hay.split(needle).length - 1;

const buildFile = path.join(root, 'tools', 'build.mjs');
const logFile = path.join(root, 'tools', 'unsaved-edits.txt');
const inner = (s) => lit(s).slice(1, -1);                       // as written inside '…' in content.mjs
const htmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Write the new files, rebuild, and undo everything if the build breaks.
async function apply(changes) {
  const old = changes.map(([f]) => [f, fs.readFileSync(f, 'utf8')]);
  for (const [f, s] of changes) fs.writeFileSync(f, s);
  const b = await rebuild();
  if (b.ok) return null;
  for (const [f, s] of old) fs.writeFileSync(f, s);
  await rebuild();
  return 'Build failed, change undone: ' + b.out.slice(0, 300);
}

// Text that's put together from several pieces (e.g. "Personal project · Kicker") or that lives in the
// page layout (build.mjs) isn't found whole. Find the part that changed, then grow it outward word by
// word until it matches exactly one place in content.mjs or build.mjs, and change just that.
function findPiece(before, after, srcs) {
  let i = 0;
  while (i < before.length && i < after.length && before[i] === after[i]) i++;
  let j = 0;
  while (j < before.length - i && j < after.length - i && before[before.length - 1 - j] === after[after.length - 1 - j]) j++;
  let a = i, b = before.length - j;                               // changed part of `before` is [a, b)
  const isW = (c) => c && /[\p{L}\p{N}'’-]/u.test(c);
  while (a > 0 && isW(before[a - 1])) a--;                        // snap to whole words
  while (b < before.length && isW(before[b])) b++;
  for (let step = 0; step < 400; step++) {
    const piece = before.slice(a, b);
    const tail = before.length - b;
    const newPiece = after.slice(a, after.length - tail);
    if (piece.trim().length >= 3) {
      const hits = [];
      for (const [file, src] of srcs) {
        const forms = file === contentFile ? [[inner(piece), inner(newPiece)]] : htmlEsc(piece) === piece ? [[piece, newPiece]] : [[piece, newPiece], [htmlEsc(piece), htmlEsc(newPiece)]];
        for (const [from, to] of forms) { const n = count(src, from); if (n) hits.push({ file, from, to, n }); }
      }
      const total = hits.reduce((s, h) => s + h.n, 0);
      if (total === 1) return hits[0];
      if (total === 0) return null;                               // growing further can only match less
    }
    if (a === 0 && b === before.length) return null;
    if (a > 0) { a--; while (a > 0 && isW(before[a - 1])) a--; }
    if (b < before.length) { b++; while (b < before.length && isW(before[b])) b++; }
  }
  return null;
}

async function saveEdit({ before, after, all, page }) {
  before = String(before ?? '').trim(); after = String(after ?? '').trim();
  if (!before || !after) return { ok: false, message: 'Text can’t be empty.' };
  if (before === after) return { ok: true, message: 'No change.' };
  const src = fs.readFileSync(contentFile, 'utf8');
  const from = lit(before);
  const n = count(src, from);
  if (n > 1 && !all) return { ok: false, multiple: n, message: `This exact text appears ${n} times on the site.` };
  if (n >= 1) {
    const err = await apply([[contentFile, src.split(from).join(lit(after))]]);
    if (err) return { ok: false, message: err };
    return { ok: true, message: n > 1 ? `Saved (${n} places).` : 'Saved.' };
  }
  const hit = findPiece(before, after, [[contentFile, src], [buildFile, fs.readFileSync(buildFile, 'utf8')]]);
  if (hit) {
    const s = fs.readFileSync(hit.file, 'utf8');
    const err = await apply([[hit.file, s.replace(hit.from, () => hit.to)]]);
    if (!err) return { ok: true, message: 'Saved.' };
  }
  // Couldn't place it automatically — keep it so Claude can apply it, and nothing typed is lost.
  fs.appendFileSync(logFile, `--- ${new Date().toISOString()}  ${page || ''}\nBEFORE: ${before}\nAFTER:  ${after}\n\n`);
  return { ok: false, kept: true, message: 'Couldn’t save this one automatically. It’s kept in tools/unsaved-edits.txt — ask Claude to apply it.' };
}

// Remove one photo from a project page. `index` is which appearance of that file on the page
// (the same photo can be in a chapter and again in "Then & now"). The image file itself is kept.
async function removeImage({ slug, file, index }) {
  slug = String(slug || ''); file = String(file || ''); index = +index || 0;
  if (!slug || !file) return { ok: false, message: 'Missing photo.' };
  const src = fs.readFileSync(contentFile, 'utf8');
  const lines = src.split('\n');
  const start = lines.findIndex((l) => l.includes(`slug: ${lit(slug)}`));
  if (start < 0) return { ok: false, message: 'Project not found.' };
  let end = lines.findIndex((l, k) => k > start && /^\s*slug:\s*'/.test(l));
  if (end < 0) end = lines.length;
  const needle = lit(file);
  let seen = 0, at = -1;
  for (let k = start; k < end; k++) {
    if (/^\s*(cover|hero|beforeAfter)\s*:/.test(lines[k])) continue;   // only photos in the page's photo groups
    const n = count(lines[k], needle);
    if (seen + n > index) { at = k; break; }
    seen += n;
  }
  if (at < 0) return { ok: false, message: 'Couldn’t find that photo in the content file.' };
  // Drop the nth-on-this-line copy along with its comma.
  let line = lines[at], pos = -1;
  for (let m = 0; m <= index - seen; m++) pos = line.indexOf(needle, pos + 1);
  let a = pos, b = pos + needle.length;
  const after = line.slice(b).match(/^\s*,\s*/);
  if (after) b += after[0].length;
  else { const before = line.slice(0, a).match(/,\s*$/); if (before) a -= before[0].length; }
  line = line.slice(0, a) + line.slice(b);
  const empty = /^\s*(\[\s*\]|\{\s*stack:\s*\[\s*\]\s*\})\s*,?\s*$/.test(line);
  if (empty) lines.splice(at, 1); else lines[at] = line;
  const err = await apply([[contentFile, lines.join('\n')]]);
  return err ? { ok: false, message: err } : { ok: true, message: 'Photo removed.' };
}

async function publish() {
  const st = await run('git', ['status', '--porcelain']);
  if (!st.out) return { ok: true, message: 'Nothing new to publish.' };
  await run('git', ['add', '-A']);
  const c = await run('git', ['commit', '-m', 'Edit text in the local editor']);
  if (!c.ok) return { ok: false, message: 'Commit failed: ' + c.out.slice(0, 300) };
  const p = await run('git', ['push']);
  if (!p.ok) return { ok: false, message: 'Push failed: ' + p.out.slice(0, 300) };
  return { ok: true, message: 'Published — sonnymorrow.com updates in about a minute.' };
}

const editorTag = '<script src="/__editor.js" defer></script>';
const readBody = (req) => new Promise((resolve) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch { resolve({}); } }); });
const json = (res, code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  // Editor API. The custom header blocks other websites from calling it (they can't send it without a preflight we never answer).
  if (req.method === 'POST' && url.pathname.startsWith('/__')) {
    if (req.headers['x-portfolio-editor'] !== '1') return json(res, 403, { ok: false, message: 'Forbidden' });
    if (url.pathname === '/__save') return json(res, 200, await saveEdit(await readBody(req)));
    if (url.pathname === '/__publish') return json(res, 200, await publish());
    if (url.pathname === '/__remove-image') return json(res, 200, await removeImage(await readBody(req)));
    return json(res, 404, { ok: false });
  }
  if (url.pathname === '/__editor.js') { res.writeHead(200, { 'content-type': types['.js'], 'cache-control': 'no-store' }); return fs.createReadStream(path.join(root, 'tools', 'editor.js')).pipe(res); }

  let p = path.join(root, decodeURIComponent(url.pathname));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(fs.readFileSync(path.join(root, '404.html'))); }
  if (p.endsWith('.html')) {
    // Pages are served fresh with the editor added; the published files never contain it.
    res.writeHead(200, { 'content-type': types['.html'], 'cache-control': 'no-store' });
    return res.end(fs.readFileSync(p, 'utf8').replace('</body>', `${editorTag}\n</body>`));
  }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});

const HOST = '127.0.0.1';
let port = +process.env.PORT || 4321;
const tries = port + 20;
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE' && port < tries) { console.log(`Port ${port} is busy, trying ${port + 1}…`); server.listen(++port, HOST); }
  else { console.error(e.message); process.exit(1); }
});
server.on('listening', () => console.log(`\n  Sonny Morrow portfolio running at  http://127.0.0.1:${port}\n  Click "Edit text" (bottom right) to edit any text by double-clicking it.\n  (Ctrl+C to stop)\n`));
server.listen(port, HOST);
