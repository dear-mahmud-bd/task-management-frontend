import clsx from "clsx";
import React from "react";

interface TaskColorProps {
  className?: string;
}

const TaskColor: React.FC<TaskColorProps> = ({ className }) => {
  return <div className={clsx("w-4 h-4 rounded-full", className)} />;
};

export default TaskColor;
