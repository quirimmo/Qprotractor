'use strict';

const mergeSort = require("js-sorting").mergeSort;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

protractor.ElementFinder.prototype.getInputValue = getInputValue;
protractor.ElementFinder.prototype.setInputValue = setInputValue;
protractor.ElementFinder.prototype.clearAndSetInputValue = clearAndSetInputValue;
protractor.ElementFinder.prototype.getIdValue = getIdValue;
protractor.ElementFinder.prototype.getSelectCheckedOption = getSelectCheckedOption;
protractor.ElementFinder.prototype.getCheckedValue = getCheckedValue;
protractor.ElementFinder.prototype.setValueIfEnabledOrProceed = setValueIfEnabledOrProceed;
protractor.ElementFinder.prototype.isEnabledIfDisplayedOrProceed = isEnabledIfDisplayedOrProceed;
protractor.ElementFinder.prototype.waitAndThenExecute = waitAndThenExecute;


protractor.ElementArrayFinder.prototype.getValueOfRadioSelectedItem = getValueOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.getLabelTextOfRadioSelectedItem = getLabelTextOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.sort = sort;


protractor.getLabelTextByForAttribute = getLabelTextByForAttribute;

// ===========================================================================================


function getInputValue() {
    return this.getAttribute('value');
}

function getIdValue() {
    return this.getAttribute('id');
}

function getSelectCheckedOption() {
    return this.$('option:checked').getText();
}

function getCheckedValue() {
    return this.getAttribute('checked');
}

function setInputValue(value) {
    return this.sendKeys(value);
}

function clearAndSetInputValue(value) {
    return this.clear()
        .then(onClearGenericInput.bind(this, value))
        .catch(protractor.onCatchGenericError);

    function onClearGenericInput(valueToSet) {
        return this.sendKeys(valueToSet);
    }
}


function getLabelTextByForAttribute(forValue) {
    return element(by.css(`label[for="${forValue}"]`)).getText();
}

function setValueIfEnabledOrProceed(value) {
    return this.isEnabled()
        .then(onIsFieldEnabled.bind(this, value))
        .catch(protractor.onCatchGenericError);

    function onIsFieldEnabled(valueToSet, isEnabled) {
        return isEnabled ?
            this.clearAndSetInputValue(valueToSet) :
            protractor.promise.defer().fulfill();
    }
}


function isEnabledIfDisplayedOrProceed(isEnabledIfNotDisplayed) {
    isEnabledIfNotDisplayed = isEnabledIfNotDisplayed || true;
    return this.isDisplayed()
        .then(onIsFieldDisplayed.bind(this))
        .catch(protractor.onCatchGenericError);

    function onIsFieldDisplayed(isDisplayed) {
        return isDisplayed ?
            this.isEnabled() :
            protractor.promise.fulfilled(isEnabledIfNotDisplayed);
    }
}

function waitAndThenExecute(maxWaitTime, fnToExecute) {
    var EC = protractor.ExpectedConditions;
    return browser.wait(EC.visibilityOf(this), maxWaitTime)
        .then(fnToExecute.bind(this))
        .catch(onCatchGenericError);
}


// ===========================================================================================

function getValueOfRadioSelectedItem() {
    return this.filter(filterElementByAttributeChecked)
        .then((els) => {
            return els[0].getInputValue();
        })
        .catch(onCatchGenericError);
}

function getLabelTextOfRadioSelectedItem() {
    return this.filter(filterElementByAttributeChecked)
        .then((els) => {
            return els[0].getIdValue()
                .then(protractor.getLabelTextByForAttribute)
                .catch(onCatchGenericError);
        })
        .catch(onCatchGenericError);
}

function sort() {
    
    
    
    var reverseCompare = async(function (a, b) {
        let listPromises = [a.getText(), b.getText()];
        await(protractor.promise.all(listPromises).then((values) => {
            return values[0] - values[1];
        }));
    });

    var sortTheArray = async(function (arrayOfElementFinders) {
        let res = await(mergeSort(arrayOfElementFinders, reverseCompare)); 
        return res;
    });

    // this.then((elements) => {
    //     // var arrayOfElementFinders = [elements[0], elements[1], elements[2], elements[3], elements[4], elements[5], elements[6], elements[7]]; 
    //     // // var arrayOfElementFinders = [elements[0], elements[1], elements[2]]; 
    //     // // let arrayOfElementFinders = [];
    //     // // for (let i = 0; i < elements.length; i++) {
    //     // //     arrayOfElementFinders.push(elements[i]);
    //     // // }
    //     // let sortedArray = sortTheArray(arrayOfElementFinders);
    //     // // sortedArray.forEach((el) => {
    //     // //     el.getText().then((text) => {
    //     // //         console.log(text);
    //     // //     });
    //     // // });

    //     // var mock = function (array) {   
    //     //     var webElements = sortedArray.map(function (ef) {
    //     //         return ef.getWebElement();
    //     //     });
    //     //     return protractor.promise.fulfilled(webElements);
    //     // }
    //     // let list = new protractor.ElementArrayFinder(this.browser_, mock, this.locator_, this.actionResults_);
    //     // list.getText().then((texts) => {
    //     //     console.log(texts);
    //     // });

    // });

    let f = async(function(elements){
        var arrayOfElementFinders = [elements[0], elements[1], elements[2], elements[3], elements[4], elements[5], elements[6], elements[7]]; 
        // var arrayOfElementFinders = [elements[0], elements[1], elements[2]]; 
        // let arrayOfElementFinders = [];
        // for (let i = 0; i < elements.length; i++) {
        //     arrayOfElementFinders.push(elements[i]);
        // }
        let sortedArray = await(sortTheArray(arrayOfElementFinders));
        // sortedArray.forEach((el) => {
        //     el.getText().then((text) => {
        //         console.log(text);
        //     });
        // });

        var mock = function (array) {   
            var webElements = sortedArray.map(function (ef) {
                return ef.getWebElement();
            });
            return protractor.promise.fulfilled(webElements);
        }
        let list = new protractor.ElementArrayFinder(this.browser_, mock, this.locator_, this.actionResults_);
        list.getText().then((texts) => {
            console.log(texts);
        });
    });

    this.then(f);

    // this.then((elements) => {
    //     var arrayOfElementFinders = [elements[0]]; 

    //     var mock = function (array) {   
    //         var webElements = arrayOfElementFinders.map(function (ef) {
    //             return ef.getWebElement();
    //         });
    //         return protractor.promise.fulfilled(webElements);
    //     }
    //     let list = new protractor.ElementArrayFinder(this.browser_, mock, this.locator_, this.actionResults_);
    //     // let list = new protractor.ElementArrayFinder(protractor, mock);
    //     list.getText().then((texts) => {
    //         console.log(texts);
    //     });
    // });

}

// ===========================================================================================

function filterElementByAttributeChecked(el) {
    return el.getCheckedValue()
        .then(checkCheckedValue)
        .catch(onCatchGenericError);

    function checkCheckedValue(value) {
        return value === 'true';
    }
}

function onCatchGenericError(err) {
    throw new Error(err);
}