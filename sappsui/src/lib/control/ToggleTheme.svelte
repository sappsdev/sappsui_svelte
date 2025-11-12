<script lang="ts">
	import { IconButton } from '$lib/index.js';
	import { theme } from '$lib/stores/theme.svelte.js';

	type Props = {
		iconDark?: string;
		iconLight?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'ghost';
		color?: 'primary' | 'secondary' | 'accent';
		size?: 'tiny' | 'small' | 'medium' | 'large';
		class?: string;
	};

	let {
		iconDark = 'fluent:weather-moon-24-regular',
		iconLight = 'fluent:weather-sunny-24-regular',
		variant = 'ghost',
		color = 'primary',
		size = 'small',
		class: className
	}: Props = $props();
</script>

<IconButton
	{variant}
	{size}
	{color}
	onclick={theme.toggleTheme}
	icon={theme.isDark ? iconLight : iconDark}
/>
