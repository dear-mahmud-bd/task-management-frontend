import Navbar from "@/components/Shared/Navbar";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
              <Link href="/dashboard">dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/task">Task</Link>
            </li>
            <li>
              <Link href="/dashboard/team">Team</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
