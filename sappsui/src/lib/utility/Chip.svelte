<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		variant?: 'solid' | 'outline' | 'soft';
		color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'success' | 'warning' | 'error' | 'info';
		size?: 'tiny' | 'small' | 'medium' | 'large';
		label?: string;
		wide?: boolean;
	};

	const {
		class: className,
		variant = 'solid',
		color = 'primary',
		size = 'medium',
		label,
		wide
	}: Props = $props();

	const variants = {
		solid: 'chip-solid',
		outline: 'chip-outline',
		soft: 'chip-soft'
	};
	const colors = {
		primary: 'chip-primary',
		secondary: 'chip-secondary',
		accent: 'chip-accent',
		muted: 'chip-muted',
		success: 'chip-success',
		warning: 'chip-warning',
		error: 'chip-error',
		info: 'chip-info'
	};

	const sizes = {
		tiny: 'chip-tiny',
		small: 'chip-small',
		medium: 'chip-medium',
		large: 'chip-large'
	};
</script>

<div
	class={cn('chip', variants[variant], colors[color], sizes[size], wide && 'chip-wide', className)}
>
	{label}
</div>
