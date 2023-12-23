import type { APIRoute } from "astro";
import { openai } from "../../lib";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const age = formData.get("age");
  const level = formData.get("level");

  console.log("formData", { age, level });

  try {
    const aiRes = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `É um jogo de quiz para crianças e adultos`,
        },
        {
          role: "user",
          content: `As perguntas tem 10 níveis de dificuldade sendo 1 o mais fácil e 10 o mais difícil`,
        },
        {
          role: "user",
          content: `Gera-me 10 perguntas e as respetivas respostas considerando a idade ${age} e o nível de dificuldade ${level} em json`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const questions = aiRes.choices[0].message.content;

    console.log("game", { age, level, questions });

    return new Response(JSON.stringify({ status: "success", data: questions }));
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        data: err,
      })
    );
  }
};
