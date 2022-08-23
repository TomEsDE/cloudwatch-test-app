const winston = require('winston');
const { combine, timestamp, label, prettyPrint, printf, colorize, errors, simple, json } =
  winston.format;
// var winston = require('winston'),
//   CloudWatchTransport = require('winston-aws-cloudwatch');
const WinstonCloudwatch = require('winston-cloudwatch');

const logFormat = printf(({ level, message, stack, timestamp, additionalInfo }) => {
  return `🪵 ${timestamp} ${level}: ${stack || message} ${
    additionalInfo ? `\n 📒Log-Infos: ${JSON.stringify(additionalInfo, null, 2)}` : ''
  }`;
});

// const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'HH:mm:ss';

/**
 * create Logger
 *
 * @info you can't combine logFormat and prettyPrint -> prettyPrint will always create json
 */
const logger = new winston.createLogger({
  format: errors({ stack: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: combine(colorize(), timestamp({ format: dateFormat }), logFormat),
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      level: 'info',
      format: combine(timestamp({ format: dateFormat }), json(), prettyPrint()),
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: combine(timestamp({ format: dateFormat }), json(), prettyPrint()),
    }),
  ],
});

module.exports = logger;
