import messageRoutes from './message.routes';
import resourceRoutes from './resource.routes';
import skillRoutes from './skill.routes';
import { Express } from 'express';
import filesRoutes from "./files.routes";
import tasksRoutes from "./tasks.routes";
import notionRoutes from "./notion.routes";
import spotifyRoutes from "./spotify.routes";

export default (app: Express): void => {
  app.use('/messages', messageRoutes);
  app.use('/resources', resourceRoutes);
  app.use('/skills', skillRoutes);
  app.use('/files', filesRoutes);
  app.use('/tasks', tasksRoutes);
  app.use('/notion', notionRoutes);
  app.use('/spotify', spotifyRoutes);
};
