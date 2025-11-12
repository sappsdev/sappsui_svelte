<script lang="ts" generics="T">
	import { onMount, type Snippet } from 'svelte';

	interface Option<T> {
		icon?: string;
		label: string;
		description?: string;
		href?: string;
		onclick?: (option: Option<T>) => void;
	}

	type Props = {
		options: Option<T>[];
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
	};

	const { children, header, footer, options }: Props = $props();

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false
	});
	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const updatePosition = () => {
		if (!controlElement || !contentEl) return;

		const rect = controlElement.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const contentHeight = contentEl.getBoundingClientRect().height;
		const contentWidth = contentEl?.getBoundingClientRect().width;
		const centerX = rect.left + rect.width / 2;
		const isBottomHalf = rect.top + rect.height / 2 > windowHeight / 2;
		const isRightHalf = centerX > window.innerWidth / 2;

		const top = isBottomHalf ? rect.top - contentHeight - 8 : rect.top + rect.height;
		const left = isRightHalf
			? rect.left - contentWidth + rect.width + window.scrollX
			: rect.left + window.scrollX;
		position = {
			top: top,
			left: left,
			width: 'auto',
			isBottomHalf
		};
	};

	const toggleDropdown = () => {
		if (!isOpen) {
			startEventListeners();
			updatePosition();
			isOpen = true;
		} else {
			stopEventListeners();
			isOpen = false;
		}
	};

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!contentEl?.contains(event.target as Node)
		) {
			isOpen = false;
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleKeyDown);
	};

	onMount(() => {
		return () => stopEventListeners();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown" bind:this={controlElement} onclick={toggleDropdown}>
	{@render children()}
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:is-open={isOpen}
	class="dropdown-popover"
	bind:this={contentEl}
	{style}
	onclick={() => (isOpen = false)}
>
	{@render header?.()}
	<ul class="dropdown-options" bind:this={optionsEl}>
		{#each options as item}
			<li>
				{#if item.href}
					<a href={item.href} class="dropdown-options-item">
						<div class="field-options-item-content">
							<div class="field-options-item-label">
								{item.label}
							</div>
							{#if item.description}
								<div class="field-options-item-description">
									{item.description}
								</div>
							{/if}
						</div>
					</a>
				{:else}
					<button type="button" class="dropdown-options-item" onclick={() => item.onclick?.(item)}>
						<div class="dropdown-options-item-content">
							<div class="dropdown-options-item-label">
								{item.label}
							</div>
							{#if item.description}
								<div class="dropdown-options-item-description">
									{item.description}
								</div>
							{/if}
						</div>
					</button>
				{/if}
			</li>
		{/each}
	</ul>
	{@render footer?.()}
</div>
