import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaCheck, FaTimes, FaRedo, FaPlus } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import CreateQuizForm from "./CreateQuizForm";

const questions = [
  {
    question: "Qual foi a data do nosso primeiro encontro?",
    options: ["17 de Abril", "27 de Abril", "29 de Abril", "30 de Abril"],
    correct: 0,
  },
  {
    question: "Qual é a minha comida favorita?",
    options: ["Pizza", "Hambúrguer", "Japonesa", "Churrasco"],
    correct: 1,
  },
  {
    question: "Onde foi nosso primeiro beijo?",
    options: ["No cinema", "No quintal", "Na praia", "No shopping"],
    correct: 1,
  },
  {
    question: "Qual é a minha cor favorita?",
    options: ["Azul", "Verde", "Rosa", "Vermelho"],
    correct: 0,
  },
  {
    question: "Qual é o meu filme favorito?",
    options: ["Titanic", "Batalha dos Vegetais", "Ratatouille", "Carros"],
    correct: 2,
  },
  {
    question: "Qual é o meu doce preferido?",
    options: ["Chocolate", "Sorvete", "Brigadeiro", "Paçoca"],
    correct: 3,
  },
  {
    question: "Qual é a minha música favorita?",
    options: [
      "Perfect",
      "All of Me",
      "Thinking Out Loud",
      "Say You Won't Let Go",
    ],
    correct: 1,
  },
  {
    question: "Qual é meu lugar favorito para passear?",
    options: ["Shopping", "Praia", "Parque", "Cinema"],
    correct: 1,
  },
  {
    question: "O que mais me emociona?",
    options: ["Filmes românticos", "Música", "Surpresas", "Presentes"],
    correct: 3,
  },
  {
    question: "Qual é minha estação do ano favorita?",
    options: ["Verão", "Outono", "Inverno", "Primavera"],
    correct: 3,
  },
  {
    question: "Qual é meu hobby favorito?",
    options: ["Ler", "Cozinhar", "Jogar", "Praticar Esportes"],
    correct: 2,
  },
  {
    question: "Qual é minha sobremesa favorita?",
    options: ["Mousse", "Torta", "Bolo", "Sorvete"],
    correct: 1,
  },
  {
    question: "O que eu mais gosto de fazer no fim de semana?",
    options: [
      "Dormir",
      "Sair para comer",
      "Assistir séries",
      "Passear no parque",
    ],
    correct: 2,
  },
  {
    question: "Qual é meu tipo de roupa favorito?",
    options: ["Vestido", "Calça jeans", "Pijama", "Moletom"],
    correct: 2,
  },
  {
    question: "Qual é minha bebida favorita?",
    options: ["Café", "Suco", "Refrigerante", "Água"],
    correct: 0,
  },
  {
    question: "O que me faz rir mais?",
    options: ["Piadas ruins", "Memes", "Cócegas", "Vídeos engraçados"],
    correct: 0,
  },
  {
    question: "Qual é meu animal favorito?",
    options: ["Cachorro", "Gato", "Coelho", "Pássaro"],
    correct: 0,
  },
  {
    question: "Qual é minha série favorita?",
    options: ["Friends", "Grey's Anatomy", "The Office", "Breaking Bad"],
    correct: 2,
  },
  {
    question: "O que eu mais gosto de ganhar de presente?",
    options: ["Roupas", "Chocolates", "Presentes a mão", "Perfumes"],
    correct: 2,
  },
  {
    question: "Qual é meu sonho para o futuro?",
    options: [
      "Viajar o mundo",
      "Ter uma família",
      "Ser bem sucedida",
      "Morar na praia",
    ],
    correct: 1,
  },
];

