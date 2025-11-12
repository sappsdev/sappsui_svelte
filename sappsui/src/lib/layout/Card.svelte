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
		variant?: 'solid' | 'outline' | 'soft' | 'ghost';
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'accent' | 'muted';
		headerClass?: string;
		footerClass?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
	};

	const {
		children,
		header,
		footer,
		class: className,
		cover,
		overlay,
		variant = 'outline',
		color = 'default',
		headerClass,
		bodyClass,
		footerClass,
		coverClass,
		overlayClass
	}: Props = $props();

	const variants = {
		solid: 'card-solid',
		outline: 'card-outline',
		soft: 'card-soft',
		ghost: 'card-ghost'
	};
	const colors = {
		default: 'card-default',
		surface: 'card-surface',
		primary: 'card-primary',
		secondary: 'card-secondary',
		accent: 'card-accent',
		muted: 'card-muted'
	};
</script>

<div class={cn('card', variants[variant], colors[color], className)}>
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
