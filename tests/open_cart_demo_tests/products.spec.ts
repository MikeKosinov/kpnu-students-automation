import { test } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';
test.describe(`Verify login page`, async () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test('Verify seach products by filters from home page', async ({ homePage, caterogyProductsPage }) => {
    await homePage.selectCategory(uiConst.filters.GeneralCategories.Men, uiConst.filters.MenCategories.Tshirts);
    await caterogyProductsPage.verifyCategoryTitle(uiConst.filters.GeneralCategories.Men, uiConst.filters.MenCategories.Tshirts);
    await caterogyProductsPage.verifyNumberOfProductsDisplayed(6);
    await caterogyProductsPage.verifyProductNameAndDespription('Rs. 400', 'Men Tshirt');
  });

  test('Verify that home page displayed featured and recommended items list', async ({ homePage }) => {
    await homePage.verifyFeaturedItemsDisplayed();
    await homePage.verifyRecommendedItemsDisplayed();
  });

  test('Add product to cart from products page', async ({ navigarationComponent, productPage, addedToCardModal }) => {
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.Products);
    await productPage.verifyProductPageTitle();
    await productPage.verifySearchedProductIsDisplayed('Rs. 400', 1);
    await productPage.clickOnAddToCartButtonByIndex(1);
    await addedToCardModal.veridyModalIsVisible();
    await addedToCardModal.verifyAddedToCartMessage();
  });
  // this test has a defect - search functionality on products page is not working correctly
  test(`Search product from products page`, async ({ navigarationComponent, productPage }, testInfo) => {
    testInfo.annotations.push({ type: 'bug', description: 'Search functionality on products page is not working correctly' });
    test.skip(true, 'Skipped due to bug in search functionality');
    const productName = 'Rs. 400';
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.Products);
    await productPage.verifyProductPageTitle();
    await productPage.searchForProduct(productName);
    await productPage.verifySearchedProductIsDisplayed(productName, 1);
  });
});
