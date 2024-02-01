import express from 'express';
import { tasksController } from "../controllers/tasksController";


const router = express.Router();

router.post('/', tasksController.createTask);

export default router;
