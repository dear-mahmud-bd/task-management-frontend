import { FaNewspaper } from 'react-icons/fa';
import { FaArrowsToDot } from 'react-icons/fa6';
import { LuClipboardPenLine } from 'react-icons/lu';
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from 'react-icons/md';

type StageType = "todo" | "completed" | "in_progress";
type PriorityType = "high" | "medium" | "low";

export default function Dashboard() {
  const stats = [
    {
      label: 'TOTAL TASK',
      total: 24,
      icon: <FaNewspaper />,
      bg: 'bg-blue-700',
    },
    {
      label: 'COMPLETED TASK',
      total: 15,
      icon: <MdAdminPanelSettings />,
      bg: 'bg-teal-700',
    },
    {
      label: 'TASK IN PROGRESS',
      total: 5,
      icon: <LuClipboardPenLine />,
      bg: 'bg-amber-500',
    },
    {
      label: 'TODOS',
      total: 4,
      icon: <FaArrowsToDot />,
      bg: 'bg-rose-700',
    },
  ];

  const dummyTasks = [
    {
      title: 'Design Login Page',
      stage: 'todo',
      priority: 'high',
      team: ['AB', 'CD', 'EF'],
      date: '2 days ago',
    },
    {
      title: 'Fix Bug #45',
      stage: 'in progress',
      priority: 'medium',
      team: ['GH', 'IJ'],
      date: '4 days ago',
    },
    {
      title: 'Implement Search',
      stage: 'completed',
      priority: 'low',
      team: ['KL'],
      date: '1 week ago',
    },
  ];

  const dummyUsers = [
    {
      name: 'Alice Johnson',
      role: 'Developer',
      isActive: true,
      createdAt: '3 days ago',
    },
    {
      name: 'Bob Smith',
      role: 'Manager',
      isActive: false,
      createdAt: '5 days ago',
    },
  ];

  const stageColor = {
    todo: 'bg-rose-500',
    completed: 'bg-green-600',
    in_progress: 'bg-yellow-500',
  };

  const priorityStyle = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  };

  const priorityIcon = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  return (
    <div className="h-full py-4 px-4">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between"
          >
            <div className="flex flex-col justify-between h-full">
              <p className="text-gray-600 text-sm">{item.label}</p>
              <h3 className="text-2xl font-bold">{item.total}</h3>
              <p className="text-xs text-gray-400">Last month: +10%</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${item.bg}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="w-full bg-white my-10 p-6 rounded shadow-sm">
        <h4 className="text-xl text-gray-500 font-bold mb-2">Chart by Priority</h4>
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          Chart component placeholder
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Task Table */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Tasks</h3>
          <table className="w-full text-sm text-left">
            <thead className="border-b border-gray-300 text-gray-600">
              <tr>
                <th className="py-2">Task</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Team</th>
                <th className="py-2 hidden md:block">Created</th>
              </tr>
            </thead>
            <tbody>
              {dummyTasks.map((task, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stageColor[task.stage as StageType]}`} />
                      <span>{task.title}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      <span className={`${priorityStyle[task.priority as PriorityType]}`}>
                        {priorityIcon[task.priority as PriorityType]}
                      </span>
                      <span className="capitalize">{task.priority}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex -space-x-2">
                      {task.team.map((initials, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center"
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 hidden md:block text-gray-500">{task.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Table */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Users</h3>
          <table className="w-full text-sm text-left">
            <thead className="border-b border-gray-300 text-gray-600">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p>{user.name}</p>
                        <span className="text-xs text-gray-500">{user.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {user.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500">{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
