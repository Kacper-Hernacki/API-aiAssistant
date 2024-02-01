import { Request, Response } from "express";
import { createTask } from "../services/tasks/createTask";


export const tasksController = {
  createTask: async (req: Request, res: Response): Promise<void> => {
    try {
      const { task } = req.body;
      const response = await createTask(task);
      res.status(201).json({ status: "success", response });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },
};
