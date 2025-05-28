import { MdTaskAlt } from 'react-icons/md';
import { useState } from 'react';

// Define the type for each sub-task
interface SubTask {
  _id: string;
  title: string;
  date: Date;
  tag: string;
  isCompleted: boolean;
}

// Props type
interface SubTasksProps {
  subTasks: SubTask[];
}

const SubTasks: React.FC<SubTasksProps> = ({ subTasks }) => {
  const [subList, setSubList] = useState<SubTask[]>(subTasks);

  const toggleStatus = (index: number) => {
    const updated = [...subList];
    updated[index].isCompleted = !updated[index].isCompleted;
    setSubList(updated);
  };

  const percentageCompleted =
    (subList.filter((t) => t.isCompleted).length / subList.length) * 100;

  const getBadgeColor = () => {
    if (percentageCompleted >= 80) return 'badge-success';
    if (percentageCompleted >= 50) return 'badge-warning';
    return 'badge-error';
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold text-gray-500'>SUB-TASKS</p>
        <span className={`badge ${getBadgeColor()}`}>
          {percentageCompleted.toFixed(0)}%
        </span>
      </div>
      <div className='mt-4 space-y-4'>
        {subList.map((task, i) => (
          <div key={task._id} className='flex gap-3 items-start'>
            <MdTaskAlt className='text-purple-600 mt-1' size={24} />
            <div>
              <div className='text-gray-700 font-medium'>{task.title}</div>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <span>{new Date(task.date).toDateString()}</span>
                <span className='badge badge-outline badge-sm'>{task.tag}</span>
                <span
                  className={`badge badge-sm ${
                    task.isCompleted ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {task.isCompleted ? 'Done' : 'In Progress'}
                </span>
              </div>
              <button
                className='btn btn-xs mt-2'
                onClick={() => toggleStatus(i)}
              >
                {task.isCompleted ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTasks;
