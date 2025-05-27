export interface IUser {
  _id: string;
  name?: string;
  email: string;
  role: "developer" | "admin" | "manager";
  iat?: number;
  exp?: number;
}
