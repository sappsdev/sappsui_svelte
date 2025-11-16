<script lang="ts">
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		el?: HTMLInputElement;
		value?: string | number;
		defaultValue?: string;
		placeholder?: string;
		type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
		class?: string;
		controlClass?: string;
		startIcon?: IconName;
		endIcon?: IconName;
		startText?: string;
		endText?: string;
		onchange?: (value: unknown) => void;
		oninput?: (value: unknown) => void;
		variant?: 'primary' | 'secondary' | 'soft' | 'line';
		size?: 'sm' | 'md' | 'lg';
		name: string;
		label?: string;
		labelInside?: boolean;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		min?: HTMLInputAttributes['min'];
		max?: HTMLInputAttributes['max'];
		maxlength?: HTMLInputAttributes['maxlength'];
		floatLabel?: boolean;
	};

	let {
		el = $bindable(),
		value = $bindable(''),
		defaultValue,
		placeholder,
		autocomplete,
		type = 'text',
		class: className,
		controlClass,
		startText,
		endText,
		startIcon,
		endIcon,
		onchange,
		oninput,
		variant = 'primary',
		size = 'md',
		name,
		label,
		floatLabel,
		labelActive,
		helpText,
		errorText,
		min,
		max
	}: Props = $props();

	const uid = $props.id();

	let isActive = $state(false);
	let isFocused = $state(false);

	let iconClasses = $derived(
		cn('control-icon', floatLabel && !isActive && !isFocused && value == '' && 'invisible')
	);
	let textClasses = $derived(
		cn('control-text', floatLabel && !isActive && !isFocused && value == '' && 'invisible')
	);

	$effect.pre(() => {
		if (defaultValue) {
			value = defaultValue;
		}
	});
</script>

<div class={cn('field', className)}>
	{#if !floatLabel && label}
		<span class="field-label">{label}</span>
	{/if}
	<label
		class={cn(
			'control',
			variant,
			size,
			floatLabel && 'float',
			(isActive || isFocused) && 'active',
			controlClass
		)}
		for={`${uid}-{name}`}
		class:is-error={errorText}
		onmouseenter={() => (isActive = true)}
		onmouseleave={() => (isActive = false)}
	>
		{#if floatLabel && label}
			<span class={cn('control-label', (isActive || isFocused || value !== '') && 'active')}>
				{label}
			</span>
		{/if}

		{#if startIcon}
			<Icon class={iconClasses} name={startIcon} />
		{/if}

		{#if startText}
			<span class={textClasses}>
				{startText}
			</span>
		{/if}

		<input
			{type}
			bind:this={el}
			bind:value
			id={`${uid}-{name}`}
			class={cn(
				'control-input',
				floatLabel && !isActive && !isFocused && value == '' && 'invisible',
				controlClass
			)}
			{placeholder}
			{autocomplete}
			{name}
			{min}
			{max}
			{defaultValue}
			onchange={(e) => onchange?.((e.target as HTMLInputElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLInputElement).value)}
			onfocusin={() => (isFocused = true)}
			onfocusout={() => (isFocused = false)}
		/>

		{#if endText}
			<span class={textClasses}>
				{endText}
			</span>
		{/if}

		{#if endIcon}
			<Icon class={iconClasses} name={endIcon} />
		{/if}
	</label>

	{#if errorText || helpText}
		<div class={cn('field_help')}>
			{errorText || helpText}
		</div>
	{/if}
</div>
