<script lang="ts">
	import '../app.css';
	import ContactSection from '$lib/components/ContactSection.svelte';

	let { children } = $props();
</script>

<div
	class="app-container "
>
	{@render children()}
	<ContactSection />
	<footer class="">
		<p>&copy; {new Date().getFullYear()} xinl</p>
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
</style>
