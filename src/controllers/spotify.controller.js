"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifyController = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyApi = new spotify_web_api_node_1.default({
    clientId,
    clientSecret,
    redirectUri: "http://localhost:3000",
});
exports.spotifyController = {
    auth: async (req, res) => {
        try {
            const scope = "user-read-currently-playing user-read-recently-played";
            const redirectUri = `${process.env.UI_HOSTNAME}/spotify/callback`;
            const authorizeURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
            res.status(201).json({ status: "success", response: authorizeURL });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
    addNote: async (req, res) => {
        try {
            const { accessToken } = req.body;
            spotifyApi.setAccessToken(accessToken);
            const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();
            res.status(201).json({ status: "success", response: currentlyPlaying });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error inserting skill");
        }
    },
};
//# sourceMappingURL=spotify.controller.js.map