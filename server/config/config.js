'use strict';
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test'){ 
  const config = require('./config.json');

  Object.keys(config.test).forEach((key) => {
    process.env[key] = config.test[key];
  });

  if (env === 'development')
    process.env.MONGODB_URI = config.development.MONGODB_URI;
}
