import * as service from '../services/study-group.services.mjs';
import { emitStudyGroupChanged, emitUserNotification } from '../config/socket.mjs';

export const sendData = (res, data, status = 200, meta) =>
  res.status(status).json({ success: true, data, ...(meta ? { meta } : {}) });

export const sendMessage = (res, message, status = 200) =>
  res.status(status).json({ success: true, message });

export const sendStudyGroupError = (res, error) => res.status(error.status || 500).json({
  success: false,
  error: {
    code: error.code || 'INTERNAL_ERROR',
    message: error.message || 'An unexpected error occurred.',
    ...(error.details ? { details: error.details } : {}),
    ...(error.retryAt ? { retryAt: error.retryAt } : {}),
  },
});

export const currentUserId = (req) => req.user?.userId || null;

const action = (handler) => async (req, res) => {
  try { await handler(req, res); } catch (error) { sendStudyGroupError(res, error); }
};

export const createStudyGroupController = action(async (req, res) => {
  const data = await service.createStudyGroup(currentUserId(req), req.body);
  emitStudyGroupChanged(data.groupId, 'created');
  sendData(res, data, 201);
});
export const listStudyGroupsController = action(async (req, res) => { const result = await service.discoverGroups(currentUserId(req), req.studyGroupQuery || req.query); sendData(res, result.data, 200, result.meta); });
export const listCreatedStudyGroupsController = action(async (req, res) => { const result = await service.getCreatedGroups(currentUserId(req), req.studyGroupQuery || req.query); sendData(res, result.data, 200, result.meta); });
export const listJoinedStudyGroupsController = action(async (req, res) => { const result = await service.getJoinedGroups(currentUserId(req), req.studyGroupQuery || req.query); sendData(res, result.data, 200, result.meta); });
export const listStudyGroupInvitationsController = action(async (req, res) => sendData(res, await service.getPendingInvitations(currentUserId(req))));
export const getStudyGroupController = action(async (req, res) => sendData(res, await service.getDetail(req.params.groupId, currentUserId(req))));
const mutation = (changeType, handler, status = 200) => action(async (req, res) => {
  const data = await handler(req);
  emitStudyGroupChanged(req.params.groupId, changeType);
  sendData(res, data, status);
});

export const updateStudyGroupController = action(async (req, res) => {
  const result = await service.editStudyGroup(req.params.groupId, currentUserId(req), req.body);
  result.notificationRecipients.forEach((recipientId) => emitUserNotification(
    recipientId,
    lifecycleNotification('group_updated', req.params.groupId, result.notificationDetails),
  ));
  const { notificationRecipients, notificationDetails, ...detail } = result;
  emitStudyGroupChanged(req.params.groupId, 'updated');
  sendData(res, detail);
});
export const requestToJoinController = action(async (req, res) => {
  const result = await service.submitJoinRequest(req.params.groupId, currentUserId(req), req.body.content);
  emitNotifications(result.notifications, req.params.groupId);
  const { notifications, ...participation } = result;
  emitStudyGroupChanged(req.params.groupId, 'request-created');
  sendData(res, participation, 201);
});
export const approveJoinRequestController = action(async (req, res) => {
  const result = await service.approveRequest(req.params.groupId, req.params.requestId, currentUserId(req));
  emitNotifications(result.notifications, req.params.groupId);
  const { notifications, ...data } = result;
  emitStudyGroupChanged(req.params.groupId, 'request-approved');
  sendData(res, data);
});
export const denyJoinRequestController = action(async (req, res) => {
  const result = await service.denyRequest(req.params.groupId, req.params.requestId, currentUserId(req));
  emitNotifications(result.notifications, req.params.groupId);
  const { notifications, ...data } = result;
  emitStudyGroupChanged(req.params.groupId, 'request-denied');
  sendData(res, data);
});
export const cancelJoinRequestController = action(async (req, res) => {
  const result = await service.cancelRequest(req.params.groupId, req.params.requestId, currentUserId(req));
  emitNotifications(result.notifications, req.params.groupId);
  emitStudyGroupChanged(req.params.groupId, 'request-cancelled');
  sendMessage(res, 'Join request cancelled.');
});
const lifecycleNotification = (type, groupId, details) => ({
  id: details.eventId || `${type}:${groupId}:${Date.now()}`,
  type,
  groupId,
  createdAt: new Date().toISOString(),
  ...(details.memberName ? { memberName: details.memberName } : {}),
  ...(details.actor ? { actor: details.actor } : {}),
  ...(details.changedFields ? { changedFields: details.changedFields } : {}),
  ...(details.destination ? { destination: details.destination } : {}),
  group: {
    title: details.title,
    subject: details.subject,
    currentMembers: details.currentMembers,
    capacity: details.capacity,
    date: details.reservation?.startDate || details.date,
    startTime: details.reservation?.startTime || details.startTime || details.time?.split(' - ')[0],
    endTime: details.reservation?.endTime || details.endTime || details.time?.split(' - ')[1],
    roomName: details.reservation?.room?.roomName || details.roomName,
    branchName: details.reservation?.room?.branchName || details.branchName,
    roomId: details.reservation?.room?.roomId || details.roomId,
    branchId: details.reservation?.room?.branchId || details.branchId,
  },
});

