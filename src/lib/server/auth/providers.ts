import type { Provider } from '@auth/sveltekit/providers';
import Google from '@auth/sveltekit/providers/google';
import Github from '@auth/sveltekit/providers/github';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET
} from '$env/static/private';

export const providers = [
	Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
	Github({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })
] satisfies Provider[];
