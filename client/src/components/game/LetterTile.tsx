import { cn } from "../../lib/utils";

interface LetterTileProps {
  letter: string;
  index: number;
  isSelected: boolean;
  isUsed: boolean;
  onClick: () => void;
}

export default function LetterTile({
  letter,
  isSelected,
  isUsed,
  onClick
}: LetterTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={isUsed}
      className={cn(
        "letter-tile",
        isSelected && "letter-tile-selected",
        isUsed && "letter-tile-used"
      )}
    >
      {letter.toUpperCase()}
    </button>
  );
}
