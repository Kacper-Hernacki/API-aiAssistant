import { pool } from '../config/db';
import { Request, Response } from 'express';

const resourceController = {
  postResource: async (req: Request, res: Response): Promise<void> => {
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

  getAllResources: async (req: Request, res: Response): Promise<void> => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.resources');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching resources');
    }
  },
};

export { resourceController };
