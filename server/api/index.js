const express = require('express');
const location = require('./routes/location');
const weather = require('./routes/weather');

module.exports = () => {
  const router = express.Router();

  location(router);
  weather(router);

  return router;
};
