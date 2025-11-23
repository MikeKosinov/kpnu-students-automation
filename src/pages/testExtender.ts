import { test as base } from '@playwright/test';
import HomePage from './homePage';
import { LoginPage } from './auth/loginPage';
import RegistrationPage from './auth/registrationPage';
import HeaderComponent from './components/headerComponent';
import ProductPage from './productPage';
import AccountCreatedPage from './accountCreatedPage';
import NavigationComponent from './components/navigationComponent';
import CategoryProductPage from './categoryProductsPage';
import AddedToCardModal from './components/addedToCardModal';

type MyPages = {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  //Components
  headerComponent: HeaderComponent;
  productPage: ProductPage;
  accountCreated: AccountCreatedPage;
  navigarationComponent: NavigationComponent;
  caterogyProductsPage: CategoryProductPage;
  addedToCardModal: AddedToCardModal;
};

export const test = base.extend<MyPages>({
  homePage: async ({ page, isMobile }, use) => await use(new HomePage(page, isMobile)),
  loginPage: async ({ page, isMobile }, use) => await use(new LoginPage(page, isMobile)),
  registrationPage: async ({ page, isMobile }, use) => await use(new RegistrationPage(page, isMobile)),
  headerComponent: async ({ page, isMobile }, use) => await use(new HeaderComponent(page, isMobile)),
  productPage: async ({ page, isMobile }, use) => await use(new ProductPage(page, isMobile)),
  accountCreated: async ({ page, isMobile }, use) => await use(new AccountCreatedPage(page, isMobile)),
  navigarationComponent: async ({ page, isMobile }, use) => await use(new NavigationComponent(page, isMobile)),
  caterogyProductsPage: async ({ page, isMobile }, use) => await use(new CategoryProductPage(page, isMobile)),
  addedToCardModal: async ({ page, isMobile }, use) => await use(new AddedToCardModal(page, isMobile)),
});

export { expect } from '@playwright/test';
