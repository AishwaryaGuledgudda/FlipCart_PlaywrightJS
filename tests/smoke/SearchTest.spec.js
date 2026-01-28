const Library = require('../../Base/Library');
const SearchPage = require('../../pages/SearchPage');
const {test,expect} = require('@playwright/test')
const SearchResultPage = require('../../pages/SearchResultPage');

test('Search for a product on Flipkart', async () => {
const library = new Library();

//Launch chrome page
const page = await library.launchBrowser();

//Open flipkart website
await library.goToFLipkart();

//Perform search of Mobile device
 const searchPage = new SearchPage(page);
await searchPage.performSearch('Mobile');

//Get title of the page and assert
const title = await searchPage.getTitle();
expect(title).toBe("Flipkart");
console.log("Title :" + title);
console.log("Home page is displayed successfully");


//Get all the item details displayed for the search
const searchResultPage = new SearchResultPage(page);
const item = await searchResultPage.getAllItemDetails();
item.forEach((itemDetail, index) => {
    console.log("*****************")
    console.log(`Item ${index + 1}: ${itemDetail}`);
});

//Get third item details displayed for the search
const thirdItemdetails = await searchResultPage.getThirdItemDetails();
console.log("Third Item details:");
thirdItemdetails.forEach((detail) => {
    console.log("$$$$$$$$$$$$$$$$$$$")
    console.log(`Detail : ${detail}`);
});

//Select min filter
await searchResultPage.minDropdown();
console.log("Minimum filter selected");

//select max filter
await searchResultPage.maxDropdown();
console.log("Maximum filter selected");

//Select brand filter
await searchResultPage.selectBrand();

//Assert brand checkbox
await searchResultPage.assertBrandCheckbox(true);


//Get filtered item details displayed for the search
await page.waitForTimeout(3000);    //wait for 3 seconds to load the filtered results
const filteredItemdetails = await searchResultPage.getFilteredItemDetails();
console.log("Filtered Item details:");
filteredItemdetails.forEach((detail) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%")
    console.log(`Detail : ${detail}`);
});

//Close browser
await library.closeBrowser();


});