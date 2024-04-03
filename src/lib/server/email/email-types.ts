import { render as svelteEmailRender } from 'svelte-email';
import * as templateModules from './templates';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export type TemplateKeys = keyof typeof templateModules;

// type InferProps<T> = T extends SvelteComponent<infer Props, any, any> ? Props : never;

interface BaseSendEmailParams {
	from?: string;
	to: string;
	subject: string;
}

interface SendEmailParamsTemplate<T extends SvelteComponent> extends BaseSendEmailParams {
	template: ComponentType<T>;
	props: ComponentProps<T>;
}

export interface SendEmailParams extends BaseSendEmailParams {
	html: string;
	text: string;
}

export interface SendResponse {
	ok: boolean;
}

export interface EmailSendingProvider {
	send(data: SendEmailParams): Promise<SendResponse>;
}

export type EmailDeps = {
	provider: EmailSendingProvider;
};

export class EmailService {
	constructor(protected readonly deps: EmailDeps) {}

	private render<T extends SvelteComponent>(params: {
		template: ComponentType<T>;
		props: ComponentProps<T>;
	}) {
		const [html, text] = [false, true].map((plainText) =>
			svelteEmailRender({
				template: params.template,
				props: params.props,
				options: {
					plainText
				}
			})
		);

		return {
			html,
			text
		};
	}

	async send(params: SendEmailParamsTemplate<SvelteComponent>): Promise<SendResponse> {
		const { template, props, ...rest } = params;
		return this.deps.strategy.send({
			...rest,
			...this.render({
				template,
				props
			})
		});
	}
}
