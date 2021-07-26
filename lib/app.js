import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pokemonController from './controllers/pokemon.js';
import holidaysController from './controllers/holidays';
// import booksController from './controllers/books';
// import catsController from './controllers/cats';
// import videoGamesController from './controllers/videogames';

const app = express();

app.use(express.json());

app.use('/api/v1/pokemon', pokemonController);
app.use('/api/v1/holidays', holidaysController);
// app.use('/api/v1/books', booksController);
// app.use('/api/v1/cats', catsController);
// app.use('/api/v1/videogames', videoGamesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
