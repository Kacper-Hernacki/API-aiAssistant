"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resourceController_1 = require("../controllers/resourceController");
const router = express_1.default.Router();
router.post('/', resourceController_1.resourceController.postResource);
router.get('/', resourceController_1.resourceController.getAllResources);
exports.default = router;
