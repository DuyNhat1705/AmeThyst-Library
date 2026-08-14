import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as model from '../../src/models/study-group.models.mjs';
import {
  sendStudyGroupDissolvedEmail,
  sendStudyGroupInvitationEmail,
  sendStudyGroupMemberJoinedEmail,
} from '../../src/utils/mailer.mjs';
import {
  acceptInvitation,
  approveRequest,
  cancelRequest,
  createStudyGroup,
  dissolveStudyGroup,
  inviteMember,
  submitJoinRequest,
} from '../../src/services/study-group.services.mjs';

vi.mock('../../src/models/study-group.models.mjs', () => ({
  withTransaction: vi.fn(),
  findSlotForCreation: vi.fn(),
  insertReservation: vi.fn(),
  insertStudyGroup: vi.fn(),
  findGroupDetail: vi.fn(),
  lockGroup: vi.fn(),
  lockRequest: vi.fn(),
  findLatestParticipation: vi.fn(),
  deleteDeniedParticipations: vi.fn(),
  insertJoinRequest: vi.fn(),
  findNotificationUser: vi.fn(),
  findGroupCreatorNotificationUser: vi.fn(),
  setRequestStatus: vi.fn(),
  reconcileMemberCount: vi.fn(),
  deletePendingRequest: vi.fn(),
  findUserByEmail: vi.fn(),
  insertInvitation: vi.fn(),
  deletePendingInvitation: vi.fn(),
  listGroupNotificationRecipients: vi.fn(),
  dissolveGroup: vi.fn(),
}));

vi.mock('../../src/utils/mailer.mjs', () => ({
  sendStudyGroupDissolvedEmail: vi.fn(),
  sendStudyGroupInvitationEmail: vi.fn(),
  sendStudyGroupMemberJoinedEmail: vi.fn(),
  sendStudyGroupMemberLeftEmail: vi.fn(),
  sendStudyGroupRemovalEmail: vi.fn(),
  sendStudyGroupRequestApprovedEmail: vi.fn(),
  sendStudyGroupRequestDeniedEmail: vi.fn(),
  sendStudyGroupRequestSubmittedEmail: vi.fn(),
}));

const client = { name: 'study-group-test-client' };
const groupId = 'group-1';
const hostId = 'host-1';
const memberId = 'member-1';
const requestId = 'request-1';

const manageableGroup = (overrides = {}) => ({
  group_id: groupId,
  created_by: hostId,
  status: 'upcoming',
  reservation_status: 'reserved',
  start_date: '2099-08-01',
  start_time: '09:00:00',
  end_time: '10:00:00',
  current_num: 1,
  capacity: 4,
  ...overrides,
});

const detailRecord = (overrides = {}) => ({
  summary: {
    groupId,
    subject: 'Algorithms',
    title: 'Algorithm Study Group',
    description: 'Prepare for the final examination.',
    requirements: ['Bring notes'],
    hostUserId: hostId,
    hostUsername: 'Host User',
    hostAvatar: null,
    hostRole: 'user',
    reserveId: 'reserve-1',
    startDate: '2099-08-01',
    startTime: '09:00:00',
    endTime: '10:00:00',
    reservationStatus: 'reserved',
    roomId: 'room-1',
    roomName: 'Room 101',
    branchId: 'branch-1',
    branchName: 'Central Library',
    roomCapacity: 4,
    capacity: 4,
    currentMembers: 1,
    status: 'upcoming',
    pendingCount: 0,
    createdAt: '2026-07-31T00:00:00.000Z',
    updatedAt: '2026-07-31T00:00:00.000Z',
    ...overrides,
  },
  organizer: {
    userId: hostId,
    username: 'Host User',
    email: 'host@example.com',
    role: 'user',
  },
  requests: [],
});

const user = (userId, email, username = 'Member User') => ({
  userId,
  email,
  username,
  role: 'user',
  avatar: null,
});

