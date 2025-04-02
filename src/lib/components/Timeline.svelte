<script lang="ts">
	import type { Release } from '$lib/types';
	import releaseData from '$lib/data/releases.json';

	export let releases: Release[] = releaseData.releases;
	let selectedRelease: Release | null = releases[0];
	let selectedIndex = 0;

	// 计算位置的常量
	const COVER_HEIGHT = 200; // 封面高度
	const GAP = 32; // 间距（gap-8 = 2rem = 32px）
	const CONTAINER_HEIGHT = 400; // 容器高度
	const INITIAL_OFFSET = GAP / 2; // 初始偏移，考虑gap的一半

	// 计算偏移量
	$: offset = INITIAL_OFFSET + selectedIndex * (COVER_HEIGHT + GAP);

	function selectRelease(release: Release) {
		selectedRelease = selectedRelease === release ? null : release;
		selectedIndex = releases.indexOf(release);
	}
</script>

<div class="relative h-[400px] w-full overflow-hidden bg-black">
	<!-- 封面展示區，md斷點以上才顯示 -->
	<div
		class="absolute hidden left-8 flex-col items-center gap-8 md:flex"
		style="top: {CONTAINER_HEIGHT}px; transform: translateY(-50%) translateY(-{offset}px);"
	>
		{#each releases as release, i}
			<div
				class="relative transition-all duration-500 ease-out"
				style="transform: rotateY({Math.sin(Date.now() * 0.001) * 5}deg)"
			>
				<button
					type="button"
					class="focus:ring-secondary block h-[200px] w-[200px] cursor-pointer shadow-xl focus:ring-2 focus:outline-none"
					on:click={() => selectRelease(release)}
					on:keydown={(e) => e.key === 'Enter' && selectRelease(release)}
				>
					<img src={release.cover} alt={release.title} class="h-full w-full object-cover" />
				</button>
			</div>
		{/each}
	</div>

	<!-- md斷點以下的按鈕列表 -->
	<div class="absolute inset-x-0 top-4 flex justify-center md:hidden">
		<div class="flex flex-col gap-2">
			{#each releases as release}
				<button
					type="button"
					class={`hover:bg-tertiary w-48 rounded-lg bg-black px-4 py-2 text-center transition-colors ${selectedRelease === release ? 'bg-secondary text-black' : ''}`}
					on:click={() => selectRelease(release)}
				>
					{release.title}
				</button>
			{/each}
		</div>
	</div>

	<!-- 專輯資訊顯示 -->
	{#if selectedRelease}
		<div
			class="bg-secondary absolute right-4 bottom-4 left-4 flex items-center justify-between p-4 backdrop-blur-sm"
		>
			<div class="text-black">
				<h3 class="text-xl font-bold">{selectedRelease.title}</h3>
				<time class="text-sm opacity-75">{selectedRelease.date}</time>
			</div>
			<div class="flex gap-4">
				<a
					href={selectedRelease.streamLinks.spotify}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-pearl-white transition-colors"
				>
					<img src="/spotify.svg" alt="Spotify" class="h-6 w-6" />
				</a>
				<a
					href={selectedRelease.streamLinks.apple}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-pearl-white transition-colors"
				>
					<img src="/applemusic.svg" alt="Apple Music" class="h-6 w-6" />
				</a>
				<a
					href={selectedRelease.streamLinks.youtube}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-pearl-white transition-colors"
				>
					<img src="/youtube.svg" alt="YouTube" class="h-6 w-6" />
				</a>
			</div>
		</div>
	{/if}

	<!-- 側邊列表，md斷點以上才顯示 -->
	<div class="absolute top-4 right-4 hidden flex-col gap-2 md:flex">
		{#each releases as release}
			<button
				class={`hover:bg-tertiary bg-black px-4 py-2 backdrop-blur-sm transition-colors ${
					selectedRelease === release ? 'bg-secondary text-black' : ''
				}`}
				on:click={() => selectRelease(release)}
			>
				{release.title}
			</button>
		{/each}
	</div>
</div>
