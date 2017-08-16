# Qprotractor

<hr>

## TODO LIST

Explain all the procedure for running stuff gulp tasks etc etc etc
Explain how to generate documentation
Explain the structure of the project
Explain how to contribute
List todo list tasks
Create table of contents with links to everywhere
Create Main api list with links to api description
Separate list of apis through ElementFinder, ElementArrayFinder, protractor

chrome version:

`webdriver-manager update --versions.chrome 2.24`

`webdriver-manager start --versions.chrome 2.24`

lite-server for running app:

`http://localhost:9000`

doxdox for generation of documentation from jsdoc:

`doxdox 'src/qprotractor.js' --layout bootstrap --output index.html`

`doxdox 'src/qprotractor.js' --layout markdown --output DOCUMENTATION.md`

Explain Update the seleniumServerAddress in the protractor config according to the version in your folder

<hr>

## Description

An utility library for protractor providing several utility methods which extend the `ElementFinder`, the `ElementArrayFinder` and the `protractor`.

<hr>

## Installation

Simply install it from the npm registry through:

`npm install --save-dev qprotractor`

Once installed it, `require('qptractor')` at the beginning of you `onPrepare` hook of protractor, in order to make the methods available inside all the protractor life cycle and files:

```javascript
exports.config = {
    ...
    onPrepare: function() {
        require('./index');
    }
};
```

<hr>

## API

For a better view of api, please open the following link (link to uploaded generated HTML doc):

http://www.google.it

### clickOnParent()

Click on the parent of the current ElementFinder through it's property parentElementArrayFinder included in it

#### Returns

- `protractor.promise`  A promise which will be resolved after the click on the element happens

### getInputValue()

Get the value of the current ElementFinder.
For simple input types (like text, number, etc...) it will return directly the value.
For complex types (like select, radio, etc...) it will return a composite value. See the explicit methods for these elements

#### Returns

- `protractor.promise`  A promise which holds the value of the input

### getIdValue()

Get the id of the current ElementFinder

#### Returns

- `protractor.promise`  A promise which holds the id of the input

### getSelectCheckedOption()

Get the text of the checked option of an ElementFinder corresponding to a select

#### Returns

- `protractor.promise`  A promise which holds the text of the checked option

### getCheckedValue()

Get the value of the checked attribute of ElementFinder like an option, a radio input or a checkbox input

#### Returns

- `protractor.promise`  A promise which holds the value of the attribute checked

### setInputValue(value)

Set the provided value to an input ElementFinder. It doesn't clear the previous value so this will be appended at the end of the previous one

#### Parameters

| Name  | Type     | Description                                 |
|-------|----------|---------------------------------------------|
| value | `string` | The value to set in the input ElementFinder |

#### Returns

- `protractor.promise`  A promise resolved when the value will be set in the input ElementFinder

### clearAndSetInputValue(value)

Clear the actual value of an input ElementFinder and then it sets the provided value to it

#### Parameters

| Name  | Type     | Description                                 |
|-------|----------|---------------------------------------------|
| value | `string` | The value to set in the input ElementFinder |

#### Returns

- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the value will be set in it

### setValueIfEnabledOrProceed(value)

Set a new value on an input ElementFinder if it is enabled, otherwise proceed without setting the value

#### Parameters

| Name  | Type    | Description                                                |
|-------|---------|------------------------------------------------------------|
| value | `value` | The new value to set in the ElementFinder if it is enabled |

#### Returns

- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the new value will be set in, if it is enabled. Otherwise it will be fulfilled if the ElementFinder is not enabled.

### isEnabledIfDisplayedOrProceed(isEnabledIfNotDisplayed)

Check if an ElementFinder is enabled whether is displayed, otherwise returns the provided value (true by default) 

#### Parameters

| Name                    | Type      | Description                                                            |
|-------------------------|-----------|------------------------------------------------------------------------|
| isEnabledIfNotDisplayed | `boolean` | The default value to be returned if the ElementFinder is not displayed |

#### Returns

- `protractor.promise`  A promise which holds the isEnabled value if the ElementFinder is present, otherwise the provided isEnabledIfNotDisplayed or true by default

### waitAndThenExecute(maxWaitTime, fnToExecute)

Wait for an ElementFinder to be present in a given delay, and if present then execute the provided function, otherwise reject with an error

