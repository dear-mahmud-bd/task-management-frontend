/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";

type TaskType = {
  title: string;
  date: string;
  priority: "low" | "normal" | "medium" | "high";
  assignedTo: string[];
  description: string;
  links: string[];
};

type EditTaskModalProps = {
  task: TaskType | null;
  onSave: (data: TaskType) => void;
};

const dummyUsers = [
  { id: 1, name: "Alice Doe" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Ray" },
];

const options = dummyUsers.map((user) => ({
  value: user.name,
  label: user.name,
}));

const EditTaskModal = ({ task, onSave }: EditTaskModalProps) => {
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

  const handleUpdate: SubmitHandler<any> = (data) => {
    const formatted: TaskType = {
      ...data,
      links: data.links?.split(",").map((l: string) => l.trim()) || [],
      assignedTo: Array.isArray(data.assignedTo)
        ? data.assignedTo
        : [data.assignedTo],
    };
    onSave(formatted);
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
              {...register("description")}
              className="textarea textarea-bordered w-full"
              placeholder="Task description..."
              rows={3}
            />
          </div>

          {/* Assigned To */}
          <div>
            <label className="label">
              <span className="label-text">Assigned To</span>
            </label>
            <Select
              isMulti
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
            <input
              {...register("links")}
              type="text"
              placeholder="Support Links (comma separated)"
              className="input input-bordered w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Cancel</button>
            </form>
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
