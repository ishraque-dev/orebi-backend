const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');

const app = express();
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello world !',
  });
});
app.use('/api/v1/users', userRouter);
app.listen(8000, () => {
  console.log('listening on 8000');
});
