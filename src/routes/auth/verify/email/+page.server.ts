import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/auth/sign-in');
};
