describe('ElementArrayFinder Tests', function() {

    beforeAll(function() {
        browser.get('/');
    });

    describe('getValueOfRadioSelectedItem', function() {

        it('should get the value of the selected item in a radio', function() {
            let genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getValueOfRadioSelectedItem()).toEqual('Male');
        });

    });

    describe('sort', function() {

        it('should sort the elements on alphabetically order of their texts, returning a promise which holds the sorted ElementArrayFinder', function() {
            let elementsToSort = element.all(by.className('elementsToSort'));
            let compareFunction = (a, b) => a[0].localeCompare(b[0]);
            elementsToSort.sort(compareFunction, 'getText', []).then(el => {
                expect(el.result.getText()).toEqual([
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

        it('should sort the elements on numeric order of their sort-order-attribute, returning a promise which holds the sorted ElementArrayFinder', function() {
            let elementsToSort = element.all(by.css(`[sort-order-attribute]`));
            let compareFunction = function(a, b) {
                return +(a[0]) - +(b[0]);
            };
            elementsToSort.sort(compareFunction, 'getAttribute', ['sort-order-attribute']).then(el => {
                expect(el.result.getText()).toEqual([
                    'I am a Female',
                    'Do you have dogs:',
                    'I am a Male',
                    'Marital Status:',
                    'Username:'
                ]);
            });
        });

    });

    describe('getLabelTextOfRadioSelectedItem', function() {
        
        it('should get the value of the label associated to the selected item in a radio', function() {
            let genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getLabelTextOfRadioSelectedItem()).toEqual('I am a Male');
        });

        it('should return an empty string if nothing is selected', function() {
            let genderRadios = element.all(by.model('radioChoice'));
            expect(genderRadios.getLabelTextOfRadioSelectedItem()).toEqual('');
        });

    });

    describe('getTableRowsFromCSSColumnsValues', function() {

        it('should return the rows values of a table associated to the provided css class names of the columns', function() {
            let tableRows = element.all(by.repeater('data in tableData'));
            expect(tableRows.getTableRowsFromCSSColumnsValues(['table-first-name', 'table-last-name', 'table-age', 'table-hero-name'])).toEqual([
                ['Tony', 'Stark', '40', 'Iron Man'],
                ['Peter', 'Parker', '25', 'Spiderman'],
                ['Bruce', 'Wayne', '35', 'Batman']
            ]);
        });

    });

});