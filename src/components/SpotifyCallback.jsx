import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const expiresIn = params.get("expires_in");

      if (accessToken) {
        localStorage.setItem("spotify_token", accessToken);
        localStorage.setItem("spotify_token_expires_in", expiresIn);
        navigate("/music");
      } else {
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Conectando ao Spotify...</h2>
        <p className="text-gray-600">Por favor, aguarde...</p>
      </div>
    </div>
  );
}

export default SpotifyCallback;
