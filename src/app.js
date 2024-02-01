"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const resourceRoutes_1 = __importDefault(require("./routes/resourceRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
(0, db_1.init)();
app.use('/messages', messageRoutes_1.default);
app.use('/resources', resourceRoutes_1.default);
app.use('/skills', skillRoutes_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(`👋 Hello World!`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error while connecting to the database');
    }
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