function Quiz() {
  const { isDarkMode } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customQuestions, setCustomQuestions] = useState(() => {
    const saved = localStorage.getItem("customQuestions");
    return saved ? JSON.parse(saved) : [];
  });

  const [quizzes, setQuizzes] = useState([
    { id: "default", title: "Quiz do Amor", questions },
  ]);
  const [selectedQuizId, setSelectedQuizId] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quizzes`
        );
        if (!response.ok) throw new Error("Erro ao carregar quizzes");
        const data = await response.json();
        setQuizzes((prev) => [prev[0], ...data]); // Mantém o quiz padrão e adiciona os do servidor
      } catch (error) {
        console.warn("Usando apenas quiz local devido a erro:", error);
        // Mantem apenas o quiz padrão em caso de erro
        setQuizzes((prev) => [prev[0]]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes().catch(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("customQuestions", JSON.stringify(customQuestions));
  }, [customQuestions]);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    setTimeout(() => {
      if (selectedOption === allQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);
      setIsAnswered(false);

      if (currentQuestion + 1 < allQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAddQuestion = (newQuestion) => {
    setCustomQuestions((prev) => [...prev, newQuestion]);
  };

  const handleAddQuiz = async (newQuiz) => {
    try {
      if (
        !newQuiz.title ||
        !newQuiz.questions ||
        newQuiz.questions.length === 0
      ) {
        throw new Error("Dados do quiz incompletos");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quizzes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newQuiz),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao salvar quiz no servidor");
      }

      const savedQuiz = await response.json();
      setQuizzes((prev) => [...prev, savedQuiz]);
      setShowAddForm(false);
      setSelectedQuizId(savedQuiz._id);
      resetQuiz();
      alert("Quiz criado com sucesso!");
    } catch (error) {
      console.error("Erro ao processar quiz:", error);
      alert(`Erro ao salvar quiz: ${error.message}`);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!quizId || quizId === "default") {
      alert("Não é possível excluir o quiz padrão");
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(quizId)) {
      alert("ID inválido: Este quiz não pode ser excluído");
      return;
    }

    if (!window.confirm("Tem certeza que deseja excluir este quiz?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quizzes/${quizId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao deletar quiz do servidor"
        );
      }

      const result = await response.json();
      setQuizzes((prev) =>
        prev.filter((quiz) => quiz._id !== quizId && quiz.id !== quizId)
      );

      if (selectedQuizId === quizId) {
        setSelectedQuizId("default");
        resetQuiz();
      }

      alert("Quiz excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar quiz:", error);
      alert(`Erro ao excluir quiz: ${error.message}`);
    }
  };

  const currentQuiz =
    quizzes.find((quiz) => quiz.id === selectedQuizId) || quizzes[0];
  const allQuestions = currentQuiz.questions;

  return (
    <div
      className={`min-h-screen pt-20 pb-12 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 pt-24">
        {/* Adicionar seletor de quiz */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-4">
            <h1
              className={`text-3xl md:text-5xl font-bold ${
                isDarkMode
                  ? "text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text"
                  : "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              {currentQuiz.title}
            </h1>

            <select
              value={selectedQuizId}
              onChange={(e) => {
                setSelectedQuizId(e.target.value);
                resetQuiz();
              }}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-white border-gray-200"
              } border`}
            >
              {quizzes.map((quiz) => {
                const uniqueKey = quiz._id || quiz.id;
                return (
                  <option key={uniqueKey} value={quiz._id || quiz.id}>
                    {quiz.title} {quiz.id !== "default" && "(Personalizado)"}
                  </option>
                );
              })}
            </select>

            {selectedQuizId !== "default" && (
              <button
                onClick={() => handleDeleteQuiz(selectedQuizId)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Deletar Quiz Atual
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full"
          >
            <FaPlus size={14} />
            <span>Novo Quiz</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`${
                isDarkMode
                  ? "bg-gray-800 shadow-xl shadow-black/20"
                  : "bg-white"
              } rounded-2xl shadow-xl p-8 mb-8`}
            >
              {/* Progress Bar */}
              <div
                className={`w-full h-2 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                } rounded-full mb-4 md:mb-8`}
              >
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / allQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between mb-4 md:mb-8">
                <span
                  className={`text-xs md:text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Pergunta {currentQuestion + 1} de {allQuestions.length}
                </span>
                <span
                  className={`${
                    isDarkMode
                      ? "bg-pink-900/30 text-pink-400"
                      : "bg-pink-100 text-pink-600"
                  } px-3 py-1 rounded-full text-sm font-medium`}
                >
                  Pontuação: {score}
                </span>
              </div>

              <h2
                className={`text-xl md:text-2xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-800"
                } mb-6`}
              >
                {allQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {allQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnswered && handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-3 md:p-4 text-left rounded-xl transition-all duration-300 text-sm md:text-base flex items-center group relative overflow-hidden
                      ${
                        isAnswered
                          ? index === allQuestions[currentQuestion].correct
                            ? isDarkMode
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-50 text-green-700"
                            : index === selectedAnswer
                            ? isDarkMode
                              ? "bg-red-900/30 text-red-400"
                              : "bg-red-50 text-red-700"
                            : isDarkMode
                            ? "bg-gray-700/50 text-gray-400"
                            : "bg-gray-50 text-gray-500"
                          : isDarkMode
                          ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
                          : "bg-white hover:bg-pink-50 text-gray-700 hover:text-pink-600"
                      }
                      border-2
                      ${
                        isAnswered
                          ? index === allQuestions[currentQuestion].correct
                            ? isDarkMode
                              ? "border-green-800"
                              : "border-green-200"
                            : index === selectedAnswer
                            ? isDarkMode
                              ? "border-red-800"
                              : "border-red-200"
                            : isDarkMode
                            ? "border-gray-600"
                            : "border-gray-100"
                          : isDarkMode
                          ? "border-gray-600 hover:border-gray-500"
                          : "border-gray-100 hover:border-pink-200"
                      }
                    `}
                  >
                    <span className="relative z-10 flex-1">{option}</span>
                    {isAnswered && (
                      <span className="relative z-10">
                        {index === allQuestions[currentQuestion].correct ? (
                          <FaCheck className="text-green-500" />
                        ) : index === selectedAnswer ? (
                          <FaTimes className="text-red-500" />
                        ) : null}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`${
                isDarkMode
                  ? "bg-gray-800 shadow-xl shadow-black/20"
                  : "bg-white"
              } rounded-2xl shadow-xl p-8 text-center`}
            >
              <div className="mb-8">
                <FaHeart className="text-6xl text-pink-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Resultado Final
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  Você acertou {score} de {allQuestions.length} perguntas!
                </p>
                <div className="w-full h-4 bg-gray-100 rounded-full mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${(score / allQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaRedo className="mr-2" />
                Tentar Novamente
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <CreateQuizForm
            onClose={() => setShowAddForm(false)}
            onSave={handleAddQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Quiz;
