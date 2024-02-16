"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.get('X-API-KEY');
    if (req.path === '/spotify/callback' || '/') {
        return next();
    }
    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    }
    else {
        res.status(403).send('Unauthorized');
    }
};
exports.default = apiKeyAuth;
//# sourceMappingURL=apiKeyAuth.js.map