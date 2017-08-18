exports.config = {
    seleniumAddress: process.env.SELENIUM_SERVER_JAR || 'http://127.0.0.1:4444/wd/hub/',
    specs: [
        './test/base-protractor.spec.js',
        './test/element-finder.spec.js',
        './test/element-array-finder.spec.js'
    ],
    onPrepare: function() {
        require('./index');
    }
};
