import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('dissolution controller contract', () => {
  it('exposes an authenticated dissolve operation and structured errors', async () => {
    const routes = await readFile(new URL('../../src/routes/study-group.routes.mjs', import.meta.url), 'utf8');
    const controllers = await readFile(new URL('../../src/controllers/study-group.controllers.mjs', import.meta.url), 'utf8');
    expect(routes).toContain("router.post('/:groupId/dissolve', verifyToken"); expect(controllers).toContain('sendStudyGroupError');
  });
});

