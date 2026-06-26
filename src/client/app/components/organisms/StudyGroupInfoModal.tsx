"use client";
import React from 'react';
import { StudyGroup } from '../../../study-together/mockData';

interface StudyGroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: StudyGroup | null;
}

export default function StudyGroupInfoModal({ isOpen, onClose, group }: StudyGroupInfoModalProps) {
  if (!isOpen || !group) return null;

  // Calculate capacity percentage
  const capacityPercent = Math.min(100, Math.round((group.currentMembers / group.maxMembers) * 100));

  // Determine subject badge color (reuse from card)
  const getSubjectColor = (subj: string) => {
    const hash = subj.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-[#E5F3F2] text-[#006A61] dark:bg-teal-900/30 dark:text-teal-400',
      'bg-[#F3E5E5] text-[#8C1D1D] dark:bg-red-900/30 dark:text-red-400',
      'bg-[#E5E9F3] text-[#1D3C8C] dark:bg-blue-900/30 dark:text-blue-400',
      'bg-[#F3EFE5] text-[#8C6D1D] dark:bg-yellow-900/30 dark:text-yellow-400',
      'bg-[#EFE5F3] text-[#6D1D8C] dark:bg-purple-900/30 dark:text-purple-400'
    ];
    return colors[hash % colors.length];
  };

  // Generate dummy members based on currentMembers (excluding the leader)
  const DUMMY_NAMES = ["Julianne Devis", "Marcus Thorne", "Sarah Chen", "Lina V.", "Samuel K.", "Emma Watson", "John Doe", "Alex Smith", "David Miller", "Emily Blunt"];
  const DUMMY_ROLES = ["LITERATURE MAJOR", "PHD RESEARCHER", "HUMANITIES SENIOR", "FRESHMAN", "COMPUTER SCIENCE MAJOR", "BUSINESS SENIOR"];
  
  const otherMembersCount = Math.max(0, group.currentMembers - 1);
  const otherMembers = Array.from({ length: otherMembersCount }).map((_, idx) => {
    const seed = parseInt(group.id) + idx;
    const name = DUMMY_NAMES[seed % DUMMY_NAMES.length];
    const role = DUMMY_ROLES[(seed * 2) % DUMMY_ROLES.length];
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
    return { name, role, initials };
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-scale-up border border-[#EAEAEA] dark:border-neutral-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content Area */}
        <div className="flex flex-col p-6 md:p-8 gap-6 overflow-y-auto">
          
          {/* Header Section */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-3">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full w-fit ${getSubjectColor(group.subject)}`}>
                  {group.subject}
                </span>
                <h2 className="text-[#000] dark:text-white font-inter text-3xl font-semibold leading-tight tracking-tight">
                  {group.title}
                </h2>
              </div>
              
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Time & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-start gap-1">
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider">
                  TIME RANGE
                </p>
                <p className="text-[#0D1C2E] dark:text-white font-inter text-lg font-semibold leading-relaxed">
                  {group.time}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider">
                  LOCATION
                </p>
                <p className="text-[#0D1C2E] dark:text-white font-inter text-lg font-semibold leading-relaxed">
                  {group.address}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider">
                  ROOM
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[#0D1C2E] dark:text-white font-inter text-lg font-semibold leading-relaxed">
                    {group.room}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#EAEAEA] dark:border-neutral-800" />

          {/* Description & Requirements */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider uppercase">
                Description
              </p>
              <p className="text-[#0D1C2E] dark:text-gray-200 font-inter text-base leading-relaxed">
                {group.description}
              </p>
            </div>

            {group.requirements && group.requirements.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider uppercase">
                  Requirements
                </p>
                <ul className="list-disc list-inside text-[#0D1C2E] dark:text-gray-200 font-inter text-sm flex flex-col gap-1.5 mt-1">
                  {group.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <hr className="border-[#EAEAEA] dark:border-neutral-800" />

          {/* Capacity & Leader */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col justify-center items-start gap-1">
                <h3 className="text-[#0D1C2E] dark:text-white font-inter text-xl font-semibold leading-tight tracking-tight">
                  Group Organizer
                </h3>
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-sm leading-6">
                  Contact the organizer if you have specific questions before joining.
                </p>
              </div>

              {/* Capacity Bar */}
              <div className="flex flex-col items-end gap-2">
                <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider uppercase">
                  CAPACITY
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 rounded-full bg-[#E6EEFF] dark:bg-neutral-700 overflow-hidden relative">
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full bg-[#091426] dark:bg-[#D4B895] transition-all duration-500"
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>
                  <p className="text-[#000] dark:text-white font-inter text-sm font-bold leading-relaxed">
                    {group.currentMembers} of {group.maxMembers} filled
                  </p>
                </div>
              </div>
            </div>

            {/* Leader Card */}
            <div className="flex p-4 md:px-6 md:py-5 justify-between items-center border border-[#C6C6CD] dark:border-neutral-800 bg-[#F8F9FF] dark:bg-neutral-800/50 rounded-xl w-full">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl bg-[#E5F3F2] dark:bg-teal-900/30 w-12 h-12 overflow-hidden shadow-inner">
                   <span className="text-lg font-bold text-[#006A61] dark:text-teal-400">{group.leader.initials}</span>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-[#000] dark:text-white font-inter text-base font-bold leading-6">
                    {group.leader.name}
                  </p>
                  <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs leading-[18px] tracking-wider uppercase">
                    ORGANIZER
                  </p>
                </div>
              </div>
            </div>

            {/* Other Members */}
            {otherMembers.length > 0 && (
              <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-[#0D1C2E] dark:text-white font-inter text-lg font-semibold">
                  Other Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherMembers.map((member, idx) => (
                    <div key={idx} className="flex p-4 items-center gap-4 border border-[#C6C6CD] dark:border-neutral-800 bg-[#FFF] dark:bg-neutral-900 rounded-xl w-full">
                      <div className="flex flex-col items-center justify-center rounded-xl bg-gray-100 dark:bg-neutral-800 w-12 h-12 overflow-hidden shadow-inner shrink-0">
                         <span className="text-lg font-bold text-gray-500 dark:text-gray-300">{member.initials}</span>
                      </div>
                      <div className="flex flex-col items-start overflow-hidden">
                        <p className="text-[#000] dark:text-white font-inter text-base font-bold leading-6 truncate w-full">
                          {member.name}
                        </p>
                        <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs leading-[18px] tracking-wider uppercase truncate w-full">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
