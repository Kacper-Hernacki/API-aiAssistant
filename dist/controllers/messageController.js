"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const db_1 = require("../config/db");
const uuid_1 = require("uuid");
exports.messageController = {
    postMessage: async (req, res) => {
        try {
            const { message, message_type, reflection } = req.body;
            const result = await db_1.pool.query('INSERT INTO ai_schema.message_history (conversation_uuid, message, message_type, reflection) VALUES ($1, $2, $3, $4) RETURNING *', [(0, uuid_1.v4)(), message, message_type, reflection]);
            res.status(201).json(result.rows[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error inserting message');
        }
    },
    getAllMessages: async (req, res) => {
        try {
            const { rows } = await db_1.pool.query('SELECT * FROM ai_schema.message_history');
            res.status(200).json(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching messages');
        }
    },
};
//# sourceMappingURL=messageController.js.map