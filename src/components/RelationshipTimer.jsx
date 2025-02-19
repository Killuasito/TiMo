import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaCalendarAlt } from "react-icons/fa";

function RelationshipTimer() {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Data inicial do relacionamento: 27 de abril de 2024
  const startDate = new Date("2024-04-27T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 365)) /
          (1000 * 60 * 60 * 24 * 30.44)
      );
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const timeBlocks = [
    {
      value: time.years,
      label: "Anos",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      value: time.months,
      label: "Meses",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      value: time.days,
      label: "Dias",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      value: time.hours,
      label: "Horas",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      value: time.minutes,
      label: "Minutos",
      gradient: "from-cyan-500 to-teal-600",
    },
    {
      value: time.seconds,
      label: "Segundos",
      gradient: "from-teal-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b  pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Nosso Tempo Juntos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Cada segundo ao seu lado é uma nova história sendo escrita em
              nosso livro de amor.
            </motion.p>
          </div>

          {/* Timer Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 max-w-6xl w-full mb-8 md:mb-12"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {timeBlocks.map((block, index) => (
              <motion.div
                key={block.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="relative group"
              >
                <div
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 text-center transform group-hover:-translate-y-1`}
                >
                  <div
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${block.gradient} bg-clip-text text-transparent`}
                  >
                    {block.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium mt-1 md:mt-2">
                    {block.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Start Date Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600" />
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FaCalendarAlt className="text-2xl text-pink-600" />
              <h3 className="text-xl font-bold text-gray-800">
                Nossa História Começou
              </h3>
            </div>
            <p className="text-lg text-gray-600">
              Em{" "}
              <span className="font-semibold text-pink-600">
                {formatDate(startDate)}
              </span>
            </p>
            <div className="mt-4 flex justify-center">
              <FaHeart className="text-pink-500 animate-pulse text-2xl" />
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RelationshipTimer;
