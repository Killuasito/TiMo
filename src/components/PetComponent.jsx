import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaUtensils,
  FaMoon,
  FaGamepad,
  FaShower,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { GiWaterDrop, GiCat, GiPartyPopper } from "react-icons/gi";
import { MdPets, MdToys } from "react-icons/md";
import { RiHeartsFill, RiMoonClearFill } from "react-icons/ri";
import { BiBone, BiRestaurant } from "react-icons/bi";
import { useTheme } from "../context/ThemeContext";

const PetComponent = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    health: 100,
    hunger: 100,
    energy: 100,
    hydration: 100,
    love: 100,
  });
  const [mood, setMood] = useState("happy");
  const [isSleeping, setIsSleeping] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showStats, setShowStats] = useState(false);
  const [activities, setActivities] = useState([]);

  const [petName] = useState("Café");
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [toys, setToys] = useState([
    { id: 1, name: "Bolinha", icon: "🎾", used: false },
    { id: 2, name: "Ratinho", icon: "🐭", used: false },
    { id: 3, name: "Novelo", icon: "🧶", used: false },
  ]);
  const [achievements, setAchievements] = useState([
    { id: 1, name: "Primeiro Carinho", icon: "💝", unlocked: false },
    { id: 2, name: "Melhor Amigo", icon: "🤝", unlocked: false },
    { id: 3, name: "Gatinho Feliz", icon: "😸", unlocked: false },
  ]);
  const [cleanliness, setCleanliness] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [personality, setPersonality] = useState("Brincalhão");
  const [favoriteFood, setFavoriteFood] = useState("Atum");
  const [dreamCount, setDreamCount] = useState(0);
  const [moodMessage, setMoodMessage] = useState("");

  const catExpressions = {
    happy: "🐱",
    sad: "😿",
    sleeping: "😺", // will be replaced with custom sleeping cat face
    excited: "😸",
    hungry: "🐱‍👤",
    playful: "😺",
    clean: "✨🐱",
    dirty: "🙀",
    superHappy: "😸",
  };

  // Custom sleeping cat face component
  const SleepingCat = () => (
    <div className="relative">
      <span className="text-2xl">🐱</span>
      <span className="absolute -top-1 right-0 text-sm">💤</span>
    </div>
  );

  const moodVariants = {
    happy: {
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 2 },
    },
    sleeping: {
      rotate: [0, 5, 0],
      transition: { repeat: Infinity, duration: 3 },
    },
    excited: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 0.5 },
    },
    sad: {
      y: [0, 2, 0],
      transition: { repeat: Infinity, duration: 1.5 },
    },
    hungry: {
      scale: [1, 0.95, 1],
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  const foods = [
    { id: 1, name: "Atum", icon: "🐟", energy: 40 },
    { id: 2, name: "Frango", icon: "🍗", energy: 35 },
    { id: 3, name: "Ração Premium", icon: "🥩", energy: 30 },
    { id: 4, name: "Petisco", icon: "🍤", energy: 20 },
  ];

  const dreams = [
    "Sonhando com peixes pulando... 🐠",
    "Perseguindo borboletas em seus sonhos... 🦋",
    "Sonhando com novelos de lã infinitos... 🧶",
    "Dormindo e ronronando suavemente... 😺",
  ];

  // Decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 0.5),
        energy: Math.max(0, prev.energy - 0.3),
        hydration: Math.max(0, prev.hydration - 0.4),
        love: Math.max(0, prev.love - 0.2),
      }));
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Update mood based on stats
  useEffect(() => {
    if (isSleeping) {
      setMood("sleeping");
    } else if (stats.hunger < 30) {
      setMood("hungry");
    } else if (stats.love < 30) {
      setMood("sad");
    } else if (stats.love > 80) {
      setMood("excited");
    } else {
      setMood("happy");
    }
  }, [stats, isSleeping]);

  const addActivity = (action) => {
    setActivities((prev) => [...prev.slice(-4), action]);
  };

  const feed = () => {
    if (!isSleeping) {
      setStats((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 30),
        energy: Math.min(100, prev.energy + 10),
      }));
      addActivity("🍣 Gatinho foi alimentado!");
    }
  };

  const giveWater = () => {
    if (!isSleeping) {
      setStats((prev) => ({
        ...prev,
        hydration: Math.min(100, prev.hydration + 40),
      }));
      addActivity("💧 Gatinho bebeu água!");
    }
  };

  const pet = () => {
    if (!isSleeping) {
      setStats((prev) => ({
        ...prev,
        love: Math.min(100, prev.love + 20),
        energy: Math.max(0, prev.energy - 5),
      }));
      addActivity("💝 Gatinho recebeu carinho!");
    }
  };

  const toggleSleep = () => {
    setIsSleeping(!isSleeping);
    if (!isSleeping) {
      addActivity("💤 Gatinho foi dormir...");
    } else {
      addActivity("🌅 Gatinho acordou!");
    }
  };

  const play = (toyId) => {
    if (!isSleeping) {
      setToys(
        toys.map((toy) => (toy.id === toyId ? { ...toy, used: true } : toy))
      );
      setHappiness((prev) => Math.min(100, prev + 15));
      setExp((prev) => prev + 5);
      addActivity(`🎮 Gatinho está brincando!`);
      checkAchievements();
    }
  };

  const clean = () => {
    if (!isSleeping) {
      setCleanliness(100);
      setHappiness((prev) => Math.min(100, prev + 10));
      setExp((prev) => prev + 3);
      addActivity(`🚿 Gatinho tomou banho!`);
      checkAchievements();
    }
  };

  // Level up system
  useEffect(() => {
    if (exp >= level * 100) {
      setLevel((prev) => prev + 1);
      addActivity(`🎉 Nível ${level + 1} alcançado!`);
    }
  }, [exp, level]);

  // Check achievements
  const checkAchievements = () => {
    const newAchievements = [...achievements];

    if (!newAchievements[0].unlocked && stats.love >= 50) {
      newAchievements[0].unlocked = true;
      addActivity(`🏆 Conquista desbloqueada: Primeiro Carinho!`);
    }

    if (!newAchievements[1].unlocked && level >= 5) {
      newAchievements[1].unlocked = true;
      addActivity(`🏆 Conquista desbloqueada: Melhor Amigo!`);
    }

    if (!newAchievements[2].unlocked && happiness >= 100) {
      newAchievements[2].unlocked = true;
      addActivity(`🏆 Conquista desbloqueada: Gatinho Feliz!`);
    }

    setAchievements(newAchievements);
  };

  const StatBar = ({ value, color }) => (
    <div className="h-2 w-full bg-gray-200 rounded-full">
      <div
        className={`h-full ${color} rounded-full transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  // Enhance sleeping function
  const handleSleep = () => {
    if (!isSleeping) {
      setIsSleeping(true);
      addActivity("💤 Café está dormindo...");
      // Start dream sequence
      const dreamInterval = setInterval(() => {
        setDreamCount((prev) => prev + 1);
        const randomDream = dreams[Math.floor(Math.random() * dreams.length)];
        addActivity(randomDream);
        // Recover energy while sleeping
        setStats((prev) => ({
          ...prev,
          energy: Math.min(100, prev.energy + 5),
        }));
      }, 8000);

      // Store interval ID for cleanup
      return () => clearInterval(dreamInterval);
    } else {
      setIsSleeping(false);
      addActivity("🌅 Café acordou bem disposto!");
      setDreamCount(0);
    }
  };

  // New feeding system
  const feedWithFood = (food) => {
    if (!isSleeping) {
      setStats((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + food.energy),
        energy: Math.min(100, prev.energy + food.energy / 2),
      }));
      addActivity(`${food.icon} Café está comendo ${food.name}!`);
      if (food.name === favoriteFood) {
        setHappiness((prev) => Math.min(100, prev + 15));
        addActivity("😻 Café adora esse alimento!");
        setExp((prev) => prev + 10);
      }
    }
  };

  // Mood messages based on stats
  useEffect(() => {
    if (stats.hunger < 30) {
      setMoodMessage("Café está com muita fome! 😿");
    } else if (stats.energy < 30) {
      setMoodMessage("Café está muito cansado... 😴");
    } else if (happiness > 90) {
      setMoodMessage("Café está super feliz! 😸");
    } else if (cleanliness < 30) {
      setMoodMessage("Café precisa de um banho! 🚿");
    } else {
      setMoodMessage("");
    }
  }, [stats, happiness, cleanliness]);

  return (
    <div
      className={`relative ${
        isDarkMode ? "bg-gray-800/20" : "bg-white/20"
      } backdrop-blur-sm p-4 rounded-xl border ${
        isDarkMode ? "border-gray-700/50" : "border-gray-200/50"
      }`}
    >
      {/* Controls primeiro */}
      <div className="flex gap-2 justify-center">
        {!isSleeping && (
          <>
            <button
              onClick={feed}
              className="p-2 bg-yellow-500 rounded-full text-white shadow-lg hover:bg-yellow-600 transition-colors"
            >
              <FaUtensils />
            </button>
            <button
              onClick={giveWater}
              className="p-2 bg-blue-500 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors"
            >
              <GiWaterDrop />
            </button>
            <button
              onClick={clean}
              className="p-2 bg-blue-400 rounded-full text-white shadow-lg hover:bg-blue-500 transition-colors"
            >
              <FaShower />
            </button>
          </>
        )}
        <motion.div
          animate={moodVariants[mood]}
          className="relative cursor-pointer"
          onClick={() => {
            if (!isSleeping) pet();
            setShowStats(!showStats);
          }}
        >
          {isSleeping && (
            <motion.div
              className="absolute -top-8 -right-2"
              animate={{ y: [-4, 0, -4], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💭
            </motion.div>
          )}
          <div
            className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center
            ${isSleeping ? "bg-gray-800" : "bg-gray-900"}`}
          >
            <div className="text-2xl">
              {isSleeping ? <SleepingCat /> : catExpressions[mood]}
            </div>
          </div>
        </motion.div>
        <button
          onClick={handleSleep}
          className={`p-2 ${
            isSleeping ? "bg-yellow-500" : "bg-purple-500"
          } rounded-full text-white shadow-lg hover:opacity-90 transition-colors`}
        >
          <FaMoon />
        </button>
      </div>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-lg shadow-lg
              ${isDarkMode ? "bg-gray-800/95" : "bg-white/95"} 
              ${isDarkMode ? "text-white" : "text-gray-800"}
              border ${isDarkMode ? "border-gray-700" : "border-gray-200"}
              backdrop-blur-sm w-[calc(100vw-2rem)] md:w-96 max-h-[60vh] overflow-y-auto
              scrollbar-thin ${
                isDarkMode
                  ? "scrollbar-thumb-gray-600"
                  : "scrollbar-thumb-gray-400"
              } scrollbar-track-transparent`}
          >
            {/* Stats content */}
            <div className="p-4 space-y-3">
              {/* Pet Info Header - Sticky */}
              <div
                className={`sticky top-0 z-10 bg-inherit pb-2 mb-2 border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiCat className="text-xl text-amber-500" />
                    <div>
                      <h3 className="font-bold text-amber-400">{petName}</h3>
                      <div className="text-xs text-gray-300">
                        Personalidade: {personality}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs bg-amber-500/20 px-2 py-1 rounded-full">
                    Nível {level}
                  </div>
                </div>
                {/* Mood Message */}
                {moodMessage && (
                  <div
                    className={`text-sm text-center ${
                      isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                    } p-2 mt-2 rounded-lg`}
                  >
                    {moodMessage}
                  </div>
                )}
              </div>

              {/* Rest of the content */}
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <StatBar value={stats.health} color="bg-red-500" />
              </div>
              <div className="flex items-center gap-2">
                <FaUtensils className="text-yellow-500" />
                <StatBar value={stats.hunger} color="bg-yellow-500" />
              </div>
              <div className="flex items-center gap-2">
                <GiWaterDrop className="text-blue-500" />
                <StatBar value={stats.hydration} color="bg-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <FaMoon className="text-purple-500" />
                <StatBar value={stats.energy} color="bg-purple-500" />
              </div>
              <div className="flex items-center gap-2">
                <FaShower className="text-blue-300" />
                <StatBar value={cleanliness} color="bg-blue-300" />
              </div>
              <div className="flex items-center gap-2">
                <GiPartyPopper className="text-pink-400" />
                <StatBar value={happiness} color="bg-pink-400" />
              </div>
              <div className="mt-4">
                <h4
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Brinquedos
                </h4>
                <div className="flex gap-2">
                  {toys.map((toy) => (
                    <button
                      key={toy.id}
                      onClick={() => play(toy.id)}
                      className={`p-2 rounded-lg ${
                        toy.used ? "opacity-50" : "hover:bg-gray-700"
                      }`}
                      disabled={toy.used || isSleeping}
                    >
                      {toy.icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h4
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Conquistas
                </h4>
                <div className="flex gap-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-2 rounded-lg ${
                        achievement.unlocked
                          ? "bg-yellow-500/20"
                          : "bg-gray-700/20"
                      }`}
                      title={achievement.name}
                    >
                      {achievement.icon}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`mt-4 space-y-1 text-xs ${
                  isDarkMode ? "opacity-80" : "opacity-70"
                }`}
              >
                {activities.map((activity, index) => (
                  <div key={index}>{activity}</div>
                ))}
              </div>
              <div className="mt-4">
                <h4
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Alimentação
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {foods.map((food) => (
                    <button
                      key={food.id}
                      onClick={() => feedWithFood(food)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "bg-gray-700/50 hover:bg-gray-600/50"
                          : "bg-gray-100/50 hover:bg-gray-200/50"
                      }`}
                      disabled={isSleeping}
                    >
                      <div className="text-center">
                        <span className="text-xl">{food.icon}</span>
                        <div className="text-xs mt-1">{food.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetComponent;
