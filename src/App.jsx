import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RelationshipTimer from "./components/RelationshipTimer";
import Quiz from "./components/Quiz";
import Gallery from "./components/Gallery";
import MemoriesWall from "./components/MemoriesWall";
import MusicPlayer from "./components/MusicPlayer";
import Wishlist from "./components/Wishlist";
import Login from "./components/Login";
import SecretLetter from "./components/SecretLetter";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import ChatComponent from "./components/ChatComponent";
import PetWrapper from "./components/PetWrapper";
import { useEffect } from "react";
import SpotifyCallback from "./components/SpotifyCallback";

function App() {
  useEffect(() => {
    // Check if we're on the callback route and have a hash
    if (
      window.location.pathname === "/spotify-callback" &&
      window.location.hash
    ) {
      const token = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        localStorage.setItem("spotify_token", token);
        // Use window.location.replace instead of Navigate
        window.location.replace("/music");
      }
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="transition-all duration-500 ease-in-out">
          <Navbar />
          <main className="relative z-10 min-h-screen transition-all duration-500 ease-in-out bg-gradient-to-br from-pink-100 to-purple-200 dark:from-gray-800 dark:to-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timer" element={<RelationshipTimer />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/memories" element={<MemoriesWall />} />
              <Route path="/music" element={<MusicPlayer />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/secret"
                element={
                  <ProtectedRoute>
                    <SecretLetter />
                  </ProtectedRoute>
                }
              />
              <Route path="/chat" element={<ChatComponent />} />
              <Route
                path="/pet"
                element={
                  <div className="container mx-auto px-4 pt-24">
                    <PetWrapper />
                  </div>
                }
              />
              <Route path="/spotify-callback" element={<SpotifyCallback />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <PetWrapper />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
