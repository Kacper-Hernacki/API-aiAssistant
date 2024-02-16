import { Request, Response, NextFunction } from 'express';

const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-KEY');
  if (req.path === '/spotify/callback' || '/') {
    return next();
  }
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};

export default apiKeyAuth;