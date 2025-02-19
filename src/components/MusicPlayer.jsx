import { useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaForward, FaBackward } from "react-icons/fa";

const playlist = [
  {
    id: "6jgkEbmQ2F2onEqsEhiliL", // All of Me - John Legend
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
  const [currentTrack, setCurrentTrack] = useState(0);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
            Nossas Músicas
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-6 md:mb-8">
            {/* Player do Spotify - Ajustado para mobile */}
            <div className="w-full mb-4 md:mb-6">
              <iframe
                title={`${playlist[currentTrack].title} - ${playlist[currentTrack].artist}`}
                src={`${playlist[currentTrack].embedUrl}?utm_source=generator&theme=0&autoplay=1`}
                width="100%"
                height={window.innerWidth < 768 ? "152" : "352"}
                style={{ borderRadius: "12px" }}
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Controles e Informações - Layout melhorado para mobile */}
            <div className="flex flex-col items-center space-y-3 md:space-y-4">
              <div className="text-center w-full">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1">
                  {playlist[currentTrack].title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 line-clamp-1">
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
          </div>

          {/* Lista de músicas - Versão mobile otimizada */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <FaSpotify className="text-green-500 text-lg md:text-xl" />
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                Playlist
              </h3>
            </div>
            <div className="space-y-1 md:space-y-2">
              {playlist.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentTrack(index)}
                  className={`flex items-center p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-200 
                    ${
                      currentTrack === index
                        ? "bg-pink-50 text-pink-600"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm md:text-base truncate">
                      {track.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 truncate">
                      {track.artist}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MusicPlayer;
