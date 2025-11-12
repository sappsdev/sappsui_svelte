<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		contentClass?: string;
		coverClass?: string;
		overlayClass?: string;
		children: Snippet;
		cover?: string;
		overlay?: boolean;
		variant?: 'solid' | 'outline' | 'soft' | 'ghost';
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'accent' | 'muted';
	};

	const {
		class: className,
		contentClass,
		coverClass,
		overlayClass,
		cover,
		overlay,
		variant = 'solid',
		color = 'default',
		children
	}: Props = $props();

	const variants = {
		solid: 'section-solid',
		outline: 'section-outline',
		soft: 'section-soft',
		ghost: 'section-ghost'
	};
	const colors = {
		default: 'section-default',
		surface: 'section-surface',
		primary: 'section-primary',
		secondary: 'section-secondary',
		accent: 'section-accent',
		muted: 'section-muted'
	};
</script>

<div class={cn('section', variants[variant], colors[color], className)}>
	{#if cover}
		<img src={cover} alt="cover" class={cn('section-cover', coverClass)} />
	{/if}
	{#if overlay}
		<div class={cn('section-overlay', overlayClass)}></div>
	{/if}
	<div class={cn('section-content', contentClass)}>
		{@render children()}
	</div>
</div>
