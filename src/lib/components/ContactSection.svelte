<script lang="ts">
	import Section from './base/Section.svelte';

	type SocialLink = {
		name: string;
		href: string;
		label: string;
	};

	export let isExpanded: boolean;
	export let onToggle: () => void;

	const socialLinks: SocialLink[] = [
		{
			name: 'Email',
			href: 'mailto:xinlprod@pm.me',
			label: '發送郵件給我們'
		},
		{
			name: 'X',
			href: 'https://x.com/xinlprod',
			label: '在 X 上關注我'
		},
		{
			name: 'Facebook',
			href: 'https://facebook.com/xinlprod',
			label: '在 Facebook 上關注我'
		}
	];
</script>

<Section title="contact" {isExpanded} {onToggle}>
	<div class="flex flex-col gap-4">
		{#each socialLinks as { name, href, label }}
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-cream-white hover:border-pearl-white inline-block rounded-md border-2 border-transparent p-2 transition-all duration-300"
				aria-label={label}
			>
				{name}
			</a>
		{/each}
	</div>
</Section>

<style>
	/* 添加平滑過渡效果 */
	a {
		will-change: transform;
	}

	/* 確保圖標顏色正確繼承 */
	:global(svg) {
		@apply h-full w-full;
	}
</style>
