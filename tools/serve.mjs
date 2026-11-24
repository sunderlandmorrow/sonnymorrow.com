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

async function saveEdit({ before, after, all }) {
  before = String(before ?? '').trim(); after = String(after ?? '').trim();
  if (!before || !after) return { ok: false, message: 'Text can’t be empty.' };
  if (before === after) return { ok: true, message: 'No change.' };
  const src = fs.readFileSync(contentFile, 'utf8');
  const from = lit(before);
  const n = count(src, from);
  if (n === 0) return { ok: false, notFound: true, message: 'This text is part of the page layout, not the content file — ask Claude to change it.' };
  if (n > 1 && !all) return { ok: false, multiple: n, message: `This exact text appears ${n} times on the site.` };
  fs.writeFileSync(contentFile, src.split(from).join(lit(after)));
  const b = await rebuild();
  if (!b.ok) { fs.writeFileSync(contentFile, src); await rebuild(); return { ok: false, message: 'Build failed, change undone: ' + b.out.slice(0, 300) }; }
  return { ok: true, message: n > 1 ? `Saved (${n} places).` : 'Saved.' };
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
