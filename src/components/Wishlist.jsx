import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaTimes,
  FaHeart,
  FaCheck,
  FaMapMarkerAlt,
  FaGift,
  FaStar,
  FaPlane,
} from "react-icons/fa";

const categories = {
  travel: {
    label: "Lugares para Conhecer",
    Icon: FaPlane,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  goals: {
    label: "Objetivos em Comum",
    Icon: FaStar,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
  gifts: {
    label: "Presentes Desejados",
    Icon: FaGift,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  dates: {
    label: "Ideias de Encontro",
    Icon: FaHeart,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
  },
};

function Wishlist() {
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem("wishes");
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWish, setNewWish] = useState({
    title: "",
    description: "",
    category: "travel",
    completed: false,
  });

  useEffect(() => {
    localStorage.setItem("wishes", JSON.stringify(wishes));
  }, [wishes]);

  const handleAddWish = (e) => {
    e.preventDefault();
    const wishItem = {
      ...newWish,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    setWishes([...wishes, wishItem]);
    setNewWish({
      title: "",
      description: "",
      category: "travel",
      completed: false,
    });
    setShowAddForm(false);
  };

  const toggleWishComplete = (id) => {
    setWishes(
      wishes.map((wish) =>
        wish.id === id ? { ...wish, completed: !wish.completed } : wish
      )
    );
  };

  const deleteWish = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este desejo?")) {
      setWishes(wishes.filter((wish) => wish.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Nossa Lista de Desejos
              </h2>
              <p className="text-gray-600">
                Sonhos e planos para realizarmos juntos
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 md:mt-0 flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaPlus className="text-sm" />
              <span>Novo Desejo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <category.Icon
                    className={`text-2xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                  />
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.label}
                  </h3>
                </div>
                <div className="space-y-4">
                  {wishes
                    .filter((wish) => wish.category === key)
                    .map((wish) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${
                          categories[wish.category].bgColor
                        } rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4
                              className={`text-lg font-semibold mb-2 ${
                                wish.completed
                                  ? "line-through text-gray-500"
                                  : "text-gray-800"
                              }`}
                            >
                              {wish.title}
                            </h4>
                            <p
                              className={`text-sm ${
                                wish.completed
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }`}
                            >
                              {wish.description}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 block">
                              {new Date(wish.date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleWishComplete(wish.id)}
                              className={`p-2 rounded-full transition-colors ${
                                wish.completed
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
                              }`}
                            >
                              <FaCheck size={16} />
                            </button>
                            <button
                              onClick={() => deleteWish(wish.id)}
                              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                            >
                              <FaTimes size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal para adicionar desejo */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Novo Desejo
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleAddWish} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newWish.title}
                    onChange={(e) =>
                      setNewWish({ ...newWish, title: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newWish.description}
                    onChange={(e) =>
                      setNewWish({ ...newWish, description: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Categoria
                  </label>
                  <select
                    value={newWish.category}
                    onChange={(e) =>
                      setNewWish({ ...newWish, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {Object.entries(categories).map(([key, { label }]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Wishlist;
