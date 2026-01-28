
class ElementAction {

    constructor(page){
        this.page=page;
    }

    //Enter test in input field
    async enterText(selector, text){
        try{
        await this.page.fill(selector, text);
        } catch(error){
            throw new Error("Entering text failed");
        }
    }

    //Click on element
    async click(selector){
        try{
            await this.page.click(selector);
        } catch(error) {
            throw new Error("Click failed");
        }
        
    }

    //Get title of the page
    async getPageTitle(){
        try{
            const title = await this.page.title();
            console.log(title);
            return title;
        } catch(error){
            throw new Error("Could not get the title");
        }
    }

    async getElementTitle(selectorOrXpath){
        try{ 
        const title = await this.page.locator(selectorOrXpath).getAttribute('title');
        return title;
    } catch(error){
        throw new Error("could not get the title")
    }
}

}

module.exports = ElementAction;