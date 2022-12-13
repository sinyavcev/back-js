const createError = require('http-errors');
const express = require('express');
const path = require('path');

const usersRouter = require('./routes/users');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./constants/responseCodes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(NOT_FOUND));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || INTERNAL_SERVER_ERROR);
  res.render('error');
});

module.exports = app;
