import express from 'express';
import { notionController } from "../controllers/notionController";

const router = express.Router();

router.post('/', notionController.addCost);

export default router;
