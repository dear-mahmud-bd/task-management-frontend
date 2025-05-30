/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const fetchAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Fetch all users error:", error);
    throw new Error(error.message || "Unknown error");
  }
};

export const updateUserProfile = async (
  token: string,
  updateUserDto: {
    _id: string;
    name?: string;
    title?: string;
    role?: "admin" | "developer";
  }
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updateUserDto),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Update profile error:", error);
    throw new Error(error.message || "Unknown error");
  }
};

export const activateUser = async (
  token: string,
  id: string,
  dto: {
    isActive: boolean;
  }
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/activate/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Activate user error:", error);
    throw new Error(error.message || "Unknown error");
  }
};