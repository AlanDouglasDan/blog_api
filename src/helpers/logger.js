import 'dotenv/config';
import { createLogger, transports, format } from 'winston';
import morgan from 'morgan';
import moment from 'moment';
import path from 'path';

const {
  combine, timestamp, simple, printf,
} = format;
const getFormattedDate = (str) => moment().format(str);
const numericDate = getFormattedDate('DD-MM-YYYY');
const [month, year] = [getFormattedDate('MMM'), getFormattedDate('YYYY')];
const logPath = `../../logs/${year}/${month}`;

const logger = createLogger({
  format: combine(timestamp({
    format: 'HH:mm:ss',
  }), simple(), printf((log) => `${log.timestamp} ${log.level}: ${log.message} [${getFormattedDate('DD-MMM-YYYY h:mm:ss A')}]`)),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === 'production',
      level: 'info',
    }),
    new transports.File({
      filename: path.join(__dirname, `${logPath}/error(${numericDate}).log`),
      level: 'error',
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message.replace(/\n$/, ''));
  },
};

morgan.format('custom', (tokens, req, res) => ([
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')));

export default logger;
export {
  morgan,
};
