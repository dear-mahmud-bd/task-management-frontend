"use client";

import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { user, setIsLoading } = useUser();
  console.log(user);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
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
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={handleLogOut}>
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
