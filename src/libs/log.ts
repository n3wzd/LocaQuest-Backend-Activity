import pino from 'pino';
import fs from 'fs';

const streams = [
  { stream: process.stdout },
  { stream: fs.createWriteStream('./log/logfile.log', { flags: 'a' }) }
];

const logger = pino({
    level: 'debug',
}, pino.multistream(streams));

export default logger;
