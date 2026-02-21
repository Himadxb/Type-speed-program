const EASY_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "i", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "on", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"
];

const MEDIUM_WORDS = [
  "algorithm", "bandwidth", "cache", "database", "encryption", "firewall", "gateway", "hardware", "internet", "javascript", "kernel", "linux", "malware", "network", "operating", "protocol", "query", "router", "server", "terminal", "update", "virtual", "widget", "xml", "zip", "array", "binary", "compiler", "debug", "ethernet", "function", "gigabyte", "hexadecimal", "iteration", "java", "keyboard", "loop", "motherboard", "node", "object", "pixel", "queue", "recursion", "syntax", "token", "url", "variable", "wifi", "xerox", "yottabyte", "zone"
];

const HARD_WORDS = [
  "Quixotic", "Juxtapose", "Zephyr", "Vortex", "Symphony", "Rhythm", "Quantum", "Pseudonym", "Ozone", "Nebula", "Labyrinth", "Kaleidoscope", "Jazz", "Interstellar", "Hypothesis", "Galaxy", "Frequenz", "Eclipse", "Dynamo", "Crystal", "Bizarre", "Axiom", "Xylophone", "Whisper", "Vacuum", "Umbrella", "Tsunami", "Sphere", "Quartz", "Puzzle", "Oxygen", "Nitrogen", "Mystery", "Logic", "Krypton", "Jungle", "Isotope", "Horizon", "Gravity", "Friction", "Energy", "Dimension", "Cosmos", "Biology", "Astronomy", "Physics", "Chemistry", "Mathematics", "Geography", "History"
];

export const generateWords = (count: number = 50, difficulty: 'easy' | 'medium' | 'hard' = 'easy', punctuation: boolean = false): string => {
  let wordList = EASY_WORDS;
  if (difficulty === 'medium') wordList = [...EASY_WORDS, ...MEDIUM_WORDS];
  if (difficulty === 'hard') wordList = HARD_WORDS;

  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex];

    if (punctuation) {
      // Randomly capitalize
      if (Math.random() > 0.8) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      // Randomly add punctuation
      if (Math.random() > 0.9) {
        const marks = [',', '.', '?', '!', ';'];
        word += marks[Math.floor(Math.random() * marks.length)];
      }
    }
    
    words.push(word);
  }
  return words.join(" ");
};
