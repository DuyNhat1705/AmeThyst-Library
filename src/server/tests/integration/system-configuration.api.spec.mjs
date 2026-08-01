import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import pool from '../../src/config/postgres.mjs';
import { createSystemConfigurationModel } from '../../src/models/system-configuration.models.mjs';
import { createSystemConfigurationService } from '../../src/services/system-configuration.services.mjs';
import { createSystemConfigurationRouter } from '../../src/routes/system-configuration.routes.mjs';
import { calculateTotalPenalty } from '../../src/utils/penalty.utils.mjs';

vi.mock('jsonwebtoken', () => ({ default: { verify: vi.fn() } }));
vi.mock('../../src/config/postgres.mjs', () => ({
  default: { query: vi.fn(), connect: vi.fn(), on: vi.fn() },
}));

const initialConfiguration = {
  MAX_BORROW_LIMIT: 5,
  FEE_ADMIN: 1,
  FEE_ADDON: 0.5,
  DAMAGE_COEFFICIENTS: {
    perfect_condition: 0,
    slight_cover_scratches: 0.05,
    folded_pages: 0.1,
    pencil_marks: 0.15,
    ink_marks: 0.4,
    torn_pages: 0.5,
    water_damage: 0.7,
    damaged_binding: 0.3,
    missing_mats: 0.3,
    missing_pages: 1,
    lost: 2,
  },
};

const buildApp = (service) => {
  const app = express();
  app.use(express.json());
  app.use('/api/dashboard/admin/system-configuration', createSystemConfigurationRouter({ service }));
  return app;
};

const asAdmin = (call) => call.set('Authorization', 'Bearer valid-token');

