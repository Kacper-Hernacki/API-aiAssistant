"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const router = express_1.default.Router();
router.get('/', skillController_1.skillController.getAllSkills);
router.post('/', skillController_1.skillController.postSkill);
exports.default = router;
//# sourceMappingURL=skillRoutes.js.map