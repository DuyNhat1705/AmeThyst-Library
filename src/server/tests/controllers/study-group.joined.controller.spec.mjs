import express from 'express'; import request from 'supertest'; import { describe, expect, it } from 'vitest'; import { validatePagination, validateStudyGroupParams } from '../../src/middlewares/study-group.middlewares.mjs';
const app=express(); app.get('/joined',validatePagination,(_req,res)=>res.json({success:true})); app.delete('/:groupId/requests/:requestId',validateStudyGroupParams,(_req,res)=>res.json({success:true}));
describe('joined middleware contract',()=>{it('rejects invalid pagination',async()=>expect((await request(app).get('/joined?pageSize=51')).status).toBe(400));it('rejects malformed path IDs',async()=>expect((await request(app).delete('/bad/requests/bad')).status).toBe(400));});

