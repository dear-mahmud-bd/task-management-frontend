/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IoMdAdd } from "react-icons/io";
import BoardView from "@/components/Module/Task/BoardView";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";
import { createTask, fetchTasks } from "@/services/Task";
import Loading from "@/components/Shared/Loading";
import { fetchAllUsers } from "@/services/User";
import { toast } from "sonner";
import { utils, writeFile } from "xlsx";
import moment from "moment";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [exporting, setExporting] = useState(false);

  const savedUser = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // get all users
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

  // get all tasks
  useEffect(() => {
    const getTasks = async () => {
      if (!token) return;
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [token]);
  if (loading) return <Loading />;

  const options = users.map((u: any) => ({
    value: u._id,
    label: `${u.name} - ${u.title}`,
  }));

  const data = tasks;
  const isAdmin = savedUser?.role === "admin";

  // download data...
  const handleExportExcel = () => {
    if (!tasks || tasks.length === 0) return;
    setExporting(true);
    // Transform task objects if needed
    const transformedData = tasks.map((task: any) => {
      const startedDate = task.date;
      const updatedDate = task.updatedAt;
      const totalDays = moment(updatedDate).diff(moment(startedDate), "days");
      return {
        Task_Title: task.title,
        Priority: task.priority,
        Total_Subtask: task.subTasks?.length || 0,
        Complete_Subtask:
          task.subTasks?.filter((s: any) => s.isCompleted)?.length || 0,
        Team_Members: task.team?.map((m: any) => m.name).join(", "),
        Current_Stage: task.stage,
        Started_Date: moment(startedDate).format("YYYY-MM-DD"),
        Total_Days: totalDays,
      };
    });

    const worksheet = utils.json_to_sheet(transformedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Tasks");

    writeFile(workbook, "TaskData.xlsx");
    setExporting(false);
  };

  // https://figma.com/design1, https://drive.google.com/file123
  const onSubmit = async (formData: FieldValues) => {
    console.log("New Task Data:", formData);
    const taskData = {
      title: formData.title,
      team: formData.assignedTo,
      stage: "todo",
      priority: formData.priority,
      date: new Date(formData.date).toISOString(),
      description: formData.description,
      assets: [],
      links: formData.links
        ? formData.links.split(",").map((link: string) => link.trim())
        : [],
    };
    try {
      const res = await createTask(token as string, taskData);
      if (res.status) {
        toast.success("Task created successfully!");
      } else {
        toast.error("Failed to create task");
      }
      reset();
      (document.getElementById("task_modal") as HTMLDialogElement)?.close();
    } catch (error: any) {
      toast.error(error.message || "Failed to create task");
    }
    console.log("taskData: ", taskData);
    reset();
    (document.getElementById("task_modal") as HTMLDialogElement).close();
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tasks
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleExportExcel}
            className="btn btn-sm btn-outline btn-success"
            disabled={exporting}
          >
            {exporting ? "Exporting..." : "Export Report to Excel"}
          </button>
        </div>
        {isAdmin && (
          <button
            onClick={() =>
              (
                document.getElementById("task_modal") as HTMLDialogElement
              ).showModal()
            }
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded btn"
          >
            <IoMdAdd className="text-lg" /> Create Task
          </button>
        )}
      </div>

      <BoardView tasks={data} />

      {/* Task Modal */}
      <dialog id="task_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Task Title"
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Task Description"
                className="textarea textarea-bordered w-full"
                rows={2}
              ></textarea>
            </div>

            {/* Team */}
            <div>
              <label className="label">
                <span className="label-text">Team</span>
              </label>
              <Select
                isMulti
                options={options as any}
                required
                placeholder="Assigned To..."
                value={selectedUsers} // controlled input
                onChange={(selected) => {
                  setSelectedUsers(selected as any); // save full selected option objects
                  const selectedIds = selected.map((s: any) => s.value); // or s.label if needed
                  setValue("assignedTo", selectedIds); // or full objects if required
                }}
                className="text-black"
              />
            </div>

            {/* data and priority */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="label">
                  <span className="label-text">Task Date</span>
                </label>
                <input
                  {...register("date", { required: true })}
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select
                  {...register("priority", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Links */}
            <div>
              <label className="label">
                <span className="label-text">Important Links</span>
              </label>
              <textarea
                {...register("links")}
                rows={2}
                placeholder="Support Links (comma separated)"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    "task_modal"
                  ) as HTMLDialogElement;
                  modal?.close();
                }}
              >
                Close
              </button>

              <button type="submit" className="btn btn-primary">
                Create A New Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
