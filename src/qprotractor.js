'use strict';

// requiring async/await for node versions <= 6
const asyncPlugin = require('asyncawait/async');
const awaitPlugin = require('asyncawait/await');

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
protractor.ElementFinder.prototype.isDisplayedIfPresent = isDisplayedIfPresent;
protractor.ElementFinder.prototype.isEnabledAndPresent = isEnabledAndPresent;
protractor.ElementFinder.prototype.isTagSelect = isTagSelect;
protractor.ElementFinder.prototype.isTagInputType = isTagInputType;
protractor.ElementFinder.prototype.isRadioInput = isRadioInput;
protractor.ElementFinder.prototype.isCheckboxInput = isCheckboxInput;

protractor.ElementArrayFinder.prototype.getValueOfRadioSelectedItem = getValueOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.getLabelTextOfRadioSelectedItem = getLabelTextOfRadioSelectedItem;
protractor.ElementArrayFinder.prototype.sort = sort;
protractor.ElementArrayFinder.prototype.getTableRowsFromCSSColumnsValues = getTableRowsFromCSSColumnsValues;

protractor.getFirstPresentElement = getFirstPresentElement;
protractor.checkErrorValidation = checkErrorValidation;
protractor.ifPresentAndEnabledDoAction = ifPresentAndEnabledDoAction;
protractor.getLabelTextByForAttribute = getLabelTextByForAttribute;
protractor.getElementArrayFinderFromArrayOfElementFinder = getElementArrayFinderFromArrayOfElementFinder;
protractor.setRadioButtonValueByLabelFor = setRadioButtonValueByLabelFor;
protractor.setRadioButtonValueByLabelText = setRadioButtonValueByLabelText;
protractor.setSelectValueByOptionText = setSelectValueByOptionText;
protractor.onCatchGenericError = onCatchGenericError;



// ElementFinder methods
// ===========================================================================================


/**
 * Click on the parent of the current ElementFinder through it's property parentElementArrayFinder included in it
 * @returns {protractor.promise} A promise which will be resolved after the click on the element happens
 */
function clickOnParent() {
    return this.parentElementArrayFinder.click();
}

/**
 * Get the value of the current ElementFinder .
 * For simple input types (like text, number, etc...) it will return directly the value
 * For complex types (like select, radio, etc...) it will return a composite value. See the explicit methods for these elements
 * @returns {protractor.promise} A promise which holds the value of the input
 */
function getInputValue() {
    return this.getAttribute('value');
}

/**
 * Get the id of the current ElementFinder
 * @returns {protractor.promise} A promise which holds the id of the input
 */
function getIdValue() {
    return this.getAttribute('id');
}

/**
 * Get the text of the checked option of an ElementFinder corresponding to a select
 * @returns {protractor.promise} A promise which holds the text of the checked option
 */
function getSelectCheckedOption() {
    return this.$('option:checked').getText();
}

/**
 * Get the value of the checked attribute of ElementFinder like an option, a radio input or a checkbox input
 * @returns {protractor.promise} A promise which holds the value of the attribute checked
 */
function getCheckedValue() {
    return this.getAttribute('checked');
}

/**
 * Set the provided value to an input ElementFinder. It doesn't clear the previous value so this will be appended at the end of the previous one
 * @param {string} value The value to set in the input ElementFinder 
 * @returns {protractor.promise} A promise resolved when the value will be set in the input ElementFinder
 */
function setInputValue(value) {
    return this.sendKeys(value);
}

/**
 * Clear the actual value of an input ElementFinder and then it sets the provided value to it
 * @param {string} value The value to set in the input ElementFinder 
 * @returns {protractor.promise} A promise resolved when the input ElementFinder will be clear and the value will be set in it
 */
function clearAndSetInputValue(value) {
    return this.clear()
        .then(onClearGenericInput.bind(this, value))
        .catch(protractor.onCatchGenericError);

    function onClearGenericInput(valueToSet) {
        return this.sendKeys(valueToSet);
    }
}

