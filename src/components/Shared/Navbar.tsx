/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { selectCurrentUser, signOut } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/services/AuthService";
import { getInitials } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import moment from "moment";

const mockNotifications = [
  {
    id: 1,
    type: "alert",
    text: "Server CPU usage is high.",
    createdAt: new Date(),
    read: false,
  },
  {
    id: 2,
    type: "message",
    text: "You have a new message from Alice.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: 3,
    type: "alert",
    text: "New team member joined your project.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
];
const Navbar = () => {
  const { user, setIsLoading } = useUser();
  // console.log(user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedUser = useAppSelector(selectCurrentUser);
  // console.log(savedUser.name);

  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const handleLogOut = () => {
    dispatch(signOut());
    logoutUser();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
    router.push("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-xs">
        <div className="navbar-start">
          <label htmlFor="my-drawer-2" className="lg:hidden w-fit m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </label>
          <a className="btn btn-ghost text-xl">Task Manager</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Functionality</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end mr-2">
          <div className="flex-none space-x-2">
            {/* Notification section */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <IoIosNotificationsOutline className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="badge badge-xs badge-error text-white indicator-item">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[100] card card-compact dropdown-content w-80 bg-base-100 shadow"
              >
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        className="btn btn-xs btn-outline btn-warning"
                        onClick={markAllRead}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`p-3 rounded-lg ${
                            !n.read
                              ? "bg-info bg-opacity-10"
                              : "hover:bg-base-200"
                          }`}
                        >
                          <div className="text-sm font-medium capitalize">
                            {n.type}
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-1">
                            {n.text}
                          </div>
                          <div className="text-xs text-gray-400">
                            {moment(n.createdAt).fromNow()}
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-500">
                        No notifications
                      </p>
                    )}
                  </ul>
                  <div className="card-actions mt-3">
                    <button className="btn btn-primary btn-block">
                      View all
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Section */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="ring-blue-600 ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center">
                  <span className="text-blue-500 font-bold">
                    {getInitials(savedUser?.name as string)}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
