"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '../../providers/I18nProvider';

export type AnnouncementStatus = 'ACTIVE' | 'DRAFT' | 'EXPIRED';

export interface Announcement {
  id: string;
  title: string;
  status: AnnouncementStatus;
  date: string;
  expiryDate: string;
  content: string;
  isPinned: boolean;
}

const initialMockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Winter Break Library Hours',
    status: 'ACTIVE',
    date: 'Oct 24, 2026',
    expiryDate: '2026-12-15',
    content: 'Please note that starting December 15th, the north wing will be closed for maintenance and lighting upgrades. All study rooms in this area will be unavailable.\n\nThe central lobby and southern reading rooms will remain open with standard holiday hours (9:00 AM - 5:00 PM). Thank you for your patience as we improve your study space!',
    isPinned: true
  },
  {
    id: '2',
    title: 'New Rare Book Acquisition',
    status: 'DRAFT',
    date: 'Oct 22, 2026',
    expiryDate: '',
    content: 'We are thrilled to announce the arrival of a first-edition collection of botanical prints.',
    isPinned: false
  },
  {
    id: '3',
    title: 'Annual Book Sale 2026',
    status: 'EXPIRED',
    date: 'Sep 15, 2026',
    expiryDate: '2026-09-30',
    content: 'Our yearly fundraising event is back! Join us in the main hall for deep discounts on donated books.',
    isPinned: false
  },
  {
    id: '4',
    title: 'Study Room Booking Policy',
    status: 'ACTIVE',
    date: 'Oct 10, 2026',
    expiryDate: '2027-01-01',
    content: 'Update: Group study rooms can now be reserved up to 2 weeks in advance via the new portal.',
    isPinned: false
  },
  {
    id: '5',
    title: 'New Digital Archive Access',
    status: 'ACTIVE',
    date: 'Sep 25, 2026',
    expiryDate: '2027-01-01',
    content: 'Students now have access to the national digital archive. Use your library credentials to log in.',
    isPinned: false
  },
  {
    id: '6',
    title: 'Weekend Maintenance',
    status: 'EXPIRED',
    date: 'Sep 01, 2026',
    expiryDate: '2026-09-03',
    content: 'The main server will be down for maintenance this weekend. Online catalogue will be unavailable.',
    isPinned: false
  },
  {
    id: '7',
    title: 'Guest Speaker: Author Q&A',
    status: 'DRAFT',
    date: 'Aug 15, 2026',
    expiryDate: '',
    content: 'We are hosting a Q&A with the author of "The Silent History". Seats are limited, please RSVP.',
    isPinned: false
  },
  {
    id: '8',
    title: 'New Poetry Collection',
    status: 'ACTIVE',
    date: 'Oct 05, 2026',
    expiryDate: '2026-11-05',
    content: 'Discover our latest additions to the modern poetry section on the 2nd floor.',
    isPinned: false
  },
  {
    id: '9',
    title: 'Late Fee Forgiveness Week',
    status: 'ACTIVE',
    date: 'Oct 01, 2026',
    expiryDate: '2026-10-08',
    content: 'Return your overdue items this week and all late fees will be waived!',
    isPinned: true
  },
  {
    id: '10',
    title: '3D Printer Out of Order',
    status: 'DRAFT',
    date: 'Sep 28, 2026',
    expiryDate: '',
    content: 'The MakerSpace 3D printer is currently undergoing maintenance. We apologize for the inconvenience.',
    isPinned: false
  },
  {
    id: '11',
    title: 'Summer Reading Challenge Winners',
    status: 'EXPIRED',
    date: 'Aug 30, 2026',
    expiryDate: '2026-09-10',
    content: 'Congratulations to everyone who participated in the Summer Reading Challenge. Check the lobby for the list of winners!',
    isPinned: false
  }
];

