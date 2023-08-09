const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const error = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT} порт`);
});
