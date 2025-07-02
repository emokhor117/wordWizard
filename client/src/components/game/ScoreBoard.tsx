import { useAnagrams } from "../../lib/stores/useAnagrams";
import { Card, CardContent } from "../ui/card";

export default function ScoreBoard() {
  const { players } = useAnagrams();

  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player, index) => (
        <Card key={index} className="ios-card transform transition-all duration-300 hover:scale-105">
          <CardContent className="pt-6 text-center">
            <div className="mb-3">
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-lg mb-2"
                style={{
                  background: index === 0 
                    ? 'linear-gradient(135deg, #AEC8A4, #8A784E)' 
                    : 'linear-gradient(135deg, #8A784E, #AEC8A4)',
                  color: '#F2E2B1'
                }}
              >
                {player.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: '#3B3B1A' }}>
                {player.name}
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black" style={{ color: '#8A784E' }}>
                {player.score}
              </p>
              <p className="text-xs font-medium" style={{ color: '#3B3B1A', opacity: 0.7 }}>
                {player.wordsFound.length} words found
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
