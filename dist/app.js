"use strict";
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
const apiKeyAuth_1 = __importDefault(require("./middleware/apiKeyAuth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(apiKeyAuth_1.default);
(0, db_1.init)();
app.use('/messages', messageRoutes_1.default);
app.use('/resources', resourceRoutes_1.default);
app.use('/skills', skillRoutes_1.default);
app.get('/', async (req, res) => {
    try {
        res.send(`👋 Hello World!`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error while connecting to the database');
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map