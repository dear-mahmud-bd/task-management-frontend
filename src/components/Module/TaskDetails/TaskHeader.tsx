/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/authSlice";
import { updateTaskStage } from "@/services/Task";
import { toast } from "sonner";

interface Task {
  _id: string;
  priority: string;
  stage: "todo" | "in_progress" | "completed";
  date: string;
  createdAt?: string;
}

interface TaskHeaderProps {
  task: Task;
  refetch?: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task, refetch }) => {
  const token = useAppSelector(useCurrentToken);
  const modalRef = useRef<HTMLDialogElement>(null);

  const formattedDate = task?.date
    ? format(new Date(task.date), "MMM dd, yyyy")
    : "N/A";

  const nextStage =
    task.stage === "todo"
      ? "in_progress"
      : task.stage === "in_progress"
      ? "completed"
      : "completed"; // completed stays completed

  const openConfirmationModal = () => {
    modalRef.current?.showModal();
  };

  const handleConfirmStageChange = async () => {
    try {
      const res = await updateTaskStage(
        task._id,
        { stage: nextStage },
        token as string
      );
      if (res.status) {
        toast.success("Stage updated");
        refetch?.();
      } else {
        toast.error("Failed to update stage");
      }
    } catch (error: any) {
      toast.error(error.message || "Error updating stage");
    } finally {
      modalRef.current?.close();
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="badge badge-error gap-2 text-white">
          <FaExclamationTriangle /> {task?.priority} Priority
        </div>

        <div
          className="badge badge-info cursor-pointer hover:opacity-80 transition"
          onClick={openConfirmationModal}
          title="Click to change stage"
        >
          {task?.stage}
        </div>

        <div className="text-gray-500 text-sm ml-auto">
          Created At: {formattedDate}
        </div>
      </div>

      {/* Confirmation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Stage Change</h3>
          <p className="py-4">
            Are you sure you want to change stage to <strong>{nextStage}</strong>?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleConfirmStageChange}
            >
              Yes, change it
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TaskHeader;
