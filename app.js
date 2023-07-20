const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
// const cors = require('./middlewares/cors');
const errorProcessor = require('./middlewares/errorprocessor');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notfound');

const { PORT = 3000, URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose
  .connect(URL)
  .then(() => {
    console.log('БД успешно подключена');
  })
  .catch((err) => {
    console.log(`Ошибка подключения: ${err}`);
  });

// app.use(cors);

app.use(express.json());

// app.use(requestLogger); // подключаем логгер запросов

app.use(require('./routes'));

// app.use(errorLogger); // подключаем логгер ошибок

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
