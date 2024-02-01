import express from 'express';
import { skillController } from '../controllers/skillController';

const router = express.Router();

router.get('/', skillController.getAllSkills);
router.post('/', skillController.postSkill);

export default router;
