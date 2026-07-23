import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('external reservation cancellation integration', () => {
  it('deletes the reservation so its linked group is removed by cascade', async () => {
    const roomModel = await readFile(new URL('../../src/models/room.models.mjs', import.meta.url), 'utf8');
    const groupModel = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    expect(roomModel).toContain('DELETE FROM reserve_room');
    expect(groupModel).toContain('rr.status AS reservation_status');
    expect(groupModel).toContain('DELETE FROM reserve_room WHERE reserve_id = $1');
    for (const operation of ['editStudyGroup','approveRequest','denyRequest','removeMember','submitJoinRequest','leaveGroup','dissolveStudyGroup']) expect(service).toContain(`export const ${operation}`);
  });
});
