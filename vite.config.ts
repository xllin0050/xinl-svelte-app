import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5178
	},
	plugins: [
		sveltekit(),
		devtoolsJson()
	]
});
