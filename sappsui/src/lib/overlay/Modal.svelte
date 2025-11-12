<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	type Props = {
		open: boolean;
		onclose?: () => void;
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		class?: string;
		headerClass?: string;
		footerClass?: string;
		contentClass?: string;
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'accent' | 'muted';
	};

	const {
		open = $bindable(),
		onclose,
		header,
		footer,
		children,
		class: className,
		headerClass,
		contentClass,
		footerClass,
		color = 'default'
	}: Props = $props();

	let openContent = $state(false);

	const colors = {
		default: 'modal-default',
		surface: 'modal-surface',
		primary: 'modal-primary',
		secondary: 'modal-secondary',
		accent: 'modal-accent',
		muted: 'modal-muted'
	};

	$effect(() => {
		if (open) {
			setTimeout(() => {
				openContent = true;
			}, 20);
		} else {
			openContent = false;
		}
	});
</script>

{#if open}
	<div transition:fade class="modal-dialog" use:popover>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal-overlay" onclick={onclose}></div>
		{#if openContent}
			<div in:scale={{ duration: 100 }} class={cn('modal', colors[color], className)}>
				{#if header}
					<div class={cn('modal-header', headerClass)}>
						{@render header()}
					</div>
				{/if}
				<div class={cn('modal-content', contentClass)}>
					{@render children()}
				</div>
				{#if footer}
					<div class={cn('modal-footer', footerClass)}>
						{@render footer()}
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
