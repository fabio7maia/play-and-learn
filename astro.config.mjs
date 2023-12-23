import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://play-2-learn.netlify.app",
  integrations: [tailwind(), react()],
  output: "server",
  adapter: netlify(),
});
