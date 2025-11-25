<script lang="ts">
	import { Icon } from '$lib/index.js';
	import type { IconName } from '$lib/types.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		label: string;
		onclick?: () => void;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning'
			| 'outlined'
			| 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		startIcon?: IconName;
		endIcon?: IconName;
		loadingIcon?: IconName;
		isLoading?: boolean;
		isWide?: boolean;
		isDisabled?: boolean;
		hasShadow?: boolean;
		isSolid?: boolean;
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
		isLoading,
		isWide,
		isDisabled,
		hasShadow,
		isSolid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		outlined: 'is-outlined',
		ghost: 'is-ghost'
	};

	const sizeClasses = {
		xs: 'is-xs',
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	let baseClasses = $derived(
		cn(
			'btn',
			variantClasses[variant],
			sizeClasses[size],
			isSolid && 'is-solid',
			isWide && 'has-wide',
			hasShadow && 'has-shadow',
			className
		)
	);
	let btnClasses = $derived(cn('btn-icon', isLoading && 'invisible'));
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
	<button
		{type}
		{onclick}
		disabled={isDisabled || isLoading}
		class={baseClasses}
		aria-busy={isLoading}
	>
		{#if isLoading}
			<span class="btn-loading">
				<Icon name={loadingIcon} class="loading-icon" />
			</span>
		{/if}
		{#if startIcon}
			<Icon class={btnClasses} name={startIcon} />
		{/if}
		<span class:invisible={isLoading}>{label}</span>
		{#if endIcon}
			<Icon class={btnClasses} name={endIcon} />
		{/if}
	</button>
{/if}
