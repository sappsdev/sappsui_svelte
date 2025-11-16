<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		label: string;
		onclick?: () => void;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'primary'
			| 'secondary'
			| 'soft'
			| 'ghost'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		startIcon?: IconName;
		endIcon?: IconName;
		loadingIcon?: IconName;
		loading?: boolean;
		wide?: boolean;
		disabled?: boolean;
		shadow?: boolean;
	};

	const {
		label,
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		startIcon,
		endIcon,
		loadingIcon = 'svg-spinners:3-dots-move',
		loading = false,
		wide = false,
		disabled,
		shadow
	}: Props = $props();

	let baseClasses = $derived(
		cn('btn', variant, size, wide && 'wide', shadow && 'shadow', className)
	);
	let btnClasses = $derived(cn('btn-icon', loading && 'invisible'));
</script>

{#if href}
	<a class={baseClasses} {href}>
		{#if startIcon}
			<Icon class="btn-icon" name={startIcon} />
		{/if}
		<span>{label}</span>
		{#if endIcon}
			<Icon class="btn-icon" name={endIcon} />
		{/if}
	</a>
{:else}
	<button {type} {onclick} disabled={disabled || loading} class={baseClasses} aria-busy={loading}>
		{#if loading}
			<span class="btn-loading">
				<Icon name={loadingIcon} class="loading-icon" />
			</span>
		{/if}
		{#if startIcon}
			<Icon class={btnClasses} name={startIcon} />
		{/if}
		<span class:invisible={loading}>{label}</span>
		{#if endIcon}
			<Icon class={btnClasses} name={endIcon} />
		{/if}
	</button>
{/if}
