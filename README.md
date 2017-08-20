# Qprotractor

An utility library for protractor providing several utility methods which extend the `ElementFinder`, the `ElementArrayFinder` and the `protractor` objects.

[![Build Status](https://travis-ci.org/quirimmo/Qprotractor.svg?branch=master)](https://travis-ci.org/quirimmo/Qprotractor)

<hr>

## Table Of Contents

* [Description](#description)
* [Installation](#installation)
* [API](#api)
  * [ElementFinder methods](#element-finder-methods)
    * [clickOnParent()](#click-on-parent)
    * [getInputValue()](#get-input-value)
    * [getIdValue()](#get-id-value)
    * [getSelectCheckedOption()](#get-select-checked-option)
    * [getCheckedValue()](#get-checked-value)
    * [setInputValue(value)](#set-input-value)
    * [clearAndSetInputValue(value)](#clear-and-set-input-value)
    * [setValueIfEnabledOrProceed(value)](#set-value-if-enabled-or-proceed)
    * [isEnabledIfDisplayedOrProceed(isEnabledIfNotDisplayed)](#is-enabled-if-displayed-or-proceed)
    * [waitAndThenExecute(maxWaitTime, fnToExecute)](#wait-and-then-execute)
  * [ElementArrayFinder methods](#element-array-finder-methods)
    * [getValueOfRadioSelectedItem()](#get-value-of-radio-selected-item)
    * [getLabelTextOfRadioSelectedItem()](#get-label-text-of-radio-selected-item)
    * [getTableRowsFromCSSColumnsValues(columnClassesArray)](#get-table-rows-from-css-columns-values)
    * [sort(compareFunction, functionName, inputParams)](#sort)
  * [protractor methods](#protractor-methods)
    * [onCatchGenericError(err)](#on-catch-generic-error)
    * [getLabelTextByForAttribute(forValue)](#get-label-text-by-for-attribute)
    * [getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder)](#get-element-array-finder-from-array-of-element-finder)
    * [filterElementByAttributeChecked(el)](#filter-element-by-attribute-checked)
    * [setRadioButtonValueByLabelFor(labelFor)](#set-radio-button-value-by-label-for)
    * [setRadioButtonValueByLabelText(labelText[, elementContainer])](#set-radio-button-value-by-label-text)
    * [setSelectValueByOptionText(optionText[, elementContainer])](#set-select-value-by-option-text)
* [Developer Usage](#developer-usage)

<hr>

## <a id="description"></a>Description

An utility library for protractor providing several utility methods which extend the `ElementFinder`, the `ElementArrayFinder` and the `protractor` objects.

The source code provides also a really simple example AngularJS application where you can test your methods or test the usage of the existing methods.

<hr>

## <a id="installation"></a>Installation

Simply install it from the npm registry through:

`npm install --save-dev qprotractor`

Once installed it, `require('qptractor')` at the beginning of your `onPrepare` hook of protractor, in order to make the methods available inside all the protractor life cycle and files:

```javascript
exports.config = {
    ...
    onPrepare: function() {
        require('./index');
    }
};
```

<hr>

## <a id="api"></a>API

Here the list of all the methods provided by the library. The methods extend `ElementFinder`, `ElementArrayFinder` and `protractor` and here they are grouped by the kind of object which they extend.

You can see the usage of all the APIs inside the files contained in the folder `test`. You will find an example for all the methods listed below. 

## <a id="element-finder-methods"></a>ElementFinder Methods

### <a id="click-on-parent"></a>clickOnParent()

Click on the parent of the current ElementFinder through it's property parentElementArrayFinder included in it

#### Returns

- `protractor.promise`  A promise which will be resolved after the click on the element happens

### <a id="get-input-value"></a>getInputValue()

Get the value of the current ElementFinder.
For simple input types (like text, number, etc...) it will return directly the value.
For complex types (like select, radio, etc...) it will return a composite value. See the explicit methods for these elements

#### Returns

- `protractor.promise`  A promise which holds the value of the input

### <a id="get-id-value"></a>getIdValue()

Get the id of the current ElementFinder

#### Returns

- `protractor.promise`  A promise which holds the id of the input

### <a id="get-select-checked-option"></a>getSelectCheckedOption()

Get the text of the checked option of an ElementFinder corresponding to a select

#### Returns

- `protractor.promise`  A promise which holds the text of the checked option

### <a id="get-checked-value"></a>getCheckedValue()

Get the value of the checked attribute of ElementFinder like an option, a radio input or a checkbox input

#### Returns

- `protractor.promise`  A promise which holds the value of the attribute checked

### <a id="set-input-value"></a>setInputValue(value)

Set the provided value to an input ElementFinder. It doesn't clear the previous value so this will be appended at the end of the previous one

#### Parameters

| Name  | Type     | Description                                 |
|-------|----------|---------------------------------------------|
| value | `string` | The value to set in the input ElementFinder |

#### Returns

- `protractor.promise`  A promise resolved when the value will be set in the input ElementFinder

### <a id="clear-and-set-input-value"></a>clearAndSetInputValue(value)

Clear the actual value of an input ElementFinder and then it sets the provided value to it

#### Parameters

| Name  | Type     | Description                                 |
|-------|----------|---------------------------------------------|
| value | `string` | The value to set in the input ElementFinder |

#### Returns

- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the value will be set in it

### <a id="set-value-if-enabled-or-proceed"></a>setValueIfEnabledOrProceed(value)

Set a new value on an input ElementFinder if it is enabled, otherwise proceed without setting the value

#### Parameters

| Name  | Type    | Description                                                |
|-------|---------|------------------------------------------------------------|
| value | `value` | The new value to set in the ElementFinder if it is enabled |

#### Returns

- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the new value will be set in, if it is enabled. Otherwise it will be fulfilled if the ElementFinder is not enabled.

### <a id="is-enabled-if-displayed-or-proceed"></a>isEnabledIfDisplayedOrProceed(isEnabledIfNotDisplayed)

Check if an ElementFinder is enabled whether is displayed, otherwise returns the provided value (true by default)

#### Parameters

| Name                    | Type      | Description                                                            |
|-------------------------|-----------|------------------------------------------------------------------------|
| isEnabledIfNotDisplayed | `boolean` | The default value to be returned if the ElementFinder is not displayed |

#### Returns

- `protractor.promise`  A promise which holds the isEnabled value if the ElementFinder is present, otherwise the provided isEnabledIfNotDisplayed or true by default

### <a id="wait-and-then-execute"></a>waitAndThenExecute(maxWaitTime, fnToExecute)

Wait for an ElementFinder to be present in a given delay, and if present then execute the provided function, otherwise reject with an error

#### Parameters

| Name        | Type       | Description                                                                    |
|-------------|------------|--------------------------------------------------------------------------------|
| maxWaitTime | `number`   | The maximum time to wait for the ElementFinder presence                        |
| fnToExecute | `Function` | The function to be executed if the ElementFinder is present in the given delay |

#### Returns

- `protractor.promise`  A promise rejected if the element is not present in the provided time, otherwise it holds the value returned by the provided function to call

## <a id="element-array-finder-methods"></a>ElementArrayFinder Methods

### <a id="get-value-of-radio-selected-item"></a>getValueOfRadioSelectedItem()

Get the value associated to the checked option of a radio button. Called on the ElementArrayFinder associated to all the elements of the radio input

#### Returns

- `protractor.promise`  A promise which holds the value of the selected radio input, otherwise it rejects a promise with an error

### <a id="get-label-text-of-radio-selected-item"></a>getLabelTextOfRadioSelectedItem()

Get the text of the label of the checked option of a radio input. Called on the ElementArrayFinder associated to all the elements of the radio input

#### Returns

- `protractor.promise`  A promise which holds the text of the checked option of radio inputs, otherwise it is rejected with an error

### <a id="get-table-rows-from-css-columns-values"></a>getTableRowsFromCSSColumnsValues(columnClassesArray)

Get the text of all the rows of the table but associated only to the columns identified by the css classes provided as input array.
Called on the ElementArrayFinder which holds all the tr of the table.

#### Parameters

| Name               | Type    | Description                                                                              |
|--------------------|---------|------------------------------------------------------------------------------------------|
| columnClassesArray | `array` | An array with all the css classes of the table columns you want to retrieve the text for |

#### Returns

- `protractor.promise`  A promise which holds an array of arrays where the inner arrays represent the row texts of the table associated to the given columns

### <a id="sort"></a>sort(compareFunction, functionName, inputParams)

Sort an ElementArrayFinder using a given compareFunction executed over the values returned by the application of the functionName with the inputParams over the ElementFinder items which compose the ElementArrayFinder.

#### Parameters

| Name                        | Type       | Description                                                                                            |
|-----------------------------|------------|--------------------------------------------------------------------------------------------------------|
| compareFunction             | `Function` | Function to be used for comparing elements inside the ElementArrayFinder                               |
| functionName                | `string`   | Name of the function called on the ElementFinder items. Should be a valid function of ElementFinder    |
| inputParams                 | `array`    | An array of input parameters to be passed in the functionName called on the single ElementFinder items |

#### Returns

- `protractor.promise`  A promise which holds the sorted ElementArrayFinder. Then the sorted ElementArrayFinder will be available in result property of the object returned from the promise. Rejected if some error occurs.

## <a id="protractor-methods"></a>Protractor Methods

### <a id="get-label-text-by-for-attribute"></a>getLabelTextByForAttribute(forValue)

Get the text of the label with the for attribute equals to the provided forValue

#### Parameters

| Name     | Type     | Description                       |
|----------|----------|-----------------------------------|
| forValue | `string` | The value of the for of the label |

#### Returns

- `protractor.promise`  A promise resolved which holds the text value of the label

### <a id="get-element-array-finder-from-array-of-element-finder"></a>getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder)

Get an ElementArrayFinder from an array of ElementFinder items

#### Parameters

| Name                 | Type    | Description                                                                         |
|----------------------|---------|-------------------------------------------------------------------------------------|
| arrayOfElementFinder | `array` | An array of ElementFinder items you want to convert into an ElementArrayFinder item |

#### Returns

- `protractor.ElementArrayFinder`  The ElementArrayFinder associated to the given array of ElementFinder items

### <a id="filter-element-by-attribute-checked"></a>filterElementByAttributeChecked(el)

Filter an ElementFinder provided as input through its checked value

#### Parameters

| Name | Type                       | Description                                               |
|------|----------------------------|-----------------------------------------------------------|
| el   | `protractor.ElementFinder` | The input ElementFinder to be filter by its checked value |

#### Returns

- `protractor.promise`  A promise returned when the checked value has been retrieved. Rejected if some error occurs

### <a id="on-catch-generic-error"></a>onCatchGenericError(err)

Throw a given error

#### Parameters

| Name | Type    | Description        |
|------|---------|--------------------|
| err  | `Error` | Error to be thrown |

#### Returns

- `Void`

### <a id="set-radio-button-value-by-label-for"></a>setRadioButtonValueByLabelFor(labelFor)

Set the value of a radio button clicking on the label associated to it through the HTML for attribute

#### Parameters

| Name     | Type     | Description                                                                    |
|----------|----------|--------------------------------------------------------------------------------|
| labelFor | `string` | The value of the for attribute that will be used to look for the label element |

#### Returns

- `protractor.promise`  A promise resolved when the label associated to the radio button will be clicked

### <a id="set-radio-button-value-by-label-text"></a>setRadioButtonValueByLabelText(labelText[, elementContainer])

Set the radio button value from the given labelText associated to it.

#### Parameters

| Name             | Type            | Description                                                                                     |
|------------------|-----------------|-------------------------------------------------------------------------------------------------|
| labelText        | `string`        | The text of the label associated to the radio button you want to select                         |
| elementContainer | `ElementFinder` | Optional. The ElementFinder where to find the label. Otherwise it will find inside all the DOM. |

#### Returns

- `protractor.promise`  A promise resolved when the label associated to the radio button will be clicked. Rejected if some error occurs.

### <a id="set-select-value-by-option-text"></a>setSelectValueByOptionText(optionText[, elementContainer])

Select an option from a select depending on the provided optionText

#### Parameters

| Name             | Type            | Description                                                                                     |
|------------------|-----------------|-------------------------------------------------------------------------------------------------|
| optionText       | `string`        | The text of the option want to select                                                           |
| elementContainer | `ElementFinder` | Optional. The ElementFinder where to find the option. Otherwise it will find inside all the DOM |

#### Returns

- `protractor.promise`  A promise resolved when the option of the select has been selected. Rejected if some error occurs

<hr>

## <a id="developer-usage"></a>Developer Usage

If you want to contribute to the current project, any help is more than welcome!

In order to contribute on it, first clone the repository and get the source code:

`git clone https://github.com/quirimmo/Qprotractor.git`

Then install all the dependencies:

`npm install`

Once you've done that, you may need to install the webdriver-manager through:

`node_modules/protractor/bin/webdriver-manager update`

After that, you can simply use the gulp tasks in order to run the application.

For example, if you want to run the AngularJS application used as example of usage of the library, you can trigger the following gulp task:

`gulp serve`

This will make the application available at the following address:

[http://localhost:9000/](http://localhost:9000/)

If you want to execute instead all the tests, you simply need to run the following task and everything will start automatically:

`gulp protractor-test`

The application uses `husky` in order to trigger the e2e-tests before to push. If any of the tests will fail, you would not be able to push on the repository.
After pushed, `travis` will be triggered in order to execute the job. If the job fails, the PR cannot be merged either.

So let's suppose you want to add a new method inside the library, these are the steps to be followed:

1. Add your method inside `src/qprotractor.js`
2. Add the jsdoc of the method
3. Add the related test and explanation of the method inside the relevant file inside the `test` folder
4. Execute the `gulp protractor-test` to ensure that all the tests are working
5. Add the documentation inside the README.md
6. Push all the code in order to trigger the travis job
7. Push again all the code in order to include the minified version of the files, but this time using `git push --no-verify` in order to bypass the local e2e tests

<hr>