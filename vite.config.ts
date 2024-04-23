import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
		'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version),
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src'),
			},
		],
	},
})
