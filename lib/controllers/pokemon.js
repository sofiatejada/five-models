import { Router } from 'express';
// creating the pokemon routes to handle all those requests that come in

export default Router()
  .post('/', async (req, res, next) => {
    try{
      res.send({ id: '1', name: 'pumpkaboo', type1: 'ghost', type2: 'grass', hiddenAb: 'insomnia' });
    } catch (err) {
      next(err);
    }
  });
