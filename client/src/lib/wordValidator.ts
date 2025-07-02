// Word validation for the anagrams game
const VALID_WORDS = new Set([
  // 3-letter words
  "the", "and", "are", "you", "all", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "its", "may", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "man", "not", "but", "car", "cat", "dog", "eat", "far", "fun", "got", "hat", "let", "put", "red", "run", "sun", "top", "try", "use", "win", "yes", "big", "end", "eye", "few", "job", "lot", "off", "own", "say", "she", "sit", "too", "why", "add", "age", "ask", "bad", "bag", "bed", "box", "cup", "cut", "die", "dry", "ear", "egg", "fit", "fly", "gun", "hit", "hot", "ice", "ill", "key", "lay", "leg", "lie", "mad", "map", "mix", "net", "nor", "oil", "pay", "pop", "raw", "row", "sad", "sea", "sex", "shy", "sir", "six", "son", "tea", "ten", "tie", "tip", "toe", "war", "wet",
  // Letter set specific words
  "tar", "art", "rat", "sat", "ear", "era", "ate", "tea", "set", "net", "den", "end", "sad", "ads", "red", "ted", "eat", "eta", "tar", "art", "rat", "sat", "ear", "era", "ate", "tea", "set", "net", "den", "end", "sad", "ads", "red", "ted", "eat", "eta", "hoe", "hue", "due", "sue", "use", "she", "hen", "den", "pod", "sod", "dos", "ode", "pan", "tan", "pat", "tap", "nap", "ant", "lap", "pal", "apt", "spa", "sap", "war", "raw", "tar", "art", "rat", "sat", "ear", "era", "ate", "tea", "set", "net", "wet", "sew", "awe", "wag", "tag", "gat", "gas", "sag", "age", "get", "car", "arc", "chi", "ich", "air", "sir", "his", "ash", "has", "her", "hen", "the", "tea", "ate", "eat", "hat", "had", "bar", "bra", "bad", "dab", "bed", "red", "are", "ear", "era", "dam", "mad", "arm", "mar", "tar", "art", "rat", "age", "get", "tag", "vet", "rev", "vie", "vei", "lit", "til", "nil", "oil", "roi", "sir", "ire", "rid", "die", "din", "fin", "fir", "end", "den", "and", "rad", "ran", "ear", "are", "era", "age", "den", "end", "rag", "gap", "pag", "leg", "gel", "owl", "low", "row", "for", "ref", "few", "wef", "pig", "gip", "gin", "nig", "rig", "sir", "pin", "nip", "sin", "ins", "wit", "tin", "nit", "win", "ret", "ter", "ire", "tie", "wit", "win", "rum", "mur", "use", "sue", "sum", "mus", "rue", "ure", "rue", "ure",
  
  // 4-letter words
  "that", "with", "have", "this", "will", "been", "from", "they", "know", "want", "good", "much", "some", "time", "very", "when", "come", "here", "just", "like", "long", "make", "many", "over", "such", "take", "than", "them", "well", "work", "back", "call", "came", "each", "even", "find", "give", "hand", "high", "keep", "last", "left", "life", "live", "look", "made", "most", "move", "must", "name", "need", "next", "only", "open", "part", "play", "said", "same", "seem", "show", "side", "tell", "turn", "used", "ways", "week", "went", "were", "what", "word", "year", "your", "also", "away", "best", "book", "both", "case", "down", "ever", "fact", "felt", "full", "game", "gave", "girl", "goes", "help", "home", "hope", "hour", "idea", "into", "kind", "knew", "late", "line", "list", "love", "main", "mind", "miss", "more", "news", "nice", "once", "plan", "real", "room", "save", "seen", "soon", "stop", "sure", "talk", "team", "text", "told", "took", "tree", "type", "user", "wait", "walk", "wall", "wife", "wish", "yard", "yeah",
  // Letter set specific 4-letter words
  "star", "rats", "arts", "tars", "tear", "rate", "dare", "dear", "read", "reds", "sled", "shed", "used", "sued", "dues", "hose", "shoe", "does", "dose", "odes", "hope", "poet", "tope", "tops", "pots", "stop", "post", "opts", "spot", "plan", "slap", "pals", "alps", "laps", "past", "taps", "spat", "pats", "span", "naps", "snap", "pant", "wars", "swat", "wats", "swat", "taws", "staw", "raws", "wear", "wears", "swear", "tears", "stare", "rates", "aster", "great", "stage", "gates", "grate", "chair", "chars", "crash", "reach", "arches", "search", "thread", "hatred", "deaths", "hasted", "bread", "beard", "bared", "debar", "break", "baker", "brake", "maker", "taker", "kites", "likes", "liked", "tiled", "tired", "dries", "rides", "sired", "tried", "fried", "fired", "wired", "weird", "widen", "whine", "twine", "swine", "wines", "mines", "dines", "finds", "kinds", "minds", "winds", "rinds", "grins", "rings", "sings", "signs", "ruins", "runes", "nurse", "purse", "curse", "cures", "cruel", "clues", "glues", "flues", "fuels", "rules", "lures", "sure",
  
  // 5-letter words
  "about", "after", "again", "being", "could", "every", "first", "found", "great", "group", "would", "write", "above", "among", "begin", "bring", "build", "carry", "clean", "close", "doing", "early", "earth", "field", "final", "given", "going", "green", "happy", "heart", "heavy", "human", "heard", "house", "large", "learn", "least", "leave", "level", "light", "local", "major", "might", "money", "music", "night", "north", "order", "other", "paper", "party", "peace", "place", "plant", "point", "power", "press", "right", "round", "serve", "shall", "short", "small", "sound", "south", "space", "speak", "staff", "stage", "stand", "start", "state", "still", "story", "study", "their", "there", "these", "thing", "think", "third", "those", "three", "today", "total", "trade", "trial", "under", "until", "value", "watch", "water", "where", "which", "while", "white", "whole", "whose", "woman", "world", "worry", "worse", "worth", "young",
  // Letter set specific 5-letter words
  "stare", "tears", "rates", "aster", "tares", "resat", "house", "shoed", "hosed", "those", "ethos", "shirt", "short", "thorn", "worth", "throw", "plant", "slant", "pants", "strap", "parts", "traps", "prats", "water", "swear", "wears", "tawer", "wrest", "warts", "stage", "gates", "getas", "great", "grate", "terga", "chair", "crash", "chars", "ratch", "chart", "reach", "chare", "acher", "thread", "dearth", "hatred", "deaths", "hasted", "shated", "bread", "beard", "bared", "debar", "arbed", "debra", "brade", "market", "streak", "takers", "masker", "makers", "remask", "silver", "livers", "sliver", "rivels", "friend", "finder", "fridge", "finger", "garden", "gander", "grande", "ranged", "danger", "grated", "flower", "fowler", "wolfer", "reflux", "spring", "grains", "siring", "rising", "winter", "twiner", "winter", "wither", "whiter", "summer", "muster", "stream", "master", "tamers",
  
  // 6-letter words
  "action", "amount", "around", "become", "before", "behind", "better", "bought", "called", "cannot", "change", "charge", "church", "coming", "common", "course", "create", "degree", "design", "detail", "doctor", "during", "energy", "enough", "entire", "except", "expect", "family", "famous", "father", "figure", "follow", "friend", "future", "ground", "growth", "happen", "health", "income", "indeed", "itself", "length", "letter", "listen", "living", "making", "market", "matter", "member", "moment", "mother", "murder", "myself", "nature", "nearly", "needed", "notice", "number", "object", "obtain", "office", "opened", "option", "others", "parent", "people", "period", "person", "please", "policy", "public", "rather", "reason", "recent", "record", "reduce", "region", "remain", "report", "result", "return", "school", "second", "secure", "should", "simple", "single", "social", "source", "street", "strong", "system", "taking", "though", "travel", "trying", "update", "visual", "within", "wonder", "worked", "writer"
]);

export async function validateWord(word: string): Promise<boolean> {
  // Normalize the word (lowercase, trim)
  const normalizedWord = word.toLowerCase().trim();
  
  // Check minimum length
  if (normalizedWord.length < 3) {
    return false;
  }
  
  // First check our local word list for quick validation
  if (VALID_WORDS.has(normalizedWord)) {
    return true;
  }
  
  try {
    // Use Free Dictionary API for comprehensive word validation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${normalizedWord}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) && data.length > 0;
    } else {
      // If API returns error status, word is likely not valid
      return false;
    }
  } catch (error) {
    // Silent fallback - no console error to avoid spam
    // Return false for unknown words when API is unavailable
    return false;
  }
}