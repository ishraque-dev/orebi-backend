const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello world !',
  });
});
app.listen(8000, () => {
  console.log('listening on 8000');
});
