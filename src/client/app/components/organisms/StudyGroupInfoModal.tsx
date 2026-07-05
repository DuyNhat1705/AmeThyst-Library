"use client";
import React, { useEffect } from 'react';
import { StudyGroup } from '../../study-together/mockData';
import { Button, GroupInfoRow, CapacityBar, MemberCard, ModalCloseButton } from '../atoms';

interface StudyGroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: StudyGroup | null;
  viewMode?: 'explore' | 'joined' | 'created';
}

export default function StudyGroupInfoModal({ isOpen, onClose, group, viewMode = 'explore' }: StudyGroupInfoModalProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ title: '', description: '', requirements: '' });

  useEffect(() => {
    if (group) {
      setEditForm({ 
        title: group.title, 
        description: group.description, 
        requirements: group.requirements?.join(', ') || '' 
      });
      setIsEditing(false);
    }
  }, [group]);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !group) return null;

  // Determine subject badge color (reuse from card)
  const getSubjectColor = (subj: string) => {
    const hash = subj.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
    ];
    return colors[hash % colors.length];
  };

  // Generate dummy members based on currentMembers (excluding the leader)
  const DUMMY_NAMES = ["Julianne Devis", "Marcus Thorne", "Sarah Chen", "Lina V.", "Samuel K.", "Emma Watson", "John Doe", "Alex Smith", "David Miller", "Emily Blunt"];
  const DUMMY_ROLES = ["LITERATURE MAJOR", "PHD RESEARCHER", "HUMANITIES SENIOR", "FRESHMAN", "COMPUTER SCIENCE MAJOR", "BUSINESS SENIOR"];
  
  const otherMembersCount = Math.max(0, group.currentMembers - 1);
  const otherMembers = Array.from({ length: otherMembersCount }).map((_, idx) => {
    const numericId = parseInt(group.id.replace(/\D/g, '') || '0');
    const seed = numericId + idx;
    const name = DUMMY_NAMES[seed % DUMMY_NAMES.length];
    const role = DUMMY_ROLES[(seed * 2) % DUMMY_ROLES.length];
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
    return { name, role, initials };
  });

  const isCreatorReadOnly = viewMode === 'created' && ['inprogress', 'completed', 'cancelled', 'expired'].includes(group.userStatus || '');
  const canEdit = viewMode === 'created' && !isCreatorReadOnly;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className={`bg-white ${viewMode === 'explore' ? 'dark:bg-neutral-900 dark:border-neutral-800' : 'dark:bg-[#1F1F1F] dark:border-neutral-700'} rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-scale-up border border-[#EAEAEA] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content Area */}
        <div className="flex flex-col p-6 md:p-8 gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Header Section */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full truncate max-w-[150px] shrink-0 ${getSubjectColor(group.subject)}`}>
                    {group.subject}
                  </span>
                  {viewMode === 'created' && group.userStatus && (
                    <span className={`text-[13px] font-bold px-3 py-1 rounded-full shrink-0 ${
                      group.userStatus === 'upcoming' ? 'bg-[#D8E3FB] text-[#0C447C]' : 
                      group.userStatus === 'inprogress' ? 'bg-[#86F2E4] text-[#27500A]' : 
                      group.userStatus === 'cancelled' ? 'bg-[#FBD8D8] text-[#7C0C0C]' :
                      group.userStatus === 'completed' ? 'bg-[#E8D8FB] text-[#4C0C7C]' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {group.userStatus.charAt(0).toUpperCase() + group.userStatus.slice(1)}
                    </span>
                  )}
                  {viewMode === 'joined' && group.userApplicantStatus && (
                    <span className={`text-[13px] font-bold px-3 py-1 rounded-full shrink-0 ${
                      group.userApplicantStatus === 'approved' ? 'bg-[#D8FBD8] text-[#0C7C0C]' : 
                      group.userApplicantStatus === 'pending' ? 'bg-[#FBEED8] text-[#7C5C0C]' : 
                      'bg-[#FBD8D8] text-[#7C0C0C]'
                    }`}>
                      {group.userApplicantStatus.charAt(0).toUpperCase() + group.userApplicantStatus.slice(1)}
                    </span>
                  )}
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    className="text-[#000] dark:text-white font-inter text-3xl font-semibold leading-tight tracking-tight border-b border-gray-300 dark:border-neutral-700 bg-transparent focus:outline-none"
                  />
                ) : (
                  <h2 className="text-[#000] dark:text-white font-inter text-3xl font-semibold leading-tight tracking-tight">
                    {group.title}
                  </h2>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {canEdit && (
                  <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 text-[#45464D] dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM16 3.4L14.6 2L16 3.4ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="currentColor"/>
                    </svg>
                    <span className="font-inter text-sm font-medium">Edit Settings</span>
                  </button>
                )}
                <ModalCloseButton onClick={onClose} />
              </div>
            </div>

            {/* Time & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <GroupInfoRow label="TIME RANGE" value={group.time} />
              <GroupInfoRow label="LOCATION" value={group.address} />
              <GroupInfoRow label="ROOM" value={group.room} />
            </div>
          </div>

          <hr className="border-[#EAEAEA] dark:border-neutral-800" />

          {/* Description & Requirements */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider uppercase">
                Description
              </p>
              {isEditing ? (
                <textarea 
                  value={editForm.description}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  className="w-full text-[#0D1C2E] dark:text-gray-200 font-inter text-base leading-relaxed border border-gray-300 dark:border-neutral-700 rounded-md p-2 bg-transparent focus:outline-none min-h-[100px]"
                />
              ) : (
                <p className="text-[#0D1C2E] dark:text-gray-200 font-inter text-base leading-relaxed">
                  {group.description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <p className="text-[#45464D] dark:text-gray-400 font-inter text-xs font-semibold leading-3 tracking-wider uppercase">
                Requirements
              </p>
              {isEditing ? (
                <textarea 
                  value={editForm.requirements}
                  onChange={e => setEditForm({...editForm, requirements: e.target.value})}
                  placeholder="Comma separated requirements"
                  className="w-full text-[#0D1C2E] dark:text-gray-200 font-inter text-sm border border-gray-300 dark:border-neutral-700 rounded-md p-2 bg-transparent focus:outline-none min-h-[60px]"
                />
              ) : (
                group.requirements && group.requirements.length > 0 ? (
                  <ul className="list-disc list-inside text-[#0D1C2E] dark:text-gray-200 font-inter text-sm flex flex-col gap-1.5 mt-1">
                    {group.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">None</p>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className={`flex flex-col gap-6 w-full ${viewMode === 'created' && (group.pendingApplicants ?? 0) > 0 ? 'md:w-2/3' : ''}`}>
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

                  <CapacityBar current={group.currentMembers} max={group.maxMembers} />
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
              </div>

              {/* Other Members */}
              {otherMembers.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#0D1C2E] dark:text-white font-inter text-lg font-semibold">
                      {viewMode === 'created' ? 'Members' : 'Other Members'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherMembers.map((member, idx) => (
                      <MemberCard
                        key={idx}
                        name={member.name}
                        initials={member.initials}
                        role={member.role}
                        canKick={canEdit}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pending Applicants for Creators (Right Column) */}
            {viewMode === 'created' && (group.pendingApplicants ?? 0) > 0 && (
              <div className="w-full md:w-1/3 flex flex-col gap-4 mt-4 md:mt-0 border border-[#EAEAEA] dark:border-neutral-800 p-4 md:p-6 rounded-xl relative shadow-sm h-fit">
                <div className="flex justify-between items-center mb-2 border-b border-[#EAEAEA] dark:border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-inter text-sm font-bold tracking-[0.1em] text-[#000] dark:text-white uppercase">Pending</span>
                  </div>
                  <div className="bg-[#E2AAAB] text-black px-2 py-0.5 rounded-xl text-xs font-bold">
                    {group.pendingApplicants}
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                  {Array.from({ length: group.pendingApplicants ?? 0 }).map((_, i) => {
                    const names = ['Samuel K.', 'Lina V.', 'Marcus T.', 'Elena R.'];
                    const initials = ['SK', 'LV', 'MT', 'ER'];
                    const times = ['2h', '5h', '1d', '2d'];
                    const quotes = [
                      "I'm struggling with Green's Theorem...",
                      "Looking for a group that stays focused.",
                      "I have past exams to share!",
                      "Need help preparing for the midterm."
                    ];
                    return (
                      <div key={i} className="flex flex-col gap-3 border-b border-[#EAEAEA] dark:border-neutral-800 pb-4 last:border-0 last:pb-0 shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-gray-500 text-xs">
                            {initials[i % initials.length]}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-openSans text-sm font-bold text-[#2E0052] dark:text-white">
                              {names[i % names.length]}
                            </span>
                            <span className="font-openSans text-[11px] text-[#4C4451] dark:text-gray-400">
                              Applied {times[i % times.length]} ago
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg border border-[#F1F5F9] dark:border-neutral-800 bg-white dark:bg-neutral-900 text-[#4C4451] dark:text-gray-300 text-xs font-openSans italic line-clamp-3">
                          "{quotes[i % quotes.length]}"
                        </div>
                        {canEdit && (
                          <div className="flex gap-2">
                            <button className="flex-1 py-1.5 rounded-lg bg-[#86F2E4] hover:bg-[#6be4d4] text-black font-openSans font-bold text-xs transition-colors">
                              Approve
                            </button>
                            <button className="flex-1 py-1.5 rounded-lg bg-[#F8EFE6] dark:bg-neutral-800 border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 font-openSans font-bold text-xs transition-colors">
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
            {/* Dissolve Group Button for Creators */}
            {canEdit && (
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#BA1A1A] text-white font-inter text-sm font-medium hover:bg-red-800 transition-colors">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.4 13.5L8 10.9L10.6 13.5L12 12.1L9.4 9.5L12 6.9L10.6 5.5L8 8.1L5.4 5.5L4 6.9L6.6 9.5L4 12.1L5.4 13.5ZM3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM3 3V16V3Z" fill="currentColor"/>
                  </svg>
                  Dissolve Group
                </button>
              </div>
            )}

            {/* Footer Actions for Joined/Explore Modes */}
            {(viewMode === 'joined' && group.userApplicantStatus === 'pending') && (
              <div className="flex justify-end pt-4 border-t border-[#EAEAEA] dark:border-neutral-800 mt-4">
                <Button variant="secondary" onClick={() => alert('Cancel request functionality to be implemented')}>
                  Cancel Request
                </Button>
              </div>
            )}

          </div>

        </div>
      </div>
  );
}
