import { faker } from '@faker-js/faker';
import { CreateUserType } from 'src/types/userTypes';

class FakerData {
  // generateNewUserData = (): CreateUserType => {
  //   return {
  //     firstname: faker.person.firstName(),
  //     lastname: faker.person.lastName(),
  //     email: 'user' + `${Date.now()}` + '@example.com',
  //     password: 'Test_12345',
  //   };
  // };
  generateNewUserData = (): CreateUserType => {
    const titles: Array<'Mr' | 'Mrs'> = ['Mr', 'Mrs'];
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      title: faker.helpers.arrayElement(titles),
      firstname: firstName,
      lastname: lastName,
      name: firstName + ' ' + lastName,
      email: `user_${Date.now()}@example.com`,
      password: 'Test_12345', // відповідає вимогам 6+ chars
      birthDay: faker.number.int({ min: 1, max: 28 }).toString(),
      birthMonth: faker.number.int({ min: 1, max: 12 }).toString(),
      birthYear: faker.number.int({ min: 1990, max: 2005 }).toString(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States', // існує в списку на AutomationExercise
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number({ style: 'international' }),
    };
  };
}

export const fakerDataGenerator = new FakerData();
