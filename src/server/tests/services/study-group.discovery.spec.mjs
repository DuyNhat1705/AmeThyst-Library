import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { denialRetryAt, projectSummary } from '../../src/services/study-group.services.mjs';

const row = (overrides = {}) => ({ groupId: 'g', hostUserId: 'host', hostUsername: 'Host', requirements: ['R'], capacity: 3, currentMembers: 1, status: 'upcoming', pendingCount: 0, reservationStatus: 'reserved', ...overrides });

describe('Study Group discovery eligibility', () => {
  it('queries only future groups with available capacity', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(model).toContain("(rr.start_date + ra.start_time) > ${VIETNAM_NOW_SQL}");
    expect(model).toContain('sg.current_num < sg.capacity');
    expect(model).toContain("to_char(rr.start_date, 'YYYY-MM-DD') AS \"startDate\"");
    expect(model).toContain('sr.branch_id = ANY');
    expect(model).toContain('sr.room_id = ANY');
    expect(model).toContain("approved_relationship.status = 'approved'");
    expect(model).toContain('NOT EXISTS');
    expect(model).toContain('sg.created_by <>');
    expect(model).toContain("pending_relationship.status = 'pending'");
    expect(model).toContain('THEN 0 ELSE 1 END');
    expect(model).toContain('rr.start_date + ra.start_time ASC');
  });

  it('allows an eligible non-host and blocks hosts/full/active participation', () => {
    expect(projectSummary(row(), 'student').canJoin).toBe(true);
    expect(projectSummary(row(), 'host').canJoin).toBe(false);
    expect(projectSummary(row({ status: 'full', currentMembers: 3 }), 'student').canJoin).toBe(false);
    expect(projectSummary(row({ participationRequestId: 'r', participationStatus: 'pending' }), 'student').canJoin).toBe(false);
  });
  it('enforces the exact 30-minute denial boundary', () => {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2030-01-01T00:29:59.999Z'));
      const denied = row({ participationRequestId: 'r', participationStatus: 'denied', participationDecidedAt: '2030-01-01T00:00:00Z' });
      expect(projectSummary(denied, 'student').canJoin).toBe(false);
      expect(projectSummary(denied, 'student').retryAt).toBe('2030-01-01T00:30:00.000Z');

      vi.setSystemTime(new Date('2030-01-01T00:30:00Z'));
      expect(projectSummary(denied, 'student').canJoin).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
  it('normalizes an equivalent Vietnam-offset denial instant before applying cooldown', () => {
    expect(denialRetryAt({ type: 'request', status: 'denied', decidedAt: '2030-01-01T07:00:00+07:00' })?.toISOString()).toBe('2030-01-01T00:30:00.000Z');
  });
  it('calculates cooldown only from denied join requests', () => {
    expect(denialRetryAt({ type: 'request', status: 'denied', decidedAt: '2030-01-01T00:00:00Z' })?.toISOString()).toBe('2030-01-01T00:30:00.000Z');
    expect(denialRetryAt({ type: 'invite', status: 'denied', decidedAt: '2030-01-01T00:00:00Z' })).toBeNull();
    expect(denialRetryAt({ type: 'request', status: 'approved', decidedAt: '2030-01-01T00:00:00Z' })).toBeNull();
  });
});
