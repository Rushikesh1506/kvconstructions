const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const mime = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg',
  '.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.webp':'image/webp','.woff':'font/woff',
  '.woff2':'font/woff2','.pdf':'application/pdf'
};
http.createServer((req, res) => {
  let file = path.join(dir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(file)) { res.writeHead(404); res.end('404'); return; }
  const ext = path.extname(file);
  res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
}).listen(3000, () => console.log('Server at http://localhost:3000'));
