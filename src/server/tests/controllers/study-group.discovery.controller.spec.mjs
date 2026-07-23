import express from 'express'; import request from 'supertest'; import { describe, expect, it } from 'vitest';
import { validatePagination, validateStudyGroupParams } from '../../src/middlewares/study-group.middlewares.mjs';
const app = express(); app.get('/api/study-groups', validatePagination, (req,res)=>res.json({success:true, query:req.studyGroupQuery})); app.get('/api/study-groups/:groupId', validateStudyGroupParams, (_req,res)=>res.json({success:true}));
describe('discovery query contract', () => {
  it.each(['/api/study-groups?page=0','/api/study-groups?sort=bad','/api/study-groups?unknown=x'])('rejects invalid query %s', async (url) => expect((await request(app).get(url)).status).toBe(400));
  it('rejects malformed group UUID', async () => expect((await request(app).get('/api/study-groups/nope')).status).toBe(400));
  it('normalizes combined facility and schedule filters to integer arrays', async () => {
    const response = await request(app).get('/api/study-groups?date=2030-01-10&startTime=08:00&endTime=12:00&branchIds=1,2&roomIds=3,4');
    expect(response.status).toBe(200);
    expect(response.body.query).toMatchObject({ branchIds: [1, 2], roomIds: [3, 4], page: 1, pageSize: 8 });
  });
});
