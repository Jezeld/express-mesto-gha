const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const errorProcessor = require('./middlewares/errorprocessor');
const NotFoundError = require('./errors/notfound');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());

app.use(require('./routes'));

app.use(errors());

app.use('*', (reg, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorProcessor);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`server starting, app listening on port ${PORT}`);
});
