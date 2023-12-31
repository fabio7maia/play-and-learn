import type { Provider } from "@supabase/supabase-js";
import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, url }) => {
  const formData = await request.formData();
  const provider = formData.get("provider");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
  });

  if (data.url) {
    const headers = new Headers();
    headers.append("Location", data.url);

    return new Response("", {
      headers,
      status: 302,
    });
  }

  return new Response(JSON.stringify({ success: !error, data }));
};
