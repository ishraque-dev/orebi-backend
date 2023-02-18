const app = require('./app');
const setUpDb = require('./configs/dbConfig');

setUpDb();
app.listen(8000, () => {
  console.log('listening on 8000');
});
