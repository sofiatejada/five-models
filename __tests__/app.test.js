import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a pokemon via POST', async () => {
    const pumpkaboo = { name: 'pumpkaboo', type1: 'ghost', type2: 'grass', hiddenAb: 'insomnia' };
    const res = await request(app)
      .post('/api/v1/pokemon')
      .send(pumpkaboo);

    expect(res.body).toEqual({
      id: '1',
      ...pumpkaboo
    });
  });





});
