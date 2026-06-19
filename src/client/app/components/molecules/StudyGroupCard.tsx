import React from 'react';
import { Button } from '../atoms/Button';

interface StudyGroupCardProps {
  name: string;
  members: string;
  isFindMore?: boolean;
}

export default function StudyGroupCard({ name, members, isFindMore }: StudyGroupCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl flex flex-col justify-between gap-6 min-h-[180px] bg-white border border-[#EAEAEA] shadow-sm hover:shadow-lg hover:border-teal/50 transition-all cursor-pointer`}
    >
      {/* Group Info */}
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-lg font-bold text-navy leading-snug">
          {name}
        </h3>
        <p className="font-inter text-sm text-[#75777D] font-medium">
          {members}
        </p>
      </div>

      {/* Action */}
      <div className="flex justify-start">
        <Button 
          variant={isFindMore ? 'outline' : 'primary'}
          className="px-6 py-2.5 text-sm rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
        >
          {isFindMore ? 'Browse All' : 'Join Group'}
        </Button>
      </div>
    </div>
  );
}
