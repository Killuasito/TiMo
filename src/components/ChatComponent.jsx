import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaPaperPlane,
  FaCog,
  FaEraser,
  FaDownload,
  FaPalette,
  FaBold,
  FaItalic,
  FaUnderline,
  FaVolumeUp,
  FaBell,
  FaBellSlash,
} from "react-icons/fa";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { HexColorPicker } from "react-colorful";

function ChatComponent() {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("Tiago");
  const [showSettings, setShowSettings] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userColors, setUserColors] = useState({
    Tiago: "bg-pink-500",
    Kamilly: "bg-purple-500",
  });
  const [fontSize, setFontSize] = useState("medium");
  const messagesEndRef = useRef(null);
  const [notifications, setNotifications] = useState(true);
  const [messageSound, setMessageSound] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const messageSoundRef = useRef(new Audio("/message-sound.mp3"));
  const typingTimeout = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [messageColors, setMessageColors] = useState({
    Tiago: {
      background: "#EC4899", // pink-500
      text: "#FFFFFF",
      gradient: "from-pink-500 to-rose-500",
    },
    Kamilly: {
      background: "#A855F7", // purple-500
      text: "#FFFFFF",
      gradient: "from-purple-500 to-indigo-500",
    },
  });

  const gradientPresets = [
    { name: "Rosa-Roxo", value: "from-pink-500 to-purple-500" },
    { name: "Azul-Verde", value: "from-blue-500 to-teal-500" },
    { name: "Laranja-Rosa", value: "from-orange-500 to-pink-500" },
    { name: "Verde-Azul", value: "from-green-500 to-blue-500" },
    { name: "Roxo-Índigo", value: "from-purple-500 to-indigo-500" },
  ];

  const updateUserColors = (user, type, value) => {
    setMessageColors((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        [type]: value,
      },
    }));
  };

  const ColorSettings = () => (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
      } border-b border-gray-700`}
    >
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <span
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Estilo da Mensagem
          </span>
          <div className="flex gap-2">
            {/* Using HexColorPicker instead of ColorPicker */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-8 h-8 rounded-full shadow-md"
                style={{
                  backgroundColor: messageColors[currentUser].background,
                }}
              />
              {showColorPicker && (
                <div className="absolute z-50 mt-2">
                  <HexColorPicker
                    color={messageColors[currentUser].background}
                    onChange={(color) =>
                      updateUserColors(currentUser, "background", color)
                    }
                  />
                </div>
              )}
            </div>
            {gradientPresets.map((gradient) => (
              <button
                key={gradient.name}
                onClick={() =>
                  updateUserColors(currentUser, "gradient", gradient.value)
                }
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient.value} shadow-md
                  hover:scale-110 transition-transform`}
                title={gradient.name}
              />
            ))}
          </div>
        </div>

        {/* Rest of the ColorSettings component remains the same */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Cor do Texto</span>
          <div className="flex gap-2">
            <button
              onClick={() => updateUserColors(currentUser, "text", "#FFFFFF")}
              className="px-3 py-1 bg-gray-800 text-white rounded-full text-xs"
            >
              Branco
            </button>
            <button
              onClick={() => updateUserColors(currentUser, "text", "#000000")}
              className="px-3 py-1 bg-white text-black border rounded-full text-xs"
            >
              Preto
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MessageBubble = ({ message, isCurrentUser }) => (
    <div
      className={`max-w-[70%] p-4 ${
        isCurrentUser
          ? isDarkMode
            ? "bg-purple-600" // Dark mode, current user
            : "bg-pink-500" // Light mode, current user
          : isDarkMode
          ? "bg-gray-700/50" // Dark mode, other user
          : "bg-gray-100" // Light mode, other user
      } 
      ${
        isCurrentUser
          ? "text-white"
          : isDarkMode
          ? "text-gray-100"
          : "text-gray-800"
      }
      rounded-2xl shadow-lg backdrop-blur-sm
      ${isCurrentUser ? "rounded-br-none" : "rounded-bl-none"}
      transition-all duration-300 hover:shadow-xl`}
      style={{
        backgroundColor: isCurrentUser
          ? messageColors[message.sender].background
          : undefined,
        color: isCurrentUser ? messageColors[message.sender].text : undefined,
        fontSize: message.fontSize || fontSize, // Aplicar tamanho da fonte
      }}
    >
      <div
        className="break-words [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-lg [&_img]:transition-all [&_img]:duration-300"
        dangerouslySetInnerHTML={{
          __html: processMessageText(message.content),
        }}
      />
      <div className="flex items-center justify-between mt-2 opacity-75 text-xs">
        <span className="mr-4">{message.sender}</span>
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll a cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messageSound && notifications) {
      messageSoundRef.current.play().catch(() => {});
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao carregar mensagens");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          sender: currentUser,
        }),
      });

      if (!response.ok) throw new Error("Erro ao enviar mensagem");

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const clearChat = () => {
    if (window.confirm("Tem certeza que deseja limpar o chat?")) {
      setMessages([]);
    }
  };

  const downloadChat = () => {
    const chatText = messages
      .map(
        (m) =>
          `${m.sender} (${new Date(m.timestamp).toLocaleString()}): ${
            m.content
          }`
      )
      .join("\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-history.txt";
    a.click();
  };

  const handleColorChange = (user, color) => {
    setUserColors((prev) => ({
      ...prev,
      [user]: color,
    }));
  };

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prev) => prev + event.emoji);
  };

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => setIsTyping(false), 1000);
  };

  const formatText = (text) => {
    let formattedText = text;
    if (textFormat.bold) formattedText = `**${formattedText}**`;
    if (textFormat.italic) formattedText = `_${formattedText}_`;
    if (textFormat.underline) formattedText = `__${formattedText}__`;
    return formattedText;
  };

  const processMessageText = (text) => {
    // Text formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
    text = text.replace(/_(.*?)_/g, '<span class="italic">$1</span>');
    text = text.replace(/__(.*?)__/g, '<span class="underline">$1</span>');

    // Normal links
    text = text.replace(
      /(?<!!)(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline break-all">$1</a>'
    );

    return text;
  };

  return (
    <div
      className={`pt-44 px-4 min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`flex flex-col h-[600px] max-w-2xl mx-auto rounded-xl overflow-hidden
        ${
          isDarkMode
            ? "bg-gray-800/90 backdrop-blur-md border border-gray-700"
            : "bg-white shadow-xl"
        }`}
      >
        {/* Header with Settings */}
        <div
          className={`p-4 ${
            isDarkMode
              ? "bg-gray-800/50"
              : "bg-gradient-to-r from-pink-500 to-purple-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Chat</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setNotifications(!notifications)}
                className="text-white"
              >
                {notifications ? <FaBell /> : <FaBellSlash />}
              </button>
              <button
                onClick={() => setMessageSound(!messageSound)}
                className="text-white"
              >
                <FaVolumeUp className={!messageSound ? "opacity-50" : ""} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white"
              >
                <FaCog
                  className={`transition-transform ${
                    showSettings ? "rotate-180" : ""
                  }`}
                />
              </button>
              <select
                value={currentUser}
                onChange={(e) => setCurrentUser(e.target.value)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-white/90 text-gray-800"
                } border-0`}
              >
                <option value="Tiago">Tiago</option>
                <option value="Kamilly">Kamilly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className={`p-4 ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
            } border-b border-gray-700`}
          >
            {/* Color Settings */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Estilo da Mensagem
                </span>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="w-8 h-8 rounded-full shadow-md"
                      style={{
                        backgroundColor: messageColors[currentUser].background,
                      }}
                    />
                    {showColorPicker && (
                      <div className="absolute z-50 mt-2">
                        <HexColorPicker
                          color={messageColors[currentUser].background}
                          onChange={(color) =>
                            updateUserColors(currentUser, "background", color)
                          }
                        />
                      </div>
                    )}
                  </div>
                  {gradientPresets.map((gradient) => (
                    <button
                      key={gradient.name}
                      onClick={() =>
                        updateUserColors(
                          currentUser,
                          "gradient",
                          gradient.value
                        )
                      }
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient.value} shadow-md
                        hover:scale-110 transition-transform`}
                      title={gradient.name}
                    />
                  ))}
                </div>
              </div>

              {/* Text Formatting */}
              <div className="flex flex-col gap-2">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Formatação
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setTextFormat((prev) => ({ ...prev, bold: !prev.bold }))
                    }
                    className={`p-2 rounded ${
                      textFormat.bold ? "bg-purple-500 text-white" : ""
                    }`}
                  >
                    <FaBold />
                  </button>
                  <button
                    onClick={() =>
                      setTextFormat((prev) => ({
                        ...prev,
                        italic: !prev.italic,
                      }))
                    }
                    className={`p-2 rounded ${
                      textFormat.italic ? "bg-purple-500 text-white" : ""
                    }`}
                  >
                    <FaItalic />
                  </button>
                  <button
                    onClick={() =>
                      setTextFormat((prev) => ({
                        ...prev,
                        underline: !prev.underline,
                      }))
                    }
                    className={`p-2 rounded ${
                      textFormat.underline ? "bg-purple-500 text-white" : ""
                    }`}
                  >
                    <FaUnderline />
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-2">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tamanho do Texto
                </span>
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={parseInt(fontSize)}
                  onChange={(e) => setFontSize(`${e.target.value}px`)}
                  className="w-32"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                  <FaEraser /> Limpar
                </button>
                <button
                  onClick={downloadChat}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-sm"
                >
                  <FaDownload /> Baixar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div
          className={`flex-1 overflow-y-auto p-4 space-y-6
          ${isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}
          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end space-x-2 ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <MessageBubble
                message={message}
                isCurrentUser={message.sender === currentUser}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className={`p-4 border-t ${
            isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200"
          }`}
        >
          <div className="flex gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <BsEmojiSmile />
              </button>
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              className={`flex-1 p-3 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-white placeholder-gray-500"
              } focus:ring-2 focus:ring-purple-500`}
              placeholder="Digite sua mensagem..."
            />
            <button
              type="submit"
              className={`p-3 rounded-lg transition-all duration-150
                ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-purple-400 hover:text-purple-300"
                    : "bg-gray-100 hover:bg-gray-200 text-purple-500 hover:text-purple-600"
                } 
                transform hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50`}
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-20 right-4 z-50">
              <div
                className={`p-2 rounded-lg shadow-xl ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  theme={isDarkMode ? "dark" : "light"}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatComponent;
