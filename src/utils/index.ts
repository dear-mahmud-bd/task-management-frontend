export function getInitials(fullName: string = "Anonymous User"): string {
  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
  const initialsStr = initials.join("");
  return initialsStr;
}

export const getCompletedSubTasks = (subTasks?: { isCompleted: boolean }[]) => {
  if (!subTasks || !Array.isArray(subTasks)) return 0;
  return subTasks.filter((task) => task.isCompleted).length;
};
