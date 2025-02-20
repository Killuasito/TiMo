import React, { useState, useEffect } from "react";
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
import { useTheme } from "../context/ThemeContext";

const API_URL = "http://localhost:5000/api";

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

const colors = {
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-600",
    hover: "hover:bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
    gradient: "from-purple-500 to-indigo-500",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
    gradient: "from-blue-500 to-cyan-500",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
    gradient: "from-green-500 to-emerald-500",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    hover: "hover:bg-yellow-100",
    gradient: "from-yellow-500 to-orange-500",
  },
};

const iconOptions = [
  { icon: FaHeart, label: "Coração" },
  { icon: FaStar, label: "Estrela" },
  { icon: FaGift, label: "Presente" },
  { icon: FaPlane, label: "Avião" },
  { icon: FaMapMarkerAlt, label: "Local" },
  // Adicione mais ícones conforme necessário
];

function Wishlist() {
  const { isDarkMode } = useTheme();
  const [wishes, setWishes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWish, setNewWish] = useState({
    title: "",
    description: "",
    category: "travel",
    completed: false,
    color: "pink",
    icon: "FaHeart",
  });

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await fetch(`${API_URL}/wishlist`);
      const data = await response.json();
      setWishes(data);
    } catch (error) {
      console.error("Erro ao carregar desejos:", error);
    }
  };

  const handleAddWish = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWish),
      });
      const savedWish = await response.json();
      setWishes([...wishes, savedWish]);
      setNewWish({
        title: "",
        description: "",
        category: "travel",
        completed: false,
        color: "pink",
        icon: "FaHeart",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Erro ao adicionar desejo:", error);
    }
  };

  const toggleWishComplete = async (id) => {
    try {
      const wish = wishes.find((w) => w._id === id);
      const response = await fetch(`${API_URL}/wishlist/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !wish.completed }),
      });
      const updatedWish = await response.json();
      setWishes(wishes.map((w) => (w._id === id ? updatedWish : w)));
    } catch (error) {
      console.error("Erro ao atualizar desejo:", error);
    }
  };

  const deleteWish = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este desejo?")) {
      try {
        await fetch(`${API_URL}/wishlist/${id}`, {
          method: "DELETE",
        });
        setWishes(wishes.filter((wish) => wish._id !== id));
      } catch (error) {
        console.error("Erro ao deletar desejo:", error);
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      } transition-colors duration-500`}
    >
      <div className="container mx-auto px-4 pt-28">
        <motion.div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2
                className={`text-4xl font-bold ${
                  isDarkMode
                    ? "text-gray-100"
                    : "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                } mb-4`}
              >
                Nossa Lista de Desejos
              </h2>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
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
                    className={`text-2xl ${
                      isDarkMode
                        ? "text-gray-100"
                        : "bg-gradient-to-r " +
                          category.color +
                          " bg-clip-text text-transparent"
                    }`}
                  />
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {category.label}
                  </h3>
                </div>
                <div className="space-y-4">
                  {wishes
                    .filter((wish) => wish.category === key)
                    .map((wish) => (
                      <motion.div
                        key={wish._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${
                          isDarkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : colors[wish.color].bg +
                              " " +
                              colors[wish.color].hover
                        } rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {React.createElement(
                                iconOptions.find(
                                  (i) => i.icon.name === wish.icon
                                )?.icon || FaHeart,
                                {
                                  className: isDarkMode
                                    ? "text-gray-300"
                                    : colors[wish.color].text + " text-xl",
                                }
                              )}
                              <h4
                                className={`text-lg font-semibold ${
                                  isDarkMode
                                    ? wish.completed
                                      ? "line-through text-gray-500"
                                      : "text-gray-100"
                                    : wish.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                                }`}
                              >
                                {wish.title}
                              </h4>
                            </div>
                            <p
                              className={`text-sm ${
                                isDarkMode
                                  ? wish.completed
                                    ? "text-gray-600"
                                    : "text-gray-400"
                                  : wish.completed
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
                              onClick={() => toggleWishComplete(wish._id)}
                              className={`p-2 rounded-full transition-colors ${
                                isDarkMode
                                  ? wish.completed
                                    ? "bg-green-800 text-green-300"
                                    : "bg-gray-700 text-gray-400 hover:bg-green-800 hover:text-green-300"
                                  : wish.completed
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600"
                              }`}
                            >
                              <FaCheck size={16} />
                            </button>
                            <button
                              onClick={() => deleteWish(wish._id)}
                              className={`p-2 rounded-full transition-colors ${
                                isDarkMode
                                  ? "bg-gray-700 text-gray-400 hover:bg-red-900 hover:text-red-300"
                                  : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                              }`}
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
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } rounded-xl p-6 shadow-lg`}
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

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Cor do Card
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(colors).map(([colorName, colorValue]) => (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() =>
                          setNewWish({ ...newWish, color: colorName })
                        }
                        className={`w-full h-10 rounded-lg transition-all duration-200 ${
                          colorValue.bg
                        } ${colorValue.hover} ${
                          newWish.color === colorName
                            ? "ring-2 ring-offset-2 ring-" + colorName + "-500"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ícone
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setNewWish({ ...newWish, icon: Icon.name })
                        }
                        className={`p-3 rounded-lg flex items-center justify-center ${
                          newWish.icon === Icon.name
                            ? `${colors[newWish.color].bg} ${
                                colors[newWish.color].text
                              }`
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        title={label}
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
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
