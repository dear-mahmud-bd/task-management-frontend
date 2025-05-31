/* eslint-disable @typescript-eslint/no-explicit-any */
// components/NotificationModal.tsx
"use client";

import React from "react";
import moment from "moment";

interface NotificationModalProps {
  notification: any;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notification,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !notification) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg capitalize">{notification.type}</h3>
        <p className="py-2 text-sm text-gray-700">{notification.text}</p>
        <p className="text-xs text-gray-500">
          {moment(notification.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <div className="modal-action">
          <button className="btn btn-sm btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NotificationModal;
