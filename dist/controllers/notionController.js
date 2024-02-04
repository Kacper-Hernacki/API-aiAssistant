"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notionController = void 0;
const addCost_1 = require("../services/notion/addCost");
exports.notionController = {
    addCost: async (req, res) => {
        try {
            const { costData } = req.body;
            const response = await (0, addCost_1.addCost)(costData);
            res.status(201).json({ status: "success", response });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
};
//# sourceMappingURL=notionController.js.map