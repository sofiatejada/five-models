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
  });
