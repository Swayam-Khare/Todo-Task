const express = require('express');
const app = express();
app.use(express.json());
const taskRoute = require('./router/taskRoute')
const globalErrorHandler = require('./utils/globalErrorHandler');

app.use('/api/v1',taskRoute);

app.use(globalErrorHandler)

module.exports = app;