/**
 * Set a new value on an input ElementFinder if it is enabled, otherwise proceed without setting the value
 * @param {value} value The new value to set in the ElementFinder if it is enabled  
 * @param {Boolean} [clearAndSet] Specify if use the clear and set or just the set. True by default. Pass false in order to avoid to clear the field before.  
 * @returns {protractor.promise} A promise resolved when the input ElementFinder will be clear and the new value will be set in, if it is enabled. Otherwise it will be fulfilled if the ElementFinder is not enabled.
 */
function setValueIfEnabledOrProceed(value, clearAndSet = true) {
    let fnToExecute = clearAndSet === false ? this.setInputValue.bind(this, value) : this.clearAndSetInputValue.bind(this, value);
    return this.isEnabled()
        .then(onIsFieldEnabled.bind(this, value))
        .catch(protractor.onCatchGenericError);

    function onIsFieldEnabled(valueToSet, isEnabled) {
        return isEnabled ?
            fnToExecute() :
            protractor.promise.defer().fulfill();
    }
}


/**
 * Check if an ElementFinder is enabled whether is displayed, otherwise returns the provided value (true by default) 
 * @param {boolean} isEnabledIfNotDisplayed The default value to be returned if the ElementFinder is not displayed 
 * @returns {protractor.promise} A promise which holds the isEnabled value if the ElementFinder is present, otherwise the provided isEnabledIfNotDisplayed or true by default 
 */
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


/**
 * Check if an element is displayed whether is present, returning a promise which holds a value for the visibility. If not present, return a promise which holds false
 * @returns {Protractor.promise} A promise which holds the value if the element is displayed or not. False if the element is not present.
 */
function isDisplayedIfPresent() {
    return this.isPresent()
        .then(onPresent.bind(this))
        .catch(protractor.onCatchGenericError);

    function onPresent(isPresent) {
        return isPresent ?
            this.isDisplayed() :
            protractor.promise.fulfilled(false);
    }
}

/**
 * Check if an element is enabled whether is present. If not present, return a promise which holds false
 * @returns {Protractor.promise} A promise which holds if the element is enabled, otherwise holds false if not present
 */
function isEnabledAndPresent() {
    return this.isEnabled()
        .then(isEnabled => isEnabled)
        .catch(() => false);
}


/**
 * Wait for an ElementFinder to be present in a given delay, and if present then execute the provided function, otherwise reject with an error
 * @param {number} maxWaitTime The maximum time to wait for the ElementFinder presence 
 * @param {Function} fnToExecute The function to be executed if the ElementFinder is present in the given delay  
 * @returns {protractor.promise} A promise rejected if the element is not present in the provided time, otherwise it holds the value returned by the provided function to call 
 */
function waitAndThenExecute(maxWaitTime, fnToExecute) {
    let EC = protractor.ExpectedConditions;
    return browser.wait(EC.visibilityOf(this), maxWaitTime)
        .then(fnToExecute.bind(this))
        .catch(onCatchGenericError);
}

/**
 * Return if an element is a select tag
 * @returns {Boolean} True or false depending if the tag is a select or not 
 */
function isTagSelect() {
    return asyncPlugin (asyncFn.bind(this))();

    function asyncFn() {
        let tag = awaitPlugin(this.getTagName());
        return tag === 'select';
    }
}

/**
 * Return if an element is an input tag of the given type
 * @param {String} inputType The input type to check for the tag element 
 * @returns {Boolean} True or false depending if the tag is of the given input type or not 
 */
function isTagInputType(inputType) {
    return asyncPlugin (asyncFn.bind(this))();

    function asyncFn() {
        let tag = awaitPlugin(this.getTagName());
        if (tag !== 'input') {
            return false;
        } 
        let tagInputType = awaitPlugin(this.getAttribute('type'));
        return tagInputType === inputType;
    }
}

/**
 * Return if an element is an input radio tag
 * @returns {Boolean} True or false depending if the tag is a radio button or not 
 */
