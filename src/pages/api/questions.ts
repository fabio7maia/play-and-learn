import type { APIRoute } from "astro";
import { z } from "zod";
import { supabase } from '../../lib/supabase';
import { openai } from '../../lib/openai';

const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      choices: z.array(z.string()),
    })
  ),
});

const quizSchema2 = z.object({
  quizzes: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
      choices: z.array(z.string()),
    })
  ),
});

const handler = async ({
  age = "10 a 13",
  language = "pt",
  level = "3",
}: {
  age?: string;
  level?: string;
  language?: string;
}) => {
  const messages = [
    {
      role: "user",
      content: `É um jogo de quiz para crianças e adultos sobre qualquer área`,
    },
    {
      role: "user",
      content: `As perguntas tem 10 níveis de dificuldade sendo 1 o mais fácil e 10 o mais difícil`,
    },
    {
      role: "user",
      content: `A estrutura json de resposta deve ser no seguinte template: { questions: [{question: string; choices: string[]; answer: string; }] }`,
    },
    {
      role: "user",
      content: `A linguagem utilizada deve ser ${language}`,
    },
    {
      role: "user",
      content: `Gera-me 10 perguntas e as respetivas 4 alternativas de respostas considerando a idade ${age} e o nível de dificuldade ${level} em json`,
    },
  ] as any;

  // console.log("formData", { age, level });

  try {
    const aiRes = await openai.chat.completions.create({
       messages: messages,
       model: "gpt-3.5-turbo-1106",
       response_format: { type: "json_object" },
       temperature: 1.5,
    });

    const questions: any = JSON.parse(aiRes.choices[0].message.content || "");

    // console.log("questions", { questions });

    try {
       await supabase.from("questions").insert({
       context: { age, level, language },
         ai_response: questions,
       });
    } catch (err) {}

    const { success } = quizSchema2.safeParse(questions);

    let data = questions;
    if (success) {
       data["questions"] = data.quizzes;
       delete data.quizzes;
    } else {
       quizSchema.parse(questions);
    }

    // console.log("game", { age, level, questions });

    return new Response(JSON.stringify({ status: "success", data }));

    /*
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          questions: [
            {
              question: "Qual é a capital do Brasil?",
              choices: ["Buenos Aires", "Brasília", "Lima", "Rio de Janeiro"],
              answer: "Brasília",
            },
            {
              question: "Quantos planetas existem no nosso sistema solar?",
              choices: ["8", "7", "9", "10"],
              answer: "8",
            },
            {
              question: "Quem pintou a Mona Lisa?",
              choices: [
                "Pablo Picasso",
                "Vincent van Gogh",
                "Leonardo da Vinci",
                "Michelangelo",
              ],
              answer: "Leonardo da Vinci",
            },
            {
              question: "Qual é o maior animal terrestre?",
              choices: [
                "Elefante africano",
                "Baleia-azul",
                "Girafa",
                "Rinoceronte-branco",
              ],
              answer: "Elefante africano",
            },
            {
              question: "Qual é a capital de Portugal?",
              choices: ["Lisboa", "Porto", "Faro", "Coimbra"],
              answer: "Lisboa",
            },
            {
              question: "Quantos dias tem um ano bissexto?",
              choices: ["365", "366", "364", "367"],
              answer: "366",
            },
            {
              question: "Quem escreveu a peça 'Romeu e Julieta'?",
              choices: [
                "William Shakespeare",
                "Miguel de Cervantes",
                "Jane Austen",
                "Emily Brontë",
              ],
              answer: "William Shakespeare",
            },
            {
              question: "Qual é o maior oceano do mundo?",
              choices: [
                "Oceano Atlântico",
                "Oceano Índico",
                "Oceano Ártico",
                "Oceano Pacífico",
              ],
              answer: "Oceano Pacífico",
            },
            {
              question: "Como se chama a estrela mais próxima da Terra?",
              choices: [
                "Alfa Centauri",
                "Estrela de Barnard",
                "Proxima Centauri",
                "Vega",
              ],
              answer: "Proxima Centauri",
            },
            {
              question: "Qual é a língua oficial do Brasil?",
              choices: ["Espanhol", "Francês", "Inglês", "Português"],
              answer: "Português",
            },
          ],
        },
      })
    );
    */
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        data: err,
      })
    );
  }
};

export const GET: APIRoute = async () => {
  const age = "10 a 13";
  const level = "3";
  const language = "pt-pt";

  return handler({ age, level, language });
};

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const age = formData.get("age") as string;
  const level = formData.get("level") as string;
  const language = formData.get("language") as string;

  return handler({ age, level, language });
};
