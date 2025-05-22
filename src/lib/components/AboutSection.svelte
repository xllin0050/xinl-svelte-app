<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import Section from './Section.svelte';

	export let isExpanded: boolean;
	export let onToggle: () => void;
</script>

<Section title="about" {isExpanded} {onToggle}>
	<p class="text-cream-white text-base leading-relaxed">{m.about_content()}</p>
</Section>
