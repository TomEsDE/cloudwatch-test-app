let logger = null;
if (process.env.NODE_ENV === 'production') {
  console.log('⏱  Using CloudWatch');
  logger = require('./prod-logger');
} else {
  logger = require('./dev-logger');
}

module.exports = logger;
