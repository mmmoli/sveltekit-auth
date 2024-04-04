import type { Actions } from '../sign-up/$types';
import { signOut } from '$lib/server/auth';

export const actions = { default: signOut } satisfies Actions;
