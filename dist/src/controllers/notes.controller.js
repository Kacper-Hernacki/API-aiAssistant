"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesController = void 0;
const addUrl_1 = require("../services/notes/addUrl");
exports.notesController = {
    addUrl: async (req, res) => {
        try {
            const { url } = req.body;
            const response = await (0, addUrl_1.addUrl)(url);
            res.status(201).json({ status: "success", response });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
};
//# sourceMappingURL=notes.controller.js.map