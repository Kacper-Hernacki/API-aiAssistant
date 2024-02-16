"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const models_1 = require("../../models");
exports.messageController = {
    postMessage: async (req, res) => {
        try {
            const { message, message_type, reflection } = req.body;
            const newMessage = await models_1.message_history.create({
                data: {
                    message,
                    message_type,
                    reflection,
                },
            });
            res.status(201).json(newMessage);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting message");
        }
    },
    getAllMessages: async (req, res) => {
        try {
            const messages = await models_1.message_history.findMany();
            res.status(200).json(messages);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error fetching messages");
        }
    },
};
//# sourceMappingURL=message.controller.js.map