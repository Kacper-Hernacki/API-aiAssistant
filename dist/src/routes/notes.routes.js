"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("../controllers/notes.controller");
const router = express_1.default.Router();
router.post('/url', notes_controller_1.notesController.addUrl);
exports.default = router;
//# sourceMappingURL=notes.routes.js.map