export const AGE_VALUES = [
  "< 6",
  "6 a 9",
  "10 a 13",
  "15 a 20",
  "> 20",
] as const;

export type TAgeValues = (typeof AGE_VALUES)[number];

export const LEVEL_VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
] as const;

export type TLevelValues = (typeof LEVEL_VALUES)[number];

export const THEME_VALUES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
] as const;

export type TThemeValues = (typeof THEME_VALUES)[number];

export const LANGUAGE_VALUES = ["pt-pt", "en-gb"] as const;

export type TLanguageValues = (typeof LANGUAGE_VALUES)[number];
