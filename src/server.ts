import express from 'express';
import routes from './routes';

import GetUserDailyService from './services/GetUserDailyService';

(async () => {
  const response = await new GetUserDailyService().execute('davigsousa');
  console.log(response);
})();

// const app = express();
// app.use(express.json());
// app.use(routes);

// app.listen(3333, () => {
//   console.log('🚀 Server started on port 3333');
// });
