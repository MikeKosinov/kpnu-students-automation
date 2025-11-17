import { expect, test } from '@testExtenter';
import { userInstance } from '@utils/api/users/users';
import { getUserApiPayload } from '@utils/data/userApiPayloads';
import { CreateUserPayload } from 'src/interfaces/userPayload';

test.describe('Customer related API tests', async () => {
  let createdCustomerPayload: CreateUserPayload;
  let expectedCustomerResponse: Record<string, unknown>;

  test.beforeEach(async () => {
    createdCustomerPayload = getUserApiPayload();
    expectedCustomerResponse = {
      id: expect.any(Number) || expect.any(String),
      email: createdCustomerPayload.email,
      firstname: createdCustomerPayload.firstname,
      lastname: createdCustomerPayload.lastname,
    };
  });

  test('CRUD customer operations test', async () => {
    const customer = await userInstance.createUser(createdCustomerPayload);
  });
});
