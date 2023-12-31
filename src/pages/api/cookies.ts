import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, url, cookies }) => {
  const formData = await request.formData();
  const age = formData.get("age");
  const level = formData.get("level");
  const theme = formData.get("theme");
  const language = formData.get("language");

  const settings = {
    age,
    level,
    theme,
    language,
  };

  const accessToken = formData.get("access_token");
  const refreshToken = formData.get("refresh_token");
  const expiresAt = formData.get("expires_at");
  const expiresIn = formData.get("expires_in");
  const providerToken = formData.get("provider_token");
  const tokenType = formData.get("token_type");

  const auth = {
    accessToken,
    refreshToken,
    expiresAt,
    expiresIn,
    providerToken,
    tokenType,
  };

  const redirectUrl = formData.get("redirectUrl");

  const playAndLearnCookieJson = cookies.get("__play_and_learn__")?.json();

  // console.log("playAndLearnCookieJson", {
  //   playAndLearnCookieJson,
  //   settings,
  //   auth,
  // });

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `__play_and_learn__=${JSON.stringify({
      ...playAndLearnCookieJson,
      settings: {
        age: playAndLearnCookieJson.settings.age || settings.age,
        language: playAndLearnCookieJson.settings.language || settings.language,
        level: playAndLearnCookieJson.settings.level || settings.level,
        theme: playAndLearnCookieJson.settings.theme || settings.theme,
      },
      auth: {
        accessToken:
          playAndLearnCookieJson.auth.accessToken || auth.accessToken,
        expiresAt: playAndLearnCookieJson.auth.expiresAt || auth.expiresAt,
        expiresIn: playAndLearnCookieJson.auth.expiresIn || auth.expiresIn,
        providerToken:
          playAndLearnCookieJson.auth.providerToken || auth.providerToken,
        refreshToken:
          playAndLearnCookieJson.auth.refreshToken || auth.refreshToken,
        tokenType: playAndLearnCookieJson.auth.tokenType || auth.tokenType,
      },
    })}; HttpOnly;Domain=${url.hostname};Path=/;Max-Age=2592000;`
  );

  headers.append(
    "Location",
    redirectUrl?.toString() || `${url.origin}/settings`
  );

  return new Response("", {
    headers,
    status: 302,
  });
};
