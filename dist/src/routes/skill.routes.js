"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("../controllers/skill.controller");
const router = express_1.default.Router();
router.get('/', skill_controller_1.skillController.getAllSkills);
router.post('/', skill_controller_1.skillController.postSkill);
exports.default = router;
//# sourceMappingURL=skill.routes.js.map