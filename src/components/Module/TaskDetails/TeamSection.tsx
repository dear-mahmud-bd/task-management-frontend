import { getInitials } from '@/utils';
import React from 'react';

// Type for a team member
interface TeamMember {
  _id: string;
  name: string;
  title: string;
}

// Props type
interface TeamSectionProps {
  team: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => (
  <div>
    <h2 className='font-semibold text-sm text-gray-500 mb-2'>TASK TEAM</h2>
    {team.map((member) => (
      <div key={member._id} className='flex items-center gap-4 mb-2'>
        <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center'>
          {getInitials(member.name)}
        </div>
        <div>
          <p className='font-semibold'>{member.name}</p>
          <p className='text-sm text-gray-400'>{member.title}</p>
        </div>
      </div>
    ))}
  </div>
);

export default TeamSection;
