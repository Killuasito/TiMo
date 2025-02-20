import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash) {
        // Parse the access token
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get("access_token");

        if (token) {
          // Save token
          localStorage.setItem("spotify_token", token);

          // Navigate to music player
          navigate("/music", { replace: true });
        } else {
          throw new Error("No token found");
        }
      } else {
        throw new Error("No hash found");
      }
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/music", {
        replace: true,
        state: { error: "Authentication failed" },
      });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h2 className="text-xl mb-4">Autenticando com Spotify...</h2>
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

export default SpotifyCallback;
