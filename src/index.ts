import express from 'express';
import http from 'http';
import routesUserStatus from './routes/user-status';
import initialize from './services/init';
import { setTokenMiddleware, setErrorHandlingMiddleware} from './services/middleware';

const app = express();
const server = http.createServer(app);

initialize();

app.use(express.json());
setTokenMiddleware(app);
app.use('/user-status', routesUserStatus);
setErrorHandlingMiddleware(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
