const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

try {
  require('dotenv').config();
} catch (error) {
  console.error('Error loading .env file:', error.message);
}

// Configure the database connection.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    release();
  }
});

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.send(`👋 Hello World! Current time: ${rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.send('Error while connecting to the database');
  }
});

// Endpoint to insert a test message into 'message_history'
app.post('/test-message', async (req, res) => {
  try {
    const { message, message_type, reflection } = req.body;
    const result = await pool.query(
      'INSERT INTO ai_schema.message_history (conversation_uuid, message, message_type, reflection) VALUES ($1, $2, $3, $4) RETURNING *',
      [uuidv4(), message, message_type, reflection]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting message');
  }
});

// Endpoint to insert test data into 'resources'
app.post('/test-resource', async (req, res) => {
  try {
    const { content, source_list,summary, tags, categories } = req.body;
    const result = await pool.query(
      'INSERT INTO ai_schema.resources (content, source_list, summary, tags, categories) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [content, source_list, summary, tags, categories]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting resource');
  }
});

// Endpoint to insert test data into 'skills'
app.post('/test-skill', async (req, res) => {
  try {
    const { name, description, usage_instructions, search_tags, parameter_schema } = req.body;
    const result = await pool.query(
      'INSERT INTO ai_schema.skills (name, description, usage_instructions, search_tags, parameter_schema) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, usage_instructions, search_tags, JSON.stringify(parameter_schema)]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting skill');
  }
});
app.get('/test', async (req, res) => {
  try {
    res.send(`Hello World! Test works: 🚀`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error test');
  }
});

app.get('/messages', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ai_schema.message_history');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching messages');
  }
});

// Endpoint to get all resources from 'resources'
app.get('/resources', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ai_schema.resources');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching resources');
  }
});

// Endpoint to get all skills from 'skills'
app.get('/skills', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ai_schema.skills');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching skills');
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});