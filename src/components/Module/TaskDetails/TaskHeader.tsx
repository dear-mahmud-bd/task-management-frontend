"use client";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { format } from "date-fns";

interface Task {
  priority: string;
  stage: string;
  date: string;
  createdAt?: string;
}

interface TaskHeaderProps {
  task: Task;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
  const formattedDate = task?.date
    ? format(new Date(task.date), "MMM dd, yyyy")
    : "N/A";

  return (
    <div className="flex items-center gap-4">
      <div className="badge badge-error gap-2 text-white">
        <FaExclamationTriangle /> {task?.priority} Priority
      </div>
      <div className="badge badge-info">{task?.stage}</div>
      <div className="text-gray-500 text-sm ml-auto">
        Created At: {formattedDate}
      </div>
    </div>
  );
};

export default TaskHeader;
