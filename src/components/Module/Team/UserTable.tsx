/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import clsx from "clsx";
import { dummyTeamUsers } from "@/utils/dummydata";
import { useForm } from "react-hook-form";

type UserFormData = {
  name: string;
  title: string;
  email: string;
  role: "Developer" | "Admin";
};

const dummyUsers = dummyTeamUsers;

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const UserTable = () => {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const { register, handleSubmit, reset } = useForm<UserFormData>();

  const openModal = () => {
    const modal = document.getElementById(
      "add_user_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const onSubmit = (data: UserFormData) => {
    console.log(data);

    setUsers((prev) => [...prev, data]);
    reset();
    const modal = document.getElementById(
      "add_user_modal"
    ) as HTMLDialogElement | null;
    modal?.close();
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button className="btn btn-primary btn-sm" onClick={openModal}>
          <IoMdAdd className="text-lg" />
          Add New User
        </button>
      </div>
      <dialog
        id="add_user_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New User</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">User Role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm">Cancel</button>
              </form>
              <button type="submit" className="btn btn-primary btn-sm">
                Add User
              </button>
            </div>
          </form>
        </div>
      </dialog>

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
