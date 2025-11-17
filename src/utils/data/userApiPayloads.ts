import { fakerDataGenerator } from '@utils/helpers/fakerGeneratedData';
import { CreateUserPayload } from 'src/interfaces/userPayload';
import { CreateUserType } from 'src/types/userTypes';

export function getUserApiPayload(userData: CreateUserType = fakerDataGenerator.generateNewUserData()): CreateUserPayload {
  return {
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    password: userData.password,
    name: userData.firstname + ' ' + userData.lastname,
    title: userData.title,
    birth_date: parseInt(userData.birthDay, 10),
    birth_month: parseInt(userData.birthMonth, 10),
    birth_year: parseInt(userData.birthYear, 10),
    company: userData.company,
    address1: userData.address1,
    address2: userData.address2,
    country: userData.country,
    zipcode: userData.zipcode,
    state: userData.state,
    city: userData.city,
    mobile_number: userData.mobile,
    // additional fields can be added here if required by the API
  };
}
