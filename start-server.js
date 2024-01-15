const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  const filePath = path.join('C:\\Users\\Admin\\Desktop\\files', 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

const port = 1001;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  exec(`start http://localhost:${port}`);
});
