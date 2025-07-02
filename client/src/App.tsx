import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Score from "./pages/Score";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/score" element={<Score />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
