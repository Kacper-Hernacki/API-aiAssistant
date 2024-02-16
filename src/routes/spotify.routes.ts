import express from 'express';
import { spotifyController } from "../controllers/spotify.controller";

const router = express.Router();

router.post('/', spotifyController.auth);
router.post('/callback', spotifyController.addNote)

export default router;
