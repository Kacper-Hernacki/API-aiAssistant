import express from 'express';
import { notesController } from "../controllers/notes.controller";

const router = express.Router();

router.post('/url', notesController.addUrl);

export default router;
