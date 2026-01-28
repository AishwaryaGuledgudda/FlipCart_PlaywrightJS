const Library = require('../Base/Library');
const ElementAction = require('../utils/ElementAction');
class SearchPage{
    
    constructor(page) {
        this.page=page;
        this.elementAction = new ElementAction(this.page);
        //Selectors or Locators
        this.searchInput = 'input[name="q"]';
        this.pageTitle = '//img[@title="Flipkart"]';
    }

    //Method to perform search
    async performSearch(text){
        await this.elementAction.enterText(this.searchInput,text);
         await this.page.keyboard.press('Enter'); 
    }

    //Method to get title of the page
    async getTitle(){
        return await this.elementAction.getElementTitle(this.pageTitle);
    }
    
}
module.exports=SearchPage;