/// <reference types="vite/client" />

declare const APP_VERSION: string
interface ImportMetaEnv {
	readonly VITE_API_URL: string
	readonly PACKAGE_VERSION: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
