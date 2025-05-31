'use client';

import { getCompletedSubTasks } from '@/utils';
import React from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import { MdAttachFile } from 'react-icons/md';

interface TaskAssetsProps {
  activities?: number;
  assets?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subTasks?: any[];
}

const TaskAssets: React.FC<TaskAssetsProps> = ({ activities = 0, assets = 0, subTasks = [] }) => {
  console.log(subTasks);
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
        <BiMessageAltDetail />
        <span>{activities}</span>
      </div>
      <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
        <MdAttachFile />
        <span>{assets}</span>
      </div>
      <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
        <FaList />
        <span>
          {getCompletedSubTasks(subTasks)}/{subTasks?.length ?? 0}
        </span>
      </div>
    </div>
  );
};

export default TaskAssets;
