<script lang="ts">
	import { SigninButton } from '~features/auth/sign-in-button';
	import * as Card from '~ui/card';
</script>

<Card.Root>
	<Card.Header class="space-y-1">
		<Card.Title class="text-2xl">Sign in</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<script lang="ts">
		</script>
		<SigninButton network="google">Sign in Google</SigninButton>
		<SigninButton network="github">Sign in Github</SigninButton>
	</Card.Content>
</Card.Root>
