import { EmailService } from './email-types';
import { dev } from '$app/environment';
import { LocalEmailProvider } from './providers/local';
import { ResendEmailProvider } from './providers/resend';
export * as templates from './templates';

const emailProvider = dev ? new LocalEmailProvider() : new ResendEmailProvider();

export const emailService = new EmailService({
	provider: emailProvider
});
