import React from 'react';

interface Task {
  assets: unknown[];   
  subTasks: unknown[]; 
}

interface TaskStatsProps {
  task: Task;
}

const TaskStats: React.FC<TaskStatsProps> = ({ task }) => (
  <div className='flex gap-6 border-y py-2 text-gray-600'>
    <span>
      Assets: <strong>{task.assets.length}</strong>
    </span>
    <span>|</span>
    <span>
      SubTasks: <strong>{task.subTasks.length}</strong>
    </span>
  </div>
);

export default TaskStats;
