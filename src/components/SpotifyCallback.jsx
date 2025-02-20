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
        ?.split("=")[1];

      if (token) {
        localStorage.setItem("spotify_token", token);
        navigate("/music");
      } else {
        console.error("No token found in URL");
        navigate("/music?error=no_token");
      }
    } else {
      navigate("/music?error=no_hash");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl mb-4">Conectando ao Spotify...</h2>
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

export default SpotifyCallback;
