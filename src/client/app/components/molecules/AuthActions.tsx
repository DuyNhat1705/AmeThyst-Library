"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import { getAuthToken, getLoggedInUserInitials, useStoredUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';
import NotificationBell from './NotificationBell';
import { acceptStudyGroupInvitation, denyStudyGroupInvitation, listStudyGroupInvitations } from '../../utils/studyGroup';
import type { StudyGroupInvitation, StudyGroupLifecycleNotification, StudyGroupNotificationActor } from '../../types/studyGroup';
import { useSocket } from '../../utils/useSocket';
import { localizedBranchName, localizedRoomName } from '../../utils/room';
import UserAvatar from '../atoms/UserAvatar';
import styles from './AuthActions.module.css';

const displayDate = (value: string) => {
  const [year, month, day] = String(value).slice(0, 10).split('-');
  return year && month && day ? `${day}/${month}/${year}` : value;
};
const displayTime = (start: string, end: string) => `${String(start).slice(0, 5)} - ${String(end).slice(0, 5)}`;
const notificationDestinationHref = (notification: StudyGroupLifecycleNotification) => {
  const mode = notification.destination?.mode || 'dashboard';
  const groupId = notification.destination?.groupId || notification.groupId;
  if (mode === 'created') return `/dashboard/user/yourstudygroups/created/${groupId}`;
  if (mode === 'joined') return `/dashboard/user/yourstudygroups/joined/${groupId}`;
  return '/dashboard/user/yourstudygroups';
};

function NotificationActorCard({ actor }: { actor: StudyGroupNotificationActor }) {
  const { t } = useI18n();
  const initials = actor.username.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || '?';
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#DED7CE] bg-white/70 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800/70">
      <UserAvatar
        avatar={actor.avatar}
        initials={initials}
        alt={actor.username}
        className="h-11 w-11 shrink-0"
        fallbackClassName="bg-[#486C7E] text-sm font-bold text-white"
      />
      <div className="min-w-0">
        <span className="block font-manrope text-[10px] font-bold uppercase tracking-[.1em] text-[#486C7E] dark:text-[#9FC0CD]">
          {t('study_group.performed_by')}
        </span>
        <strong className="mt-0.5 block truncate font-hankenGrotesk text-sm text-[#0B1C30] dark:text-white">{actor.username}</strong>
        <span className="block truncate font-manrope text-xs text-[#686C71] dark:text-neutral-400">
          {actor.email || t('study_group.email_unavailable')}
        </span>
      </div>
    </div>
  );
}

type NotificationEventType = StudyGroupLifecycleNotification['type'] | 'invitation';

const notificationVisual = (type: NotificationEventType) => {
  if (type === 'invitation') return {
    icon: 'bg-[#DCEAEC] text-[#315A6B] dark:bg-[#173B49] dark:text-[#B9D5DE]',
    compact: 'bg-[#F4F9FA] dark:bg-[#10272F]/55',
    label: 'text-[#315A6B] dark:text-[#A9CBD6]',
    banner: 'border-[#9BBCC8] bg-[#EAF2F4] dark:border-[#315A6B] dark:bg-[#102D38]',
  };
  if (['member_removed', 'join_request_denied', 'invitation_declined'].includes(type)) return {
    icon: 'bg-[#F9E5DE] text-[#9A4935] dark:bg-[#4A261F] dark:text-[#F0B7A5]',
    compact: 'bg-[#FFF8F5] dark:bg-[#351D18]/55',
    label: 'text-[#9A4935] dark:text-[#F0B7A5]',
    banner: 'border-[#D9A797] bg-[#F9E9E3] dark:border-[#9A4935] dark:bg-[#3B211B]',
  };
  if (['member_left', 'join_request_submitted', 'join_request_cancelled', 'group_updated'].includes(type)) return {
    icon: 'bg-[#E4ECF3] text-[#486C7E] dark:bg-[#203844] dark:text-[#B4CFDA]',
    compact: 'bg-[#F5F9FB] dark:bg-[#172B34]/55',
    label: 'text-[#486C7E] dark:text-[#B4CFDA]',
    banner: 'border-[#9CB5C1] bg-[#EAF1F3] dark:border-[#486C7E] dark:bg-[#1A303A]',
  };
  if (['join_request_approved', 'member_joined'].includes(type)) return {
    icon: 'bg-[#E2F0E8] text-[#3F725B] dark:bg-[#1D3D30] dark:text-[#AED3BF]',
    compact: 'bg-[#F4FAF6] dark:bg-[#183127]/55',
    label: 'text-[#3F725B] dark:text-[#AED3BF]',
    banner: 'border-[#9EC3AE] bg-[#EAF4EE] dark:border-[#3F725B] dark:bg-[#1A3429]',
  };
  return {
    icon: 'bg-[#FBE6E3] text-[#B3261E] dark:bg-red-950/60 dark:text-red-300',
    compact: 'bg-[#FFF7F6] dark:bg-red-950/25',
    label: 'text-[#B3261E] dark:text-red-300',
    banner: 'border-[#E4A6A1] bg-[#FBE9E7] dark:border-[#B3261E] dark:bg-red-950/40',
  };
};

