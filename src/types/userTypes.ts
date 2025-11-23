export type LoginDataType = {
  email: string;
  password: string;
};

// export type CreateUserType = {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// };
export type CreateUserType = {
  title: 'Mr' | 'Mrs';
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  name: string;
  // account info
  birthDay: string;
  birthMonth: string;
  birthYear: string;

  // address info
  company: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
};
