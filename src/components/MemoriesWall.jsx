import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTimes,
  FaHeart,
  FaStar,
  FaGift,
  FaCalendarAlt,
  FaCoffee,
  FaCamera,
  FaMusic,
  FaMoon,
  FaSun,
  FaBookmark,
} from "react-icons/fa";

// Mover initialMemories para um arquivo separado ou manter como fallback
const defaultMemories = [
  {
    id: 1,
    date: "2024-01-15",
    title: "Nosso Primeiro Encontro",
    description: "Aquele dia especial em que tudo começou...",
    type: "special-date",
    icon: FaHeart,
  },
  {
    id: 2,
    date: "2024-02-14",
    title: "Primeiro Dia dos Namorados",
    description: "Uma noite mágica e inesquecível...",
    type: "celebration",
    icon: FaGift,
  },
  // Adicione mais memórias aqui
];

// Funções para gerenciar localStorage
const saveMemoriesToStorage = (memories) => {
  try {
    const serializedMemories = memories.map((memory) => ({
      ...memory,
      icon: memory.icon.name, // Salvamos apenas o nome do ícone
    }));
    localStorage.setItem("memories", JSON.stringify(serializedMemories));
  } catch (error) {
    console.error("Erro ao salvar memórias:", error);
  }
};

const loadMemoriesFromStorage = () => {
  try {
    const stored = localStorage.getItem("memories");
    if (!stored) return defaultMemories;

    const parsedMemories = JSON.parse(stored);
    // Convertemos o nome do ícone de volta para o componente do ícone
    return parsedMemories.map((memory) => ({
      ...memory,
      icon: iconMap[memory.icon] || FaHeart,
    }));
  } catch (error) {
    console.error("Erro ao carregar memórias:", error);
    return defaultMemories;
  }
};

// Mapa de ícones para recuperar do localStorage
const iconMap = {
  FaHeart: FaHeart,
  FaStar: FaStar,
  FaGift: FaGift,
  FaCoffee: FaCoffee,
  FaCamera: FaCamera,
  FaMusic: FaMusic,
  FaMoon: FaMoon,
  FaSun: FaSun,
  FaCalendarAlt: FaCalendarAlt,
  FaBookmark: FaBookmark,
};

const memoryTypes = {
  "special-date": {
    label: "Data Especial",
    color: "bg-gradient-to-br from-pink-100 to-pink-50",
    borderColor: "border-pink-200",
    icon: FaCalendarAlt,
  },
  celebration: {
    label: "Celebração",
    color: "bg-gradient-to-br from-purple-100 to-purple-50",
    borderColor: "border-purple-200",
    icon: FaGift,
  },
  adventure: {
    label: "Aventura",
    color: "bg-gradient-to-br from-blue-100 to-blue-50",
    borderColor: "border-blue-200",
    icon: FaStar,
  },
  milestone: {
    label: "Marco",
    color: "bg-gradient-to-br from-green-100 to-green-50",
    borderColor: "border-green-200",
    icon: FaBookmark,
  },
};

function MemoriesWall() {
  const [memories, setMemories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    date: "",
    title: "",
    description: "",
    type: "special-date",
    icon: FaHeart,
  });

  const iconOptions = [
    { icon: FaHeart, label: "Coração" },
    { icon: FaStar, label: "Estrela" },
    { icon: FaGift, label: "Presente" },
    { icon: FaCoffee, label: "Café" },
    { icon: FaCamera, label: "Câmera" },
    { icon: FaMusic, label: "Música" },
    { icon: FaMoon, label: "Lua" },
    { icon: FaSun, label: "Sol" },
    { icon: FaCalendarAlt, label: "Calendário" },
    { icon: FaBookmark, label: "Marcador" },
  ];

  // Carregar memórias ao montar o componente
  useEffect(() => {
    const loadedMemories = loadMemoriesFromStorage();
    setMemories(loadedMemories);
  }, []);

  // Salvar memórias quando houver alterações
  useEffect(() => {
    if (memories.length > 0) {
      saveMemoriesToStorage(memories);
    }
  }, [memories]);

  const handleAddMemory = (e) => {
    e.preventDefault();
    const id = Date.now(); // Usar timestamp como ID único
    const newMemoryItem = { ...newMemory, id };

    setMemories((prevMemories) => [...prevMemories, newMemoryItem]);
    setNewMemory({
      date: "",
      title: "",
      description: "",
      type: "special-date",
      icon: FaHeart,
    });
    setShowAddForm(false);
  };

  // Função para deletar memória (opcional)
  const handleDeleteMemory = (id) => {
    setMemories((prevMemories) => {
      const updatedMemories = prevMemories.filter((memory) => memory.id !== id);
      saveMemoriesToStorage(updatedMemories);
      return updatedMemories;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-0">
            Mural de Memórias
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaPlus className="text-sm" />
            <span>Nova Memória</span>
          </button>
        </motion.div>

        {/* Grade de memórias */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${
                memoryTypes[memory.type].color
              } rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 relative group`}
            >
              {/* Conteúdo principal */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl text-pink-500">
                  <memory.icon className="filter drop-shadow-md" />
                </div>
                <span className="text-sm font-medium text-gray-600 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
                  {new Date(memory.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {memory.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {memory.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-block bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  {memoryTypes[memory.type].label}
                </span>

                {/* Botão de excluir reposicionado */}
                <button
                  onClick={() => handleDeleteMemory(memory.id)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                  title="Excluir memória"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal melhorado */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Nova Memória
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddMemory} className="space-y-4">
                  <div className="space-y-3">
                    {/* Data input */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Data
                      </label>
                      <input
                        type="date"
                        value={newMemory.date}
                        onChange={(e) =>
                          setNewMemory({ ...newMemory, date: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Título input */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={newMemory.title}
                        onChange={(e) =>
                          setNewMemory({ ...newMemory, title: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Descrição textarea */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Descrição
                      </label>
                      <textarea
                        value={newMemory.description}
                        onChange={(e) =>
                          setNewMemory({
                            ...newMemory,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 min-h-[80px] text-sm"
                        required
                      />
                    </div>

                    {/* Tipo select */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Tipo
                      </label>
                      <select
                        value={newMemory.type}
                        onChange={(e) =>
                          setNewMemory({ ...newMemory, type: e.target.value })
                        }
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      >
                        {Object.entries(memoryTypes).map(([key, { label }]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ícones grid */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Ícone
                      </label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {iconOptions.map(({ icon: Icon, label }) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() =>
                              setNewMemory({ ...newMemory, icon: Icon })
                            }
                            className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                              newMemory.icon === Icon
                                ? "bg-pink-100 text-pink-600 shadow-inner scale-95"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-pink-500"
                            }`}
                            title={label}
                          >
                            <Icon size={20} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MemoriesWall;
