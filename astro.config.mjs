import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://play-and-learn.netlify.app",
  integrations: [tailwind(), react()],
  output: "hybrid",
  adapter: netlify(),
});
