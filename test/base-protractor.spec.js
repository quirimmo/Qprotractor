describe('Base Protractor Tests', function() {

    beforeEach(() => {
        browser.get('/');
    });

    describe('getLabelTextByForAttribute', () => {
        it('should select the label text through the for value', () => {
            expect(protractor.getLabelTextByForAttribute('disabled-field')).toEqual('Disabled Field:');
        });
    });

    describe('setRadioButtonValueByLabelFor', () => {
        it('should select a radio button by the value of the label for associated to it', () => {
            expect(element(by.id('live-in-my-country')).getCheckedValue()).toBeNull();
            protractor.setRadioButtonValueByLabelFor('live-in-my-country').then(() => {
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true');
            });
        });
    });

    describe('setRadioButtonValueByLabelText', () => {
        it('should select a radio button by the text value of its label', () => {
            let container = element(by.id('where-you-live-container'));
            protractor.setRadioButtonValueByLabelText('I live in my country:', container).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true')
            );
        });
    });

    describe('setSelectValueByOptionText', () => {
        it('should select an option in a select element through the option text', () => {
            let select = element(by.id('marital-status'));
            expect(select.getSelectCheckedOption()).toEqual('Single');
            protractor.setSelectValueByOptionText('Engaged', select).then(
                expect(select.getSelectCheckedOption()).toEqual('Engaged')
            );
        });
    });

    describe('ifPresentAndEnabledDoAction', () => {
        it('should execute the action if the element is present and displayed', () => {
            let container = element(by.id('where-you-live-container'));
            protractor.ifPresentAndEnabledDoAction(container, protractor.setRadioButtonValueByLabelText.bind(null, 'I live in my country:', container)).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual('true')
            );
        });

        it('should not execute the action if the element is not present', () => {
            let container = element(by.id('aaa'));
            protractor.ifPresentAndEnabledDoAction(container, protractor.setRadioButtonValueByLabelText.bind(null, 'I live in my country:', container)).then(
                expect(element(by.id('live-in-my-country')).getCheckedValue()).toEqual(null)
            );
        });
    });

    describe('checkErrorValidation', () => {
        const field = 'fromQprotractor.validationErrorField.$error';
        const maxLengthErrorType = 'maxlength';
        const maxLengthErrorMessage = 'Use maximum 9 digits';
        const patternErrorType = 'pattern';
        const patternErrorMessage = 'Use digits only';
        const fieldElement = element(by.id('validation-error-field'));

        function setInputValueForError(value, expectationFn) {
            return fieldElement.clearAndSetInputValue(value).then(expectationFn);
        }

        it('should check that the ng-maxlength error is correctly displayed', () => {
            let expectedResults = [true];
            setInputValueForError('12345678910', expectationFn);

            function expectationFn() {
                return protractor.checkErrorValidation(field, maxLengthErrorType).then(
                    (data) => expect(data).toEqual(expectedResults)
                );
            }
        });

        it('should check that the ng-maxlength error is correctly displayed', () => {
            let expectedResults = [true, maxLengthErrorMessage];
            setInputValueForError('12345678910', expectationFn);

            function expectationFn() {
                return protractor.checkErrorValidation(field, maxLengthErrorType, maxLengthErrorMessage).then(
                    (data) => expect(data).toEqual(expectedResults)
                );
            }
        });

        it('should check that the ng-maxlength error is not displayed', () => {
            let expectedResults = [false];
            setInputValueForError('12345', expectationFn);
            function expectationFn() {
                return protractor.checkErrorValidation(field, maxLengthErrorType).then(
                    (data) => expect(data).toEqual(expectedResults)
                );
            }
        });
    });

});