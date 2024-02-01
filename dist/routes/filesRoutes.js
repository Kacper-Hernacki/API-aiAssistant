"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const filesController_1 = require("../controllers/filesController");
const router = express_1.default.Router();
router.post('/', filesController_1.filesController.uploadFile);
router.get('/', filesController_1.filesController.getFile);
exports.default = router;
//# sourceMappingURL=filesRoutes.js.map