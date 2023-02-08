const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello world !',
  });
});
app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Am from the test Route !',
  });
});
app.listen(8000, () => {
  console.log('listening on 8000');
});
