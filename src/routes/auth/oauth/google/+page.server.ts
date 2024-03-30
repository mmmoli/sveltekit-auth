import { redirect } from '@sveltejs/kit';
import { generateState, generateCodeVerifier } from 'arctic';
import { googleOauth } from '$lib/server/auth';
import type { PageServerLoad } from '../../oauth/google/$types';
import { route } from '~shared/config/routes';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, route('dashboard'));

	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await googleOauth.createAuthorizationURL(state, codeVerifier, {
		scopes: ['profile', 'email']
	});

	// store state verifier as cookie
	event.cookies.set('google_state', state, {
		secure: true, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	// store code verifier as cookie
	event.cookies.set('google_code_verifier', codeVerifier, {
		secure: true, // set to false in localhost
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10 // 10 min
	});

	return redirect(302, url);
};
