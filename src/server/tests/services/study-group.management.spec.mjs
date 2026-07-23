import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('host management consistency', () => {
  it('locks rows and conditionally transitions pending requests exactly once', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(model).toContain('FOR UPDATE OF sg, rr');
    expect(model).toContain("WHERE request_id = $1 AND status = $2");
    expect(model).toContain('current_num + $2 BETWEEN 1 AND capacity');
  });
});

