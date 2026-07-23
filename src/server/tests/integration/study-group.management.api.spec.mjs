import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('final-place concurrency protection', () => {
  it('uses database uniqueness, locks, and bounded count updates', async () => {
    const indexes = await readFile(new URL('../../../database/init_db/postgres/06_indexes.sql', import.meta.url), 'utf8');
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(indexes).toContain('uq_group_request_active_participation'); expect(model).toContain('FOR UPDATE'); expect(model).toContain('BETWEEN 1 AND capacity');
  });
});

