export const spotifyConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: "https://timo-six.vercel.app/callback", // Changed back to /callback
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
