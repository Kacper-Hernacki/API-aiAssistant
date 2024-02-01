"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksController = void 0;
const create_1 = require("../services/tasks/create");
exports.tasksController = {
    createTask: async (req, res) => {
        try {
            const { task } = req.body;
            const response = await (0, create_1.createTask)(task);
            res.status(201).json({ status: "success", response });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
    getTasks: async (req, res) => {
        try {
            res.status(200).json("check");
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error fetching skills");
        }
    },
};
//# sourceMappingURL=tasksController.js.map