describe('ElementArrayFinder Tests', function() {

    beforeAll(function() {
        browser.get('http://localhost:3000/sample/app/index.html');
    });

    describe('getValueOfRadioSelectedItem', function() {

        it('should get the value of the selected item in a radio', function() {
            let genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getValueOfRadioSelectedItem()).toEqual('Male');
        });

    });

    describe('getLabelTextOfRadioSelectedItem', function() {

        it('should get the value of the label associated to the selected item in a radio', function() {
            let genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getLabelTextOfRadioSelectedItem()).toEqual('I am a Male');
        });

    });

    describe('sort', function() {

        it('should sort the elements on alphabetically order of their texts, assigning the returning ElementArrayFinder to the input parameter object at the data property', function() {
            let elementsToSort = element.all(by.className('elementsToSort'));
            let compareFunction = (a, b) => a[0].localeCompare(b[0]);
            let newSortedElements = {};
            elementsToSort.sort(newSortedElements, compareFunction, 'getText', []).then(el => {
                expect(newSortedElements.data.getText()).toEqual([
                    'Disabled Field:',
                    'Do you have dogs:',
                    'Enabled Field:',
                    'Hidden Field:',
                    'I am a Female',
                    'I am a Male',
                    'Marital Status:',
                    'Username:'
                ]);
            });
        });

        it('should sort the elements on numeric order of their sort-order-attribute, assigning the returning ElementArrayFinder to the input parameter object at the data property', function() {
            let elementsToSort = element.all(by.css(`[sort-order-attribute]`));
            let compareFunction = function(a, b) {
                return +(a[0]) - +(b[0]);
            };
            let newSortedElements = {};
            elementsToSort.sort(newSortedElements, compareFunction, 'getAttribute', ['sort-order-attribute']).then(el => {
                expect(newSortedElements.data.getText()).toEqual([
                    'I am a Female',
                    'Do you have dogs:',
                    'I am a Male',
                    'Marital Status:',
                    'Username:'
                ]);
            });
        });

    });

});