export interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  username: string;
  id: number;
}

export interface Requests {
  creator: number;
  current: string;
  delivery: number;
  destination: string;
  id: number;
  package_size: string;
  price: string;
  status: string;
}
export interface UserMini {
  email: string;
  id: number;
  phone_number: number;
  username: string;
}

export interface ClientRequestResponse {
  client_requests: Requests[];
  client: User[];
}
