import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/models/study-group.models.mjs', () => ({
  withTransaction: vi.fn((work) => work({ query: vi.fn() })),
  findSlotForCreation: vi.fn(),
  insertReservation: vi.fn(),
  insertStudyGroup: vi.fn(),
  findGroupDetail: vi.fn(),
}));

import * as model from '../../src/models/study-group.models.mjs';
import { createStudyGroup, normalizeRequirements } from '../../src/services/study-group.services.mjs';

describe('Study Group creation service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    model.findSlotForCreation.mockResolvedValue({ capacity: 4 });
    model.insertReservation.mockResolvedValue({ reserveId: '00000000-0000-4000-8000-000000000010' });
    model.insertStudyGroup.mockResolvedValue({ groupId: '00000000-0000-4000-8000-000000000020' });
    model.findGroupDetail.mockResolvedValue({
      summary: { groupId: '00000000-0000-4000-8000-000000000020', hostUserId: '00000000-0000-4000-8000-000000000001', hostUsername: 'host', requirements: ['Bring notes'], capacity: 4, currentMembers: 1, status: 'upcoming', reservationStatus: 'reserved' },
      requests: [],
    });
  });

  it('trims blanks while preserving requirement order', () => {
    expect(normalizeRequirements([' first ', ' ', 'second'])).toEqual(['first', 'second']);
  });

  it('creates the reservation before the group with room-derived capacity', async () => {
    await createStudyGroup('00000000-0000-4000-8000-000000000001', { availId: 1, startDate: '2030-01-10', title: 'Title', description: 'Description', subject: 'Math', requirements: ['Notes'] });
    expect(model.insertReservation).toHaveBeenCalled();
    expect(model.insertStudyGroup).toHaveBeenCalledWith(expect.objectContaining({ capacity: 4 }), expect.anything());
    expect(model.insertReservation.mock.invocationCallOrder[0]).toBeLessThan(model.insertStudyGroup.mock.invocationCallOrder[0]);
  });

  it('accepts zero requirements and rejects more than five', async () => {
    await expect(createStudyGroup('user', { availId: 1, startDate: '2030-01-10', title: 'Title', description: 'Description', subject: 'Subject', requirements: [' '] })).resolves.toBeTruthy();
    await expect(createStudyGroup('user', { availId: 1, startDate: '2030-01-10', title: 'T', description: 'D', subject: 'S', requirements: ['1','2','3','4','5','6'] })).rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
  });

  it('rejects title or subject without letters', async () => {
    await expect(createStudyGroup('user', { availId: 1, startDate: '2030-01-10', title: '123', description: 'Description', subject: 'Math', requirements: [] })).rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
    await expect(createStudyGroup('user', { availId: 1, startDate: '2030-01-10', title: 'CS50', description: 'Description', subject: '123', requirements: [] })).rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
  });
});
