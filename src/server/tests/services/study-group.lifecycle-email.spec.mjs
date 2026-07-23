import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Group lifecycle notification emails', () => {
  it('captures the removed Approved member before deletion and emails after commit', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');

    expect(model).toContain('findGroupNotificationUser');
    expect(model).toContain("gr.status = 'approved'");
    expect(model).toContain('u.username, u.avatar');
    expect(service).toContain('sendStudyGroupRemovalEmail');
    expect(service).toContain('actor: notificationActor(result.detail.organizerProfile)');
    expect(service).toContain('await sendLifecycleEmailSafely');
    expect(mailer).toContain('sendStudyGroupRemovalEmail');
    expect(mailer).toContain('[MEMBER REMOVED · ĐÃ XÓA]');
    expect(mailer).toContain('Member removed · Đã xóa thành viên');
  });

  it('captures all active non-host recipients before dissolution and emails after commit', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');

    expect(model).toContain('listGroupNotificationRecipients');
    expect(model).toContain("gr.status IN ('pending', 'approved')");
    expect(model).toContain('DISTINCT ON (u.user_id)');
    expect(service).toContain('sendStudyGroupDissolvedEmail');
    expect(service).toContain('actor: notificationActor(result.detail.organizerProfile)');
    expect(mailer).toContain('sendStudyGroupDissolvedEmail');
    expect(mailer).toContain('[CANCELLED · ĐÃ HỦY]');
    expect(mailer).toContain('Cancelled · Đã hủy');
  });

  it('captures the creator before an Approved member leaves and emails after commit', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');

    expect(model).toContain('findGroupCreatorNotificationUser');
    expect(service).toContain('sendStudyGroupMemberLeftEmail');
    expect(service).toContain('actor: notificationActor(member)');
    expect(service).toMatch(/export const leaveGroup[\s\S]*sendLifecycleEmailSafely\(sendStudyGroupMemberLeftEmail/);
    expect(mailer).toContain('sendStudyGroupMemberLeftEmail');
    expect(mailer).toContain('[MEMBER LEFT · ĐÃ RỜI NHÓM]');
    expect(mailer).toContain('Member left · Thành viên rời nhóm');
  });

  it('renders the action performer identity in every Study Group lifecycle email', async () => {
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');
    expect(mailer).toContain('studyGroupActor');
    expect(mailer).toContain('Performed by · Người thực hiện');
    expect(mailer).toContain('actor.username');
    expect(mailer).toContain('actor.email');
    expect(mailer).toContain('actor.avatar');
    expect(mailer).toContain('min-width:0;margin-left:14px;');
    expect(mailer.match(/studyGroupActor\(group\.actor\)/g)).toHaveLength(7);
  });

  it('gives each lifecycle action a distinct status-first visual treatment while retaining all group details', async () => {
    const mailer = await readFile(new URL('../../src/utils/mailer.mjs', import.meta.url), 'utf8');
    expect(mailer).toContain('studyGroupEventBanner');
    expect(mailer).toContain("accent: '#9A4935'");
    expect(mailer).toContain("accent: '#486C7E'");
    expect(mailer).toContain("accent: '#B3261E'");
    expect(mailer).toContain('Subject · Môn học');
    expect(mailer).toContain('Date &amp; time · Lịch');
    expect(mailer).toContain('Location · Địa điểm');
    expect(mailer).toContain('${escapeHtml(group.title)}');
    expect(mailer).toContain('${escapeHtml(group.subject)}');
    expect(mailer).toContain('${escapeHtml(group.date)} · ${escapeHtml(group.time)}');
    expect(mailer).toContain('${escapeHtml(group.roomName)} · ${escapeHtml(group.branchName)}');
  });
});
