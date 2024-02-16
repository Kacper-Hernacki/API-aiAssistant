"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotify_controller_1 = require("../controllers/spotify.controller");
const router = express_1.default.Router();
router.post('/', spotify_controller_1.spotifyController.auth);
router.post('/callback', spotify_controller_1.spotifyController.addNote);
exports.default = router;
//# sourceMappingURL=spotify.routes.js.map