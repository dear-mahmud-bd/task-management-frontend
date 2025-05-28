import React from "react";

interface TaskLinksProps {
  links: string[];
}

const TaskLinks: React.FC<TaskLinksProps> = ({ links }) => (
  <div>
    <h2 className="text-lg font-semibold">SUPPORT LINKS</h2>
    <div className="space-y-2 mt-2">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default TaskLinks;
