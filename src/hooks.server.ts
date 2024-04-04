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

export const authorisationHandle: Handle = async ({ event, resolve }) => {
	const startTimer = Date.now();
	event.locals.startTimer = startTimer;

	const signInRoute = route('auth_sign_in');
	if (event.route.id?.startsWith('/(protected)')) {
		const session = await event.locals.auth();
		if (!session?.user) redirect(302, signInRoute);
		// if (!session?.user.) redirect(302, route('auth_verify_email'));
	}
	if (event.route.id?.startsWith('/(admin)')) {
		// if (session?.user?.id !== 'ADMIN') redirect(302, signInRoute);
	}

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(authenticationHandle, authorisationHandle);
