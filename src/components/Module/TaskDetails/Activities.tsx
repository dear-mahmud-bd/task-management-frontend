import React, { useState } from 'react';

type ActivityType = 'started' | 'completed' | 'in_progress' | 'comment' | 'bug' | 'assigned';

interface ActivitiesProps {
  activities: string[];
}

const statusOptions: { label: string; value: ActivityType }[] = [
  { label: 'Started', value: 'started' },
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Comment', value: 'comment' },
  { label: 'Bug', value: 'bug' },
  { label: 'Assigned', value: 'assigned' },
];

const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
  const [activityList, setActivityList] = useState<string[]>(activities);
  const [status, setStatus] = useState<ActivityType | ''>(''); // no initial selection
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!status || !description.trim()) return;

    const newActivity = `${status.toUpperCase()}: ${description}`;
    setActivityList((prev) => [...prev, newActivity]);

    // Reset form
    setStatus('');
    setDescription('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Activities List */}
      <div className="w-full md:w-1/2 space-y-3">
        <h2 className="text-lg font-semibold">ACTIVITIES</h2>
        <ul className="list-disc pl-5 text-gray-600">
          {activityList.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      </div>

      {/* Add Activity Form */}
      <div className="w-full md:w-1/2 border-gray-500 rounded p-4 shadow-md">
        <h3 className="text-md font-semibold mb-4">Add Activity</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <div className="form-control">
            <label className="label text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-4">
              {statusOptions.map((opt) => (
                <label key={opt.value} className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    className="radio radio-sm radio-primary"
                    checked={status === opt.value}
                    onChange={() => setStatus(opt.value)}
                  />
                  <span className="label-text">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label text-sm font-medium">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter activity details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!status}>
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default Activities;