function isRadioInput() {
    return this.isTagInputType('radio');
}

/**
 * Return if an element is an input checkbox tag
 * @returns {Boolean} True or false depending if the tag is a checkbox button or not 
 */
function isCheckboxInput() {
    return this.isTagInputType('checkbox');
}


// ElementArrayFinder methods
// ===========================================================================================


/**
 * Get the value associated to the checked option of a radio button. Called on the ElementArrayFinder associated to all the elements of the radio input 
 * @returns {protractor.promise} A promise which holds the value of the selected radio input, otherwise it rejects a promise with an error
 */
function getValueOfRadioSelectedItem() {
    return this.filter(filterElementByAttributeChecked)
        .then((els) => {
            return els[0].getInputValue();
        })
        .catch(onCatchGenericError);
}


/**
 * Get the text of the label of the checked option of a radio input. Called on the ElementArrayFinder associated to all the elements of the radio input 
 * @param {Boolean} [ifEmptyThrowError] Optional. Specify if you need to throw an error if the radio has not element selected or return an empty string
 * @returns {protractor.promise} A promise which holds the text of the checked option of radio inputs, otherwise it is rejected with an error
 */
function getLabelTextOfRadioSelectedItem(ifEmptyThrowError = false) {
    return this.filter(filterElementByAttributeChecked)
        .then((els) => {
            return els[0].getIdValue()
                .then(protractor.getLabelTextByForAttribute)
                .catch(onCatchGenericError);
        })
        .catch((error) => {
            if (ifEmptyThrowError === false) {
                return '';
            }
            onCatchGenericError(error);
        });
}


/**
 * Get the text of all the rows of the table but associated only to the columns identified by the css classes provided as input array.
 * Called on the ElementArrayFinder which holds all the tr of the table.  
 * @param {array} columnClassesArray An array with all the css classes of the table columns you want to retrieve the text for  
 * @returns {protractor.promise} A promise which holds an array of arrays where the inner arrays represent the row texts of the table associated to the given columns
 */
function getTableRowsFromCSSColumnsValues(columnClassesArray) {
    let promises;
    return this.map(function(tr) {
        promises = [];
        columnClassesArray.forEach(function(columnClass) {
            promises.push(tr.element(by.className(columnClass)).getText());
        });
        return promises;
    });
}


/**
 * Sort an ElementArrayFinder using a given compareFunction executed over the values returned by the application of the functionName with the inputParams over the ElementFinder items which compose the ElementArrayFinder
 * @param {Function} compareFunction Function to be used for comparing elements inside the ElementArrayFinder 
 * @param {string} functionName Name of the function to be called on the ElementFinder items which compose the ElementArrayFinder. Should be a valid function of ElementFinder 
 * @param {array} inputParams An array of input parameters to be passed in the functionName called on the single ElementFinder items of the ElementArrayFinder 
 * @returns {protractor.promise} A promise resolved which holds the ElementArrayFinder sorted.
 */
function sort(compareFunction, functionName, inputParams) {
    return sortWithElementArrayFinder.call(this, compareFunction, functionName, inputParams);
}



// protractor methods
// ===========================================================================================

/**
 * @description
 * A method in order to get the first present element within a list of ElementFinder items 
 * 
 * @param {Array} elements An array of ElementFinder items 
 * @returns {protractor.promise} A promise resolved which holds the first present element of the array, undefined otherwise
 */
function getFirstPresentElement(elements) {
    let deferred = protractor.promise.defer();
    asyncPlugin(asyncFn)();
    return deferred.promise;

    function asyncFn() {
        let elementsPresences = elements.map(x => [awaitPlugin(x.isPresent()), x]);
        let firstVisibleElement = elementsPresences.find(x => x[0] === true)[1];
        deferred.fulfill(firstVisibleElement);
    }
}


/**
 * Get the text of the label with the for attribute equals to the provided forValue
 * @param {string} forValue The value of the for of the label 
 * @returns {protractor.promise} A promise resolved which holds the text value of the label
 */
