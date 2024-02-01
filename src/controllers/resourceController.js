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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceController = void 0;
const db_1 = require("../config/db");
const resourceController = {
    postResource: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, source_list, summary, tags, categories } = req.body;
            const result = yield db_1.pool.query('INSERT INTO ai_schema.resources (content, source_list, summary, tags, categories) VALUES ($1, $2, $3, $4, $5) RETURNING *', [content, source_list, summary, tags, categories]);
            res.status(201).json(result.rows[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error inserting resource');
        }
    }),
    getAllResources: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { rows } = yield db_1.pool.query('SELECT * FROM ai_schema.resources');
            res.status(200).json(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching resources');
        }
    }),
};
exports.resourceController = resourceController;
