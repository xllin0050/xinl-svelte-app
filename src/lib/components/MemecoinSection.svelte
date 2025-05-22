<script lang="ts">
	import Section from './Section.svelte';

	export let isExpanded: boolean;
	export let onToggle: () => void;
</script>

<Section title="memecoin" {isExpanded} {onToggle}>
	<div class="flex flex-col items-start gap-4">
		<a
			href="https://www.snek.fun/token/c59077498bb5b674ea080af917fecd0d1ad128dfe16652b8f4260f1558494e4c20436f696e"
			target="_blank"
			rel="noopener noreferrer"
			class="block transition-opacity hover:opacity-70"
			aria-label="Visit xinl memecoin on snek.com"
		>
			<enhanced:img
				src="$lib/assets/xinl_logo.png?w=64"
				sizes="min(64px, 100vw)"
				alt="xinl memecoin"
				class="block"
			/>
		</a>
		<!-- <a
			href="https://snek.com"
			target="_blank"
			rel="noopener noreferrer"
			class="text-cream-white transition-opacity hover:opacity-70"
		>
			snek.com
		</a> -->
	</div>
</Section>
