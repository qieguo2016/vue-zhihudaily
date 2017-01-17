/**
 * Created by qieguo on 2016/9/13.
 */

const env = process.env.NODE_ENV || "development";
const log4js = require('log4js');
const fs = require('fs');
const dir = 'logs/'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


log4js.configure({
  appenders: [
    {type: 'console'},
    {type: 'file', filename: dir + 'cheese.log', category: 'cheese'}
  ],
  replaceConsole: true
});

let logger = log4js.getLogger('cheese');
logger.setLevel(env === 'development' ? 'DEBUG' : 'ERROR')

module.exports = logger;

