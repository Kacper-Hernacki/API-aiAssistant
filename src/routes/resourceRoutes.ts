import express from 'express';
import { resourceController } from '../controllers/resourceController';

const router = express.Router();

router.post('/', resourceController.postResource);
router.get('/', resourceController.getAllResources);

export default router;
