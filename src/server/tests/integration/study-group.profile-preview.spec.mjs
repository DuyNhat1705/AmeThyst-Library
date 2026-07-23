import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readClient = (path) =>
  readFile(new URL(`../../../client/app/${path}`, import.meta.url), 'utf8');

describe('Study Group profile hover preview', () => {
  it('projects complete profile fields only in Study Group detail records', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');

    expect(model).toContain('u.role AS "hostRole"');
    expect(model).toContain('u.occupation AS "hostOccupation"');
    expect(model).toContain('u.hometown AS "hostHometown"');
    expect(model).toContain('u.description AS "hostDescription"');
    expect(model).toContain('AS "birthDate"');
    expect(model).toContain('u.phone_number AS "phoneNumber"');
    expect(model).toContain('organizer: organizer.rows[0]');
    expect(service).toContain('role: row.hostRole');
    expect(service).toContain('organizerProfile: projectProfileUser(record.organizer)');
    expect(service).not.toMatch(/host:\s*\{[^}]*email:/);
  });

  it('uses one accessible reusable preview for the organizer, Approved members, and host approval queue', async () => {
    const preview = await readClient('components/molecules/UserProfileHoverCard.tsx');
    const card = await readClient('components/molecules/StudyGroupCard.tsx');
    const modal = await readClient('components/organisms/StudyGroupInfoModal.tsx');
    const memberCard = await readClient('components/atoms/MemberCard.tsx');
    const types = await readClient('types/studyGroup.ts');
    const en = await readClient('locales/en.json');
    const vi = await readClient('locales/vi.json');

    expect(preview).toContain('group-hover:visible');
    expect(preview).toContain('group-focus-within:visible');
    expect(preview).toContain('profile-preview-trigger');
    expect(preview).toContain('aria-describedby');
    expect(preview).toContain('UserAvatar');
    for (const field of ['email', 'birthDate', 'phoneNumber', 'gender', 'occupation', 'hometown']) {
      expect(preview).toContain(`user.${field}`);
    }
    expect(preview).toContain("t('study_group.profile_unknown')");
    expect(preview).toContain('line-clamp-4');
    expect(preview).not.toContain('[display:-webkit-box]');
    expect(preview).not.toContain('h-20 overflow-hidden');
    expect(preview).toContain('description.scrollHeight > description.clientHeight + 1');
    expect(preview).toContain("{'...\"'}");
    expect(card).not.toContain('UserProfileHoverCard');
    expect(modal).toContain('UserProfileHoverCard');
    expect(memberCard).toContain('UserProfileHoverCard');
    expect(modal).toContain('user={organizerProfile}');
    expect(modal).toContain('name: request.user.username');
    expect(modal).toContain('email: request.user.email');
    expect(modal).toContain('description: request.user.description');
    expect(modal).toContain('align="right"');
    expect(modal).toContain('[&:has(.profile-preview-trigger:hover)]:overflow-visible');
    expect(modal).toContain('[&:has(.profile-preview-trigger:focus-within)]:overflow-visible');
    expect(memberCard).toContain('user={{ name, initials, avatar, role, email, phoneNumber, birthDate, gender, occupation, hometown, description }}');
    expect(types).toContain('occupation?: string | null');
    expect(en).toContain('"profile_preview"');
    expect(vi).toContain('"profile_preview"');
  });
});
