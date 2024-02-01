const { pool } = require('../config/db'); // Adjust the path as per your project structure

const resourceController = {
  // Method to add a new resource
  postResource: async (req, res) => {
    try {
      const { content, source_list, summary, tags, categories } = req.body;
      const result = await pool.query(
        'INSERT INTO ai_schema.resources (content, source_list, summary, tags, categories) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [content, source_list, summary, tags, categories]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting resource');
    }
  },

  // Method to get all resources
  getAllResources: async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.resources');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching resources');
    }
  },

};

module.exports = resourceController;
