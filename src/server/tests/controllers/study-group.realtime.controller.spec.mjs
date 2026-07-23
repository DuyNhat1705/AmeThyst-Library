import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Group realtime refresh contract', () => {
  it('emits one shared change event after successful mutations', async () => {
    const controller = await readFile(new URL('../../src/controllers/study-group.controllers.mjs', import.meta.url), 'utf8');
    const socket = await readFile(new URL('../../src/config/socket.mjs', import.meta.url), 'utf8');
    expect(controller).toContain('emitStudyGroupChanged');
    expect(socket).toContain("io.emit('study-group:changed'");
    expect(controller).toContain("emitStudyGroupChanged(req.params.groupId, 'request-approved')");
  });

  it('refreshes authoritative group detail after approval so capacity does not drift', async () => {
    const modal = await readFile(new URL('../../../client/app/components/organisms/StudyGroupInfoModal.tsx', import.meta.url), 'utf8');
    expect(modal).toContain('approveJoinRequest');
    expect(modal).toContain('getStudyGroup');
    expect(modal).toMatch(/approveJoinRequest[\s\S]*getStudyGroup/);
  });

  it('emits targeted lifecycle notifications for removal, voluntary leave, and dissolution', async () => {
    const controller = await readFile(new URL('../../src/controllers/study-group.controllers.mjs', import.meta.url), 'utf8');
    const socket = await readFile(new URL('../../src/config/socket.mjs', import.meta.url), 'utf8');
    expect(socket).toContain('emitUserNotification');
    expect(socket).toContain("io.to(`user:${userId}`).emit('notification:new'");
    expect(socket).toContain('socket.userId = decoded.userId');
    expect(socket).not.toContain('socket.userId = decoded.id');
    expect(socket).toContain('Authentication error: Token has no userId');
    expect(controller).toContain("'member_removed'");
    expect(controller).toContain("'member_left'");
    expect(controller).toContain("'group_dissolved'");
    expect(controller).toContain('notificationRecipients');
  });
});
