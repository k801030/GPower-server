var CronJob = require('cron').CronJob;
var satistification = require('./satistification');

var job = new CronJob({
  cronTime: '0 * * * * 1-7',
  onTick: satistification,
  start: false,
  timeZone: 'Asia/Taipei'
});
job.start();