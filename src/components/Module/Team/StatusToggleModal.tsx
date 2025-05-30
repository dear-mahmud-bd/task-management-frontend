/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { activateUser } from "@/services/User";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  isActive: boolean;
  token: string;
  role: string;
}

export const StatusToggleModal = ({
  userId,
  isActive,
  token,
  role,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    const dto = { isActive: !isActive };
    try {
      const res = await activateUser(token, userId, dto);
      toast.success(res.message || "Status updated");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          role === "admin"
            ? "bg-gray-100 text-gray-500 opacity-60 cursor-not-allowed"
            : isActive
            ? "bg-blue-100 text-blue-800 cursor-pointer"
            : "bg-yellow-100 text-yellow-800 cursor-pointer"
        }`}
        onClick={() => {
          if (role !== "admin") setOpen(true);
        }}
        title={role === "admin" ? "Admins cannot be deactivated" : ""}
      >
        {isActive ? "Active" : "Disabled"}
      </span>

      {/* Modal outside of table */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">
              {isActive ? "Disable" : "Activate"} User?
            </h3>
            <p className="mb-6">
              Are you sure you want to {isActive ? "disable" : "activate"} this
              user?
            </p>
            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Yes, {isActive ? "Disable" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
