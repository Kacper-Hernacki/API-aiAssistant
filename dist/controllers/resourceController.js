"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceController = void 0;
const db_1 = require("../config/db");
const resourceController = {
    postResource: async (req, res) => {
        try {
            const { content, source_list, summary, tags, categories } = req.body;
            const result = await db_1.pool.query('INSERT INTO ai_schema.resources (content, source_list, summary, tags, categories) VALUES ($1, $2, $3, $4, $5) RETURNING *', [content, source_list, summary, tags, categories]);
            res.status(201).json(result.rows[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error inserting resource');
        }
    },
    getAllResources: async (req, res) => {
        try {
            const { rows } = await db_1.pool.query('SELECT * FROM ai_schema.resources');
            res.status(200).json(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching resources');
        }
    },
};
exports.resourceController = resourceController;
//# sourceMappingURL=resourceController.js.map