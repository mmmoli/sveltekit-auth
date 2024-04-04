import { handle as authenticationHandle } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import type { HandleServerError } from '@sveltejs/kit';
import { route } from '~shared/config/routes';

import { log } from '$lib/server/log';
import { sequence } from '@sveltejs/kit/hooks';

export const handleError: HandleServerError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();

	event.locals.error = error?.toString() || '';
	if (error instanceof Error) {
		event.locals.errorStackTrace = error.stack || '';
	} else {
		event.locals.errorStackTrace = '';
	}
	event.locals.errorId = errorId;
	log(500, event);

	return {
		message: 'An unexpected error occurred.',
		errorId
	};
};

// export const handle: Handle = async ({ event, resolve }) => {
// 	const startTimer = Date.now();
// 	event.locals.startTimer = startTimer;

// 	const sessionId = event.cookies.get(lucia.sessionCookieName);
// 	if (!sessionId) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}

// 	const { session, user } = await lucia.validateSession(sessionId);
// 	if (session && session.fresh) {
// 		const sessionCookie = lucia.createSessionCookie(session.id);
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	if (!session) {
// 		const sessionCookie = lucia.createBlankSessionCookie();
// 		event.cookies.set(sessionCookie.name, sessionCookie.value, {
// 			path: '.',
// 			...sessionCookie.attributes
// 		});
// 	}
// 	event.locals.user = user;
// 	event.locals.session = session;

// 	const signInRoute = route('auth_sign_in');
// 	if (event.route.id?.startsWith('/(protected)')) {
// 		if (!user) redirect(302, signInRoute);
// 		if (!user.verified) redirect(302, route('auth_verify_email'));
// 	}
// 	if (event.route.id?.startsWith('/(admin)')) {
// 		if (user?.role !== 'ADMIN') redirect(302, signInRoute);
// 	}

// 	const response = await resolve(event);
// 	log(response.status, event);
// 	return response;
// };

export const authorisationHandle: Handle = async ({ event, resolve }) => {
	const startTimer = Date.now();
	event.locals.startTimer = startTimer;

	// const session = await event.locals.auth();

	const signInRoute = route('auth_sign_in');
	if (event.route.id?.startsWith('/(protected)')) {
		// if (!session?.user) redirect(302, signInRoute);
		// if (!session?.user?) redirect(302, route('auth_verify_email'));
	}
	if (event.route.id?.startsWith('/(admin)')) {
		// if (session?.user?.id !== 'ADMIN') redirect(302, signInRoute);
	}

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(authorisationHandle, authenticationHandle);
