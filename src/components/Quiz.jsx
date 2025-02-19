import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaCheck, FaTimes, FaRedo } from "react-icons/fa";

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);

    setTimeout(() => {
      if (selectedOption === questions[currentQuestion].correct) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);
      setIsAnswered(false);

      if (currentQuestion + 1 < questions.length) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quiz do Amor
          </h1>
          <p className="text-gray-600 text-lg">
            Teste seus conhecimentos sobre nossa história
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-medium text-gray-500">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                  Pontuação: {score}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !isAnswered && handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-xl transition-all duration-300 flex items-center group relative overflow-hidden
                      ${
                        isAnswered
                          ? index === questions[currentQuestion].correct
                            ? "bg-green-50 text-green-700"
                            : index === selectedAnswer
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-50 text-gray-500"
                          : "bg-white hover:bg-pink-50 text-gray-700 hover:text-pink-600"
                      }
                      border-2
                      ${
                        isAnswered
                          ? index === questions[currentQuestion].correct
                            ? "border-green-200"
                            : index === selectedAnswer
                            ? "border-red-200"
                            : "border-gray-100"
                          : "border-gray-100 hover:border-pink-200"
                      }
                    `}
                  >
                    <span className="relative z-10 flex-1">{option}</span>
                    {isAnswered && (
                      <span className="relative z-10">
                        {index === questions[currentQuestion].correct ? (
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
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="mb-8">
                <FaHeart className="text-6xl text-pink-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Resultado Final
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  Você acertou {score} de {questions.length} perguntas!
                </p>
                <div className="w-full h-4 bg-gray-100 rounded-full mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${(score / questions.length) * 100}%` }}
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
    </div>
  );
}

export default Quiz;
