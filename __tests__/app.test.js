import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pokemon from '../lib/models/HiddenAbility.js';
import Holiday from '../lib/models/Holiday.js';
import Book from '../lib/models/Book';
import Cat from '../lib/models/Cat';
import VideoGame from '../lib/models/VideoGame';


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

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a book via POST', async () => {
    const frankenstein = { 
      name: 'frankenstein',
      author: 'mary shelley',
      genre: 'science fiction',
    };
    const res = await request(app)
      .post('/api/v1/book')
      .send(frankenstein);

    expect(res.body).toEqual({
      id: '1',
      ...frankenstein
    });
  });

  it('gets a book by id with GET', async () => {
    const frankenstein = await Book.insert({ 
      name: 'frankenstein',
      author: 'mary shelley',
      genre: 'science fiction',
    });

    const res = await request(app).get(`/api/v1/pokemon/${frankenstein.id}`);

    expect(res.body).toEqual(frankenstein);
  });

  it('gets all book with GET', async () => {
    const frankenstein = await Book.insert({ 
      name: 'frankenstein',
      author: 'mary shelley',
      genre: 'science fiction',
    });

    const wotw = await Book.insert({ 
      name: 'war of the worlds', 
      author: 'h.g. wells',
      genre: 'science fiction',
    });

    const annihilation = await Book.insert({
      name: 'annihilation',
      author: 'jeff vandermeer',
      genre: 'science fiction',
    });

    return request(app)
      .get('/api/v1/books')
      .then((res) => {
        expect(res.body).toEqual([frankenstein, wotw, annihilation]);
      });
  });

  it('updates a book by id with PUT', async () => {
    const frankenstein = await Book.insert({ 
      name: 'frankenstein',
      author: 'mary shelley',
      genre: 'science fiction',
    });

    const res = await request(app)
      .put(`/api/v1/books/${frankenstein.id}`)
      .send({ type2: 'grass' });
    
    expect(res.body).toEqual({ ...frankenstein, genre: 'horror' });
  });

  it('deletes a book by id with DELETE', async () => {
    const wotw = await Book.insert({ 
      name: 'war of the worlds', 
      author: 'h.g. wells',
      genre: 'science fiction',
    });

    const res = await request(app).delete(`/api/v1/books/${wotw.id}`);

    expect(res.body).toEqual({
      message: `Book ${wotw.name} has been deleted.`
    });
  });
});

describe('cat routes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat via POST', async () => {
    const luna = { 
      name: 'luna',
      age: 3,
      breed: 'ragdoll',
    };

    const res = await request(app)
      .post('/api/v1/cats')
      .send(luna);

    expect(res.body).toEqual({
      id: '1',
      ...luna
    });
  });

  it('gets a cat by id with GET', async () => {
    const luna = await Cat.insert({ 
      name: 'luna',
      age: 3,
      breed: 'ragdoll',
    });

    const res = await request(app).get(`/api/v1/cats/${luna.id}`);

    expect(res.body).toEqual(luna);
  });

  it('gets all cats with GET', async () => {
    const luna = await Cat.insert({ 
      name: 'luna',
      age: 3,
      breed: 'ragdoll',
    });

    const mila = await Cat.insert({ 
      name: 'mila',
      age: 8,
      breed: 'tabby',
    });

    const shadow = await Cat.insert({ 
      name: 'shadow',
      age: 1,
      breed: 'black tabby',
    });

    return request(app)
      .get('/api/v1/cats')
      .then((res) => {
        expect(res.body).toEqual([luna, mila, shadow]);
      });
  });

  it('updates a cat by id with PUT', async () => {
    const luna = await Cat.insert({ 
      name: 'luna',
      age: 3,
      breed: 'ragdoll',
    });

    const res = await request(app)
      .put(`/api/v1/cats/${luna.id}`)
      .send({ age: 4 });
    
    expect(res.body).toEqual({ ...luna, age: 4 });
  });

  it('deletes a cat by id with DELETE', async () => {
    const shadow = await Cat.insert({ 
      name: 'shadow',
      age: 1,
      breed: 'black tabby',
    });

    const res = await request(app).delete(`/api/v1/cats/${shadow.id}`);

    expect(res.body).toEqual({
      message: `Cat ${shadow.name} has been deleted.`
    });
  });
});

describe('video game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a videogame via POST', async () => {
    const subnautica = { 
      name: 'subnautica',
      genre: 'survival',
      rating: 5,
    };

    const res = await request(app)
      .post('/api/v1/videogames')
      .send(subnautica);

    expect(res.body).toEqual({
      id: '1',
      ...subnautica
    });
  });

  it('gets a videogame by id with GET', async () => {
    const subnautica = await VideoGame.insert({ 
      name: 'subnautica',
      genre: 'survival',
      rating: 5,
    });

    const res = await request(app).get(`/api/v1/videogames/${subnautica.id}`);

    expect(res.body).toEqual(subnautica);
  });

  it('gets all videogames with GET', async () => {
    const subnautica = await VideoGame.insert({ 
      name: 'subnautica',
      genre: 'survival',
      rating: 5,
    });

    const sims4 = await VideoGame.insert({ 
      name: 'sims 4',
      genre: 'simulation',
      rating: 3,
    });

    const pokemon = await VideoGame.insert({ 
      name: 'pokemon sword',
      genre: 'rpg',
      rating: 4,
    });

    return request(app)
      .get('/api/v1/videogames')
      .then((res) => {
        expect(res.body).toEqual([subnautica, sims4, pokemon]);
      });
  });

  it('updates a videogame by id with PUT', async () => {
    const subnautica = await VideoGame.insert({ 
      name: 'subnautica',
      genre: 'survival',
      rating: 5,
    });

    const res = await request(app)
      .put(`/api/v1/videogames/${subnautica.id}`)
      .send({ genre: 'action adventure' });
    
    expect(res.body).toEqual({ ...subnautica, genre: 'action adventure' });
  });

  it('deletes a videogame by id with DELETE', async () => {
    const sims4 = await VideoGame.insert({ 
      name: 'sims 4',
      genre: 'simulation',
      rating: 3,
    });

    const res = await request(app).delete(`/api/v1/videogames/${sims4.id}`);

    expect(res.body).toEqual({
      message: `Video Game ${sims4.name} has been deleted.`
    });
  });
});
