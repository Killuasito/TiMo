import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaUpload,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const API_URL = "http://localhost:5000/api";

function Gallery() {
  const { isDarkMode } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    url: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
  });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Erro ao carregar fotos:", error);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!isValidImageUrl(newPhoto.url)) {
      alert(`URL inválida. Use o formato correto:
      - ImgBB: https://i.ibb.co/XXXXX/imagem.jpg
      - Ou outros links diretos terminando em .jpg, .png, etc.
      
      Dica: No ImgBB, use o "Direct Link" após fazer upload.`);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhoto),
      });
      const savedPhoto = await response.json();
      setPhotos([savedPhoto, ...photos]);
      setShowAddForm(false);
      setNewPhoto({
        url: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar foto:", error);
    }
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;

    if (url.includes("ibb.co")) {
      return url.startsWith("https://i.ibb.co/");
    }

    return url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
  };

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setSelectedPhoto(photos[(currentIndex + 1) % photos.length]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setSelectedPhoto(
      photos[(currentIndex - 1 + photos.length) % photos.length]
    );
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm("Tem certeza que deseja excluir esta foto?")) {
      try {
        await fetch(`${API_URL}/gallery/${photoId}`, {
          method: "DELETE",
        });
        setPhotos(photos.filter((photo) => photo._id !== photoId));
        if (selectedPhoto?._id === photoId) {
          setSelectedPhoto(null);
        }
      } catch (error) {
        console.error("Erro ao deletar foto:", error);
      }
    }
  };

  const handleClearAllPhotos = () => {
    if (window.confirm("Tem certeza que deseja limpar todas as fotos?")) {
      setPhotos([]);
      setSelectedPhoto(null);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      }`}
    >
      <div className="container mx-auto px-4 pt-24">
        <motion.div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2
              className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4`}
            >
              Nossa Galeria
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } text-lg`}
            >
              Momentos especiais capturados em imagens
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaPlus className="text-sm" />
              <span>Adicionar Foto</span>
            </button>
            <button
              onClick={handleClearAllPhotos}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaTimes className="text-sm" />
              <span>Limpar Tudo</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative aspect-square overflow-hidden rounded-2xl shadow-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
              whileHover={{ y: -5 }}
            >
              <img
                src={photo.url}
                alt={photo.description}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onClick={() => handlePhotoClick(photo, index)}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=Imagem+não+encontrada";
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${
                  isDarkMode ? "hover:from-black/80" : ""
                }`}
              >
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo._id);
                    }}
                    className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 text-white transform hover:scale-110 transition-all duration-200"
                    title="Excluir foto"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-medium text-sm mb-1 truncate">
                    {photo.location}
                  </p>
                  <p className="text-xs opacity-75">
                    {new Date(photo.date).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
                } rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className={`text-xl font-bold ${
                      isDarkMode
                        ? "text-white"
                        : "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                    }`}
                  >
                    Adicionar Nova Foto
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className={`text-gray-400 hover:${
                      isDarkMode ? "text-gray-200" : "text-gray-600"
                    } transition-colors`}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      URL da Imagem
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newPhoto.url}
                        onChange={(e) =>
                          setNewPhoto({ ...newPhoto, url: e.target.value })
                        }
                        className={`w-full p-2 rounded-lg transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-pink-500"
                            : "border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        }`}
                        placeholder="https://i.ibb.co/XXXXX/sua-imagem.jpg"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Use o link direto da imagem (Direct Link) do ImgBB ou
                        outro serviço similar. O link deve terminar com .jpg,
                        .png, .jpeg ou .gif
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={newPhoto.description}
                      onChange={(e) =>
                        setNewPhoto({
                          ...newPhoto,
                          description: e.target.value,
                        })
                      }
                      className={`w-full p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-pink-500"
                          : "border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Data
                    </label>
                    <input
                      type="date"
                      value={newPhoto.date}
                      onChange={(e) =>
                        setNewPhoto({ ...newPhoto, date: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-pink-500"
                          : "border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Local
                    </label>
                    <input
                      type="text"
                      value={newPhoto.location}
                      onChange={(e) =>
                        setNewPhoto({ ...newPhoto, location: e.target.value })
                      }
                      className={`w-full p-2 rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-pink-500"
                          : "border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      }`}
                      required
                    />
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
                      Adicionar Foto
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 ${
                isDarkMode ? "bg-black/95" : "bg-black/90"
              } backdrop-blur-xl z-50 flex items-center justify-center`}
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="container max-w-7xl mx-auto px-4 relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.description}
                    className="max-w-full h-auto max-h-[90vh] object-contain rounded-lg"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                    <h3 className="text-white text-xl font-medium mb-2">
                      {selectedPhoto.description}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <span>
                        {new Date(selectedPhoto.date).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                      <span>•</span>
                      <span>{selectedPhoto.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <FaChevronRight size={24} />
                  </button>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Gallery;
