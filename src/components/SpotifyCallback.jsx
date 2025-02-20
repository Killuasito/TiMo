import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      localStorage.setItem("spotify_token", token);
      navigate("/music");
    }
  }, [navigate]);

  return <div>Conectando ao Spotify...</div>;
}

export default SpotifyCallback;
