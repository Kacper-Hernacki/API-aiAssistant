"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const resourceRoutes_1 = __importDefault(require("./resourceRoutes"));
const skillRoutes_1 = __importDefault(require("./skillRoutes"));
const filesRoutes_1 = __importDefault(require("./filesRoutes"));
const tasksRoutes_1 = __importDefault(require("./tasksRoutes"));
const notionRoutes_1 = __importDefault(require("./notionRoutes"));
exports.default = (app) => {
    app.use('/messages', messageRoutes_1.default);
    app.use('/resources', resourceRoutes_1.default);
    app.use('/skills', skillRoutes_1.default);
    app.use('/files', filesRoutes_1.default);
    app.use('/tasks', tasksRoutes_1.default);
    app.use('/notion', notionRoutes_1.default);
};
//# sourceMappingURL=index.js.map