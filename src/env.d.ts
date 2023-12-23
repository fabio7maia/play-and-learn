/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly OPENAI_API_KEY: string;

  readonly REDIS_HOST: string;
  readonly REDIS_PORT: string;
  readonly REDIS_PASSWORD: string;

  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
