import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('atomic permanent dissolution', () => {
  it('deletes the reservation and relies on foreign-key cascades for group and requests', async () => {
    const source = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(source).toContain('DELETE FROM reserve_room WHERE reserve_id = $1');
    expect(source).not.toContain("UPDATE reserve_room SET status = 'cancelled'");
  });
});
