<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		class?: string;
		cover?: string;
		overlay?: boolean;
		divider?: boolean;
		shadow?: boolean;
		variant?: 'primary' | 'secondary' | 'muted' | 'surface' | 'outline' | 'ghost';
		headerClass?: string;
		footerClass?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
		solid?: boolean;
	};

	const {
		children,
		header,
		footer,
		class: className,
		cover,
		overlay,
		divider,
		shadow,
		variant = 'outline',
		headerClass,
		bodyClass,
		footerClass,
		coverClass,
		overlayClass,
		solid
	}: Props = $props();

	const variantClasses = {
		primary: 'is-primary',
		secondary: 'is-secondary',
		muted: 'is-muted',
		surface: 'is-surface',
		outline: 'is-outline',
		ghost: 'is-ghost'
	};
</script>

<div
	class={cn(
		'card',
		variantClasses[variant],
		divider && 'has-divider',
		shadow && 'has-shadow',
		solid && 'is-solid',
		className
	)}
>
	{#if cover}
		<img src={cover} alt="cover" class={cn('card-cover', coverClass)} />
	{/if}
	{#if overlay}
		<div class={cn('card-overlay', overlayClass)}></div>
	{/if}
	{#if header}
		<div class={cn('card-header', headerClass)}>
			{@render header()}
		</div>
	{/if}
	<div class={cn('card-body', bodyClass)}>
		{@render children()}
	</div>
	{#if footer}
		<div class={cn('card-footer', footerClass)}>
			{@render footer()}
		</div>
	{/if}
</div>
