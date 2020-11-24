const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignupBody, validateSigninBody } = require('./middlewares/validate.js');

const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const {
  login,
  createUser,
} = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const NotFoundError = require('./errors/not-found-err');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateSigninBody, login);
app.post('/signup', validateSignupBody, createUser);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`I am listening to PORT ${PORT}`);
});
