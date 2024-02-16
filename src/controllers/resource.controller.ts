import { Request, Response } from 'express';
import { resources as resourcesModel } from "../../models";

const resourceController = {
  postResource: async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, source_list, summary, tags, categories } = req.body;

      const newResource = await resourcesModel.create({
        data:{
          content, source_list, summary, tags, categories
        }
      })

      res.status(201).json(newResource);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error inserting resource');
    }
  },

  getAllResources: async (req: Request, res: Response): Promise<void> => {
    try {
      const resources = await resourcesModel.findMany()
      res.status(200).json(resources);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching resources');
    }
  },
};

export { resourceController };
