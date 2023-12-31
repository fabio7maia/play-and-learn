import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async ({ cookies }) => {
  const playAndLearnCookieJson = cookies.get("__play_and_learn__")?.json();

  const { data, error } = await supabase.auth.getUser(
    playAndLearnCookieJson?.auth?.accessToken
  );

  return new Response(JSON.stringify({ success: !error, data }));
};
