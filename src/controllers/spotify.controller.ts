import { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import url from "url";

const clientId: string = process.env.SPOTIFY_CLIENT_ID;
const clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri: "http://localhost:3000",
});

export const spotifyController = {
  auth: async (req: Request, res: Response): Promise<void> => {
    try {
      const scope = "user-read-currently-playing user-read-recently-played";
      const redirectUri = `${process.env.UI_HOSTNAME}/spotify/callback`;
      const authorizeURL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

      res.status(201).json({ status: "success", response: authorizeURL });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },
  addNote: async (req: Request, res: Response): Promise<void> => {
    try {
      const { accessToken } = req.body;
      spotifyApi.setAccessToken(accessToken);

      const currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();

      res.status(201).json({ status: "success", response: currentlyPlaying });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting skill");
    }
  },
};
