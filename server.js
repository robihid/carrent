const express = require('express');
const winston = require('winston');

const app = express();
require('./startup/config')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

app.use(express.json());

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
