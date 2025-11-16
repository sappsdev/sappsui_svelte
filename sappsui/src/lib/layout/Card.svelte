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
		hover?: boolean;
		shadow?: boolean;
		variant?: 'primary' | 'secondary' | 'surface' | 'outline' | 'soft' | 'ghost';
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
		divider,
		hover,
		shadow,
		variant = 'outline',
		headerClass,
		bodyClass,
		footerClass,
		coverClass,
		overlayClass
	}: Props = $props();
</script>

<div class={cn('card', variant, divider && 'divider', shadow && 'shadow', className)}>
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
