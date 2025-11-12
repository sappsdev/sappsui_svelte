<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		vertical?: boolean;
		color?: 'primary' | 'secondary' | 'accent';
	};

	let { children, class: className, vertical, color }: Props = $props();

	const colors = {
		primary: 'divider-primary',
		secondary: 'divider-secondary',
		accent: 'divider-accent'
	};
</script>

<div
	class={cn(
		vertical ? 'divider-vertical' : 'divider-horizontal',
		color && colors[color],
		className
	)}
>
	{@render children?.()}
</div>
