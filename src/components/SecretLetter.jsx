import { motion } from "framer-motion";
import { FaHeart, FaEnvelope } from "react-icons/fa";

function SecretLetter() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-center mb-6">
            <FaEnvelope className="text-5xl text-pink-500" />
          </div>

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Carta Secreta
          </h2>

          <div className="prose prose-pink mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {" "}
              Querida Ti mo,
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              OIIIII AMORRRRRRR. <br />
              Sei que este presente era pra ser dado apenas no dia 27/04/2025.{" "}
              <br />
              Mas, nos dois temos ansiedade, então vamos lá.
            </p>

            {/* Adicione sua mensagem secreta aqui */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Há exatos 299 dias atrás começamos nossa jornada inesquecivel de
              amor. <br />
              Sei que sempre houve altos e baixos, mas com certeza mais altos do
              que baixos kkk. <br />
              Eu poderia ficar aqui falando mil e um memórias sobre nós, mas há
              literalmente uma aba nesse site em que você pode registrar isso
              para nós dois. <br />
              É inexplicavel o sentimento que sinto por você minha neném, após
              anos (19 anos), pude saber o que é amar e ser amado, e de verdade,
              bom pra karalho, tá? <br />
              Me desculpa estar meio distante ultimamente, mas a vida de adulto
              chega, e temos que nos adaptar. <br />
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

            <p className="text-gray-700 text-lg text-right mt-6">
              Com amor, Ti mo ❤️
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SecretLetter;
