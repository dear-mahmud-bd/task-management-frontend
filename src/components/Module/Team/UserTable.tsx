/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import { getInitials } from "@/utils";
import { fetchAllUsers, updateUserProfile } from "@/services/User";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/authSlice";
import { StatusToggleModal } from "./StatusToggleModal";

type UserFormData = {
  _id: string;
  name: string;
  title: string;
  email: string;
  isActive: boolean;
  role: "developer" | "admin";
};

const UserTable = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { register, handleSubmit, reset } = useForm<UserFormData>();
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);
  const openModal = () => {
    const modal = document.getElementById(
      "add_user_modal"
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = useAppSelector(useCurrentToken);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchAllUsers(token as string);
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);
  // console.log(users);

  const onSubmit = async (data: UserFormData) => {
    // console.log(data);
    const userData = {
      name: data.name,
      title: data.title,
      role: data.role,
      email: data.email,
      password: data.email,
    };
    try {
      const res = await registerUser(userData);
      console.log(res);
      if (res?.statusCode === 400) {
        toast.error(res.message);
      } else {
        if (res?.role) {
          toast.success("User Adder Successfully!");
        } else {
          toast.error("Something Wrong!");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }

    reset();
    const modal = document.getElementById(
      "add_user_modal"
    ) as HTMLDialogElement | null;
    modal?.close();
  };

  // edit user details
  const handleEditUser = (user: UserFormData) => {
    setEditingUser(user);
    reset(user); // prefill form with selected user data
    const modal = document.getElementById(
      "edit_user_modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };
  const onEditSubmit = async (data: UserFormData) => {
    try {
      // Send PUT/PATCH request to update user
      const updatedData = {
        _id: data._id,
        name: data.name,
        title: data.title,
        role: data.role,
      };
      // console.log("Edited data:", updatedData);

      // TODO: Replace with your updateUser service call
      const res = await updateUserProfile(token as string, updatedData);
      // console.log("update - ", res);
      if (res.status) {
        toast.success("User updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setEditingUser(null);
      (
        document.getElementById("edit_user_modal") as HTMLDialogElement
      )?.close();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Members</h2>
        {currentUser?.role === "admin" && (
          <button className="btn btn-primary btn-sm" onClick={openModal}>
            <IoMdAdd className="text-lg" />
            Add New User
          </button>
        )}
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
              <button
                type="button"
                className="btn btn-sm"
                onClick={() =>
                  (
                    document.getElementById(
                      "add_user_modal"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
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
              {currentUser?.role === "admin" && (
                <th className="text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserFormData) => (
              <tr key={user._id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className=" placeholder">
                      <div className="bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold">
                        {getInitials(user.name)}
                      </div>
                    </div>
                    {user.name}
                  </div>
                </td>
                <td>{user.title}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button disabled={currentUser?.role === "developer"}>
                    <StatusToggleModal
                      userId={user._id}
                      isActive={user.isActive}
                      token={token as string}
                      role={user.role}
                    />
                  </button>
                </td>
                {currentUser?.role === "admin" && (
                  <td className="text-right space-x-2">
                    <button
                      className="btn btn-sm btn-outline text-blue-600"
                      onClick={() => handleEditUser(user)}
                    >
                      <MdOutlineEdit className="text-lg" />
                      Edit
                    </button>

                    {/* <button className="btn btn-sm btn-outline text-red-600">
                    <RiDeleteBin6Line className="text-lg" />
                    Delete
                  </button> */}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog
        id="edit_user_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit User</h3>
          <form
            onSubmit={handleSubmit((data) => onEditSubmit(data))}
            className="space-y-1"
          >
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
                disabled // prevent editing email
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">User Role</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="select select-bordered w-full"
                disabled={editingUser?.role === "admin"}
              >
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() =>
                  (
                    document.getElementById(
                      "edit_user_modal"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Update User
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UserTable;
