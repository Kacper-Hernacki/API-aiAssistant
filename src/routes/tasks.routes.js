"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = express_1.default.Router();
router.post('/', tasks_controller_1.tasksController.createTask);
exports.default = router;
//# sourceMappingURL=tasks.routes.js.map