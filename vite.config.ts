import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5178
	},
	plugins: [
		enhancedImages(),
		sveltekit(),
		tailwindcss(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			disableAsyncLocalStorage: true,
			strategy: ['url', 'preferredLanguage']
		}),
		devtoolsJson()
	]
});
