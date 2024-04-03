import { fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth';
import type { PageServerLoad, Actions } from '../sign-up/$types';
import { route } from '~shared/config/routes';

import { userSchema } from '$lib/config/zod-schemas';
import { sendVerificationEmail } from '$lib/config/email-messages';
import { registerUserCommand } from '$lib/server/commands/auth/register-user';

const signUpSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	password: true,
	terms: true
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, route('dashboard'));
	const form = await superValidate(event, signUpSchema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const password = await new Argon2id().hash(form.data.password);
			const token = crypto.randomUUID();
			const id = crypto.randomUUID();
			const user = {
				id: id,
				email: form.data.email.toLowerCase(),
				firstName: form.data.firstName,
				lastName: form.data.lastName,
				password: password,
				role: 'USER',
				verified: false,
				receiveEmail: true,
				token: token,
				createdAt: new Date(),
				updatedAt: new Date()
			};
			// Don't do this here. Call Command instead
			const newUser = await registerUserCommand(user);
			if (newUser) {
				// Not handled here.
				await sendVerificationEmail(newUser.email, token);
				const session = await lucia.createSession(newUser.id, {});
				const sessionCookie = lucia.createSessionCookie(session.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '.',
					...sessionCookie.attributes
				});
				setFlash(
					{
						type: 'success',
						message: 'Account created. Please check your email to verify your account.'
					},
					event
				);
			}
		} catch (e) {
			console.error(e);
			setFlash({ type: 'error', message: 'Account was not able to be created.' }, event);
			// email already in use
			//might be other type of error but this is most common and this is how lucia docs sets the error to duplicate user
			return setError(form, 'email', 'A user with that email already exists.');
		}
		return { form };
	}
};
