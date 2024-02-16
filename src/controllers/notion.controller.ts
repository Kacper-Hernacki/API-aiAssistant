import { Request, Response } from "express";
import { addCost } from "../services/notion/addCost";

export const notionController = {
  addCost: async (req: Request, res: Response): Promise<void> => {
    try {
      const { costData } = req.body;
      const response = await addCost(costData);

      res.status(201).json({ status: "success", response });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },
};
