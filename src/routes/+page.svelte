<script lang="ts">
	import { onMount } from 'svelte';

	// 引入組件
	import Header from '$lib/components/Header.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ReleaseSection from '$lib/components/ReleaseSection.svelte';
	import MemecoinSection from '$lib/components/MemecoinSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';

	// 只允許一個 section 展開
	let expandedSection = $state<string | null>(null);

	onMount(() => {});

	// 切換展開狀態的函數
	function toggleSection(sectionName: string): void {
		if (expandedSection === sectionName) {
			// 如果點擊的是當前已展開的 section，則收起
			expandedSection = null;
		} else {
			// 否則展開點擊的 section，收起其他 section
			expandedSection = sectionName;
		}
	}
</script>

<main class="bg-background text-pearl-white h-full w-full px-8 opacity-80 md:w-xl">
	<!-- 頭部區域 -->
	<Header />
	
	<!-- 各個部分 -->
	<AboutSection 
		isExpanded={expandedSection === 'about'} 
		onToggle={() => toggleSection('about')} 
	/>
	
	<ReleaseSection 
		isExpanded={expandedSection === 'release'} 
		onToggle={() => toggleSection('release')} 
	/>
	
	<MemecoinSection 
		isExpanded={expandedSection === 'memecoin'} 
		onToggle={() => toggleSection('memecoin')} 
	/>
	
	<ContactSection 
		isExpanded={expandedSection === 'contact'} 
		onToggle={() => toggleSection('contact')} 
	/>
</main>
