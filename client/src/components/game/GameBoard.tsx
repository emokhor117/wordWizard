import { useAnagrams } from "../../lib/stores/useAnagrams";
import LetterTile from "./LetterTile";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import WordDisplay from "./WordDisplay";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function GameBoard() {
  const {
    currentPlayer,
    players,
    letters,
    selectedLetters,
    currentWord,
    timeRemaining,
    foundWords,
    submitWord,
    clearWord,
    selectLetter,
    endTurn
  } = useAnagrams();

  const currentPlayerData = players[currentPlayer];

  return (
    <div className="space-y-4">
      {/* Current Player and Timer */}
      <Card className="ios-card">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ios-text">
                {currentPlayerData?.name}'s Turn
              </h2>
              <p className="text-sm text-ios-text-secondary">
                Player {currentPlayer + 1}
              </p>
            </div>
            <Timer timeRemaining={timeRemaining} />
          </div>
        </CardContent>
      </Card>

      {/* Score Board */}
      <ScoreBoard />

      {/* Current Word Display */}
      <WordDisplay
        currentWord={currentWord}
        onSubmit={submitWord}
        onClear={clearWord}
      />

      {/* Letter Tiles */}
      <Card className="ios-card">
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {letters.map((letter, index) => (
              <LetterTile
                key={`${letter}-${index}`}
                letter={letter}
                index={index}
                isSelected={selectedLetters.includes(index)}
                isUsed={false}
                onClick={() => selectLetter(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Found Words */}
      <Card className="ios-card">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold mb-4 text-center" style={{ color: '#3B3B1A' }}>
            Found Words ({foundWords.length})
          </h3>
          {foundWords.length === 0 ? (
            <div className="text-center py-8">
              <div 
                className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(174, 200, 164, 0.3)' }}
              >
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-sm" style={{ color: '#8A784E' }}>
                No words found yet
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 justify-center">
              {foundWords.map((word, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #AEC8A4, #8A784E)',
                    color: '#F2E2B1'
                  }}
                >
                  {word.word.toUpperCase()} 
                  <span className="ml-2" style={{ opacity: 0.8 }}>
                    {word.points}pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* End Turn Button */}
      <Button
        onClick={endTurn}
        className="w-full ios-button-secondary"
      >
        End Turn
      </Button>
    </div>
  );
}
