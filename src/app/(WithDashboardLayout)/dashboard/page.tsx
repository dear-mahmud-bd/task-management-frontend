/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Chart from "@/components/Module/Chart/Chart";

import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardPenLine } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { format } from "date-fns";
import { getInitials } from "@/utils";
import {
  avatarColors,
  priorityStyle,
  PriorityType,
  stageColor,
  StageType,
} from "@/constants";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/authSlice";
import { getDashboardStats } from "@/services/Task";
import Loading from "@/components/Shared/Loading";
import Link from "next/link";

export default function Dashboard() {
  const [statistics, setStatistics] = useState<any>(null);
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats(token as string);
        setStatistics(data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };
    if (token) fetchStats();
  }, [token]);
  if (!statistics) return <Loading />;
  // console.log(statistics);
  // console.log(statistics?.users);

  const stats = [
    {
      label: "TOTAL TASK",
      total: statistics?.totalTasks | 0,
      icon: <FaNewspaper />,
      bg: "bg-blue-700",
    },
    {
      label: "COMPLETED TASK",
      total: statistics?.tasks?.completed | 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-teal-700",
    },
    {
      label: "TASK IN PROGRESS",
      total: statistics?.tasks?.in_progress | 0,
      icon: <LuClipboardPenLine />,
      bg: "bg-amber-500",
    },
    {
      label: "TODOS",
      total: statistics?.tasks?.todo | 0,
      icon: <FaArrowsToDot />,
      bg: "bg-rose-700",
    },
  ];
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
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${item.bg}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="w-full bg-white my-10 p-6 rounded shadow-sm">
        <h4 className="text-xl text-gray-500 font-bold mb-2">
          Chart by Priority
        </h4>
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400">
          <Chart data={statistics?.graphData} />
          {/* Here add chart */}
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Task Table */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Tasks
          </h3>
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
              {statistics?.last10Task.map((task: any, idx: number) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          stageColor[task.stage as StageType] || "bg-gray-300"
                        }`}
                      />
                      <span>
                        <Link href={`/dashboard/task/${task._id}`}>
                          {task.title}
                        </Link>
                      </span>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      <span
                        className={`${
                          priorityStyle[task.priority as PriorityType]
                        }`}
                      >
                        {priorityIcon[task.priority as PriorityType]}
                      </span>
                      <span className="capitalize">{task.priority}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex -space-x-2">
                      {task.team.map((member: any, i: number) => (
                        <div
                          key={i}
                          className={`w-7 h-7 rounded-full ${
                            avatarColors[i % avatarColors.length]
                          } text-white text-xs flex items-center justify-center`}
                        >
                          {getInitials(member.name)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 hidden md:block text-gray-500">
                    {format(new Date(task.date), "MMM dd, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Table */}
        {currentUser?.role === "admin" && (
          <div className="w-full md:w-1/3 bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Users
            </h3>
            <table className="w-full text-sm text-left">
              <thead className="border-b border-gray-300 text-gray-600">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {statistics?.users.map((user: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs">
                          {user.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p>{user.name}</p>
                          <span className="text-xs text-gray-500">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.isActive
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">
                      {" "}
                      {format(new Date(user.createdAt), "PP")}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
