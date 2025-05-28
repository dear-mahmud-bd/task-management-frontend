import Image from "next/image";
import React from "react";

interface TaskAssetsProps {
  assets: string[];
}

const TaskAssets: React.FC<TaskAssetsProps> = ({ assets }) => (
  <div>
    <h2 className="text-lg font-semibold">ASSETS</h2>
    <div className="grid grid-cols-2 gap-4">
      {assets.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Asset ${index + 1}`}
          width={200}
          height={200}
          className="rounded hover:scale-105 transition-transform duration-300"
        />
      ))}
    </div>
  </div>
);

export default TaskAssets;
