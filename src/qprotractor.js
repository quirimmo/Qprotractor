'use strict';

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

protractor.getLabelTextByForAttribute = getLabelTextByForAttribute;

// ================================================================================


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

function getValueOfRadioSelectedItem() {
    return this.filter(filterElementByAttributeChecked)
        .then((els) => {
            // console.log(els.get(0));
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



// =====================================================================

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