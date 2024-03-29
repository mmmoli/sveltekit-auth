export interface SendOptions {
	from?: string;
	to: string;
	subject: string;
	html: string;
	text: string;
}

export interface SendResponse {
	ok: boolean;
}

export interface EmailService {
	send(options: SendOptions): Promise<SendResponse>;
}
