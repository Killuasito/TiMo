import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const style = document.createElement("style");
    style.textContent = `
      * {
        transition-property: background-color, border-color, color, fill, stroke, opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 500ms;
      }

      /* Transições específicas para backgrounds */
      body, main, div, section, article, nav {
        transition: background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 1000ms cubic-bezier(0.4, 0, 0.2, 1),
                    backdrop-filter 1000ms cubic-bezier(0.4, 0, 0.2, 1);
        background-position: center;
        background-size: 200% 200%;
      }

      /* Transições para gradientes */
      .bg-gradient-to-br,
      .bg-gradient-to-b,
      .bg-gradient-to-r {
        transition: opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1);
        animation: gradientTransition 1000ms ease;
      }

      /* Transições para texto e elementos de UI */
      p, h1, h2, h3, h4, h5, h6, span, a, button {
        transition: color 800ms cubic-bezier(0.4, 0, 0.2, 1),
                    background-color 800ms cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 800ms cubic-bezier(0.4, 0, 0.2, 1),
                    transform 800ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Transições para cards e containers */
      .card, .container, .modal {
        transition: background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow 1000ms cubic-bezier(0.4, 0, 0.2, 1),
                    transform 1000ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Overlay de transição suave */
      .dark body::before,
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        transition: background-color 1000ms cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
      }

      .dark body::before {
        background-color: rgba(0, 0, 0, 0.2);
      }

      body::before {
        background-color: rgba(255, 255, 255, 0);
      }

      @keyframes gradientTransition {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;

    document.head.appendChild(style);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