function getLabelTextByForAttribute(forValue) {
    return element(by.css(`label[for="${forValue}"]`)).getText();
}


/**
 * Get an ElementArrayFinder from an array of ElementFinder items
 * @param {array} arrayOfElementFinder An array of ElementFinder items you want to convert into an ElementArrayFinder item 
 * @returns {protractor.ElementArrayFinder} The ElementArrayFinder associated to the given array of ElementFinder items
 */
function getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder) {
    let getWebElements = function() {
        let webElements = arrayOfElementFinder.map(function(ef) {
            return ef.getWebElement();
        });
        return protractor.promise.fulfilled(webElements);
    };
    return new protractor.ElementArrayFinder(this.browser_, getWebElements, this.locator_, this.actionResults_);
}


/**
 * Filter an ElementFinder provided as input through its checked value 
 * @param {protractor.ElementFinder} el The input ElementFinder to be filter by its checked value 
 * @returns {protractor.promise} A promise returned when the checked value has been retrieved. Rejected if some error occurs
 */
function filterElementByAttributeChecked(el) {
    return el.getCheckedValue()
        .then(checkCheckedValue)
        .catch(onCatchGenericError);

    function checkCheckedValue(value) {
        return value === 'true';
    }
}


/**
 * Throw a given error
 * @param {Error} err Error to be thrown
 */
function onCatchGenericError(err) {
    throw new Error(err);
}


/**
 * Set the value of a radio button clicking on the label associated to it through the HTML for attribute 
 * @param {string} labelFor The value of the for attribute that will be used to look for the label element 
 * @returns {protractor.promise} A promise resolved when the label associated to the radio button will be clicked
 */
function setRadioButtonValueByLabelFor(labelFor) {
    return element(by.css(`label[for="${labelFor}"]`)).click();
}


/**
 * Set the radio button value from the given labelText associated to it. 
 * @param {string} labelText The text of the label associated to the radio button you want to select 
 * @param {ElementFinder} [elementContainer] Optional. The ElementFinder where to find the label. Otherwise it will find inside all the DOM.  
 * @returns {protractor.promise} A promise resolved when the label associated to the radio button will be clicked. Rejected if some error occurs.
 */
function setRadioButtonValueByLabelText(labelText, elementContainer) {
    var el = elementContainer || element;
    return el.all(by.tagName('label'))
        .filter(filterElementByText.bind(null, labelText))
        .then(clickFirstElement)
        .catch(onCatchGenericError);
}


/**
 * Select an option from a select depending on the provided optionText 
 * @param {string} optionText The text of the option want to select 
 * @param {ElementFinder} [elementContainer] Optional. The ElementFinder where to find the option. Otherwise it will find inside all the DOM
 * @returns {protractor.promise} A promise resolved when the option of the select has been selected. Rejected if some error occurs
 */
function setSelectValueByOptionText(optionText, elementContainer) {
    var el = elementContainer || element;
    return el.all(by.tagName('option'))
        .filter(filterElementByText.bind(null, optionText))
        .then(clickFirstElement)
        .catch(onCatchGenericError);
}


/**
 * Perform the given action if and only if the given element is present and displayed, otherwise return a fulfilled promise without executing the action
 * @param {protractor.ElementFinder} elementToCheck An ElementFinder that you want to check if is present and displayed before to perform the action
 * @param {Function} actionToDo A function which represents the action to perform if the element is present and displayed 
 * @returns {protractor.promise} A promise corresponding to the given action provided, or a fulfilled promise if the element is not present or not displayed
 */
function ifPresentAndEnabledDoAction(elementToCheck, actionToDo) {
    return elementToCheck.isPresent()
        .then(onPresent)
        .catch(onCatchGenericError);

    function onPresent(isPresent) {
        return isPresent ?
            elementToCheck.isDisplayed().then(onDisplay) :
            protractor.promise.defer().fulfill();
    }

    function onDisplay(isDisplay) {
        return isDisplay ?
            actionToDo() :
            protractor.promise.defer().fulfill();
    }
}


