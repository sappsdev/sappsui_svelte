<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		label: string;
		onclose?: () => void;
		type?: 'solid' | 'soft';
		variant?: 'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'danger' | 'warning';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		startIcon?: IconName;
		endIcon?: IconName;
		shadow?: boolean;
	};

	const {
		label,
		onclose,
		type = 'solid',
		variant = 'primary',
		size = 'sm',
		class: className,
		startIcon,
		endIcon,
		shadow
	}: Props = $props();

	const types = {
		solid: 'chip--solid',
		soft: 'chip--soft'
	};

	const variants = {
		primary: 'chip--primary',
		secondary: 'chip--secondary',
		muted: 'chip--muted',
		success: 'chip--success',
		info: 'chip--info',
		warning: 'chip--warning',
		danger: 'chip--danger'
	};

	const sizes = {
		sm: 'chip--sm',
		md: 'chip--md',
		lg: 'chip--lg'
	};
</script>

<button
	onclick={() => onclose?.()}
	class={cn(
		'chip',
		types[type],
		variants[variant],
		sizes[size],
		shadow && 'chip--shadow',
		className
	)}
>
	{#if startIcon}
		<Icon class="chip__icon" name={startIcon} />
	{/if}
	<span>{label}</span>
	{#if endIcon}
		<Icon class="chip__icon" name={endIcon} />
	{/if}
</button>
