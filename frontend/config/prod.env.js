'use strict';
module.exports = {
  NODE_ENV: '"production"',
  DEBUG: '"*"',
  API_URL: JSON.stringify(process.env.API_URL || 'http://127.0.0.1:9000/api'),
};