/**
 * Check if the given field, displays the given error type, and eventually check that the message text is the same as the one you provided
 * @param {String} field Complete field name associated to the ng-messages. It is the field of the form you are going to check the validation
 * @param {String} errorType Type of the error that will be shown in the ng-message block 
 * @param {String} [errorMessage] Optional. Text of the error message that should be displayed when you have the error
 * @returns {Protractor.promise} A promise which holds booleans which represent if the error is shown and eventually if the message is the same as the expected one
 */
function checkErrorValidation(field, errorType, errorMessage) {
    var el = $('[ng-messages="' + field + '"] [ng-message="' + errorType + '"]');
    var promises = [];
    promises.push(el.isDisplayedIfPresent());
    if (errorMessage) {
        promises.push(el.getText());
    }
    return protractor.promise.all(promises);
}


// Internal methods
// ===========================================================================================


/**
 * Get the result of the comparison between the given textToFind and the text of the given ElementFinder element  
 * @param {string} textToFind The text to use for the comparison with the 
 * @param {ElementFinder} element The element you want to check the text for 
 * @returns {protractor.promise} A promise which holds the check of the current element text with the given textToFind. Rejected if some error occurs 
 */
function filterElementByText(textToFind, element) {
    return element.getText()
        .then(checkText)
        .catch(onCatchGenericError);

    function checkText(text) {
        return text.toUpperCase() === textToFind.toUpperCase();
    }
}


/**
 * Click on the first element of the given array elements of ElementFinder items. 
 * If the array has not items, it throws an error
 * @param {array} elements Array of ElementFinder items  
 * @returns {protractor.promise} A promise resolved when the element will be clicked. Throw an error if there are no elements provided
 */
function clickFirstElement(elements) {
    if (!elements.length) {
        throw new Error('There are no elements in the given elements collection');
    }
    return elements[0].click();
}


/**
 * Resolve the calling ElementArrayFinder and call the sort over it providing the parameters, resolving the promise with the sorted ElementArrayFinder
 * @param {Function} compareFunction A comparable function which will be used to sort the ElementFinder items of the ElementArrayFinder
 * @param {string} functionName String of a function to be called over all the ElementFinder items retrieved from the calling ElementArrayFinder. This function produces the values to be compared to the compareFunction
 * @param {array} inputParams Array of input parameters to be applied to the given functionName when called
 * @returns {protractor.promise} A promise resolved which holds the new sorted ElementArrayFinder
 */
function sortWithElementArrayFinder(compareFunction, functionName, inputParams) {
    return this
        .then(asyncPlugin(elements => {
            let sortedElement = baseImplementOfSort(elements, compareFunction, functionName, inputParams);
            return protractor.promise.fulfilled({
                result: sortedElement
            });
        }));
}


/**
 * Sort the provided array of ElementFinder and return a new ElementArrayFinder which includes all the sorted elements
 * @param {array} elements Array of ElementFinder to be sorted 
 * @param {Function} compareFunction A comparable function used for sorting the provided elements 
 * @param {string} functionName String of a function to be called over all the ElementFinder items retrieved from the calling ElementArryFinder. This function produces the values to be compared to the compareFunction
 * @param {array} inputParams Array of input parameters to be applied to the given functionName when called
 * @returns {ElementArrayFinder} The new sorted ElementArrayFinder
 */
function baseImplementOfSort(elements, compareFunction, functionName, inputParams) {
    const comparableArray = awaitPlugin(protractor.promise.all(elements.map(asyncPlugin(x => [awaitPlugin(x[functionName].apply(x, inputParams)), x]))));
    comparableArray.sort(compareFunction);
    const sortedArray = comparableArray.map(x => x[1]);
    return protractor.getElementArrayFinderFromArrayOfElementFinder(sortedArray);
}