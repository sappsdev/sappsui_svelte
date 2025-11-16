<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		src?: string;
		icon?: IconName;
		name?: string;
		alt?: string;
		color?:
			| 'primary'
			| 'secondary'
			| 'muted'
			| 'success'
			| 'warning'
			| 'error'
			| 'info'
			| 'transparent';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		outline?: boolean;
		class?: string;
	};

	const {
		src,
		icon,
		name,
		alt = 'Avatar',
		size = 'lg',
		color = 'primary',
		outline,
		class: className
	}: Props = $props();
</script>

<div class={cn('avatar', size, color, outline && 'outline', className)}>
	{#if src}
		<img {src} {alt} class="avatar-image" />
	{:else if icon}
		<Icon name={icon} class="avatar-icon" />
	{:else}
		<span class="avatar-name">{name?.charAt(0).toUpperCase() || alt.charAt(0).toUpperCase()}</span>
	{/if}
</div>
