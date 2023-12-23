import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const age = formData.get("age");
  const level = formData.get("level");
  const theme = formData.get("theme");

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `__play_and_learn__=${JSON.stringify({
      settings: { age, level, theme },
    })}; HttpOnly; Max-Age=2592000`
  );

  return new Response("", {
    headers,
    status: 302,
  });
};
