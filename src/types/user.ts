export interface IUser {
  _id: string;
  name?: string;
  email: string;
  role: "developer" | "admin";
  iat?: number;
  exp?: number;
}