const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');
const {
  combine,
  timestamp,
  label,
  prettyPrint,
  printf,
  colorize,
  errors,
  simple,
  json,
} = winston.format;

const logFormat = printf(
  ({ level, message, stack, timestamp, additionalInfo }) => {
    return `🪵 ${timestamp} ${level}: ${stack || message} ${
      additionalInfo
        ? `\n 📒Log-Infos: ${JSON.stringify(additionalInfo, null, 2)}`
        : ''
    }`;
  }
);

// todo log-rotation
const logger = new winston.createLogger({
  format: errors({ stack: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: combine(timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      level: 'info',
      // format: combine(timestamp(), json(), prettyPrint()),
      format: combine(timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      // format: combine(timestamp(), json(), prettyPrint()),
      format: combine(timestamp(), logFormat),
    }),
  ],
});

// todo - add cloudwatch config to logger
const cloudwatchConfig = {
  // default level is info
  logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
  logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.AWS_INSTANCE_TYPE}-${process.env.NODE_ENV}`,
  awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
  awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  awsRegion: process.env.CLOUDWATCH_REGION,
  messageFormatter: ({ level, message, additionalInfo }) =>
    `[${level}] : ${message} \n 📒 Additional Info: ${JSON.stringify(
      additionalInfo
    )}}`,
};
logger.add(new WinstonCloudWatch(cloudwatchConfig));

module.exports = logger;