describe('Study Group Service - critical business rules', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    model.withTransaction.mockImplementation(async (callback) => callback(client));
    model.lockGroup.mockResolvedValue(manageableGroup());
    model.findGroupDetail.mockResolvedValue(detailRecord());
    model.findNotificationUser.mockResolvedValue(user(memberId, 'member@example.com'));
    model.findGroupCreatorNotificationUser.mockResolvedValue(user(hostId, 'host@example.com', 'Host User'));
    model.reconcileMemberCount.mockResolvedValue(true);
    model.deleteDeniedParticipations.mockResolvedValue(1);
    model.deletePendingInvitation.mockResolvedValue(true);
    sendStudyGroupInvitationEmail.mockResolvedValue(true);
    sendStudyGroupMemberJoinedEmail.mockResolvedValue(true);
    sendStudyGroupDissolvedEmail.mockResolvedValue(true);
  });

  describe('Test 1 - Atomic group creation', { tags: '@SG_1' }, () => {
    it('[TC-SRV-SG-001] creates the reservation before the group and links the generated reserveId', async () => {
      model.findSlotForCreation.mockResolvedValue({ capacity: 4, occupied: false });
      model.insertReservation.mockResolvedValue({ reserveId: 'reserve-1' });
      model.insertStudyGroup.mockResolvedValue({ groupId });

      const result = await createStudyGroup(hostId, {
        availId: 'availability-1',
        startDate: '2099-08-01',
        title: ' Algorithm Study Group ',
        description: ' Prepare for the final examination. ',
        subject: ' Algorithms ',
        requirements: [' Bring notes '],
      });

      expect(model.withTransaction).toHaveBeenCalledTimes(1);
      expect(model.insertReservation).toHaveBeenCalledWith({
        userId: hostId,
        availId: 'availability-1',
        startDate: '2099-08-01',
      }, client);
      expect(model.insertStudyGroup).toHaveBeenCalledWith(expect.objectContaining({
        userId: hostId,
        reserveId: 'reserve-1',
        title: 'Algorithm Study Group',
        capacity: 4,
      }), client);
      expect(model.insertReservation.mock.invocationCallOrder[0])
        .toBeLessThan(model.insertStudyGroup.mock.invocationCallOrder[0]);
      expect(result.groupId).toBe(groupId);
    });
  });

  describe('Test 2 - Elapsed or unavailable slot rejection', { tags: '@SG_2' }, () => {
    it('[TC-SRV-SG-002] rejects a slot omitted by the authoritative availability lookup without writing data', async () => {
      model.findSlotForCreation.mockResolvedValue(null);

      await expect(createStudyGroup(hostId, {
        availId: 'elapsed-availability',
        startDate: '2020-01-01',
        title: 'Algorithms',
        description: 'Study session',
        subject: 'Computer Science',
      })).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 });

      expect(model.insertReservation).not.toHaveBeenCalled();
      expect(model.insertStudyGroup).not.toHaveBeenCalled();
    });
  });

  describe('Test 3 - Join retry after denial cooldown', { tags: '@SG_3' }, () => {
    it('[TC-SRV-SG-003] removes the expired denial and creates exactly one new pending request', async () => {
      model.findLatestParticipation.mockResolvedValue({
        type: 'request',
        status: 'denied',
        decidedAtUtc: '2020-01-01T00:00:00.000Z',
      });
      model.insertJoinRequest.mockResolvedValue({
        request_id: requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'request',
        status: 'pending',
        content: 'Please let me join.',
      });

      const result = await submitJoinRequest(groupId, memberId, 'Please let me join.');

      expect(model.deleteDeniedParticipations).toHaveBeenCalledTimes(1);
      expect(model.insertJoinRequest).toHaveBeenCalledTimes(1);
      expect(model.deleteDeniedParticipations.mock.invocationCallOrder[0])
        .toBeLessThan(model.insertJoinRequest.mock.invocationCallOrder[0]);
      expect(result).toMatchObject({ requestId, type: 'request', status: 'pending' });
    });
  });

  describe('Test 4 - Duplicate active participation', { tags: '@SG_4' }, () => {
    it('[TC-SRV-SG-004] rejects an existing pending or approved relationship before inserting another request', async () => {
      for (const status of ['pending', 'approved']) {
        model.findLatestParticipation.mockResolvedValueOnce({ type: 'request', status });
        await expect(submitJoinRequest(groupId, memberId, 'Duplicate request'))
          .rejects.toMatchObject({ code: 'DUPLICATE_PARTICIPATION', status: 409 });
      }

      expect(model.deleteDeniedParticipations).not.toHaveBeenCalled();
      expect(model.insertJoinRequest).not.toHaveBeenCalled();
    });
  });

  describe('Test 5 - Request approval and capacity reconciliation', { tags: '@SG_5' }, () => {
    it('[TC-SRV-SG-005] approves only a pending request, increments capacity once, and returns both notifications', async () => {
      model.lockRequest.mockResolvedValue({
        request_id: requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'request',
        status: 'pending',
      });
      model.setRequestStatus.mockResolvedValue({
        request_id: requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'request',
        status: 'approved',
      });

      const result = await approveRequest(groupId, requestId, hostId);

      expect(model.setRequestStatus).toHaveBeenCalledWith(
        requestId, 'request', 'pending', 'approved', client,
      );
      expect(model.reconcileMemberCount).toHaveBeenCalledTimes(1);
      expect(model.reconcileMemberCount).toHaveBeenCalledWith(groupId, 1, client);
      expect(result.notifications.map(({ type }) => type)).toEqual([
        'join_request_approved',
        'member_joined',
      ]);
    });
  });

  describe('Test 6 - Request actions cannot mutate invitations', { tags: '@SG_6' }, () => {
    it('[TC-SRV-SG-006] rejects approve and cancel request operations when the target is an invitation', async () => {
      model.lockRequest.mockResolvedValue({
        request_id: requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'invite',
        status: 'pending',
      });
      model.deletePendingRequest.mockResolvedValue(null);

      await expect(approveRequest(groupId, requestId, hostId))
        .rejects.toMatchObject({ code: 'STALE_STATE', status: 409 });
      await expect(cancelRequest(groupId, requestId, memberId))
        .rejects.toMatchObject({ code: 'STALE_STATE', status: 409 });

      expect(model.setRequestStatus).not.toHaveBeenCalled();
      expect(model.reconcileMemberCount).not.toHaveBeenCalled();
      expect(model.deletePendingRequest).toHaveBeenCalledWith(
        groupId, requestId, memberId, client,
      );
    });
  });

  describe('Test 7 - Invitee role restriction', { tags: '@SG_7' }, () => {
    it('[TC-SRV-SG-007] rejects librarian and admin accounts without creating or emailing an invitation', async () => {
      for (const role of ['librarian', 'admin']) {
        model.findUserByEmail.mockResolvedValueOnce({
          ...user(`${role}-1`, `${role}@example.com`),
          role,
        });
        await expect(inviteMember(groupId, hostId, { email: `${role}@example.com` }))
          .rejects.toMatchObject({ code: 'INELIGIBLE_INVITEE', status: 403 });
      }

      expect(model.insertInvitation).not.toHaveBeenCalled();
      expect(sendStudyGroupInvitationEmail).not.toHaveBeenCalled();
    });
  });

  describe('Test 8 - Invitation email compensation', { tags: '@SG_8' }, () => {
    it('[TC-SRV-SG-008] deletes the pending invitation when SMTP delivery fails', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      model.findUserByEmail.mockResolvedValue(user(memberId, 'member@example.com'));
      model.findLatestParticipation.mockResolvedValue(null);
      model.insertInvitation.mockResolvedValue({
        request_id: requestId,
        requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'invite',
        status: 'pending',
      });
      sendStudyGroupInvitationEmail.mockRejectedValue(new Error('SMTP unavailable'));

      await expect(inviteMember(groupId, hostId, { email: 'member@example.com' }))
        .rejects.toMatchObject({ code: 'EMAIL_DELIVERY_FAILED', status: 502 });

      expect(model.deletePendingInvitation).toHaveBeenCalledWith(requestId);
      consoleError.mockRestore();
    });
  });

  describe('Test 9 - Invitation recipient authorization', { tags: '@SG_9' }, () => {
    it('[TC-SRV-SG-009] allows only the intended recipient to accept and increments capacity exactly once', async () => {
      const invitation = {
        request_id: requestId,
        group_id: groupId,
        user_id: memberId,
        type: 'invite',
        status: 'pending',
      };
      model.lockRequest.mockResolvedValue(invitation);

      await expect(acceptInvitation(groupId, requestId, 'another-user'))
        .rejects.toMatchObject({ code: 'FORBIDDEN', status: 403 });
      expect(model.setRequestStatus).not.toHaveBeenCalled();
      expect(model.reconcileMemberCount).not.toHaveBeenCalled();

      model.setRequestStatus.mockResolvedValue({ ...invitation, status: 'approved' });
      const result = await acceptInvitation(groupId, requestId, memberId);

      expect(model.setRequestStatus).toHaveBeenCalledWith(
        requestId, 'invite', 'pending', 'approved', client,
      );
      expect(model.reconcileMemberCount).toHaveBeenCalledTimes(1);
      expect(model.reconcileMemberCount).toHaveBeenCalledWith(groupId, 1, client);
      expect(result.participation).toMatchObject({ type: 'invite', status: 'approved' });
    });
  });

  describe('Test 10 - Transactional group dissolution', { tags: '@SG_10' }, () => {
    it('[TC-SRV-SG-010] snapshots recipients, deletes in the transaction, then notifies all recipients', async () => {
      const recipients = [
        user('member-1', 'member1@example.com', 'Member One'),
        user('member-2', 'member2@example.com', 'Member Two'),
      ];
      model.listGroupNotificationRecipients.mockResolvedValue(recipients);
      model.dissolveGroup.mockResolvedValue(true);

      const result = await dissolveStudyGroup(groupId, hostId);

      expect(model.listGroupNotificationRecipients).toHaveBeenCalledWith(groupId, hostId, client);
      expect(model.dissolveGroup).toHaveBeenCalledWith(expect.objectContaining({ group_id: groupId }), client);
      expect(model.listGroupNotificationRecipients.mock.invocationCallOrder[0])
        .toBeLessThan(model.dissolveGroup.mock.invocationCallOrder[0]);
      expect(result).toMatchObject({
        groupId,
        deleted: true,
        notificationRecipients: ['member-1', 'member-2'],
      });
      await vi.waitFor(() => expect(sendStudyGroupDissolvedEmail).toHaveBeenCalledTimes(2));
      expect(model.withTransaction.mock.invocationCallOrder[0])
        .toBeLessThan(sendStudyGroupDissolvedEmail.mock.invocationCallOrder[0]);
    });
  });
});
