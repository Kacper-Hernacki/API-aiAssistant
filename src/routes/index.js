const messageRoutes = require('./messageRoutes');
const resourceRoutes = require('./resourceRoutes');
const skillRoutes = require('./skillRoutes');

module.exports = (app) => {
  app.use('/messages', messageRoutes);
  app.use('/resources', resourceRoutes);
  app.use('/skills', skillRoutes);
};
