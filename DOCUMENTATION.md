# [qprotractor](https://github.com/quirimmo/Qprotractor#readme) *1.0.0*

> An utility library for protractor


### src/qprotractor.js


#### clickOnParent() 

Click on the parent of the current ElementFinder through it's property parentElementArrayFinder included in it



##### Returns


- `protractor.promise`  A promise which will be resolved after the click on the element happens



#### getInputValue() 

Get the value of the current ElementFinder .
For simple input types (like text, number, etc...) it will return directly the value
For complex types (like select, radio, etc...) it will return a composite value. See the explicit methods for these elements






##### Returns


- `protractor.promise`  A promise which holds the value of the input



#### getIdValue() 

Get the id of the current ElementFinder






##### Returns


- `protractor.promise`  A promise which holds the id of the input



#### getSelectCheckedOption() 

Get the text of the checked option of an ElementFinder corresponding to a select






##### Returns


- `protractor.promise`  A promise which holds the text of the checked otpion



#### getCheckedValue() 

Get the value of the checked attribute of ElementFinder like an option, a radio input or a checkbox input






##### Returns


- `protractor.promise`  A promise which holds the value of the attribute checked



#### setInputValue(value:) 

Set the provided value to an input ElementFinder. It doesn't clear the previous value so this will be appended at the end of the previous one




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value: | `string`  | The value to set in the input ElementFinder | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved when the value will be set in the input ElementFinder



#### clearAndSetInputValue(value:) 

Clear the actual value of an input ElementFinder and then it sets the provided value to it




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value: | `string`  | The value to set in the input ElementFinder | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the value will be set in it



#### setValueIfEnabledOrProceed(value:) 

Set a new value on an input ElementFinder if it is enabled, otherwise proceed without setting the value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value: | `value`  | The new value to set in the ElementFinder if it is enabled | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved when the input ElementFinder will be clear and the new value will be set in, if it is enabled. Otherwise it will be fulfilled if the ElementFinder is not enabled.



#### isEnabledIfDisplayedOrProceed(isEnabledIfNotDisplayed:) 

Check if an ElementFinder is enabled whether is displayed, otherwise returns the provided value (true by default) 




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| isEnabledIfNotDisplayed: | `boolean`  | The default value to be returned if the ElementFinder is not displayed | &nbsp; |




##### Returns


- `protractor.promise`  A promise which holds the isEnabled value if the ElementFinder is present, otherwise the provided isEnabledIfNotDisplayed or true by default



#### waitAndThenExecute(maxWaitTime:, fnToExecute:) 

Wait for an ElementFinder to be present in a given delay, and if present then execute the provided function, otherwise reject with an error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| maxWaitTime: | `number`  | The maximum time to wait for the ElementFinder presence | &nbsp; |
| fnToExecute: | `Function`  | The function to be executed if the ElementFinder is present in the given delay | &nbsp; |




##### Returns


- `protractor.promise`  A promise rejected if the element is not present in the provided time, otherwise it holds the value returned by the provided function to call



#### getValueOfRadioSelectedItem() 

Get the value associated to the checked option of a radio button. Called on the ElementArrayFinder associated to all the elements of the radio input 






##### Returns


- `protractor.promise`  A promise which holds the value of the selected radio input, otherwise it rejects a promise with an error



#### getLabelTextOfRadioSelectedItem() 

Get the text of the label of the checked option of a radio input. Called on the ElementArrayFinder associated to all the elements of the radio input 






##### Returns


- `protractor.promise`  A promise which holds the text of the checked option of radio inputs, otherwise it is rejected with an error



#### getTableRowsFromCSSColumnsValues(columnClassesArray:) 

Get the text of all the rows of the table but associated only to the columns identified by the css classes provided as input array.
Called on the ElementArrayFinder which holds all the tr of the table.  




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| columnClassesArray: | `array`  | An array with all the css classes of the table columns you want to retrieve the text for | &nbsp; |




##### Returns


- `protractor.promise`  A promise which holds an array of arrays where the inner arrays represent the row texts of the table associated to the given columns



#### sort(newSortedElementArrayFinder:, compareFunction:, functionName:, inputParams:) 

Sort an ElementArrayFinder using a given compareFunction executed over the values returned by the application of the functionName with the inputParams over the ElementFinder items which compose the ElementArrayFinder




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| newSortedElementArrayFinder: | `Object`  | An object parameter which will hold inside the data property the sorted ElementArrayFinder | &nbsp; |
| compareFunction: | `Function`  | Function to be used for comparing elements inside the ElementArrayFinder | &nbsp; |
| functionName: | `string`  | Name of the function to be called on the ElementFinder items which compose the ElementArrayFinder. Should be a valid function of ElementFinder | &nbsp; |
| inputParams: | `array`  | An array of input parameters to be passed in the functionName called on the single ElementFinder items of the ElementArrayFinder | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved when the ElementArrayFinder will be sorted. Then the sorted ElementArrayFinder will be available in newSortedElementArrayFinder.data. Rejected if some error occurs



#### getLabelTextByForAttribute(forValue:) 

Get the text of the label with the for attribute equals to the provided forValue




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| forValue: | `string`  | The value of the for of the label | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved which holds the text value of the label



#### getElementArrayFinderFromArrayOfElementFinder(arrayOfElementFinder:) 

Get an ElementArrayFinder from an array of ElementFinder items




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arrayOfElementFinder: | `array`  | An array of ElementFinder items you want to convert into an ElementArrayFinder item | &nbsp; |




##### Returns


- `protractor.ElementArrayFinder`  The ElementArrayFinder associated to the given array of ElementFinder items



#### filterElementByAttributeChecked(el:) 

Filter an ElementFinder provided as input through its checked value 




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| el: | `protractor.ElementFinder`  | The input ElementFinder to be filter by its checked value | &nbsp; |




##### Returns


-  {protractor.promise}: A promise returned when the checked value has been retrieved. Rejected if some error occurs



#### onCatchGenericError(err:) 

Throw a given error




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| err: | `Error`  | Error to be thrown | &nbsp; |




##### Returns


- `Void`



#### setRadioButtonValueByLabelFor(labelFor:) 

Set the value of a radio button clicking on the label associated to it through the HTML for attribute 




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| labelFor: | `string`  | The value of the for attribute that will be used to look for the label element | &nbsp; |




##### Returns


- `protractor.promise`  A promise resolved when the label associated to the radio button will be clicked




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
