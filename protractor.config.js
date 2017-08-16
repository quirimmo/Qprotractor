exports.config = {
    seleniumServerJar: './node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.5.0.jar',
    specs: [
        './test/base-protractor.spec.js',
        './test/element-finder.spec.js',
        './test/element-array-finder.spec.js'
    ],
    onPrepare: function() {
        require('./index');
    }
};