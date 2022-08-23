const axios = require('axios');
const logger = require('../logger');

const { DISCORD_WEBHOOK_ERROR } = process.env;
class DiscordWebhook {
  static sendError(message) {
    if (DISCORD_WEBHOOK_ERROR) {
      axios
        .post(DISCORD_WEBHOOK_ERROR, {
          content: message,
        })
        .catch((err) => logger.error(err));
    } else {
      logger.debug('No Discord Webhook specified');
    }
  }
}

module.exports = DiscordWebhook;
