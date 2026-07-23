import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const schemaUrl = new URL('../../../database/init_db/postgres/05_init_rest.sql', import.meta.url);
const indexesUrl = new URL('../../../database/init_db/postgres/06_indexes.sql', import.meta.url);

describe('Study Group schema invariants', () => {
  it('uses deletion-based cancellation and enforces required relationships', async () => {
    const sql = await readFile(schemaUrl, 'utf8');
    const reserveRoomTable = sql.match(/CREATE TABLE public\.reserve_room \([\s\S]*?\n\);/)?.[0] || '';
    expect(reserveRoomTable).not.toContain("'cancelled'");
    expect(sql).toContain('study_group_reserve_id_key UNIQUE (reserve_id)');
    expect(sql).toContain('fk_studygroup_reserveroom FOREIGN KEY (reserve_id)');
    expect(sql).toContain('fk_request_studygroup FOREIGN KEY (group_id)');
    expect(sql).toContain('decided_at timestamp');
    expect(sql).toContain("type character varying(20) DEFAULT 'request'");
    expect(sql).toContain("ARRAY['request'::character varying, 'invite'::character varying]");
  });

  it('enforces active slot and participation uniqueness only for active states', async () => {
    const sql = await readFile(indexesUrl, 'utf8');
    expect(sql).toContain('uq_reserve_room_active_slot');
    expect(sql).toContain("status IN ('pending', 'reserved', 'used')");
    expect(sql).toContain('uq_group_request_active_participation');
    expect(sql).toContain("status IN ('pending', 'approved')");
  });
});
