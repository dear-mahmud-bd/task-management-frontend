export interface IUser {
  _id: string;
  email: string;
  role: "developer" | "admin";
  iat?: number;
  exp?: number;
}