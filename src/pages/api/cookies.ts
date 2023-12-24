import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, url }) => {
  const formData = await request.formData();
  const age = formData.get("age");
  const level = formData.get("level");
  const theme = formData.get("theme");
  const language = formData.get("language");

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `__play_and_learn__=${JSON.stringify({
      settings: { age, level, theme, language },
    })}; HttpOnly;Domain=${url.hostname};Path=/;Max-Age=2592000;`
  );

  headers.append("Location", `${url.origin}/settings`);

  return new Response("", {
    headers,
    status: 302,
  });
};
