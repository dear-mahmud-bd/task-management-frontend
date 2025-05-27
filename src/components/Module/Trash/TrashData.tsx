/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PriorityType, StageType } from "@/constants";
import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { PRIOTITYSTYELS, TASK_TYPE } from "../Task/TaskCard";
import { dummyTrashTasks } from "@/utils/dummydata";

// Dummy Components
const Title = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold text-gray-700 dark:text-white">{title}</h2>
);

const Button = ({ icon, label, onClick, className = "" }: any) => (
  <button onClick={onClick} className={`flex items-center gap-1 ${className}`}>
    {icon}
    {label}
  </button>
);

const ConfirmatioDialog = ({ open, setOpen, msg, onClick }: any) =>
  open ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-xl">
        <p className="mb-4">{msg}</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button className="text-red-600" onClick={onClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;

// Dummy priority icons
const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskColor = ({ className }: { className: string }) => (
  <div className={`w-3 h-3 rounded-full ${className}`}></div>
);

// Dummy Tasks
const dummyTasks = dummyTrashTasks;

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [type, setType] = useState("delete");
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState("");
  const [tasks, setTasks] = useState(dummyTasks);

  const deleteClick = (id: string) => {
    setSelected(id);
    setType("delete");
    setMsg("Do you want to permanently delete this task?");
    setOpenDialog(true);
  };

  const restoreClick = (id: string) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore this task?");
    setOpenDialog(true);
  };

  const deleteRestoreHandler = () => {
    if (type === "delete") {
      setTasks(tasks.filter((task) => task._id !== selected));
    } else if (type === "restore") {
      setTasks(tasks.filter((task) => task._id !== selected)); // Simulate restore
    } else if (type === "deleteAll") {
      setTasks([]);
    } else if (type === "restoreAll") {
      setTasks([]); // Simulate restoring all (removing from trash view)
    }
    setOpenDialog(false);
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300 dark:border-gray-600">
      <tr className="text-black dark:text-white text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2">Modified On</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }: any) => (
    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <TaskColor className={TASK_TYPE[item.stage as StageType]} />
          <p className="line-clamp-1 text-black dark:text-gray-300">{item.title}</p>
        </div>
      </td>
      <td className="py-2 capitalize">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[item.priority as PriorityType])}>
            {ICONS[item.priority as PriorityType]}
          </span>
          <span>{item.priority}</span>
        </div>
      </td>
      <td className="py-2 capitalize">{item.stage}</td>
      <td className="py-2 text-sm">{new Date(item.date).toDateString()}</td>
      <td className="py-2 flex gap-2 justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-600" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="w-full px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <Title title="Trashed Tasks" />
        {tasks.length > 0 && (
          <div className="flex gap-3">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore />}
              className="text-sm text-black"
              onClick={() => {
                setType("restoreAll");
                setMsg("Do you want to restore all tasks?");
                setOpenDialog(true);
              }}
            />
            <Button
              label="Delete All"
              icon={<MdDelete />}
              className="text-sm text-red-600"
              onClick={() => {
                setType("deleteAll");
                setMsg("Do you want to permanently delete all tasks?");
                setOpenDialog(true);
              }}
            />
          </div>
        )}
      </div>

      {tasks.length > 0 ? (
        <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded shadow">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tasks.map((task) => (
                <TableRow key={task._id} item={task} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10 text-lg">
          No Trashed Task
        </div>
      )}

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        type={type}
        onClick={deleteRestoreHandler}
      />
    </div>
  );
};

export default Trash;
