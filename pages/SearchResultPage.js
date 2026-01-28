const ElementAction = require('../utils/ElementAction');
const ReusableUtils = require('../utils/ReusableUtils');
const { expect } = require('@playwright/test');
class SearchResultPage {

    constructor(page) {
        this.page = page;

        //Object creation to use parent methods
         this.reusableUtils = new ReusableUtils(this.page);
         this.elementAction = new ElementAction(this.page);

        //Selectors or Locators
        this.resultLocator = '//div[@class="ZFwe0M row"]';
        this.thirdItemLocator = '(//div[@class="ZFwe0M row"])[3]';
        this.minDropdownLocator = '(//select[@class="hbnjE2"])[1]';
        this.maxDropdownLocator = '(//select[@class="hbnjE2"])[2]';
        this.filteredResultLocator = '(//div[@class="ZFwe0M row"])[1]';
        this.moreLocator = '//span[contains(text(),"MORE")]';
        this.nothingLocator = this.page.locator('div.buvtMR', { hasText: /^Nothing$/ }).locator('..');
        this.nothingCheckboxLocator = 'input[type="checkbox"]';
        

    }
    //Get all item details displayed for the search
    async getAllItemDetails() {
        await this.page.waitForSelector(this.resultLocator);
        const items = await this.page.locator(this.resultLocator).allTextContents();
        return items;

    }
    //Get third item details displayed for the search
    async getThirdItemDetails() {
        const thirdItem = await this.page.locator(this.thirdItemLocator).allTextContents();
        return thirdItem;
    }

    //Get filtered item details displayed for the search
    async getFilteredItemDetails() {
        const filteredItem = await this.page.locator(this.filteredResultLocator).allTextContents();
        return filteredItem;
    }
    //Select Min dropdown filter
    async minDropdown(){
        await this.reusableUtils.scrollToElement(this.minDropdownLocator);
        await this.page.waitForSelector(this.minDropdownLocator);
        await this.reusableUtils.selectByValue(this.minDropdownLocator,'15000');
        await this.page.locator(this.resultLocator).first().waitFor({ state: 'visible' });
    }

    //select Max dropdown filter
    async maxDropdown(){
        await this.reusableUtils.scrollToElement(this.maxDropdownLocator);
        await this.page.waitForSelector(this.maxDropdownLocator);
        await this.reusableUtils.selectByValue(this.maxDropdownLocator,'30000');
        await this.page.locator(this.resultLocator).first().waitFor({ state: 'visible' });
    }

    //Select Brand filter
    async selectBrand(){
        const brandTextBox = this.page.locator("(//input[@placeholder='Search Brand'])");
        await this.page.waitForTimeout(2000);
        await brandTextBox.fill("Nothing");
        await this.page.waitForTimeout(2000);
        await this.nothingLocator.click();
        
    }

    //Assert brand filter checkbox
    async assertBrandCheckbox(status){
        //assert the checkbox
        const checkbox = this.nothingLocator.locator(this.nothingCheckboxLocator);
        await this.reusableUtils.checkBoxAssert(checkbox,status);
    }

    

    

}

module.exports = SearchResultPage;