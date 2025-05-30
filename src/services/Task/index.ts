"use server";

import { FieldValues } from "react-hook-form";

export const getDashboardStats = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/task/statistics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return await res.json();
};

export const fetchTasks = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/task/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    return data.tasks;
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return [];
  }
};

export const createTask = async (token: string, taskData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
};

