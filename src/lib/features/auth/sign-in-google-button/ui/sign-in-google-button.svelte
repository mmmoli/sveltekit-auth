<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '~ui/button';
	import { route } from '~shared/config/routes';
</script>

<Button on:click={() => goto(route('auth_oauth_google'))}>Sign in Google</Button>
