<script lang="ts">
	import { Icon } from '$lib/index.js';
	import type { IconName } from '$lib/types.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		icon: IconName;
		onclick?: () => void;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'outlined'
			| 'ghost'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		isLoading?: boolean;
		isDisabled?: boolean;
		hasShadow?: boolean;
		isSolid?: boolean;
	};

	const {
		icon,
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		isLoading = false,
		isDisabled,
		hasShadow,
		isSolid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outlined: 'is-outlined',
		ghost: 'is-ghost',
		success: 'is-success',
		info: 'is-info',
		danger: 'is-danger',
		warning: 'is-warning'
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
			'has-icon',
			variantClasses[variant],
			sizeClasses[size],
			isSolid && 'is-solid',
			hasShadow && 'has-shadow',
			className
		)
	);
	let btnClasses = $derived(cn('btn-icon', isLoading && 'invisible'));
</script>

{#if href}
	<a class={baseClasses} {href}>
		<Icon class={btnClasses} name={icon} />
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
				<Icon name="svg-spinners:gooey-balls-2" class="loading-icon" />
			</span>
		{/if}
		<Icon class={btnClasses} name={icon} />
	</button>
{/if}
