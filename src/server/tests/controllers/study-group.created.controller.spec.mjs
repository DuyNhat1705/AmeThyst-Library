import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { validatePagination, validateStudyGroupParams, validateUpdateStudyGroup } from '../../src/middlewares/study-group.middlewares.mjs';

const app = express(); app.use(express.json());
app.get('/created', validatePagination, (req, res) => res.json({ success: true, data: req.query }));
app.patch('/:groupId', validateStudyGroupParams, validateUpdateStudyGroup, (req, res) => res.json({ success: true, data: req.body }));

describe('created-group middleware contract', () => {
  it('rejects malformed pagination', async () => expect((await request(app).get('/created?page=0')).status).toBe(400));
  it('rejects malformed UUIDs', async () => expect((await request(app).patch('/bad').send({ title: 'Valid' })).status).toBe(400));
  it('accepts valid partial edits', async () => expect((await request(app).patch('/00000000-0000-4000-8000-000000000001').send({ title: ' Valid ' })).body.data.title).toBe('Valid'));
});

