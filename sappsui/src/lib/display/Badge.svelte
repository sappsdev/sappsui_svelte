<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		text: string;
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger';
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		class?: string;
	};

	let {
		text,
		children,
		variant = 'primary',
		position = 'top-right',
		class: className
	}: Props = $props();

	const positions = {
		'top-left': 'badge--top-left',
		'top-right': 'badge--top-right',
		'bottom-left': 'badge--bottom-left',
		'bottom-right': 'badge--bottom-right'
	};

	const variants = {
		primary: 'badge--primary',
		secondary: 'badge--secondary',
		muted: 'badge--muted',
		success: 'badge--success',
		info: 'badge--info',
		warning: 'badge--warning',
		danger: 'badge--danger'
	};
</script>

<div class={cn('badge', positions[position], variants[variant])}>
	{@render children()}
	<div class="badge__content">
		<span class="badge__content-text">
			{text}
		</span>
	</div>
</div>
