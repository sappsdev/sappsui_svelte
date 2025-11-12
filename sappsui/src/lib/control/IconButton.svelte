<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		icon: string;
		class?: string;
		href?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'ghost';
		color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'success' | 'warning' | 'error' | 'info';
		size?: 'tiny' | 'small' | 'medium' | 'large';
		type?: 'button' | 'submit' | 'reset';
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;
	let {
		class: className,
		icon,
		href,
		variant = 'solid',
		color = 'primary',
		size = 'medium',
		type = 'button',
		...rest
	}: Props = $props();

	const variants = {
		solid: 'btn-solid',
		outline: 'btn-outline',
		soft: 'btn-soft',
		ghost: 'btn-ghost'
	};
	const colors = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		muted: 'btn-muted',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error',
		info: 'btn-info'
	};
	const sizes = {
		tiny: 'btn-tiny',
		small: 'btn-small',
		medium: 'btn-medium',
		large: 'btn-large'
	};
</script>

{#if href}
	<a class={cn('btn', variants[variant], colors[color], sizes[size], className)} {href} {...rest}>
		<Icon {icon} class="btn-icon" />
	</a>
{:else}
	<button
		{type}
		tabindex="0"
		class={cn('btn', variants[variant], colors[color], sizes[size], className)}
		{...rest}
	>
		<Icon {icon} class="btn-icon" />
	</button>
{/if}
