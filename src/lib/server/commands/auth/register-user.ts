import { createUser, type User } from '$lib/server/database';
import { emailService } from '$lib/server/email';
import VerificationEmail from '~emails/email-verification.svelte';

export const registerUserCommand = async (userModel: User) => {
	const newUser = await createUser(userModel);
	if (!newUser) return;
	await emailService.send({
		template: VerificationEmail,
		props: {
			token: newUser.token
		},
		to: newUser.email,
		subject: 'Verify your email'
	});
	return newUser;
};
