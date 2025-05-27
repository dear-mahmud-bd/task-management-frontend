/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TaskCard from "@/components/Module/Task/TaskCard";

export default function BoardView({ tasks }: { tasks: any[] }) {
  if (!tasks?.length) {
    return <p className="text-gray-600">No tasks found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </div>
  );
}
