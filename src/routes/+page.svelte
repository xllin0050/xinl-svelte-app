<script lang="ts">
	import { onMount } from 'svelte';

	// 引入組件
	import Header from '$lib/components/Header.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';

	onMount(() => {});

</script>

<main>
	<!-- 頭部區域 -->
	<Header />
	<AboutSection />
</main>

<style>
	/* 高度 */
	main {
		grid-area: main;
		min-height: 0;
	}
</style>
