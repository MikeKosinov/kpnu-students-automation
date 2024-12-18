import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';

test.describe(`Add items to cart related scenarios`, async () => {
    const createdCustomerPayload = getUserApiPayload();
    const product = {
        name: 'Typhon Performance Fleece-lined Jacket',
        quantity1: 5,
        quantity2: 10,
        countInCart: '15',
        color: 'Red',
        size: 'L'
    };
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
        await homePage.searchItem(product.name);
        await homePage.verifySearchedProductName(product.name);

        await homePage.clickOnSearchedProductImage(product.name);
        await productPage.selectProductQuantity(product.quantity1);
        await productPage.selectProductColor(product.color);
        await productPage.selectProductSize(product.size);
        await productPage.clickOnAddToCartButton();

        await productPage.selectProductQuantity(product.quantity2);
        await productPage.clickOnAddToCartButton();

        await productPage.verifyProductCountInCart(product.countInCart);
    });
});
