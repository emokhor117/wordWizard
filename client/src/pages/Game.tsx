// client/src/pages/Game.tsx
import { useEffect } from "react";
import { useAnagrams } from "../lib/stores/useAnagrams";
import PlayerSetup from "../components/game/PlayerSetup";
import GameBoard from "../components/game/GameBoard";
import GameResults from "../components/game/GameResults";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";

export default function Game() {
  const { gamePhase, initializeGame } = useAnagrams();
  const navigate = useNavigate();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (gamePhase === "finished") {
      navigate("/score");
    }
  }, [gamePhase, navigate]);

  const renderGamePhase = () => {
    switch (gamePhase) {
      case "player1Setup":
      case "player2Setup":
        return <PlayerSetup />;
      case "player1Playing":
      case "player2Playing":
        return <GameBoard />;
      default:
        return <PlayerSetup />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2E2B1' }}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <header className="text-center mb-8">
          <div className="inline-block p-6 ios-card mb-4">
            <h1 className="text-4xl font-black mb-2" style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(59, 59, 26, 0.3)',
              fontFamily: 'Poppins',
              fontWeight: '800',
              letterSpacing: '-0.02em'
            }}>
              Banks&Daniel's Anagrams
            </h1>
            <p style={{ color: '#3B3B1A' }} className="text-sm font-medium">
              Form words from letter tiles
            </p>
          </div>
        </header>

        {renderGamePhase()}
      </div>
    </div>
  );
}
