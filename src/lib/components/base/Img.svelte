<script lang="ts">
	type Props = {
		src: string;
		alt?: string;
		size?: number | string;
		width?: number | string;
		height?: number | string;
		fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
		class?: string;
	};

	let {
		src,
		alt = '',
		size,
		width,
		height,
		fit = 'contain',
		class: className = '',
		...rest
	}: Props = $props();

	const toCssSize = (value: number | string | undefined) =>
		value == null ? undefined : typeof value === 'number' ? `${value}px` : value;

	const w = $derived(toCssSize(size) ?? toCssSize(width));
	const h = $derived(toCssSize(size) ?? toCssSize(height));
</script>

<span class={`img-wrapper ${className}`} style={`--img-w:${w ?? 'auto'};--img-h:${h ?? 'auto'};`}>
	<img {src} {alt} style={`object-fit:${fit};`} {...rest} />
</span>

<style>
	.img-wrapper {
		display: inline-block;
		width: var(--img-w);
		height: var(--img-h);
		line-height: 0;
	}

	.img-wrapper img {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
