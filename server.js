const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// imports
const { usersRouter } = require('./routers');

// globals
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ type: '*/*' }));

app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`You are connected on port ${PORT}`);
});