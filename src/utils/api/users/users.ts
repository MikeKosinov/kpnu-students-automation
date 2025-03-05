import { CreateUserPayload } from 'src/interfaces/userPayload';
import ApiClient from '../apiClient';
import { expect } from '@testExtenter';

class User {
  private readonly apiClient: ApiClient;
  constructor() {
    this.apiClient = new ApiClient('/customers');
  }

  async createUser(userData: CreateUserPayload) {
    const response = await this.apiClient.post(userData);
    console.log(response);
    expect(response.status).toBe(200);
    console.log(`User created with id: ${response.data.id}`);
    return response;
  }

  async getUserById(userId: string | number) {
    this.apiClient.endpoint = `/customers/${userId}`;
    const response = await this.apiClient.get({ headers: { Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}` } });
    expect(response.status).toBe(200);
    return response;
  }

  async deleteUser(userId: number | string) {
    this.apiClient.endpoint = `/customers/${userId}`;
    const response = await this.apiClient.delete({ headers: { Authorization: `Bearer ${process.env.ADMIN_ACCESS_TOKEN}` } });
    expect(response.status).toBe(200);
    console.log(`Customer with id: ${userId} was deleted`);
    return response;
  }

  async getUserAuthToken(credentials: { email: string; password: string }) {
    this.apiClient.endpoint = '/integration/customer/token';
    return await this.apiClient.getAuthToken(credentials);
  }
}

export const userInstance = new User();
