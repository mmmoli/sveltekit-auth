import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from '../sign-in/$types';
import { route } from '~shared/config/routes';

export const load: PageServerLoad = async (event) => {};

import { signIn } from '$lib/server/auth';

export const actions = { default: signIn } satisfies Actions;
