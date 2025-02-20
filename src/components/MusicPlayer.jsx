import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSpotify,
  FaForward,
  FaBackward,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEllipsisV,
} from "react-icons/fa";
import { BsMusicNoteBeamed, BsVolumeUp, BsSun, BsMoon } from "react-icons/bs";
import { IoMdRepeat, IoMdShuffle } from "react-icons/io";
import { spotifyConfig } from "../config/spotify";
import { useTheme } from "../context/ThemeContext";

// Modificar o objeto playerColors para incluir mais informações
const playerColors = {
  pink: {
    name: "Rosa",
    bg: "bg-pink-50",
    text: "text-pink-600",
    hover: "hover:bg-pink-100",
    gradient: "from-pink-500 to-rose-500",
    button: "bg-pink-500 hover:bg-pink-600",
    shadow: "shadow-pink-500/30",
  },
  purple: {
    name: "Roxo",
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
    gradient: "from-purple-500 to-indigo-500",
    button: "bg-purple-500 hover:bg-purple-600",
    shadow: "shadow-purple-500/30",
  },
  blue: {
    name: "Azul",
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
    gradient: "from-blue-500 to-cyan-500",
    button: "bg-blue-500 hover:bg-blue-600",
    shadow: "shadow-blue-500/30",
  },
  green: {
    name: "Verde",
    bg: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
    gradient: "from-green-500 to-emerald-500",
    button: "bg-green-500 hover:bg-green-600",
    shadow: "shadow-green-500/30",
  },
  yellow: {
    name: "Amarelo",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    hover: "hover:bg-yellow-100",
    gradient: "from-yellow-500 to-orange-500",
    button: "bg-yellow-500 hover:bg-yellow-600",
    shadow: "shadow-yellow-500/30",
  },
};

