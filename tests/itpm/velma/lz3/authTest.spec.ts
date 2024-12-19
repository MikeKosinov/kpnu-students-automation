import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { productPayload } from '@utils/data/productUIPayload';

test.describe(`Add product to wishlist scenarios`, async () => {
  const createdCustomerPayload = getUserApiPayload();
  const { heroHoodie } = productPayload;
  let customerId: string;

  test.beforeEach(async ({ homePage }) => {
    customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
    await homePage.load();
  });

  test.afterEach(async () => {
    await userInstance.deleteUser(customerId);
  });

  test(`Verify product can be added to wishlist`, async ({ homePage, loginPage, productPage }) => {
    await homePage.clickOnSignInLink();
    await loginPage.fillLoginForm({
      email: createdCustomerPayload.customer.email,
      password: createdCustomerPayload.password,
    });
    await loginPage.clickOnSignInButton();

    await homePage.searchItem(heroHoodie.name);
    await homePage.verifySearchedProductName(heroHoodie.name);

    await homePage.clickOnSearchedProductImage(heroHoodie.name);

    await productPage.clickOnAddToWishListButton();

    await productPage.verifyAddToWishlistSuccessMessage(heroHoodie.name);
  });
});