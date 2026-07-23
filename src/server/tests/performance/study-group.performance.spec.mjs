import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const enabled = process.env.RUN_STUDY_GROUP_PERF === 'true';
const baseUrl = process.env.PERF_BASE_URL || 'http://127.0.0.1:5000';
const fixturePath = process.env.PERF_FIXTURE_FILE;
const profiles = [
  { name: 'discovery', count: 300, method: 'GET', path: '/api/study-groups' },
  { name: 'created', count: 300, method: 'GET', path: '/api/study-groups/created', authenticated: true },
  { name: 'joined', count: 300, method: 'GET', path: '/api/study-groups/joined', authenticated: true },
  { name: 'detail', count: 300, method: 'GET', fixture: true },
  { name: 'join', count: 160, method: 'POST', fixture: true },
  { name: 'approval', count: 160, method: 'POST', fixture: true },
  { name: 'denial', count: 160, method: 'POST', fixture: true },
  { name: 'pending-cancellation', count: 160, method: 'DELETE', fixture: true },
  { name: 'leave', count: 160, method: 'DELETE', fixture: true },
];

const percentile = (values, ratio) => [...values].sort((a, b) => a - b)[Math.ceil(values.length * ratio) - 1];

describe.skipIf(!enabled)('Study Group normal-load profile', () => {
  it('runs 2,000 requests in batches of exactly 25 using the documented 60/40 mix', async () => {
    expect(fixturePath, 'PERF_FIXTURE_FILE is required').toBeTruthy();
    const fixtures = JSON.parse(await readFile(fixturePath, 'utf8'));
    const schedule = [];
    for (const profile of profiles) {
      const supplied = fixtures.operations?.[profile.name] || [];
      if (profile.fixture) expect(supplied.length, `${profile.name} needs unique state-safe fixtures`).toBeGreaterThanOrEqual(profile.count);
      for (let index = 0; index < profile.count; index += 1) {
        const fixture = supplied[index] || supplied[0] || {};
        schedule.push({ ...profile, path: fixture.path || profile.path, token: fixture.token || fixtures.token, body: fixture.body });
      }
    }
    expect(schedule).toHaveLength(2000);

    const measurements = Object.fromEntries(profiles.map(({ name }) => [name, []]));
    let errors = 0;
    for (let offset = 0; offset < schedule.length; offset += 25) {
      const batch = schedule.slice(offset, offset + 25);
      expect(batch).toHaveLength(25);
      await Promise.all(batch.map(async ({ name, method, path, token, body }) => {
        const start = performance.now();
        const response = await fetch(`${baseUrl}${path}`, {
          method,
          headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), 'content-type': 'application/json' },
          ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        });
        measurements[name].push(performance.now() - start);
        if (!response.ok) errors += 1;
      }));
    }

    expect(errors).toBe(0);
    for (const { name, count } of profiles) {
      expect(measurements[name]).toHaveLength(count);
      expect(percentile(measurements[name], 0.95), `${name} p95`).toBeLessThanOrEqual(2000);
    }
  }, 180000);
});