// Manter a playlist existente como defaultPlaylist
const defaultPlaylist = [
  {
    id: "6jgkEbmQ2F2onEqsEhiliL",
    title: "My Kind of Woman",
    artist: "Mac DeMarco",
    embedUrl: "https://open.spotify.com/embed/track/6jgkEbmQ2F2onEqsEhiliL",
    spotifyUrl: "https://open.spotify.com/track/6jgkEbmQ2F2onEqsEhiliL",
  },
  {
    id: "7zFXmv6vqI4qOt4yGf3jYZ", // All of Me - John Legend
    title: "Get You",
    artist: "Daniel Caesar, Kali Uchis",
    embedUrl: "https://open.spotify.com/embed/track/7zFXmv6vqI4qOt4yGf3jYZ",
    spotifyUrl: "https://open.spotify.com/track/7zFXmv6vqI4qOt4yGf3jYZ",
  },
  {
    id: "2xql0pid3EUwW38AsywxhV", // All of Me - John Legend
    title: "Reflections",
    artist: "The Neighbourhood",
    embedUrl: "https://open.spotify.com/embed/track/2xql0pid3EUwW38AsywxhV",
    spotifyUrl: "https://open.spotify.com/track/2xql0pid3EUwW38AsywxhV",
  },
  {
    id: "2Z5wXgysowvzl0nKGNGU0t", // All of Me - John Legend
    title: "Out of My League",
    artist: "Fitz and The Tantrums",
    embedUrl: "https://open.spotify.com/embed/track/2Z5wXgysowvzl0nKGNGU0t",
    spotifyUrl: "https://open.spotify.com/track/2Z5wXgysowvzl0nKGNGU0t",
  },
  {
    id: "4yNk9iz9WVJikRFle3XEvn", // All of Me - John Legend
    title: "golden hour",
    artist: "JVKE",
    embedUrl: "https://open.spotify.com/embed/track/4yNk9iz9WVJikRFle3XEvn",
    spotifyUrl: "https://open.spotify.com/track/4yNk9iz9WVJikRFle3XEvn",
  },
  {
    id: "3vkCueOmm7xQDoJ17W1Pm3", // All of Me - John Legend
    title: "My Love Mine All Mine",
    artist: "Mitski",
    embedUrl: "https://open.spotify.com/embed/track/3vkCueOmm7xQDoJ17W1Pm3",
    spotifyUrl: "https://open.spotify.com/track/3vkCueOmm7xQDoJ17W1Pm3",
  },
  {
    id: "3SAga35lAPYdjj3qyfEsCF", // All of Me - John Legend
    title: "Feel It",
    artist: "d4vd",
    embedUrl: "https://open.spotify.com/embed/track/3SAga35lAPYdjj3qyfEsCF",
    spotifyUrl: "https://open.spotify.com/track/3SAga35lAPYdjj3qyfEsCF",
  },
  {
    id: "3D5jgROA3ffEU5tfSf5M4q", // All of Me - John Legend
    title: "Something About You",
    artist: "Eyedress",
    embedUrl: "https://open.spotify.com/embed/track/3D5jgROA3ffEU5tfSf5M4q",
    spotifyUrl: "https://open.spotify.com/track/3D5jgROA3ffEU5tfSf5M4q",
  },
  {
    id: "4SpqtLElDsO6KGbd4ub96Z", // All of Me - John Legend
    title: "Pela Luz dos Olhos Teus",
    artist: "Miúcha",
    embedUrl: "https://open.spotify.com/embed/track/4SpqtLElDsO6KGbd4ub96Z",
    spotifyUrl: "https://open.spotify.com/track/4SpqtLElDsO6KGbd4ub96Z",
  },
  {
    id: "2o2xhyri4aJUtgMGkf5P0J",
    title: "Lisboa",
    artist: "ANAVITORIA",
    embedUrl: "https://open.spotify.com/embed/track/2o2xhyri4aJUtgMGkf5P0J",
    spotifyUrl: "https://open.spotify.com/track/2o2xhyri4aJUtgMGkf5P0J",
  },
  {
    id: "6g95dK7o7vVh8ZCnDAseU5", // All of Me - John Legend
    title: "Lyly",
    artist: "Sherine",
    embedUrl: "https://open.spotify.com/embed/track/6g95dK7o7vVh8ZCnDAseU5",
    spotifyUrl: "https://open.spotify.com/track/6g95dK7o7vVh8ZCnDAseU5",
  },
  {
    id: "3EGW6TGGbdk6Ys1Y3HU3lj", // All of Me - John Legend
    title: "Training Wheels",
    artist: "Melanie Martinez",
    embedUrl: "https://open.spotify.com/embed/track/3EGW6TGGbdk6Ys1Y3HU3lj",
    spotifyUrl: "https://open.spotify.com/track/3EGW6TGGbdk6Ys1Y3HU3lj",
  },
  {
    id: "0PIPrd6c5PmEctpdY4ib6H", // All of Me - John Legend
    title: "Como É Grande o Meu Amor por Você",
    artist: "Mundo Bita",
    embedUrl: "https://open.spotify.com/embed/track/0PIPrd6c5PmEctpdY4ib6H",
    spotifyUrl: "https://open.spotify.com/track/0PIPrd6c5PmEctpdY4ib6H",
  },
  // Adicione mais músicas aqui
];

