const { Pool } = require('pg');
const  dbConfig  = require('./config');

let pool = new Pool(dbConfig);

exports.init = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
      release();
    }
  });
};

exports.pool = pool;
