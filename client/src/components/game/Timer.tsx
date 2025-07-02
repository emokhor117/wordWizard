import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface TimerProps {
  timeRemaining: number;
}

export default function Timer({ timeRemaining }: TimerProps) {
  const [isLowTime, setIsLowTime] = useState(false);

  useEffect(() => {
    setIsLowTime(timeRemaining <= 10);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div 
        className="relative px-4 py-2 rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: isLowTime ? 'rgba(138, 120, 78, 0.2)' : 'rgba(174, 200, 164, 0.3)',
          border: `2px solid ${isLowTime ? '#8A784E' : '#AEC8A4'}`
        }}
      >
        <div 
          className={cn(
            "text-2xl font-black tabular-nums transition-all duration-300",
            isLowTime ? "pulse-red" : ""
          )}
          style={{ color: '#3B3B1A' }}
        >
          {formatTime(timeRemaining)}
        </div>
        {isLowTime && (
          <div 
            className="absolute -inset-1 rounded-2xl -z-10 animate-pulse"
            style={{ backgroundColor: 'rgba(138, 120, 78, 0.1)' }}
          />
        )}
      </div>
      <div 
        className={cn(
          "w-3 h-3 rounded-full transition-all duration-300",
          isLowTime ? "animate-pulse" : ""
        )}
        style={{ backgroundColor: isLowTime ? '#8A784E' : '#AEC8A4' }}
      />
    </div>
  );
}
