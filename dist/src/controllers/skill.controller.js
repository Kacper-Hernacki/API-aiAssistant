"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillController = void 0;
const models_1 = require("../../models");
exports.skillController = {
    postSkill: async (req, res) => {
        try {
            const { name, description, usage_instructions, search_tags, parameter_schema } = req.body;
            const newSkill = await models_1.skills.create({
                data: {
                    name,
                    description,
                    usage_instructions,
                    search_tags,
                    parameter_schema: JSON.stringify(parameter_schema),
                },
            });
            res.status(201).json(newSkill);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
    getAllSkills: async (req, res) => {
        try {
            const skills = await models_1.skills.findMany();
            res.status(200).json(skills);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error fetching skills");
        }
    },
};
//# sourceMappingURL=skill.controller.js.map