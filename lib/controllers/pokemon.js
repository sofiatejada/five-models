import { Router } from 'express';
import Pokemon from '../models/HiddenAbility';
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
  })
  .get('/', async (req, res, next) => {
    try {
      const allPokemon = await Pokemon.getAll();

      res.send(allPokemon);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const{ name, type1, type2, hiddenAb } = req.body;

      const updatePokemon = await Pokemon.updateById(id, { name, type1, type2, hiddenAb });

      res.send(updatePokemon);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPokemon = await Pokemon.deleteById(id);

      res.send({
        message: `Pokemon ${deletedPokemon.name} was deleted.`
      });
    } catch (err) {
      next(err);
    }
  });

//{ id: '1', name: 'pumpkaboo', type1: 'ghost', type2: 'grass', hiddenAb: 'insomnia' }
