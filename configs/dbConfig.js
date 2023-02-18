const mongoose = require('mongoose');

const setUpDb = function () {
  const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

  (async function () {
    await mongoose.connect(DB);
    console.log('Connected to database');
  })();
};
module.exports = setUpDb;
