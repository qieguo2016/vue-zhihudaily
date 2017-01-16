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
const basePath = config.basePath

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
app.get(basePath + 'api/*', function (req, res) {
	let url = baseUrl + req.url.split('/daily')[1]
	logger.debug('proxy request: ' + url)
	request.get(url).pipe(res)
});

// load image, because zhihu forbidden load img
app.get(basePath + 'loadImg', function (req, res) {
	let url = req.query.url;
	logger.debug('load image: ' + url)
	request.get(url).pipe(res)
})

// serve static files of basePath
app.get(basePath + '*', function (req, res) {
	logger.debug('local request: ' + req.url)
	let file = req.path.split('/daily/')[1]
	readFile(file, function (err, data) {
		if (err) {
			res.status = 404;
			res.send('Not Found');
		} else {
			res.send(data);
		}
	})
})

// send app's index.html
const entryDir = path.join(__dirname, 'dist', 'index.html')
const entryFile = fs.readFileSync(entryDir, 'utf-8')  // ceche file
app.get(basePath.slice(0, basePath.length - 1), function (req, res) {
	logger.debug('local request: ' + req.url)
	res.send(entryFile)
})

const port = config.SERVER_PORT
const server = http.createServer(app).listen(port)

console.log(`start server http://localhost:${port}`)

let cache = {};
function readFile(file, cb) {
	if (cache[file]) {
		cb(null, cache[file]);
	} else {
		const fileDir = path.join(__dirname, 'dist', file)
		fs.readFile(fileDir, function (err, data) {
			if (err) {
				cb(err)
			} else {
				cache[file] = data;
				cb(null, data);
			}
		});
	}
}

