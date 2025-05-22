<script lang="ts">
	import { scale, slide } from 'svelte/transition';
	import { Plus, Minus, Mail } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';

	import Timeline from '$lib/components/Timeline.svelte';

	// 只允許一個 section 展開
	let expandedSection = $state<string | null>(null);

	// 定義可用的語言型別
	type AvailableLanguage = 'en' | 'zh' | 'ja';

	const currentLanguage = $state<AvailableLanguage>(getLocale() as AvailableLanguage);

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

{#snippet expandButton(label: string)}
	<button onclick={() => toggleSection(label)}>
		{#if expandedSection === label}
			<div in:scale class="h-5 w-5">
				<Minus />
			</div>
		{:else}
			<div in:scale class="h-5 w-5">
				<Plus />
			</div>
		{/if}
	</button>
{/snippet}

<main class="bg-background text-pearl-white h-full w-full px-8 opacity-80 md:w-xl">
	<!-- Artist Name -->
	<section class="mb-8">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between">
			<div class="pb-4 md:pb-0">
				<h1 class="text-[4rem] uppercase md:text-[8rem]">xinl</h1>
				<nav class="flex gap-2">
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'zh'}
						class:text-background={currentLanguage === 'zh'}
						onclick={() => setLocale('zh')}
					>
						中文
					</button>
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'en'}
						class:text-background={currentLanguage === 'en'}
						onclick={() => setLocale('en')}
					>
						English
					</button>
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === 'ja'}
						class:text-background={currentLanguage === 'ja'}
						onclick={() => setLocale('ja')}
					>
						日本語
					</button>
				</nav>
			</div>
			<enhanced:img
				src="$lib/assets/NeoViking#1738.webp?w=140"
				sizes="min(140px, 100vw)"
				alt="xinl"
				class="block"
			/>
		</div>
	</section>
	<!-- About -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('about')}
			<h2 class="text-2xl uppercase">about</h2>
		</div>
		{#if expandedSection === 'about'}
			<article transition:slide class=" mt-2 h-auto w-full p-4">
				<p class="text-cream-white text-base leading-relaxed">{m.about_content()}</p>
			</article>
		{/if}
	</section>
	<!-- Release -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('release')}
			<h2 class="text-2xl uppercase">release</h2>
		</div>
		{#if expandedSection === 'release'}
			<article transition:slide class=" mt-2 w-full p-4">
				<Timeline />
			</article>
		{/if}
	</section>
	<!-- Memecoin -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('memecoin')}
			<h2 class="text-2xl uppercase">memecoin</h2>
		</div>
		{#if expandedSection === 'memecoin'}
			<article transition:slide class="mt-2 h-auto w-full p-4">
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
			</article>
		{/if}
	</section>

	<!-- Contact -->
	<section class="mb-4">
		<div class="flex items-center gap-2">
			{@render expandButton('contact')}
			<h2 class="text-2xl uppercase">contact</h2>
		</div>
		{#if expandedSection === 'contact'}
			<article transition:slide class="mt-2 h-auto w-full p-4">
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
			</article>
		{/if}
	</section>
</main>

<style>
	/* 為 SVG 圖像添加濾鏡，使其顯示為 cream-white 顏色 */
	.filter-cream-white {
		filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
	}
</style>
