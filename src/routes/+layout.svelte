<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let { children } = $props();
</script>

<div class="bg-background image font-iceland grid min-h-svh place-items-center py-0 md:py-10">
	<ParaglideJS {i18n}>
		{@render children()}
	</ParaglideJS>
</div>
<footer class="text-middleground absolute right-0 bottom-0 p-4 uppercase">
	<enhanced:img
		src="$lib/assets/NeoViking#1738.webp?w=96"
		sizes="min(96px, 100vw)"
		alt="xinl"
		class="block md:hidden"
	/>
	<p>&copy; {new Date().getFullYear()} xinl</p>
</footer>

<style>
	.image {
		background-image: url(/omg41.jpg);
		background-size: cover;
		background-position: bottom;
	}
</style>
