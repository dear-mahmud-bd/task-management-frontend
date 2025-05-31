/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getSingleTask = async (id: string, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Ensures fresh data
    });
    const data = await res.json();
    return data.task;
  } catch (error) {
    console.error("Fetch single task error:", error);
    return null;
  }
};

export const updateTask = async (
  id: string,
  updatedData: any,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/task/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Update task error:", error);
    return {
      status: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};

export const createSubTask = async (
  taskId: string,
  subTaskData: any,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/task/create-subtasks/${taskId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subTaskData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Create subtask error:", error);
    return {
      status: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};

export const updateSubTaskStatus = async (
  taskId: string,
  subTaskId: string,
  status: boolean,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/task/subtasks/status/${taskId}/${subTaskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Update subtask status error:", error);
    return {
      status: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};
