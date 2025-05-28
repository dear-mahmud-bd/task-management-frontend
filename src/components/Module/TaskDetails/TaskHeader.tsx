import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Task {
  priority: string;
  stage: string;
  date: Date;
}

interface TaskHeaderProps {
  task: Task;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ task }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='badge badge-error gap-2'>
        <FaExclamationTriangle /> {task.priority} Priority
      </div>
      <div className='badge badge-info'>{task.stage}</div>
      <div className='text-gray-500 text-sm ml-auto'>
        Created At: {task.date.toDateString()}
      </div>
    </div>
  );
};

export default TaskHeader;
