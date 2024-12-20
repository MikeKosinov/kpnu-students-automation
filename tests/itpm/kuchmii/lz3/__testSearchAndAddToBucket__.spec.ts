import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { productPayload } from '@utils/data/productUIPayload';

test.describe(`Search and add product to cart`, async () => {
  const createdCustomerPayload = getUserApiPayload();
  const { heroHoodie } = productPayload;
  let customerId: string;

  test.beforeEach(async ({ homePage }: any) => {
    customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
    await homePage.load();
  });

  test.afterEach(async () => {
    await userInstance.deleteUser(customerId);
  });

  test(`Verify user can search, select, and add a product to the cart.`, async ({ homePage, loginPage, productPage }: any) => {
    await homePage.clickOnSignInLink();
    await loginPage.fillLoginForm({
      email: createdCustomerPayload.customer.email,
      password: createdCustomerPayload.password,
    });
    await loginPage.clickOnSignInButton();

    await homePage.searchItem(heroHoodie.name);
    await homePage.verifySearchedProductName(heroHoodie.name);
    await homePage.clickOnSearchedProductImage(heroHoodie.name);

    await productPage.selectProductSize(heroHoodie.size);
    await productPage.selectProductColor(heroHoodie.color);
    await productPage.selectProductQuantity(1);

    await productPage.clickOnAddToCartButton();

    await productPage.verifyProductCountInCart('1');
  });
});
