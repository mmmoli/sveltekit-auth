import { FROM_EMAIL } from '$env/static/private';
import type { EmailService, SendOptions, SendResponse } from '../email-types';
import { SMTPClient } from 'emailjs';

export class LocalEmailProvider implements EmailService {
	protected readonly client: SMTPClient;

	constructor() {
		this.client = new SMTPClient({
			host: 'localhost',
			port: 1025,
			ssl: false
		});
	}
	async send(options: SendOptions): Promise<SendResponse> {
		try {
			await this.client.sendAsync({
				from: options.from ?? FROM_EMAIL,
				attachment: [{ data: options.html, alternative: true }],
				...options
			});
			console.log(`Test email sent to ${options.to}`);
		} catch (e) {
			console.error(e);
			return { ok: false };
		}
		return { ok: true };
	}
}
