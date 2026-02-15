<script lang="ts">
	import { setLocale } from '$lib/i18n';
	import Btn from './base/Btn.svelte';
	// import Img from './base/Img.svelte';
	// import logo from '$lib/assets/xinl_logo.png';

	// 定義可用的語言型別
	type AvailableLanguage = 'en' | 'zh' | 'ja';

	// let useLogo = false;

	type LanguageBtn = {
		language: AvailableLanguage;
		label: string;
	};

	const languageBtns: LanguageBtn[] = [
		{ language: 'en', label: 'English' },
		{ language: 'zh', label: 'Chinese' },
		{ language: 'ja', label: 'Japanese' }
	];
</script>

<section class="header-section">
	<div class="wrapper">
		<header>
			<h1>xinl</h1>
		</header>
		<nav>
			{#each languageBtns as btn}
				<Btn onclick={() => setLocale(btn.language)}>
					{btn.label}
				</Btn>
			{/each}
		</nav>
	</div>
</section>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em 0;
	}

	h1 {
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 0.1em;
	}

	nav {
		display: flex;
		justify-content: center;
		gap: 4em;
	}
</style>