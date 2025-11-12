<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
		href?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
		color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'success' | 'warning' | 'error' | 'info';
		size?: 'tiny' | 'small' | 'medium' | 'large';
		type?: 'button' | 'submit' | 'reset';
		loading?: boolean;
		loadingIcon?: string;
		wide?: boolean;
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;

	const {
		children,
		class: className,
		href,
		variant = 'solid',
		color = 'primary',
		size = 'medium',
		type = 'button',
		loading = false,
		loadingIcon = 'svg-spinners:3-dots-move',
		wide,
		...rest
	}: Props = $props();

	const variants = {
		solid: 'btn-solid',
		outline: 'btn-outline',
		soft: 'btn-soft',
		ghost: 'btn-ghost',
		link: 'btn-link'
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
	<a
		class={cn('btn', variants[variant], colors[color], sizes[size], wide && 'btn-wide', className)}
		{href}
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		tabindex="0"
		class={cn('btn', variants[variant], colors[color], sizes[size], wide && 'btn-wide', className)}
		{...rest}
	>
		{#if loading}
			<span class="btn-loading">
				<Icon icon={loadingIcon} class="loading-icon" />
			</span>
		{/if}
		<span class:invisible={loading}>
			{@render children()}
		</span>
	</button>
{/if}
