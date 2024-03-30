import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../email/$types';
import { route } from '~shared/config/routes';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, route('auth_sign_in'));
};
