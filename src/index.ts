import express from 'express';
import http from 'http';
import routesClient from './controllers/client';
import routesUserStatus from './controllers/user-status';
import initialize from './external/init';
import { setTokenMiddleware } from './middlewares/token';
import { setErrorHandlingMiddleware} from './middlewares/error-handler';

const app = express();
const server = http.createServer(app);

initialize();

app.use(express.json());
setTokenMiddleware(app);
app.use('/user-status', routesUserStatus);
app.use('/client', routesClient);
setErrorHandlingMiddleware(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
