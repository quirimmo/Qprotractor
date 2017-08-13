let getWebElements = (): wdpromise.Promise < WebElement[] > => {
    return this.getWebElements().then((parentWebElements: WebElement[]) => {
        let list = parentWebElements.map((parentWebElement: WebElement, index: number) => {
            let elementFinder =
                ElementFinder.fromWebElement_(this.browser_, parentWebElement, this.locator_);

            return filterFn(elementFinder, index);
        });
        return wdpromise.all(list).then((resolvedList: any) => {
            return parentWebElements.filter((parentWebElement: WebElement, index: number) => {
                return resolvedList[index];
            });
        });
    });
};
return new ElementArrayFinder(this.browser_, getWebElements, this.locator_);