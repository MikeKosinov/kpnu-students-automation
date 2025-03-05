import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';
import { CreateUserPayload } from 'src/interfaces/userPayload';
import { CreateUserType } from 'src/types/userTypes';

export function getUserApiPayload(userData: CreateUserType = fakerDataGenerator.generateNewUserData()): CreateUserPayload {
  return {
    customer: {
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
    },
    password: userData.password,
  };
}
