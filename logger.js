/**
 * Created by qieguo on 2016/9/13.
 */

const env = process.env.NODE_ENV || "development";
const log4js = require('log4js');

log4js.configure({
  appenders: [
    {type: 'console'},
    {type: 'file', filename: 'logs/cheese.log', category: 'cheese'}
  ],
  replaceConsole: true
});

let logger = log4js.getLogger('cheese');
logger.setLevel(env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;