export default function LibrarianAnnouncementsPanel() {
  const { t } = useI18n();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialMockAnnouncements);
  const [selectedId, setSelectedId] = useState<string | null>('1');
  
  // Editor state
  const [editTitle, setEditTitle] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editIsPinned, setEditIsPinned] = useState(false);

  useEffect(() => {
    if (selectedId) {
      const selected = announcements.find(a => a.id === selectedId);
      if (selected) {
        setEditTitle(selected.title);
        setEditExpiryDate(selected.expiryDate);
        setEditContent(selected.content);
        setEditIsPinned(selected.isPinned);
      }
    } else {
      setEditTitle('');
      setEditExpiryDate('');
      setEditContent('');
      setEditIsPinned(false);
    }
  }, [selectedId, announcements]);

  const handleSave = (status: AnnouncementStatus) => {
    if (!selectedId) return;

    if (selectedId === 'new') {
      const newAnn: Announcement = {
        id: Date.now().toString(),
        title: editTitle,
        status,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        expiryDate: editExpiryDate,
        content: editContent,
        isPinned: editIsPinned
      };
      setAnnouncements([newAnn, ...announcements]);
      setSelectedId(newAnn.id);
    } else {
      setAnnouncements(prev => prev.map(a => 
        a.id === selectedId 
          ? { ...a, title: editTitle, expiryDate: editExpiryDate, content: editContent, isPinned: editIsPinned, status } 
          : a
      ));
    }
  };

  const handleDelete = () => {
    if (!selectedId || selectedId === 'new') return;
    setAnnouncements(prev => prev.filter(a => a.id !== selectedId));
    setSelectedId(null);
  };

  const getStatusBadgeStyles = (status: AnnouncementStatus) => {
    switch(status) {
      case 'ACTIVE': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300';
      case 'DRAFT': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'EXPIRED': return 'bg-gray-200 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusTranslation = (status: AnnouncementStatus) => {
    switch(status) {
      case 'ACTIVE': return t('announcements.status_active');
      case 'DRAFT': return t('announcements.status_draft');
      case 'EXPIRED': return t('announcements.status_expired');
      default: return status;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full mt-4">
      {/* LEFT PANE: List */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 shadow-sm overflow-hidden h-[720px]">
        <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-manrope">
            {t('announcements.all_announcements')}
          </h2>
          <button 
            onClick={() => {
              setSelectedId('new');
              setEditTitle('');
              setEditExpiryDate('');
              setEditContent('');
              setEditIsPinned(false);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-amber-600 text-white rounded-full text-xs font-bold font-hankenGrotesk hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors"
          >
            <span>+</span>
            <span>{t('announcements.status_new')}</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {announcements.map((ann) => (
            <div 
              key={ann.id}
              onClick={() => setSelectedId(ann.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedId === ann.id 
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-slate-900 dark:border-amber-500' 
                  : 'bg-white dark:bg-slate-800/50 border border-neutral-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
              } ${ann.status === 'EXPIRED' ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${getStatusBadgeStyles(ann.status)}`}>
                  {getStatusTranslation(ann.status)}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{ann.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{ann.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE: Editor */}
      <div className="w-full lg:w-2/3 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 shadow-sm h-[720px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-neutral-200 dark:border-slate-800 gap-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-hankenGrotesk">
            {t('announcements.editor_title')}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {selectedId && selectedId !== 'new' && (
              <button 
                onClick={handleDelete}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-full text-xs font-bold tracking-wider hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                {t('announcements.delete')}
              </button>
            )}
            <button 
              onClick={() => handleSave('DRAFT')}
              className="px-6 py-2 border border-neutral-400 dark:border-slate-600 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-bold tracking-wider hover:bg-neutral-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t('announcements.save_draft')}
            </button>
            <button 
              onClick={() => handleSave('ACTIVE')}
              className="px-6 py-2 bg-slate-900 dark:bg-amber-600 text-white rounded-full text-xs font-bold tracking-wider hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors"
            >
              {t('announcements.publish_now')}
            </button>
          </div>
        </div>

        {selectedId ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 tracking-wider">
                {t('announcements.announcement_title')}
              </label>
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 tracking-wider">
                  {t('announcements.expiry_date')}
                </label>
                <input 
                  type="date" 
                  value={editExpiryDate}
                  onChange={(e) => setEditExpiryDate(e.target.value)}
                  className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                />
              </div>
              
              <div className="flex items-end pb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${editIsPinned ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${editIsPinned ? 'translate-x-6' : ''}`}></div>
                  </div>
                  <input 
                    type="checkbox"
                    className="sr-only"
                    checked={editIsPinned}
                    onChange={(e) => setEditIsPinned(e.target.checked)}
                  />
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 tracking-wider">
                    {t('announcements.pin_to_homepage')}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 tracking-wider">
                {t('announcements.content_body')}
              </label>
              <textarea 
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={10}
                className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow resize-y"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-400">
            Select an announcement to edit
          </div>
        )}
      </div>
    </div>
  );
}
