export const AGE_VALUES = [
  "< 6",
  "6 a 9",
  "10 a 13",
  "15 a 20",
  "> 20",
] as const;
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

type PlayAndLearnStorage = {
  settings: {
    age: (typeof AGE_VALUES)[number];
    level: (typeof LEVEL_VALUES)[number];
    theme: (typeof THEME_VALUES)[number];
  };
};

const PLAY_AND_LEARN_STORAGE_KEY = "__play_and_learn__";

export const PLAY_AND_LEARN_STORAGE_DEFAULTS: PlayAndLearnStorage = {
  settings: {
    age: "10 a 13",
    level: "3",
    theme: "retro",
  },
};

export const storage = {
  get: (): PlayAndLearnStorage => {
    let storage = PLAY_AND_LEARN_STORAGE_DEFAULTS;

    try {
      const v = localStorage.getItem(PLAY_AND_LEARN_STORAGE_KEY);
      storage = v ? JSON.parse(v) : storage;
    } catch (err) {
      localStorage.setItem(
        PLAY_AND_LEARN_STORAGE_KEY,
        JSON.stringify(PLAY_AND_LEARN_STORAGE_DEFAULTS)
      );
    }

    return storage;
  },
  set: (val: Partial<PlayAndLearnStorage>) => {
    localStorage.setItem(PLAY_AND_LEARN_STORAGE_KEY, JSON.stringify(val));
  },
};
