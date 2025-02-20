import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function SecretLetter() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-24 pb-12 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-pink-50 via-white to-pink-50"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <FaHeart
            className={`text-5xl mx-auto mb-8 ${
              isDarkMode ? "text-pink-400" : "text-pink-500"
            } animate-pulse`}
          />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-4xl md:text-5xl font-bold mb-8 ${
              isDarkMode
                ? "bg-gradient-to-r from-pink-400 to-purple-400"
                : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Carta Secreta
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${
              isDarkMode
                ? "bg-gray-800/90 shadow-xl shadow-black/20"
                : "bg-white"
            } rounded-2xl p-8 md:p-12 shadow-xl`}
          >
            <div className="prose prose-lg mx-auto">
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Querida Ti mo,
              </p>

              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                OIIIII AMORRRRRRR. <br />
                Sei que este presente era pra ser dado apenas no dia 27/04/2025.{" "}
                <br />
                Mas, nos dois temos ansiedade, então vamos lá.
              </p>

              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Há exatos 299 dias atrás começamos nossa jornada inesquecivel de
                amor. <br />
                Sei que sempre houve altos e baixos, mas com certeza mais altos
                do que baixos kkk. <br />
                Eu poderia ficar aqui falando mil e um memórias sobre nós, mas
                há literalmente uma aba nesse site em que você pode registrar
                isso para nós dois. <br />
                É inexplicavel o sentimento que sinto por você minha neném, após
                anos (19 anos), pude saber o que é amar e ser amado, e de
                verdade, bom pra karalho, tá? <br />
                Me desculpa estar meio distante ultimamente, mas a vida de
                adulto chega, e temos que nos adaptar. <br />
                Massss, saiba, sempre estarei com você, independente de qualquer
                coisa.
                <br />
                Na saúde ou na doença, pode ter certeza... <br />
                Será sempre você minha princesa. <br />
                Eu te amo mais do que sempre me amei...
              </p>

              <div className="text-center">
                <FaHeart className="text-pink-500 text-4xl mx-auto animate-pulse" />
              </div>

              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Com amor, Ti mo ❤️
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SecretLetter;
