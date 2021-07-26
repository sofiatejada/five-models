import { Router } from 'express';
import Book from '../models/Book';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.send(book);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.getById(id);

      res.send(book);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allBooks = await Book.getAll();

      res.send(allBooks);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const{ name, author, genre } = req.body;

      const updatedBook = await Book.updateById(id, { name, author, genre });

      res.send(updatedBook);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.deleteById(id);

      res.send({
        message: `Book ${deletedBook.name} has been deleted.`
      });
    } catch (err) {
      next(err);
    }
  });
  
