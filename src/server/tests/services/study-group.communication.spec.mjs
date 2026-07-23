import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readServer = (path) => readFile(new URL(`../../src/${path}`, import.meta.url), 'utf8');
const readClient = (path) => readFile(new URL(`../../../client/app/${path}`, import.meta.url), 'utf8');

describe('Study Group balanced communication matrix', () => {
  it('sends post-commit email plus targeted bell events for request and member-entry outcomes', async () => {
    const service = await readServer('services/study-group.services.mjs');
    const controller = await readServer('controllers/study-group.controllers.mjs');
    const mailer = await readServer('utils/mailer.mjs');

    for (const mail of [
      'sendStudyGroupRequestSubmittedEmail',
      'sendStudyGroupRequestApprovedEmail',
      'sendStudyGroupRequestDeniedEmail',
      'sendStudyGroupMemberJoinedEmail',
    ]) expect(mailer).toContain(mail);

    for (const event of [
      'join_request_submitted',
      'join_request_approved',
      'join_request_denied',
      'member_joined',
    ]) expect(service).toContain(event);

    expect(service).toMatch(/approveRequest[\s\S]*sendStudyGroupRequestApprovedEmail[\s\S]*sendStudyGroupMemberJoinedEmail/);
    expect(service).toContain('currentMembers: summary.currentMembers');
    expect(service).toContain('capacity: summary.capacity');
    const client = await readClient('components/molecules/AuthActions.tsx');
    expect(client).toContain("selectedSystemNotification.type === 'member_joined'");
    expect(controller).toContain('emitNotifications');
  });

  it('keeps request cancellation, invitation decline, and metadata update bell-only', async () => {
    const service = await readServer('services/study-group.services.mjs');
    const controller = await readServer('controllers/study-group.controllers.mjs');
    const mailer = await readServer('utils/mailer.mjs');

    expect(service).toContain('join_request_cancelled');
    expect(service).toContain('invitation_declined');
    expect(controller).toContain("lifecycleNotification('group_updated'");
    expect(service).toContain('listApprovedNotificationRecipients');
    expect(service).toContain('changedFields');
    expect(mailer).not.toContain('sendStudyGroupRequestCancelledEmail');
    expect(mailer).not.toContain('sendStudyGroupInvitationDeclinedEmail');
    expect(mailer).not.toContain('sendStudyGroupUpdatedEmail');
  });

  it('uses navigation-only invitation mail and permission-aware notification destinations', async () => {
    const mailer = await readServer('utils/mailer.mjs');
    const client = await readClient('components/molecules/AuthActions.tsx');
    const types = await readClient('types/studyGroup.ts');

    expect(mailer).toContain('Review invitation · Xem lời mời');
    expect(mailer).not.toContain('decision=accept');
    expect(mailer).not.toContain('decision=deny');
    expect(client).not.toContain("params.get('decision')");
    expect(client).toContain('notificationDestinationHref');
    expect(client).toContain('/dashboard/user/yourstudygroups/created/');
    expect(client).toContain('/dashboard/user/yourstudygroups/joined/');
    expect(client).toContain("'/dashboard/user/yourstudygroups'");
    expect(types).toContain("mode: 'created' | 'joined' | 'dashboard'");
  });

  it('uses stable business identifiers so retries and reconnects do not duplicate bell items', async () => {
    const service = await readServer('services/study-group.services.mjs');
    const model = await readServer('models/study-group.models.mjs');
    const controller = await readServer('controllers/study-group.controllers.mjs');
    const client = await readClient('components/molecules/AuthActions.tsx');

    expect(service).toContain('join_request_submitted:${result.participation.requestId}');
    expect(service).toContain('join_request_approved:${requestId}');
    expect(service).toContain('member_joined:${requestId}');
    expect(service).toContain('member_removed:${result.membershipId}');
    expect(model).toContain('clock_timestamp() AS "notificationEventAt"');
    expect(service).toContain('new Date(updateResult.notificationEventAt).toISOString()');
    expect(controller).toContain('details.eventId ||');
    expect(client).toContain('current.some((item) => item.id === notification.id)');
  });
});