function MusicPlayer() {
  const { isDarkMode } = useTheme(); // Usar o tema global
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [playlist, setPlaylist] = useState(() => {
    const saved = localStorage.getItem("customPlaylist");
    return saved ? JSON.parse(saved) : defaultPlaylist;
  });
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    spotifyUrl: "",
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("spotify_token")
  );
  const [editingTrack, setEditingTrack] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("playerColor") || "pink";
  });
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  // Salvar playlist quando atualizada
  useEffect(() => {
    localStorage.setItem("customPlaylist", JSON.stringify(playlist));
  }, [playlist]);

  // Salvar cor quando mudar
  useEffect(() => {
    localStorage.setItem("playerColor", themeColor);
  }, [themeColor]);

  // Salvar preferência de tema
  useEffect(() => {
    localStorage.setItem("musicPlayerTheme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleAddTrack = (e) => {
    e.preventDefault();
    if (editingTrack) {
      // Atualizar música existente
      setPlaylist(
        playlist.map((track) =>
          track.id === editingTrack.id
            ? { ...track, title: newTrack.title, artist: newTrack.artist }
            : track
        )
      );
      setEditingTrack(null);
    } else {
      // Adicionar nova música
      // Extrair ID do Spotify da URL
      const spotifyId = extractSpotifyId(newTrack.spotifyUrl);
      if (!spotifyId) {
        alert(
          "URL do Spotify inválida. Use o formato: https://open.spotify.com/track/ID"
        );
        return;
      }

      const track = {
        id: spotifyId,
        title: newTrack.title,
        artist: newTrack.artist,
        embedUrl: `https://open.spotify.com/embed/track/${spotifyId}`,
        spotifyUrl: `https://open.spotify.com/track/${spotifyId}`,
      };

      setPlaylist([...playlist, track]);
    }
    setShowAddForm(false);
    setNewTrack({ title: "", artist: "", spotifyUrl: "" });
  };

  const extractSpotifyId = (url) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleNext = () => {
    if (isRepeating) {
      // Manter na mesma música
      const audio = document.querySelector("iframe");
      if (audio) audio.src = audio.src;
    } else {
      setCurrentTrack((prev) => (prev + 1) % playlist.length);
    }
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const loginToSpotify = () => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const params = new URLSearchParams({
      client_id: spotifyConfig.clientId,
      redirect_uri: spotifyConfig.redirectUri,
      response_type: "token",
      scope: spotifyConfig.scopes.join(" "),
      show_dialog: true,
      state: "music", // Add state to redirect after auth
    });

    window.location.href = `${authEndpoint}?${params.toString()}`;
  };

  const handleDeleteTrack = (trackId) => {
    if (window.confirm("Tem certeza que deseja excluir esta música?")) {
      const trackIndex = playlist.findIndex((track) => track.id === trackId);

      // Se a música a ser deletada é a atual ou vem antes dela, ajusta o índice
      if (trackIndex <= currentTrack) {
        setCurrentTrack((prev) => {
          const newIndex = prev - 1 < 0 ? 0 : prev - 1;
          return newIndex;
        });
      }

      setPlaylist((prevPlaylist) => {
        const newPlaylist = prevPlaylist.filter(
          (track) => track.id !== trackId
        );

        // Se a playlist ficou vazia, reseta o currentTrack
        if (newPlaylist.length === 0) {
          setCurrentTrack(0);
        }
        // Se o currentTrack ficou maior que o tamanho da playlist
        else if (currentTrack >= newPlaylist.length) {
          setCurrentTrack(newPlaylist.length - 1);
        }

        return newPlaylist;
      });
    }
  };

  const handleEditTrack = (track) => {
    setEditingTrack(track);
    setShowAddForm(true);
  };

  const shufflePlaylist = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
    } else {
      // Restaurar ordem original
      const savedPlaylist = localStorage.getItem("originalPlaylist");
      if (savedPlaylist) {
        setPlaylist(JSON.parse(savedPlaylist));
      }
    }
  };

  // Adicione uma verificação de segurança no render
  if (playlist.length === 0) {
    return (
      <div
        className={`min-h-screen transition-all duration-700 ease-in-out ${
          isDarkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
        }`}
      >
        <div className="container mx-auto px-4 pt-28">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Nenhuma música na playlist
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className={`flex items-center space-x-2 px-4 py-2 mx-auto ${playerColors[themeColor].button} text-white rounded-full transition-colors`}
            >
              <FaPlus className="text-sm" />
              <span>Adicionar Música</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-700 ease-in-out ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      }`}
    >
      <div className="container mx-auto px-4 pt-28">
        {" "}
        {/* Adicionado pt-28 aqui */}
        <motion.div className="max-w-4xl mx-auto">
          {/* Header com configurações de tema */}
          <div
            className={`mb-8 transition-all duration-700 ease-in-out ${
              isDarkMode
                ? "bg-gray-800/50 shadow-xl shadow-black/20"
                : "bg-white/90 backdrop-blur-sm"
            } rounded-xl p-6 shadow-lg`}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Cores do player */}
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Cor do Player
                </span>
                <div className="flex gap-2">
                  {Object.entries(playerColors).map(([colorName, color]) => (
                    <button
                      key={colorName}
                      onClick={() => setThemeColor(colorName)}
                      className="group relative"
                      title={color.name}
                    >
                      <div
                        className={`
                        w-10 h-10 rounded-xl ${color.bg} ${color.hover}
                        transition-all duration-300
                        ${
                          themeColor === colorName
                            ? `scale-100 ${
                                color.shadow
                              } shadow-lg ring-2 ring-offset-2 ${
                                isDarkMode ? "ring-gray-700" : "ring-white"
                              }`
                            : "scale-90 hover:scale-95"
                        }
                      `}
                      >
                        {themeColor === colorName && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className={`w-2 h-2 rounded-full ${color.text}`}
                            />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cabeçalho melhorado com ajustes no ícone */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/80 shadow-lg shadow-black/20"
                    : playerColors[themeColor].bg
                }`}
              >
                <BsMusicNoteBeamed
                  className={`text-3xl transition-colors duration-300 ${
                    isDarkMode
                      ? playerColors[themeColor].text // Usar a cor do tema mesmo no modo escuro
                      : playerColors[themeColor].text
                  }`}
                />
              </div>
              <div>
                <h2
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${playerColors[themeColor].gradient} bg-clip-text text-transparent`}
                >
                  Nossas Músicas
                </h2>
                <p
                  className={`mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {playlist.length} músicas na playlist
                </p>
              </div>
            </div>

            {/* Controles da playlist */}
            <div className="flex items-center space-x-4">
              <button
                onClick={shufflePlaylist}
                className={`p-2 rounded-full ${
                  isShuffled
                    ? playerColors[themeColor].text
                    : isDarkMode
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-400"
                } hover:${playerColors[themeColor].text} transition-colors`}
                title="Embaralhar"
              >
                <IoMdShuffle size={20} />
              </button>
              <button
                onClick={() => setIsRepeating(!isRepeating)}
                className={`p-2 rounded-full ${
                  isRepeating
                    ? playerColors[themeColor].text
                    : isDarkMode
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-400"
                } hover:${playerColors[themeColor].text} transition-colors`}
                title="Repetir"
              >
                <IoMdRepeat size={20} />
              </button>
            </div>
          </div>

          {/* Player Container Melhorado */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              isDarkMode
                ? "bg-gray-800/50 shadow-xl shadow-black/20"
                : playerColors[themeColor].bg
            } rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm`}
          >
            {/* Player do Spotify - Ajustado para mobile */}
            <div className="w-full mb-4 md:mb-6">
              {accessToken ? (
                <iframe
                  title={`${playlist[currentTrack].title}`}
                  src={`${playlist[currentTrack].embedUrl}?theme=0`} // Removido autoplay e outros parâmetros
                  width="100%"
                  height={window.innerWidth < 768 ? "152" : "352"}
                  style={{ borderRadius: "12px" }}
                  frameBorder="0"
                  allowFullScreen=""
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    Faça login no Spotify para ouvir as músicas completas
                  </p>
                  <button
                    onClick={loginToSpotify}
                    className={`flex items-center space-x-2 px-6 py-3 ${playerColors[themeColor].button} text-white rounded-full transition-colors`}
                  >
                    <FaSpotify size={20} />
                    <span>Conectar com Spotify</span>
                  </button>
                </div>
              )}
            </div>

            {/* Controles e Informações - Layout melhorado para mobile */}
            <div className="flex flex-col items-center space-y-3 md:space-y-4">
              <div className="text-center w-full">
                <h3
                  className={`text-lg md:text-xl font-bold line-clamp-1 ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {playlist[currentTrack].title}
                </h3>
                <p
                  className={`text-sm md:text-base line-clamp-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {playlist[currentTrack].artist}
                </p>
              </div>

              <div className="flex items-center justify-center w-full space-x-3 md:space-x-6">
                <button
                  onClick={handlePrevious}
                  className="p-2 md:p-3 hover:bg-pink-50 rounded-full transition-all duration-300"
                >
                  <FaBackward className="text-gray-600 hover:text-pink-600 text-lg md:text-xl" />
                </button>

                <a
                  href={playlist[currentTrack].spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm md:text-base"
                >
                  <FaSpotify className="text-base md:text-lg" />
                  <span className="hidden sm:inline">Abrir no Spotify</span>
                  <span className="sm:hidden">Spotify</span>
                </a>

                <button
                  onClick={handleNext}
                  className="p-2 md:p-3 hover:bg-pink-50 rounded-full transition-all duration-300"
                >
                  <FaForward className="text-gray-600 hover:text-pink-600 text-lg md:text-xl" />
                </button>
              </div>
            </div>

            {/* Adicionar controles de volume e progresso */}
            <div className="mt-4 px-4">
              <div className="flex items-center space-x-3">
                <BsVolumeUp className="text-gray-600" />
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className={`h-full w-3/4 rounded-full ${playerColors[themeColor].button}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Adicionar botão de adicionar música */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowAddForm(true)}
              className={`flex items-center space-x-2 px-4 py-2 ${playerColors[themeColor].button} text-white rounded-full transition-colors`}
            >
              <FaPlus className="text-sm" />
              <span>Adicionar Música</span>
            </button>
          </div>

          {/* Modal para adicionar música */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                // ...existing motion props...
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  // ...existing motion props...
                  className={`transition-all duration-700 ease-in-out ${
                    isDarkMode ? "bg-gray-800/95 text-gray-100" : "bg-white"
                  } rounded-xl p-6 max-w-md w-full mx-4`}
                >
                  <h3 className="text-xl font-bold mb-4">
                    {editingTrack ? "Editar Música" : "Adicionar Nova Música"}
                  </h3>
                  <form onSubmit={handleAddTrack} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={newTrack.title}
                        onChange={(e) =>
                          setNewTrack({ ...newTrack, title: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Artista
                      </label>
                      <input
                        type="text"
                        value={newTrack.artist}
                        onChange={(e) =>
                          setNewTrack({ ...newTrack, artist: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    {!editingTrack && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          URL do Spotify
                        </label>
                        <input
                          type="url"
                          value={newTrack.spotifyUrl}
                          onChange={(e) =>
                            setNewTrack({
                              ...newTrack,
                              spotifyUrl: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                          placeholder="https://open.spotify.com/track/..."
                          required
                        />
                      </div>
                    )}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingTrack(null);
                        }}
                        className="px-4 py-2 text-gray-600"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg"
                      >
                        {editingTrack ? "Salvar" : "Adicionar"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lista de músicas melhorada */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              isDarkMode
                ? "bg-gray-800/50 shadow-lg shadow-black/20"
                : playerColors[themeColor].bg
            } rounded-2xl p-6 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FaSpotify className="text-green-500 text-xl" />
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Playlist
                </h3>
              </div>
            </div>

            {/* Lista com animações melhoradas */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
              {playlist.map((track, index) => (
                <motion.div
                  key={track.id}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentTrack === index
                      ? isDarkMode
                        ? `bg-gray-700/50 border-l-4 ${playerColors[themeColor].text}`
                        : `bg-white/80 border-l-4 ${playerColors[themeColor].text} shadow-md`
                      : isDarkMode
                      ? "hover:bg-gray-700/30"
                      : "hover:bg-white/60"
                  }`}
                >
                  <div
                    className="flex-1 min-w-0"
                    onClick={() => setCurrentTrack(index)}
                  >
                    <h4
                      className={`font-medium text-sm md:text-base truncate ${
                        currentTrack === index
                          ? isDarkMode
                            ? "text-white"
                            : playerColors[themeColor].text
                          : isDarkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      {track.title}
                    </h4>
                    <p
                      className={`text-xs md:text-sm truncate ${
                        currentTrack === index
                          ? isDarkMode
                            ? "text-gray-400"
                            : "text-gray-600"
                          : "text-gray-500"
                      }`}
                    >
                      {track.artist}
                    </p>
                  </div>

                  {/* Botões de ação sempre visíveis */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTrack(track);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-600"
                          : "text-gray-400 hover:text-pink-600 hover:bg-gray-100"
                      }`}
                      title="Editar"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrack(track.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "text-gray-400 hover:text-red-400 hover:bg-gray-600"
                          : "text-gray-400 hover:text-red-600 hover:bg-gray-100"
                      }`}
                      title="Excluir"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ...existing modals... */}
    </div>
  );
}

// Adicionar estilos globais para a scrollbar personalizada
const style = document.createElement("style");
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(var(--mode-opposite), 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(var(--mode-opposite), 0.3);
  }
  
  [data-theme='dark'] {
    --mode-opposite: 255, 255, 255;
  }
  
  [data-theme='light'] {
    --mode-opposite: 0, 0, 0;
  }
`;
document.head.appendChild(style);

export default MusicPlayer;
