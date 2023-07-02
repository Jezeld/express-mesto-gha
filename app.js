const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_NOT_FOUND } = require('./errors/errors');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '649c43cefd5ab663b571c667', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`server starting, app listening on port ${PORT}`);
});
