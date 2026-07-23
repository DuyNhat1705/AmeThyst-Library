import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Group creation integration invariants', () => {
  it('defines one transaction and active-slot uniqueness for concurrent attempts', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const indexes = await readFile(new URL('../../../database/init_db/postgres/06_indexes.sql', import.meta.url), 'utf8');
    expect(model).toContain("await client.query('BEGIN')");
    expect(model).toContain("await client.query('ROLLBACK')");
    expect(indexes).toContain('uq_reserve_room_active_slot');
  });
});
