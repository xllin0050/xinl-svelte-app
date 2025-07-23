<script lang="ts">
	import { createTimeline } from 'animejs';
	import { onMount, tick } from 'svelte';

	import Section from './base/Section.svelte';

	import type { Release } from '$lib/types';
	import releaseData from '$lib/data/releases.json';

	export let isExpanded: boolean;
	export let onToggle: () => void;

	let releases: Release[] = [];

	onMount(() => {
		releases = [...releaseData.releases].reverse();
	});

	$: if (isExpanded) {
		tick().then(() => {
			createTimeline().add('.release-item', {
				scale: { from: 0.8 },
				duration: 800
			});
		});
	}
</script>

<Section title="release" {isExpanded} {onToggle}>
	{#each releases as release (release.id)}
		<div class="release-item flex flex-col items-center pb-16">
			<div
				class="border-pearl-white flex w-full items-center justify-between border-b text-xl"
			>
				<h3>{release.title}</h3>
				<time datetime={new Date(release.date).toISOString()}
					>{release.date}</time
				>
			</div>
			<div class="flex w-full flex-row items-center gap-4 md:flex-col">
				<ul
					class="text-cream-white flex w-1/2 flex-col justify-center gap-4 py-4 text-xl md:w-full md:flex-row"
				>
					{#each Object.entries(release.streamLinks) as [platform, link]}
						<li>
							<a
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={platform}
								class="hover:text-pearl-white inline-flex transition-colors"
							>
								{platform}
							</a>
						</li>
					{/each}
				</ul>
				<div
					class="aspect-square w-[100px] bg-cover bg-center md:w-[200px]"
					style="background-image: url({release.cover})"
					role="img"
					aria-label={`${release.title} cover`}
				></div>
			</div>
		</div>
	{/each}
</Section>

<style>
	/* 可以添加組件作用域的樣式 */
	a {
		transition: opacity 0.2s ease;
	}
	a:hover {
		opacity: 0.8;
	}
</style>
