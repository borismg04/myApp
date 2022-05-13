require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/database');
const configExpress = require('./config/express');

connectDB();
configExpress(app);

module.exports = app;
