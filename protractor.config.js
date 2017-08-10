exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./sample/scenario.js'],
    onPrepare: function() {
        require('./index');
    }
};