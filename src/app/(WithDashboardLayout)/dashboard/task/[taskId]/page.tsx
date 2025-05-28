"use client";
import React, { useState } from "react";
import Activities from "@/components/Module/TaskDetails/Activities";
import SubTasks from "@/components/Module/TaskDetails/SubTasks";
import Tabs from "@/components/Module/TaskDetails/Tabs";
import TaskAssets from "@/components/Module/TaskDetails/TaskAssets";
import TaskDescription from "@/components/Module/TaskDetails/TaskDescription";
import TaskHeader from "@/components/Module/TaskDetails/TaskHeader";
import TaskLinks from "@/components/Module/TaskDetails/TaskLinks";
import TaskStats from "@/components/Module/TaskDetails/TaskStats";
import TeamSection from "@/components/Module/TaskDetails/TeamSection";

const dummyTask = {
  title: "Redesign Landing Page",
  priority: "High",
  stage: "In Progress",
  date: new Date(),
  assets: [
    "https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  subTasks: [
    {
      _id: "1",
      title: "Wireframe Design",
      tag: "UI",
      date: new Date(),
      isCompleted: true,
    },
    {
      _id: "2",
      title: "Component Setup",
      tag: "Frontend",
      date: new Date(),
      isCompleted: false,
    },
  ],
  team: [
    { _id: "1", name: "Alice Smith", title: "UI Designer" },
    { _id: "2", name: "John Doe", title: "Frontend Dev" },
  ],
  description: "This task involves redesigning the homepage of the app...",
  links: [
    "https://figma.com/file/sample-design",
    "https://docs.google.com/doc/sample",
  ],
  activities: ["Alice updated the task", "John commented on a sub-task"],
};

const TaskDetailsPage = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{dummyTask.title}</h1>
      <Tabs selected={selected} setSelected={setSelected} />
      {selected === 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskHeader task={dummyTask} />
            <TaskStats task={dummyTask} />
            <TeamSection team={dummyTask.team} />
            <SubTasks subTasks={dummyTask.subTasks} />
          </div>
          <div className="space-y-6">
            <TaskDescription description={dummyTask.description} />
            <TaskAssets assets={dummyTask.assets} />
            <TaskLinks links={dummyTask.links} />
          </div>
        </div>
      ) : (
        <Activities activities={dummyTask.activities} />
      )}
    </div>
  );
};

export default TaskDetailsPage;
