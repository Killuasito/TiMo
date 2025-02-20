import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaUser, FaHeart } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Credenciais e dicas
const CREDENTIALS = {
  username: "amor",
  password: "27042024",
};

const HINTS = [
  "Dica: É uma data especial...",
  "Dica: Formato: DDMMAAAA",
  "Dica: 27 de abril de 2024...",
  "Última dica: 27042024",
];

function Login() {
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hintIndex, setHintIndex] = useState(-1);
  const [showHeart, setShowHeart] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.toLowerCase() !== CREDENTIALS.username) {
      setError("Usuário incorreto! (Dica: sinônimo de paixão)");
      return;
    }

    if (password === CREDENTIALS.password) {
      setShowHeart(true);
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/secret");
      }, 1000);
    } else {
      setHintIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= HINTS.length) {
          return prev;
        }
        setError(HINTS[nextIndex]);
        return nextIndex;
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      }`}
    >
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800 shadow-xl shadow-black/20" : "bg-white"
            } rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-sm mx-auto relative overflow-hidden`}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold text-center ${
                isDarkMode
                  ? "bg-gradient-to-r from-pink-400 to-purple-400"
                  : "from-pink-600 to-purple-600"
              } bg-clip-text text-transparent mb-6 md:mb-8`}
            >
              Área Secreta
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Usuário
                </label>
                <div className="relative">
                  <FaUser
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 text-base rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "border border-gray-200"
                    } focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Senha
                </label>
                <div className="relative">
                  <FaLock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 text-base rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "border border-gray-200"
                    } focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm text-center ${
                    error.startsWith("Dica")
                      ? isDarkMode
                        ? "text-pink-400"
                        : "text-pink-600"
                      : "text-red-500"
                  }`}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Entrar
              </button>
            </form>

            {/* Animação de coração quando acertar */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm"
                >
                  <FaHeart className="text-6xl text-pink-500 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
