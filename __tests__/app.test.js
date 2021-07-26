import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pokemon from '../lib/models/PokemonModel.js';

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

  it('gets a pokemon by id with GET', async () => {
    const cleffa = await Pokemon.insert({ 
      name: 'Cleffa',
      type1: 'Fairy',
      type2: 'N/A',
      hiddenAb: 'Friend Guard',
    });

    const res = await request(app).get(`/api/v1/pokemon/${cleffa.id}`);

    expect(res.body).toEqual(cleffa);
  });





});
