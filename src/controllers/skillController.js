const { pool } = require('../config/db'); // Ensure you have a db.js file that exports the pool

const skillController = {
  // Method to add a new skill
  postSkill: async (req, res) => {
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
  },

  // Method to get all skills
  getAllSkills: async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.skills');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching skills');
    }
  },
};

module.exports = skillController;
