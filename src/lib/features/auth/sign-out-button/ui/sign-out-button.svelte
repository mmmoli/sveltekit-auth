<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Button } from '~ui/button';

	let isProgress = false;
	function handleClick() {
		isProgress = true;
		signOut().finally(() => {
			isProgress = false;
		});
	}
</script>

<Button disabled={isProgress} on:click={() => handleClick()}>Sign Out</Button>
