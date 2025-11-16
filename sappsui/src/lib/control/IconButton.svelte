<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		icon: IconName;
		onclick?: () => void;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		variant?:
			| 'primary'
			| 'secondary'
			| 'soft'
			| 'ghost'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		class?: string;
		loading?: boolean;
		disabled?: boolean;
		shadow?: boolean;
	};

	const {
		icon,
		onclick,
		href,
		type = 'button',
		variant = 'primary',
		size = 'md',
		class: className,
		loading = false,
		disabled,
		shadow
	}: Props = $props();

	let baseClasses = $derived(cn('btn', 'icon', variant, size, shadow && 'shadow', className));
	let btnClasses = $derived(cn('btn-icon', loading && 'invisible'));
</script>

{#if href}
	<a class={baseClasses} {href}>
		<Icon class={btnClasses} name={icon} />
	</a>
{:else}
	<button {type} {onclick} disabled={disabled || loading} class={baseClasses} aria-busy={loading}>
		{#if loading}
			<span class="btn-loading">
				<Icon name="svg-spinners:gooey-balls-2" class="loading-icon" />
			</span>
		{/if}
		<Icon class={btnClasses} name={icon} />
	</button>
{/if}
