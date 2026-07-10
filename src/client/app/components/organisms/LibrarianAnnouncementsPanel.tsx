"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '../../providers/I18nProvider';
import { ToggleSwitch, Toast, Skeleton } from '../atoms';
import { apiFetch } from '../../utils/apiClient';
import AnnouncementListItem, { type Announcement, type AnnouncementStatus } from '../molecules/AnnouncementListItem';

const mapBackendToFrontend = (ann: any): Announcement => ({
  id: ann.announceId,
  title: ann.title || '',
  status: (ann.status ? ann.status.toUpperCase() : 'DRAFT') as AnnouncementStatus,
  date: ann.createdAt 
    ? new Date(ann.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : '',
  expiryDate: ann.expiredDate ? String(ann.expiredDate).split('T')[0] : '',
  content: ann.content || '',
  isPinned: !!ann.isPinned
});

export default function LibrarianAnnouncementsPanel() {
  const { t } = useI18n();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Editor state
  const [editTitle, setEditTitle] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editIsPinned, setEditIsPinned] = useState(false);

  // The announcement currently open in the editor (undefined when creating a new one)
  const selectedAnnouncement = selectedId && selectedId !== 'new'
    ? announcements.find(a => a.id === selectedId)
    : undefined;

  const hasUnsavedChanges = () => {
    if (selectedId === 'new') {
      return !!(editTitle || editExpiryDate || editContent || editIsPinned);
    }
    if (selectedId) {
      const selected = announcements.find(a => a.id === selectedId);
      if (selected) {
        return (
          editTitle !== selected.title ||
          editExpiryDate !== selected.expiryDate ||
          editContent !== selected.content ||
          editIsPinned !== selected.isPinned
        );
      }
    }
    return false;
  };

  const handleSelectAnnouncement = (id: string | null) => {
    if (id === selectedId) return;
    if (hasUnsavedChanges()) {
      if (!confirm(t('announcements.unsaved_changes_warning'))) {
        return;
      }
    }
    setSelectedId(id);
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    const res = await apiFetch<{ announcements: any[] }>('/dashboard/librarian/announcements?limit=100');
    if (res.success && res.data) {
      const mapped = res.data.announcements.map(mapBackendToFrontend);
      setAnnouncements(mapped);
      if (mapped.length > 0) {
        setSelectedId(mapped[0].id);
      } else {
        setSelectedId(null);
      }
    } else {
      setToast({ message: res.message || 'Failed to fetch announcements.', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (selectedId && selectedId !== 'new') {
      const selected = announcements.find(a => a.id === selectedId);
      if (selected) {
        setEditTitle(selected.title);
        setEditExpiryDate(selected.expiryDate);
        setEditContent(selected.content);
        setEditIsPinned(selected.isPinned);
      }
    } else if (selectedId === 'new') {
      setEditTitle('');
      setEditExpiryDate('');
      setEditContent('');
      setEditIsPinned(false);
    } else {
      setEditTitle('');
      setEditExpiryDate('');
      setEditContent('');
      setEditIsPinned(false);
    }
  }, [selectedId, announcements]);

  /**
   * Saves the current editor content, optionally transitioning the announcement
   * to `targetStatus`. If `targetStatus` is omitted (or equals the current status),
   * only the details (title/content/expiry/pin) are persisted and the status is
   * left untouched — this is the "Save Changes" path used for already-published
   * or expired announcements.
   */
  const handleSave = async (targetStatus?: AnnouncementStatus) => {
    if (!selectedId) return;

    const isNew = selectedId === 'new';
    // For a brand-new announcement we need a concrete status to send to the API.
    const status: AnnouncementStatus = targetStatus ?? (selectedAnnouncement?.status || 'DRAFT');

    // Client-side validations
    if (!editTitle.trim()) {
      setToast({ message: t('announcements.validation_title_required'), type: 'error' });
      return;
    }
    if (!editContent.trim()) {
      setToast({ message: t('announcements.validation_content_required'), type: 'error' });
      return;
    }

    if (editExpiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiry = new Date(editExpiryDate);
      if (status === 'ACTIVE' && expiry < today) {
        setToast({ message: t('announcements.validation_expiry_past'), type: 'error' });
        return;
      }
    }

    // Unpublishing (ACTIVE -> DRAFT) removes the announcement from the public
    // page, so require an explicit confirmation instead of letting it happen
    // as a side effect of an unrelated content edit.
    if (!isNew && selectedAnnouncement?.status === 'ACTIVE' && status === 'DRAFT') {
      if (!confirm(t('announcements.confirm_unpublish'))) {
        return;
      }
    }

    setSaving(true);
    try {
      if (isNew) {
        const res = await apiFetch<any>('/dashboard/librarian/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            expired_date: editExpiryDate || null,
            status: status.toLowerCase(),
            is_pinned: editIsPinned
          })
        });
        if (res.success && res.data) {
          const saved = mapBackendToFrontend(res.data);
          setAnnouncements(prev => [saved, ...prev]);
          setSelectedId(saved.id);
          setToast({ message: 'Announcement created successfully!', type: 'success' });
        } else {
          setToast({ message: res.message || 'Failed to create announcement.', type: 'error' });
        }
      } else {
        const current = announcements.find(a => a.id === selectedId);
        if (!current) return;

        // Update details
        const detailsRes = await apiFetch<any>(`/dashboard/librarian/announcements/${selectedId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            expired_date: editExpiryDate || null,
            is_pinned: editIsPinned
          })
        });

        if (!detailsRes.success) {
          setToast({ message: detailsRes.message || 'Failed to update announcement details.', type: 'error' });
          return;
        }

        let updatedData = detailsRes.data;

        // Update local state with the successfully saved details immediately
        const detailsUpdated = mapBackendToFrontend(updatedData);
        setAnnouncements(prev => prev.map(a => a.id === selectedId ? detailsUpdated : a));

        // Only hit the status endpoint when the caller actually asked for a
        // status transition (targetStatus provided and different from current).
        if (targetStatus && current.status !== targetStatus) {
          const statusRes = await apiFetch<any>(`/dashboard/librarian/announcements/${selectedId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: targetStatus.toLowerCase()
            })
          });

          if (!statusRes.success) {
            setToast({ message: statusRes.message || 'Failed to update announcement status.', type: 'error' });
            return;
          }
          updatedData = statusRes.data;

          // Update local state again with the new status
          const finalUpdated = mapBackendToFrontend(updatedData);
          setAnnouncements(prev => prev.map(a => a.id === selectedId ? finalUpdated : a));
        }

        setToast({ message: 'Announcement updated successfully!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId || selectedId === 'new') return;
    
    if (confirm('Are you sure you want to delete this announcement?')) {
      setSaving(true);
      try {
        const res = await apiFetch<any>(`/dashboard/librarian/announcements/${selectedId}`, {
          method: 'DELETE'
        });
        if (res.success) {
          setAnnouncements(prev => prev.filter(a => a.id !== selectedId));
          setSelectedId(null);
          setToast({ message: 'Announcement deleted successfully!', type: 'success' });
        } else {
          setToast({ message: res.message || 'Failed to delete announcement.', type: 'error' });
        }
      } catch (err) {
        setToast({ message: 'An unexpected error occurred.', type: 'error' });
      } finally {
        setSaving(false);
      }
    }
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

  // Decide which action buttons to show based on the status of the
  // announcement currently open in the editor. Editing content never
  // silently changes status anymore — status transitions are explicit,
  // separate buttons.
  const renderActionButtons = () => {
    const btnBase = "px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const secondaryBtn = `${btnBase} border border-neutral-400 dark:border-slate-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-slate-800`;
    const primaryBtn = `${btnBase} bg-slate-900 dark:bg-amber-600 text-white hover:bg-slate-800 dark:hover:bg-amber-700`;
    const warningBtn = `${btnBase} border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30`;

    // Creating a brand-new announcement: draft or publish immediately.
    if (selectedId === 'new') {
      return (
        <>
          <button onClick={() => handleSave('DRAFT')} disabled={saving} className={secondaryBtn}>
            {t('announcements.save_draft')}
          </button>
          <button onClick={() => handleSave('ACTIVE')} disabled={saving} className={primaryBtn}>
            {saving ? t('announcements.loading_announcements') : t('announcements.publish_now')}
          </button>
        </>
      );
    }

    const status = selectedAnnouncement?.status;

    if (status === 'DRAFT') {
      return (
        <>
          <button onClick={() => handleSave()} disabled={saving} className={secondaryBtn}>
            {t('announcements.save_changes')}
          </button>
          <button onClick={() => handleSave('ACTIVE')} disabled={saving} className={primaryBtn}>
            {saving ? t('announcements.loading_announcements') : t('announcements.publish_now')}
          </button>
        </>
      );
    }

    if (status === 'ACTIVE') {
      return (
        <>
          <button onClick={() => handleSave('DRAFT')} disabled={saving} className={warningBtn}>
            {t('announcements.unpublish')}
          </button>
          <button onClick={() => handleSave()} disabled={saving} className={primaryBtn}>
            {saving ? t('announcements.loading_announcements') : t('announcements.save_changes')}
          </button>
        </>
      );
    }

    if (status === 'EXPIRED') {
      return (
        <>
          <button onClick={() => handleSave()} disabled={saving} className={secondaryBtn}>
            {t('announcements.save_changes')}
          </button>
          <button onClick={() => handleSave('ACTIVE')} disabled={saving} className={primaryBtn}>
            {saving ? t('announcements.loading_announcements') : t('announcements.republish')}
          </button>
        </>
      );
    }

    return null;
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
            onClick={() => handleSelectAnnouncement('new')}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-amber-600 text-white rounded-full text-xs font-bold font-hankenGrotesk hover:bg-slate-800 dark:hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>+</span>
            <span>{t('announcements.status_new')}</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 border border-neutral-200 dark:border-slate-800 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 py-20">
              {t('announcements.no_announcements')}
            </div>
          ) : (
            announcements.map((ann) => (
              <AnnouncementListItem
                key={ann.id}
                announcement={ann}
                isSelected={selectedId === ann.id}
                onClick={() => handleSelectAnnouncement(ann.id)}
                getStatusBadgeStyles={getStatusBadgeStyles}
                getStatusTranslation={getStatusTranslation}
              />
            ))
          )}
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
                disabled={saving}
                className="px-6 py-2 border border-red-500 text-red-500 rounded-full text-xs font-bold tracking-wider hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('announcements.delete')}
              </button>
            )}
            {renderActionButtons()}
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
                disabled={saving}
                className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow disabled:opacity-70"
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
                  disabled={saving}
                  className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow disabled:opacity-70"
                />
              </div>
              
              <div className="flex items-end pb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <ToggleSwitch
                    checked={editIsPinned}
                    onChange={saving ? () => {} : setEditIsPinned}
                    activeColor="bg-amber-600"
                    inactiveColor="bg-slate-300 dark:bg-slate-700"
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
                disabled={saving}
                rows={10}
                className="w-full p-4 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow resize-y disabled:opacity-70"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-400">
            Select an announcement to edit
          </div>
        )}
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}