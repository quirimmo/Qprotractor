exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        './test/element-finder.spec.js'
    ],
    onPrepare: function() {
        require('./index');
    }
};