import express from 'express';
import http from 'http';
import routesUserStatus from './routes/user-status.js';
import redis from './utils/redis.js'
import jwt from './utils/jwt.js'

const app = express();
const server = http.createServer(app);

redis.start();
await jwt.setTokenKey();

app.use(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const payload = jwt.verify(token);
  if(!payload) {
    return res.status(403).json({ message: 'Invalid token' });
  }
  console.log(payload);
  next();
});

app.use('/user-status', routesUserStatus);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error!',
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
