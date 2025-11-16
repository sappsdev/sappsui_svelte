<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Option = {
		id: string | number;
		label: string;
	};

	type Props = {
		options: Option[];
		onchange?: (checked: boolean) => void;
		value?: string | number;
		class?: string;
		label?: string;
		name: string;
		info?: string;
		error?: string;
		color?: 'primary' | 'secondary' | 'muted';
		radioSize?: 'small' | 'medium' | 'large';
	};
	let {
		options,
		onchange,
		class: className,
		label,
		name,
		info,
		error,
		color = 'primary',
		radioSize = 'medium',
		value = $bindable()
	}: Props = $props();

	const colors = {
		primary: 'radio-primary',
		secondary: 'radio-secondary',
		muted: 'radio-muted'
	};

	const sizes = {
		small: 'radio-small',
		medium: 'radio-medium',
		large: 'radio-large'
	};
</script>

<div class={cn('field', className)}>
	<input type="text" {name} hidden />
	{#if label}
		<div class="label">{label}</div>
	{/if}

	<div class={cn('radio-group')}>
		{#each options as item}
			<label class="radio-item">
				<input
					type="radio"
					value={item.id}
					bind:group={value}
					class={cn('radio', colors[color], sizes[radioSize])}
				/>
				<span class="label">{item.label}</span>
			</label>
		{/each}
	</div>

	{#if error || info}
		<div class={cn('field-help', error && 'is-error')}>{error ?? info}</div>
	{/if}
</div>
