<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';

	type Props = {
		open: boolean;
		onclose?: () => void;
		position?: 'start' | 'end' | 'top' | 'bottom';
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		class?: string;
		headerClass?: string;
		footerClass?: string;
		contentClass?: string;
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'muted';
	};

	let {
		open = $bindable(),
		onclose,
		position = 'start',
		header,
		footer,
		children,
		class: className,
		headerClass,
		contentClass,
		footerClass,
		color = 'default'
	}: Props = $props();

	const positionClasses = {
		start: 'drawer-start',
		end: 'drawer-end',
		top: 'drawer-top',
		bottom: 'drawer-bottom'
	};

	const colors = {
		default: 'modal-default',
		surface: 'modal-surface',
		primary: 'modal-primary',
		secondary: 'modal-secondary',
		muted: 'modal-muted'
	};

	let openDrawer = $state(false);
	let openContent = $state(false);

	$effect(() => {
		afterNavigate(() => {
			if (open) {
				open = false;
			}
		});
	});

	$effect(() => {
		if (open) {
			openDrawer = true;
			setTimeout(() => {
				openContent = true;
			}, 100);
		} else {
			openContent = false;
			setTimeout(() => {
				openDrawer = false;
			}, 300);
		}
	});
</script>

{#if openDrawer}
	<div transition:fade class="drawer-panel" use:popover>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="drawer-overlay" onclick={onclose}></div>
		<div
			class={cn('drawer', positionClasses[position], colors[color], className)}
			class:drawer-open={openContent}
		>
			{#if header}
				<div class={cn('drawer-header', headerClass)}>
					{@render header()}
				</div>
			{/if}
			<div class={cn('drawer-body', contentClass)}>
				{@render children()}
			</div>
			{#if footer}
				<div class={cn('drawer-footer', footerClass)}>
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}
