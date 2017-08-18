exports.config = {
    specs: [
        './test/base-protractor.spec.js',
        './test/element-finder.spec.js',
        './test/element-array-finder.spec.js'
    ],
    onPrepare: function() {
        require('./index');
    }
};
