import { test, expect } from '@testExtenter';
import { uiConst } from '@utils/constants/uiConst';

// Feature: Cart of automationexercise.com
// Scenario: Add product to cart from products page, verify it in the cart and remove it
test.describe(`LZ3 Demchenko - cart`, async () => {
  // full-screen Google ads (#google_vignette) on the site catch clicks, so ad requests are blocked
  test.beforeEach(async ({ page }) => {
    await page.route(/googlesyndication|doubleclick|adservice\.google|googleadservices|fundingchoicesmessages/, (route) => route.abort());
  });

  test(`Add product to cart from products page, verify it in the cart and remove it`, async ({
    page,
    homePage,
    navigarationComponent,
    productPage,
    addedToCardModal,
  }) => {
    const productIndex = 1;
    const productCard = page.locator('.features_items .product-image-wrapper').nth(productIndex);
    const cartRows = page.locator('#cart_info_table tbody tr');

    // Given I am on the home page
    await homePage.load();

    // When I open "Products" page
    await navigarationComponent.clickOnMenuItem(uiConst.navigationMenu.Products);
    await test.step(`Wait until "Products" page is opened`, async () => {
      await expect(page).toHaveURL(/\/products/);
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });
    // Then "All Products" page with product list is displayed
    await productPage.verifyProductPageTitle();
    await productPage.verifyPorductsListIsDisplayed();

    // When I remember name and price of the product and add it to cart
    const productName = (await productCard.locator('.productinfo p').textContent()).trim();
    const productPrice = (await productCard.locator('.productinfo h2').textContent()).trim();
    // the product is added by an AJAX request, so the test waits for the server answer
    const addToCartResponse = page.waitForResponse((response) => response.url().includes('/add_to_cart/'));
    await productPage.clickOnAddToCartButtonByIndex(productIndex);
    await addToCartResponse;
    // Then modal window with "added to cart" message is shown
    await addedToCardModal.veridyModalIsVisible();
    await addedToCardModal.verifyAddedToCartMessage();

    // When I click "View Cart" in the modal window
    await addedToCardModal.clickOnViewCartButton();
    // Then cart page is opened
    await productPage.verifyPageURL('/view_cart');

    await test.step(`Then cart contains exactly 1 product`, async () => {
      await expect(cartRows).toHaveCount(1);
    });
    await test.step(`And product name in the cart is "${productName}"`, async () => {
      await expect(cartRows.first().locator('.cart_description h4 a')).toHaveText(productName);
    });
    await test.step(`And product price in the cart is "${productPrice}"`, async () => {
      await expect(cartRows.first().locator('.cart_price p')).toHaveText(productPrice);
    });
    await test.step(`And quantity is 1 and total price is "${productPrice}"`, async () => {
      await expect(cartRows.first().locator('.cart_quantity button')).toHaveText('1');
      await expect(cartRows.first().locator('.cart_total_price')).toHaveText(productPrice);
    });

    await test.step(`When I remove the product from the cart`, async () => {
      await cartRows.first().locator('.cart_quantity_delete').click();
    });
    await test.step(`Then the cart is empty and "Cart is empty!" message is shown`, async () => {
      await expect(cartRows).toHaveCount(0);
      await expect(page.locator('#empty_cart')).toBeVisible();
      await expect(page.locator('#empty_cart')).toContainText('Cart is empty!');
    });
  });
});
