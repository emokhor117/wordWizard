// Generate a random set of 6 letters for the anagram game
export function generateLetters(): string[] {
  // Predefined sets of 6 letters that can form multiple words
  const letterSets = [
    ['s', 't', 'a', 'r', 'e', 'd'], // stare, red, are, star, east, etc.
    ['h', 'o', 'u', 's', 'e', 'd'], // house, shed, use, hose, etc.
    ['p', 'l', 'a', 'n', 't', 's'], // plant, pant, tan, lap, etc.
    ['w', 'a', 't', 'e', 'r', 's'], // water, tear, are, rat, etc.
    ['g', 'r', 'e', 'a', 't', 's'], // great, tear, are, tag, etc.
    ['c', 'h', 'a', 'i', 'r', 's'], // chair, rich, air, car, etc.
    ['t', 'h', 'r', 'e', 'a', 'd'], // thread, read, are, red, etc.
    ['b', 'r', 'e', 'a', 'd', 's'], // bread, read, are, red, etc.
    ['m', 'a', 'r', 'k', 'e', 't'], // market, tear, make, etc.
    ['s', 'i', 'l', 'v', 'e', 'r'], // silver, liver, vile, etc.
    ['f', 'r', 'i', 'e', 'n', 'd'], // friend, fire, find, etc.
    ['g', 'a', 'r', 'd', 'e', 'n'], // garden, grade, grand, etc.
    ['f', 'l', 'o', 'w', 'e', 'r'], // flower, flow, low, etc.
    ['s', 'p', 'r', 'i', 'n', 'g'], // spring, ring, spin, etc.
    ['w', 'i', 'n', 't', 'e', 'r'], // winter, write, tire, etc.
    ['s', 'u', 'm', 'm', 'e', 'r'], // summer, sure, rum, etc.
  ];
  
  // Pick a random set and thoroughly shuffle it
  const randomIndex = Math.floor(Math.random() * letterSets.length);
  let selectedSet = [...letterSets[randomIndex]];
  
  // Shuffle multiple times to ensure good scrambling
  for (let i = 0; i < 5; i++) {
    // Fisher-Yates shuffle inline
    for (let j = selectedSet.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [selectedSet[j], selectedSet[k]] = [selectedSet[k], selectedSet[j]];
    }
  }
  
  return selectedSet;
}

// Calculate score based on word length
export function calculateWordScore(word: string): number {
  const length = word.length;
  
  switch (length) {
    case 3:
      return 100;
    case 4:
      return 350;
    case 5:
      return 400;
    case 6:
      return 500;
    default:
      // For words longer than 6 letters, give bonus points
      return 500 + (length - 6) * 100;
  }
}

// Shuffle an array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Check if a word can be formed from available letters
export function canFormWord(word: string, availableLetters: string[]): boolean {
  const letterCount: { [key: string]: number } = {};
  
  // Count available letters
  availableLetters.forEach(letter => {
    letterCount[letter.toLowerCase()] = (letterCount[letter.toLowerCase()] || 0) + 1;
  });
  
  // Check if word can be formed
  for (const letter of word.toLowerCase()) {
    if (!letterCount[letter] || letterCount[letter] === 0) {
      return false;
    }
    letterCount[letter]--;
  }
  
  return true;
}

// Format time in MM:SS format
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Generate a predetermined set of letters that can form many words
export function generateBalancedLetters(): string[] {
  // This set is designed to allow for many common English words
  return ['t', 'h', 'e', 'r', 'a', 'i', 'n', 's', 'o', 'l', 'd', 'c', 'u', 'm', 'g', 'f'];
}
