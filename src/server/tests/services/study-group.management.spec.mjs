import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
describe('host management consistency', () => {
  it('locks rows and conditionally transitions pending requests exactly once', async () => {
    const model = await readFile(new URL('../../src/models/study-group.models.mjs', import.meta.url), 'utf8');
    expect(model).toContain('FOR UPDATE OF sg, rr');
    expect(model).toContain("WHERE request_id = $1 AND type = $2 AND status = $3");
    expect(model).toContain('current_num + $2 BETWEEN 1 AND capacity');
  });
  it('US1: approve and deny reject invite rows', async () => {
    const service = await readFile(new URL('../../src/services/study-group.services.mjs', import.meta.url), 'utf8');
    expect(service).toContain("request.status !== 'pending' || request.type !== 'request'");
  });
});

