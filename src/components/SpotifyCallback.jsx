import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SpotifyCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      // Extrai o token do hash da URL
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (accessToken) {
        // Salva o token no localStorage
        localStorage.setItem("spotify_token", accessToken);
        // Redireciona para a página de música
        navigate("/music");
      } else {
        // Se não houver token, redireciona para a página inicial
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
