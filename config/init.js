const Express = require('./express');
const Redis = require('./redis');


// Init library
Express.init();
Express.routing();
Redis.init();


module.exports = {
  Express,
  Redis
}