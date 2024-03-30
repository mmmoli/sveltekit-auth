export interface LogPayload extends Record<string, unknown> {
	level: 'info' | 'warn' | 'error';
}

export interface LogTrait {
	log: (payload: LogPayload) => void;
}
