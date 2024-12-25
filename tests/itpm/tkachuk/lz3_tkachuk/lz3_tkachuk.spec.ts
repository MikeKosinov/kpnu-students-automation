import { test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { productPayload } from '@utils/data/productUIPayload';

test.describe(`Wishlist Feature Scenarios`, async () => {
  const createdCustomerPayload = getUserApiPayload();
  const { heroHoodie } = productPayload;
  let customerId: string;

  // Виконується перед кожним тестом: створюємо користувача і завантажуємо домашню сторінку
  test.beforeEach(async ({ homePage }) => {
    customerId = (await userInstance.createUser(createdCustomerPayload)).data.id;
    await homePage.load();
  });

  // Виконується після кожного тесту: видаляємо створеного користувача
  test.afterEach(async () => {
    await userInstance.deleteUser(customerId);
  });

  // Основний тест: перевірка додавання товару до списку бажань
  test(`User can successfully add a product to the wishlist`, async ({ homePage, loginPage, productPage }) => {
    // Крок 1: Увійти в систему
    await homePage.clickOnSignInLink();
    await loginPage.fillLoginForm({
      email: createdCustomerPayload.customer.email,
      password: createdCustomerPayload.password,
    });
    await loginPage.clickOnSignInButton();

    // Крок 2: Знайти необхідний товар
    await homePage.searchItem(heroHoodie.name);
    await homePage.verifySearchedProductName(heroHoodie.name);

    // Крок 3: Перейти на сторінку деталей товару
    await homePage.clickOnSearchedProductImage(heroHoodie.name);

    // Крок 4: Додати товар до списку бажань
    await productPage.clickOnAddToWishListButton();

    // Крок 5: Перевірити, чи з'явилося повідомлення про успішне додавання
    await productPage.verifyAddToWishlistSuccessMessage(heroHoodie.name);
  });
});
