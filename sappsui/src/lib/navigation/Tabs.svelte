<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, type Snippet } from 'svelte';

	type Tab = {
		id: string;
		label: string;
		icon?: string;
		content: Snippet | string;
	};
	type Props = {
		tabs: Tab[];
		position?: 'top' | 'bottom' | 'start' | 'end';
		variant?: 'solid' | 'pill' | 'outline' | 'underlined' | 'ghost';
		color?: 'primary' | 'secondary';
		class?: string;
		tabListClass?: string;
		tabClass?: string;
		tabContentClass?: string;
	};
	const {
		class: className,
		tabClass,
		tabListClass,
		tabContentClass,
		tabs,
		variant = 'solid',
		color = 'primary',
		position = 'top'
	}: Props = $props();
	let activeTab = $state(tabs[0]);
	let ready = $state(false);
	let direction = $state<'left' | 'right'>('right');
	const tabRefs: HTMLDivElement[] = [];
	let indicatorStyle = $state({
		left: '0px',
		width: '0px',
		top: '0px',
		height: '0px'
	});

	const variants = {
		solid: 'tabs-solid',
		outline: 'tabs-outline',
		ghost: 'tabs-ghost',
		pill: 'tabs-pill',
		underlined: 'tabs-underlined'
	};
	const colors = {
		primary: 'tabs-primary',
		secondary: 'tabs-secondary'
	};

	const positions = {
		top: 'tabs-top',
		bottom: 'tabs-bottom',
		start: 'tabs-start',
		end: 'tabs-end'
	};

	function handleTabChange(tab: Tab, index: number) {
		const currentIndex = tabs.findIndex((t) => t.id === activeTab.id);
		const newIndex = tabs.findIndex((t) => t.id === tab.id);
		direction = newIndex > currentIndex ? 'right' : 'left';
		activeTab = tab;
		updateIndicator(index);
	}

	function updateIndicator(index: number) {
		const tabElement = tabRefs[index];
		if (tabElement) {
			const isVertical = position === 'start' || position === 'end';
			if (isVertical) {
				if (variant === 'underlined') {
					indicatorStyle = {
						left: 'auto',
						width: '2px',
						top: `${tabElement.offsetTop}px`,
						height: `${tabElement.offsetHeight}px`
					};
				} else {
					indicatorStyle = {
						left: '5%',
						width: '90%',
						top: `${tabElement.offsetTop}px`,
						height: `${tabElement.offsetHeight}px`
					};
				}
			} else {
				indicatorStyle = {
					left: `${tabElement.offsetLeft}px`,
					width: `${tabElement.offsetWidth}px`,
					top: '10%',
					height: '80%'
				};
			}
		}
	}

	$effect(() => {
		const index = tabs.findIndex((t) => t.id === activeTab.id);
		updateIndicator(index);
	});
	onMount(() => {
		setTimeout(() => {
			ready = true;
		}, 50);
	});
</script>

<div class={cn('tabs', positions[position], className)}>
	<div class={cn('tabs-list', variants[variant], colors[color], tabListClass)}>
		<div
			class="tabs-indicator"
			class:is-ready={ready}
			style="left: {indicatorStyle.left}; width: {indicatorStyle.width}; top: {indicatorStyle.top}; height: {indicatorStyle.height};"
		></div>
		{#each tabs as tab, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={tabRefs[i]}
				class:is-active={activeTab.id === tab.id}
				class={cn('tab', tabClass)}
				onclick={() => handleTabChange(tab, i)}
			>
				{#if tab.icon}
					<span class="tabs-icon">{tab.icon}</span>
				{/if}
				<span class="tabs-label">{tab.label}</span>
			</div>
		{/each}
	</div>
	<div class={cn('tabs-wrapper', tabContentClass)}>
		{#key activeTab.id}
			<div class={cn('tabs-content', direction)}>
				{#if typeof activeTab.content === 'string'}
					{activeTab.content}
				{:else}
					{@render activeTab.content()}
				{/if}
			</div>
		{/key}
	</div>
</div>
