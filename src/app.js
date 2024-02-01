const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./config/db');

require('dotenv').config();
app.use(bodyParser.json());
db.init();

const messageRoutes = require('./routes/messageRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const skillRoutes = require('./routes/skillRoutes');

app.use('/messages', messageRoutes);
app.use('/resources', resourceRoutes);
app.use('/skills', skillRoutes);
app.get('/', async (req, res) => {
  try {
    res.send(`👋 Hello World!`);
  } catch (error) {
    console.error(error);
    res.send('Error while connecting to the database');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});