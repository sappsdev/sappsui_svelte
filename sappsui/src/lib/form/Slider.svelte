<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		onchange?: (value: number) => void;
		size?: 'small' | 'medium' | 'large';
		label?: string;
		color?: 'primary' | 'secondary' | 'muted';
		name: string;
		hideLabel?: boolean;
	};
	let {
		value = $bindable(),
		label,
		min = 0,
		max = 100,
		step,
		onchange,
		size = 'medium',
		color = 'primary',
		name,
		hideLabel
	}: Props = $props();

	let progressPercentage = $derived(((value! - min) / (max - min)) * 100);

	const colors = {
		primary: 'slider-primary',
		secondary: 'slider-secondary',
		muted: 'slider-muted'
	};

	const sizes = {
		small: 'slider-small',
		medium: 'slider-medium',
		large: 'slider-large'
	};
</script>

<div class="slider-wrapper">
	<div class="slider-info" hidden={hideLabel}>
		<span>{label}</span>
		<span>{value}</span>
	</div>
	<input
		type="range"
		{min}
		{max}
		{step}
		{name}
		bind:value
		onchange={(e) => onchange?.((e.target as HTMLInputElement).valueAsNumber)}
		class={cn('slider', sizes[size], colors[color])}
		style="--slider-progress: {progressPercentage}%"
	/>
</div>
