import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { LoginDataType } from 'src/types/userTypes';
import { productPayload } from '@utils/data/productUIPayload';

test.describe(`Add items to cart related scenarios`, async () => {
  const createdCustomerPayload = getUserApiPayload();
  const { heroHoodie } = productPayload;
  const expectedLoggedInMessage = `${createdCustomerPayload.customer.firstname} ${createdCustomerPayload.customer.lastname}`;
  let customerId: string;

  test.beforeEach(async ({ homePage }) => {
    customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
    await homePage.load();
  });

  test.afterEach(async () => {
    await userInstance.deleteUser(customerId);
  });

  test(`Verify counter for products in cart visible for logged in user.`, async ({ homePage, loginPage, productPage }) => {
    await homePage.clickOnSignInLink();
    await loginPage.fillLoginForm({ email: createdCustomerPayload.customer.email, password: createdCustomerPayload.password });
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
