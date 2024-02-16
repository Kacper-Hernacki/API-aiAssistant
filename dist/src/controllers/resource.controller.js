"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceController = void 0;
const models_1 = require("../../models");
const resourceController = {
    postResource: async (req, res) => {
        try {
            const { content, source_list, summary, tags, categories } = req.body;
            const newResource = await models_1.resources.create({
                data: {
                    content, source_list, summary, tags, categories
                }
            });
            res.status(201).json(newResource);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error inserting resource');
        }
    },
    getAllResources: async (req, res) => {
        try {
            const resources = await models_1.resources.findMany();
            res.status(200).json(resources);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching resources');
        }
    },
};
exports.resourceController = resourceController;
//# sourceMappingURL=resource.controller.js.map