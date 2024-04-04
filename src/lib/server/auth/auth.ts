import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Github from '@auth/sveltekit/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/database';

import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET
} from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		Github({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })
	],
	pages: {
		signIn: '/auth/sign-in',
		signOut: '/auth/sign-out'
		// verifyRequest: '/auth/verify'
	},
	adapter: DrizzleAdapter(db)
});
