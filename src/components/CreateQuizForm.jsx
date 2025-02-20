import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaPlus } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function CreateQuizForm({ onClose, onSave }) {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correct: 0,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "option") {
      const [optionIndex, optionValue] = value;
      newQuestions[index].options[optionIndex] = optionValue;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação
    if (!title.trim()) {
      alert("Por favor, insira um título para o quiz");
      return;
    }

    const isValid = questions.every(
      (q) =>
        q.question.trim() &&
        q.options.every((opt) => opt.trim()) &&
        q.correct >= 0 &&
        q.correct < 4
    );

    if (!isValid) {
      alert(
        "Por favor, preencha todas as perguntas, opções e respostas corretamente"
      );
      return;
    }

    onSave({
      title,
      questions: questions.map((q) => ({
        ...q,
        question: q.question.trim(),
        options: q.options.map((opt) => opt.trim()),
      })),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
        } rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Criar Novo Quiz
          </h2>
          <button
            onClick={onClose}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className={`block mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Título do Quiz
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-200"
              } border`}
              placeholder="Digite o título do quiz"
              required
            />
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className={`p-4 rounded-lg space-y-4 ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "border"
              }`}
            >
              <div>
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Pergunta {qIndex + 1}
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  className={`w-full p-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 border-gray-500 text-gray-100"
                      : "bg-white border-gray-200"
                  } border`}
                  placeholder="Digite a pergunta"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className={`block ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Opções
                </label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "option", [
                          optIndex,
                          e.target.value,
                        ])
                      }
                      className={`flex-1 p-2 rounded-lg ${
                        isDarkMode
                          ? "bg-gray-600 border-gray-500 text-gray-100"
                          : "bg-white border-gray-200"
                      } border`}
                      placeholder={`Opção ${optIndex + 1}`}
                      required
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correct === optIndex}
                      onChange={() =>
                        handleQuestionChange(qIndex, "correct", optIndex)
                      }
                      className={`mt-3 ${
                        isDarkMode ? "accent-purple-500" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddQuestion}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FaPlus size={14} />
              Adicionar Pergunta
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg"
            >
              Salvar Quiz
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CreateQuizForm;
