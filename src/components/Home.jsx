import { motion } from "framer-motion";
import { FaHeart, FaClock, FaImages, FaBookOpen } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      } transition-all duration-500`}
    >
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[70vh] text-center relative"
        >
          {/* Decorative elements - apenas mostrar no tema claro */}
          {!isDarkMode && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 bg-pink-100 rounded-full blur-xl opacity-60" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-60" />
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold mb-4 md:mb-6"
          >
            <span
              className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-pink-400 to-purple-400"
                  : "from-pink-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Nossa História
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-lg md:text-2xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mb-8 md:mb-12 leading-relaxed px-4`}
          >
            Bem-vindo(a) ao nosso cantinho especial, onde guardamos nossas
            memórias mais preciosas e celebramos cada momento juntos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mx-auto px-4"
          >
            {[
              {
                icon: FaImages,
                title: "Galeria de Momentos",
                description:
                  "Explore nossa coleção de memórias em imagens que contam nossa história.",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: FaClock,
                title: "Nossa Jornada",
                description:
                  "Acompanhe quanto tempo estamos escrevendo nossa história juntos.",
                color: "from-purple-500 to-indigo-500",
              },
              {
                icon: FaHeart,
                title: "Momentos Especiais",
                description:
                  "Relembre as datas e ocasiões mais marcantes do nosso amor.",
                color: "from-rose-500 to-pink-500",
              },
              {
                icon: FaBookOpen,
                title: "Nossa História",
                description:
                  "Descubra os capítulos mais bonitos da nossa caminhada juntos.",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700/80"
                    : "bg-white hover:shadow-xl"
                } p-4 md:p-6 shadow-lg transition-all duration-300`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-3">
                  <div
                    className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3
                    className={`text-lg md:text-xl font-bold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  className={`text-sm md:text-base ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } leading-relaxed`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
