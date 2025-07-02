import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { X, Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface WordDisplayProps {
  currentWord: string;
  onSubmit: () => void;
  onClear: () => void;
}

export default function WordDisplay({
  currentWord,
  onSubmit,
  onClear
}: WordDisplayProps) {
  const hasWord = currentWord.length > 0;
  const canSubmit = currentWord.length >= 3;

  return (
    <Card className="ios-card">
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#3B3B1A' }}>
            Current Word
          </h3>
          <div 
            className="rounded-2xl p-4 min-h-[4rem] flex items-center justify-center border-2"
            style={{
              backgroundColor: 'rgba(174, 200, 164, 0.2)',
              borderColor: '#AEC8A4'
            }}
          >
            <div className="text-3xl font-black tracking-wider" style={{ color: '#3B3B1A' }}>
              {currentWord.toUpperCase() || (
                <span className="text-lg font-medium" style={{ color: '#8A784E', opacity: 0.7 }}>
                  Select letters to form a word
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          {hasWord && (
            <Button
              onClick={onClear}
              size="sm"
              className="ios-button-secondary"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            size="sm"
            className={cn(
              "rounded-xl px-6 py-2 font-semibold transition-all duration-200",
              canSubmit 
                ? "ios-button-primary" 
                : ""
            )}
            style={!canSubmit ? { 
              backgroundColor: 'rgba(138, 120, 78, 0.2)', 
              color: '#8A784E', 
              cursor: 'not-allowed' 
            } : {}}
          >
            <Check className="h-4 w-4 mr-1" />
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
