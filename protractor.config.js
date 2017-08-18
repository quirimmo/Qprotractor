const SELENIUM_FOLDER = './node_modules/protractor/node_modules/webdriver-manager/selenium';
const fs = require('fs');
let res, seleniumVersion;
fs.readdirSync(SELENIUM_FOLDER).forEach(file => {
    res = file.match(/selenium-server-standalone-(\d{1}.\d{1}.\d{1}).jar/i);
    if (res) {
        seleniumVersion = res[1];
    }
})
if (!seleniumVersion) {
    throw new Error('No selenium server jar found inside your protractor node_modules subfolder');
}

exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:9000',
    seleniumServerJar: `./node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-${seleniumVersion}.jar`,
    specs: [
        './test/base-protractor.spec.js',
        './test/element-finder.spec.js',
        './test/element-array-finder.spec.js'
    ],
    onPrepare: function() {
        require('./index');
    }
};