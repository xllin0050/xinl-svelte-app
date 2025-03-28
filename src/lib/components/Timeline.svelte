<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import type { Release } from '$lib/types';
	import releaseData from '$lib/data/releases.json';

	export let releases: Release[] = releaseData.releases;

	let container: HTMLDivElement;
	let selectedRelease: Release | null = null;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let planes: THREE.Mesh[] = [];
	let targetY = 0;
	let currentY = 0;
	let animationFrameId: number;

	onMount(() => {
		initThree();
		animate();

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			if (renderer) {
				renderer.dispose();
			}
		};
	});

	function initThree() {
		// 創建場景
		scene = new THREE.Scene();

		// 創建相機
		const aspect = container.clientWidth / container.clientHeight;
		camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
		camera.position.z = 3;

		// 創建渲染器
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		container.appendChild(renderer.domElement);

		// 創建專輯封面平面
		const geometry = new THREE.PlaneGeometry(1.5, 1.5);
		const textureLoader = new THREE.TextureLoader();

		releases.forEach((release, i) => {
			const texture = textureLoader.load(release.cover);
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
				opacity: 0.8
			});
			const plane = new THREE.Mesh(geometry, material);
			plane.position.set(0, -i * 2, 0);
			plane.userData = { release };
			planes.push(plane);
			scene.add(plane);
		});

		// 添加視窗調整事件監聽
		window.addEventListener('resize', onWindowResize);
	}

	function onWindowResize() {
		const aspect = container.clientWidth / container.clientHeight;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	function animate() {
		animationFrameId = requestAnimationFrame(animate);

		// 平滑相機移動
		currentY += (targetY - currentY) * 0.1;
		camera.position.y = currentY;

		// 平面旋轉動畫
		planes.forEach((plane) => {
			plane.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
		});

		renderer.render(scene, camera);
	}

	function selectRelease(release: Release) {
		selectedRelease = selectedRelease === release ? null : release;
		const index = releases.indexOf(release);
		if (index !== -1) {
			targetY = index * 2;
		}
	}
</script>

<div class="relative h-[400px] w-full">
	<div bind:this={container} class="absolute inset-0"></div>

	<!-- 專輯資訊顯示 -->
	{#if selectedRelease}
		<div
			class="absolute right-4 bottom-4 left-4 flex items-center justify-between bg-secondary p-4 backdrop-blur-sm"
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

	<!-- 側邊列表 -->
	<div class="absolute top-4 right-4 flex flex-col gap-2">
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

<style>
	:global(canvas) {
		touch-action: none;
	}
</style>
