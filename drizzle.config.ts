import type { Config } from 'drizzle-kit';
export default {
	schema: './src/lib/server/database/schemas',
	out: './drizzle'
} satisfies Config;
