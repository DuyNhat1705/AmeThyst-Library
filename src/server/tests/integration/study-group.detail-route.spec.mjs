import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Study Together URL-backed detail modal', () => {
  it('provides a dynamic route that reuses the existing Study Together experience', async () => {
    const route = await readFile(new URL('../../../client/app/study-together/[groupId]/page.tsx', import.meta.url), 'utf8');
    expect(route).toContain("import StudyTogetherPage from '../page'");
    expect(route).toContain('initialGroupId={groupId}');
    expect(route).toContain('params: Promise<{ groupId: string }>');
  });

  it('keeps card navigation client-side and supports direct-load, Back, Forward, and unavailable states', async () => {
    const page = await readFile(new URL('../../../client/app/study-together/page.tsx', import.meta.url), 'utf8');
    expect(page).toContain("window.history.pushState({ studyTogetherModal: true }");
    expect(page).toContain("window.addEventListener('popstate', syncRoute)");
    expect(page).toContain('window.history.back()');
    expect(page).toContain("router.replace('/study-together', { scroll: false })");
    expect(page).toContain('getStudyGroup(infoGroupId)');
    expect(page).toContain("t('study_group.route_loading')");
    expect(page).toContain("t('study_group.route_not_found_title')");
  });

  it('provides permission-specific URL-backed modals for Created and Joined Dashboard cards', async () => {
    const dashboard = await readFile(new URL('../../../client/app/dashboard/user/yourstudygroups/page.tsx', import.meta.url), 'utf8');
    const createdRoute = await readFile(new URL('../../../client/app/dashboard/user/yourstudygroups/created/[groupId]/page.tsx', import.meta.url), 'utf8');
    const joinedRoute = await readFile(new URL('../../../client/app/dashboard/user/yourstudygroups/joined/[groupId]/page.tsx', import.meta.url), 'utf8');

    expect(dashboard).toContain("window.history.pushState({ dashboardStudyGroupModal: true }");
    expect(dashboard).toContain('/dashboard/user/yourstudygroups/${mode}/${encodeURIComponent(id)}');
    expect(dashboard).toContain("window.addEventListener('popstate', syncRoute)");
    expect(dashboard).toContain("modalMode === 'created'");
    expect(dashboard).toContain('detail.isHost');
    expect(dashboard).toContain('detail.currentUserParticipation');
    expect(dashboard).toContain('routeGroupError && event.target === event.currentTarget');
    expect(dashboard).toContain('closeGroupDetails()');
    expect(createdRoute).toContain('initialMode="created"');
    expect(joinedRoute).toContain('initialMode="joined"');
  });
});
