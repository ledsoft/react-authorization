'use strict';

/**
 * Jasmine configuration.
 */

jasmine.VERBOSE = true;

var reporters = require('jasmine-reporters');
var reporter = new reporters.JUnitXmlReporter({
    savePath: "test/reports/",
    consolidateAll: false
});
jasmine.getEnv().addReporter(reporter);
