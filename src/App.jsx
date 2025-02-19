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

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
