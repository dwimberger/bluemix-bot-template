var debug = require('debug')('app');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var BOT_TOKEN;

if (appEnv.isLocal) {
  //put your development BOT Token
  BOT_TOKEN = '';
  debug('Local run');
} else {
  //Put your production BOT Token
  BOT_TOKEN = '';
  debug('Container run');
}

var express = require('express');
var http = require('http');
var TelegramBot = require('node-telegram-bot-api');
var startHandler = require('./start');
//add other handlers

//Create Express app to serve client
var app = express();
//Create WebServer
var httpSrv = http.createServer(app);

//Serve public folder statically
app.use(express.static('public'));

//Listen
httpSrv.listen(appEnv.port, '0.0.0.0', function() {
  console.log('server starting on ' + appEnv.url);
});

function exitHandler(options, err) {
  if (options.cleanup) {
    debug('Quitting and Cleaning up');
  }
  if (err) {
    debug(err.stack);
  }
  if (options.exit) {
    debug('Exit');
    process.exit();
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

// Setup polling way
var bot = new TelegramBot(BOT_TOKEN, {
  polling: true
});

// Matches /start
bot.onText(/\/start/, function(msg) {
  startHandler.handle(bot, msg);
});

// Matches /e [whatever]
bot.onText(/\/e (.+)/, function(msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});
