describe('Base Protractor Tests', function() {

    beforeAll(function() {
        browser.get('http://localhost:3000/sample/app/index.html');
    });

    describe('getLabelTextByForAttribute', function() {

        it('should select the label text through the for value', function() {
            expect(protractor.getLabelTextByForAttribute('disabled-field')).toEqual('Disabled Field:');
        });

    });

    describe('setRadioButtonValueByLabelFor', function() {

        it('should select a radio button by the value of the label for associated to it', function() {
            expect(element(by.id('live-in-my-country')).getCheckedValue()).toBeNull();
            protractor.setRadioButtonValueByLabelFor('live-in-my-country').then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true')
            );
        });

    });

    describe('setRadioButtonValueByLabelText', function() {

        it('should select a radio button by the text value of its label', function() {
            let container = element(by.id('where-you-live-container'));
            protractor.setRadioButtonValueByLabelText('I live in my country:', container).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true')
            );
        });

    });

});