import { faker } from '@faker-js/faker';
import { CreateUserType } from 'src/types/userTypes';

class FakerData {
  generateNewUserData = (): CreateUserType => {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: 'user' + `${Date.now()}` + '@example.com',
      password: 'Test_12345',
    };
  };
}

export const fakerDataGenerator = new FakerData();
