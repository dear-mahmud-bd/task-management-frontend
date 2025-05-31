// components/ProfileModal.tsx
"use client";
import { useEffect } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; email: string; role: string };
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
}: ProfileModalProps) {
  useEffect(() => {
    const modal = document.getElementById("profile_modal") as HTMLDialogElement;
    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen]);

  return (
    <dialog id="profile_modal" className="modal">
      <div className="modal-box text-center">
        <h3 className="font-bold text-lg">My Profile</h3>
        <p className="py-2 text-4xl font-bold text-gray-600">
          {user?.name}
        </p>
        <p className="py-2 text-2xl font-bold text-gray-600">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="py-2">
          <strong>Role:</strong> {user?.role}
        </p>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-sm btn-primary">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
