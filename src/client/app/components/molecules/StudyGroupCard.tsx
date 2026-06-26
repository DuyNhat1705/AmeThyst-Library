"use client";
import React from 'react';
import { Button } from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useI18n } from '../../providers/I18nProvider';

interface StudyGroupLeader {
  name: string;
  initials: string;
}

interface StudyGroupCardProps {
  id: string;
  subject: string;
  title: string;
  description: string;
  leader: StudyGroupLeader;
  time: string;
  address: string;
  room: string;
  currentMembers: number;
  maxMembers: number;
  status: 'Available' | 'Full';
  onJoin?: (id: string) => void;
}

export default function StudyGroupCard({
  id,
  subject,
  title,
  description,
  leader,
  time,
  address,
  room,
  currentMembers,
  maxMembers,
  status,
  onJoin
}: StudyGroupCardProps) {
  const { t } = useI18n();
  const isFull = status === 'Full';

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

  return (
    <div className={`p-6 rounded-2xl flex flex-col gap-4 bg-white dark:bg-neutral-900 border border-[#EAEAEA] dark:border-neutral-800 shadow-sm transition-all ${isFull ? 'opacity-80' : 'hover:shadow-lg hover:border-[#D4B895] cursor-pointer'}`}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getSubjectColor(subject)}`}>
          {subject}
        </span>
      </div>

      {/* Title & Desc */}
      <div className="flex flex-col gap-1">
        <h3 className="font-manrope text-xl font-bold text-[#0B1C30] dark:text-white leading-snug">
          {title}
        </h3>
        <p className="font-inter text-sm text-[#75777D] dark:text-gray-400 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 text-sm text-[#486C7E] dark:text-gray-300 mt-auto">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <span>{room}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#EAEAEA] dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E5F3F2] dark:bg-teal-900/30 flex items-center justify-center text-[#006A61] dark:text-teal-400 font-bold text-xs">
            {leader.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Leader</span>
            <span className="text-sm font-semibold text-[#0B1C30] dark:text-white">{leader.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-[#0B1C30] dark:text-white">
          <svg className="w-4 h-4 text-[#75777D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span>{currentMembers}/{maxMembers}</span>
        </div>
      </div>

      {/* Join Action */}
      <div className="mt-2">
        <Button 
          variant={isFull ? 'secondary' : 'primary'}
          className="w-full py-2.5"
          disabled={isFull}
          onClick={() => onJoin && onJoin(id)}
        >
          {isFull ? t('study_together.status_full') : t('study_together.join_group')}
        </Button>
      </div>
    </div>
  );
}