function NotificationEventIcon({ type, large = false }: { type: NotificationEventType; large?: boolean }) {
  const visual = notificationVisual(type);
  const iconClass = large ? 'h-12 w-12' : 'mt-1 h-9 w-9';
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${iconClass} ${visual.icon}`} aria-hidden="true">
      {type === 'invitation' && <svg viewBox="0 0 24 24" className={large ? 'h-6 w-6' : 'h-[18px] w-[18px]'} fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3zM3.5 7l8.5 6 8.5-6" /></svg>}
      {type === 'member_removed' && <svg viewBox="0 0 24 24" className={large ? 'h-6 w-6' : 'h-[18px] w-[18px]'} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3" /><path strokeLinecap="round" d="M3.5 19c.8-3.5 2.7-5 5.5-5s4.7 1.5 5.5 5M16 10h5" /></svg>}
      {type === 'member_left' && <svg viewBox="0 0 24 24" className={large ? 'h-6 w-6' : 'h-[18px] w-[18px]'} fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" /></svg>}
      {type === 'join_request_submitted' && <span className="text-lg font-black">?</span>}
      {type === 'join_request_cancelled' && <span className="text-lg font-black">↩</span>}
      {type === 'join_request_approved' && <span className="text-lg font-black">✓</span>}
      {type === 'join_request_denied' && <span className="text-lg font-black">×</span>}
      {type === 'member_joined' && <span className="text-xl font-black">+</span>}
      {type === 'invitation_declined' && <span className="text-lg font-black">×</span>}
      {type === 'group_updated' && <span className="text-base font-black">✎</span>}
      {type === 'group_dissolved' && <svg viewBox="0 0 24 24" className={large ? 'h-6 w-6' : 'h-[18px] w-[18px]'} fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.3 3.8 2.6 17.1A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.9L13.7 3.8a2 2 0 0 0-3.4 0Z" /><path strokeLinecap="round" d="M12 8v5M12 16.5h.01" /></svg>}
    </span>
  );
}

function NotificationEventBanner({ type, title, description }: { type: NotificationEventType; title: string; description: string }) {
  const { t } = useI18n();
  const visual = notificationVisual(type);
  const label = type === 'invitation' ? t('study_group.invitation') : t(`study_group.notification_${type}`);
  return (
    <div className={`rounded-2xl border p-5 ${visual.banner}`}>
      <div className="flex items-center gap-4">
        <NotificationEventIcon type={type} large />
        <div className="min-w-0">
          <p className={`font-manrope text-[10px] font-extrabold uppercase tracking-[.14em] ${visual.label}`}>{label}</p>
          <h2 id={type === 'invitation' ? 'invitation-title' : 'system-notification-title'} className="mt-1 break-words font-hankenGrotesk text-[clamp(1.125rem,4.5vw,1.5rem)] font-bold leading-[1.2] text-[#0B1C30] dark:text-white">{title}</h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#4F565D] dark:text-neutral-300">{description}</p>
    </div>
  );
}

export default function AuthActions() {
  const { locale, t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [invitations, setInvitations] = useState<StudyGroupInvitation[]>([]);
  const [invitationsLoaded, setInvitationsLoaded] = useState(false);
  const [invitationUnavailable, setInvitationUnavailable] = useState(false);
  const [readInvitationIds, setReadInvitationIds] = useState<string[]>([]);
  const [systemNotifications, setSystemNotifications] = useState<StudyGroupLifecycleNotification[]>([]);
  const [selected, setSelected] = useState<StudyGroupInvitation | null>(null);
  const [selectedSystemNotification, setSelectedSystemNotification] = useState<StudyGroupLifecycleNotification | null>(null);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollbar, setScrollbar] = useState({ visible: false, thumbHeight: 0, thumbTop: 0 });
  const handledLink = useRef(false);
  const notificationListRef = useRef<HTMLDivElement>(null);
  const user = useStoredUser();
  const socket = useSocket(getAuthToken());
  const readStorageKey = user ? `study-group-invitation-read:${user.userId || user.email || user.username}` : null;
  const systemStorageKey = user ? `study-group-system-notifications:${user.userId || user.email || user.username}` : null;
  const load = useCallback(async () => {
    const result = await listStudyGroupInvitations();
    if (result.success && result.data) {
      setInvitations(result.data);
      setInvitationsLoaded(true);
    }
  }, []);
  const closeUnavailableInvitation = useCallback(() => {
    setInvitationUnavailable(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('invitation');
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);
  useEffect(() => { // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true); }, []);
  useEffect(() => { if (user) { // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(); } }, [load, user]);
  useEffect(() => {
    if (!readStorageKey) return;
    try {
      const stored = JSON.parse(localStorage.getItem(readStorageKey) || '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReadInvitationIds(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string') : []);
    } catch {
      setReadInvitationIds([]);
    }
  }, [readStorageKey]);
  useEffect(() => {
    if (!systemStorageKey) return;
    try {
      const stored = JSON.parse(localStorage.getItem(systemStorageKey) || '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSystemNotifications(Array.isArray(stored) ? stored.slice(0, 50) : []);
    } catch {
      setSystemNotifications([]);
    }
  }, [systemStorageKey]);
  useEffect(() => {
    if (!socket) return;
    const refresh = () => void load();
    const receiveNotification = (notification: StudyGroupLifecycleNotification) => {
      setSystemNotifications((current) => {
        if (current.some((item) => item.id === notification.id)) return current;
        const next = [{ ...notification, read: false }, ...current].slice(0, 50);
        if (systemStorageKey) localStorage.setItem(systemStorageKey, JSON.stringify(next));
        return next;
      });
    };
    socket.on('study-group:changed', refresh);
    socket.on('notification:new', receiveNotification);
    return () => {
      socket.off('study-group:changed', refresh);
      socket.off('notification:new', receiveNotification);
    };
  }, [load, socket, systemStorageKey]);
  const markInvitationRead = useCallback((requestId: string) => {
    setReadInvitationIds((current) => {
      if (current.includes(requestId)) return current;
      const next = [...current, requestId];
      if (readStorageKey) localStorage.setItem(readStorageKey, JSON.stringify(next));
      return next;
    });
  }, [readStorageKey]);
  const openSystemNotification = useCallback((notification: StudyGroupLifecycleNotification) => {
    const next = systemNotifications.map((item) => item.id === notification.id ? { ...item, read: true } : item);
    setSystemNotifications(next);
    if (systemStorageKey) localStorage.setItem(systemStorageKey, JSON.stringify(next));
    setSelectedSystemNotification({ ...notification, read: true });
    setOpen(false);
  }, [systemNotifications, systemStorageKey]);
  const decide = async (invitation: StudyGroupInvitation, decision: 'accept' | 'deny') => {
    setActing(true); setError(null);
    const result = decision === 'accept'
      ? await acceptStudyGroupInvitation(invitation.group.groupId, invitation.requestId)
      : await denyStudyGroupInvitation(invitation.group.groupId, invitation.requestId);
    setActing(false);
    if (!result.success) {
      if (result.error?.code === 'NOT_FOUND' || result.error?.code === 'STALE_STATE' || result.error?.code === 'VALIDATION_ERROR') {
        setSelected(null);
        setInvitationUnavailable(true);
        setInvitations((items) => items.filter((item) => item.requestId !== invitation.requestId));
        return;
      }
      setError(result.message || t('study_group.invitation_action_error'));
      return;
    }
    setInvitations((items) => items.filter((item) => item.requestId !== invitation.requestId)); setSelected(null); setOpen(false);
    window.location.href = decision === 'accept'
      ? `/dashboard/user/yourstudygroups/joined/${invitation.group.groupId}?joined=1`
      : '/dashboard/user/yourstudygroups';
  };
  useEffect(() => {
    if (!mounted || handledLink.current || !invitationsLoaded) return;
    const params = new URLSearchParams(window.location.search);
    const requestId = params.get('invitation');
    if (!requestId) return;
    const invitation = invitations.find((item) => item.requestId === requestId);
    handledLink.current = true;
    if (!invitation) {
      window.setTimeout(() => setInvitationUnavailable(true), 0);
      return;
    }
    window.setTimeout(() => {
      markInvitationRead(invitation.requestId);
      setSelected(invitation);
    }, 0);
  }, [invitations, invitationsLoaded, markInvitationRead, mounted]);
  const updateNotificationScrollbar = useCallback(() => {
    const list = notificationListRef.current;
    if (!list) return;
    const viewportHeight = list.clientHeight;
    const contentHeight = list.scrollHeight;
    if (contentHeight <= viewportHeight || viewportHeight === 0) {
      setScrollbar({ visible: false, thumbHeight: 0, thumbTop: 0 });
      return;
    }
    const trackHeight = Math.max(0, viewportHeight - 16);
    const thumbHeight = Math.max(42, (viewportHeight / contentHeight) * trackHeight);
    const scrollRange = contentHeight - viewportHeight;
    const thumbRange = trackHeight - thumbHeight;
    const thumbTop = scrollRange > 0 ? (list.scrollTop / scrollRange) * thumbRange : 0;
    setScrollbar({ visible: true, thumbHeight, thumbTop });
  }, []);
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(updateNotificationScrollbar);
    const list = notificationListRef.current;
    const observer = list ? new ResizeObserver(updateNotificationScrollbar) : null;
    if (list) observer?.observe(list);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [invitations.length, open, systemNotifications.length, updateNotificationScrollbar]);
  useEffect(() => {
    if (!selected && !selectedSystemNotification && !invitationUnavailable) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [invitationUnavailable, selected, selectedSystemNotification]);
  if (!mounted) return <div className="h-10 w-24" />;
  if (!user) return <div className="flex items-center gap-4"><Link href="/login" className="hidden font-inter text-sm font-semibold text-white transition-colors hover:text-[#8FB2C1] sm:block">{t('navbar.sign_in')}</Link><Link href="/register"><Button variant="primary" className="h-auto rounded-lg bg-white px-6 py-2 !text-black hover:bg-[#DCE6EA]">{t('navbar.join_now')}</Button></Link></div>;
  const initials = getLoggedInUserInitials() || '?';
  const unreadCount = invitations.filter((item) => !readInvitationIds.includes(item.requestId)).length
    + systemNotifications.filter((item) => !item.read).length;
  const notificationFeed = [
    ...invitations.map((item) => ({ kind: 'invitation' as const, timestamp: item.invitedAt, item })),
    ...systemNotifications.map((item) => ({ kind: 'lifecycle' as const, timestamp: item.createdAt, item })),
  ].sort((left, right) => {
    const timeDifference = new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime();
    if (timeDifference !== 0) return timeDifference;
    const leftId = left.kind === 'invitation' ? left.item.requestId : left.item.id;
    const rightId = right.kind === 'invitation' ? right.item.requestId : right.item.id;
    return rightId.localeCompare(leftId);
  });
  return <div className="relative flex items-center gap-4">
    <NotificationBell enabled={true} locale={locale} t={t} userId={user?.userId} />
    <button onClick={() => setOpen((value) => !value)} className="relative text-white transition-colors hover:text-[#8FB2C1]" aria-label={t('profile.notifications_aria')} aria-expanded={open}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      {unreadCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D56A4A] px-1 text-[10px] font-bold text-white">{Math.min(9, unreadCount)}</span>}
    </button>
    {open && <div className="absolute right-10 top-12 z-[80] w-[min(360px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-[#DDD5CC] bg-[#FFFDF9] text-[#0B1C30] shadow-[0_24px_70px_rgba(7,17,31,.24)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
      <div className="border-b border-[#E8E1D9] px-5 py-4 dark:border-neutral-700"><p className="font-hankenGrotesk text-lg font-bold">{t('profile.notifications_title')}</p><p className="text-xs text-[#72767B] dark:text-neutral-400">{t('profile.notifications_subtitle')}</p></div>
      <div className="relative">
      <div ref={notificationListRef} onScroll={updateNotificationScrollbar} className={`${styles.notificationScroller} max-h-96 overflow-y-auto p-2 pr-4`}>{notificationFeed.length === 0 ? <p className="px-3 py-8 text-center text-sm text-[#72767B] dark:text-neutral-400">{t('profile.no_notifications')}</p> : notificationFeed.map((entry) => {
        if (entry.kind === 'lifecycle') {
          const notification = entry.item;
          const visual = notificationVisual(notification.type);
          return <button key={`lifecycle:${notification.id}`} onClick={() => openSystemNotification(notification)} className={`flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-[background-color,opacity,transform] hover:-translate-y-px ${visual.compact} ${notification.read ? 'opacity-55' : 'opacity-100'}`}>
            <NotificationEventIcon type={notification.type} />
            <span className="min-w-0 flex-1">
              <span className={`mb-0.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.12em] ${visual.label}`}>{!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}{t(`study_group.notification_${notification.type}`)}</span>
              <strong className="block truncate text-sm">{notification.group.title}</strong>
              <span className="block truncate text-xs text-[#686C71] dark:text-neutral-400">{t(`study_group.notification_${notification.type}_summary`).replace('{name}', notification.memberName || t('study_group.members'))}</span>
            </span>
          </button>;
        }
        const item = entry.item;
        const isRead = readInvitationIds.includes(item.requestId);
        const visual = notificationVisual('invitation');
        return <button key={`invitation:${item.requestId}`} onClick={() => { markInvitationRead(item.requestId); setSelected(item); setOpen(false); }} className={`flex w-full gap-3 rounded-xl px-3 py-3 text-left transition-[background-color,opacity,transform] hover:-translate-y-px ${visual.compact} ${isRead ? 'opacity-55' : 'opacity-100'}`}>
          <NotificationEventIcon type="invitation" />
          <span className="min-w-0 flex-1">
            <span className={`mb-0.5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.12em] ${visual.label}`}>{!isRead && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}{t('study_group.invitation')}</span>
            <strong className="block truncate text-sm">{item.group.title}</strong>
            <span className="block truncate text-xs text-[#686C71] dark:text-neutral-400">{t('study_group.invited_by').replace('{name}', item.group.host.username)}</span>
          </span>
        </button>;
      })}</div>
      {scrollbar.visible && (
        <span className={styles.notificationScrollTrack} aria-hidden="true">
          <span className={styles.notificationScrollThumb} style={{ height: `${scrollbar.thumbHeight}px`, transform: `translateY(${scrollbar.thumbTop}px)` }} />
        </span>
      )}
      </div>
    </div>}
    <Link href="/profile" aria-label={user.username}><UserAvatar avatar={user.avatar} initials={initials} alt={user.username} className="h-10 w-10 border border-neutral-700 transition-transform hover:scale-105" fallbackClassName="bg-[#486C7E] font-bold text-white" /></Link>
    {invitationUnavailable && <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07111F]/55 px-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) closeUnavailableInvitation(); }}><div role="alertdialog" aria-modal="true" aria-labelledby="unavailable-invitation-title" aria-describedby="unavailable-invitation-description" className="w-full max-w-sm rounded-2xl border border-[#E1D9D0] bg-[#FFFDF9] p-6 text-center text-[#0B1C30] shadow-[0_28px_80px_rgba(7,17,31,.3)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FBE6E3] text-[#B3261E]"><NotificationEventIcon type="group_dissolved" large /></div><h2 id="unavailable-invitation-title" className="font-hankenGrotesk text-xl font-bold">{t('study_group.invitation_unavailable_title')}</h2><p id="unavailable-invitation-description" className="mt-2 text-sm leading-6 text-[#65696E] dark:text-neutral-300">{t('study_group.invitation_unavailable')}</p><button onClick={closeUnavailableInvitation} className="mt-5 rounded-xl bg-[#0A3240] px-5 py-2.5 text-sm font-bold text-white">{t('study_group.back_to_groups')}</button></div></div>}
    {selected && <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07111F]/55 px-4 backdrop-blur-[2px]" onMouseDown={(e) => { if (e.target === e.currentTarget && !acting) setSelected(null); }}><div role="dialog" aria-modal="true" aria-labelledby="invitation-title" className="w-full max-w-lg rounded-2xl border border-[#E1D9D0] bg-[#FFFDF9] p-6 text-[#0B1C30] shadow-[0_28px_80px_rgba(7,17,31,.3)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"><NotificationEventBanner type="invitation" title={selected.group.title} description={t('study_group.invited_by').replace('{name}', selected.group.host.username)} /><NotificationActorCard actor={selected.actor || { userId: selected.group.host.userId, username: selected.group.host.username, email: selected.group.host.email || null, avatar: selected.group.host.avatar || null }} /><div className="my-5 grid grid-cols-2 gap-3 rounded-xl bg-[#F3EEE8] p-4 text-sm dark:bg-neutral-800"><span><b>{t('study_group.subject')}</b><br/>{selected.group.subject}</span><span><b>{t('study_group.members')}</b><br/>{selected.group.currentMembers}/{selected.group.capacity}</span><span><b>{t('study_group.date')}</b><br/>{displayDate(selected.group.reservation.startDate)}</span><span><b>{t('study_group.time')}</b><br/>{displayTime(selected.group.reservation.startTime, selected.group.reservation.endTime)}</span><span><b>{t('study_group.branch')}</b><br/>{localizedBranchName(t, selected.group.reservation.room.branchId, selected.group.reservation.room.branchName)}</span><span><b>{t('study_group.room')}</b><br/>{localizedRoomName(t, selected.group.reservation.room.roomId, selected.group.reservation.room.roomName)}</span></div>{selected.content && <p className="mb-4 rounded-lg border-l-4 border-[#7798A6] bg-[#EDF3F4] px-4 py-3 text-sm dark:bg-neutral-800">{selected.content}</p>}{error && <p role="alert" className="mb-3 text-sm text-red-600 dark:text-red-300">{error}</p>}<div className="flex justify-end gap-3"><button disabled={acting} onClick={() => void decide(selected, 'deny')} className="rounded-xl border border-[#AEB3B7] px-5 py-2.5 text-sm font-bold">{t('study_group.deny_invitation')}</button><button disabled={acting} onClick={() => void decide(selected, 'accept')} className="rounded-xl bg-[#0A3240] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{acting ? t('study_group.processing') : t('study_group.accept_invitation')}</button></div></div></div>}
    {selectedSystemNotification && <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07111F]/55 px-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedSystemNotification(null); }}><div role="dialog" aria-modal="true" aria-labelledby="system-notification-title" className="w-full max-w-lg rounded-2xl border border-[#E1D9D0] bg-[#FFFDF9] p-6 text-[#0B1C30] shadow-[0_28px_80px_rgba(7,17,31,.3)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"><NotificationEventBanner type={selectedSystemNotification.type} title={selectedSystemNotification.group.title} description={t(`study_group.notification_${selectedSystemNotification.type}_description`).replace('{name}', selectedSystemNotification.memberName || t('study_group.members'))} />{selectedSystemNotification.actor && <NotificationActorCard actor={selectedSystemNotification.actor} />}{selectedSystemNotification.changedFields?.length ? <div className="mt-4 rounded-xl border border-[#D8E4E8] bg-[#F4F8F9] px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-800"><b>{t('study_group.changed_fields')}</b><p className="mt-1 text-[#626970] dark:text-neutral-300">{selectedSystemNotification.changedFields.map((field) => t(`study_group.field_${field}`)).join(', ')}</p></div> : null}<div className="my-5 grid grid-cols-2 gap-3 rounded-xl bg-[#F3EEE8] p-4 text-sm dark:bg-neutral-800"><span><b>{t('study_group.subject')}</b><br/>{selectedSystemNotification.group.subject}</span>{selectedSystemNotification.type === 'member_joined' && typeof selectedSystemNotification.group.currentMembers === 'number' && typeof selectedSystemNotification.group.capacity === 'number' && <span><b>{t('study_group.members')}</b><br/>{selectedSystemNotification.group.currentMembers}/{selectedSystemNotification.group.capacity}</span>}<span><b>{t('study_group.date')}</b><br/>{displayDate(selectedSystemNotification.group.date)}</span><span><b>{t('study_group.time')}</b><br/>{displayTime(selectedSystemNotification.group.startTime, selectedSystemNotification.group.endTime)}</span><span><b>{t('study_group.branch')}</b><br/>{localizedBranchName(t, selectedSystemNotification.group.branchId, selectedSystemNotification.group.branchName)}</span><span><b>{t('study_group.room')}</b><br/>{localizedRoomName(t, selectedSystemNotification.group.roomId, selectedSystemNotification.group.roomName)}</span></div><div className="flex justify-end gap-3"><button onClick={() => setSelectedSystemNotification(null)} className="rounded-xl border border-[#AEB3B7] px-5 py-2.5 text-sm font-bold">{t('study_group.close')}</button><button onClick={() => { window.location.href = notificationDestinationHref(selectedSystemNotification); }} className="rounded-xl bg-[#0A3240] px-5 py-2.5 text-sm font-bold text-white">{selectedSystemNotification.destination?.mode === 'created' ? t('study_group.view_created_group') : selectedSystemNotification.destination?.mode === 'joined' ? t('study_group.view_joined_group') : t('study_group.view_your_groups')}</button></div></div></div>}
  </div>;
}