<script lang="ts">
	import { Button, Link, Text } from 'svelte-email';
	import Layout from '../components/default-layout.svelte';

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const button = {
		fontFamily,
		backgroundColor: '#5F51E8',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};

	export let verifyEmailURL: string;
</script>

<Layout preview="Verify your Email">
	<Text style={paragraph}>
		Please click this <Link href={verifyEmailURL}>link</Link> to verify your email address for your ${APP_NAME}
		account.
	</Text>
	<Text style={paragraph}>You can also visit the link below.</Text>
	<Text style={paragraph}>
		<Button pX={12} pY={12} style={button} href={verifyEmailURL}>Confirm Email</Button>
	</Text>
	<Text style={paragraph}>If you did not create this account, you can disregard this email.</Text>
</Layout>
