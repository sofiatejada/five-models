import { Router } from 'express';
import Holiday from '../models/Holiday';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const holiday = await Holiday.insert(req.body);
      res.send(holiday);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const holiday = await Holiday.getById(id);

      res.send(holiday);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allHolidays = await Holiday.getAll();

      res.send(allHolidays);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const{ country, lang, capital } = req.body;

      const updatedHoliday = await Holiday.updateById(id, { country, lang, capital });

      res.send(updatedHoliday);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedHoliday = await Holiday.deleteById(id);

      res.send({
        message: `Holiday ${deletedHoliday.country} has been deleted.`
      });
    } catch (err) {
      next(err);
    }
  });
  
