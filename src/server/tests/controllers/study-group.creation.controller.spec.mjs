import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { validateCreateStudyGroup } from '../../src/middlewares/study-group.middlewares.mjs';

const app = express();
app.use(express.json());
app.post('/api/study-groups', validateCreateStudyGroup, (req, res) => res.status(201).json({ success: true, data: req.body }));

describe('Study Group creation validation contract', () => {
  it('normalizes valid requirements', async () => {
    const response = await request(app).post('/api/study-groups').send({ availId: 1, startDate: '2030-01-10', title: ' Group ', description: ' Desc ', subject: ' Math ', requirements: [' Notes ', ' '] });
    expect(response.status).toBe(201);
    expect(response.body.data.requirements).toEqual(['Notes']);
  });

  it('accepts an omitted optional requirements list', async () => {
    const response = await request(app).post('/api/study-groups').send({ availId: 1, startDate: '2030-01-10', title: 'Group 2', description: 'Desc', subject: 'CS50' });
    expect(response.status).toBe(201);
    expect(response.body.data.requirements).toEqual([]);
  });

  it.each([
    [{}, 'availId'],
    [{ availId: 1, startDate: 'bad', title: 'T', description: 'D', subject: 'S', requirements: ['R'] }, 'startDate'],
    [{ availId: 1, startDate: '2030-01-10', title: '123', description: 'D', subject: 'S', requirements: [] }, 'title'],
  ])('returns a structured 400 response', async (body, expected) => {
    const response = await request(app).post('/api/study-groups').send(body);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ success: false, error: { code: 'VALIDATION_ERROR' } });
    expect(response.body.error.message).toContain(expected);
  });
});