#### Parameters

| Name        | Type       | Description                                                                    |
|-------------|------------|--------------------------------------------------------------------------------|
| maxWaitTime | `number`   | The maximum time to wait for the ElementFinder presence                        |
| fnToExecute | `Function` | The function to be executed if the ElementFinder is present in the given delay |

#### Returns

- `protractor.promise`  A promise rejected if the element is not present in the provided time, otherwise it holds the value returned by the provided function to call

### getValueOfRadioSelectedItem()

Get the value associated to the checked option of a radio button. Called on the ElementArrayFinder associated to all the elements of the radio input

#### Returns

- `protractor.promise`  A promise which holds the value of the selected radio input, otherwise it rejects a promise with an error

### getLabelTextOfRadioSelectedItem()

Get the text of the label of the checked option of a radio input. Called on the ElementArrayFinder associated to all the elements of the radio input

#### Returns

- `protractor.promise`  A promise which holds the text of the checked option of radio inputs, otherwise it is rejected with an error

### getTableRowsFromCSSColumnsValues(columnClassesArray)

Get the text of all the rows of the table but associated only to the columns identified by the css classes provided as input array.
Called on the ElementArrayFinder which holds all the tr of the table.

#### Parameters

| Name               | Type    | Description                                                                              |
|--------------------|---------|------------------------------------------------------------------------------------------|
| columnClassesArray | `array` | An array with all the css classes of the table columns you want to retrieve the text for |

#### Returns

- `protractor.promise`  A promise which holds an array of arrays where the inner arrays represent the row texts of the table associated to the given columns

### sort(newSortedElementArrayFinder, compareFunction, functionName, inputParams)

Sort an ElementArrayFinder using a given compareFunction executed over the values returned by the application of the functionName with the inputParams over the ElementFinder items which compose the ElementArrayFinder

#### Parameters

| Name                        | Type       | Description                                                                                            |
|-----------------------------|------------|--------------------------------------------------------------------------------------------------------|
| newSortedElementArrayFinder | `Object`   | An object which will hold inside the data property the new sorted ElementArrayFinder                   |
| compareFunction             | `Function` | Function to be used for comparing elements inside the ElementArrayFinder                               |
| functionName                | `string`   | Name of the function called on the ElementFinder items. Should be a valid function of ElementFinder    |
| inputParams                 | `array`    | An array of input parameters to be passed in the functionName called on the single ElementFinder items |

#### Returns

- `protractor.promise`  A promise resolved when the ElementArrayFinder will be sorted. Then the sorted ElementArrayFinder will be available in newSortedElementArrayFinder.data. The promise will be resolved passing the ElementArrayFinder, so you can directly access from the then the array of ElementFinder items. Rejected if some error occurs

### getLabelTextByForAttribute(forValue)

Get the text of the label with the for attribute equals to the provided forValue

#### Parameters

| Name     | Type     | Description                       |
|----------|----------|-----------------------------------|
| forValue | `string` | The value of the for of the label |

#### Returns

- `protractor.promise`  A promise resolved which holds the text value of the label

### getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder)

Get an ElementArrayFinder from an array of ElementFinder items

#### Parameters

| Name                 | Type    | Description                                                                         |
|----------------------|---------|-------------------------------------------------------------------------------------|
| arrayOfElementFinder | `array` | An array of ElementFinder items you want to convert into an ElementArrayFinder item |

#### Returns

- `protractor.ElementArrayFinder`  The ElementArrayFinder associated to the given array of ElementFinder items

### filterElementByAttributeChecked(el)

Filter an ElementFinder provided as input through its checked value

#### Parameters

| Name | Type                       | Description                                               |
|------|----------------------------|-----------------------------------------------------------|
| el   | `protractor.ElementFinder` | The input ElementFinder to be filter by its checked value |

#### Returns

- `protractor.promise`  A promise returned when the checked value has been retrieved. Rejected if some error occurs

### onCatchGenericError(err)

Throw a given error

#### Parameters

| Name | Type    | Description        |
|------|---------|--------------------|
| err  | `Error` | Error to be thrown |

#### Returns

- `Void`

### setRadioButtonValueByLabelFor(labelFor)

Set the value of a radio button clicking on the label associated to it through the HTML for attribute

#### Parameters

