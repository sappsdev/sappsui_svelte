<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Avatar, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Option = {
		id: string | number;
		label: string;
		description?: string;
		icon?: IconName;
		src?: string;
	};

	type Props = {
		options: Option[];
		value?: unknown;
		selected?: Option;
		placeholder?: string;
		onchange?: (value: unknown) => void;
		variant?: 'primary' | 'secondary' | 'soft' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name: string;
		class?: string;
		label?: string;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
		floatLabel?: boolean;
	};

	let {
		class: className,
		options = [],
		value = $bindable(),
		selected = $bindable(),
		placeholder = 'Select an option',
		onchange,
		variant = 'primary',
		size = 'md',
		name,
		label,
		labelActive,
		helpText,
		errorText,
		floatLabel
	}: Props = $props();

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
	let focusedIndex = $state(-1);
	let searchTerm = $state('');
	let searchTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let position = $state({
		top: 0,
		left: 0,
		width: 0,
		isBottomHalf: false
	});

	let isActive = $state(false);
	let isFocused = $state(false);

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const getItems = () => contentEl?.querySelectorAll('select__option') ?? [];

	const updatePosition = async () => {
		if (!controlElement || !contentEl) return;

		const rect = controlElement.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		const contentHeight = contentEl.getBoundingClientRect().height;
		const isBottomHalf = rect.top + rect.height / 2 > windowHeight / 2;

		const top = isBottomHalf ? rect.top - contentHeight - 8 : rect.top + rect.height;
		position = {
			top: top,
			left: rect.left + window.scrollX,
			width: rect.width,
			isBottomHalf
		};
	};

	const scrollToItem = (index: number) => {
		const items = getItems();
		const target = items[index] as HTMLElement;
		if (!target || !optionsEl) return;

		const containerHeight = optionsEl.clientHeight;
		const itemTop = target.offsetTop;
		const itemHeight = target.clientHeight;

		if (itemTop > containerHeight * 0.7) {
			optionsEl.scrollTop = itemTop - containerHeight + itemHeight + 40;
		} else {
			target.scrollIntoView({ block: 'nearest' });
		}
	};

	const updateFocusedItemVisuals = () => {
		const items = getItems();
		items.forEach((el, i) => {
			(el as HTMLElement).dataset.focused = i === focusedIndex ? '1' : '0';
		});
	};

	const removeFocusedItemVisuals = () => {
		const items = getItems();
		items.forEach((el) => {
			(el as HTMLElement).dataset.focused = '0';
		});
	};

	const resetSearch = () => {
		searchTerm = '';
		if (searchTimeout) {
			clearTimeout(searchTimeout);
			searchTimeout = null;
		}
	};

	const handleSearch = () => {
		const items = getItems();
		const foundIndex = Array.from(items).findIndex((el) =>
			el.textContent?.toLowerCase().includes(searchTerm)
		);

		if (foundIndex !== -1) {
			focusedIndex = foundIndex;
			updateFocusedItemVisuals();
			scrollToItem(focusedIndex);
		}

		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(resetSearch, 1500);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;

		const items = getItems();
		if (!items.length) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusedIndex = (focusedIndex + 1) % items.length;
				updateFocusedItemVisuals();
				scrollToItem(focusedIndex);
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusedIndex = (focusedIndex - 1 + items.length) % items.length;
				updateFocusedItemVisuals();
				scrollToItem(focusedIndex);
				break;
			case 'Enter': {
				event.preventDefault();
				const item = items[focusedIndex] as HTMLElement;
				item?.click();
				break;
			}
			case 'Escape':
				event.preventDefault();
				toggleDropdown();
				break;
			default:
				if (event.key.length === 1 && /[a-zA-Z0-9 ]/.test(event.key)) {
					searchTerm += event.key.toLowerCase();
					handleSearch();
				}
		}
	};

	const initializeFocusedIndex = async () => {
		setTimeout(() => {
			const items = getItems();
			focusedIndex = Array.from(items).findIndex((i) => i.classList.contains('is-active'));
			if (focusedIndex === -1 && items.length) focusedIndex = 0;
		}, 50);
	};

	const scrollToSelectedItem = async () => {
		setTimeout(() => {
			const selectedItem = optionsEl?.querySelector('.is-active') as HTMLElement;
			if (selectedItem) {
				const offset = 50;
				const top = Math.max(0, selectedItem.offsetTop - offset);
				optionsEl?.scrollTo({ top, behavior: 'auto' });
			}
		}, 50);
	};

	const toggleDropdown = async () => {
		if (!isOpen) {
			startEventListeners();
			initializeFocusedIndex();
			scrollToSelectedItem();
			updatePosition();
			isOpen = true;
		} else {
			stopEventListeners();
			removeFocusedItemVisuals();
			isOpen = false;
		}
	};

	const handleSelect = (item: Option) => {
		selected = item;
		value = item.id;
		onchange?.(value);
		stopEventListeners();
		removeFocusedItemVisuals();
		isOpen = false;
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
		if (value && !selected) {
			selected = options.find((opt) => opt.id === value);
		} else if (selected) {
			value = selected.id;
		}
		updatePosition();
		return () => stopEventListeners();
	});

	$effect(() => {
		if (!value) {
			selected = undefined;
		}
	});
</script>

<div
	class={cn(
		'field',
		(isActive || isFocused || value !== '') && 'select--label-active',
		(isActive || isFocused) && 'select--control-active',
		floatLabel && 'select--float',
		className
	)}
>
	<input type="text" {name} bind:value hidden />

	{#if !floatLabel && label}
		<div class="field-label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn('control', variant, size, floatLabel && 'float', (isActive || isFocused) && 'active')}
		class:is-error={errorText}
		onclick={toggleDropdown}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if floatLabel && label}
			<span class={cn('control-label', (isActive || isFocused || value !== '') && 'active')}>
				{label}
			</span>
		{/if}

		{#if selected?.src || selected?.icon}
			<Avatar src={selected.src} name={selected.label} icon={selected.icon} size="sm" />
		{/if}

		<div class="control-selected" class:invisible={!selected && !isOpen}>
			{selected?.label ?? placeholder}
		</div>

		<div class="control-btn">
			<Icon
				name="fluent:arrow-sort-down-24-regular"
				class={cn('control-arrow', isOpen && 'active')}
			/>
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'danger')}>{errorText || helpText}</div>
	{/if}

	<div class:active={isOpen} class="select-popover" bind:this={contentEl} {style}>
		<ul class="listbox-items" bind:this={optionsEl}>
			{#each options as item}
				<li>
					<button
						type="button"
						class={cn('listbox-item')}
						class:is-active={value === item.id}
						onclick={() => handleSelect(item)}
					>
						{#if item.src || item.icon}
							<Avatar src={item.src} name={item.label} icon={item.icon} />
						{/if}

						<div class="listbox-item-body">
							<div class="listbox-item-label">
								{item.label}
							</div>
							{#if item.description}
								<div class="listbox-item-description">
									{item.description}
								</div>
							{/if}
						</div>

						{#if value === item.id}
							<Icon name="fluent:checkmark-24-regular" class="listbox-item-check" />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
