/**
 * Created by qieguo on 2016/12/25.
 */

const path = require('path')
const fs = require('fs')

// setting
const baseUrl = 'http://news-at.zhihu.com'
const entryDir = path.join(__dirname, 'static', 'index.html')

const express = require('express')
const app = express()

// close framework info
app.disable('x-powered-by')

// favicon
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

// gzip compress
const compress = require('compression')
app.use(compress())

// post request body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// static files
app.use(express.static(path.join(__dirname, 'static')));

// proxy request to zhihu
const request = require('superagent')
app.get('/api/*', function (req, res) {
  let url = baseUrl + req.url
  request.get(url).pipe(res)
});

// send app's index.html
const entry = fs.readFileSync(entryDir, 'utf-8')
app.get('*', function (req, res) {
  res.send(entry)
})

const port = '8080'
const http = require('http')
const server = http.createServer(app).listen(port)

console.log(`start server http://localhost:${port}`)

