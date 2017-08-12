describe('Base Protractor Tests', function() {

    beforeAll(function() {
        browser.get('http://localhost:3000/sample/app/index.html');
    });

    describe('getLabelTextByForAttribute', function() {

        it('should select the label text through the for value', function() {
            expect(protractor.getLabelTextByForAttribute('disabled-field')).toEqual('Disabled Field:');
        });

    });

});