const emitNotifications = (notifications = [], groupId) => {
  notifications.forEach(({ recipientId, type, details }) => {
    if (recipientId) emitUserNotification(recipientId, lifecycleNotification(type, groupId, details));
  });
};

export const removeStudyGroupMemberController = action(async (req, res) => {
  const result = await service.removeMember(req.params.groupId, req.params.userId, currentUserId(req));
  emitUserNotification(req.params.userId, lifecycleNotification('member_removed', req.params.groupId, result.notificationDetails));
  emitStudyGroupChanged(req.params.groupId, 'member-removed');
  sendData(res, result.detail);
});
export const leaveStudyGroupController = action(async (req, res) => {
  const result = await service.leaveGroup(req.params.groupId, currentUserId(req));
  if (result.notificationRecipient) {
    emitUserNotification(
      result.notificationRecipient,
      lifecycleNotification('member_left', req.params.groupId, result.notificationDetails),
    );
  }
  emitStudyGroupChanged(req.params.groupId, 'member-left');
  sendMessage(res, 'You left the Study Group.');
});
export const dissolveStudyGroupController = action(async (req, res) => {
  const result = await service.dissolveStudyGroup(req.params.groupId, currentUserId(req));
  const notification = lifecycleNotification('group_dissolved', req.params.groupId, result.notificationDetails);
  result.notificationRecipients.forEach((recipientId) => emitUserNotification(recipientId, notification));
  emitStudyGroupChanged(req.params.groupId, 'dissolved');
  sendData(res, { groupId: result.groupId, deleted: result.deleted });
});
export const inviteStudyGroupMemberController = mutation('invitation-created', (req) => service.inviteMember(req.params.groupId, currentUserId(req), req.body), 201);
export const acceptStudyGroupInvitationController = action(async (req, res) => {
  const result = await service.acceptInvitation(req.params.groupId, req.params.requestId, currentUserId(req));
  emitNotifications(result.notification ? [result.notification] : [], req.params.groupId);
  const { notification, creator, ...data } = result;
  emitStudyGroupChanged(req.params.groupId, 'invitation-accepted');
  sendData(res, data);
});
export const denyStudyGroupInvitationController = action(async (req, res) => {
  const result = await service.denyInvitation(req.params.groupId, req.params.requestId, currentUserId(req));
  emitNotifications(result.notification ? [result.notification] : [], req.params.groupId);
  const { notification, ...data } = result;
  emitStudyGroupChanged(req.params.groupId, 'invitation-denied');
  sendData(res, data);
});
