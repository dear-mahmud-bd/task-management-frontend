/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCurrentToken } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { createSubTask } from "@/services/Task";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";

type SubTaskFormData = {
  title: string;
  tag?: string;
};

type SubTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: SubTaskFormData, taskId: string) => void;
  taskId: string; // ✅ Add this
};

export default function SubTaskModal({
  open,
  setOpen,
  onSubmit,
  taskId,
}: SubTaskModalProps) {
  const token = useAppSelector(useCurrentToken);
  const { register, handleSubmit, reset } = useForm<SubTaskFormData>();

  const handleAdd: SubmitHandler<SubTaskFormData> = async (data) => {
    const formData = {
      title: data.title,
      tag: data.tag,
      date: new Date().toISOString(), // make date iso formate...
    };
    console.log(data, taskId, formData);

    
    try {
      const res = await createSubTask(taskId, formData, token as string);
      if (res.status) {
        toast.success("Sub-Task added successfully!");
      } else {
        toast.error("Failed to add Sub-Tas");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to add Sub-Tas");
    }
    reset();
    setOpen(false);
    const modal = document.getElementById("subtask_modal") as HTMLDialogElement;
    modal?.close();
  };

  return (
    <dialog id="subtask_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Subtask</h3>
        <form onSubmit={handleSubmit(handleAdd)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Subtask Title"
            className="input input-bordered w-full"
          />
          <input
            {...register("tag")}
            type="text"
            placeholder="Subtask Tag"
            className="input input-bordered w-full"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Cancel</button>
            </form>
            <button type="submit" className="btn btn-primary btn-sm">
              <IoMdAdd className="mr-1" /> Add Subtask
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
