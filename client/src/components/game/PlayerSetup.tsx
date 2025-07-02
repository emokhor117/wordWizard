import { useState } from "react";
import { useAnagrams } from "../../lib/stores/useAnagrams";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PlayerSetup() {
  const { gamePhase, setPlayer1Name, setPlayer2Name, startPlayer1Game, startPlayer2Game } = useAnagrams();
  const [playerName, setPlayerName] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const isPlayer1Setup = gamePhase === "player1Setup";
  const isPlayer2Setup = gamePhase === "player2Setup";

  const handleStartGame = async () => {
    if (!playerName.trim()) {
      return;
    }

    setIsStarting(true);
    
    if (isPlayer1Setup) {
      // Set player 1 name and start their game
      setPlayer1Name(playerName.trim());
      setTimeout(() => {
        startPlayer1Game();
        setIsStarting(false);
      }, 500);
    } else if (isPlayer2Setup) {
      // Set player 2 name and start their game
      setPlayer2Name(playerName.trim());
      setTimeout(() => {
        startPlayer2Game();
        setIsStarting(false);
      }, 500);
    }
  };

  const isFormValid = playerName.trim().length > 0;

  return (
    <div className="space-y-6">
      <Card className="ios-card">
        <CardHeader>
          <CardTitle className="text-center" style={{ 
            color: '#3B3B1A',
            fontFamily: 'Poppins',
            fontWeight: '700',
            fontSize: '1.5rem',
            letterSpacing: '-0.01em'
          }}>
            {isPlayer1Setup ? "Player 1 Setup" : "Player 2 Setup"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium mb-2" style={{ 
              color: '#3B3B1A',
              fontFamily: 'Poppins',
              fontWeight: '500'
            }}>
              {isPlayer1Setup ? "Player 1 Name" : "Player 2 Name"}
            </label>
            <Input
              id="playerName"
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="ios-input"
              maxLength={20}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="ios-card">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold" style={{ 
              color: '#3B3B1A',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>Game Rules</h3>
            <div className="text-sm space-y-2" style={{ 
              color: '#8A784E',
              fontFamily: 'Poppins',
              fontWeight: '400',
              lineHeight: '1.6'
            }}>
              <p>• Each player has 60 seconds per turn</p>
              <p>• Find words using 6 letter tiles</p>
              <p>• Scoring: 3-letter (100pts), 4-letter (350pts), 5-letter (400pts), 6-letter (500pts)</p>
              <p>• Highest total score wins!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleStartGame}
        disabled={!isFormValid || isStarting}
        className="w-full ios-button-primary"
      >
        {isStarting ? "Starting Game..." : isPlayer1Setup ? "Start Player 1" : "Start Player 2"}
      </Button>
    </div>
  );
}
