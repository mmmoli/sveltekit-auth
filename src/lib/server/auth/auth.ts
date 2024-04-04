import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/database';
import { providers } from './providers';

import { route } from '~shared/config/routes';

export const { handle, signIn, signOut } = SvelteKitAuth({
	pages: {
		signIn: route('auth_sign_in'),
		signOut: route('auth_sign_out'),
		verifyRequest: route('auth_verify_email'),
		newUser: route('dashboard')
	},
	adapter: DrizzleAdapter(db),
	providers
});
