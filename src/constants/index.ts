export const protectedRoutes = ["/login", "/dashboard/:page"];

export const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-indigo-500",
];

export type StageType = "todo" | "completed" | "in_progress";
export type PriorityType = "high" | "medium" | "low";

export const stageColor = {
  todo: "bg-rose-500",
  completed: "bg-green-600",
  in_progress: "bg-yellow-500",
};

export const priorityStyle = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
};
