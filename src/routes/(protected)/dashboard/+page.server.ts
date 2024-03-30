import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../(protected)/dashboard/$types';
import { route } from '~shared/config/routes';

export const load: PageServerLoad = async (event) => {
	//I only have this function here so it will check page again
	//instead of keeping it cache if it was client side only.
	//If only client side, it might still show the page even
	//if the user has logged out.
	//const session = await event.locals.auth.validate();
	const user = event.locals.user;
	if (!user) redirect(302, route('auth_sign_in'));
	return user;
};
