/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WORDPRESS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
