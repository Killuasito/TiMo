const REDIRECT_URI = import.meta.env.PROD
  ? "https://timo-six.vercel.app/spotify-callback"
  : "http://localhost:5173/spotify-callback";
evelopment;

export const spotifyConfig = {
  clientId: "cfcd496346374776861564414cc3656c",
  redirectUri: REDIRECT_URI,
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
