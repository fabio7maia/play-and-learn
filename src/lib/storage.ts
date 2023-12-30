import type {
  TAgeValues,
  TLanguageValues,
  TLevelValues,
  TThemeValues,
} from "../constants/storage";

type PlayAndLearnStorage = {
  settings: {
    age: TAgeValues;
    level: TLevelValues;
    theme: TThemeValues;
    language: TLanguageValues;
    category: string;
  };
};

const PLAY_AND_LEARN_STORAGE_KEY = "__play_and_learn__";

export const PLAY_AND_LEARN_STORAGE_DEFAULTS: PlayAndLearnStorage = {
  settings: {
    age: "10 a 13",
    level: "3",
    theme: "retro",
    language: "pt-pt",
    category: "cultura geral",
  },
};

export const storage = {
  get: (): PlayAndLearnStorage => {
    let storage = PLAY_AND_LEARN_STORAGE_DEFAULTS;

    try {
      const v = localStorage.getItem(PLAY_AND_LEARN_STORAGE_KEY);
      storage = v ? JSON.parse(v) : storage;
    } catch (err) {
      localStorage.removeItem(PLAY_AND_LEARN_STORAGE_KEY);

      storage = PLAY_AND_LEARN_STORAGE_DEFAULTS;
    }

    return storage;
  },
  set: (val: Partial<PlayAndLearnStorage>) => {
    localStorage.setItem(PLAY_AND_LEARN_STORAGE_KEY, JSON.stringify(val));
  },
};
