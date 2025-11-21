<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Avatar } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		id?: string | number;
		label: string;
		description?: string;
		icon?: IconName;
		src?: string;
		variant?: 'ghost' | 'outline' | 'surface' | 'primary' | 'secondary' | 'muted';
		size?: 'sm' | 'md' | 'lg';
		status?: 'online' | 'offline' | 'busy' | 'away';
		href?: string;
		disabled?: boolean;
		active?: boolean;
		compact?: boolean;
		divider?: boolean;
		shadow?: boolean;
		onclick?: (id: string | number) => void;
		actions?: Snippet;
		solid?: boolean;
	};

	let {
		id,
		label,
		description,
		icon,
		src,
		variant = 'ghost',
		size = 'md',
		status,
		href,
		disabled = false,
		active = false,
		compact = false,
		divider = false,
		shadow = false,
		onclick,
		actions,
		solid
	}: Props = $props();

	const variantClasses = {
		ghost: 'is-ghost',
		outline: 'is-outline',
		surface: 'is-surface',
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted'
	};

	const sizeClasses = {
		sm: 'is-sm',
		md: 'is-md',
		lg: 'is-lg'
	};

	const avatarSizes: Record<string, 'sm' | 'md' | 'lg' | 'xl'> = {
		sm: 'md',
		md: 'lg',
		lg: 'xl'
	};

	const isInteractive = $derived(!!href || !!onclick);

	let itemClasses = $derived(
		cn(
			'item',
			variantClasses[variant],
			sizeClasses[size],
			isInteractive && !disabled && 'is-interactive',
			active && 'on-active',
			disabled && 'is-disabled',
			compact && 'is-compact',
			divider && 'has-divider',
			shadow && 'has-shadow',
			solid && 'is-solid',
			(icon || src) && !label && !description && 'has-icon-only'
		)
	);
</script>

{#snippet itemContent()}
	{#if icon || src}
		<Avatar {icon} {src} {status} size={avatarSizes[size]} />
	{/if}
	<div class="item-body">
		<div class="item-label">{label}</div>
		{#if description}
			<div class="item-description">{description}</div>
		{/if}
	</div>
	{#if actions}
		<div class="item-actions">
			{@render actions()}
		</div>
	{/if}
{/snippet}

{#if href && !disabled}
	<a {href} class={itemClasses} aria-disabled={disabled}>
		{@render itemContent()}
	</a>
{:else if onclick && id && !disabled}
	<button type="button" class={itemClasses} onclick={() => onclick(id)} {disabled}>
		{@render itemContent()}
	</button>
{:else}
	<div class={itemClasses} aria-disabled={disabled} aria-selected={active}>
		{@render itemContent()}
	</div>
{/if}
