export const spotifyConfig = {
  clientId: process.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri:
    process.env.VITE_REDIRECT_URI ||
    "https://seu-dominio-vercel.vercel.app/callback",
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
