/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCurrentToken } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { updateTask } from "@/services/Task";
import { fetchAllUsers } from "@/services/User";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { toast } from "sonner";

type TaskType = {
  _id: string;
  title: string;
  date: string;
  priority: "low" | "normal" | "medium" | "high";
  assignedTo: string[];
  description: string;
  links: string[];
};

type EditTaskModalProps = {
  task: TaskType;
  onSave: (data: TaskType) => void;
};

const EditTaskModal = ({ task, onSave }: EditTaskModalProps) => {
  const token = useAppSelector(useCurrentToken);
  const [users, setUsers] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskType>({
    defaultValues: {
      title: "",
      date: "",
      priority: "normal",
      assignedTo: [],
      description: "",
      links: [],
    },
  });

  // get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers(token as string);
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
        console.error(error);
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        date: task.date?.split("T")[0] || "",
        priority: task.priority,
        assignedTo: task.assignedTo || [],
        description: task.description,
        links: task.links?.join(", "),
      } as any);
    }
  }, [task, reset]);

  const options = users.map((u: any) => ({
    value: u._id,
    label: `${u.name} - ${u.title}`,
  }));

  const handleUpdate: SubmitHandler<any> = async (formData) => {
    const taskData = {
      title: formData.title,
      team: formData.assignedTo,
      stage: "todo",
      priority: formData.priority,
      date: new Date(formData.date).toISOString(),
      description: formData.description,
      assets: [],
      links: formData.links
        ? formData.links.split(",").map((link: string) => link.trim())
        : [],
    };
    try {
      const res = await updateTask(task._id, taskData, token as string);
      if (res.status) {
        toast.success("Task updated successfully!");
      } else {
        toast.error("Failed to update task");
      }
      reset();
      (document.getElementById("task_modal") as HTMLDialogElement)?.close();
    } catch (error: any) {
      toast.error(error.message || "Failed to update task");
    }
    console.log("taskData: ", taskData);
    (document.getElementById("edit_task_modal") as HTMLDialogElement)?.close();
  };

  return (
    <dialog id="edit_task_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-1">
          {/* Title */}
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Task description..."
              rows={2}
            />
          </div>

          {/* Assigned To */}
          <div>
            <label className="label">
              <span className="label-text">Assigned To</span>
            </label>
            <Select
              isMulti
              required
              options={options}
              placeholder="Assigned To..."
              defaultValue={options.filter((opt) =>
                task?.assignedTo?.includes(opt.value)
              )}
              onChange={(selected) => {
                const selectedNames = selected.map((s) => s.value);
                setValue("assignedTo", selectedNames);
              }}
              className="text-black"
            />
          </div>

          {/* Date and Priority */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Task Date</span>
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register("priority", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Links */}
          <div>
            <label className="label">
              <span className="label-text">Important Links</span>
            </label>
            <textarea
              {...register("links")}
              className="textarea textarea-bordered w-full"
              placeholder="Support Links (comma separated)"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                const modal = document.getElementById(
                  "edit_task_modal"
                ) as HTMLDialogElement;
                modal?.close();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
