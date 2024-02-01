import messageRoutes from './messageRoutes';
import resourceRoutes from './resourceRoutes';
import skillRoutes from './skillRoutes';
import { Express } from 'express';

export default (app: Express): void => {
  app.use('/messages', messageRoutes);
  app.use('/resources', resourceRoutes);
  app.use('/skills', skillRoutes);
};
