/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IoMdAdd } from "react-icons/io";
import BoardView from "@/components/Module/Task/BoardView";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { tasks } from "@/utils/dummydata";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";

const dummyUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Dan" },
  { id: 5, name: "Ena" },
  { id: 6, name: "Falcon" },
];
const options = dummyUsers.map((u) => ({
  value: u.id,
  label: u.name,
}));

export default function TasksPage() {
  const savedUser = useAppSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const data = tasks;
  const isAdmin = savedUser?.role === "admin";

  const onSubmit = (formData: FieldValues) => {
    console.log("New Task Data:", formData);
    reset();
    (document.getElementById("task_modal") as HTMLDialogElement).close();
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tasks
        </h1>
        {isAdmin && (
          <button
            onClick={() =>
              (
                document.getElementById("task_modal") as HTMLDialogElement
              ).showModal()
            }
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded btn"
          >
            <IoMdAdd className="text-lg" /> Create Task
          </button>
        )}
      </div>

      <BoardView tasks={data} />

      {/* Task Modal */}
      <dialog id="task_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-4">
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
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Task Description"
                className="textarea textarea-bordered w-full"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Team</span>
              </label>
              <Select
                isMulti
                options={options}
                placeholder="Assigned To..."
                onChange={(selected) => {
                  const selectedNames = selected.map((s) => s.label);
                  setValue("assignedTo", selectedNames); // use setValue from react-hook-form
                }}
                className="text-black"
              />
            </div>

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

            <div>
              <label className="label">
                <span className="label-text">Important Links</span>
              </label>
              <input
                {...register("links")}
                type="text"
                placeholder="Support Links (comma separated)"
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>

              <button type="submit" className="btn btn-primary">
                Create A New Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
