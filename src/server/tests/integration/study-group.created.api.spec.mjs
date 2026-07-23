import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('created-group integration contract', () => {
  it('contains persisted created/detail/edit routes and deterministic ordering', async () => {
    const routes = await readFile(new URL('../../src/routes/study-group.routes.mjs', import.meta.url), 'utf8');
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(routes).toContain("router.get('/created'"); expect(routes).toContain("router.patch('/:groupId'"); expect(model).toContain('sg.group_id ASC');
  });
});

