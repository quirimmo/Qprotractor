'use strict';

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
protractor.ElementFinder.prototype.clickOnParent = clickOnParent;


protractor.ElementArrayFinder.prototype.getValueOfRadioSelectedItem = getValueOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.getLabelTextOfRadioSelectedItem = getLabelTextOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.sort = sort;


protractor.getLabelTextByForAttribute = getLabelTextByForAttribute;
protractor.getElementArrayFinderFromArrayOfElementFinder = getElementArrayFinderFromArrayOfElementFinder;
protractor.setRadioButtonValueByLabelFor = setRadioButtonValueByLabelFor;
protractor.setRadioButtonValueByLabelText = setRadioButtonValueByLabelText;


// ===========================================================================================

function clickOnParent() {
    return this.parentElementArrayFinder.click();
}

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
    let EC = protractor.ExpectedConditions;
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


function sort(newSortedElementArrayFinder, compareFunction, functionName, inputParams) {
    return sortWithElementArrayFinder.call(this, newSortedElementArrayFinder, compareFunction, functionName, inputParams);
}



// ===========================================================================================

function getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder) {
    let getWebElements = function() {
        let webElements = arrayOfElementFinder.map(function(ef) {
            return ef.getWebElement();
        });
        return protractor.promise.fulfilled(webElements);
    };
    return new protractor.ElementArrayFinder(this.browser_, getWebElements, this.locator_, this.actionResults_);
}

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


function setRadioButtonValueByLabelFor(labelFor) {
    return element(by.css(`label[for="${labelFor}"]`)).click();
}


function setRadioButtonValueByLabelText(labelText, elementContainer) {
    var el = elementContainer || element;
    return el.all(by.tagName('label'))
        .filter(filterElementByText.bind(null, labelText))
        .then(clickFirstElement)
        .catch(onCatchGenericError);
}

// ===========================================================================================

function filterElementByText(textToFind, element) {
    return element.getText()
            .then(checkText)
            .catch(onCatchGenericError);
 
    function checkText(text) {
        return text.toUpperCase() === textToFind.toUpperCase();
    }
}

function clickFirstElement(elements) {
    if (!elements.length) {
        throw new Error('There are no elements in the given elements collection');
    } 
    return elements[0].click();
}

function sortWithElementArrayFinder(newSortedElementArrayFinder, compareFunction, functionName, inputParams) {
    let deferred = protractor.promise.defer();
    this.then(async(elements => {
        newSortedElementArrayFinder.data = baseImplementOfSort(elements, compareFunction, functionName, inputParams);
        deferred.fulfill();
    }));
    return deferred;
}


function baseImplementOfSort(elements, compareFunction, functionName, inputParams) {
    const comparableArray = await (protractor.promise.all(elements.map(async(x => [await (x[functionName].apply(x, inputParams)), x]))));
    comparableArray.sort(compareFunction);
    const sortedArray = comparableArray.map(x => x[1]);
    return protractor.getElementArrayFinderFromArrayOfElementFinder(sortedArray);
}