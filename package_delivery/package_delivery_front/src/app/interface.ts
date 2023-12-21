export interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  username: string;
}

export interface UserMini {
  email: string;
  id: number;
  phone_number: number;
  username: string;
}
