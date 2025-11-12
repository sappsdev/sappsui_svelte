<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src?: string;
		icon?: string;
		name?: string;
		alt?: string;
		color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'success' | 'warning' | 'error' | 'info';
		size?: 'tiny' | 'small' | 'medium' | 'large' | 'extra';
		outline?: boolean;
		class?: string;
	};

	const {
		src,
		icon,
		name,
		alt = 'Avatar',
		size = 'large',
		color = 'primary',
		outline,
		class: className
	}: Props = $props();

	const colors = {
		primary: 'avatar-primary',
		secondary: 'avatar-secondary',
		accent: 'avatar-accent',
		muted: 'avatar-muted',
		success: 'avatar-success',
		warning: 'avatar-warning',
		error: 'avatar-error',
		info: 'avatar-info'
	};

	const sizes = {
		tiny: 'avatar-tiny',
		small: 'avatar-small',
		medium: 'avatar-medium',
		large: 'avatar-large',
		extra: 'avatar-extra'
	};
</script>

<div class={cn('avatar', sizes[size], colors[color], outline && 'avatar-outline', className)}>
	{#if src}
		<img {src} {alt} class="avatar-image" />
	{:else if icon}
		<Icon {icon} class="avatar-icon" />
	{:else}
		<span class="avatar-name">{name?.charAt(0).toUpperCase() || alt.charAt(0).toUpperCase()}</span>
	{/if}
</div>
