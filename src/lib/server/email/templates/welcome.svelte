<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';
	import Layout from '../components/default-layout.svelte';

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const btnContainer = {
		textAlign: 'center' as const
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
</script>

<Layout preview="Welcome to Svelte Email">
	<Text style={paragraph}>{firstName}, welcome to svelte-email</Text>
	<Text style={paragraph}>A Svelte component library for building responsive emails</Text>
	<Section style={btnContainer}>
		<Button pX={12} pY={12} style={button} href="https://github.com/carstenlebek/svelte-email">
			View on GitHub
		</Button>
	</Section>
	<Text style={paragraph}>Happy coding!</Text>
</Layout>
