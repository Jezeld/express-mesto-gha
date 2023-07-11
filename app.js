const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const InternalServerError = require('./errors/servererror');
const NotFoundError = require('./errors/notfound');

// const session = require('cookie-session')

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());

app.use(require('./routes'));

app.use(errors());

// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));

app.use('*', (reg, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = InternalServerError, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === InternalServerError
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`server starting, app listening on port ${PORT}`);
});
