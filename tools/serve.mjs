// Local preview:  node tools/serve.mjs
// Starts on port 4321, or the next free port if that one is taken, and prints the address.
import http from 'http'; import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };

const server = http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404, { 'content-type': types['.html'] }); return res.end(fs.readFileSync(path.join(root, '404.html'))); }
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
server.on('listening', () => console.log(`\n  Sonny Morrow portfolio running at  http://127.0.0.1:${port}\n  (Ctrl+C to stop)\n`));
server.listen(port, HOST);
