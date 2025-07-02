import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { generateLetters, calculateWordScore } from "../gameUtils";
import { validateWord } from "../wordValidator";

export type GamePhase = "setup" | "player1Setup" | "player1Playing" | "player2Setup" | "player2Playing" | "finished";

export interface FoundWord {
  word: string;
  points: number;
  usedIndices?: number[];
}

export interface Player {
  name: string;
  score: number;
  wordsFound: FoundWord[];
}

interface AnagramsState {
  // Game state
  gamePhase: GamePhase;
  currentPlayer: number;
  players: Player[];
  
  // Round state
  letters: string[];
  selectedLetters: number[];
  currentWord: string;
  foundWords: FoundWord[];
  timeRemaining: number;
  timerInterval: NodeJS.Timeout | null;
  
  // Actions
  initializeGame: () => void;
  setPlayer1Name: (playerName: string) => void;
  setPlayer2Name: (playerName: string) => void;
  startPlayer1Game: () => void;
  startPlayer2Game: () => void;
  selectLetter: (index: number) => void;
  submitWord: () => void;
  clearWord: () => void;
  endTurn: () => void;
  resetGame: () => void;
  
  // Internal methods
  startTimer: () => void;
  stopTimer: () => void;
  switchToPlayer2: () => void;
  endGame: () => void;
}

export const useAnagrams = create<AnagramsState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    gamePhase: "setup",
    currentPlayer: 0,
    players: [],
    letters: [],
    selectedLetters: [],
    currentWord: "",
    foundWords: [],
    timeRemaining: 60,
    timerInterval: null,

    initializeGame: () => {
      set({
        gamePhase: "player1Setup",
        currentPlayer: 0,
        players: [],
        letters: [],
        selectedLetters: [],
        currentWord: "",
        foundWords: [],
        timeRemaining: 60,
        timerInterval: null,
      });
    },

    setPlayer1Name: (playerName: string) => {
      set({
        players: [
          { name: playerName, score: 0, wordsFound: [] }
        ],
      });
    },

    setPlayer2Name: (playerName: string) => {
      const { players } = get();
      set({
        players: [
          ...players,
          { name: playerName, score: 0, wordsFound: [] }
        ],
      });
    },

    startPlayer1Game: () => {
      const letters = generateLetters();
      set({
        gamePhase: "player1Playing",
        letters,
        currentPlayer: 0,
        timeRemaining: 60,
        foundWords: [],
        selectedLetters: [],
        currentWord: "",
      });
      get().startTimer();
    },

    startPlayer2Game: () => {
      set({
        gamePhase: "player2Playing",
        currentPlayer: 1,
        timeRemaining: 60,
        foundWords: [],
        selectedLetters: [],
        currentWord: "",
      });
      get().startTimer();
    },

    selectLetter: (index: number) => {
      const { selectedLetters, letters } = get();
      
      // Toggle selection
      const isSelected = selectedLetters.includes(index);
      let newSelectedLetters: number[];
      
      if (isSelected) {
        // Remove from selection
        newSelectedLetters = selectedLetters.filter(i => i !== index);
      } else {
        // Add to selection
        newSelectedLetters = [...selectedLetters, index];
      }
      
      // Build current word from selected letters
      const currentWord = newSelectedLetters
        .map(i => letters[i])
        .join('');
      
      set({
        selectedLetters: newSelectedLetters,
        currentWord,
      });
    },

    submitWord: async () => {
      const { currentWord, selectedLetters, foundWords, players, currentPlayer } = get();
      
      if (currentWord.length < 3) return;
      
      // Check if word was already found
      if (foundWords.some(word => word.word.toLowerCase() === currentWord.toLowerCase())) {
        // Word already found, just clear selection
        get().clearWord();
        return;
      }
      
      // Validate word
      const isValid = await validateWord(currentWord);
      
      if (isValid) {
        const points = calculateWordScore(currentWord);
        const newFoundWord: FoundWord = {
          word: currentWord,
          points,
          usedIndices: [...selectedLetters],
        };
        
        // Update found words
        const newFoundWords = [...foundWords, newFoundWord];
        
        // Update current player's score and words
        const updatedPlayers = players.map((player, index) => {
          if (index === currentPlayer) {
            return {
              ...player,
              score: player.score + points,
              wordsFound: [...player.wordsFound, newFoundWord],
            };
          }
          return player;
        });
        
        set({
          foundWords: newFoundWords,
          players: updatedPlayers,
          selectedLetters: [],
          currentWord: "",
        });
      } else {
        // Invalid word, just clear selection
        get().clearWord();
      }
    },

    clearWord: () => {
      set({
        selectedLetters: [],
        currentWord: "",
      });
    },

    endTurn: () => {
      get().stopTimer();
      
      // Check if both players have played
      const { currentPlayer, gamePhase } = get();
      if (gamePhase === "player1Playing") {
        // Switch to player 2 setup
        get().switchToPlayer2();
      } else if (gamePhase === "player2Playing") {
        // Game is finished
        get().endGame();
      }
    },

    switchToPlayer2: () => {
      set({
        gamePhase: "player2Setup",
        selectedLetters: [],
        currentWord: "",
        foundWords: [], // Reset found words for new player
      });
    },

    startTimer: () => {
      const { timerInterval } = get();
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      
      const interval = setInterval(() => {
        const { timeRemaining } = get();
        if (timeRemaining <= 1) {
          get().endTurn();
        } else {
          set({ timeRemaining: timeRemaining - 1 });
        }
      }, 1000);
      
      set({ timerInterval: interval });
    },

    stopTimer: () => {
      const { timerInterval } = get();
      if (timerInterval) {
        clearInterval(timerInterval);
        set({ timerInterval: null });
      }
    },

    endGame: () => {
      get().stopTimer();
      set({ gamePhase: "finished" });
    },

    resetGame: () => {
      get().stopTimer();
      get().initializeGame();
    },
  }))
);
