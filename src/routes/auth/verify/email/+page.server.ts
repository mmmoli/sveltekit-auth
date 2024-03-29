import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../email/$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, '/auth/sign-in');
};
