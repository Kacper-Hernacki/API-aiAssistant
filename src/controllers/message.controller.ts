import { Request, Response } from "express";
import { message_history as messageHistoryModel} from "../../models";

export const messageController = {
  postMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, message_type, reflection } = req.body;

      const newMessage = await messageHistoryModel.create({
        data: {
          message,
          message_type,
          reflection,
        },
      });
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting message");
    }
  },

  getAllMessages: async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = await messageHistoryModel.findMany();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching messages");
    }
  },
};
