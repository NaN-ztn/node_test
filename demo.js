import http from 'http'
import fs from 'fs'
import url, { fileURLToPath } from 'url'
import path from 'path'

// esm 中没有__dirname ,这是commonjs自带的
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function serveStaticFile(res, path, contentType, responseType = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(200, { contentType })
        .end('500 - Internal Error')
    } else {
      res.writeHead(responseType, { contentType })
        .end(data)
    }
  })
}

http.createServer((req, res) => {
  let path = url.parse(req.url).pathname
  console.log(path)
  switch (path) {
    case '/':
      serveStaticFile(res, '/public/home.html', 'text / plain')
      break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text / plain')
      break;
    case '/img/logo.jpg':
      serveStaticFile(res, '/img/logo.jpg', 'image/jpeg')
      break;
    default:
      serveStaticFile(res, '/public/404.html', 'text/plain', 404)
      break;
  }
}).listen(3000)
console.log('Server started on localhost:3000; press Ctrl-C to terminate....')