const { expect } = require('@playwright/test');
class ReusableUtils {

    constructor(page){
        this.page=page;
    }

    //DropDown selection by Index
    async selectByValue(selector, value){
        await this.page.selectOption(selector,value)
    }

    //Scroll to element
    async scrollToElement(selector){
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    // Assert CheckBoxes
    async checkBoxAssert(selectorOrXpath,expectedState){
        if(expectedState){
        await expect(selectorOrXpath).toBeChecked();
        } else await expect(selectorOrXpath).not.toBeChecked();
    }

    
}
module.exports = ReusableUtils;