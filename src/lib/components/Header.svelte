<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime';

	// 定義可用的語言型別
	type AvailableLanguage = 'en' | 'zh' | 'ja';

	const currentLanguage = $state<AvailableLanguage>(getLocale() as AvailableLanguage);

	type LanguageBtn = {
		language: AvailableLanguage;
		label: string;
	};

	const languageBtns: LanguageBtn[] = [
		{ language: 'en', label: 'English' },
		{ language: 'zh', label: '中文' },
		{ language: 'ja', label: '日本語' }
	];
</script>

<section class="mb-8">
	<div class="flex flex-col md:flex-row md:items-center md:justify-between">
		<div class="pb-4 md:pb-0">
			<h1 class="text-[4rem] uppercase md:text-[8rem]">xinl</h1>
			<nav class="flex gap-2">
				{#each languageBtns as btn}
					<button
						class="border-foreground hover:bg-foreground hover:text-background border px-2 py-1 text-xs transition-colors"
						class:bg-foreground={currentLanguage === btn.language}
						class:text-background={currentLanguage === btn.language}
						onclick={() => setLocale(btn.language)}
					>
						{btn.label}
					</button>
				{/each}
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
