<script lang="ts">
	import { Mail, Bot } from 'lucide-svelte';
	import Section from './Section.svelte';

	type SocialLink = {
		name: string;
		href: string;
		icon: ConstructorOfATypedSvelteComponent;
		label: string;
	};

	export let isExpanded: boolean;
	export let onToggle: () => void;

	const socialLinks: SocialLink[] = [
		{
			name: 'Email',
			href: 'mailto:xinlprod@pm.me',
			icon: Mail,
			label: '發送郵件給我們'
		},
		{
			name: 'X (Twitter)',
			href: 'https://x.com/xinlprod',
			icon: Bot,
			label: '在 X (Twitter) 上關注我們'
		},
		{
			name: 'Facebook',
			href: 'https://facebook.com/xinlprod',
			icon: Bot,
			label: '在 Facebook 上關注我們'
		}
	];
</script>

<Section title="contact" {isExpanded} {onToggle}>
	<div class="flex items-center justify-start gap-4">
		{#each socialLinks as { name, href, icon: Icon, label }}
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="group text-cream-white flex w-15 flex-col items-center gap-2 transition-opacity hover:opacity-80"
				aria-label={label}
			>
				<div class="h-6 w-6">
					<Icon
						aria-hidden="true"
						class="h-full w-full transition-transform group-hover:scale-110"
					/>
				</div>
				<span
					class="text-sm opacity-0 transition-opacity group-hover:opacity-100"
				>
					{name}
				</span>
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
