import { Router } from 'express';
import VideoGame from '../models/VideoGame';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const videogame = await VideoGame.insert(req.body);
      res.send(videogame);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const videogame = await VideoGame.getById(id);

      res.send(videogame);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allVideoGames = await VideoGame.getAll();

      res.send(allVideoGames);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const{ name, genre, rating } = req.body;

      const updatedVideoGame = await VideoGame.updateById(id, { name, genre, rating });

      res.send(updatedVideoGame);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedVideoGame = await VideoGame.deleteById(id);

      res.send({
        message: `Video Game ${deletedVideoGame.name} has been deleted.`
      });
    } catch (err) {
      next(err);
    }
  });
  
