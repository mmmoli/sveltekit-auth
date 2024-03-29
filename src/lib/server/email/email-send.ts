import { dev } from '$app/environment';
import type { EmailService, SendOptions } from './email-types';
import { LocalEmailProvider } from './providers/local';
import { ResendEmailProvider } from './providers/resend';

const emailProvider = dev ? new LocalEmailProvider() : new ResendEmailProvider();

export const sendEmail = async (options: SendOptions, provider: EmailService = emailProvider) => {
	return await provider.send(options);
};
