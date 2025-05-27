"use client";

import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import clsx from "clsx";
import { dummyTeamUsers } from "@/utils/dummydata";

const dummyUsers = dummyTeamUsers;

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const UserTable = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button className="btn btn-primary btn-sm">
          <IoMdAdd className="text-lg" />
          Add New User
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user._id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className=" placeholder">
                      <div className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold">
                        {getInitials(user.name)}
                      </div>
                    </div>
                    {/* <div className="ring-blue-600 ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center">
                      <span className="text-blue-500 font-bold">
                        {getInitials(user?.name as string)}
                      </span>
                    </div> */}
                    {user.name}
                  </div>
                </td>
                <td>{user.title}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      user.isActive
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="text-right space-x-2">
                  <button className="btn btn-sm btn-outline text-blue-600">
                    <MdOutlineEdit className="text-lg" />
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline text-red-600">
                    <RiDeleteBin6Line className="text-lg" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
