import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';

test.describe(`Add Hero Hoodie to Cart without Log In`, async () => {
  const createdCustomerPayload = getUserApiPayload();
  let customerId: string;
  test.beforeEach(async ({ homePage }) => {
    customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
    await homePage.load();
  });
  test.afterEach(async () => {
    await userInstance.deleteUser(customerId);
  });
  const item = {
    name: 'Hero Hoodie',
    size: 'M',
    color: 'Black',
    quantity: 1
  };
  const itemInCart = {
    name: 'Hero Hoodie',
    quantity: '1'
  };
  test(`Verify item Hero Hoodie in Cart.`, async ({ homePage, productPage }) => {
    await homePage.searchItem(item.name);
    await homePage.verifySearchedProductName(item.name);
    await homePage.clickOnSearchedProductImage(item.name);
    await productPage.selectProductSize(item.size);
    await productPage.selectProductColor(item.color);
    await productPage.selectProductQuantity(item.quantity);
    await productPage.clickOnAddToCartButton();
    await productPage.verifyProductName(itemInCart.name);
    await productPage.verifyProductCountInCart(itemInCart.quantity);
  });
});
