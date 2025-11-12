<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		description?: string;
		icon?: string;
		children?: Snippet;
		showIcon?: boolean;
		status?: 'info' | 'success' | 'warning' | 'error';
		variant?: 'solid' | 'soft';
	};

	let {
		title,
		description,
		icon,
		children,
		showIcon,
		variant = 'soft',
		status = 'info'
	}: Props = $props();

	const statusIcons = {
		info: 'fluent:info-24-regular',
		success: 'fluent:checkmark-circle-24-regular',
		warning: 'fluent:warning-24-regular',
		error: 'fluent:dismiss-circle-24-regular'
	};

	const colors = {
		info: 'alert-info',
		success: 'alert-success',
		warning: 'alert-warning',
		error: 'alert-error'
	};

	const variants = {
		solid: 'alert-solid',
		soft: 'alert-soft'
	};
</script>

<div class={cn('alert', variants[variant], colors[status])}>
	{#if showIcon}
		<div class="alert-start">
			<Icon icon={icon ? icon : statusIcons[status]} class="alert-icon" />
		</div>
	{/if}
	<div class="alert-body">
		{#if title}
			<div class="alert-title">{title}</div>
		{/if}
		<div class="alert-description">
			{#if description}
				{description}
			{:else}
				{@render children?.()}
			{/if}
		</div>
	</div>
	<div class="alert-end"></div>
</div>
