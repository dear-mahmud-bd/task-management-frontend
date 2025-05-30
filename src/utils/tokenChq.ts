/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export const isTokenValid = (token: string | null | undefined): boolean => {
  if (!token || typeof token !== "string") {
    console.warn("Token is missing or not a valid string.");
    return false;
  }

  // Optional: Basic JWT format check (should be 3 parts: header.payload.signature)
  const parts = token.split(".");
  if (parts.length !== 3) {
    console.warn("Token is malformed: does not have 3 parts.");
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // Optional: Check required fields
    if (!decoded.exp) {
      console.warn("Token is missing 'exp' claim.");
      return false;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.warn("Error decoding token:", error);
    return false;
  }
};