| Name     | Type     | Description                                                                    |
|----------|----------|--------------------------------------------------------------------------------|
| labelFor | `string` | The value of the for attribute that will be used to look for the label element |

#### Returns

- `protractor.promise`  A promise resolved when the label associated to the radio button will be clicked

### setRadioButtonValueByLabelText(labelText[, elementContainer])

Set the radio button value from the given labelText associated to it.

#### Parameters

| Name             | Type            | Description                                                                                     |
|------------------|-----------------|-------------------------------------------------------------------------------------------------|
| labelText        | `string`        | The text of the label associated to the radio button you want to select                         |
| elementContainer | `ElementFinder` | Optional. The ElementFinder where to find the label. Otherwise it will find inside all the DOM. |

#### Returns

- `protractor.promise`  A promise resolved when the label associated to the radio button will be clicked. Rejected if some error occurs.

### setSelectValueByOptionText(optionText[, elementContainer])

Select an option from a select depending on the provided optionText

#### Parameters

| Name             | Type            | Description                                                                                     |
|------------------|-----------------|-------------------------------------------------------------------------------------------------|
| optionText       | `string`        | The text of the option want to select                                                           |
| elementContainer | `ElementFinder` | Optional. The ElementFinder where to find the option. Otherwise it will find inside all the DOM |

#### Returns

- `protractor.promise`  A promise resolved when the option of the select has been selected. Rejected if some error occurs

### filterElementByText(textToFind, element)

Get the result of the comparison between the given textToFind and the text of the given ElementFinder element

#### Parameters

| Name       | Type            | Description                                 |
|------------|-----------------|---------------------------------------------|
| textToFind | `string`        | The text to use for the comparison with the |
| element    | `ElementFinder` | The element you want to check the text for  |

#### Returns

- `protractor.promise`  A promise which holds the check of the current element text with the given textToFind. Rejected if some error occurs

### clickFirstElement(elements)

Click on the first element of the given array elements of ElementFinder items.
If the array has not items, it throws an error

#### Parameters

| Name     | Type    | Description                  |
|----------|---------|------------------------------|
| elements | `array` | Array of ElementFinder items |

#### Returns

- `protractor.promise`  A promise resolved when the element will be clicked. Throw an error if there are no elements provided

### sortWithElementArrayFinder(newSortedElementArrayFinder, compareFunction, functionName, inputParams)

Resolve the calling ElementArrayFinder and call the sort over it providing the parameters, assign the returning sorted ElementArrayFinder to the data property of the input newSortedElementArrayFinder

#### Parameters

| Name                        | Type       | Description                                                                                                                      |
|-----------------------------|------------|----------------------------------------------------------------------------------------------------------------------------------|
| newSortedElementArrayFinder | `Object`   | An object which will hold inside the data property the new sorted ElementArrayFinder                                             |
| compareFunction             | `Function` | A comparable function which will be used to sort the ElementFinder items of the ElementArrayFinder                               |
| functionName                | `string`   | String of a function to be called over all the ElementFinder items. It produces the values to be compared to the compareFunction |
| inputParams                 | `array`    | Array of input parameters to be applied to the given functionName when called                                                    |

#### Returns

- `protractor.promise`  A promise resolved when the new sorted ElementArrayFinder will be assigned to the data property of the input newSortedElementArrayFinder. The promise will be resolved passing the ElementArrayFinder, so from the then of this promise you can directly access already the array of ElementFinder items given from the resolution of the ElementArrayFinder.

### baseImplementOfSort(elements, compareFunction, functionName, inputParams)

Sort the provided array of ElementFinder and return a new ElementArrayFinder which includes all the sorted elements

#### Parameters

| Name            | Type       | Description                                                                                                                      |
|-----------------|------------|----------------------------------------------------------------------------------------------------------------------------------|
| elements        | `array`    | Array of ElementFinder to be sorted                                                                                              |
| compareFunction | `Function` | A comparable function used for sorting the provided elements                                                                     |
| functionName    | `string`   | String of a function to be called over all the ElementFinder items. It produces the values to be compared to the compareFunction |
| inputParams     | `array`    | Array of input parameters to be applied to the given functionName when called                                                    |

#### Returns

- `ElementArrayFinder`  The new sorted ElementArrayFinder

<hr>