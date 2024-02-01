"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config"));
exports.pool = new pg_1.Pool(config_1.default);
const init = () => {
    exports.pool.connect((err, client, release) => {
        if (err) {
            console.error('Error connecting to the database:', err);
        }
        else {
            console.log('Connected to the database');
            release();
        }
    });
};
exports.init = init;
//# sourceMappingURL=db.js.map