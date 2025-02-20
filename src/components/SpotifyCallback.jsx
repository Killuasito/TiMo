import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      const hash = window.location.hash;
      try {
        if (hash) {
          const params = new URLSearchParams(hash.substring(1));
          const token = params.get("access_token");

          if (token) {
            localStorage.setItem("spotify_token", token);
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
          state: { error: error.message },
        });
      }
    };

    handleCallback();
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
