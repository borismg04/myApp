require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/database');
const configExpress = require('./config/express');
const routes = require('./routes');

connectDB();
configExpress(app);
routes(app);

module.exports = app;
