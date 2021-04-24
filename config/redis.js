const redis = require('redis');

class Redis {
  redis_port;
  redis_host;
  client;
  subscriber;

  constructor() {
    this.redis_port = 6379;
    this.redis_host = 'localhost';
  }

  init() {
    this.client = redis.createClient({
      port: this.redis_port,
      host: this.redis_host
    });

    this.subscriber = redis.createClient({
      port: this.redis_port,
      host: this.redis_host
    });

    this.client.on('connect', () => {
      console.log('[CLIENT] Redis Run On Port 6379...')
    });

    this.client.on('error', (error) => {
      console.log('[CLIENT] Redis Error ', error)
    })

    this.subscriber.on('connect', () => {
      console.log('[SUBSCRIBER] Redis Run On Port 6379...')
    });

    this.subscriber.on('error', (error) => {
      console.log('[SUBSCRIBER] Redis Error ', error)
    })
  }

  publish(channel, message) {
    this.client.publish(channel, message, () => {
      console.log(`[PUB] Success publish message to '${channel}' :`, message)
    })
  }

  subscribe(channel, callback) {
    this.subscriber.on('message', callback)

    this.subscriber.subscribe(channel, (error, count) => {
      if (error) {
        throw new Error(error);
      }
      console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
    })
  }

}

module.exports = new Redis();