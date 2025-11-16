<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		bodyClass?: string;
		coverClass?: string;
		overlayClass?: string;
		children: Snippet;
		cover?: string;
		overlay?: boolean;
		variant?: 'solid' | 'soft';
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'muted';
	};

	const {
		class: className,
		bodyClass,
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
		soft: 'section-soft'
	};
	const colors = {
		default: 'section-default',
		surface: 'section-surface',
		primary: 'section-primary',
		secondary: 'section-secondary',
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
	<div class={cn('section-body', bodyClass)}>
		{@render children()}
	</div>
</div>
