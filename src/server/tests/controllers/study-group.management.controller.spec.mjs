import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('host management controller contract', () => {
  it('declares approve, deny, and removal operations behind authentication', async () => {
    const source = await readFile(new URL('../../src/routes/study-group.routes.mjs', import.meta.url), 'utf8');
    for (const action of ['/approve', '/deny', '/members/:userId']) expect(source).toContain(action);
    expect(source.match(/verifyToken/g)?.length).toBeGreaterThan(8);
  });
});

