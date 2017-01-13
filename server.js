/**
 * Created by qieguo on 2016/12/25.
 */

const path = require('path')
const fs = require('fs')
const express = require('express')
const compress = require('compression')
const http = require('http')
const request = require('superagent')
const logger = require('./logger')
const config = require('./config')

// baseURL setting
const baseUrl = 'http://news-at.zhihu.com'

const app = express()

// close framework info
app.disable('x-powered-by')

// gzip compress
app.use(compress())

// post request body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// static files
app.use(express.static(path.join(__dirname, 'dist')));

// proxy request to zhihu
app.get('/api/*', function (req, res) {
	logger.debug('proxy request: ' + req.url)
	let url = baseUrl + req.url
	request.get(url).pipe(res)
});

// send app's index.html
const entryDir = path.join(__dirname, 'dist', 'index.html')
const entryFile = fs.readFileSync(entryDir, 'utf-8')  // ceche file
app.get('*', function (req, res) {
	logger.debug('local request: ' + req.url)
	res.send(entryFile)
})

const port = config.SERVER_PORT
const server = http.createServer(app).listen(port)

console.log(`start server http://localhost:${port}`)

