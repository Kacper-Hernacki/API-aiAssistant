"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notionController_1 = require("../controllers/notionController");
const router = express_1.default.Router();
router.post('/', notionController_1.notionController.addCost);
exports.default = router;
//# sourceMappingURL=notionRoutes.js.map