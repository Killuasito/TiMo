export const spotifyConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: "https://timo-six.vercel.app/spotify-callback", // Dedicated callback route
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
