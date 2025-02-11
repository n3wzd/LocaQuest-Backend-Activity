import { Express, Request, Response, NextFunction } from 'express';
import log from '../utils/log';

export const setErrorHandlingMiddleware = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    log({level: 'error', message: 'server error', file: '/services/middleware', service: 'setErrorHandlingMiddleware', error: err});
    res.status(500).send();
  });
}
