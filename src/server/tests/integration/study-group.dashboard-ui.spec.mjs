import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readClient = (path) => readFile(new URL(`../../../client/app/${path}`, import.meta.url), 'utf8');

describe('Study Group dashboard UI invariants', () => {
  it('supports multi-status filters with All Status clearing selections', async () => {
    const page = await readClient('dashboard/user/yourstudygroups/page.tsx');

    expect(page).toContain('const [createdStatuses, setCreatedStatuses]');
    expect(page).toContain('const [joinedStatuses, setJoinedStatuses]');
    expect(page).toContain("option.value === 'all'");
    expect(page).toContain('? []');
    expect(page).toContain('statuses.includes');
  });

  it('confirms member removal before calling the mutation', async () => {
    const modal = await readClient('components/organisms/StudyGroupInfoModal.tsx');

    expect(modal).toContain('memberToRemove');
    expect(modal).toContain('role="alertdialog"');
    expect(modal).toContain("t('study_group.remove_member_title')");
    expect(modal).toContain('removeStudyGroupMember(group.id, memberToRemove.userId)');
    expect(modal.match(/mt-6 grid grid-cols-2 gap-3/g)).toHaveLength(4);
    expect(modal).toContain('inline-flex min-h-11 w-full items-center justify-center');
    expect(modal).toContain('actionError && <p role="alert"');
  });

  it('shows complete localized invitation metadata', async () => {
    const notifications = await readClient('components/molecules/AuthActions.tsx');

    expect(notifications).toContain("t('study_group.subject')");
    expect(notifications).toContain("t('study_group.members')");
    expect(notifications).toContain("t('study_group.time')");
    expect(notifications).toContain("t('study_group.branch')");
    expect(notifications).toContain('localizedBranchName');
    expect(notifications).toContain('localizedRoomName');
    expect(notifications).toContain('markInvitationRead(item.requestId)');
    expect(notifications).toContain('invitationsLoaded');
    expect(notifications).toContain('setInvitationUnavailable(true)');
    expect(notifications).toContain("result.error?.code === 'STALE_STATE'");
    expect(notifications).toContain('role="alertdialog"');
    expect(notifications).toContain("t('study_group.invitation_unavailable_title')");
    expect(notifications).toContain("t('study_group.invitation_unavailable')");
    expect(notifications).toContain("isRead ? 'opacity-55'");
    expect(notifications).toContain('const unreadCount = invitations.filter');
    expect(notifications.match(/t\('study_group\.subject'\)/g)).toHaveLength(2);
  });

  it('stores targeted lifecycle notifications in the account-scoped browser tray', async () => {
    const notifications = await readClient('components/molecules/AuthActions.tsx');
    const types = await readClient('types/studyGroup.ts');
    const en = await readClient('locales/en.json');
    const vi = await readClient('locales/vi.json');
    expect(notifications).toContain("socket.on('notification:new'");
    expect(notifications).toContain('study-group-system-notifications:');
    expect(notifications).toContain('systemNotifications');
    expect(notifications).toContain('selectedSystemNotification');
    expect(notifications).toContain('if (!selected && !selectedSystemNotification && !invitationUnavailable) return');
    expect(notifications).toContain("document.body.style.overflow = 'hidden'");
    expect(notifications).toContain('document.body.style.overflow = previousOverflow');
  expect(notifications).toContain("type === 'member_removed'");
    expect(notifications).toContain('NotificationActorCard');
    expect(notifications).toContain('selectedSystemNotification.actor');
    expect(notifications).toContain('selected.actor');
    expect(notifications).toContain('NotificationEventBanner');
    expect(notifications).toContain('NotificationEventIcon');
    expect(notifications).toContain('text-[clamp(1.125rem,4.5vw,1.5rem)]');
    expect(notifications).toContain('mt-1 break-words font-hankenGrotesk');
    expect(notifications).not.toContain('mt-1 truncate font-hankenGrotesk text-2xl');
    expect(notifications).toContain("type === 'invitation'");
    expect(notifications).toContain("type === 'member_removed'");
    expect(notifications).toContain("type === 'member_left'");
    expect(notifications).toContain("compact: 'bg-[#FFF7F6]");
    expect(notifications).not.toContain('rounded-xl border-l-4 px-3 py-3');
    expect(en).toContain('"notification_member_removed": "Removed from Study Group"');
    expect(en).toContain('"notification_member_left": "Member left your group"');
    expect(vi).toContain('"notification_member_removed": "Đã bị xóa khỏi nhóm học"');
    expect(vi).toContain('"notification_member_left": "Thành viên đã rời nhóm"');
    expect(notifications).toContain('const notificationFeed = [');
    expect(notifications).toContain("kind: 'invitation' as const");
    expect(notifications).toContain("kind: 'lifecycle' as const");
    expect(notifications).toContain('new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()');
    expect(notifications).toContain("import styles from './AuthActions.module.css'");
    expect(notifications).toContain('styles.notificationScroller');
    expect(notifications).toContain('styles.notificationScrollTrack');
    expect(notifications).toContain('styles.notificationScrollThumb');
    expect(notifications).toContain('contentHeight <= viewportHeight');
    expect(notifications).toContain('list.scrollTop / scrollRange');
    expect(notifications).toContain("type === 'group_dissolved'");
    expect(notifications).toContain('bg-[#FBE6E3] text-[#B3261E]');
    const styles = await readFile(new URL('../../../client/app/components/molecules/AuthActions.module.css', import.meta.url), 'utf8');
    expect(styles).toContain('scrollbar-width: none');
    expect(styles).toMatch(/\.notificationScroller::\-webkit-scrollbar\s*\{[^}]*display:\s*none;/);
    expect(styles).toContain('.notificationScrollTrack');
    expect(styles).toContain('.notificationScrollThumb');
    expect(types).toContain("'member_left'");
    expect(en).toContain('"notification_member_left"');
    expect(vi).toContain('"notification_member_left"');
  });

  it('renders Approved members read-only in Explore while preserving Joined status rules', async () => {
    const modal = await readClient('components/organisms/StudyGroupInfoModal.tsx');
    expect(modal).toContain("viewMode === 'explore'");
    expect(modal).toContain("viewMode === 'joined' && group.userApplicantStatus === 'approved'");
    expect(modal).toContain('showMemberList && (otherMembers.length > 0');
    expect(modal).toContain('canKick={canEdit}');
  });

  it('merges and deduplicates Study Groups and Freely Mode reservations', async () => {
    const dashboard = await readClient('dashboard/user/page.tsx');
    const dots = await readClient('components/atoms/CalendarEventDot.tsx');

    expect(dashboard).toContain("apiFetch<{ upcoming: Reservation[]; past: Reservation[] }>('/api/rooms/user-reservations')");
    expect(dashboard).toContain('listCreatedStudyGroups');
    expect(dashboard).toContain("item.participation.status === 'approved'");
    expect(dashboard).toContain('studyGroupReservationIds');
    expect(dashboard).toContain("type: 'study_group'");
    expect(dashboard).toContain("type: 'room_reservation'");
    expect(dots).toContain("room_reservation: 'bg-[#2F6FA3]'");
    expect(dots).toContain("study_group: 'bg-[#6E5191]'");
  });
});
