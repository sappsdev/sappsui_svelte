<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		start?: Snippet;
		center?: Snippet;
		end?: Snippet;
		class?: string;
		contentClass?: string;
		startClass?: string;
		centerClass?: string;
		endClass?: string;
	};

	const {
		start,
		center,
		end,
		class: className,
		contentClass,
		startClass,
		centerClass,
		endClass
	}: Props = $props();
</script>

<header class={cn('appbar', className)}>
	<div class={cn('appbar-content', contentClass)}>
		{#if start}
			<div class={cn('appbar-start', startClass)}>
				{@render start()}
			</div>
		{/if}
		{#if center}
			<div class={cn('appbar-center', centerClass)}>
				{@render center()}
			</div>
		{/if}
		{#if end}
			<div class={cn('appbar-end', endClass)}>
				{@render end()}
			</div>
		{/if}
	</div>
</header>
