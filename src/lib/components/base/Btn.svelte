<script lang="ts">
	let { children, class: className = '', type = 'button', disabled = false, onclick, ...rest } = $props();
</script>

<button
	class={`btn-48 ${className}`}
	type={type as 'button' | 'submit' | 'reset' | undefined}
	{disabled}
	{onclick}
	{...rest}
>
	<span class="text">{@render children()}</span>
</button>

<style>
	.btn-48 {
		appearance: none;
		background-color: var(--bg-color);
		border-width: 0;
		box-sizing: border-box;
		color: var(--text-color);
		cursor: pointer;
		display: inline-block;
		font-family: var(--font-ui);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0;
		line-height: 1em;
		margin: 0;
		opacity: 1;
		outline: 0;
		padding: 1.1em 1.6em;
		position: relative;
		text-align: center;
		text-decoration: none;
		text-rendering: geometricprecision;
		text-transform: uppercase;
		transition:
			opacity 300ms cubic-bezier(0.694, 0, 0.335, 1),
			background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
			color 100ms cubic-bezier(0.694, 0, 0.335, 1);
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: baseline;
		white-space: nowrap;
	}

	.btn-48:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.btn-48:disabled::before {
		background-color: var(--color-gray-3);
	}

	.btn-48::before {
		animation: opacityFallbackOut 0.5s step-end forwards;
		backface-visibility: hidden;
		background-color: var(--color-gray-3);
		clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
		content: '';
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transform: translateZ(0);
		transition: clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		width: 100%;
	}

	.btn-48:hover::before {
		animation: opacityFallbackIn 0s step-start forwards;
		clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
	}

	.btn-48::after {
		background-color: var(--bg-color);
	}

	.btn-48 .text {
		z-index: 1;
		position: relative;
	}

	@keyframes opacityFallbackIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes opacityFallbackOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>