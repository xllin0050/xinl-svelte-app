<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import Section from './Section.svelte';

	export let isExpanded: boolean;
	export let onToggle: () => void;

	// 社交媒體連結
	type SocialLink = {
		name: string;
		href: string;
		type: 'email' | 'x' | 'facebook';
	};

	const socialLinks: SocialLink[] = [
		{ name: 'Email', href: 'mailto:xinlprod@pm.me', type: 'email' },
		{ name: 'X', href: 'https://x.com/xinlprod', type: 'x' },
		{ name: 'Facebook', href: 'https://facebook.com/xinlprod', type: 'facebook' }
	];
</script>

<Section title="contact" {isExpanded} {onToggle}>
	<div class="flex gap-6">
		{#each socialLinks as link}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="text-cream-white transition-opacity hover:opacity-70"
				aria-label={link.name}
			>
				{#if link.type === 'email'}
					<div class="h-6 w-6">
						<Mail />
					</div>
				{:else if link.type === 'x'}
					<img src="/x.svg" alt="X" class="filter-cream-white h-6 w-6" />
				{:else if link.type === 'facebook'}
					<img src="/facebook.svg" alt="Facebook" class="filter-cream-white h-6 w-6" />
				{/if}
			</a>
		{/each}
	</div>
</Section>

<style>
	/* 為 SVG 圖像添加濾鏡，使其顯示為 cream-white 顏色 */
	.filter-cream-white {
		filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
	}
</style>
