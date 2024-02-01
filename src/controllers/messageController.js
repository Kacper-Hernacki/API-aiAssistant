const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const messageController = {
  // Method to add a new message
  postMessage: async (req, res) => {
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
  },

  // Method to get all messages
  getAllMessages: async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.message_history');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching messages');
    }
  },
};

module.exports = messageController;
