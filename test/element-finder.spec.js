describe('ElementFinder Tests', function() {

    beforeAll(function() {
        // browser.get('http://localhost:9000/');
        browser.get('/');
    });

    describe('getInputValue', function() {

        it('should get the value of an input field', function() {
            let username = element(by.model('username'));
            expect(username.getInputValue()).toEqual('Username Value');
        });

    });

    describe('setInputValue', function() {

        it('should set the value of an input field', function() {
            let username = element(by.model('username'));
            username.setInputValue('New Username Value');
            // we need to use the toContain because the setInputValue just sendKeys, so it doesn't clear the value which was already there
            expect(username.getInputValue()).toContain('New Username Value');
        });

    });

    describe('clearAndSetInputValue', function() {

        it('should set the value of an input field after clearing the previous value in the input', function() {
            let username = element(by.model('username'));
            username.clearAndSetInputValue('New Username Value');
            // here we can use toEqual because the clearAndSetInputValue clears the value which was already there
            expect(username.getInputValue()).toEqual('New Username Value');
        });

    });

    describe('getIdValue', function() {

        it('should get the id of a field', function() {
            let username = element(by.model('username'));
            expect(username.getIdValue()).toEqual('username');
        });

    });

    describe('getSelectCheckedOption', function() {

        it('should get the text of the selected option', function() {
            let maritalStatus = element(by.id('marital-status'));
            expect(maritalStatus.getSelectCheckedOption()).toEqual('Single');
        });

    });

    describe('getCheckedValue', function() {

        it('should get the checked value of a checkbox', function() {
            let dogsCheckbox = element(by.id('dogs-checkbox'));
            expect(dogsCheckbox.getCheckedValue()).toEqual('true');
        });

        it('should get the checked value of a radio', function() {
            let genderRadio = element(by.id('gender-male'));
            expect(genderRadio.getCheckedValue()).toEqual('true');
        });

    });

    describe('setValueIfEnabledOrProceed', function() {

        it('should not set the value if the element is disabled, and just go through without errors', function() {
            let disabledField = element(by.id('disabled-field'));
            disabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(disabledField.getInputValue()).toEqual('I am a disabled field');
                });
        });

        it('should change the value if the element is enabled', function() {
            let enabledField = element(by.id('enabled-field'));
            enabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(enabledField.getInputValue()).toEqual('New Value');
                });
        });

    });

    describe('isEnabledIfDisplayedOrProceed', function() {

        it('should check if the element is enabled if the element is displayed', function() {
            let disabledField = element(by.id('disabled-field'));
            let enabledField = element(by.id('enabled-field'));
            expect(disabledField.isEnabledIfDisplayedOrProceed()).toEqual(false);
            expect(enabledField.isEnabledIfDisplayedOrProceed()).toEqual(true);
        });

        it('should not check if the element is enabled if the element is not displayed', function() {
            let hiddenField = element(by.id('hidden-field'));
            expect(hiddenField.isEnabledIfDisplayedOrProceed()).toEqual(true);
        });

    });

    describe('waitAndThenExecute', function() {

        it('should execute the function after waiting for the visibility of an element for a maximum time', function() {
            let disabledField = element(by.id('disabled-field'));
            disabledField.waitAndThenExecute(5000, fnToExecute);

            function fnToExecute() {
                expect(disabledField.isEnabled()).toEqual(false);
            }
        });

        it('should throw an error if the element will not be visible after the maximum waiting time', function() {
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

    describe('clickOnParent', function() {

        it('should select a radio button by clicking on it`s container', function() {
            expect(element(by.id('tick-by-container')).getCheckedValue()).toBeNull();
            element(by.id('tick-by-container')).clickOnParent().then(
                expect(element(by.id('tick-by-container')).getCheckedValue()).toEqual('true')
            );
        });

    });

});