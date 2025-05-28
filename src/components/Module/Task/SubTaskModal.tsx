"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

type SubTaskFormData = {
  title: string;
  tag?: string;
};

type SubTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: SubTaskFormData) => void;
};


export default function SubTaskModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open,
  setOpen,
  onSubmit,
}: SubTaskModalProps) {
  const { register, handleSubmit, reset } = useForm<SubTaskFormData>();

  const handleAdd: SubmitHandler<SubTaskFormData> = (data) => {
    onSubmit(data);
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
