import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { canLeaveBeforeStart } from '../../src/services/study-group.services.mjs';

describe('Study Group leave cutoff', () => {
  it('allows leaving at the exact three-hour Vietnam-time boundary and blocks inside it', () => {
    const group = { startDate: '2030-01-10', startTime: '15:00:00' };

    expect(canLeaveBeforeStart(group, new Date('2030-01-10T05:00:00.000Z'))).toBe(true);
    expect(canLeaveBeforeStart(group, new Date('2030-01-10T05:00:00.001Z'))).toBe(false);
  });

  it('uses the cutoff in projected permissions and rechecks it before deleting membership', async () => {
    const source = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');

    expect(source).toContain('canLeave: !host && manageable && canLeaveBeforeStart(summary)');
    expect(source).toContain("'LEAVE_CUTOFF'");
    expect(source).toMatch(/export const leaveGroup[\s\S]*canLeaveBeforeStart\(group\)[\s\S]*deleteApprovedMembership/);
  });
});
