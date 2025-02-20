import { useTheme } from "../context/ThemeContext";

function BaseComponent() {
  const { isDarkMode } = useTheme();

  const containerClasses = {
    base: `min-h-screen transition-colors duration-300`,
    light: "bg-gradient-to-b from-pink-50 via-white to-pink-50",
    dark: "bg-gray-900 text-gray-100",
  };

  const cardClasses = {
    base: "rounded-xl shadow-lg transition-all duration-300",
    light: "bg-white hover:bg-gray-50",
    dark: "bg-gray-800 hover:bg-gray-700",
  };

  const textClasses = {
    base: "transition-colors duration-300",
    light: "text-gray-900",
    dark: "text-gray-100",
  };

  const buttonClasses = {
    base: "rounded-lg transition-all duration-300",
    light: "bg-pink-500 hover:bg-pink-600 text-white",
    dark: "bg-pink-600 hover:bg-pink-700 text-white",
  };

  const modalClasses = {
    overlay: `fixed inset-0 backdrop-blur-sm ${
      isDarkMode ? "bg-black/80" : "bg-black/60"
    }`,
    content: `bg-${isDarkMode ? "gray-800" : "white"} rounded-xl p-6 shadow-xl`,
  };

  return (
    <div
      className={`
      ${containerClasses.base}
      ${isDarkMode ? containerClasses.dark : containerClasses.light}
    `}
    >
      {/* Resto do conteúdo usando as classes definidas acima */}
    </div>
  );
}
