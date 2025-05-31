/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

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
  } catch (error: any) {
    return Error(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/logout`, {
      method: "POST",
    });
    console.log(res);
    return { status: true, message: "Logged out successfully" };
  } catch (error: any) {
    return new Error(error);
  }
};

export const setTokenFromRedux = async (token: string) => {
  (await cookies()).set("token", token);
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

export const getUserNotifications = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/notification`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { status: false, message: "Failed to fetch notifications" };
  }
};

export const markNotificationAsRead = async (
  token: string,
  isReadType: "single" | "all",
  id?: string
) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("isReadType", isReadType);
    if (id) queryParams.append("id", id);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/notification/read?${queryParams.toString()}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { status: false, message: "Failed to mark as read" };
  }
};
