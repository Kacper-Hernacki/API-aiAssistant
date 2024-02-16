import express from 'express';
import { filesController } from "../controllers/files.controller";

const router = express.Router();

router.post('/', filesController.uploadFile);
router.get('/', filesController.getFile);

export default router;
