import { sveltekit } from '@sveltejs/kit/vite';
import { kitRoutes } from 'vite-plugin-kit-routes';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		kitRoutes({
			format: 'route(symbol)',
			generated_file_path: 'src/lib/shared/config/routes/types.ts'
		})
	]
});
