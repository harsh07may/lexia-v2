export const POINTS_TO_REFILL = 10;
export const DEFAULT_HEARTS_MAX = 5;
export const DEFAULT_POINTS_START = 0;
export const POINTS_PER_CHALLENGE = 10;

// Sample prompt for labs
export const WRITING_PROMPTS = [
  "Describe your favorite hobby in 3-4 sentences.",
  "Write about what you did yesterday.",
  "Introduce yourself and your family.",
  "Describe your ideal vacation destination.",
  "Write about your favorite food and why you like it.",
];

// Sample grammar tips
export const GRAMMAR_TIPS = [
  "Remember to conjugate verbs correctly in the past tense.",
  "Pay attention to gender agreement with nouns and adjectives.",
  "Use connecting words to make your writing flow better.",
  "Try to vary your sentence structure for more natural writing.",
  "Don't forget to use articles (a, an, the) correctly.",
];

// Sample languages
export const LANGUAGES = [
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "croatian", label: "Croatian" },
];

export const quests = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

export const sidebarItems = [
  {
    href: "/learn",
    label: "learn",
    iconSrc: "/icons/learn.svg",
  },
  {
    href: "/leaderboard",
    label: "leaderboard",
    iconSrc: "/icons/leaderboard.svg",
  },
  {
    href: "/quests",
    label: "quests",
    iconSrc: "/icons/quests.svg",
  },
  {
    href: "/shop",
    label: "shop",
    iconSrc: "/icons/shop.svg",
  },
  {
    href: "/labs",
    label: "Ai Lab",
    iconSrc: "/icons/lab.svg",
  },
];
