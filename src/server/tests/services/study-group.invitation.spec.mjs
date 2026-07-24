import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Group email invitations', () => {
  it('uses persisted invite rows and recipient-only decisions', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    expect(model).toContain("'invite', 'pending'");
    expect(model).toContain("gr.user_id = $1 AND gr.type = 'invite' AND gr.status = 'pending'");
    expect(model).toContain("${UTC_ISO_SQL('gr.created_at')} AS \"invitedAt\"");
    expect(service).toContain("request.type !== 'invite'");
    expect(service).toContain('request.user_id !== userId');
    expect(service).toContain("setRequestStatus(requestId, 'invite', 'pending', 'approved', client)");
    expect(service).toContain("setRequestStatus(requestId, 'invite', 'pending', 'denied', client)");
  });

  it('reuses the configured mailer and exposes a navigation-only review link', async () => {
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    expect(mailer).toContain('sendStudyGroupInvitationEmail');
    expect(mailer).toContain('invitation=');
    expect(mailer).not.toContain('decision=accept');
    expect(mailer).not.toContain('decision=deny');
    expect(mailer).toContain('Review invitation · Xem lời mời');
    expect(mailer).toContain('studyGroupActor(invitation.actor)');
    expect(mailer).toContain("'X-Entity-Ref-ID': invitation.requestId");
    expect(mailer).toContain('Invitation ${escapeHtml(invitation.requestId)}');
    expect(mailer).toContain('[INVITATION · LỜI MỜI]');
    expect(mailer).toContain('Invitation · Lời mời tham gia');
    expect(mailer).toContain("accent: '#315A6B'");
    expect(service).toContain('actor: notificationActor(summary.organizerProfile)');
    expect(service).toContain('email: row.actorEmail');
  });

  it('places Invite in the created-group popup Members section, not on Study Cards', async () => {
    const card = await readFile(new URL('../../../client/app/components/molecules/StudyGroupCard.tsx', import.meta.url), 'utf8');
    const popup = await readFile(new URL('../../../client/app/components/organisms/StudyGroupInfoModal.tsx', import.meta.url), 'utf8');
    expect(card).not.toContain('study_group.invite_by_email');
    expect(popup).toContain("t('study_group.members')");
    expect(popup).toContain("t('study_group.invite_by_email')");
  });
});
