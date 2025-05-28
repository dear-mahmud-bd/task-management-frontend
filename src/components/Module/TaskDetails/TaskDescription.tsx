import React from 'react';

interface TaskDescriptionProps {
  description: string;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ description }) => (
  <div>
    <h2 className='text-lg font-semibold'>TASK DESCRIPTION</h2>
    <p className='text-gray-600'>{description}</p>
  </div>
);

export default TaskDescription;
