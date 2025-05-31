/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Activities from "@/components/Module/TaskDetails/Activities";
import SubTasks from "@/components/Module/TaskDetails/SubTasks";
import Tabs from "@/components/Module/TaskDetails/Tabs";
import TaskAssets from "@/components/Module/TaskDetails/TaskAssets";
import TaskDescription from "@/components/Module/TaskDetails/TaskDescription";
import TaskHeader from "@/components/Module/TaskDetails/TaskHeader";
import TaskLinks from "@/components/Module/TaskDetails/TaskLinks";
import TaskStats from "@/components/Module/TaskDetails/TaskStats";
import TeamSection from "@/components/Module/TaskDetails/TeamSection";
import { useParams } from "next/navigation";
import { getSingleTask } from "@/services/Task";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/authSlice";
import Loading from "@/components/Shared/Loading";
import { MdOutlineEdit } from "react-icons/md";
import EditTaskModal from "@/components/Module/Task/EditTaskModal";
import { FaPlus } from "react-icons/fa";
import SubTaskModal from "@/components/Module/Task/SubTaskModal";

const dummyTask = {
  assets: [
    "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
};

const TaskDetailsPage = () => {
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);

  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const [selected, setSelected] = useState(0);
  const [task, setTask] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const params = useParams();
  const taskId = params?.taskId as string;

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getSingleTask(taskId, token as string);
      setTask(taskData);
      setSelectedTask(taskData);
    };
    if (taskId && token) fetchTask();
  }, [taskId, token]);

  if (!task) return <Loading />;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{task?.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() =>
              (
                document.getElementById("subtask_modal") as HTMLDialogElement
              )?.showModal()
            }
            className="btn btn-sm btn-outline flex items-center gap-2 text-green-600"
          >
            <FaPlus className="text-sm" />
            Subtask
          </button>
          {currentUser?.role === "admin" && (
            <button
              onClick={() =>
                (
                  document.getElementById(
                    "edit_task_modal"
                  ) as HTMLDialogElement
                )?.showModal()
              }
              className="btn btn-sm btn-outline flex items-center gap-2 text-blue-600"
            >
              <MdOutlineEdit className="text-lg" />
              Edit
            </button>
          )}
        </div>
      </div>

      <Tabs selected={selected} setSelected={setSelected} />

      {selected === 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskHeader task={task} />
            <TaskStats task={task} />
            <TeamSection team={task?.team} />
            <SubTasks subTasks={task?.subTasks} taskId={task?._id} />
          </div>
          <div className="space-y-6">
            <TaskDescription description={task?.description} />
            <TaskLinks links={task?.links} />
            <TaskAssets assets={dummyTask.assets} />
          </div>
        </div>
      ) : (
        <Activities activities={task?.activities} taskId={task?._id} />
      )}

      {/* ✅ Modals */}
      <EditTaskModal
        task={selectedTask}
        onSave={(updatedTask) => {
          setSelectedTask(updatedTask);
          setTask(updatedTask);
        }}
      />
      <SubTaskModal
        open={isSubTaskModalOpen}
        setOpen={setIsSubTaskModalOpen}
        taskId={task._id}
        onSubmit={(newSubtask) => {
          setTask((prev: any) => ({
            ...prev,
            subTasks: [...(prev?.subTasks || []), newSubtask],
          }));
        }}
      />
    </div>
  );
};

export default TaskDetailsPage;
