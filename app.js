const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const errorProcessor = require('./middlewares/errorprocessor');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notfound');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(require('./routes'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use('*', (reg, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorProcessor);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server starting, app listening on port ${PORT}`);
  }
});
