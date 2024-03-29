const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json({
    message:
      "Hey there, I'm not ready to show something interesting to you. I'm on development process. ",
  });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
// Middleware: handle undefined routes

app.all('*', (req, res, next) => {
  next(new AppError('Cannot find on this server', 404));
});
// Middleware global error handler
app.use(globalErrorHandler);
module.exports = app;
