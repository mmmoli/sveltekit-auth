<script lang="ts">
	import { Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

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

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};

	export let preview: string;
</script>

<Html lang="en">
	<Head />
	<Preview {preview} />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://svelte.dev/svelte-logo-horizontal.svg"
				alt="Svelte logo"
				style={logo}
				width="200"
				height="50"
			/>
			<slot />
			<Hr style={hr} />
			<Text style={footer}>Carsten Lebek</Text>
		</Container>
	</Section>
</Html>
