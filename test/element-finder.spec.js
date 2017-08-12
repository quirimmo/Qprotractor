describe('ElementFinder Tests', function() {
    
        beforeAll(function() {
            browser.get('http://localhost:3000/sample/app/index.html');
        });
    
        describe('getInputValue', function() {
    
            it('should get the value of an input field', function() {
                var username = element(by.model('username'));
                expect(username.getInputValue()).toEqual('Username Value');
            });
    
        });
    
        describe('setInputValue', function() {
            
            it('should set the value of an input field', function() {
                var username = element(by.model('username'));
                username.setInputValue('New Username Value');
                // we need to use the toContain because the setInputValue just sendKeys, so it doesn't clear the value which was already there
                expect(username.getInputValue()).toContain('New Username Value');
            });
    
        });
    
        describe('clearAndSetInputValue', function() {
            
            it('should set the value of an input field after clearing the previous value in the input', function() {
                var username = element(by.model('username'));
                username.clearAndSetInputValue('New Username Value');
                // here we can use toEqual because the clearAndSetInputValue clears the value which was already there
                expect(username.getInputValue()).toEqual('New Username Value');
            });
    
        });
    
        describe('getIdValue', function() {
            
            it('should get the id of a field', function() {
                var username = element(by.model('username'));
                expect(username.getIdValue()).toEqual('username');
            });
    
        });
    
        describe('getSelectCheckedOption', function() {
            
            it('should get the text of the selected option', function() {
                var maritalStatus = element(by.id('marital-status'));
                expect(maritalStatus.getSelectCheckedOption()).toEqual('Single');
            });
    
        });
        
        describe('getCheckedValue', function() {
            
            it('should get the checked value of a checkbox', function() {
                var dogsCheckbox = element(by.id('dogs-checkbox'));
                expect(dogsCheckbox.getCheckedValue()).toEqual('true');
            });
    
            it('should get the checked value of a radio', function() {
                var genderRadio = element(by.id('gender-male'));
                expect(genderRadio.getCheckedValue()).toEqual('true');
            });
    
        });
    
        describe('setValueIfEnabledOrProceed', function() {
    
            it('should not set the value if the element is disabled, and just go through without errors', function() {
                var disabledField = element(by.id('disabled-field'));
                disabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(disabledField.getInputValue()).toEqual('I am a disabled field');
                });   
            });
    
            it('should change the value if the element is enabled', function() {
                var enabledField = element(by.id('enabled-field'));
                enabledField.setValueIfEnabledOrProceed('New Value')
                .then((value) => {
                    expect(enabledField.getInputValue()).toEqual('New Value');
                });   
            });
            
        });
    
        describe('isEnabledIfDisplayedOrProceed', function() {
            
            it('should check if the element is enabled if the element is displayed', function() {
                var disabledField = element(by.id('disabled-field'));
                var enabledField = element(by.id('enabled-field'));
                expect(disabledField.isEnabledIfDisplayedOrProceed()).toEqual(false);
                expect(enabledField.isEnabledIfDisplayedOrProceed()).toEqual(true);
            });
    
            it('should not check if the element is enabled if the element is not displayed', function() {
                var hiddenField = element(by.id('hidden-field'));
                expect(hiddenField.isEnabledIfDisplayedOrProceed()).toEqual(true);
            });
            
        });
    
        describe('waitAndThenExecute', function() {
    
            it('should execute the function after waiting for the visibility of an element for a maximum time', function() {
                var disabledField = element(by.id('disabled-field'));
                disabledField.waitAndThenExecute(5000, fnToExecute);
    
                function fnToExecute() {
                    expect(disabledField.isEnabled()).toEqual(false);
                }
            });
    
            it('should throw an error if the element will not be visible after the maximum waiting time', function() {
                var hiddenField = element(by.id('hidden-field'));
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
    
    });