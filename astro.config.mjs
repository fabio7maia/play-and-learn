import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://play-2-learn.vercel.app",
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel(),
});
