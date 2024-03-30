import { redirect } from 'sveltekit-flash-message/server';
import { lucia } from '$lib/server/auth';
import type { Actions } from '../sign-up/$types';
import { route } from '~shared/config/routes';

const signInRoute = route('auth_sign_in');

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) redirect(302, signInRoute);
		if (event.locals.session) {
			await lucia.invalidateSession(event.locals.session.id);
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
			const message = { type: 'success', message: 'Logged out' } as const;
			redirect(302, signInRoute, message, event.cookies);
		}
		redirect(302, signInRoute);
	}
};

//toast also doesn't work this way.
/*
import { auth } from '$lib/server/auth';
import { setFlash } from 'sveltekit-flash-message/server';
import { redirect } from '@sveltejs/kit';
export const actions = {
	default: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			redirect(302, '/auth/sign-in');
		}

		await auth.invalidateSession(session.sessionId); // invalidate session
		event.locals.auth.setSession(null); // remove cookie
		setFlash({ type: 'success', message: 'Logged out' }, event);
		redirect(302, '/auth/sign-in');

	}
};
*/
