const routerSignin = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

routerSignin.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routerSignin.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

module.exports = routerSignin;
