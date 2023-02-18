const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const userRouter = require('./routes/userRoutes');

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
