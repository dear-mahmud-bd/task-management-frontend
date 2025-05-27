"use client";

import Navbar from "@/components/Shared/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="container max-w-full mx-auto">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content (children will be injected here) */}
          <main className="min-h-screen p-4">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <Link
                href="/dashboard"
                className={clsx({
                  "bg-primary text-white": pathname === "/dashboard",
                })}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/task"
                className={clsx({
                  "bg-primary text-white": pathname === "/dashboard/task",
                })}
              >
                Task
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/team"
                className={clsx({
                  "bg-primary text-white": pathname === "/dashboard/team",
                })}
              >
                Team
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
