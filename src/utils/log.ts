import pino from 'pino';
import fs from 'fs';
import ParamRequest from '../types/request';

const streams = [
  { stream: process.stdout },
  { stream: fs.createWriteStream('./log/logfile.log', { flags: 'a' }) }
];

const logger = pino({
  level: 'debug',
}, pino.multistream(streams));

interface LogParams {
  level: 'debug' | 'info' | 'error';
  message: string;
  file: string;
  service: string;
  req?: ParamRequest;
  error?: unknown;
}

const log = ({level, message, file, service, req, error}: LogParams) => {
  const logObject = createLogObject(level, message, file, service, req, error);
  logger[level](logObject);
};

const createLogObject = (level: string, message: string, file: string, service: string, req: ParamRequest | undefined, error: unknown | undefined) => {
  return {
    level: level,
    timestamp: new Date(),
    message: message,
    request: req !== undefined ? {
      requestId: req.headers['x-request-id'] || 'default-request-id',
      ipAddress: req.ip,
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.userId,
    } : undefined,
    location: {
      file: file,
      service: service,
    },
    error: errorToString(error)
  };
}

function errorToString(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (error === undefined) {
    return undefined;
  } else {
    return 'An unknown error occurred';
  }
}

export default log;