describe('Admin System Configuration API', () => {
  let temporaryDirectory;
  let configurationPath;
  let service;
  let app;

  beforeEach(async () => {
    vi.clearAllMocks();
    jwt.verify.mockReturnValue({ userId: 'admin-1' });
    pool.query.mockResolvedValue({
      rows: [{ user_id: 'admin-1', email: 'admin@example.com', role: 'admin', branch_id: null }],
    });
    temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'amethyst-system-configuration-'));
    configurationPath = path.join(temporaryDirectory, 'system-configuration.json');
    await writeFile(configurationPath, `${JSON.stringify(initialConfiguration, null, 2)}\n`, 'utf8');
    service = createSystemConfigurationService({
      model: createSystemConfigurationModel({ filePath: configurationPath }),
    });
    await service.initialize();
    app = buildApp(service);
  });

  afterEach(async () => {
    await rm(temporaryDirectory, { recursive: true, force: true });
  });

  it('loads and atomically persists a complete configuration for an administrator', async () => {
    const getResponse = await asAdmin(request(app).get('/api/dashboard/admin/system-configuration'));
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.configuration).toEqual(initialConfiguration);
    expect(getResponse.body.data.version).toMatch(/^[a-f0-9]{64}$/);

    const updated = structuredClone(initialConfiguration);
    updated.MAX_BORROW_LIMIT = 8;
    updated.DAMAGE_COEFFICIENTS.folded_pages = 0.2;
    const putResponse = await asAdmin(request(app).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: getResponse.body.data.version, configuration: updated });

    expect(putResponse.status).toBe(200);
    expect(putResponse.body.data.configuration).toEqual(updated);
    expect(JSON.parse(await readFile(configurationPath, 'utf8'))).toEqual(updated);
  });

  it('applies saved fee and damage values to the next penalty calculation', async () => {
    const before = service.getState();
    const updated = structuredClone(before.configuration);
    updated.FEE_ADMIN = 3;
    updated.FEE_ADDON = 2;
    updated.DAMAGE_COEFFICIENTS.folded_pages = 0.25;
    updated.DAMAGE_COEFFICIENTS.pencil_marks = 0.1;

    const response = await asAdmin(request(app).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: before.version, configuration: updated });

    expect(response.status).toBe(200);
    expect(calculateTotalPenalty(['folded_pages', 'pencil_marks'], 100, 0, service.getSnapshot())).toEqual({
      amount: 43,
      issue: 'DAMAGED',
    });
  });

  it('increases the penalty by each added condition contribution and add-on fee', () => {
    const policy = structuredClone(initialConfiguration);
    policy.DAMAGE_COEFFICIENTS.folded_pages = 0.5;

    expect(calculateTotalPenalty(['folded_pages'], 15, 0, policy).amount).toBe(8.5);
    expect(calculateTotalPenalty(['pencil_marks'], 15, 0, policy).amount).toBe(3.25);
    expect(calculateTotalPenalty(['folded_pages', 'pencil_marks'], 15, 0, policy).amount).toBe(12.25);
  });

  it('preserves the original uncapped damage and lost/overdue formula semantics', async () => {
    const policy = structuredClone(initialConfiguration);
    policy.DAMAGE_COEFFICIENTS.folded_pages = 10_000;

    expect(calculateTotalPenalty(['folded_pages'], 100, 0, policy)).toEqual({
      amount: 1_000_001,
      issue: 'DAMAGED',
    });
    expect(calculateTotalPenalty(['lost'], 100, 10, policy)).toEqual({ amount: 200, issue: 'LOST' });
    expect(calculateTotalPenalty(['perfect_condition'], 100, 10, policy)).toEqual({ amount: 0, issue: null });
  });

  it.each([
    ['missing field', (value) => { delete value.FEE_ADMIN; }],
    ['additional field', (value) => { value.EXTRA = 1; }],
    ['null value', (value) => { value.FEE_ADMIN = null; }],
    ['empty value', (value) => { value.FEE_ADMIN = ''; }],
    ['whitespace value', (value) => { value.FEE_ADMIN = '   '; }],
    ['numeric string', (value) => { value.FEE_ADMIN = '1'; }],
    ['negative value', (value) => { value.FEE_ADMIN = -1; }],
    ['fractional borrowing policy', (value) => { value.MAX_BORROW_LIMIT = 1.5; }],
    ['non-zero perfect condition', (value) => { value.DAMAGE_COEFFICIENTS.perfect_condition = 0.1; }],
  ])('rejects %s without changing the active configuration', async (_label, mutate) => {
    const state = service.getState();
    const invalid = structuredClone(initialConfiguration);
    mutate(invalid);
    const response = await asAdmin(request(app).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: state.version, configuration: invalid });
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('CONFIG_VALIDATION_FAILED');
    expect(service.getState()).toEqual(state);
  });

  it('rejects a stale version without writing', async () => {
    const before = await readFile(configurationPath, 'utf8');
    const response = await asAdmin(request(app).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: '0'.repeat(64), configuration: initialConfiguration });
    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('CONFIG_VERSION_CONFLICT');
    expect(await readFile(configurationPath, 'utf8')).toBe(before);
  });

  it('preserves the canonical file and active snapshot when interrupted before replacement', async () => {
    const interruptedService = createSystemConfigurationService({
      model: createSystemConfigurationModel({
        filePath: configurationPath,
        beforeReplace: async () => { throw new Error('simulated interruption'); },
      }),
    });
    await interruptedService.initialize();
    const interruptedApp = buildApp(interruptedService);
    const beforeFile = await readFile(configurationPath, 'utf8');
    const beforeState = interruptedService.getState();
    const updated = structuredClone(initialConfiguration);
    updated.FEE_ADDON = 0.75;

    const response = await asAdmin(request(interruptedApp).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: beforeState.version, configuration: updated });
    expect(response.status).toBe(503);
    expect(response.body.error.code).toBe('CONFIG_WRITE_FAILED');
    expect(await readFile(configurationPath, 'utf8')).toBe(beforeFile);
    expect(interruptedService.getState()).toEqual(beforeState);
  });

  it('returns a write failure without changing state when persistence rejects immediately', async () => {
    const failingService = createSystemConfigurationService({
      model: {
        load: async () => structuredClone(initialConfiguration),
        replace: async () => { throw new Error('read-only target'); },
      },
    });
    await failingService.initialize();
    const failingApp = buildApp(failingService);
    const beforeState = failingService.getState();
    const updated = structuredClone(initialConfiguration);
    updated.FEE_ADMIN = 1.25;
    const response = await asAdmin(request(failingApp).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: beforeState.version, configuration: updated });
    expect(response.status).toBe(503);
    expect(response.body.error.code).toBe('CONFIG_WRITE_FAILED');
    expect(failingService.getState()).toEqual(beforeState);
  });

  it('exposes no configuration to unauthenticated or non-admin requests', async () => {
    const unauthenticated = await request(app).get('/api/dashboard/admin/system-configuration');
    expect(unauthenticated.status).toBe(401);
    expect(unauthenticated.body.error.code).toBe('AUTH_REQUIRED');

    pool.query.mockResolvedValueOnce({
      rows: [{ user_id: 'user-1', email: 'user@example.com', role: 'user', branch_id: null }],
    });
    const forbidden = await asAdmin(request(app).get('/api/dashboard/admin/system-configuration'));
    expect(forbidden.status).toBe(403);
    expect(forbidden.body.error.code).toBe('FORBIDDEN');
    expect(forbidden.body.data).toBeUndefined();
  });

  it('completes authenticated GET and valid PUT within two seconds locally', async () => {
    const getStartedAt = performance.now();
    const getResponse = await asAdmin(request(app).get('/api/dashboard/admin/system-configuration'));
    expect(performance.now() - getStartedAt).toBeLessThan(2000);

    const updated = structuredClone(initialConfiguration);
    updated.MAX_BORROW_LIMIT = 6;
    const putStartedAt = performance.now();
    const putResponse = await asAdmin(request(app).put('/api/dashboard/admin/system-configuration'))
      .send({ expectedVersion: getResponse.body.data.version, configuration: updated });
    expect(putResponse.status).toBe(200);
    expect(performance.now() - putStartedAt).toBeLessThan(2000);
  });
});
