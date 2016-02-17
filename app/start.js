var debug = require('debug')('start');

exports.handle = function(bot, msg) {
    debug('%j', msg);

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    //notify user
    bot.sendMessage(msg.from.id, 'Hello ' + msg.from.first_name); // jshint ignore:line
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

};
