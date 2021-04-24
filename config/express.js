const express = require('express');
const fs = require('fs');
const path = require('path');

class Express {
  port;
  app;

  init() {
    this.app = express();

    this.app.listen(3000, () => {
      console.log('Server Running on port 3000');
    })
  }

  routing() {
    const routesFolder =  path.join(__dirname, '../routes');
    fs.readdirSync(routesFolder).forEach(file => {
      if (file === 'index.js') return;
      var name = file.substr(0, file.indexOf('.'));
      require('../routes/' + name)(this.app);
    })
  }

}

module.exports = new Express();