import React from "react";

const KEY = "__play_and_learn_auth__";

export const Auth: React.FC = () => {
  React.useEffect(() => {
    if (window.location.href.indexOf("access_token") > 0) {
      sessionStorage.setItem(KEY, "logged");

      const url = new URL(window.location.href.replace("/#", "?"));
      const accessToken = url.searchParams.get("access_token");
      const refreshToken = url.searchParams.get("refresh_token");
      const expiresAt = url.searchParams.get("expires_at");
      const expiresIn = url.searchParams.get("expires_in");
      const providerToken = url.searchParams.get("provider_token");
      const tokenType = url.searchParams.get("token_type");

      const body = new FormData();
      accessToken && body.append("access_token", accessToken);
      refreshToken && body.append("refresh_token", refreshToken);
      expiresAt && body.append("expires_at", expiresAt);
      expiresIn && body.append("expires_in", expiresIn);
      providerToken && body.append("provider_token", providerToken);
      tokenType && body.append("token_type", tokenType);

      body.append("redirectUrl", window.location.origin);

      fetch("/api/cookies", {
        method: "POST",
        body,
      }).then((_) => {
        window.location.href = window.location.origin;
      });
    }
  }, []);

  return <></>;
};
