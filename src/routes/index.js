"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageRoutes_1 = __importDefault(require("./messageRoutes"));
const resourceRoutes_1 = __importDefault(require("./resourceRoutes"));
const skillRoutes_1 = __importDefault(require("./skillRoutes"));
exports.default = (app) => {
    app.use('/messages', messageRoutes_1.default);
    app.use('/resources', resourceRoutes_1.default);
    app.use('/skills', skillRoutes_1.default);
};
