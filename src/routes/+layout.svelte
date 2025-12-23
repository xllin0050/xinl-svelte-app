<script lang="ts">
	import '../app.css';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const siteName = 'XINL';
	const title = 'XINL';
	const description =
		'XINL is an electronic music project based in Taiwan.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={page.url.href} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;600&display=swap"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={page.url.href} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div
	class="app-container"
>
	{@render children()}
	<ContactSection />
	<footer>
		<p>&copy; {new Date().getFullYear()} <span>xinl</span></p>
	</footer>
</div>

<style>
.app-container {
    min-height: 100vh;
    min-height: 100dvh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "main"
        "contact"
        "footer";
}

footer {
    grid-area: footer;
    text-align: center;
}

footer p span {
    text-transform: uppercase;
    letter-spacing: .1em;
}
</style>
