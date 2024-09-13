import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue({}), mkcert()],
	server: { https: true },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
