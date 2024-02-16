"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_routes_1 = __importDefault(require("./message.routes"));
const resource_routes_1 = __importDefault(require("./resource.routes"));
const skill_routes_1 = __importDefault(require("./skill.routes"));
const files_routes_1 = __importDefault(require("./files.routes"));
const tasks_routes_1 = __importDefault(require("./tasks.routes"));
const notion_routes_1 = __importDefault(require("./notion.routes"));
const spotify_routes_1 = __importDefault(require("./spotify.routes"));
exports.default = (app) => {
    app.use('/messages', message_routes_1.default);
    app.use('/resources', resource_routes_1.default);
    app.use('/skills', skill_routes_1.default);
    app.use('/files', files_routes_1.default);
    app.use('/tasks', tasks_routes_1.default);
    app.use('/notion', notion_routes_1.default);
    app.use('/spotify', spotify_routes_1.default);
};
//# sourceMappingURL=index.js.map