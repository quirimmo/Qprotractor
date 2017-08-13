describe('ElementArrayFinder Tests', function() {

    beforeAll(function() {
        browser.get('http://localhost:3000/sample/app/index.html');
    });

    describe('getValueOfRadioSelectedItem', function() {

        it('should get the value of the selected item in a radio', function() {
            var genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getValueOfRadioSelectedItem()).toEqual('Male');
        });

    });

    describe('getLabelTextOfRadioSelectedItem', function() {

        it('should get the value of the label associated to the selected item in a radio', function() {
            var genderRadios = element.all(by.model('genderRadio'));
            expect(genderRadios.getLabelTextOfRadioSelectedItem()).toEqual('I am a Male');
        });

    });

    describe('sort', function() {

        it('should sort the elements depending on the given function', function() {
            var elementsToSort = element.all(by.className('elementsToSort'));
            elementsToSort.sort();
            // expect(genderRadios.getLabelTextOfRadioSelectedItem()).toEqual('I am a Male');
        });

    });

});