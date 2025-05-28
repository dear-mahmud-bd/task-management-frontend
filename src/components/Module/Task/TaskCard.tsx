/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineEdit,
} from "react-icons/md";
import clsx from "clsx";
import TaskAssets from "./TaskAssets";
import { avatarColors, PriorityType, StageType } from "@/constants";
import { getInitials } from "@/utils";
import { format } from "date-fns";
import TaskColor from "./TaskColor";
import { BiTrash } from "react-icons/bi";
import Link from "next/link";
import SubTaskModal from "./SubTaskModal";
import EditTaskModal from "./EditTaskModal";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  in_progress: "bg-yellow-600",
  completed: "bg-green-600",
};

export default function TaskCard({ task }: { task: any }) {
  const [open, setOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(task);

  return (
    <>
      <div className="bg-white dark:bg-[#1f1f1f] rounded shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <div
            className={clsx(
              "flex items-center gap-1 text-sm font-medium",
              PRIOTITYSTYELS[task?.priority as PriorityType]
            )}
          >
            <span className="text-lg">
              {ICONS[task?.priority as PriorityType]}
            </span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>
          {/* <TaskDialog task={task} /> */}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <TaskColor className={TASK_TYPE[task?.stage as StageType]} />
          <Link
            href={`/dashboard/task/abc`}
            className="tooltip tooltip-right"
            data-tip="Open task details..."
          >
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
              {task?.title}
            </h4>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {/* {formatDate(new Date(task?.date))} */}
          {format(new Date(task.date), "MMM dd, yyyy")}
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

        <div className="flex items-center justify-between text-sm mb-3">
          <TaskAssets
            activities={task?.activities?.length}
            subTasks={task?.subTasks}
            assets={task?.assets?.length}
          />
          <div className="flex -space-x-2">
            {/* {task?.team?.map((m, i) => (
              <div key={i} className={clsx('w-7 h-7 text-white text-sm flex justify-center items-center rounded-full -mr-1', BGS[i % BGS.length])}>
                <UserInfo user={m} />
              </div>
            ))} */}
            {task.team.map((member: any, i: number) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${
                  avatarColors[i % avatarColors.length]
                } text-white text-xs flex items-center justify-center`}
              >
                {getInitials(member.name)}
              </div>
            ))}
          </div>
        </div>

        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-base line-clamp-1 text-black dark:text-gray-400">
              {task?.subTasks[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600 dark:text-gray-500">
                {format(new Date(task?.subTasks[0]?.date), "MMM dd, yyyy")}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                {task?.subTasks[0]?.tag}
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="py-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-500">No Sub-Task</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {/* Add Subtask */}
          <button
            onClick={() => (document.getElementById("subtask_modal") as HTMLDialogElement | null)?.showModal()}
            className="btn btn-sm btn-outline flex items-center gap-2 text-gray-600  text-center"
          >
            <IoMdAdd className="text-lg" />
            Add Subtask
          </button>
          <SubTaskModal
            open={open}
            setOpen={setOpen}
            onSubmit={(subtask) => console.log("New Subtask:", subtask)}
          />

          <div className="flex justify-between">
            {/* Edit Button */}
            <button
              onClick={() => (document.getElementById("edit_task_modal") as HTMLDialogElement | null)?.showModal()}
              className="btn btn-sm btn-outline flex items-center gap-2 text-blue-600 justify-start"
            >
              <MdOutlineEdit className="text-lg" />
              Edit
            </button>

            <EditTaskModal
              task={selectedTask}
              onSave={(updatedTask) => {
                console.log("Updated Task:", updatedTask);
                setSelectedTask(updatedTask);
              }}
            />

            {/* Delete Button */}
            <button
              onClick={() => console.log("Delete clicked")}
              className="btn btn-sm btn-outline flex items-center gap-2 text-red-600 justify-start"
            >
              <BiTrash className="text-lg" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* add subtask modal (only sub-task title and tag input field)  */}
      {/* add edit modal (same as AddTaskModal also show info) */}
    </>
  );
}
