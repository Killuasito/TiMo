export const spotifyConfig = {
  clientId: "cfcd496346374776861564414cc3656c",
  redirectUri: "https://timo-six.vercel.app/spotify-callback", // Alterado para usar a rota de callback
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
