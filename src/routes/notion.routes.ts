import express from 'express';
import { notionController } from "../controllers/notion.controller";

const router = express.Router();

router.post('/', notionController.addCost);

export default router;
