import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
// import vercel from "@astrojs/vercel/serverless";
// import netlify from "@astrojs/netlify";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://play-2-learn.pages.dev",
  integrations: [tailwind(), react()],
  output: "server",
  adapter: cloudflare(), // vercel(), netlify()
});
