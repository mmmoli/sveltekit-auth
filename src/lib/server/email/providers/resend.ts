import { FROM_EMAIL, RESEND_API_KEY } from '$env/static/private';
import type { EmailSendingProvider, SendEmailParams, SendResponse } from '../email-types';
import { Resend } from 'resend';

export class ResendEmailProvider implements EmailSendingProvider {
	protected readonly resend: Resend;
	constructor() {
		this.resend = new Resend(RESEND_API_KEY);
	}
	async send(options: SendEmailParams): Promise<SendResponse> {
		try {
			await this.resend.emails.send({ from: options.from ?? FROM_EMAIL, ...options });
		} catch (err) {
			console.error(err);
			return { ok: false };
		}
		return { ok: true };
	}
}
