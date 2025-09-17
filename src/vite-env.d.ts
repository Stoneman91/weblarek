/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_API_ORIGIN: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}