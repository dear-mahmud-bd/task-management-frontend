/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { postTaskActivity } from "@/services/Task";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/authSlice";

type ActivityType =
  | "started"
  | "completed"
  | "in_progress"
  | "commented"
  | "bug"
  | "assigned";

interface Activity {
  [x: string]: string | number | Date;
  type: ActivityType;
  activity: string;
}

interface ActivitiesProps {
  activities: Activity[];
  taskId: string;
}

const statusOptions: { label: string; value: ActivityType }[] = [
  { label: "Started", value: "started" },
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Comment", value: "commented" },
  { label: "Bug", value: "bug" },
  { label: "Assigned", value: "assigned" },
];

// Form input types
interface FormInputs {
  status: ActivityType;
  activity: string;
}

const Activities: React.FC<ActivitiesProps> = ({ activities, taskId }) => {
  const token = useAppSelector(useCurrentToken);
  const [activityList, setActivityList] = useState<Activity[]>(activities);
  console.log(activities);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      status: undefined,
      activity: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const newActivity: Activity = {
      type: data.status,
      activity: data.activity.trim(),
      date: new Date().toISOString(),
    };

    try {
      const res = await postTaskActivity(
        taskId,
        newActivity.type,
        newActivity.activity,
        token as string
      );
      console.log(res);
      

      if (res.status) {
        toast.success("Activity added successfully!");
        setActivityList((prev) => [...prev, newActivity]);
        reset();
      } else {
        toast.error("Failed to add activity");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong while posting activity"
      );
    }
    reset();
  };

  const selectedStatus = watch("status");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Activities List */}
      <div className="w-full md:w-1/2 space-y-3">
        <h2 className="text-lg font-semibold">ACTIVITIES</h2>
        <ul className="list-disc pl-5 text-gray-600">
          {activityList.map((act, idx) => (
            <li key={idx}>
              <strong>{act.type.toUpperCase()} </strong>{" "}
              <small>{format(new Date(act.date), "MMM dd, yyyy")}</small> :{" "}
              {act.activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Activity Form */}
      <div className="w-full md:w-1/2 border border-gray-300 rounded p-4 shadow-md">
        <h3 className="text-md font-semibold mb-4">Add Activity</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Status */}
          <div className="form-control">
            <label className="label text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-4">
              {statusOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="label cursor-pointer flex items-center gap-2"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="radio radio-sm radio-primary"
                    {...register("status", { required: "Status is required" })}
                  />
                  <span className="label-text">{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-sm font-medium">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter activity details..."
              {...register("activity", {
                required: "Description is required",
                validate: (value) =>
                  value.trim().length > 0 || "Description cannot be empty",
              })}
            />
            {errors.activity && (
              <p className="text-sm text-red-500 mt-1">
                {errors.activity.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!selectedStatus}
          >
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default Activities;
