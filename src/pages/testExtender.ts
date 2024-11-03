import { test as base } from '@playwright/test';
import HomePage from './homePage';
import { LoginPage } from './auth/loginPage';
import RegistrationPage from './auth/registrationPage';
import HeaderComponent from './components/headerComponent';
import ProductPage from './productPage';

type MyPages = {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  //Components
  headerComponent: HeaderComponent;
  productPage: ProductPage;
};

export const test = base.extend<MyPages>({
  homePage: async ({ page, isMobile }, use) => await use(new HomePage(page, isMobile)),
  loginPage: async ({ page, isMobile }, use) => await use(new LoginPage(page, isMobile)),
  registrationPage: async ({ page, isMobile }, use) => await use(new RegistrationPage(page, isMobile)),
  headerComponent: async ({ page, isMobile }, use) => await use(new HeaderComponent(page, isMobile)),
  productPage: async ({ page }, use) => await use(new ProductPage(page)),
});

export { expect } from '@playwright/test';
