// client/src/pages/Score.tsx
import { useAnagrams } from "../lib/stores/useAnagrams";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const { players, resetGame } = useAnagrams();
  const navigate = useNavigate();

  const winner = players?.[0]?.score > players?.[1]?.score ? players[0] : players[1];

  const handleRestart = () => {
    resetGame();
    navigate("/"); // go back to main game
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F2E2B1' }}>
      <div className="p-6 bg-white rounded-xl shadow-md text-center max-w-sm">
        <h2 className="text-2xl font-bold mb-4">🎉 Game Over 🎉</h2>
        <p className="mb-2 text-lg">
          <strong>{winner.name}</strong> wins with <strong>{winner.score}</strong> points!
        </p>

        <div className="my-4 text-left text-sm">
          <h3 className="font-semibold mb-2">Final Scores:</h3>
          {players.map((player) => (
            <p key={player.name}>
              {player.name}: {player.score}
            </p>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
