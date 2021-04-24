const Redis = require('../config/redis');
const { PUB_SUB_CHANNEL } = require('../utils/constants');

module.exports = (app) => {
  app.get('/pub', (req, res) => {
    const message = req.query.msg;
    Redis.publish(PUB_SUB_CHANNEL.MESSAGE, message);
    res.send('Success Publishing')
  })
  
}