import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiTimer } from "react-icons/bi";
import {
  FaQuestionCircle,
  FaHeart,
  FaBars,
  FaTimes,
  FaMusic,
  FaStar,
  FaLock,
} from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      path: "/timer",
      label: "Contador",
      icon: BiTimer,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      path: "/quiz",
      label: "Quiz",
      icon: FaQuestionCircle,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      path: "/gallery",
      label: "Galeria",
      icon: IoMdImages,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      path: "/memories",
      label: "Memórias",
      icon: FaHeart,
      gradient: "from-rose-500 to-pink-500",
    },
    {
      path: "/music",
      label: "Músicas",
      icon: FaMusic,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      path: "/wishlist", // Verifique se este path está exatamente igual ao da rota
      label: "Desejos",
      icon: FaStar,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      path: "/login",
      label: "Área Secreta",
      icon: FaLock,
      gradient: "from-gray-500 to-gray-700",
    },
  ];

  const renderIcon = (Icon) => (
    <Icon className="text-lg" style={{ strokeWidth: "0.5px" }} />
  );

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="group relative flex items-center space-x-2 text-2xl font-black"
              aria-label="Home"
            >
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[size:400%] hover:bg-[size:200%] animate-gradient"
              >
                Nossa História
              </motion.span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative px-4 py-2 font-medium transition-all duration-300`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon
                      className={`text-lg transition-colors duration-300 ${
                        isActive(item.path)
                          ? "text-pink-600"
                          : "text-gray-600 group-hover:text-pink-600"
                      }`}
                    />
                    <span
                      className={`relative ${
                        isActive(item.path)
                          ? "text-pink-600"
                          : "text-gray-600 group-hover:text-pink-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>

                  {/* Hover and Active Effects */}
                  <div className="absolute inset-0 w-full h-full">
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        isActive(item.path) ? "bg-pink-50/80" : "bg-pink-50/50"
                      }`}
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${item.gradient}`}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-pink-50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-pink-600" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 overflow-hidden bg-white"
            >
              <div className="container mx-auto px-4 py-3 space-y-1">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? "bg-pink-50 text-pink-600"
                          : "hover:bg-gray-50 text-gray-600 hover:text-pink-600"
                      }`}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
