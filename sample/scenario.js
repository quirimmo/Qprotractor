describe('angularjs homepage todo list', function() {

    beforeAll(function() {
        browser.get('http://localhost:3000/sample/app/index.html');
    });

    describe('ElementFinder.getInputValue', function() {

        it('should get the value of an input field', function() {
            var username = element(by.model('username'));
            expect(username.getInputValue()).toEqual('Username Value');
        });

    });

    describe('ElementFinder.setInputValue', function() {
        
        it('should set the value of an input field', function() {
            var username = element(by.model('username'));
            username.setInputValue('New Username Value');
            // we need to use the toContain because the setInputValue just sendKeys, so it doesn't clear the value which was already there
            expect(username.getInputValue()).toContain('New Username Value');
        });

    });

    describe('ElementFinder.clearAndSetInputValue', function() {
        
        it('should set the value of an input field after clearing the previous value in the input', function() {
            var username = element(by.model('username'));
            username.clearAndSetInputValue('New Username Value');
            // here we can use toEqual because the clearAndSetInputValue clears the value which was already there
            expect(username.getInputValue()).toEqual('New Username Value');
        });

    });

    

    describe('ElementFinder.getIdValue', function() {
        
        it('should get the id of a field', function() {
            var username = element(by.model('username'));
            expect(username.getIdValue()).toEqual('username');
        });

    });

    describe('ElementFinder.getSelectCheckedOption', function() {
        
        it('should get the text of the selected option', function() {
            var maritalStatus = element(by.id('marital-status'));
            expect(maritalStatus.getSelectCheckedOption()).toEqual('Single');
        });

    });
    
    describe('ElementFinder.getCheckedValue', function() {
        
        it('should get the checked value of a checkbox', function() {
            var dogsCheckbox = element(by.id('dogs-checkbox'));
            expect(dogsCheckbox.getCheckedValue()).toEqual('true');
        });

    });

});

// describe('angularjs homepage todo list', function() {
//     it('should add a todo', function() {
//         browser.get('https://angularjs.org');

//         element(by.model('todoList.todoText')).sendKeys('write first protractor test');
//         element(by.css('[value="add"]')).click();

//         var todoList = element.all(by.repeater('todo in todoList.todos'));
//         expect(todoList.count()).toEqual(3);
//         expect(todoList.get(2).getText()).toEqual('write first protractor test');

//         // You wrote your first test, cross it off the list
//         todoList.get(2).element(by.css('input')).click();
//         var completedAmount = element.all(by.css('.done-true'));
//         expect(completedAmount.count()).toEqual(2);
//     });
// });