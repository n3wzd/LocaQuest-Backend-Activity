import express from 'express';
import http from 'http';
import routesClient from './controllers/client';
import routesUserStatus from './controllers/user-status';
import { setTokenMiddleware } from './middlewares/token';
import { setErrorHandlingMiddleware} from './middlewares/error-handler';
import { initRedis } from './libs/redis';
import { produceUserParamGain } from './services/produce';
import { KAFKA_SYNC_PERIOD } from './config/kafka';
import { initialize } from './api/init';

const app = express();
const server = http.createServer(app);

initRedis();
setInterval(produceUserParamGain, Number(KAFKA_SYNC_PERIOD));
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
