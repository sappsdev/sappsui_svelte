<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		value?: string;
		defaultValue?: string;
		placeholder?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
		class?: string;
		startIcon?: string;
		endIcon?: string;
		startText?: string;
		endText?: string;
		inputClass?: string;
		onchange?: (value: string | number | undefined) => void;
		oninput?: (value: string | number | undefined) => void;
		variant?: 'solid' | 'outline' | 'soft' | 'line';
		color?: 'primary' | 'secondary' | 'accent' | 'muted';
		size?: 'small' | 'medium' | 'large';
		name: string;
		label?: string;
		labelOutside?: boolean;
		labelActive?: boolean;
		helpText?: string;
		errorText?: string;
	};

	let {
		value = $bindable(),
		defaultValue,
		placeholder,
		autocomplete,
		type = 'text',
		class: className,
		startText,
		endText,
		startIcon,
		endIcon,
		inputClass,
		onchange,
		oninput,
		variant = 'soft',
		color = 'primary',
		size = 'medium',
		name,
		label,
		labelOutside,
		labelActive,
		helpText,
		errorText
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

	const uid = $props.id();

	let isFocused = $state(false);

	$effect.pre(() => {
		if (defaultValue) {
			value = defaultValue;
		}
	});
</script>

<div class={cn('field', className)}>
	{#if labelOutside && label}
		<span class="label">{label}</span>
	{/if}
	<label
		class={cn('field-control', variants[variant], colors[color], sizes[size])}
		for={`${uid}-{name}`}
		class:is-error={errorText}
	>
		{#if !labelOutside && label}
			<span class:is-active={isFocused || value || labelActive} class="label-inside">{label}</span>
		{/if}

		{#if startIcon || startText}
			<span class="field-start">
				{#if startIcon}
					<Icon
						class={cn(
							'field-icon',
							labelOutside || isFocused || value || labelActive ? 'visible' : 'invisible'
						)}
						icon={startIcon}
					/>
				{/if}
				{#if startText}
					<span
						class={cn(
							'field-text',
							labelOutside || isFocused || value || labelActive ? 'visible' : 'invisible'
						)}>{startText}</span
					>
				{/if}
			</span>
		{/if}

		<input
			{type}
			bind:value
			id={`${uid}-{name}`}
			class={cn('field-input', inputClass)}
			placeholder={labelOutside || isFocused || labelActive ? placeholder : ''}
			{autocomplete}
			{name}
			{defaultValue}
			onchange={(e) => onchange?.((e.target as HTMLInputElement).value)}
			oninput={(e) => oninput?.((e.target as HTMLInputElement).value)}
			onfocusin={() => {
				if (!labelActive) isFocused = true;
			}}
			onfocusout={() => {
				if (!labelActive) isFocused = false;
			}}
		/>

		{#if endIcon || endText}
			<span class="field-end">
				{#if endText}
					<span
						class={cn(
							'field-text',
							labelOutside || isFocused || value || labelActive ? 'visible' : 'invisible'
						)}>{endText}</span
					>
				{/if}
				{#if endIcon}
					<Icon
						class={cn(
							'field-icon',
							labelOutside || isFocused || value || labelActive ? 'visible' : 'invisible'
						)}
						icon={endIcon}
					/>
				{/if}
			</span>
		{/if}
	</label>
	{#if errorText || helpText}
		<div class={cn('field-help', errorText && 'is-error')}>{errorText || helpText}</div>
	{/if}
</div>
