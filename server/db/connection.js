'use strict';
const mongoose = require('mongoose');
const logger = require('../logger');

mongoose.Promise = global.Promise;

async function tryToConnect(retry) {
  return new Promise((resolve, reject) => {
    setTimeout(async() => {
      mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
        .then(() => resolve())
        .catch(reject);
    }, retry * 1000);
  })

}

async function connectToDb() {

  for (let i = 0; i < 3; i++) {
    try {
      await tryToConnect(i);
      return;
    }
    catch(e) {
      logger.info(`Attempt #${i + 1} to connect to db failed`);
      logger.error(e.message);
    }
  }
  process.exit(1);
}

connectToDb();