<script lang="ts">
	type Props = {
		name: string;
		size?: number | string;
		class?: string;
		ariaLabel?: string;
	};

	let { name, size = 20, class: className = '', ariaLabel, ...rest }: Props = $props();

	const modules = import.meta.glob('$lib/assets/*.svg', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	const byName: Record<string, string> = {};
	for (const [path, raw] of Object.entries(modules)) {
		const file = path.split('/').pop();
		if (!file) continue;
		const key = file.replace(/\.svg$/i, '');
		byName[key] = raw;
	}

	const sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
	const svgRaw = $derived(byName[name] ?? '');
</script>

<span
	class={`icon ${className}`}
	style={`--icon-size: ${sizeValue};`}
	role="img"
	aria-label={ariaLabel}
	aria-hidden={ariaLabel ? undefined : 'true'}
	{...rest}
>
	{@html svgRaw}
</span>

<style>
	.icon {
		display: inline-block;
		width: var(--icon-size);
		height: var(--icon-size);
		line-height: 0;
	}

	.icon :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.icon :global(svg *[fill]) {
		fill: currentColor;
	}

	.icon :global(svg *[stroke]) {
		stroke: currentColor;
	}
</style>