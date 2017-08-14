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




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
