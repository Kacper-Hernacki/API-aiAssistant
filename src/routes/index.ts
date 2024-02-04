import messageRoutes from './messageRoutes';
import resourceRoutes from './resourceRoutes';
import skillRoutes from './skillRoutes';
import { Express } from 'express';
import filesRoutes from "./filesRoutes";
import tasksRoutes from "./tasksRoutes";
import notionRoutes from "./notionRoutes";

export default (app: Express): void => {
  app.use('/messages', messageRoutes);
  app.use('/resources', resourceRoutes);
  app.use('/skills', skillRoutes);
  app.use('/files', filesRoutes);
  app.use('/tasks', tasksRoutes);
  app.use('/notion', notionRoutes);
};
