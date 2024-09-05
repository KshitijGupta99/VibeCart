// packages
const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// utils
const { Logger, TryCatch } = require('./utils');
const {
  SuccessResponse,
  InternalServerErrorResponse,
} = require('./utils/responses');

// main app
const app = express();

// middlewares
app.use(helmet());
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res)),
      });
    },
    {
      stream: {
        write: (message) => {
          Logger.info(message);
        },
      },
    },
  ),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({
    dest: './uploads/meta',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('File type not supported!'));
      }
    },
  }).single('cv'),
);
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

// routes imports
// const v1Routes = require('./routes/v1');

// routes
// app.use('/v1', v1Routes);

// default route
app.get('/', (req, res) => {
  return SuccessResponse.send(res, 'Server is running successfully!');
});

// 404 route
app.use((req, res, next) => {
  return InternalServerErrorResponse.send(
    res,
    'Route not found or does not exist!',
  );
});

// error handler
app.use((error, req, res, next) => {
  Logger.error(error);
  return InternalServerErrorResponse.send(res, error.message);
});

module.exports = app;
