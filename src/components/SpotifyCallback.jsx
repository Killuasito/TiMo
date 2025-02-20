import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const token = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        localStorage.setItem("spotify_token", token);
        navigate("/music", { replace: true });
      } else {
        navigate("/music", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Autenticando com Spotify...
        </h2>
        <p className="text-gray-600">Por favor, aguarde...</p>
      </div>
    </div>
  );
}

export default SpotifyCallback;
