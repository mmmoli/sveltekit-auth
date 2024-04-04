<script lang="ts">
	import { SigninButton } from '~features/auth/sign-in-button';
	import { route } from '~shared/config/routes';
	import * as Card from '~ui/card';
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Sign in</Card.Title>
		<Card.Description
			>Don't have an account yet? <a href={route('auth_sign_up')} class="underline">Sign up here.</a
			></Card.Description
		>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<script lang="ts">
		</script>
		<SigninButton network="google">Sign in Google</SigninButton>
		<SigninButton network="github">Sign in Github</SigninButton>
	</Card.Content>
	<Card.Footer>
		<div class="block w-full">
			<div class="mt-6 text-center text-sm">
				<a href={route('auth_password_reset')} class="underline">Forgot your password?</a>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
