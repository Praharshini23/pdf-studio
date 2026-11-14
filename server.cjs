const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');

const root = __dirname;
const host = '127.0.0.1';
const port = Number(process.env.PDF_STUDIO_PORT || 8765);
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, `http://${host}:${port}`).pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = path.resolve(root, relative);
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(file, (error, body) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'self' blob: data:; script-src 'self' 'wasm-unsafe-eval'; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' blob:; object-src 'none'; base-uri 'self'"
    });
    res.end(body);
  });
});

server.on('error', error => {
  console.error(`PDF Studio could not start: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  const url = `http://${host}:${port}`;
  console.log(`PDF Studio is ready: ${url}`);
  exec(`start "" "${url}"`, { windowsHide: true });
});
