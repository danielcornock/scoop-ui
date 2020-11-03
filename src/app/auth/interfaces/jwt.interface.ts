export interface IJwt {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
