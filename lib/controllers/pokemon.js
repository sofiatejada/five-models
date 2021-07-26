import { Router } from 'express';
import Pokemon from '../models/PokemonModel';
// creating the pokemon routes to handle all those requests that come in

export default Router()
  .post('/', async (req, res, next) => {
    try{
      const pokemon = await Pokemon.insert(req.body);
      res.send(pokemon);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      // const { id } = req.params
      const pokemon = await Pokemon.getById(id);

      res.send(pokemon);
    } catch (err) {
      next(err);
    }
  });

//{ id: '1', name: 'pumpkaboo', type1: 'ghost', type2: 'grass', hiddenAb: 'insomnia' }
