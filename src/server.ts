import express from 'express';
import 'express-async-errors';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
      if (error instanceof AppError) {
          return response.status(error.statusCode).json({
              status: 'error',
              message: error.message,
          });
      }

      console.error(error);

      return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
      });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
