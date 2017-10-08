describe('ElementFinder Tests', () => {

    beforeEach(() => {
        browser.get('/');
    });

    describe('getInputValue', () => {

        it('should get the value of an input field', () => {
            let username = element(by.model('username'));
            expect(username.getInputValue()).toEqual('Username Value');
        });

    });

    describe('setInputValue', () => {

        it('should set the value of an input field', () => {
            let username = element(by.model('username'));
            username.setInputValue('New Username Value');
            // we need to use the toContain because the setInputValue just sendKeys, so it doesn't clear the value which was already there
            expect(username.getInputValue()).toContain('New Username Value');
        });

    });

    describe('clearAndSetInputValue', () => {

        it('should set the value of an input field after clearing the previous value in the input', () => {
            let username = element(by.model('username'));
            username.clearAndSetInputValue('New Username Value');
            // here we can use toEqual because the clearAndSetInputValue clears the value which was already there
            expect(username.getInputValue()).toEqual('New Username Value');
        });

    });

    describe('getIdValue', () => {

        it('should get the id of a field', () => {
            let username = element(by.model('username'));
            expect(username.getIdValue()).toEqual('username');
        });

    });

    describe('getSelectCheckedOption', () => {

        it('should get the text of the selected option', () => {
            let maritalStatus = element(by.id('marital-status'));
            expect(maritalStatus.getSelectCheckedOption()).toEqual('Single');
        });

    });

    describe('getCheckedValue', () => {

        it('should get the checked value of a checkbox', () => {
            let dogsCheckbox = element(by.id('dogs-checkbox'));
            expect(dogsCheckbox.getCheckedValue()).toEqual('true');
        });

        it('should get the checked value of a radio', () => {
            let genderRadio = element(by.id('gender-male'));
            expect(genderRadio.getCheckedValue()).toEqual('true');
        });

    });

    describe('setValueIfEnabledOrProceed', () => {

        it('should not set the value if the element is disabled, and just go through without errors', () => {
            let disabledField = element(by.id('disabled-field'));
            disabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(disabledField.getInputValue()).toEqual('I am a disabled field');
                });
        });

        it('should change the value if the element is enabled', () => {
            let enabledField = element(by.id('enabled-field'));
            enabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(enabledField.getInputValue()).toEqual('New Value');
                });
        });

    });

    describe('isEnabledIfDisplayedOrProceed', () => {

        it('should check if the element is enabled if the element is displayed', () => {
            let disabledField = element(by.id('disabled-field'));
            let enabledField = element(by.id('enabled-field'));
            expect(disabledField.isEnabledIfDisplayedOrProceed()).toEqual(false);
            expect(enabledField.isEnabledIfDisplayedOrProceed()).toEqual(true);
        });

        it('should not check if the element is enabled if the element is not displayed', () => {
            let hiddenField = element(by.id('hidden-field'));
            expect(hiddenField.isEnabledIfDisplayedOrProceed()).toEqual(true);
        });

    });

    describe('waitAndThenExecute', function() {

        it('should execute the function after waiting for the visibility of an element for a maximum time', () => {
            let disabledField = element(by.id('disabled-field'));
            disabledField.waitAndThenExecute(5000, fnToExecute);

            function fnToExecute() {
                expect(disabledField.isEnabled()).toEqual(false);
            }
        });

        it('should throw an error if the element will not be visible after the maximum waiting time', () => {
            let hiddenField = element(by.id('hidden-field'));
            hiddenField.waitAndThenExecute(5000, fnToExecute)
                .then()
                .catch((err) => {
                    expect(err.toString()).toContain('Wait timed out after');
                });

            function fnToExecute() {
                expect(disabledField.isEnabled()).toThrow();
            }
        });

    });

    describe('clickOnParent', () => {

        it('should select a radio button by clicking on it`s container', () => {
            expect(element(by.id('tick-by-container')).getCheckedValue()).toBeNull();
            element(by.id('tick-by-container')).clickOnParent().then(
                expect(element(by.id('tick-by-container')).getCheckedValue()).toEqual('true')
            );
        });

    });

    describe('isDisplayedIfPresent', () => {

        it('should return false if the element is not present', () => {
            let notPresentElement = element(by.id('not-present-element'));
            expect(notPresentElement.isDisplayedIfPresent()).toEqual(false);
        });

        it('should return false if the element is present but not displayed', () => {
            let presentHiddenElement = element(by.id('present-hidden-element'));
            expect(presentHiddenElement.isDisplayedIfPresent()).toEqual(false);
        });

        it('should return true if the element is present and displayed', () => {
            let username = element(by.id('username'));
            expect(username.isDisplayedIfPresent()).toEqual(true);
        });

    });

});