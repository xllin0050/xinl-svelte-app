<script lang="ts">
	import Timeline from './Timeline.svelte';
	import Section from './Section.svelte';

	export let isExpanded: boolean;
	export let onToggle: () => void;
</script>

<Section title="release" {isExpanded} {onToggle}>
	<Timeline />
</Section>
