<script lang="ts" generics="T">
	import { Avatar, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';

	type Props = {
		options: T[];
		value?: unknown;
		selected?: T;
		placeholder?: string;
		onchange?: (value: unknown) => void;
		variant?: 'solid' | 'outline' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'accent' | 'muted';
		size?: 'small' | 'medium' | 'large';
		name: string;
		class?: string;
		label?: string;
		labelOutside?: boolean;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
		idKey?: keyof T;
		labelKey?: keyof T;
		descriptionKey?: keyof T;
		iconKey?: keyof T;
		srcKey?: keyof T;
		arrowIcon?: string;
	};

	let {
		class: className,
		options = [],
		value = $bindable(),
		selected = $bindable(),
		placeholder = 'Select an option',
		onchange,
		variant = 'soft',
		color = 'primary',
		size = 'medium',
		name,
		label,
		labelOutside,
		labelActive,
		helpText,
		errorText,
		arrowIcon = 'fluent:arrow-sort-down-24-regular',
		idKey = 'id' as keyof T,
		labelKey = 'label' as keyof T,
		descriptionKey = 'description' as keyof T,
		iconKey = 'icon' as keyof T,
		srcKey = 'src' as keyof T
	}: Props = $props();

	const variants = {
		solid: 'field-solid',
		outline: 'field-outline',
		soft: 'field-soft',
		line: 'field-line'
	};
	const colors = {
		primary: 'field-primary',
		secondary: 'field-secondary',
		accent: 'field-accent',
		muted: 'field-muted'
	};

	const sizes = {
		small: 'field-small',
		medium: 'field-medium',
		large: 'field-large'
	};

	const avatarSizes = {
		small: 'tiny',
		medium: 'small',
		large: 'medium'
	} as const;

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
	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const getItems = () => contentEl?.querySelectorAll('.select-item') ?? [];

	const updatePosition = () => {
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

	const initializeFocusedIndex = () => {
		setTimeout(() => {
			const items = getItems();
			focusedIndex = Array.from(items).findIndex((i) => i.classList.contains('is-active'));
			if (focusedIndex === -1 && items.length) focusedIndex = 0;
		}, 20);
	};

	const scrollToSelectedItem = () => {
		setTimeout(() => {
			const selectedItem = optionsEl?.querySelector('.is-active') as HTMLElement;
			if (selectedItem) {
				const offset = 50;
				const top = Math.max(0, selectedItem.offsetTop - offset);
				optionsEl?.scrollTo({ top, behavior: 'auto' });
			}
		}, 50);
	};

	const toggleDropdown = () => {
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

	const handleSelect = (item: T) => {
		selected = item;
		value = item[idKey] as string | number;
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
			selected = options.find((opt) => opt[idKey] === value);
		} else if (selected) {
			value = selected[idKey] as string | number;
		}
		return () => stopEventListeners();
	});

	$effect(() => {
		if (!value) {
			selected = undefined;
		}
	});
</script>

<div class={cn('field', className)}>
	<input type="text" {name} bind:value hidden />

	{#if labelOutside && label}
		<div class="label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn('field-control', variants[variant], colors[color], sizes[size])}
		class:is-error={errorText}
		onclick={toggleDropdown}
	>
		{#if !labelOutside && label}
			<div class:is-active={isOpen || value || labelActive} class="label-inside">
				{label}
			</div>
		{/if}

		{#if (srcKey && selected?.[srcKey]) || (iconKey && selected?.[iconKey])}
			<div class="field-start">
				<Avatar
					src={selected?.[srcKey] as string}
					name={selected?.[labelKey] as string}
					icon={selected?.[iconKey] as string}
					size={avatarSizes[size]}
				/>
			</div>
		{/if}

		<div class="field-select" class:invisible={!selected && !isOpen}>
			<div class="select-content">
				{selected?.[labelKey] ?? placeholder}
			</div>
		</div>

		<div class="field-btn">
			<Icon icon={arrowIcon} class={cn('field-arrow', isOpen && 'is-active')} />
		</div>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText || helpText}</div>
	{/if}

	<div class:is-open={isOpen} class="select-popover" bind:this={contentEl} {style}>
		<ul class="select-options" bind:this={optionsEl}>
			{#each options as item}
				<li>
					<button
						type="button"
						class={cn('select-item', colors[color])}
						class:is-active={value === item[idKey]}
						onclick={() => handleSelect(item)}
					>
						{#if (srcKey && item[srcKey]) || (iconKey && item[iconKey])}
							<div class="select-start">
								<Avatar
									src={item[srcKey] as string}
									name={item[labelKey] as string}
									icon={item[iconKey] as string}
								/>
							</div>
						{/if}

						<div class="select-center">
							<div class="select-label">
								{item[labelKey]}
							</div>
							{#if descriptionKey && item[descriptionKey]}
								<div class="select-description">
									{item[descriptionKey]}
								</div>
							{/if}
						</div>

						{#if value === item[idKey]}
							<Icon icon="fluent:checkmark-24-regular" class="select-check" />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
