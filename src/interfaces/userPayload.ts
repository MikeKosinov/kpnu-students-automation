// export interface CreateUserPayload {
//   customer: {
//     email: string;
//     firstname: string;
//     lastname: string;
//   };
//   password: string;
// }
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;

  title: 'Mr' | 'Mrs';

  birth_date: number;
  birth_month: number;
  birth_year: number;

  firstname: string;
  lastname: string;

  company?: string;
  address1: string;
  address2?: string;

  country: string;
  zipcode: string;
  state: string;
  city: string;

  mobile_number: string;
}
