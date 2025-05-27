/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BoardView from "@/components/Module/Task/BoardView";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { tasks } from "@/utils/dummydata";

export default function TasksPage() {
  const savedUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);

  const data = tasks;
  console.log("Task User- ", savedUser?.role, data);

  const isAdmin = savedUser?.role === "admin" ? true : false;

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tasks
        </h1>
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded btn"
          >
            <IoMdAdd className="text-lg" />
            Create Task
          </button>
        )}
      </div>

      <BoardView tasks={data} />
      {/* <AddTask open={open} setOpen={setOpen} /> */}
    </div>
  );
}
