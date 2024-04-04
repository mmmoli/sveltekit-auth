<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Button } from '~ui/button';

	export let network: 'github' | 'google';
	let isProgress = false;
	function handleClick() {
		isProgress = true;
		signIn(network);
	}
</script>

<Button disabled={isProgress} on:click={() => handleClick()}><slot>Sign in Network</slot></Button>
