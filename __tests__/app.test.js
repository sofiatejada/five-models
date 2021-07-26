import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pokemon from '../lib/models/HiddenAbility.js';
import Holiday from '../lib/models/Holiday.js';


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

  it('gets all pokemon with GET', async () => {
    const cleffa = await Pokemon.insert({ 
      name: 'Cleffa',
      type1: 'Fairy',
      type2: 'N/A',
      hiddenAb: 'Friend Guard',
    });

    const pumpkaboo = await Pokemon.insert({ 
      name: 'pumpkaboo', 
      type1: 'ghost', 
      type2: 'grass', 
      hiddenAb: 'insomnia',
    });

    const corsola = await Pokemon.insert({
      name: 'Galarian Corsola',
      type1: 'Ghost',
      type2: 'N/A',
      hiddenAb: 'Cursed Body'
    });

    // const res = await request(app).get('api/v1/pokemon');

    return request(app)
      .get('/api/v1/pokemon')
      .then((res) => {
        expect(res.body).toEqual([cleffa, pumpkaboo, corsola]);
      });

    // expect(res.body).toEqual([cleffa, pumpkaboo, corsola]);
  });

  it('updates a pokemon by id with PUT', async () => {
    const pumpkaboo = await Pokemon.insert({ 
      name: 'pumpkaboo', 
      type1: 'ghost', 
      type2: 'normal', 
      hiddenAb: 'insomnia',
    });

    const res = await request(app)
      .put(`/api/v1/pokemon/${pumpkaboo.id}`)
      .send({ type2: 'grass' });
    
    expect(res.body).toEqual({ ...pumpkaboo, type2: 'grass' });
  });

  it('deletes a pokemon by id with DELETE', async () => {
    const pumpkaboo = await Pokemon.insert({ 
      name: 'pumpkaboo', 
      type1: 'ghost', 
      type2: 'normal', 
      hiddenAb: 'insomnia',
    });

    const res = await request(app).delete(`/api/v1/pokemon/${pumpkaboo.id}`);

    expect(res.body).toEqual({
      message: `Pokemon ${pumpkaboo.name} was deleted.`
    });
  });
});

describe('holiday routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a holiday via POST', async () => {
    const korea = {
      country: 'South Korea',
      lang: 'Korean',
      capital: 'Seoul',
    };

    const res = await request(app)
      .post('/api/v1/holidays')
      .send(korea);
    
    expect(res.body).toEqual({
      id: '1',
      ...korea
    });
  });

  it('gets a holiday by id with GET', async () => {
    const spain = await Holiday.insert({
      country: 'Spain',
      lang: 'Spanish',
      capital: 'Madrid',
    });

    const res = await request(app).get(`/api/v1/holidays/${spain.id}`);

    expect(res.body).toEqual(spain);
  });

  it('gets all holidays with GET', async () => {
    const spain = await Holiday.insert({
      country: 'Spain',
      lang: 'Spanish',
      capital: 'Madrid',
    });

    const korea = {
      country: 'South Korea',
      lang: 'Korean',
      capital: 'Seoul',
    };

    const australia = {
      country: 'Australia',
      lang: 'English',
      capital: 'Canberra',
    };

    return request(app)
      .get('/api/v1/holidays')
      .then((res) => {
        expect(res.body).toEqual([spain, korea, australia]);
      });

  });

  it('updates a holiday by id with PUT', async () => {
    const australia = await Holiday.insert({
      country: 'Australia',
      lang: 'English',
      capital: 'N/A',
    });

    const res = await request(app)
      .put(`/api/v1/holidays/${australia.id}`)
      .send({ capital: 'Canberra' });

    expect(res.body).toEqual({ ...australia, capital: 'Canberra' });
  });

  it('deletes a holiday by id with DELETE', async () => {
    const australia = await Holiday.insert({
      country: 'Australia',
      lang: 'English',
      capital: 'Canberra',
    });

    const res = await request(app).delete(`/api/v1/holidays/${australia.id}`);

    expect(res.body).toEqual({
      message: `Holiday ${australia.country} has been deleted.`
    });
  });
  
});

// describe('book routes', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });

  
// });

// describe('cat routes routes', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });

  
// });

// describe('video game routes', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });

  
// });
