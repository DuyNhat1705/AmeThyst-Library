import { expect } from 'vitest';
export const buildUser = (overrides = {}) => ({ userId: '00000000-0000-4000-8000-000000000001', username: 'student', avatar: null, ...overrides });
export const buildRoom = (overrides = {}) => ({ roomId: 1, branchId: 1, roomName: 'Room 101', branchName: 'Main Library', capacity: 4, imageUrl: null, ...overrides });
export const buildSlot = (overrides = {}) => ({ availId: 1, roomId: 1, startTime: '09:00:00', endTime: '11:00:00', ...overrides });
export const buildReservation = (overrides = {}) => ({ reserveId: '00000000-0000-4000-8000-000000000010', userId: buildUser().userId, availId: 1, startDate: '2030-01-10', status: 'reserved', ...overrides });
export const buildGroup = (overrides = {}) => ({ groupId: '00000000-0000-4000-8000-000000000020', createdBy: buildUser().userId, reserveId: buildReservation().reserveId, subject: 'Mathematics', title: 'Calculus Review', description: 'Review together', requirements: ['Bring notes'], capacity: 4, currentMembers: 1, status: 'upcoming', ...overrides });
export const buildRequest = (overrides = {}) => ({ requestId: '00000000-0000-4000-8000-000000000030', groupId: buildGroup().groupId, userId: '00000000-0000-4000-8000-000000000002', content: null, status: 'pending', createdAt: new Date('2030-01-01T00:00:00Z'), decidedAt: null, ...overrides });
export const buildTypedRequest = (overrides = {}) => ({ ...buildRequest(), type: 'request', ...overrides });
export const buildInvitation = (overrides = {}) => ({ ...buildRequest(), type: 'invite', ...overrides });
export const buildAuthRole = (role, userId = '00000000-0000-4000-8000-000000000001') => ({ userId, role });

export const assertSuccessEnvelope = (res) => {
  expect(res.body).toHaveProperty('success', true);
  expect(res.body).toHaveProperty('data');
};

export const assertErrorEnvelope = (res, expectedStatus, expectedCode) => {
  expect(res.status).toBe(expectedStatus);
  expect(res.body).toHaveProperty('success', false);
  expect(res.body).toHaveProperty('error');
  if (expectedCode) {
    expect(res.body.error.code).toBe(expectedCode);
  }
};

export const assertPaginationEnvelope = (res) => {
  assertSuccessEnvelope(res);
  expect(res.body).toHaveProperty('meta');
  expect(res.body.meta).toHaveProperty('page');
  expect(res.body.meta).toHaveProperty('pageSize');
  expect(res.body.meta).toHaveProperty('totalItems');
  expect(res.body.meta).toHaveProperty('totalPages');
};

export const buildSuccessResult = (data) => ({ success: true, data });
export const buildErrorResult = (code, message) => ({ success: false, error: { code, message } });
export const buildStaleResult = () => buildErrorResult('STALE_STATE', 'State is stale');
