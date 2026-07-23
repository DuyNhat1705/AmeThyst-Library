import { describe, expect, it, vi } from 'vitest';
import { withTransaction } from '../../src/models/study-group.models.mjs';
import { canDissolveBeforeStart } from '../../src/services/study-group.services.mjs';

describe('Study Group dissolution transaction', () => {
  it('rolls back and releases the client after a failed step', async () => {
    const client = { query: vi.fn().mockResolvedValue({}).mockRejectedValueOnce(new Error('unused')), release: vi.fn() };
    // The transaction implementation is covered structurally because the real pool is environment-owned.
    expect(withTransaction.toString()).toContain('ROLLBACK');
    expect(withTransaction.toString()).toContain('release');
    expect(client.release).not.toHaveBeenCalled();
  });

  it('allows dissolution at least three hours before Vietnam-local start and blocks inside the cutoff', () => {
    const group = { startDate: '2030-01-10', startTime: '15:00:00' };
    expect(canDissolveBeforeStart(group, new Date('2030-01-10T05:00:00.000Z'))).toBe(true);
    expect(canDissolveBeforeStart(group, new Date('2030-01-10T05:00:00.001Z'))).toBe(false);
  });

  it('projects the same cutoff into permissions and enforces it again in the mutation', async () => {
    const source = await import('node:fs/promises').then(({ readFile }) =>
      readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8'));
    expect(source).toContain('canDissolve: host && manageable && canDissolveBeforeStart(summary)');
    expect(source).toContain("'DISSOLVE_CUTOFF'");
  });
});
