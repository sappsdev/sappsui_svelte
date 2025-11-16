<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { IconButton } from '$lib/index.js';
	import { theme } from '$lib/stores/theme.svelte.js';

	type Props = {
		iconDark?: IconName;
		iconLight?: IconName;
		variant?: 'primary' | 'secondary' | 'soft' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	let {
		iconDark = 'fluent:weather-moon-24-regular',
		iconLight = 'fluent:weather-sunny-24-regular',
		variant = 'ghost',
		size = 'md',
		class: className
	}: Props = $props();
</script>

<IconButton
	class={className}
	{variant}
	{size}
	onclick={theme.toggleTheme}
	icon={theme.isDark ? iconLight : iconDark}
/>
