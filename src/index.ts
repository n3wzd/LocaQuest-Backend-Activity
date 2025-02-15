import express from 'express';
import http from 'http';
import routesClient from './controllers/client';
import { setTokenMiddleware } from './middlewares/token';
import { setErrorHandlingMiddleware} from './middlewares/error-handler';
import { initRedis } from './libs/redis';
import { produceUserParamGain } from './services/produce';
import { KAFKA_SYNC_PERIOD } from './config/kafka';
import { initialize } from './api/init';
import socketServer from './controllers/socket';

const app = express();
const server = http.createServer(app);

initRedis();
setInterval(produceUserParamGain, Number(KAFKA_SYNC_PERIOD));
initialize();
socketServer.start();

app.use(express.json());
setTokenMiddleware(app);
app.use('/client', routesClient);
setErrorHandlingMiddleware(app);

const PORT = process.env.NODEJS_SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
