const Redis = require('./config/redis');
const { PUB_SUB_CHANNEL } = require('./utils/constants');

function subscriber() {
  Redis.subscribe(PUB_SUB_CHANNEL.MESSAGE, (channel, message) => {
    if(channel === PUB_SUB_CHANNEL.MESSAGE) {
      // Do thing
      console.log(`[SUB] Message From '${channel}' :`, message)
    }
  })
}

module.exports = subscriber();