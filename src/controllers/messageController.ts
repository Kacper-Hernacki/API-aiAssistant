import { pool } from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

export const messageController = {
  postMessage: async (req: Request, res: Response): Promise<void> => {
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

  getAllMessages: async (req: Request, res: Response): Promise<void> => {
    try {
      const { rows } = await pool.query('SELECT * FROM ai_schema.message_history');
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching messages');
    }
  },
};
