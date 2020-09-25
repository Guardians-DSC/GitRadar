import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import routes from './routes';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import './database';

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
