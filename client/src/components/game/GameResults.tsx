import { useAnagrams } from "../../lib/stores/useAnagrams";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trophy, Medal, RotateCcw } from "lucide-react";

export default function GameResults() {
  const { players, resetGame } = useAnagrams();

  // Determine the winner
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isDraw = sortedPlayers[0].score === sortedPlayers[1].score;

  return (
    <div className="space-y-6">
      {/* Winner Announcement */}
      <Card className="ios-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isDraw ? (
              <Medal className="h-16 w-16 text-ios-text-secondary" />
            ) : (
              <Trophy className="h-16 w-16 text-yellow-500" />
            )}
          </div>
          <CardTitle className="text-2xl" style={{ 
            color: '#3B3B1A',
            fontFamily: 'Poppins',
            fontWeight: '700',
            letterSpacing: '-0.01em'
          }}>
            {isDraw ? "It's a Draw!" : `${winner.name} Wins!`}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Final Scores */}
      <Card className="ios-card">
        <CardHeader>
          <CardTitle className="text-center" style={{ 
            color: '#3B3B1A',
            fontFamily: 'Poppins',
            fontWeight: '600',
            fontSize: '1.25rem'
          }}>Final Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-ios-background rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {index === 0 && !isDraw ? "🥇" : index === 1 ? "🥈" : "🥉"}
                </div>
                <div>
                  <h3 className="font-semibold" style={{ 
                    color: '#3B3B1A',
                    fontFamily: 'Poppins',
                    fontWeight: '600'
                  }}>{player.name}</h3>
                  <p className="text-sm" style={{ 
                    color: '#8A784E',
                    fontFamily: 'Poppins',
                    fontWeight: '400'
                  }}>
                    {player.wordsFound.length} words found
                  </p>
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ 
                color: '#3B3B1A',
                fontFamily: 'Poppins',
                fontWeight: '700'
              }}>
                {player.score}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Words Found by Each Player */}
      {players.map((player, playerIndex) => (
        <Card key={playerIndex} className="ios-card">
          <CardHeader>
            <CardTitle className="text-lg" style={{ 
              color: '#3B3B1A',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {player.name}'s Words
            </CardTitle>
          </CardHeader>
          <CardContent>
            {player.wordsFound.length === 0 ? (
              <p className="text-center py-4" style={{ 
                color: '#8A784E',
                fontFamily: 'Poppins',
                fontWeight: '400'
              }}>
                No words found
              </p>
            ) : (
              <div className="space-y-2">
                {player.wordsFound.map((word, wordIndex) => (
                  <div
                    key={wordIndex}
                    className="flex justify-between items-center p-3 bg-ios-background rounded-lg"
                  >
                    <span className="font-medium" style={{ 
                      color: '#3B3B1A',
                      fontFamily: 'Poppins',
                      fontWeight: '500'
                    }}>
                      {word.word.toUpperCase()}
                    </span>
                    <span className="font-semibold" style={{ 
                      color: '#AEC8A4',
                      fontFamily: 'Poppins',
                      fontWeight: '600'
                    }}>
                      {word.points} pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Play Again Button */}
      <Button
        onClick={resetGame}
        className="w-full ios-button-primary"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Play Again
      </Button>
    </div>
  );
}
