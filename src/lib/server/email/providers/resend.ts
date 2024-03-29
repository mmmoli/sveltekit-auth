import { FROM_EMAIL, RESEND_API_KEY } from '$env/static/private';
import type { EmailService, SendOptions, SendResponse } from '../email-types';
import { Resend } from 'resend';

export class ResendEmailProvider implements EmailService {
	protected readonly resend: Resend;
	constructor() {
		this.resend = new Resend(RESEND_API_KEY);
	}
	async send(options: SendOptions): Promise<SendResponse> {
		try {
			await this.resend.emails.send({ from: options.from ?? FROM_EMAIL, ...options });
		} catch (err) {
			console.error(err);
			return { ok: false };
		}
		return { ok: true };
	}
}
