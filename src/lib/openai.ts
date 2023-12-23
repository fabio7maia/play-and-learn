import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});
