// An example configuration file.
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html',
  reportOnlyFailedSpecs: false,
  captureOnlyFailedSpecs: true
});

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/calculator.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
    // Code to attach screenshot to allure reports
    // var AllureReporter = require('jasmine-allure-reporter');
    // jasmine.getEnv().addReporter(new AllureReporter({
    //   resultsDir: 'allure-results'
    // }));
    // jasmine.getEnv().afterEach(function(done){
    //   browser.takeScreenshot().then(function (png) {
    //     allure.createAttachment('Screenshot', function () {
    //       return new Buffer(png, 'base64')
    //     }, 'image/png')();
    //     done();
    //   })
    // });

    // Refactored allure attachment screenshot code on failure
    var originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
    jasmine.Spec.prototype.addExpectationResult = function () {
      if (!arguments[0]) {
        browser.takeScreenshot().then(function (png) {
          allure.createAttachment('Screenshot', function () {
            return new Buffer(png, 'base64')
          }, 'image/png')();
        })
      }
      return originalAddExpectationResult.apply(this, arguments);
    };
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results',
    }));
  },

  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }

};
