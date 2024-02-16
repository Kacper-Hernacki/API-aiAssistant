"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksController = void 0;
const createTask_1 = require("../services/tasks/createTask");
exports.tasksController = {
    createTask: async (req, res) => {
        try {
            const { task } = req.body;
            const response = await (0, createTask_1.createTask)(task);
            res.status(201).json({ status: "success", response });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
};
//# sourceMappingURL=tasks.controller.js.map