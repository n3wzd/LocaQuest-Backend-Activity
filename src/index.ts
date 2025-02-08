import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import routesUserStatus from './routes/user-status';
import { startRedis } from './utils/redis';
import jwt from './utils/jwt';
import ParamRequest from './types/request';

const app = express();
const server = http.createServer(app);

const initialize = () => {
  startRedis();
  jwt.setTokenKey();
}
initialize();

app.use((req: ParamRequest, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Invalid token format' });
  }

  if(token) {
    const payload = jwt.verify(token);
    if(payload === undefined) {
      res.status(403).json({ message: 'Invalid token' });
    } else {
      req.user = {
        userId: payload.sub ?? "",
        name: payload.name,
      };
    }
    next();
  }
});

app.use('/user-status', routesUserStatus);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error!',
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
