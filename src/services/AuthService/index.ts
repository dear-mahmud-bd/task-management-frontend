"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    // console.log(result);

    if (result?.status) {
      (await cookies()).set("token", result?.token);
    }
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};


export const logout = async () => {
  (await cookies()).delete("token");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("token")?.value;
  // console.log(accessToken);
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    // console.log(decodedData);
    return decodedData;
  } else {
    return null;
  }
};
