import express from 'express';
import { messageController } from '../controllers/messageController';

const router = express.Router();

router.post('/', messageController.postMessage);
router.get('/', messageController.getAllMessages);

export default router;
