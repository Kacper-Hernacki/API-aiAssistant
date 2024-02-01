import { pool } from '../config/db';
import { Request, Response } from 'express';

export const skillController = {
  postSkill: async (req: Request, res: Response): Promise<void> => {
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

  getAllSkills: async (req: Request, res: Response): Promise<void> => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.skills');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching skills');
    }
  },
};
