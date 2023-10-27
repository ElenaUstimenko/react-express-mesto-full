require('dotenv').config(); // безопасность ключа
const express = require('express');
const json = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate'); // отправить клиенту ошибку
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { router } = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');

// env хранит все переменные окружения
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

// создаём приложение
const app = express();

/* const corseAllowedOrigins = [
  'http://fifteen.nomoredomainsrocks.ru/',
  'https://fifteen.nomoredomainsrocks.ru/',
];

app.use(cors({
  origin: corseAllowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})); */
app.use(cors());
app.use(cookieParser()); // для чтения кук
app.use(helmet()); // для защиты приложения путем настройки заголовков HTTP
app.use(limiter); // ограничивает количество запросов с одного IP-адреса в единицу времени

mongoose.connect(MONGO_URL); // подключаемся к серверу MongoDB

// после инициализации приложения, но до задействования роутов
app.use(json());
app.use(bodyParser.json()); // для собирания JSON-формата, объединения пакетов
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger); // подключаем логгер запросов
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // middleware для ошибок

// запускаем сервер, слушаем порт 3000
app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
