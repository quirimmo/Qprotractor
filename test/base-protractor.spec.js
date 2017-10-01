describe('Base Protractor Tests', function() {

    beforeEach(function() {
        browser.get('/');
    });

    describe('getLabelTextByForAttribute', function() {

        it('should select the label text through the for value', function() {
            expect(protractor.getLabelTextByForAttribute('disabled-field')).toEqual('Disabled Field:');
        });

    });

    describe('setRadioButtonValueByLabelFor', function() {

        it('should select a radio button by the value of the label for associated to it', function() {
            expect(element(by.id('live-in-my-country')).getCheckedValue()).toBeNull();
            protractor.setRadioButtonValueByLabelFor('live-in-my-country').then(function() {
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true');
            });
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

    describe('setSelectValueByOptionText', function() {

        it('should select an option in a select element through the option text', function() {
            let select = element(by.id('marital-status'));
            expect(select.getSelectCheckedOption()).toEqual('Single');
            protractor.setSelectValueByOptionText('Engaged', select).then(
                expect(select.getSelectCheckedOption()).toEqual('Engaged')
            );
        });

    });

    describe('ifPresentAndEnabledDoAction', function() {

        it('should execute the action if the element is present and displayed', function() {
            let container = element(by.id('where-you-live-container'));
            protractor.ifPresentAndEnabledDoAction(container, protractor.setRadioButtonValueByLabelText.bind(null, 'I live in my country:', container)).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true')
            );
        });

        it('should not execute the action if the element is not present', function() {
            let container = element(by.id('aaa'));
            protractor.ifPresentAndEnabledDoAction(container, protractor.setRadioButtonValueByLabelText.bind(null, 'I live in my country:', container)).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual(null)
            );
        });

    });

});