<script lang="ts">
	import { icons, type IconName } from '$lib/assets/icons/index.js';

	type Props = {
		name: IconName;
		class?: string;
	};
	const { name, class: className }: Props = $props();
</script>

<svg
	viewBox={name && name.startsWith('circle-flags:') ? '0 0 512 512' : '0 0 24 24'}
	class={className}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icons[name]}
</svg>
