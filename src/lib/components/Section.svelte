<script lang="ts">
	import { scale, slide } from 'svelte/transition';
	import { Plus, Minus } from 'lucide-svelte';

	export let title: string;
	export let isExpanded: boolean;
	export let onToggle: () => void;
</script>

<section class="mb-4">
	<div class="flex items-center gap-2">
		<button onclick={onToggle}>
			{#if isExpanded}
				<div in:scale class="h-5 w-5">
					<Minus />
				</div>
			{:else}
				<div in:scale class="h-5 w-5">
					<Plus />
				</div>
			{/if}
		</button>
		<h2 class="text-2xl uppercase">{title}</h2>
	</div>
	{#if isExpanded}
		<article transition:slide class="mt-2 h-auto w-full p-4">
			<slot />
		</article>
	{/if}
</section>
