import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import pokemonController from './controllers/pokemon.js';
import holidaysController from './controllers/pokemon.js';
import pokemonController from './controllers/pokemon.js';
import pokemonController from './controllers/pokemon.js';
import pokemonController from './controllers/pokemon.js';

const app = express();

app.use(express.json());

app.use('/api/v1/pokemon', pokemonController);
app.use('/api/v1/holidays', );

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
