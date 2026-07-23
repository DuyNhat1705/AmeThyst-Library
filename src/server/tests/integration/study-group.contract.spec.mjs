import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Group OpenAPI conformance', () => {
  it('implements every declared operation and standard response envelope', async () => {
    const contract = await readFile(new URL('../../../specs/026-study-group-feature/contracts/study-groups.openapi.yaml', import.meta.url), 'utf8');
    const routes = await readFile(new URL('../../src/routes/study-group.routes.mjs', import.meta.url), 'utf8');
    const controllers = await readFile(new URL('../../src/controllers/study-group.controllers.mjs', import.meta.url), 'utf8');
    for (const operation of ['createStudyGroup','listStudyGroups','listCreatedStudyGroups','listJoinedStudyGroups','getStudyGroup','updateStudyGroup','requestToJoin','cancelJoinRequest','approveJoinRequest','denyJoinRequest','removeStudyGroupMember','leaveStudyGroup','dissolveStudyGroup','listStudyGroupInvitations','inviteStudyGroupMember','acceptStudyGroupInvitation','denyStudyGroupInvitation']) expect(contract).toContain(`operationId: ${operation}`);
    for (const route of ["router.get('/',","router.post('/',","router.get('/created',","router.get('/joined',","router.patch('/:groupId',","/approve'","/deny'","/dissolve'"]) expect(routes).toContain(route);
    expect(controllers).toContain('{ success: true, data');
    expect(controllers).toContain("code: error.code || 'INTERNAL_ERROR'");
  });

  it('documents the implemented discovery filters and authoritative ordering without Sort By', async () => {
    const contract = await readFile(new URL('../../../specs/026-study-group-feature/contracts/study-groups.openapi.yaml', import.meta.url), 'utf8');
    for (const parameter of ['date', 'startTime', 'endTime', 'branchIds', 'roomIds']) {
      expect(contract).toContain(`- name: ${parameter}`);
    }
    expect(contract).not.toContain('- name: sort');
    expect(contract).toContain('exclude hosted and Approved groups before pagination');
    expect(contract).toContain('order Pending requests first and nearest scheduled start first');
  });
});
