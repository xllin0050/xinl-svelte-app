<script lang="ts">
	import Icon from '$lib/components/base/Icon.svelte';

	type SocialLink = {
		name: string;
		href: string;
		label: string;
	};

	const socialLinks: SocialLink[] = [
		{
			name: 'bandcamp',
			href: 'https://xinl.bandcamp.com',
			label: 'visit bandcamp'
		},
		{
			name: 'mail',
			href: 'mailto:xinlprod@pm.me',
			label: 'drop me an email'
		},
	];
</script>

<section class="contact-section">
    	<div class="social-links">
		{#each socialLinks as { name, href, label }}
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class=""
				aria-label={label}
			>
				<Icon name={name} size={24} ariaLabel={label} />
				<span class="visually-hidden">{name}</span>
			</a>
		{/each}
	</div>
</section>

<style>
	.contact-section {
	    grid-area: contact;
		padding: .5em 0;
	}
	.social-links {
		display: flex;
		justify-content: center;
		gap: 1em;
	}
	/* 添加平滑過渡效果 */
	a {
		display: inline-flex;
		align-items: center;
		color: var(--text-color);
		will-change: transform;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
