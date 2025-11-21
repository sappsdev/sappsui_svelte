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
			| 'muted'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning'
			| 'outline'
			| 'ghost';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		startIcon?: IconName;
		endIcon?: IconName;
		loadingIcon?: IconName;
		loading?: boolean;
		wide?: boolean;
		disabled?: boolean;
		shadow?: boolean;
		solid?: boolean;
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
		shadow,
		solid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning',
		outline: 'is-outline',
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
			solid && 'is-solid',
			wide && 'has-wide',
			shadow && 'has-shadow',
			className
		)
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
