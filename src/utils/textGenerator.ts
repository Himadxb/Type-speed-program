const EASY_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over",
  "think", "also", "back", "after", "use", "two", "how", "our", "work",
  "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us"
];

const MEDIUM_WORDS = [
  "algorithm", "battery", "complex", "develop", "element", "future", "global",
  "history", "impact", "journey", "kitchen", "landscape", "monitor", "network",
  "option", "planet", "quality", "review", "system", "theory", "unique",
  "visual", "wonder", "yellow", "zone", "absolute", "balance", "capture",
  "dynamic", "economy", "finance", "galaxy", "harvest", "income", "justice",
  "kingdom", "liberty", "machine", "nature", "object", "physics", "quantum",
  "random", "sample", "target", "update", "vector", "window", "xenon",
  "yield", "zebra", "access", "browser", "cache", "data", "event", "function",
  "grid", "host", "input", "java", "kernel", "linux", "memory", "node",
  "output", "pixel", "query", "router", "server", "token", "user", "value",
  "width", "xml", "syntax", "logic", "method", "class", "scope"
];

const HARD_WORDS = [
  "anthropology", "biochemistry", "cryptography", "dermatology", "epidemiology",
  "fluorescence", "galvanization", "homeostasis", "immunology", "jurisprudence",
  "kinesiology", "luminescence", "microbiology", "neuroscience", "oceanography",
  "paleontology", "quadrilateral", "radiography", "seismology", "thermodynamics",
  "urbanization", "virology", "xylography", "zoology", "abracadabra", "bureaucracy",
  "chrysanthemum", "dodecahedron", "exaggeration", "flabbergasted", "gobbledygook",
  "hippopotamus", "idiosyncrasy", "juxtaposition", "kaleidoscope", "labyrinthine",
  "magnanimous", "necromancer", "onomatopoeia", "paraphernalia", "quintessential",
  "reminiscence", "serendipity", "transcendental", "unequivocal", "ventriloquist",
  "whippersnapper", "xenophobia", "yesteryear", "zeitgeist"
];

export type Difficulty = 'easy' | 'medium' | 'hard';

export const generateText = (count: number, difficulty: Difficulty, usePunctuation: boolean): string => {
  let wordList = EASY_WORDS;
  
  if (difficulty === 'medium') wordList = MEDIUM_WORDS;
  if (difficulty === 'hard') wordList = HARD_WORDS;

  const words = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex];

    if (usePunctuation) {
      if (Math.random() > 0.8) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (Math.random() > 0.7) {
        const punctuation = [",", ".", ";", "!", "?"];
        word += punctuation[Math.floor(Math.random() * punctuation.length)];
      }
      if (Math.random() > 0.9) {
          word = `"${word}"`;
      }
    }
    
    words.push(word);
  }
  
  return words.join(" ");
};
