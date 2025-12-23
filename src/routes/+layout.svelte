<script lang="ts">
	import '../app.css';
	import ContactSection from '$lib/components/ContactSection.svelte';

	let { children } = $props();
</script>

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
