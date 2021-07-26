import { Router } from 'express';
import Cat from '../models/Cat';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const cat = await Cat.insert(req.body);
      res.send(cat);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const cat = await Cat.getById(id);

      res.send(cat);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allCats = await Cat.getAll();

      res.send(allCats);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const{ name, age, breed } = req.body;

      const updatedCat = await Cat.updateById(id, { name, age, breed });

      res.send(updatedCat);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCat = await Cat.deleteById(id);

      res.send({
        message: `Cat ${deletedCat.name} has been deleted.`
      });
    } catch (err) {
      next(err);
    }
  });
  
