<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="bg-background bg-image font-iceland relative grid min-h-svh place-items-center py-0 md:py-10"
>
	{@render children()}
	<footer class="text-middleground absolute right-0 bottom-0 p-4 uppercase">
		<p>&copy; {new Date().getFullYear()} xinl</p>
	</footer>
</div>

<style>
	.bg-image {
		background-image: url(/omg41.jpg);
		background-size: cover;
		background-position: top;
		background-attachment: fixed;
	}
</style>
