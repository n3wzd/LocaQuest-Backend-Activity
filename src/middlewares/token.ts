import { Express } from 'express';
import jwt from '../libs/jwt';
import log from '../utils/log';

export const setTokenMiddleware = (app: Express) => {
    app.use(async (req: ParamRequest, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
          log({level: 'info', message: '401: No token provided', file: '/services/middleware', service: 'setTokenMiddleware', req: req});
          res.status(401).send();
        }
      
        const token = authHeader?.split(' ')[1];
        if (!token) {
          log({level: 'info', message: '401: Invalid token format', file: '/services/middleware', service: 'setTokenMiddleware', req: req});
          res.status(401).send();
        }
      
        if(token) {
          try {
            const payload = await jwt.verify(token);
            if(payload) {
              if(typeof payload !== 'string') {
                req.user = {
                  userId: payload.sub ?? "",
                  name: payload.name,
                };
              } else {
                throw new Error('payload is string');
              }
            }
            next();
          } catch (error) {
            log({level: 'info', message: '403: Invalid token', file: '/services/middleware', service: 'setTokenMiddleware', req: req, error: error});
            res.status(403).send();
          }
        }
      });
}
