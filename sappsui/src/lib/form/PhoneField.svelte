<script lang="ts">
	import { normalizedCountries, type Country } from '$lib/assets/countries.js';
	import { Avatar, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, tick } from 'svelte';
	import TextField from './TextField.svelte';
	import type { IconName } from '$lib/assets/icons/index.js';

	type Props = {
		value?: unknown;
		countryCode?: string;
		dialCode?: string;
		placeholder?: string;
		onchange?: (value: unknown) => void;
		variant?: 'solid' | 'outline' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'muted';
		size?: 'small' | 'medium' | 'large';
		name: string;
		dialCodeName?: string;
		class?: string;
		label?: string;
		labelOutside?: boolean;
		labelActive?: boolean;
		info?: string;
		error?: string;
		priorityCountries?: string[];
	};

	let {
		class: className,
		value = $bindable(),
		countryCode = $bindable(),
		dialCode = $bindable(),
		placeholder = 'Enter your phone number',
		onchange,
		variant = 'soft',
		color = 'primary',
		size = 'medium',
		name,
		dialCodeName = 'dialCode',
		label,
		labelOutside,
		labelActive,
		info,
		error,
		priorityCountries = []
	}: Props = $props();

	let displayedCountries = $state<Country[]>([]);
	let allSortedCountries = $state<Country[]>([]);
	let currentPage = $state(0);
	const PAGE_SIZE = 10;
	let isLoadingMore = $state(false);
	let searchQuery = $state('');

	let isOpen = $state(false);
	let controlElement = $state<HTMLElement>();
	let contentEl = $state<HTMLElement>();
	let optionsEl = $state<HTMLElement>();
	let searchInputEl = $state<HTMLInputElement>();
	let phoneInputEl = $state<HTMLInputElement>();
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

	const getItems = () => contentEl?.querySelectorAll('.field-options-item') ?? [];

	const variants = {
		solid: 'field-solid',
		outline: 'field-outline',
		soft: 'field-soft',
		line: 'field-line'
	};
	const colors = {
		primary: 'field-primary',
		secondary: 'field-secondary',
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

	const toggleDropdown = async () => {
		if (!isOpen) {
			await loadInitialCountries();
			startEventListeners();
			initializeFocusedIndex();
			updatePosition();
			isOpen = true;
			await tick();
			searchInputEl?.focus();
		} else {
			stopEventListeners();
			removeFocusedItemVisuals();
			isOpen = false;
		}
	};

	const sortCountries = () => {
		const selected = normalizedCountries.find((c) => c.id === countryCode);
		const priority = normalizedCountries.filter(
			(c) => priorityCountries.includes(c.id.toLowerCase()) && c.id !== countryCode
		);
		const rest = normalizedCountries.filter(
			(c) => c.id !== countryCode && !priorityCountries.includes(c.id.toLowerCase())
		);

		allSortedCountries = [...(selected ? [selected] : []), ...priority, ...rest];
	};

	const filterCountries = async () => {
		if (!searchQuery.trim()) {
			return allSortedCountries;
		}
		const query = searchQuery.toLowerCase();
		return allSortedCountries.filter(
			(c) => c.name.toLowerCase().includes(query) || c.dialCode.includes(query)
		);
	};

	const loadInitialCountries = async () => {
		sortCountries();
		const filtered = await filterCountries();
		displayedCountries = filtered.slice(0, PAGE_SIZE);
		currentPage = 0;
	};

	const loadMoreCountries = async () => {
		if (isLoadingMore) return;

		isLoadingMore = true;
		const filtered = await filterCountries();
		const nextPage = currentPage + 1;
		const start = nextPage * PAGE_SIZE;
		const end = start + PAGE_SIZE;

		if (start < filtered.length) {
			const newCountries = filtered.slice(start, end);
			displayedCountries = [...displayedCountries, ...newCountries];
			currentPage = nextPage;
		}

		setTimeout(() => {
			isLoadingMore = false;
		}, 100);
	};

	const handleScroll = async (event: Event) => {
		const target = event.target as HTMLElement;
		const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight;

		if (scrollPercentage > 0.8) {
			await loadMoreCountries();
		}
	};

	const handleSearchInput = async (value: unknown) => {
		searchQuery = value as string;
		await loadInitialCountries();
		updatePosition();
	};

	const handleCountry = () => {
		toggleDropdown();
	};

	const handleSelect = async (item: Country) => {
		countryCode = item.id;
		dialCode = item.dialCode;
		onchange?.(value);
		isOpen = false;
		searchQuery = '';
		await tick();
		phoneInputEl?.focus();
	};

	const handleToggleWrapper = async () => {
		if (countryCode || value) {
			return;
		}
		toggleDropdown();
	};

	const updateFocusedItemVisuals = () => {
		const items = getItems();
		items.forEach((el, i) => {
			(el as HTMLElement).dataset.focused = i === focusedIndex ? '1' : '0';
		});
	};

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

	const removeFocusedItemVisuals = () => {
		const items = getItems();
		items.forEach((el) => {
			(el as HTMLElement).dataset.focused = '0';
		});
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

	const resetSearch = () => {
		searchTerm = '';
		if (searchTimeout) {
			clearTimeout(searchTimeout);
			searchTimeout = null;
		}
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
			focusedIndex = Array.from(items).findIndex((i) => i.classList.contains('active'));
			if (focusedIndex === -1 && items.length) focusedIndex = 0;
		}, 20);
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

<div class={cn('field', className)}>
	<input type="text" name={dialCodeName} bind:value={dialCode} hidden />

	{#if labelOutside && label}
		<div class="label">{label}</div>
	{/if}

	<button
		type="button"
		bind:this={controlElement}
		class={cn('field-control', variants[variant], colors[color], sizes[size])}
		class:is-error={error}
		onclick={handleToggleWrapper}
	>
		{#if !labelOutside && label}
			<div class:is-active={isOpen || value || countryCode || labelActive} class="label-inside">
				{label}
			</div>
		{/if}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="field-start"
			onclick={handleCountry}
			class:invisible={!countryCode && !value && !isOpen}
		>
			<Avatar
				name="Country"
				icon={`circle-flags:${countryCode ? countryCode : 'xx'}` as IconName}
				{size}
				color="transparent"
			/>
			<div class="select-center">
				{dialCode ? `+${dialCode}` : '+--'}
			</div>
		</div>

		<div class="field-center" class:invisible={!countryCode && !value && !isOpen}>
			<input bind:this={phoneInputEl} type="number" {name} class="field-input" />
		</div>
	</button>

	{#if error || info}
		<div class={cn('field-help', error && 'is-error')}>{error ?? info}</div>
	{/if}

	<div class:is-open={isOpen} class="select-popover" bind:this={contentEl} {style}>
		<TextField
			bind:el={searchInputEl}
			type="text"
			name="country-search"
			placeholder="Search country"
			bind:value={searchQuery}
			oninput={handleSearchInput}
			variant="line"
			startIcon="fluent:search-24-regular"
			{color}
		/>

		<ul class="select-options" bind:this={optionsEl} onscroll={handleScroll}>
			{#each displayedCountries as item}
				<li>
					<button
						type="button"
						class:active={countryCode === item.id}
						class="select-item"
						onclick={() => handleSelect(item)}
					>
						<div class="select-start">
							<Avatar
								icon={`circle-flags:${item.id}` as IconName}
								name="Country"
								color="transparent"
							/>
						</div>

						<div class="select-center">
							<div class="select-label">
								{item.label}
							</div>
						</div>

						{#if countryCode === item.id}
							<Icon name="fluent:checkmark-24-regular" class="select-check" />
						{/if}
					</button>
				</li>
			{/each}
			{#if isLoadingMore}
				<li class="select-options-loading">
					<Icon name={'svg-spinners:3-dots-move' as IconName} />
				</li>
			{/if}
		</ul>
	</div>
</div>
