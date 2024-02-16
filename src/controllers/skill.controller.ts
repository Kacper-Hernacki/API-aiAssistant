import { Request, Response } from "express";
import { skills as skillsModel} from "../../models";

export const skillController = {
  postSkill: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, usage_instructions, search_tags, parameter_schema } = req.body;
      const newSkill = await skillsModel.create({
        data: {
          name,
          description,
          usage_instructions,
          search_tags,
          parameter_schema: JSON.stringify(parameter_schema),
        },
      });

      res.status(201).json(newSkill);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },

  getAllSkills: async (req: Request, res: Response): Promise<void> => {
    try {
      const skills = await skillsModel.findMany()
      res.status(200).json(skills);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching skills");
    }
  },
};
