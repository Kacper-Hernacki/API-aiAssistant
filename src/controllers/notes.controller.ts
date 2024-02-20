import { Request, Response } from "express";
import { addUrl } from "../services/notes/addUrl";


export const notesController = {
  addUrl: async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.body;
      const response = await addUrl(url);

      res.status(201).json({ status: "success", response });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },
};
