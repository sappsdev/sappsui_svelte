<script lang="ts">
	import Icon from '@iconify/svelte';
	type Props = {
		icon: string;
		class?: string;
		onclick?: () => void;
	};
	const { icon, class: className, onclick }: Props = $props();
</script>

<Icon {icon} class={className} {onclick} />
