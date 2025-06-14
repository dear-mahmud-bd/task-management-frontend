/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import clsx from "clsx";
import TaskAssets from "./TaskAssets";
import { avatarColors, PriorityType, StageType } from "@/constants";
import { getInitials } from "@/utils";
import { format } from "date-fns";
import TaskColor from "./TaskColor";
import { BiDetail, BiTrash } from "react-icons/bi";
import Link from "next/link";
import { trashTask } from "@/services/Task";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/authSlice";
import { toast } from "sonner";

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
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const handleConfirmDelete = async (selectedTaskId: string) => {
    // add window to confirmation
    const confirmed = window.confirm("Are you sure? You want to delete this!");
    if (!confirmed) return;
    try {
      const res = await trashTask(selectedTaskId, token as string);
      if (res.status) {
        toast.success("Task trashed successfully!");
      } else {
        toast.error(res.message || "Failed to delete task");
      }
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    } catch (error: any) {
      toast.error(error.message || "Error occurred while deleting");
    }
  };
  return (
    <>
      <div className="bg-white dark:bg-[#1f1f1f] rounded shadow p-4 flex flex-col justify-between h-full">
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
            href={`/dashboard/task/${task._id}`}
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
            assets={task?.links?.length}
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

        <div className="flex gap-2 w-full">
          {/* Add Subtask */}
          <Link
            href={`/dashboard/task/${task._id}`}
            className="tooltip tooltip-bottom btn btn-sm btn-outline flex items-center gap-2 text-gray-600  text-center"
            data-tip="Open task details..."
          >
            <BiDetail className="text-lg" />
            See Details
          </Link>

          {user?.role === "admin" && (
            <button
              onClick={() => handleConfirmDelete(task._id)}
              className="btn btn-sm btn-outline flex items-center gap-2 text-red-600 justify-start"
            >
              <BiTrash className="text-lg" />
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}
