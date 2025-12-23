<script lang="ts">
	import { locale, t } from '$lib/i18n';

</script>

<section class="about-section" data-locale={$locale}>
    <p>{$t('about_content')}</p>
</section>

<style>
	.about-section p {
		padding: 2rem;
		max-width: 65ch;
		margin: 0 auto;
		line-height: 1.75;
		overflow-wrap: anywhere;
		word-break: normal;
		hyphens: auto;
		line-break: loose;
		white-space: normal;
	}

	.about-section[data-locale='zh'] p {
		text-align: center;
	}
</style>