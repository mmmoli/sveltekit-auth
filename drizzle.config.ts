import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.prod ? (process.env.TURSO_DB_URL as string) : 'file:local.db';

if (!url) {
	throw new Error('TURSO_DB_URL is not set');
}

export default {
	schema: './src/lib/server/database/schemas',
	out: './drizzle',
	driver: 'libsql',
	dbCredentials: {
		url
	}
} satisfies Config;
