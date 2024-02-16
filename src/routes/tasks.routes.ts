import express from 'express';
import { tasksController } from "../controllers/tasks.controller";


const router = express.Router();

router.post('/', tasksController.createTask);

export default router;
