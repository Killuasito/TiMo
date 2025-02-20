export const spotifyConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUri: window.location.origin + "/callback", // Use dynamic origin
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
