<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
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
			| 'outline'
			| 'ghost'
			| 'success'
			| 'info'
			| 'warning'
			| 'danger';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		loading?: boolean;
		disabled?: boolean;
		shadow?: boolean;
		solid?: boolean;
	};

	const {
		icon,
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		loading = false,
		disabled,
		shadow,
		solid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		outline: 'is-outline',
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
			solid && 'is-solid',
			shadow && 'has-shadow',
			className
		)
	);
	let btnClasses = $derived(cn('btn-icon', loading && 'invisible'));
</script>

{#if href}
	<a class={baseClasses} {href}>
		<Icon class={btnClasses} name={icon} />
	</a>
{:else}
	<button {type} {onclick} disabled={disabled || loading} class={baseClasses} aria-busy={loading}>
		{#if loading}
			<span class="btn-loading">
				<Icon name="svg-spinners:gooey-balls-2" class="loading-icon" />
			</span>
		{/if}
		<Icon class={btnClasses} name={icon} />
	</button>
{/if}
