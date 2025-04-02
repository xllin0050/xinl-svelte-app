<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	let { children } = $props();
</script>

<div
	class="bg-background image font-iceland relative grid min-h-svh place-items-center py-0 md:py-10"
>
	<ParaglideJS {i18n}>
		{@render children()}
	</ParaglideJS>
	<footer class="text-middleground absolute right-0 bottom-0 p-4 uppercase">
		<p>&copy; {new Date().getFullYear()} xinl</p>
	</footer>
</div>

<style>
	.image {
		background-image: url(/omg41.jpg);
		background-size: cover;
		background-position: bottom;
	}
</style>
