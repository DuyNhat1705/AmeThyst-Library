import React from 'react';
import IconButton from './IconButton';

interface MemberCardProps {
  name: string;
  initials: string;
  role?: string;
  canKick?: boolean;
  onKick?: () => void;
}

export default function MemberCard({ name, initials, role, canKick, onKick }: MemberCardProps) {
  return (
    <div className="flex p-3 items-center justify-between border border-[#C6C6CD] dark:border-neutral-800 bg-[#FFF] dark:bg-neutral-900 rounded-xl w-full">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-800 w-10 h-10 overflow-hidden shadow-inner shrink-0">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-300">{initials}</span>
        </div>
        <div className="flex flex-col items-start overflow-hidden">
          <p className="text-[#000] dark:text-white font-inter text-sm font-bold leading-5 truncate w-full">
            {name}
          </p>
          {role && (
            <p className="text-[#45464D] dark:text-gray-400 font-inter text-[10px] leading-[14px] tracking-wider uppercase truncate w-full">
              {role}
            </p>
          )}
        </div>
      </div>
      {canKick && (
        <IconButton label="Kick Member" onClick={onKick} className="text-red-500 hover:text-red-700">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </IconButton>
      )}
    </div>
  );
}
