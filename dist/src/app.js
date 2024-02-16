"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiKeyAuth_1 = __importDefault(require("./middleware/apiKeyAuth"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(apiKeyAuth_1.default);
(0, routes_1.default)(app);
app.get("/", async (req, res) => {
    try {
        res.send(`👋 Hello from API!`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error while connecting to the database");
    }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map