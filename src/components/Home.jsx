import { motion } from "framer-motion";
import { FaHeart, FaClock, FaImages, FaBookOpen } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[70vh] text-center relative"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-pink-100 rounded-full blur-xl opacity-60" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-60" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nossa História
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 leading-relaxed"
          >
            Bem-vindo(a) ao nosso cantinho especial, onde guardamos nossas
            memórias mais preciosas e celebramos cada momento juntos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full"
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
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}
                  >
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
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
