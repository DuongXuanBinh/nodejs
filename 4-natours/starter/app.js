const express = require('express');
const morgan = require('morgan');
const tourRoute = require('./routes/tourRoutes');
const userRoute = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Middleware application level
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Route mounted
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`,
  // });
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

//Middleware for error handling (Auto recognized)
app.use(globalErrorHandler);

module.exports = app;
