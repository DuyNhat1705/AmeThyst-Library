import { readFile } from 'node:fs/promises'; import { describe, expect, it } from 'vitest';
describe('real discovery integration invariants', () => { it('uses persisted queries and active uniqueness', async () => { const page=await readFile(new URL('../../../client/app/study-together/page.tsx',import.meta.url),'utf8'); const indexes=await readFile(new URL('../../../database/init_db/postgres/06_indexes.sql',import.meta.url),'utf8'); expect(page).not.toContain('mockStudyGroups'); expect(indexes).toContain('uq_group_request_active_participation'); }); });

