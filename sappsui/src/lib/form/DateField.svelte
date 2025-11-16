<script lang="ts">
	import { formatDate, getWeekdays, Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import { onMount } from 'svelte';

	type Props = {
		value?: unknown;
		placeholder?: string;
		onchange?: (value: unknown) => void;
		variant?: 'solid' | 'outline' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'muted';
		inputSize?: 'small' | 'medium' | 'large';
		name: string;
		class?: string;
		label?: string;
		labelOutside?: boolean;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
	};

	let {
		value = $bindable(),
		placeholder = 'Select an option',
		onchange,
		variant = 'soft',
		color = 'primary',
		inputSize = 'medium',
		name,
		label,
		labelOutside,
		labelActive,
		helpText,
		errorText,
		class: className
	}: Props = $props();

	let selectedDate = $state<Date>(new Date());
	let currentMonth = $derived(selectedDate.getMonth());
	let currentYear = $derived(selectedDate.getFullYear());
	let contentEl = $state<HTMLDivElement>();
	let controlElement = $state<HTMLElement>();

	let isOpen = $state(false);
	const uid = $props.id();

	let isFocused = $state(false);

	let position = $state({
		top: 0,
		left: 0,
		width: 'auto',
		isBottomHalf: false
	});

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

	const style = $derived(
		`top: ${position.top}px; left: ${position.left}px; width: ${position.width}px; transform-origin: ${position.isBottomHalf ? 'bottom' : 'top'} center;`
	);

	const getDaysInMonth = (month: number, year: number) => {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const changeMonth = (direction: 'prev' | 'next') => {
		if (direction === 'prev') {
			currentMonth--;
			if (currentMonth < 0) {
				currentMonth = 11;
				currentYear--;
			}
		} else {
			currentMonth++;
			if (currentMonth > 11) {
				currentMonth = 0;
				currentYear++;
			}
		}
	};

	const selectDate = (date: Date) => {
		selectedDate = new Date(date);
		selectedDate;
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return (
			date &&
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const isSelected = (date: Date) => {
		return (
			date &&
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	};

	const monthName = $derived(
		formatDate(new Date(currentYear, currentMonth, 1), {
			month: 'short'
		})
	);

	const days = $derived(getDaysInMonth(currentMonth, currentYear));
	const weekdays = $derived(getWeekdays('short'));

	const formattedSelectedDate = $derived(
		formatDate(selectedDate, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);

	const handleClickOutside = (event: Event) => {
		if (
			isOpen &&
			!controlElement?.contains(event.target as Node) &&
			!contentEl?.contains(event.target as Node)
		) {
			isOpen = false;
		}
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
			width: 'auto',
			isBottomHalf
		};
	};

	const startEventListeners = () => {
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);
		document.addEventListener('click', handleClickOutside);
	};

	const stopEventListeners = () => {
		window.removeEventListener('resize', updatePosition);
		window.removeEventListener('scroll', updatePosition, true);
		document.removeEventListener('click', handleClickOutside);
	};

	onMount(() => {
		return () => stopEventListeners();
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
		class={cn('field-control', variants[variant], colors[color], sizes[inputSize])}
		class:is-error={errorText}
		onclick={toggleDropdown}
	>
		{#if !labelOutside && label}
			<label class:is-active={isFocused || value} for={`${uid}-{name}`} class="label-inside"
				>{label}</label
			>
		{/if}
		<span class:invisible={!isOpen}></span>
	</button>

	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText || helpText}</div>
	{/if}

	<div class:is-open={isOpen} class="date-popover" {style} bind:this={contentEl}>
		<div class="date-picker-header">
			<Icon
				icon="material-symbols:arrow-left-alt-rounded"
				class={cn('date-arrow')}
				onclick={() => changeMonth('prev')}
			/>

			<span>{monthName} {currentYear}</span>
			<Icon
				icon="material-symbols:arrow-right-alt-rounded"
				class={cn('date-arrow')}
				onclick={() => changeMonth('next')}
			/>
		</div>
		<div class="date-picker-weekdays">
			{#each weekdays as weekday}
				<div class="weekday">{weekday}</div>
			{/each}
		</div>
		<div class="date-picker-days">
			{#each days as day}
				{#if day}
					<button
						class="date-picker-day-button"
						class:today={isToday(day)}
						class:selected={isSelected(day)}
						onclick={() => selectDate(day)}
						type="button"
					>
						{day.getDate()}
					</button>
				{:else}
					<div class="date-picker-empty-day"></div>
				{/if}
			{/each}
		</div>
	</div>
</div>
