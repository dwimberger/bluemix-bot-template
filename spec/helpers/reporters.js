var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
  savePath: './out/test',
  consolidateAll: true
});
var consoleReporter = new reporters.TerminalReporter();
jasmine.getEnv().addReporter(consoleReporter);
jasmine.getEnv().addReporter(junitReporter);
